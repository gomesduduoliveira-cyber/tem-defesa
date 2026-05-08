'use client';
import Link from 'next/link';

const PLANOS = [
    {
        id: '1-defesa',
        nome: '1 Defesa',
        preco: '9,90',
        unidade: 'por defesa',
        descricao: null,
        badge: null,
        destaque: false,
        features: [
            '1 crédito de defesa',
            'Documento .doc para download',
            'Fundamentação no RGCO e Código da Estrada',
            'Jurisprudência dos tribunais portugueses',
            'Crédito válido por 12 meses',
        ],
        cta: 'Comprar 1 defesa',
        ctaLink: '/login',
    },
    {
        id: 'pack-3',
        nome: 'Pack 3 Defesas',
        preco: '24,90',
        unidade: '€8,30 por defesa · poupa 16%',
        descricao: 'O mais escolhido',
        badge: 'MAIS POPULAR',
        badgeCor: '#c9973e',
        destaque: true,
        features: [
            '3 créditos de defesa',
            'Documento .doc para download',
            'Fundamentação no RGCO e Código da Estrada',
            'Jurisprudência dos tribunais portugueses',
            'Créditos válidos por 12 meses',
            'Poupança de 16% vs. unitário',
        ],
        cta: 'Escolher Pack 3',
        ctaLink: '/login',
    },
    {
        id: 'pack-10',
        nome: 'Pack 10 Defesas',
        preco: '69,90',
        unidade: '€6,99 por defesa · poupa 29%',
        descricao: 'Ideal para frotas e empresas',
        badge: 'MELHOR VALOR',
        badgeCor: '#4aaa6a',
        destaque: false,
        features: [
            '10 créditos de defesa',
            'Documento .doc para download',
            'Fundamentação no RGCO e Código da Estrada',
            'Jurisprudência dos tribunais portugueses',
            'Créditos válidos por 24 meses',
            'Ideal para frotas, transportadoras e empresas',
            'Poupança de 29% vs. unitário',
        ],
        cta: 'Escolher Pack 10',
        ctaLink: '/login',
    },
    {
        id: 'mensal',
        nome: 'Subscrição Mensal',
        preco: '19,90',
        unidade: 'por mês · 5 defesas/mês',
        descricao: 'Para condutores profissionais',
        badge: null,
        destaque: false,
        features: [
            '5 defesas por mês incluídas',
            'Renovação automática mensal',
            'Documento .doc para download',
            'Fundamentação no RGCO e Código da Estrada',
            'Ideal para motoristas profissionais e frotas',
            'Cancele quando quiser',
        ],
        cta: 'Subscrever',
        ctaLink: '/login',
    },
];

const FAQS = [
    {
        q: 'O que é um crédito?',
        r: 'Cada crédito equivale a uma defesa gerada. Um crédito é debitado quando submete um auto de contraordenação e gera o documento de defesa final.',
    },
    {
        q: 'Os créditos têm prazo de validade?',
        r: 'Os créditos comprados em pack unitário ou Pack 3 são válidos por 12 meses. Os do Pack 10 por 24 meses. Os créditos da subscrição mensal expiram no final de cada mês.',
    },
    {
        q: 'Posso usar os créditos para qualquer tipo de contraordenação?',
        r: 'Sim. Os créditos funcionam para qualquer contraordenação rodoviária: excesso de velocidade, uso de telemóvel, avanço de sinal vermelho, estacionamento indevido, alcoolemia, entre outras.',
    },
    {
        q: 'Como funciona a subscrição mensal?',
        r: 'A subscrição renova-se automaticamente todos os meses. Inclui 5 defesas mensais — os créditos não transitam para o mês seguinte. Pode cancelar a qualquer momento.',
    },
    {
        q: 'A defesa gerada garante o sucesso do recurso?',
        r: 'Não garantimos resultado — nenhum serviço jurídico pode fazê-lo. A TEM Defesa gera documentos fundamentados no RGCO, no Código da Estrada e na jurisprudência portuguesa. O sucesso depende das circunstâncias concretas de cada caso.',
    },
    {
        q: 'Quais os métodos de pagamento disponíveis?',
        r: 'Aceitamos cartão de crédito/débito via Stripe (Visa, Mastercard, American Express). MB Way em fase de implementação.',
    },
];

