'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
    const [mensagem, setMensagem] = useState('A confirmar a sua conta...');
    const [erro, setErro] = useState(false);

    useEffect(() => {
        const processar = async () => {
            try {
                // ── Implicit flow: token no hash (#access_token=...) ──
                const hash = window.location.hash.substring(1);
                if (hash) {
                    const params = new URLSearchParams(hash);
                    const accessToken = params.get('access_token');
                    const refreshToken = params.get('refresh_token');
                    const type = params.get('type'); // 'signup' | 'recovery'
                    const errorDesc = params.get('error_description');

                    if (errorDesc) {
                        setErro(true);
                        setMensagem('Link inválido ou expirado. A redirecionar...');
                        setTimeout(() => { window.location.href = '/login?erro=confirmacao'; }, 2000);
                        return;
                    }

                    if (accessToken && refreshToken) {
                        const { error } = await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        });
                        if (error) throw error;

                        if (type === 'recovery') {
                            window.location.href = '/auth/reset-password';
                        } else {
                            setMensagem('Conta confirmada! A redirecionar...');
                            window.location.href = '/dashboard';
                        }
                        return;
                    }
                }

                // ── PKCE flow: token_hash nos query params ──
                const search = new URLSearchParams(window.location.search);
                const tokenHash = search.get('token_hash');
                const type = search.get('type') as 'signup' | 'recovery' | null;
                const code = search.get('code');

                if (tokenHash && type) {
                    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
                    if (error) throw error;
                    window.location.href = type === 'recovery' ? '/auth/reset-password' : '/dashboard';
                    return;
                }

                if (code) {
                    const { error } = await supabase.auth.exchangeCodeForSession(code);
                    if (error) throw error;
                    window.location.href = '/dashboard';
                    return;
                }

                // Nenhum token encontrado — verificar se já tem sessão
                const { data } = await supabase.auth.getSession();
                if (data.session) {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/login';
                }

            } catch (err: any) {
                setErro(true);
                setMensagem('Ocorreu um erro. A redirecionar...');
                setTimeout(() => { window.location.href = '/login?erro=confirmacao'; }, 2000);
            }
        };

        processar();
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0e18', color: '#f0ebe0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <div style={{ textAlign: 'center' }}>
                {!erro ? (
                    <div style={{ width: 44, height: 44, border: '3px solid #c9973e', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
                ) : (
                    <div style={{ fontSize: 40, marginBottom: 20 }}>⚠️</div>
                )}
                <p style={{ fontSize: 16, color: erro ? '#e05050' : '#a0aac0' }}>{mensagem}</p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
