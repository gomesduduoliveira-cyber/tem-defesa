'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const IS = { width: '100%', padding: '11px 14px', borderRadius: 10, background: '#151b2e', border: '1px solid #2a304a', color: '#f0ebe0', outline: 'none', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const };
const LS = { display: 'block', fontSize: 11, fontWeight: 600, color: '#8892aa', textTransform: 'uppercase' as const, letterSpacing: '.06em', marginBottom: 5 };

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) { setIsError(true); setMessage('As palavras-passe não coincidem.'); return; }
        setLoading(true); setMessage(''); setIsError(false);
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            setMessage('Palavra-passe atualizada com sucesso! A redirecionar...');
            setTimeout(() => window.location.href = '/dashboard', 2000);
        } catch (err: any) {
            setIsError(true);
            setMessage(err.message || 'Erro ao atualizar a palavra-passe.');
        } finally { setLoading(false); }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0e18', padding: 20 }}>
            <div style={{ width: '100%', maxWidth: 420 }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>TEM Defesa</h1>
                    <p style={{ color: '#8892aa', marginTop: 6 }}>Definir nova palavra-passe</p>
                </div>
                <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '28px 24px' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 14 }}>
                            <label style={LS}>Nova palavra-passe *</label>
                            <input style={IS} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <label style={LS}>Confirmar palavra-passe *</label>
                            <input style={{ ...IS, ...(confirm && password !== confirm ? { border: '1px solid rgba(224,80,80,.6)' } : {}) }} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" required />
                            {confirm && password !== confirm && <p style={{ fontSize: 11, color: '#e05050', marginTop: 4 }}>As palavras-passe não coincidem.</p>}
                        </div>
                        {message && (
                            <div style={{ marginBottom: 16, padding: '11px 14px', borderRadius: 8, fontSize: 13, background: isError ? 'rgba(224,80,80,.1)' : 'rgba(74,170,106,.1)', color: isError ? '#e05050' : '#4aaa6a', border: `1px solid ${isError ? 'rgba(224,80,80,.2)' : 'rgba(74,170,106,.2)'}` }}>
                                {message}
                            </div>
                        )}
                        <button type="submit" disabled={loading} style={{ width: '100%', padding: 13, borderRadius: 10, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', opacity: loading ? .7 : 1 }}>
                            {loading ? 'A aguardar...' : 'Guardar palavra-passe'}
                        </button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Link href="/login" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>← Voltar ao início de sessão</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
