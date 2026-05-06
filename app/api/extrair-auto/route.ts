import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { base64, mimeType } = await req.json();
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const isPDF = mimeType === 'application/pdf';

        const PROMPT = 'Analisa este auto de contraordenação rodoviária português e devolve APENAS JSON sem markdown: {"autoridade":"ANSR|GNR|PSP|Câmara Municipal","numeroAuto":"","data":"AAAA-MM-DD","hora":"HH:MM","matricula":"","marca":"","modelo":"","infracao":"descrição da infração","artigoLE":"artigo do CE ou RGCO","local":"","localidade":"","detalhes":"velocidade registada, equipamento, outros dados técnicos"}';

        const content: any[] = isPDF
            ? [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } }, { type: 'text', text: PROMPT }]
            : [{ type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } }, { type: 'text', text: PROMPT }];

        const response: any = isPDF
            ? await (anthropic as any).beta.messages.create({ model: 'claude-opus-4-5', max_tokens: 1000, messages: [{ role: 'user', content }], betas: ['pdfs-2024-09-25'] })
            : await anthropic.messages.create({ model: 'claude-opus-4-5', max_tokens: 1000, messages: [{ role: 'user', content }] });

        const texto = response.content[0]?.type === 'text' ? response.content[0].text : '{}';
        const dados = JSON.parse(texto.replace(/```json/g, '').replace(/```/g, '').trim());
        return NextResponse.json({ dados });
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || 'Erro ao extrair dados' }, { status: 500 });
    }
}
