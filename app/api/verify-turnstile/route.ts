import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({ success: false, error: 'Token ausente.' }, { status: 400 });
        }

        const secret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret, response: token }),
        });

        const data = await res.json();
        return NextResponse.json({ success: !!data.success });
    } catch (err: any) {
        console.error('Turnstile verify error:', err?.message);
        return NextResponse.json({ success: false, error: 'Erro na verificação.' }, { status: 500 });
    }
}
