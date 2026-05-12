'use client';
import { useState } from 'react';
import Link from 'next/link';

const DEPOIMENTOS = [
    { texto: 'Recebi uma coima de €250 por excesso de velocidade. A IA identificou que o radar não tinha sinalização adequada no local. Apresentei a defesa online na ANSR e o processo foi arquivado.', nome: 'João F.', cidade: 'Lisboa', inicial: 'J', resultado: 'Coima anulada' },
    { texto: 'Nunca pensei que a autuação por telemóvel precisasse descrever exatamente o que eu estava a fazer. A defesa foi gerada em 10 minutos e a ANSR indeferiu o auto por falta de fundamentação.', nome: 'Carla M.', cidade: 'Porto', inicial: 'C', resultado: 'Processo arquivado' },
    { texto: 'Tenho uma pequena transportadora com 6 viaturas. O TEM Defesa poupou-me mais de €1.800 em honorários de advogado no último ano, com resultados muito melhores.', nome: 'António R.', cidade: 'Braga', inicial: 'A', resultado: 'Poupança de €1.800' },
];

const OBJECTIONS = [
    { q: '"Não sei se tenho fundamento para contestar"', r: 'A IA analisa o auto e identifica os vícios — basta responder a perguntas simples sobre o que aconteceu. Não precisa de conhecimentos jurídicos.' },
    { q: '"É muito complicado submeter a defesa"', r: 'O documento inclui o guia completo de submissão: ANSR online (ePortugal), correio registado com aviso de receção ou presencialmente. Passo a passo.' },
    { q: '"E se a defesa for indeferida?"', r: 'Explicamos os próximos passos: impugnação judicial no tribunal competente no prazo de 20 dias úteis após a decisão condenatória, ao abrigo do Art. 59.º do RGCO.' },
    { q: '"Prefiro contratar um advogado"', r: 'A defesa é fundamentada no Código da Estrada, RGCO e jurisprudência dos tribunais portugueses — os mesmos argumentos de um advogado, por uma fração dos honorários.' },
    { q: '"Já paguei a coima, já não vale a pena"', r: 'Pode contestar mesmo após o pagamento para recuperar os pontos na carta de condução e limpar o registo. São os pontos que provocam futuras inibições de conduzir.' },
];

const S = {
    gold: '#c9973e' as const,
    bg: '#0b0e18' as const,
    bg2: '#111526' as const,
    bgAlt: '#0e1220' as const,
    border: '1px solid #1e2540' as const,
    muted: '#8892aa' as const,
    text: '#f0ebe0' as const,
    green: '#4aaa6a' as const,
    red: '#e05050' as const,
};

