import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as 'signup' | 'recovery' | 'magiclink' | null;

    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => cookieStore.getAll(),
                setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
            },
        }
    );

    // Fluxo OAuth / magic link com código
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(`${origin}/dashboard`);
        }
    }

    // Fluxo de confirmação de email / recuperação de palavra-passe
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type });
        if (!error) {
            if (type === 'recovery') {
                return NextResponse.redirect(`${origin}/auth/reset-password`);
            }
            return NextResponse.redirect(`${origin}/dashboard`);
        }
    }

    // Redirecionar para login com erro em caso de falha
    return NextResponse.redirect(`${origin}/login?erro=confirmacao`);
}
