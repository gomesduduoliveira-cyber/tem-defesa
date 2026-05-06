'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const IS = { width: '100%', padding: '11px 14px', borderRadius: 10, background: '#151b2e', border: '1px solid #2a304a', color: '#f0ebe0', outline: 'none', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const };
const IS_ERR = { ...IS, border: '1px solid rgba(224,80,80,.6)' };
const LS = { display: 'block', fontSize: 11, fontWeight: 600, color: '#8892aa', textTransform: 'uppercase' as const, letterSpacing: '.06em', marginBottom: 5 };

function validarNIF(nif: string): boolean {
    const n = nif.replace(/\D/g, '');
    if (n.length !== 9) return false;
    if (!['1','2','3','5','6','7','8','9'].includes(n[0])) return false;
    let total = 0;
    for (let i = 0; i < 8; i++) total += parseInt(n[i]) * (9 - i);
    const resto = total % 11;
    const digVerif = resto < 2 ? 0 : 11 - resto;
    return digVerif === parseInt(n[8]);
}

function formatarTelemovel(v: string) {
    return v.replace(/\D/g, '').slice(0, 9)
        .replace(/(\d{3})(\d)/, '$1 $2')
        .replace(/(\d{3})(\d{1,3})$/, '$1 $2');
}

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [isRecovery, setIsRecovery] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [recoveryEmail, setRecoveryEmail] = useState('');

    const [tipoPessoa, setTipoPessoa] = useState<'singular' | 'coletiva'>('singular');
    const [nome, setNome] = useState('');
    const [nif, setNif] = useState('');
    const [nifErro, setNifErro] = useState('');
    const [cartaConducao, setCartaConducao] = useState('');
    const [telemovel, setTelemovel] = useState('');
    const [morada, setMorada] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [localidade, setLocalidade] = useState('');

    const handleNIF = (v: string) => { setNif(v.replace(/\D/g, '').slice(0, 9)); setNifErro(''); };
    const handleNIFBlur = () => {
        if (!nif) return;
        if (!validarNIF(nif)) setNifErro('NIF inválido. Verifique os números introduzidos.');
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setMessage(''); setIsError(false);
        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                window.location.href = '/dashboard';
            } else {
                if (email !== confirmEmail) { setIsError(true); setMessage('Os endereços de e-mail não coincidem.'); setLoading(false); return; }
                if (password !== confirmPassword) { setIsError(true); setMessage('As palavras-passe não coincidem.'); setLoading(false); return; }
                if (nif && !validarNIF(nif)) { setIsError(true); setMessage('NIF inválido.'); setLoading(false); return; }

                const moradaCompleta = [morada, codigoPostal ? `CP ${codigoPostal}` : '', localidade].filter(Boolean).join(', ');

                const { error } = await supabase.auth.signUp({
                    email, password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/dashboard`,
                        data: { tipo_pessoa: tipoPessoa, nome, nif, carta_conducao: cartaConducao, telemovel, morada: moradaCompleta }
                    }
                });
                if (error) throw error;
                setMessage('Registo efetuado! Verifique o seu e-mail para confirmar a conta.');
            }
        } catch (err: any) {
            setIsError(true);
            setMessage(err.message?.includes('already registered') ? 'Este e-mail já se encontra registado.' : (err.message || 'Ocorreu um erro.'));
        } finally { setLoading(false); }
    };

    const handleRecovery = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setMessage(''); setIsError(false);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(recoveryEmail, { redirectTo: `${window.location.origin}/auth/reset-password` });
            if (error) throw error;
            setMessage('Link de recuperação enviado! Verifique a sua caixa de entrada.');
            setRecoveryEmail('');
        } catch (err: any) {
            setIsError(true);
            setMessage(err.message || 'Erro ao enviar link de recuperação.');
        } finally { setLoading(false); }
    };

    const limpar = () => { setIsLogin(!isLogin); setMessage(''); setConfirmEmail(''); setConfirmPassword(''); setNifErro(''); };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0b0e18', color: '#f0ebe0' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #1e2540' }}>
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: '#c9973e', letterSpacing: '-0.5px' }}>TEM</span>
                    <span style={{ fontSize: 22, fontWeight: 800, color: '#f0ebe0', letterSpacing: '-0.5px' }}>Defesa</span>
                </Link>
                <Link href="/" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>← Voltar ao site</Link>
            </header>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 16px' }}>
                <div style={{ width: '100%', maxWidth: isLogin && !isRecovery ? 420 : 680, transition: 'max-width .3s' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 6 }}>
                            {isRecovery ? 'Recuperar palavra-passe' : isLogin ? 'Iniciar sessão' : 'Criar conta'}
                        </h1>
                        <p style={{ fontSize: 14, color: '#8892aa' }}>
                            {isRecovery ? 'Introduza o seu e-mail para receber um link de recuperação'
                                : isLogin ? 'Plataforma de defesa de contraordenações rodoviárias'
                                : 'Preencha os seus dados para começar'}
                        </p>
                    </div>

                    <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '28px 24px' }}>
                        {isRecovery ? (
                            <form onSubmit={handleRecovery}>
                                <div style={{ marginBottom: 16 }}>
                                    <label style={LS}>E-mail *</label>
                                    <input style={IS} type="email" value={recoveryEmail} onChange={e => setRecoveryEmail(e.target.value)} placeholder="o.seu@email.pt" required />
                                </div>
                                {message && <div style={{ marginBottom: 16, padding: '11px 14px', borderRadius: 8, fontSize: 13, background: isError ? 'rgba(224,80,80,.1)' : 'rgba(74,170,106,.1)', color: isError ? '#e05050' : '#4aaa6a', border: `1px solid ${isError ? 'rgba(224,80,80,.2)' : 'rgba(74,170,106,.2)'}` }}>{message}</div>}
                                <button type="submit" disabled={loading} style={{ width: '100%', padding: 13, borderRadius: 10, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', opacity: loading ? .7 : 1 }}>
                                    {loading ? 'A aguardar...' : 'Enviar link de recuperação'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: 16 }}>
                                    <button type="button" onClick={() => { setIsRecovery(false); setMessage(''); }} style={{ background: 'none', border: 'none', color: '#8892aa', fontSize: 14, cursor: 'pointer' }}>
                                        ← <span style={{ color: '#c9973e', fontWeight: 600 }}>Voltar ao início de sessão</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleAuth}>
                                {!isLogin && (
                                    <>
                                        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                                            {(['singular', 'coletiva'] as const).map(t => (
                                                <button key={t} type="button" onClick={() => { setTipoPessoa(t); setNif(''); setNifErro(''); }}
                                                    style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${tipoPessoa === t ? '#c9973e' : '#2a304a'}`, background: tipoPessoa === t ? 'rgba(201,151,62,.1)' : 'transparent', color: tipoPessoa === t ? '#c9973e' : '#8892aa', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                                                    {t === 'singular' ? '👤 Pessoa Singular' : '🏢 Pessoa Coletiva (Frota)'}
                                                </button>
                                            ))}
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                            <div style={{ gridColumn: '1/-1' }}>
                                                <label style={LS}>{tipoPessoa === 'coletiva' ? 'Denominação Social *' : 'Nome Completo *'}</label>
                                                <input style={IS} value={nome} onChange={e => setNome(e.target.value)} required placeholder={tipoPessoa === 'coletiva' ? 'A Sua Empresa, Lda.' : 'João da Silva'} />
                                            </div>

                                            <div>
                                                <label style={LS}>NIF *</label>
                                                <input style={nifErro ? IS_ERR : IS} value={nif} onChange={e => handleNIF(e.target.value)} onBlur={handleNIFBlur} placeholder="123456789" maxLength={9} />
                                                {nifErro && <p style={{ fontSize: 11, color: '#e05050', marginTop: 4 }}>{nifErro}</p>}
                                            </div>

                                            <div>
                                                <label style={LS}>Telemóvel *</label>
                                                <input style={IS} type="tel" value={telemovel} onChange={e => setTelemovel(formatarTelemovel(e.target.value))} required placeholder="9XX XXX XXX" />
                                            </div>

                                            {tipoPessoa === 'singular' && (
                                                <div style={{ gridColumn: '1/-1' }}>
                                                    <label style={LS}>N.º Carta de Condução <span style={{ fontWeight: 400, opacity: .6 }}>(facultativo)</span></label>
                                                    <input style={IS} value={cartaConducao} onChange={e => setCartaConducao(e.target.value)} placeholder="00000000" maxLength={12} />
                                                </div>
                                            )}

                                            <div style={{ gridColumn: '1/-1', borderTop: '1px solid #1e2540', paddingTop: 14 }}>
                                                <p style={{ fontSize: 11, fontWeight: 600, color: '#8892aa', textTransform: 'uppercase', letterSpacing: '.06em', margin: 0 }}>📍 Morada</p>
                                            </div>

                                            <div style={{ gridColumn: '1/-1' }}>
                                                <label style={LS}>Rua / Avenida *</label>
                                                <input style={IS} value={morada} onChange={e => setMorada(e.target.value)} required placeholder="Rua de Exemplo, n.º 1" />
                                            </div>

                                            <div>
                                                <label style={LS}>Código Postal *</label>
                                                <input style={IS} value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} required placeholder="0000-000" maxLength={8} />
                                            </div>

                                            <div>
                                                <label style={LS}>Localidade *</label>
                                                <input style={IS} value={localidade} onChange={e => setLocalidade(e.target.value)} required placeholder="Lisboa" />
                                            </div>
                                        </div>

                                        <div style={{ height: 1, background: '#1e2540', margin: '20px 0' }} />
                                    </>
                                )}

                                <div style={{ display: 'grid', gridTemplateColumns: isLogin ? '1fr' : '1fr 1fr', gap: 14, marginBottom: 14 }}>
                                    <div>
                                        <label style={LS}>E-mail *</label>
                                        <input style={IS} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="o.seu@email.pt" required />
                                    </div>
                                    {!isLogin && (
                                        <div>
                                            <label style={LS}>Confirmar e-mail *</label>
                                            <input style={confirmEmail && email !== confirmEmail ? IS_ERR : IS} type="email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} placeholder="repita o seu e-mail" required />
                                            {confirmEmail && email !== confirmEmail && <p style={{ fontSize: 11, color: '#e05050', marginTop: 4 }}>Os e-mails não coincidem.</p>}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: isLogin ? '1fr' : '1fr 1fr', gap: 14 }}>
                                    <div>
                                        <label style={LS}>Palavra-passe *</label>
                                        <input style={IS} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                                    </div>
                                    {!isLogin && (
                                        <div>
                                            <label style={LS}>Confirmar palavra-passe *</label>
                                            <input style={confirmPassword && password !== confirmPassword ? IS_ERR : IS} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
                                            {confirmPassword && password !== confirmPassword && <p style={{ fontSize: 11, color: '#e05050', marginTop: 4 }}>As palavras-passe não coincidem.</p>}
                                        </div>
                                    )}
                                </div>

                                {isLogin && (
                                    <div style={{ textAlign: 'right', marginTop: 8 }}>
                                        <button type="button" onClick={() => { setIsRecovery(true); setMessage(''); }} style={{ background: 'none', border: 'none', color: '#8892aa', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
                                            Esqueci a palavra-passe
                                        </button>
                                    </div>
                                )}

                                {message && (
                                    <div style={{ marginTop: 16, padding: '11px 14px', borderRadius: 8, fontSize: 13, background: isError ? 'rgba(224,80,80,.1)' : 'rgba(74,170,106,.1)', color: isError ? '#e05050' : '#4aaa6a', border: `1px solid ${isError ? 'rgba(224,80,80,.2)' : 'rgba(74,170,106,.2)'}` }}>
                                        {message}
                                    </div>
                                )}

                                <button type="submit" disabled={loading} style={{ width: '100%', marginTop: 20, padding: 13, borderRadius: 10, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', opacity: loading ? .7 : 1 }}>
                                    {loading ? 'A aguardar...' : isLogin ? 'Entrar' : 'Finalizar registo'}
                                </button>
                            </form>
                        )}

                        {!isRecovery && (
                            <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid #1e2540' }}>
                                <button type="button" onClick={limpar} style={{ background: 'none', border: 'none', color: '#8892aa', fontSize: 14, cursor: 'pointer' }}>
                                    {isLogin
                                        ? <>Novo utilizador? <span style={{ color: '#c9973e', fontWeight: 600 }}>Criar conta gratuitamente</span></>
                                        : <>Já tem conta? <span style={{ color: '#c9973e', fontWeight: 600 }}>Iniciar sessão</span></>}
                                </button>
                            </div>
                        )}
                    </div>

                    <p style={{ textAlign: 'center', fontSize: 12, color: '#8892aa', marginTop: 16 }}>
                        Ao aceder, aceita os nossos{' '}
                        <Link href="/termos" style={{ color: '#c9973e' }}>Termos de Utilização</Link>
                        {' '}e{' '}
                        <Link href="/privacidade" style={{ color: '#c9973e' }}>Política de Privacidade</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
