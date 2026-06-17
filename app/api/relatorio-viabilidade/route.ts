import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { detetarTipoInfracaoPT, INFRACOES_PT } from '@/lib/juridico-pt';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// POST /api/relatorio-viabilidade — avalia as hipóteses de êxito da defesa (PT)
export async function POST(req: Request) {
    try {
        const { dadosAuto, respostas, estrategias } = await req.json();

        const autoridade = dadosAuto?.autoridade;
        if (!autoridade) {
            return NextResponse.json({ error: 'Autoridade autuante é obrigatória.' }, { status: 400 });
        }

        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

        const tipoInfracao = detetarTipoInfracaoPT(dadosAuto?.infracao || '');
        const baseJuridica = tipoInfracao
            ? INFRACOES_PT[tipoInfracao]
            : 'Contraordenação rodoviária genérica — verificar vícios formais do auto e procedimento do agente.';

        const contextoEntrevista = respostas?.length
            ? `\nINFORMAÇÕES RECOLHIDAS NA ENTREVISTA:\n${respostas.map((r: { pergunta: string; resposta: string }) => `- ${r.pergunta}\n  Resposta: ${r.resposta}`).join('\n')}\nESTRATÉGIAS IDENTIFICADAS: ${estrategias?.join(', ') || 'nenhuma'}`
            : '';

        const prompt = `És um jurista especialista em Direito Rodoviário Português, com vasta experiência em processos de contraordenação junto da ANSR e dos tribunais portugueses. Analisa os dados deste auto e elabora um Relatório de Viabilidade detalhado e honesto.

DIRETRIZ DE INTEGRIDADE (INVIOLÁVEL):
- Analisa com profundidade o Código da Estrada e o RGCO; fundamenta cada ponto no texto legal.
- Considera a jurisprudência consolidada dos tribunais portugueses, mas JAMAIS inventes acórdãos, números de processo ou teses inexistentes.
- O objetivo NÃO é agradar o utilizador com a pontuação que ele gostaria de ver, mas informá-lo com precisão. Se as hipóteses forem baixas, di-lo com honestidade — uma pontuação inflacionada prejudica o utilizador.

DADOS DA CONTRAORDENAÇÃO:
Autoridade autuante: ${autoridade}
Infração: ${dadosAuto?.infracao || 'Não indicada'}
Artigo (CE/RGCO): ${dadosAuto?.artigoLE || 'Não indicado'}
Data: ${dadosAuto?.data || 'Não indicada'} | Hora: ${dadosAuto?.hora || 'Não indicada'}
Local: ${dadosAuto?.local || '--'} — ${dadosAuto?.localidade || '--'}
Detalhes técnicos: ${dadosAuto?.detalhes || 'Sem dados técnicos disponíveis'}
${contextoEntrevista}

BASE JURÍDICA APLICÁVEL:
${baseJuridica}

CRITÉRIOS DE AVALIAÇÃO:
1. Vícios formais: identificação do agente, dados obrigatórios do auto, prazo de notificação, campos em branco ou ilegíveis
2. Invalidade dos meios de prova: homologação IPAC do equipamento, verificação periódica, margem de erro/tolerância
3. Mérito: ausência de tipicidade, circunstâncias atenuantes, identificação incorreta, sinalização deficiente
4. Dificuldade probatória: quanto mais técnica a infração, maior o risco de vício processual a favor do arguido

CALIBRAÇÃO DA PONTUAÇÃO (sê realista):
- 80-100: vício formal grave ou erro técnico evidente → arquivamento muito provável
- 60-79: argumentos sólidos com fundamento legal e jurisprudencial → boas hipóteses
- 40-59: argumentos existem mas resultado incerto — depende da instrução
- 20-39: poucos vícios identificáveis, mérito difícil
- 0-19: infração flagrante sem vícios aparentes

INSTRUÇÃO CRÍTICA SOBRE A RESPOSTA:
- O campo "resumo_publico" deve trazer uma avaliação geral das hipóteses SEM revelar argumentos específicos. Usa linguagem como "apresenta indicadores que favorecem", "há elementos que podem ser explorados", "o contexto da infração sugere", etc.
- Os campos "argumentos", "favoraveis" e "desfavoraveis" são INTERNOS — não serão exibidos ao utilizador agora, mas serão usados para gerar a defesa completa se decidir prosseguir. Sê específico nesses campos.

Devolve APENAS um JSON válido sem markdown:
{
  "score": [número inteiro 0-100],
  "classificacao": "Excelente viabilidade" | "Boa viabilidade" | "Viabilidade moderada" | "Baixa viabilidade",
  "recomendacao": "Recomendamos contestar" | "Contestar com reservas" | "Viabilidade difícil — consulte um advogado",
  "resumo_publico": "Avaliação geral das hipóteses em 2-3 frases, SEM revelar argumentos específicos. Fala do contexto geral, do histórico deste tipo de contraordenação e do que o arguido pode esperar, de forma genérica.",
  "prazo": "15 dias úteis a contar da notificação do auto (defesa administrativa)",
  "observacao": "Dica prática importante para este caso — o que o utilizador deve fazer ou providenciar",
  "argumentos": [
    {
      "titulo": "Nome do argumento jurídico",
      "descricao": "Descrição detalhada e específica para uso na elaboração da defesa",
      "forca": "alta" | "media" | "baixa"
    }
  ],
  "favoraveis": ["Ponto favorável específico para a defesa 1", "Ponto 2"],
  "desfavoraveis": ["Fator desfavorável ou risco 1", "Risco 2"]
}

IMPORTANTE: Sê conciso. Cada campo de texto deve ter no máximo 2-3 frases. A lista "argumentos" deve ter no máximo 4 itens. As listas "favoraveis" e "desfavoraveis" devem ter no máximo 3 itens cada.`;

        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 4000,
            messages: [{ role: 'user', content: prompt }],
        });

        const texto = response.content[0]?.type === 'text' ? response.content[0].text : '';
        const limpo = texto.replace(/```json/g, '').replace(/```/g, '').trim();
        const raw = JSON.parse(limpo);

        // Separar dados públicos (mostrados ao utilizador) dos internos (usados na defesa)
        const { argumentos, favoraveis, desfavoraveis, ...publico } = raw;
        return NextResponse.json({
            publico,                           // exibido no ecrã
            internos: { argumentos, favoraveis, desfavoraveis },  // guardado para a defesa
        });

    } catch (error: any) {
        console.error('Erro relatorio-viabilidade:', error?.message);
        return NextResponse.json({ error: error?.message || 'Erro ao gerar relatório.' }, { status: 500 });
    }
}
