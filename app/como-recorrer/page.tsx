'use client';
import Link from 'next/link';

export default function ComoRecorrer() {
    const ETAPAS = [
        {
            n: '1',
            titulo: 'Receber a notificação',
            desc: 'A autoridade autuante (ANSR, GNR, PSP ou câmara municipal) notifica-o do auto de contraordenação por carta registada com aviso de receção ou, em alternativa, na própria via de notificação entregue no local.',
            prazo: null,
            icon: '📬',
        },
        {
            n: '2',
            titulo: 'Apresentar defesa administrativa',
            desc: 'Após receber a notificação, dispõe de 15 dias úteis para apresentar defesa escrita junto da autoridade autuante. A defesa deve indicar os fundamentos de facto e de direito que sustentem a sua posição.',
            prazo: '15 dias úteis após a notificação',
            icon: '✍️',
            destaque: true,
        },
        {
            n: '3',
            titulo: 'Decisão da autoridade autuante',
            desc: 'A autoridade analisa a sua defesa e profere decisão: pode arquivar o processo, reduzir a coima ou manter a decisão inicial. A decisão é notificada por carta.',
            prazo: null,
            icon: '⚖️',
        },
        {
            n: '4',
            titulo: 'Impugnação judicial (recurso)',
            desc: 'Se discordar da decisão condenatória, pode recorrer ao tribunal judicial competente. O recurso é apresentado no próprio tribunal ou no serviço de atendimento da ANSR, acompanhado do pagamento prévio da coima ou pedido de dispensa.',
            prazo: '20 dias úteis após a decisão condenatória',
            icon: '🏛️',
        },
    ];

    const FORMAS_SUBMISSAO = [
        {
            titulo: 'Portal ePortugal.gov.pt',
            desc: 'Submissão online através do balcão único da Administração Pública. Requer Chave Móvel Digital ou Cartão de Cidadão.',
            icon: '🌐',
            destaque: true,
        },
        {
            titulo: 'Correio registado com AR',
            desc: 'Envie a defesa por carta registada com aviso de receção para a morada da autoridade autuante. Guarde sempre o comprovativo de envio.',
            icon: '📮',
        },
        {
            titulo: 'Entrega presencial',
            desc: 'Pode entregar a defesa pessoalmente nas instalações da ANSR, GNR, PSP ou câmara municipal responsável pelo auto.',
            icon: '🏢',
        },
    ];

    const MORADAS = [
        { entidade: 'ANSR — Autoridade Nacional de Segurança Rodoviária', morada: 'Av. das Forças Armadas, n.º 40 — Edifício Monumental, 7.º andar, 1649-022 Lisboa', telefone: '21 791 97 00' },
        { entidade: 'GNR — Guarda Nacional Republicana', morada: 'Rua de Quelhas, n.º 2, 1249-074 Lisboa', telefone: '21 391 70 00' },
        { entidade: 'PSP — Polícia de Segurança Pública', morada: 'Palácio da Penha de França, Rua Capelo, n.º 13, 1200-083 Lisboa', telefone: '21 321 17 00' },
    ];

    const DICAS = [
        { titulo: 'Preserve toda a documentação', desc: 'Guarde cópias de todos os documentos enviados e recebidos, incluindo os comprovativos de entrega/envio.' },
        { titulo: 'Respeite os prazos', desc: 'Os prazos são contados em dias úteis (excluindo fins de semana e feriados nacionais e locais). O prazo começa no dia útil seguinte ao da notificação.' },
        { titulo: 'Identifique corretamente a autoridade', desc: 'Certifique-se de que a defesa é dirigida à autoridade correta (ANSR, GNR, PSP ou câmara municipal) e inclui o número do auto.' },
        { titulo: 'Seja objetivo e concreto', desc: 'Apresente factos concretos e argumentos jurídicos fundamentados. Evite argumentos meramente subjetivos sem sustentação legal.' },
        { titulo: 'Considere assistência jurídica', desc: 'Para infrações graves com perda de pontos ou suspensão da carta, considere consultar um advogado especializado em direito rodoviário.' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#0b0e18', color: '#f0ebe0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

            {/* NAV */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(11,14,24,.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e2540', padding: '0 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#c9973e' }}>TEM</span>
                        <span style={{ fontSize: 20, fontWeight: 800 }}>Defesa</span>
                    </Link>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Link href="/como-recorrer" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#c9973e', textDecoration: 'none', fontWeight: 600 }}>Como Recorrer</Link>
                        <Link href="/login" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#8892aa', textDecoration: 'none' }}>Entrar</Link>
                        <Link href="/login" style={{ padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: '#c9973e', color: '#0b0e18', textDecoration: 'none' }}>Começar grátis</Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 48px', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 20, background: 'rgba(201,151,62,.12)', border: '1px solid rgba(201,151,62,.25)', fontSize: 13, color: '#c9973e', fontWeight: 600, marginBottom: 20 }}>
                    Guia Completo — RGCO e Código da Estrada
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
                    Como recorrer de uma coima de trânsito
                </h1>
                <p style={{ fontSize: 15, color: '#a0aac0', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
                    Guia prático sobre o processo de contestação de contraordenações rodoviárias em Portugal, com prazos, entidades competentes e formas de submissão.
                </p>
            </section>

            {/* PRAZOS DESTAQUE */}
            <section style={{ background: '#0e1220', borderTop: '1px solid #1e2540', borderBottom: '1px solid #1e2540', padding: '36px 24px' }}>
                <div style={{ maxWidth: 860, margin: '0 auto' }}>
                    <p style={{ textAlign: 'center', fontSize: 12, color: '#c9973e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 20 }}>Prazos legais — não deixe caducar o seu direito</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
                        {[
                            { prazo: '15 dias úteis', label: 'Defesa administrativa', artigo: 'Art. 50.º RGCO', cor: '#e05050' },
                            { prazo: '20 dias úteis', label: 'Impugnação judicial', artigo: 'Art. 59.º RGCO', cor: '#c9973e' },
                            { prazo: '2 anos', label: 'Prescrição da infração', artigo: 'Art. 27.º RGCO', cor: '#4aaa6a' },
                            { prazo: '5 anos', label: 'Prescrição da coima', artigo: 'Art. 27.º-A RGCO', cor: '#4a8aee' },
                        ].map(({ prazo, label, artigo, cor }) => (
                            <div key={label} style={{ background: '#111526', border: `1px solid ${cor}30`, borderRadius: 12, padding: '18px 16px', textAlign: 'center' }}>
                                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: cor, margin: '0 0 4px' }}>{prazo}</p>
                                <p style={{ fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>{label}</p>
                                <p style={{ fontSize: 11, color: '#8892aa', margin: 0 }}>{artigo}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ETAPAS */}
            <section style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 40 }}>O processo passo a passo</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {ETAPAS.map(e => (
                        <div key={e.n} style={{ background: e.destaque ? 'rgba(201,151,62,.06)' : '#111526', border: `1px solid ${e.destaque ? 'rgba(201,151,62,.3)' : '#1e2540'}`, borderRadius: 16, padding: '24px 22px', display: 'flex', gap: 20 }}>
                            <div style={{ flexShrink: 0 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: e.destaque ? 'rgba(201,151,62,.2)' : '#1a2035', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{e.icon}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 12, color: '#c9973e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>Passo {e.n}</span>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{e.titulo}</h3>
                                </div>
                                <p style={{ fontSize: 14, color: '#a0aac0', lineHeight: 1.65, margin: 0 }}>{e.desc}</p>
                                {e.prazo && (
                                    <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(224,80,80,.1)', border: '1px solid rgba(224,80,80,.25)', borderRadius: 8, padding: '6px 12px' }}>
                                        <span style={{ fontSize: 13, color: '#e05050', fontWeight: 700 }}>⏰ {e.prazo}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FORMAS DE SUBMISSÃO */}
            <section style={{ background: '#0e1220', borderTop: '1px solid #1e2540', borderBottom: '1px solid #1e2540', padding: '56px 24px' }}>
                <div style={{ maxWidth: 860, margin: '0 auto' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 12 }}>Como submeter a defesa</h2>
                    <p style={{ color: '#8892aa', fontSize: 14, marginBottom: 36 }}>Pode escolher qualquer uma das seguintes formas. Recomendamos sempre o registo do envio.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
                        {FORMAS_SUBMISSAO.map(f => (
                            <div key={f.titulo} style={{ background: f.destaque ? 'rgba(201,151,62,.06)' : '#111526', border: `1px solid ${f.destaque ? 'rgba(201,151,62,.3)' : '#1e2540'}`, borderRadius: 14, padding: '24px 20px' }}>
                                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                                {f.destaque && <span style={{ fontSize: 11, color: '#c9973e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', display: 'block', marginBottom: 8 }}>Recomendado</span>}
                                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{f.titulo}</h3>
                                <p style={{ fontSize: 13, color: '#8892aa', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MORADAS */}
            <section style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 12 }}>Moradas das autoridades</h2>
                <p style={{ color: '#8892aa', fontSize: 14, marginBottom: 32 }}>Para entrega presencial ou envio por correio.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {MORADAS.map(m => (
                        <div key={m.entidade} style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 12, padding: '18px 20px' }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#c9973e' }}>{m.entidade}</h3>
                            <p style={{ fontSize: 13, color: '#a0aac0', margin: '0 0 6px' }}>📍 {m.morada}</p>
                            <p style={{ fontSize: 13, color: '#8892aa', margin: 0 }}>📞 {m.telefone}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* DICAS */}
            <section style={{ background: '#0e1220', borderTop: '1px solid #1e2540', borderBottom: '1px solid #1e2540', padding: '56px 24px' }}>
                <div style={{ maxWidth: 860, margin: '0 auto' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 32 }}>Conselhos úteis</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                        {DICAS.map(d => (
                            <div key={d.titulo} style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 12, padding: '18px 20px' }}>
                                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#f0ebe0' }}>✓ {d.titulo}</h3>
                                <p style={{ fontSize: 13, color: '#8892aa', lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 12 }}>Pronto para preparar a sua defesa?</h2>
                <p style={{ color: '#8892aa', marginBottom: 28, fontSize: 15 }}>A nossa IA elabora a defesa com base no Código da Estrada e na jurisprudência portuguesa.</p>
                <Link href="/login" style={{ padding: '14px 36px', borderRadius: 10, fontSize: 16, fontWeight: 700, background: '#c9973e', color: '#0b0e18', textDecoration: 'none', display: 'inline-block' }}>
                    Começar agora — é grátis
                </Link>
            </section>

            {/* FOOTER */}
            <footer style={{ borderTop: '1px solid #1e2540', padding: '24px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                    <Link href="/" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Início</Link>
                    <Link href="/termos" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Termos de Utilização</Link>
                    <Link href="/privacidade" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Política de Privacidade</Link>
                </div>
                <p style={{ fontSize: 12, color: '#4a5060', margin: 0 }}>
                    © {new Date().getFullYear()} TEM Defesa. A informação disponibilizada não constitui aconselhamento jurídico.
                </p>
            </footer>
        </div>
    );
}
