'use client';
import Link from 'next/link';

export default function Privacidade() {
    const SECCOES = [
        {
            titulo: '1. Responsável pelo tratamento',
            conteudo: `O responsável pelo tratamento dos seus dados pessoais é a TEM Defesa, disponível em tem-defesa.vercel.app. Para questões relacionadas com a privacidade dos seus dados, pode contactar-nos através do endereço de correio eletrónico indicado neste portal.

O tratamento de dados pessoais é realizado em conformidade com o Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho (RGPD) e com a Lei n.º 58/2019, de 8 de agosto.`,
        },
        {
            titulo: '2. Dados pessoais recolhidos',
            conteudo: `Recolhemos e tratamos os seguintes dados pessoais:

• Dados de identificação: nome completo, NIF (Número de Identificação Fiscal)
• Dados de contacto: endereço de correio eletrónico, número de telemóvel
• Dados do veículo: matrícula, marca, modelo
• Número da carta de condução
• Morada e código postal
• Dados relativos às contraordenações: número do auto, data, local, infração imputada
• Relato pessoal dos acontecimentos fornecido pelo utilizador
• Dados de utilização da plataforma e registos de acesso`,
        },
        {
            titulo: '3. Finalidades e base legal',
            conteudo: `Os seus dados pessoais são tratados para as seguintes finalidades:

• Prestação do serviço de elaboração de defesas administrativas (base legal: execução de contrato — Art. 6.º, n.º 1, alínea b) do RGPD)
• Criação e gestão da conta de utilizador (base legal: execução de contrato)
• Armazenamento do histórico de defesas geradas (base legal: execução de contrato)
• Cumprimento de obrigações legais (base legal: obrigação legal — Art. 6.º, n.º 1, alínea c) do RGPD)
• Melhoria e segurança do serviço (base legal: interesse legítimo — Art. 6.º, n.º 1, alínea f) do RGPD)

Não utilizamos os seus dados para fins de marketing direto nem os partilhamos com terceiros para fins comerciais.`,
        },
        {
            titulo: '4. Conservação dos dados',
            conteudo: `Os seus dados pessoais são conservados pelo período estritamente necessário:

• Dados da conta e defesas geradas: enquanto a conta estiver ativa, acrescido de 3 anos após o encerramento
• Registos de acesso e logs: 90 dias
• Dados de faturação (quando aplicável): 10 anos, conforme legislação fiscal

Após o prazo de conservação, os dados são eliminados ou anonimizados de forma irreversível.`,
        },
        {
            titulo: '5. Partilha de dados com terceiros',
            conteudo: `Os seus dados pessoais podem ser partilhados com os seguintes subcontratantes, exclusivamente para fins de prestação do serviço:

• Supabase Inc. — infraestrutura de base de dados e autenticação (servidores na UE)
• Vercel Inc. — alojamento da aplicação
• Anthropic PBC — processamento de linguagem natural para geração de defesas

Todos os subcontratantes estão sujeitos a cláusulas contratuais adequadas e comprometem-se a tratar os dados em conformidade com o RGPD. Não vendemos nem alugamos os seus dados a terceiros.`,
        },
        {
            titulo: '6. Os seus direitos',
            conteudo: `Nos termos do RGPD, tem os seguintes direitos relativamente aos seus dados pessoais:

• Direito de acesso: obter confirmação sobre o tratamento dos seus dados e aceder a uma cópia
• Direito de retificação: corrigir dados inexatos ou incompletos
• Direito de apagamento: solicitar a eliminação dos seus dados ("direito ao esquecimento")
• Direito de limitação do tratamento: restringir o tratamento em determinadas circunstâncias
• Direito de portabilidade: receber os seus dados num formato estruturado e legível por máquina
• Direito de oposição: opor-se ao tratamento baseado em interesses legítimos
• Direito de não ficar sujeito a decisões automatizadas

Para exercer qualquer destes direitos, contacte-nos. Tem ainda o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD) em www.cnpd.pt.`,
        },
        {
            titulo: '7. Segurança dos dados',
            conteudo: `Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição:

• Encriptação de dados em trânsito (TLS/HTTPS) e em repouso
• Autenticação segura com Supabase Auth
• Controlo de acesso baseado em funções
• Monitorização e registos de acesso
• Atualizações regulares de segurança

Em caso de violação de segurança que possa afetar os seus direitos e liberdades, seremos notificados à CNPD no prazo de 72 horas e informaremos os utilizadores afetados sem demora injustificada.`,
        },
        {
            titulo: '8. Cookies e tecnologias similares',
            conteudo: `Utilizamos cookies estritamente necessários para o funcionamento do serviço, nomeadamente para gestão de sessão e autenticação. Não utilizamos cookies de rastreamento ou publicidade de terceiros.

Pode gerir as preferências de cookies através das definições do seu navegador. A desativação de cookies essenciais pode impedir o funcionamento correto da plataforma.`,
        },
        {
            titulo: '9. Transferências internacionais',
            conteudo: `Alguns dos nossos subcontratantes têm sede nos Estados Unidos. Nestas situações, as transferências de dados para países terceiros são realizadas ao abrigo de mecanismos juridicamente adequados, designadamente as Cláusulas Contratuais Tipo aprovadas pela Comissão Europeia, garantindo um nível de proteção equivalente ao da UE.`,
        },
        {
            titulo: '10. Alterações a esta política',
            conteudo: `Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. As alterações significativas serão comunicadas por correio eletrónico ou através de aviso destacado na plataforma com antecedência mínima de 15 dias. A utilização continuada do serviço após a entrada em vigor das alterações implica a sua aceitação.

Esta política foi atualizada em maio de 2025.`,
        },
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
                    <Link href="/login" style={{ padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: '#c9973e', color: '#0b0e18', textDecoration: 'none' }}>Entrar</Link>
                </div>
            </nav>

            {/* CONTEÚDO */}
            <article style={{ maxWidth: 780, margin: '0 auto', padding: '56px 24px 80px' }}>
                <div style={{ marginBottom: 40 }}>
                    <p style={{ fontSize: 12, color: '#c9973e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Conformidade RGPD</p>
                    <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: 12 }}>Política de Privacidade</h1>
                    <p style={{ fontSize: 14, color: '#8892aa' }}>Última atualização: maio de 2025</p>
                </div>

                <div style={{ fontSize: 15, color: '#a0aac0', lineHeight: 1.7, background: 'rgba(201,151,62,.06)', border: '1px solid rgba(201,151,62,.2)', borderRadius: 12, padding: '20px 22px', marginBottom: 40 }}>
                    A TEM Defesa respeita a sua privacidade e está comprometida com a proteção dos seus dados pessoais. Esta política explica como recolhemos, utilizamos e protegemos os seus dados, em conformidade com o RGPD e a legislação portuguesa aplicável.
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    {SECCOES.map(s => (
                        <section key={s.titulo}>
                            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#f0ebe0', marginBottom: 14, borderBottom: '1px solid #1e2540', paddingBottom: 10 }}>{s.titulo}</h2>
                            <div style={{ fontSize: 14, color: '#a0aac0', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{s.conteudo}</div>
                        </section>
                    ))}
                </div>
            </article>

            {/* FOOTER */}
            <footer style={{ borderTop: '1px solid #1e2540', padding: '24px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                    <Link href="/" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Início</Link>
                    <Link href="/como-recorrer" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Como Recorrer</Link>
                    <Link href="/termos" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Termos de Utilização</Link>
                </div>
                <p style={{ fontSize: 12, color: '#4a5060', margin: 0 }}>
                    © {new Date().getFullYear()} TEM Defesa. A informação disponibilizada não constitui aconselhamento jurídico.
                </p>
            </footer>
        </div>
    );
}