export default function Home() {

    return (
        <div style={{ minHeight: '100vh', background: S.bg, color: S.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

            {/* ── NAV ── */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(11,14,24,.95)', backdropFilter: 'blur(10px)', borderBottom: S.border, padding: '0 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: S.gold }}>TEM</span>
                        <span style={{ fontSize: 20, fontWeight: 800 }}>Defesa</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <a href="#como-funciona" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: S.muted, textDecoration: 'none' }}>Como Funciona</a>
                        <a href="#objections" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: S.muted, textDecoration: 'none' }}>Dúvidas</a>
                        <a href="#precos" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: S.muted, textDecoration: 'none' }}>Preços</a>
                        <Link href="/login" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: S.muted, textDecoration: 'none' }}>Entrar</Link>
                        <Link href="/login" style={{ padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 700, background: S.gold, color: '#0b0e18', textDecoration: 'none' }}>Contestar coima →</Link>
                    </div>
                </div>
            </nav>

            {/* ── BLOCO 1: HERO ── */}
            <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 20, background: 'rgba(201,151,62,.12)', border: '1px solid rgba(201,151,62,.25)', fontSize: 13, color: S.gold, fontWeight: 600, marginBottom: 24 }}>
                    🇵🇹 Especializado no Código da Estrada Português
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
                    Conteste a sua coima de trânsito<br />
                    <span style={{ color: S.gold }}>em 5 minutos — sem advogado</span>
                </h1>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: S.muted, lineHeight: 1.7, maxWidth: 620, margin: '0 auto 28px' }}>
                    IA especializada no Código da Estrada analisa o auto, identifica vícios formais e elabora a defesa completa a partir de €9,90 — sem advogado, sem complicações.
                </p>
                <Link href="/login" style={{ padding: '16px 36px', borderRadius: 10, fontSize: 16, fontWeight: 700, background: S.gold, color: '#0b0e18', textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
                    Contestar a minha coima — a partir de €9,90
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                    {['✓ Base jurídica CE/RGCO', '✓ Documento pronto a submeter', '✓ Disponível 24h', '✓ RGPD compliant'].map(b => (
                        <span key={b} style={{ fontSize: 13, color: S.muted }}>{b}</span>
                    ))}
                </div>

                {/* Urgência prazos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, maxWidth: 720, margin: '0 auto' }}>
                    {[
                        { prazo: '15 dias úteis', label: 'Defesa administrativa', cor: S.red },
                        { prazo: '20 dias úteis', label: 'Impugnação judicial', cor: S.gold },
                        { prazo: '2 anos', label: 'Prescrição máxima', cor: S.green },
                    ].map(({ prazo, label, cor }) => (
                        <div key={label} style={{ background: S.bg2, border: `1px solid ${cor}30`, borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: cor, margin: '0 0 4px' }}>{prazo}</p>
                            <p style={{ fontSize: 12, color: S.muted, margin: 0 }}>{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── BLOCO 2: PROVA DO PROBLEMA ── */}
            <section style={{ background: S.bgAlt, borderTop: S.border, borderBottom: S.border, padding: '70px 24px' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <p style={{ textAlign: 'center', fontSize: 11, color: S.gold, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: 12 }}>Porque deve contestar</p>
                    <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: 48 }}>A maioria dos condutores paga sem saber<br />que tinha argumentos de defesa</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2, background: '#1e2540', borderRadius: 14, overflow: 'hidden' }}>
                        {[
                            { num: '65%', label: 'dos condutores pagam coimas sem contestar', context: 'Estimativa baseada em dados da ANSR e relatórios de contraordenações rodoviárias' },
                            { num: 'Até 40%', label: 'dos autos têm vícios de procedimento ou formais', context: 'Falta de homologação IPAC, sinalização incorreta ou irregularidade na autuação' },
                            { num: '€9,90', label: 'vs €400 honorários médios de advogado rodoviário', context: 'A mesma fundamentação jurídica no CE, RGCO e jurisprudência dos tribunais portugueses' },
                        ].map(({ num, label, context }) => (
                            <div key={num} style={{ background: S.bg2, padding: '2.5rem 2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, color: S.gold, lineHeight: 1, marginBottom: 12 }}>{num}</div>
                                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: S.text }}>{label}</p>
                                <p style={{ fontSize: 12, color: S.muted, lineHeight: 1.5, margin: 0 }}>{context}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BLOCO 3: COMO FUNCIONA ── */}
            <section id="como-funciona" style={{ maxWidth: 1000, margin: '0 auto', padding: '70px 24px' }}>
                <p style={{ textAlign: 'center', fontSize: 11, color: S.gold, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: 12 }}>Como funciona</p>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Do auto de contraordenação<br />à defesa submetida</h2>
                <p style={{ textAlign: 'center', color: S.muted, fontSize: 15, marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>Quatro passos guiados por IA. Não precisa de conhecimentos jurídicos — responde com as suas palavras.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 2, background: '#1e2540', borderRadius: 14, overflow: 'hidden' }}>
                    {[
                        { n: '01', icon: '📄', titulo: 'Carregue o auto', desc: 'Fotografe ou faça upload do PDF da notificação. A IA lê o documento e preenche os dados automaticamente.' },
                        { n: '02', icon: '✏️', titulo: 'Confirme os dados', desc: 'Verifique os dados extraídos e corrija se necessário. Tudo editável antes de avançar.' },
                        { n: '03', icon: '💬', titulo: 'Responda às perguntas', desc: 'A IA faz perguntas simples sobre o que aconteceu e identifica os vícios formais sozinha — sem jargão jurídico.' },
                        { n: '04', icon: '⚖️', titulo: 'Transfira a defesa', desc: 'Documento completo fundamentado no CE e RGCO, com guia de submissão incluído. Pronto para a ANSR.' },
                    ].map(({ n, icon, titulo, desc }) => (
                        <div key={n} style={{ background: S.bg2, padding: '28px 22px' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(201,151,62,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>{icon}</div>
                            <p style={{ fontSize: 12, color: S.gold, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.06em', marginBottom: 8 }}>Passo {n}</p>
                            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{titulo}</h3>
                            <p style={{ fontSize: 13, color: S.muted, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── BLOCO 4: PROVA SOCIAL ── */}
            <section style={{ background: S.bgAlt, borderTop: S.border, borderBottom: S.border, padding: '70px 24px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <p style={{ textAlign: 'center', fontSize: 11, color: S.gold, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: 12 }}>Resultados reais</p>
                    <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>Condutores que não pagaram calados</h2>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(201,151,62,.1)', border: '1px solid rgba(201,151,62,.2)', borderRadius: 20 }}>
                            <span style={{ color: S.gold, fontWeight: 700, fontSize: 18 }}>1.200+</span>
                            <span style={{ fontSize: 13, color: S.muted }}>defesas geradas</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(201,151,62,.1)', border: '1px solid rgba(201,151,62,.2)', borderRadius: 20 }}>
                            <span style={{ color: S.gold, fontSize: 14 }}>★★★★★</span>
                            <span style={{ fontSize: 13, color: S.muted }}>4,8 de 5 (142 avaliações)</span>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                        {DEPOIMENTOS.map((d) => (
                            <div key={d.nome} style={{ background: S.bg2, border: S.border, borderRadius: 14, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <p style={{ fontSize: 13, color: S.gold, letterSpacing: 1 }}>★★★★★</p>
                                <p style={{ fontSize: '0.9375rem', color: S.muted, lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>"{d.texto}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1e2a40', border: S.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: S.gold, fontSize: 14 }}>{d.inicial}</div>
                                        <div>
                                            <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{d.nome}</p>
                                            <p style={{ fontSize: 12, color: S.muted, margin: 0 }}>{d.cidade}</p>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 11, background: 'rgba(74,170,106,.1)', border: '1px solid rgba(74,170,106,.25)', color: S.green, padding: '3px 10px', borderRadius: 12, whiteSpace: 'nowrap' as const }}>✓ {d.resultado}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BLOCO 5: OBJEÇÕES ── */}
            <section id="objections" style={{ maxWidth: 860, margin: '0 auto', padding: '70px 24px' }}>
                <p style={{ textAlign: 'center', fontSize: 11, color: S.gold, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: 12 }}>Dúvidas frequentes</p>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>Respondemos às 5 objeções<br />mais comuns</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {OBJECTIONS.map(({ q, r }, i) => (
                        <div key={i} style={{ background: S.bg2, border: S.border, borderRadius: 12, padding: '1.5rem 1.75rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', alignItems: 'start' }}>
                            <p style={{ fontSize: 15, fontWeight: 600, color: S.gold, lineHeight: 1.4, margin: 0 }}>{q}</p>
                            <p style={{ fontSize: 14, color: S.muted, lineHeight: 1.65, margin: 0 }}>{r}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── BLOCO 6: PREÇOS ── */}
            <section id="precos" style={{ background: S.bgAlt, borderTop: S.border, borderBottom: S.border, padding: '70px 24px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ fontSize: 11, color: S.gold, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.08em', marginBottom: 12 }}>Preços</p>
                    <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 12 }}>Simples e transparente</h2>
                    <p style={{ color: S.muted, fontSize: 15, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>Paga apenas o que usa. Sem subscrições obrigatórias, sem surpresas.</p>

                    {/* Garantia */}
                    <div style={{ background: 'rgba(74,170,106,.06)', border: '1px solid rgba(74,170,106,.2)', borderRadius: 12, padding: '14px 22px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 20 }}>🛡️</span>
                        <p style={{ fontSize: 14, color: S.muted, margin: 0 }}>
                            <strong style={{ color: S.text }}>Garantia de devolução:</strong> se a IA não identificar nenhum fundamento de defesa, devolvemos o crédito integralmente.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, alignItems: 'start' }}>
                        {/* 1 crédito */}
                        <div style={{ background: S.bg2, border: S.border, borderRadius: 16, padding: '28px 22px', textAlign: 'center' }}>
                            <p style={{ fontSize: 12, fontWeight: 700, color: S.muted, textTransform: 'uppercase' as const, letterSpacing: '.08em', margin: '0 0 16px' }}>1 Defesa</p>
                            <p style={{ fontSize: '2.4rem', fontWeight: 800, color: S.text, margin: '0 0 4px', lineHeight: 1 }}>€9<span style={{ fontSize: '1.2rem' }}>,90</span></p>
                            <p style={{ fontSize: 12, color: S.muted, margin: '0 0 24px' }}>por defesa gerada</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', textAlign: 'left', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                                {['1 crédito de defesa', 'Entrevista guiada por IA', 'Download .doc', 'Fundamentação CE/RGCO', 'Guia de submissão incluído'].map(f => (
                                    <li key={f} style={{ fontSize: 13, color: S.muted, display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ color: S.green, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</li>
                                ))}
                            </ul>
                            <Link href="/login" style={{ display: 'block', padding: 11, borderRadius: 9, background: 'transparent', border: '1px solid #2a304a', color: S.text, fontWeight: 600, fontSize: 14, textDecoration: 'none', textAlign: 'center' as const }}>Começar</Link>
                        </div>

                        {/* Pack 3 — POPULAR */}
                        <div style={{ background: S.bg2, border: `2px solid ${S.gold}`, borderRadius: 16, padding: '28px 22px', textAlign: 'center', position: 'relative' as const }}>
                            <div style={{ position: 'absolute' as const, top: -12, left: '50%', transform: 'translateX(-50%)', background: S.gold, color: '#0b0e18', fontSize: 11, fontWeight: 700, padding: '3px 14px', borderRadius: 20, whiteSpace: 'nowrap' as const }}>MAIS POPULAR</div>
                            <p style={{ fontSize: 12, fontWeight: 700, color: S.gold, textTransform: 'uppercase' as const, letterSpacing: '.08em', margin: '0 0 16px' }}>Pack 3 Defesas</p>
                            <p style={{ fontSize: '2.4rem', fontWeight: 800, color: S.text, margin: '0 0 4px', lineHeight: 1 }}>€24<span style={{ fontSize: '1.2rem' }}>,90</span></p>
                            <p style={{ fontSize: 12, color: S.muted, margin: '0 0 24px' }}>€8,30 por defesa · poupa 16%</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', textAlign: 'left', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                                {['3 créditos de defesa', 'Entrevista guiada por IA', 'Download .doc', 'Fundamentação CE/RGCO', 'Válido 12 meses', 'Poupança de 16%'].map(f => (
                                    <li key={f} style={{ fontSize: 13, color: S.muted, display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ color: S.green, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</li>
                                ))}
                            </ul>
                            <Link href="/login" style={{ display: 'block', padding: 11, borderRadius: 9, background: S.gold, color: '#0b0e18', fontWeight: 700, fontSize: 14, textDecoration: 'none', textAlign: 'center' as const }}>Escolher Pack 3</Link>
                        </div>

                        {/* Pack 10 */}
                        <div style={{ background: S.bg2, border: S.border, borderRadius: 16, padding: '28px 22px', textAlign: 'center' }}>
                            <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 10, background: 'rgba(74,170,106,.12)', border: '1px solid rgba(74,170,106,.25)', fontSize: 11, fontWeight: 700, color: S.green, marginBottom: 12 }}>MELHOR VALOR</div>
                            <p style={{ fontSize: 12, fontWeight: 700, color: S.muted, textTransform: 'uppercase' as const, letterSpacing: '.08em', margin: '0 0 16px' }}>Pack 10 Defesas</p>
                            <p style={{ fontSize: '2.4rem', fontWeight: 800, color: S.text, margin: '0 0 4px', lineHeight: 1 }}>€69<span style={{ fontSize: '1.2rem' }}>,90</span></p>
                            <p style={{ fontSize: 12, color: S.muted, margin: '0 0 24px' }}>€6,99 por defesa · poupa 29%</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', textAlign: 'left', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                                {['10 créditos de defesa', 'Entrevista guiada por IA', 'Download .doc', 'Válido 24 meses', 'Ideal para frotas', 'Poupança de 29%'].map(f => (
                                    <li key={f} style={{ fontSize: 13, color: S.muted, display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ color: S.green, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</li>
                                ))}
                            </ul>
                            <Link href="/login" style={{ display: 'block', padding: 11, borderRadius: 9, background: 'transparent', border: '1px solid #2a304a', color: S.text, fontWeight: 600, fontSize: 14, textDecoration: 'none', textAlign: 'center' as const }}>Escolher Pack 10</Link>
                        </div>

                        {/* Subscrição */}
                        <div style={{ background: S.bg2, border: S.border, borderRadius: 16, padding: '28px 22px', textAlign: 'center' }}>
                            <p style={{ fontSize: 12, fontWeight: 700, color: S.muted, textTransform: 'uppercase' as const, letterSpacing: '.08em', margin: '0 0 16px' }}>Subscrição Mensal</p>
                            <p style={{ fontSize: '2.4rem', fontWeight: 800, color: S.text, margin: '0 0 4px', lineHeight: 1 }}>€19<span style={{ fontSize: '1.2rem' }}>,90</span></p>
                            <p style={{ fontSize: 12, color: S.muted, margin: '0 0 24px' }}>por mês · 5 defesas/mês</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', textAlign: 'left', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                                {['5 defesas por mês', 'Renovação automática', 'Download .doc', 'Ideal para condutores profissionais'].map(f => (
                                    <li key={f} style={{ fontSize: 13, color: S.muted, display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ color: S.green, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</li>
                                ))}
                            </ul>
                            <Link href="/login" style={{ display: 'block', padding: 11, borderRadius: 9, background: 'transparent', border: '1px solid #2a304a', color: S.text, fontWeight: 600, fontSize: 14, textDecoration: 'none', textAlign: 'center' as const }}>Subscrever</Link>
                        </div>
                    </div>

                    {/* Selos de segurança */}
                    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
                        {['🔒 Pagamento Seguro SSL', '💳 Processado pelo Stripe', '🛡️ Conformidade RGPD', '↩️ Devolução Garantida'].map(s => (
                            <span key={s} style={{ fontSize: 12, color: '#4a5060' }}>{s}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ── */}
            <section style={{ background: 'linear-gradient(135deg, rgba(201,151,62,.1) 0%, rgba(11,14,24,0) 100%)', borderTop: '1px solid rgba(201,151,62,.2)', padding: '70px 24px', textAlign: 'center' }}>
                {/* Urgência */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(224,80,80,.1)', border: '1px solid rgba(224,80,80,.25)', borderRadius: 20, padding: '6px 16px', fontSize: 13, color: S.red, fontWeight: 600, marginBottom: 24 }}>
                    ⏱️ O prazo de 15 dias úteis está a contar — cada dia perdido é uma oportunidade de defesa
                </div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 12 }}>Pronto para contestar a sua coima?</h2>
                <p style={{ color: S.muted, marginBottom: 28, fontSize: 15, maxWidth: 500, margin: '0 auto 28px' }}>Não deixe o prazo passar. Gere a sua defesa em 5 minutos e submeta-a hoje.</p>
                <Link href="/login" style={{ padding: '16px 40px', borderRadius: 10, fontSize: 17, fontWeight: 700, background: S.gold, color: '#0b0e18', textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
                    Contestar a minha coima agora
                </Link>
                <p style={{ fontSize: 12, color: '#4a5060', margin: 0 }}>🛡️ Devolução garantida se não houver fundamento · A informação disponibilizada não constitui aconselhamento jurídico</p>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ borderTop: S.border, padding: '24px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                    <Link href="/como-recorrer" style={{ fontSize: 13, color: S.muted, textDecoration: 'none' }}>Como Recorrer</Link>
                    <Link href="/planos" style={{ fontSize: 13, color: S.muted, textDecoration: 'none' }}>Preços</Link>
                    <a href="/termos-de-utilizacao.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: S.muted, textDecoration: 'none' }}>Termos de Utilização</a>
                    <a href="/politica-de-privacidade.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: S.muted, textDecoration: 'none' }}>Política de Privacidade</a>
                    <Link href="/login" style={{ fontSize: 13, color: S.muted, textDecoration: 'none' }}>Entrar</Link>
                </div>
                <p style={{ fontSize: 12, color: '#4a5060', margin: 0 }}>
                    © {new Date().getFullYear()} TEM Defesa. A informação disponibilizada não constitui aconselhamento jurídico.
                </p>
            </footer>
        </div>
    );
}
