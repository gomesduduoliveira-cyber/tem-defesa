'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [menuAberto, setMenuAberto] = useState(false);

    const PASSOS = [
        { n: '1', titulo: 'Carregue o seu auto', desc: 'Fotografe ou faça upload do PDF da notificação de coima recebida da ANSR, GNR ou PSP.', icon: '📄' },
        { n: '2', titulo: 'A IA extrai os dados', desc: 'A nossa inteligência artificial lê o documento e preenche automaticamente os dados da contraordenação.', icon: '🤖' },
        { n: '3', titulo: 'Descreva o sucedido', desc: 'Explique, com as suas palavras, o que aconteceu no momento da infração. Mais detalhes resultam numa defesa mais sólida.', icon: '✍️' },
        { n: '4', titulo: 'Transfira a sua defesa', desc: 'Recebe um documento de defesa fundamentado no Código da Estrada e no RGCO, pronto a submeter à ANSR.', icon: '⚖️' },
    ];

    const FAQS = [
        { q: 'Que tipo de coimas posso contestar?', r: 'Contraordenações rodoviárias emitidas pela ANSR, GNR, PSP ou câmaras municipais: excesso de velocidade, uso de telemóvel, sinal vermelho, estacionamento indevido, cinto de segurança, alcoolemia, entre outras.' },
        { q: 'Qual é o prazo para apresentar defesa?', r: 'Dispõe de 15 dias úteis a contar da data de notificação para apresentar defesa escrita junto da autoridade autuante. Após decisão condenatória, tem 20 dias úteis para impugnar judicialmente.' },
        { q: 'A defesa gerada é juridicamente válida?', r: 'Sim. A defesa é elaborada com base no Código da Estrada, no RGCO e na jurisprudência dos tribunais portugueses. Não substitui, contudo, a consulta a um advogado em casos complexos.' },
        { q: 'Como é que submeto a defesa?', r: 'Pode entregar pessoalmente na entidade autuante, enviar por correio registado com aviso de receção, ou submeter através do portal da ANSR (ePortugal.gov.pt).' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#0b0e18', color: '#f0ebe0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

            {/* ── NAV ── */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(11,14,24,.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e2540', padding: '0 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#c9973e' }}>TEM</span>
                        <span style={{ fontSize: 20, fontWeight: 800 }}>Defesa</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Link href="/como-recorrer" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#8892aa', textDecoration: 'none' }}>Como Recorrer</Link>
                        <Link href="/login" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#8892aa', textDecoration: 'none' }}>Entrar</Link>
                        <Link href="/login" style={{ padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: '#c9973e', color: '#0b0e18', textDecoration: 'none' }}>Começar grátis</Link>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 20, background: 'rgba(201,151,62,.12)', border: '1px solid rgba(201,151,62,.25)', fontSize: 13, color: '#c9973e', fontWeight: 600, marginBottom: 24 }}>
                    🇵🇹 Especializado no Código da Estrada Português
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
                    Conteste a sua coima de trânsito<br />
                    <span style={{ color: '#c9973e' }}>com Inteligência Artificial</span>
                </h1>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#a0aac0', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 36px' }}>
                    Carregue o auto de contraordenação e obtenha em minutos uma defesa fundamentada no
                    Código da Estrada e na jurisprudência dos tribunais portugueses.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/login" style={{ padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700, background: '#c9973e', color: '#0b0e18', textDecoration: 'none', display: 'inline-block' }}>
                        Contestar a minha coima
                    </Link>
                    <Link href="/como-recorrer" style={{ padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, border: '1px solid #2a304a', color: '#f0ebe0', textDecoration: 'none', display: 'inline-block' }}>
                        Saber mais
                    </Link>
                </div>

                {/* Badges */}
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
                    {['⚖️ Base jurídica certificada', '🔒 Dados protegidos (RGPD)', '⏱️ Defesa em minutos', '📄 Documento pronto a submeter'].map(b => (
                        <div key={b} style={{ fontSize: 13, color: '#8892aa', display: 'flex', alignItems: 'center', gap: 6 }}>{b}</div>
                    ))}
                </div>
            </section>

            {/* ── PRAZOS ── */}
            <section style={{ background: '#0e1220', borderTop: '1px solid #1e2540', borderBottom: '1px solid #1e2540', padding: '40px 24px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <p style={{ textAlign: 'center', fontSize: 13, color: '#c9973e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 24 }}>Prazos legais — Art. 50.º e 59.º do RGCO</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                        {[
                            { prazo: '15 dias úteis', label: 'Defesa administrativa', desc: 'Após a notificação do auto de contraordenação', cor: '#e05050' },
                            { prazo: '20 dias úteis', label: 'Impugnação judicial', desc: 'Após a decisão condenatória da autoridade', cor: '#c9973e' },
                            { prazo: '2 anos', label: 'Prescrição', desc: 'Prazo máximo de prescrição da contraordenação', cor: '#4aaa6a' },
                        ].map(({ prazo, label, desc, cor }) => (
                            <div key={label} style={{ background: '#111526', border: `1px solid ${cor}30`, borderRadius: 12, padding: '20px 18px', textAlign: 'center' }}>
                                <p style={{ fontSize: '1.6rem', fontWeight: 800, color: cor, margin: '0 0 6px' }}>{prazo}</p>
                                <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 6px' }}>{label}</p>
                                <p style={{ fontSize: 12, color: '#8892aa', margin: 0 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COMO FUNCIONA ── */}
            <section style={{ maxWidth: 1000, margin: '0 auto', padding: '70px 24px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Como funciona</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                    {PASSOS.map(p => (
                        <div key={p.n} style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '28px 22px' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(201,151,62,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>{p.icon}</div>
                            <p style={{ fontSize: 12, color: '#c9973e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Passo {p.n}</p>
                            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{p.titulo}</h3>
                            <p style={{ fontSize: 13, color: '#8892aa', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── INFRAÇÕES ── */}
            <section style={{ background: '#0e1220', borderTop: '1px solid #1e2540', borderBottom: '1px solid #1e2540', padding: '60px 24px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 12 }}>Infrações que contestamos</h2>
                    <p style={{ color: '#8892aa', marginBottom: 40, fontSize: 15 }}>Cobertura das principais contraordenações rodoviárias em Portugal</p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[
                            '🚗 Excesso de velocidade', '📱 Uso de telemóvel', '🚦 Avanço de sinal vermelho',
                            '🅿️ Estacionamento indevido', '🔒 Falta de cinto', '🍺 Alcoolemia',
                            '📋 Carta de condução', '⚠️ Outras contraordenações',
                        ].map(i => (
                            <div key={i} style={{ padding: '10px 18px', borderRadius: 20, background: '#151b2e', border: '1px solid #2a304a', fontSize: 14, color: '#c0cce0' }}>{i}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{ maxWidth: 780, margin: '0 auto', padding: '70px 24px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Perguntas frequentes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {FAQS.map(({ q, r }) => (
                        <div key={q} style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 12, padding: '20px 22px' }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: '#f0ebe0' }}>{q}</h3>
                            <p style={{ fontSize: 13, color: '#8892aa', lineHeight: 1.65, margin: 0 }}>{r}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ background: 'linear-gradient(135deg, rgba(201,151,62,.12) 0%, rgba(11,14,24,0) 100%)', borderTop: '1px solid rgba(201,151,62,.2)', padding: '60px 24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 12 }}>Pronto para contestar a sua coima?</h2>
                <p style={{ color: '#8892aa', marginBottom: 28, fontSize: 15 }}>Crie a sua conta gratuitamente e gere a sua primeira defesa em minutos.</p>
                <Link href="/login" style={{ padding: '14px 36px', borderRadius: 10, fontSize: 16, fontWeight: 700, background: '#c9973e', color: '#0b0e18', textDecoration: 'none', display: 'inline-block' }}>
                    Começar agora — é grátis
                </Link>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ borderTop: '1px solid #1e2540', padding: '24px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                    <Link href="/como-recorrer" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Como Recorrer</Link>
                    <Link href="/termos" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Termos de Utilização</Link>
                    <Link href="/privacidade" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Política de Privacidade</Link>
                    <Link href="/login" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Entrar</Link>
                </div>
                <p style={{ fontSize: 12, color: '#4a5060', margin: 0 }}>
                    © {new Date().getFullYear()} TEM Defesa. A informação disponibilizada não constitui aconselhamento jurídico.
                </p>
            </footer>
        </div>
    );
}
