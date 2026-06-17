import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPromptPT, detetarTipoInfracaoPT } from '@/lib/juridico-pt';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}

function getAnthropic() {
    return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

// Extrai dados do auto a partir de imagem ou PDF
async function extrairDadosAuto(base64: string, mimeType: string) {
    const anthropic = getAnthropic();
    const isPDF = mimeType === 'application/pdf';
    const PROMPT = 'Analisa este auto de contraordenação rodoviária português e devolve APENAS JSON sem markdown: {"autoridade":"ANSR|GNR|PSP|Câmara Municipal","numeroAuto":"","data":"AAAA-MM-DD","hora":"HH:MM","matricula":"","marca":"","modelo":"","infracao":"descrição da infração","artigoLE":"artigo do Código da Estrada ou RGCO","local":"","localidade":"","detalhes":"dados do equipamento, velocidade registada, outros dados técnicos"}';

    const content: any[] = isPDF
        ? [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } }, { type: 'text', text: PROMPT }]
        : [{ type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } }, { type: 'text', text: PROMPT }];

    const response: any = isPDF
        ? await (anthropic as any).beta.messages.create({ model: 'claude-opus-4-5', max_tokens: 1000, messages: [{ role: 'user', content }], betas: ['pdfs-2024-09-25'] })
        : await anthropic.messages.create({ model: 'claude-opus-4-5', max_tokens: 1000, messages: [{ role: 'user', content }] });

    const texto = response.content[0]?.type === 'text' ? response.content[0].text : '{}';
    try {
        return JSON.parse(texto.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch {
        return {};
    }
}

// POST /api/gerar-defesa — gera o documento de defesa
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { dadosAuto, dadosArguido, relato, userId } = body;

        const { respostas, estrategias, argumentosViabilidade } = body;

        const tipoInfracao = detetarTipoInfracaoPT(dadosAuto?.infracao || '');
        const systemPrompt = buildSystemPromptPT(tipoInfracao);

        const contextoEntrevista = respostas?.length
            ? `\n\nRESPOSTAS DO ARGUIDO À ENTREVISTA GUIADA:
${respostas.map((r: { pergunta: string; resposta: string }) => `- Pergunta: ${r.pergunta}\n  Resposta: ${r.resposta}`).join('\n')}

ESTRATÉGIAS IDENTIFICADAS PREVIAMENTE: ${estrategias?.join(', ') || 'nenhuma'}

DIRETRIZ: Cada resposta pode revelar um vício formal ou falha de procedimento — explora todas. Se o arguido disse que o agente NÃO fez algo obrigatório, isso é argumento de nulidade. Se respondeu "Não sei informar", não uses esse ponto como argumento.`
            : `\n\nRELATO DO ARGUIDO:\n"${relato || 'Sem relato fornecido'}"`;

        const userPrompt = `DADOS DO AUTO DE CONTRAORDENAÇÃO:
Autoridade: ${dadosAuto?.autoridade || 'Não indicado'}
N.º do Auto: ${dadosAuto?.numeroAuto || 'Não indicado'}
Data: ${dadosAuto?.data || 'Não indicada'} | Hora: ${dadosAuto?.hora || 'Não indicada'}
Infração: ${dadosAuto?.infracao || 'Não indicada'} | Artigo: ${dadosAuto?.artigoLE || 'Não indicado'}
Local: ${dadosAuto?.local || '--'} — ${dadosAuto?.localidade || '--'}
Matrícula: ${dadosAuto?.matricula || 'Não indicada'} | Veículo: ${dadosAuto?.marca || ''} ${dadosAuto?.modelo || ''}
Detalhes técnicos: ${dadosAuto?.detalhes || 'Sem dados adicionais'}

DADOS DO ARGUIDO:
Nome: ${dadosArguido?.nome || 'Não indicado'}
NIF: ${dadosArguido?.nif || 'Não indicado'}
Carta de Condução: ${dadosArguido?.cartaConducao || 'Não indicada'}
Morada: ${dadosArguido?.morada || 'Não indicada'}
Localidade: ${dadosArguido?.localidade || 'Não indicada'}, ${dadosArguido?.codigoPostal || ''}
${contextoEntrevista}
${argumentosViabilidade?.length
    ? `\nARGUMENTOS PRÉ-IDENTIFICADOS NA ANÁLISE DE VIABILIDADE (incorpora e desenvolve estes na defesa):\n${argumentosViabilidade.map((a: any) => `- [FORÇA ${(a.forca || '').toUpperCase()}] ${a.titulo}: ${a.descricao}`).join('\n')}`
    : ''}

Elabora a defesa administrativa completa.`;

        const anthropic = getAnthropic();
        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 8000,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }],
        });

        const textoDefesa = response.content[0]?.type === 'text' ? response.content[0].text : '';

        // Guarda no histórico
        if (userId) {
            const supabase = getSupabase();
            await supabase.from('defesas').insert({
                user_id: userId,
                status: 'concluida',
                dados_auto: dadosAuto,
                alegacoes_arguido: relato,
                texto_defesa_final: textoDefesa,
                created_at: new Date().toISOString(),
            }).then(() => {}, () => {});
        }

        return NextResponse.json({ defesa: textoDefesa });
    } catch (error: any) {
        console.error('Erro ao gerar defesa:', error?.message);
        return NextResponse.json({ error: error?.message || 'Erro interno' }, { status: 500 });
    }
}

// POST /api/gerar-defesa/extrair — extrai dados do auto
export { extractRoute as POST_extrair };
async function extractRoute(req: Request) {
    try {
        const { base64, mimeType } = await req.json();
        const dados = await extrairDadosAuto(base64, mimeType);
        return NextResponse.json({ dados });
    } catch (error: any) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