export default function Planos() {
    return (
        <div style={{ minHeight: '100vh', background: '#0b0e18', color: '#f0ebe0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

            {/* ── NAV ── */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(11,14,24,.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e2540', padding: '0 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#c9973e' }}>TEM</span>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#f0ebe0' }}>Defesa</span>
                    </Link>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Link href="/como-recorrer" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#8892aa', textDecoration: 'none' }}>Como Recorrer</Link>
                        <Link href="/login" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#8892aa', textDecoration: 'none' }}>Entrar</Link>
                        <Link href="/login" style={{ padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: '#c9973e', color: '#0b0e18', textDecoration: 'none' }}>Começar grátis</Link>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section style={{ maxWidth: 700, margin: '0 auto', padding: '64px 24px 48px', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 20, background: 'rgba(201,151,62,.1)', border: '1px solid rgba(201,151,62,.2)', fontSize: 12, color: '#c9973e', fontWeight: 700, marginBottom: 20, textTransform: 'uppercase' as const, letterSpacing: '.08em' }}>
                    Preços
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
                    Paga apenas o que usas
                </h1>
                <p style={{ fontSize: 15, color: '#8892aa', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
                    Sem subscrições obrigatórias. Compra créditos quando precisas e usa-os ao teu ritmo.
                    Uma coima de €120 custa 7× mais do que gerar a defesa.
                </p>
            </section>

            {/* ── CARDS ── */}
            <section style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px 64px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, alignItems: 'start' }}>
                    {PLANOS.map(p => (
                        <div key={p.id} style={{
                            background: '#111526',
                            border: p.destaque ? '2px solid #c9973e' : '1px solid #1e2540',
                            borderRadius: 18,
                            padding: '32px 24px',
                            textAlign: 'center',
                            position: 'relative' as const,
                            boxShadow: p.destaque ? '0 0 40px rgba(201,151,62,.12)' : 'none',
                        }}>
                            {p.badge && (
                                <div style={{
                                    position: 'absolute' as const, top: -13, left: '50%', transform: 'translateX(-50%)',
                                    background: p.badgeCor, color: p.destaque ? '#0b0e18' : '#fff',
                                    fontSize: 10, fontWeight: 800, padding: '4px 14px', borderRadius: 20,
                                    whiteSpace: 'nowrap' as const, letterSpacing: '.06em',
                                }}>
                                    {p.badge}
                                </div>
                            )}

                            <p style={{ fontSize: 11, fontWeight: 700, color: p.destaque ? '#c9973e' : '#8892aa', textTransform: 'uppercase' as const, letterSpacing: '.09em', margin: '0 0 20px' }}>
                                {p.nome}
                            </p>

                            <div style={{ marginBottom: 6 }}>
                                <span style={{ fontSize: '2.6rem', fontWeight: 800, color: '#f0ebe0', lineHeight: 1 }}>€{p.preco}</span>
                            </div>
                            <p style={{ fontSize: 12, color: '#8892aa', margin: '0 0 28px', lineHeight: 1.5 }}>{p.unidade}</p>

                            {p.descricao && (
                                <p style={{ fontSize: 12, color: '#c9973e', fontWeight: 600, margin: '-18px 0 18px', fontStyle: 'italic' }}>{p.descricao}</p>
                            )}

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', textAlign: 'left', display: 'flex', flexDirection: 'column' as const, gap: 9 }}>
                                {p.features.map(f => (
                                    <li key={f} style={{ fontSize: 13, color: '#a0aac0', display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.4 }}>
                                        <span style={{ color: '#4aaa6a', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{f}
                                    </li>
                                ))}
                            </ul>

                            <Link href={p.ctaLink} style={{
                                display: 'block', padding: '13px',
                                borderRadius: 10,
                                background: p.destaque ? '#c9973e' : 'transparent',
                                border: p.destaque ? 'none' : '1px solid #2a304a',
                                color: p.destaque ? '#0b0e18' : '#f0ebe0',
                                fontWeight: 700, fontSize: 14, textDecoration: 'none',
                                textAlign: 'center' as const,
                                transition: 'all .15s',
                            }}>
                                {p.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Garantia */}
                <div style={{ marginTop: 36, background: 'rgba(74,170,106,.06)', border: '1px solid rgba(74,170,106,.2)', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' as const }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>🛡️</span>
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#4aaa6a', margin: '0 0 4px' }}>Garantia de satisfação — 7 dias</p>
                        <p style={{ fontSize: 13, color: '#8892aa', margin: 0, lineHeight: 1.6 }}>
                            Se não ficar satisfeito com a qualidade da defesa gerada, devolvemos o crédito. Basta contactar-nos por email em <strong style={{ color: '#c9973e' }}>suporte@temdefesa.pt</strong> nos primeiros 7 dias.
                        </p>
                    </div>
                </div>

                {/* Comparativo vs. advogado */}
                <div style={{ marginTop: 20, background: '#111526', border: '1px solid #1e2540', borderRadius: 14, padding: '24px' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#c9973e', textTransform: 'uppercase' as const, letterSpacing: '.07em', margin: '0 0 16px' }}>Comparativo de custo</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                        {[
                            { label: 'Advogado especializado', valor: '€150–400', cor: '#e05050' },
                            { label: 'Associação de condutores', valor: '€30–80/ano', cor: '#e0a030' },
                            { label: 'TEM Defesa', valor: 'a partir de €9,90', cor: '#4aaa6a' },
                            { label: 'Coima média em Portugal', valor: '~€185', cor: '#8892aa' },
                        ].map(({ label, valor, cor }) => (
                            <div key={label} style={{ background: '#0d1020', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                                <p style={{ fontSize: 18, fontWeight: 800, color: cor, margin: '0 0 6px' }}>{valor}</p>
                                <p style={{ fontSize: 12, color: '#8892aa', margin: 0 }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, textAlign: 'center', marginBottom: 36 }}>Perguntas frequentes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {FAQS.map(({ q, r }) => (
                        <div key={q} style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 12, padding: '18px 20px' }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#f0ebe0' }}>{q}</h3>
                            <p style={{ fontSize: 13, color: '#8892aa', lineHeight: 1.65, margin: 0 }}>{r}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ borderTop: '1px solid #1e2540', padding: '24px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                    <Link href="/" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Início</Link>
                    <Link href="/como-recorrer" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Como Recorrer</Link>
                    <a href="/termos-de-utilizacao.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Termos de Utilização</a>
                    <a href="/politica-de-privacidade.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Política de Privacidade</a>
                </div>
                <p style={{ fontSize: 12, color: '#4a5060', margin: 0 }}>
                    © {new Date().getFullYear()} TEM Defesa. A informação disponibilizada não constitui aconselhamento jurídico.
                </p>
            </footer>
        </div>
    );
}
