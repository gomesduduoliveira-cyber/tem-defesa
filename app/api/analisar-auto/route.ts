import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { detetarTipoInfracaoPT, INFRACOES_PT } from '@/lib/juridico-pt';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { infracao, artigoLE, autoridade, detalhes } = await req.json();
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

        const tipoInfracao = detetarTipoInfracaoPT(infracao || '');
        const baseJuridica = tipoInfracao
            ? INFRACOES_PT[tipoInfracao]
            : 'Infração rodoviária genérica — verificar vícios formais do auto e procedimento do agente.';

        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 2000,
            messages: [{
                role: 'user',
                content: `És um assistente especializado EXCLUSIVAMENTE em processos de contraordenação rodoviária em Portugal, com base no Código da Estrada e no RGCO.

VERIFICAÇÃO DE ÂMBITO OBRIGATÓRIA:
Antes de qualquer análise, verifica se a informação recebida é estritamente relacionada com infrações de trânsito, coimas rodoviárias ou recursos de contraordenação em Portugal.

Se o conteúdo NÃO for relacionado com trânsito, ou contiver pedidos ilegais, ofensivos, solicitação de falsificação de documentos, fraude ou qualquer outro tema fora do âmbito, devolve APENAS:
{
  "fora_do_escopo": true,
  "mensagem": "Esta plataforma destina-se exclusivamente a defesas de coimas de trânsito em Portugal. O conteúdo indicado não está relacionado com esse âmbito."
}

---

Se for uma contraordenação rodoviária legítima, analisa os dados e gera perguntas estratégicas para identificar vícios formais e falhas de procedimento que possam fundamentar uma defesa com probabilidade real de êxito.

Dados da contraordenação:
Infração: ${infracao || 'não indicada'}
Artigo: ${artigoLE || 'não indicado'}
Autoridade: ${autoridade || 'não indicada'}
Detalhes técnicos: ${detalhes || 'sem detalhes'}

BASE JURÍDICA APLICÁVEL:
${baseJuridica}

Devolve APENAS JSON válido, sem texto fora do JSON:
{
  "fora_do_escopo": false,
  "resumo_infracao": "Descrição clara e acessível da infração e artigo do CE/RGCO",
  "estrategias_possiveis": ["estratégia 1", "estratégia 2", "estratégia 3"],
  "perguntas": [
    {
      "id": "1",
      "texto": "Pergunta clara e simples para o arguido, sem linguagem jurídica",
      "tipo": "boolean",
      "opcao_sim": "Sim, foi apresentado",
      "opcao_nao": "Não, não foi apresentado",
      "relevancia": "Motivo pelo qual esta resposta é relevante para a defesa"
    }
  ]
}

REGRAS PARA AS PERGUNTAS:
- Máximo 7 perguntas
- Linguagem simples e acessível ao cidadão comum
- Tipo "boolean" para perguntas de Sim/Não, tipo "texto" para respostas abertas
- Foca em: homologação/verificação do equipamento (IPAC), sinalização no local, procedimento do agente, documentos apresentados, presença de testemunhas, circunstâncias especiais
- Prioriza perguntas que revelem VÍCIOS FORMAIS com maior potencial de êxito
- Adapta as perguntas ao tipo específico de infração detetada`
            }]
        });

        const texto = response.content[0]?.type === 'text' ? response.content[0].text.trim() : '{}';
        const jsonMatch = texto.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('JSON não encontrado na resposta');
        const dados = JSON.parse(jsonMatch[0]);
        return NextResponse.json(dados);
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || 'Erro ao analisar a contraordenação' }, { status: 500 });
    }
}
