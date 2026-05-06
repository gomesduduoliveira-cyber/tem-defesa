'use client';
import Link from 'next/link';

export default function Termos() {
    const SECCOES = [
        {
            titulo: '1. Objeto e âmbito',
            conteudo: `Os presentes Termos de Utilização regulam o acesso e a utilização da plataforma TEM Defesa, disponível em tem-defesa.vercel.app, que presta um serviço de elaboração assistida de defesas administrativas em processos de contraordenação rodoviária em Portugal.

Ao criar uma conta ou utilizar o serviço, o utilizador declara ter lido, compreendido e aceite estes termos na sua totalidade. Se não concordar com alguma das condições, deverá abster-se de utilizar o serviço.`,
        },
        {
            titulo: '2. Natureza do serviço e limitações',
            conteudo: `A TEM Defesa é uma ferramenta tecnológica de apoio à elaboração de documentos. O serviço:

• Analisa documentos de contraordenação carregados pelo utilizador
• Gera, com recurso a inteligência artificial, minutas de defesa administrativa
• Disponibiliza informação jurídica de caráter geral sobre o Código da Estrada e o RGCO

O serviço NÃO constitui:
• Aconselhamento jurídico personalizado
• Representação legal em qualquer processo
• Garantia de resultado favorável em processos de contraordenação
• Substituto para a consulta de um advogado habilitado

Para situações complexas, que envolvam suspensão de carta de condução, impugnação judicial ou montantes elevados, recomendamos vivamente a consulta de um advogado especializado em direito rodoviário.`,
        },
        {
            titulo: '3. Registo e conta do utilizador',
            conteudo: `Para aceder ao serviço, o utilizador deve criar uma conta fornecendo informações verdadeiras, atualizadas e completas, nomeadamente nome completo e NIF (Número de Identificação Fiscal).

O utilizador é o único responsável por:
• Manter a confidencialidade das suas credenciais de acesso
• Todas as atividades realizadas com a sua conta
• Notificar-nos imediatamente em caso de utilização não autorizada

Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos ou que contenham informações falsas.`,
        },
        {
            titulo: '4. Utilização permitida',
            conteudo: `O utilizador compromete-se a utilizar o serviço apenas para fins legítimos e em conformidade com a legislação portuguesa e europeia aplicável. É expressamente proibido:

• Utilizar o serviço para fins fraudulentos ou ilegais
• Carregar documentos de terceiros sem o respetivo consentimento
• Tentar aceder a dados de outros utilizadores
• Sobrecarregar os sistemas com pedidos automatizados (scraping, bots)
• Reproduzir, distribuir ou comercializar os conteúdos gerados sem autorização
• Fornecer informações falsas sobre contraordenações`,
        },
        {
            titulo: '5. Responsabilidade pelo conteúdo gerado',
            conteudo: `Os documentos de defesa gerados pela plataforma são baseados nas informações fornecidas pelo utilizador e resultam de processamento automatizado por inteligência artificial.

O utilizador é inteiramente responsável por:
• Verificar a exatidão e completude das informações fornecidas
• Confirmar que o conteúdo do documento gerado corresponde à sua situação real
• A decisão de submeter ou não o documento à autoridade competente
• Quaisquer consequências decorrentes da utilização dos documentos gerados

A TEM Defesa não pode ser responsabilizada por eventuais erros nos documentos gerados, decisões desfavoráveis das autoridades, prazos não cumpridos pelo utilizador ou informações incorretas fornecidas pelo utilizador.`,
        },
        {
            titulo: '6. Propriedade intelectual',
            conteudo: `Todos os elementos da plataforma — incluindo o código, design, textos, logótipos e base de dados jurídica — são propriedade da TEM Defesa e estão protegidos por direitos de autor.

Os documentos de defesa gerados a partir dos dados do utilizador pertencem ao utilizador, que pode utilizá-los livremente para o fim a que se destinam.

É proibida a reprodução, distribuição ou utilização comercial de qualquer elemento da plataforma sem autorização prévia e escrita.`,
        },
        {
            titulo: '7. Disponibilidade do serviço',
            conteudo: `Empreendemos todos os esforços para garantir a disponibilidade contínua da plataforma, mas não garantimos que o serviço estará sempre disponível, ininterrupto ou livre de erros. Reservamo-nos o direito de:

• Realizar manutenções programadas com aviso prévio
• Suspender temporariamente o serviço por razões técnicas ou de segurança
• Alterar, atualizar ou descontinuar funcionalidades

Não nos responsabilizamos por perdas ou danos decorrentes de indisponibilidade temporária do serviço.`,
        },
        {
            titulo: '8. Proteção de dados pessoais',
            conteudo: `O tratamento de dados pessoais é realizado em conformidade com a nossa Política de Privacidade, disponível em /privacidade, e com o RGPD e a Lei n.º 58/2019, de 8 de agosto.

Ao utilizar o serviço, o utilizador consente com o tratamento dos seus dados pessoais para as finalidades descritas na Política de Privacidade.`,
        },
        {
            titulo: '9. Alterações aos termos',
            conteudo: `Reservamo-nos o direito de alterar estes Termos de Utilização a qualquer momento. As alterações serão comunicadas por correio eletrónico ou através de aviso na plataforma com antecedência mínima de 15 dias.

A continuação da utilização do serviço após a entrada em vigor das alterações implica a aceitação dos novos termos. Se não concordar com as alterações, deve encerrar a sua conta antes da data de entrada em vigor.`,
        },
        {
            titulo: '10. Lei aplicável e foro',
            conteudo: `Estes Termos de Utilização são regidos pela lei portuguesa. Qualquer litígio decorrente da utilização da plataforma será submetido aos tribunais portugueses competentes, com expressa renúncia a qualquer outro foro.

Para efeitos de resolução alternativa de litígios, o utilizador pode recorrer ao Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL) ou à plataforma europeia de resolução de litígios em linha da Comissão Europeia.

Estes termos foram atualizados em maio de 2025.`,
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
                    <p style={{ fontSize: 12, color: '#c9973e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Plataforma TEM Defesa</p>
                    <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: 12 }}>Termos de Utilização</h1>
                    <p style={{ fontSize: 14, color: '#8892aa' }}>Última atualização: maio de 2025</p>
                </div>

                <div style={{ fontSize: 15, color: '#a0aac0', lineHeight: 1.7, background: 'rgba(201,151,62,.06)', border: '1px solid rgba(201,151,62,.2)', borderRadius: 12, padding: '20px 22px', marginBottom: 40 }}>
                    <strong style={{ color: '#f0ebe0' }}>Aviso importante:</strong> A TEM Defesa é uma ferramenta tecnológica de apoio à elaboração de documentos e não presta serviços de advocacia. A informação e os documentos gerados têm caráter informativo geral e não substituem a consulta de um advogado. Em casos complexos, recomendamos aconselhamento jurídico especializado.
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
                    <Link href="/privacidade" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Política de Privacidade</Link>
                </div>
                <p style={{ fontSize: 12, color: '#4a5060', margin: 0 }}>
                    © {new Date().getFullYear()} TEM Defesa. A informação disponibilizada não constitui aconselhamento jurídico.
                </p>
            </footer>
        </div>
    );
}
