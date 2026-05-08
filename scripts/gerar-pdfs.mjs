import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public');

// ── Cores ────────────────────────────────────────────────────
const COR_DOURADO = '#c9973e';
const COR_ESCURO  = '#0b0e18';
const COR_TEXTO   = '#1a1a2e';
const COR_CINZA   = '#555566';
const COR_BORDA   = '#ddddee';

function criarDoc(arquivo, titulo) {
    const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        info: { Title: titulo, Author: 'TEM Defesa', Creator: 'TEM Defesa — tem-defesa.vercel.app' },
        bufferPages: true,
    });
    doc.pipe(fs.createWriteStream(path.join(OUT, arquivo)));
    return doc;
}

function cabecalho(doc, titulo, subtitulo) {
    // Barra escura de topo
    doc.rect(0, 0, doc.page.width, 82).fill(COR_ESCURO);
    // Logo
    doc.fontSize(26).font('Helvetica-Bold').fillColor(COR_DOURADO).text('TEM', 60, 24, { continued: true });
    doc.fillColor('white').text(' Defesa', { continued: false });
    // URL
    doc.fontSize(8).font('Helvetica').fillColor('#8892aa')
        .text('tem-defesa.vercel.app', 0, 36, { align: 'right', width: doc.page.width - 60 });
    // Linha dourada
    doc.rect(0, 82, doc.page.width, 3).fill(COR_DOURADO);

    // Título
    doc.fontSize(17).font('Helvetica-Bold').fillColor(COR_ESCURO).text(titulo, 60, 108);
    doc.moveDown(0.3);
    doc.fontSize(9).font('Helvetica').fillColor(COR_CINZA)
        .text('TEM Defesa  ·  Plataforma de defesa de contraordenações rodoviárias  ·  Portugal');
    doc.fontSize(9).fillColor(COR_CINZA).text('Versão 1.0  ·  Maio de 2025  ·  ' + subtitulo);
    doc.moveDown(0.5);
    doc.rect(60, doc.y, doc.page.width - 120, 1).fill(COR_BORDA);
    doc.moveDown(0.8);
}

function secao(doc, numero, titulo) {
    if (doc.y > doc.page.height - 130) doc.addPage();
    doc.moveDown(0.7);
    doc.rect(60, doc.y, 4, 18).fill(COR_DOURADO);
    doc.fontSize(12).font('Helvetica-Bold').fillColor(COR_ESCURO)
        .text(`${numero}. ${titulo}`, 72, doc.y - 16);
    doc.moveDown(0.5);
}

function par(doc, rotulo, texto) {
    if (doc.y > doc.page.height - 100) doc.addPage();
    if (rotulo) {
        doc.fontSize(9).font('Helvetica-Bold').fillColor(COR_ESCURO).text(rotulo + ' ', { continued: true });
        doc.font('Helvetica').fillColor(COR_CINZA).text(texto, { lineGap: 3 });
    } else {
        doc.fontSize(9).font('Helvetica').fillColor(COR_CINZA).text(texto, { lineGap: 3 });
    }
    doc.moveDown(0.3);
}

function destaque(doc, cor, texto) {
    if (doc.y > doc.page.height - 120) doc.addPage();
    doc.rect(60, doc.y, doc.page.width - 120, 1).fill(cor);
    doc.moveDown(0.3);
    doc.fontSize(9).font('Helvetica-BoldOblique').fillColor(COR_ESCURO)
        .text(texto, 68, doc.y, { width: doc.page.width - 136, lineGap: 3 });
    doc.moveDown(0.3);
    doc.rect(60, doc.y, doc.page.width - 120, 1).fill(cor);
    doc.moveDown(0.6);
}

function tabela(doc, linhas) {
    linhas.forEach(([col1, col2]) => {
        if (doc.y > doc.page.height - 80) doc.addPage();
        const y = doc.y;
        doc.rect(60, y, doc.page.width - 120, 1).fill(COR_BORDA);
        doc.moveDown(0.2);
        doc.fontSize(9).font('Helvetica-Bold').fillColor(COR_ESCURO)
            .text(col1, 64, doc.y, { width: 160, continued: false });
        const yAfter = doc.y;
        doc.fontSize(9).font('Helvetica').fillColor(COR_CINZA)
            .text(col2, 240, y + 3, { width: doc.page.width - 300, lineGap: 2 });
        doc.y = Math.max(yAfter, doc.y) + 4;
    });
    doc.rect(60, doc.y, doc.page.width - 120, 1).fill(COR_BORDA);
    doc.moveDown(0.5);
}

function rodape(doc) {
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        const y = doc.page.height - 44;
        doc.rect(60, y - 8, doc.page.width - 120, 1).fill(COR_BORDA);
        doc.fontSize(8).font('Helvetica').fillColor(COR_CINZA)
            .text('TEM Defesa  ·  tem-defesa.vercel.app  ·  Documento gerado automaticamente', 60, y, { width: doc.page.width - 180 });
        doc.text(`Pág. ${i - range.start + 1} / ${range.count}`, 60, y, { align: 'right', width: doc.page.width - 120 });
    }
}

// ════════════════════════════════════════════════════════════
// PDF 1 — TERMOS DE UTILIZAÇÃO
// ════════════════════════════════════════════════════════════
const t = criarDoc('termos-de-utilizacao.pdf', 'Termos de Utilização — TEM Defesa');
cabecalho(t, 'Termos de Utilização e Condições de Serviço', 'Conformidade com a lei portuguesa e europeia');

destaque(t, COR_DOURADO, 'Ao utilizar a plataforma TEM Defesa, o utilizador declara ter lido, compreendido e aceite na íntegra os presentes Termos de Utilização. Caso não concorde com qualquer disposição, não utilize o serviço.');

secao(t, 1, 'Objeto do Serviço');
par(t, '1.1', 'A TEM Defesa é uma plataforma tecnológica que utiliza Inteligência Artificial para gerar modelos de defesa administrativa em processos de contraordenação rodoviária em Portugal, com fundamentação no Código da Estrada (aprovado pelo DL nº 114/94, com alterações posteriores) e no Regime Geral das Contraordenações (RGCO — Lei nº 433/82).');
par(t, '1.2', 'O serviço compreende exclusivamente: (i) leitura e extração de dados de autos de contraordenação enviados pelo utilizador; (ii) geração automatizada de texto de defesa administrativa; (iii) orientações sobre prazos e procedimentos de submissão; e (iv) disponibilização do documento gerado para transferência pelo utilizador.');
par(t, '1.3', 'A TEM Defesa NÃO realiza, em caso algum: submissão de defesas ou impugnações junto de quaisquer autoridades; representação legal ou patrocínio forense; acompanhamento processual; nem consultoria ou assessoria jurídica.');
destaque(t, '#e05050', 'A TEM Defesa não é um escritório de advogados, não está inscrita na Ordem dos Advogados e não oferece serviços de advocacia. Para representação legal, consulte um advogado habilitado.');

secao(t, 2, 'Limitações e Isenção de Responsabilidade');
par(t, '2.1 Ausência de garantia de resultado.', 'A TEM Defesa não garante, em circunstância alguma, que a defesa gerada seja aceite ou resulte no arquivamento do processo ou na redução da coima. O resultado depende exclusivamente da apreciação da autoridade autuante competente.');
par(t, '2.2 Ausência de submissão.', 'O documento gerado é um modelo textual. O utilizador é o único responsável por imprimir, assinar e submeter a defesa dentro dos prazos legais. A TEM Defesa não executa qualquer dessas etapas.');
par(t, '2.3 Prazos legais.', 'O utilizador é integralmente responsável pelo cumprimento dos prazos legais: 15 dias úteis para defesa administrativa (Art. 50.º RGCO) e 20 dias úteis para impugnação judicial (Art. 59.º RGCO). A TEM Defesa não monitoriza prazos.');
par(t, '2.4 Verificação obrigatória.', 'O utilizador deve verificar e conferir todos os dados e fundamentos jurídicos antes de submeter. Recomendamos a revisão por advogado habilitado, em especial em casos de maior gravidade ou valor.');
destaque(t, '#e05050', 'Isenção expressa: não somos responsáveis por coimas não arquivadas, perda de pontos na carta de condução, suspensão da habilitação, defesas submetidas fora de prazo, nem por decisões administrativas ou judiciais desfavoráveis.');

secao(t, 3, 'Natureza e Limitações da Inteligência Artificial');
par(t, '3.1', 'As defesas são elaboradas integralmente por sistemas de IA, sem intervenção humana. Nenhum advogado revisa individualmente cada documento produzido.');
par(t, '3.2', 'A IA pode cometer erros, imprecisões ou inconsistências jurídicas, incluindo citação de artigos desatualizados ou identificação incorreta do tipo de infração.');
par(t, '3.3', 'O documento gerado tem caráter meramente orientativo e constitui um ponto de partida para a defesa, não substituindo a análise por profissional jurídico habilitado.');
par(t, '3.4', 'A base de conhecimento da IA compreende o Código da Estrada, o RGCO, jurisprudência dos tribunais portugueses e princípios constitucionais vigentes à data da última atualização. Alterações legislativas posteriores podem não estar refletidas.');

secao(t, 4, 'Responsabilidades do Utilizador');
par(t, '4.1', 'O utilizador declara que todas as informações fornecidas são verdadeiras, precisas e completas. A inserção de dados falsos é da sua exclusiva responsabilidade.');
par(t, '4.2', 'O utilizador compromete-se a utilizar o serviço exclusivamente para fins lícitos, não gerando defesas fraudulentas nem obtendo vantagens ilícitas perante autoridades públicas.');
par(t, '4.3', 'O utilizador é o único responsável pela guarda das suas credenciais de acesso (endereço de e-mail e palavra-passe).');
par(t, '4.4', 'A utilização do serviço não cria vínculo de mandato, procuração, prestação de serviços advocatícios nem qualquer relação de representação entre o utilizador e a TEM Defesa.');

secao(t, 5, 'Propriedade Intelectual');
par(t, '5.1', 'A plataforma TEM Defesa, incluindo código-fonte, design, marca e base de conhecimento jurídico, é propriedade exclusiva da TEM Defesa, protegida pela legislação aplicável em matéria de propriedade intelectual.');
par(t, '5.2', 'O documento de defesa gerado com base nos dados do utilizador é disponibilizado para uso pessoal e intransmissível, exclusivamente para submissão perante a autoridade competente relativa à contraordenação indicada.');
par(t, '5.3', 'É proibida a reprodução, distribuição, revenda ou comercialização das defesas geradas ou da tecnologia da plataforma sem autorização expressa e prévia.');

secao(t, 6, 'Proteção de Dados Pessoais');
par(t, '6.1', 'O tratamento de dados pessoais pela TEM Defesa observa os princípios e disposições do Regulamento (UE) 2016/679 (RGPD) e da Lei n.º 58/2019, de 8 de agosto (lei de execução do RGPD em Portugal).');
par(t, '6.2', 'Os dados recolhidos (cadastro, contraordenações, documentos) são utilizados exclusivamente para prestação do serviço. Não são vendidos nem cedidos a terceiros para fins comerciais.');
par(t, '6.3', 'Para informação detalhada, consulte a Política de Privacidade disponível em tem-defesa.vercel.app/privacidade.');

secao(t, 7, 'Disponibilidade do Serviço');
par(t, '7.1', 'A TEM Defesa envidará todos os esforços para garantir a disponibilidade contínua da plataforma, mas não garante que o serviço estará sempre disponível, ininterrupto ou livre de erros.');
par(t, '7.2', 'Reservamo-nos o direito de realizar manutenções programadas, suspender temporariamente o serviço por razões técnicas ou de segurança, ou alterar funcionalidades.');

secao(t, 8, 'Cancelamento e Suspensão');
par(t, '8.1', 'O utilizador pode cancelar a sua conta a qualquer momento, sem necessidade de justificação, através das definições da plataforma ou por solicitação ao suporte.');
par(t, '8.2', 'A TEM Defesa reserva-se o direito de suspender ou cancelar o acesso em caso de violação destes Termos, utilização fraudulenta ou abusiva, ou tentativa de comprometer a segurança da plataforma.');

secao(t, 9, 'Alterações aos Termos');
par(t, '9.1', 'Reservamo-nos o direito de alterar estes Termos a qualquer momento, com notificação por e-mail ou aviso na plataforma com antecedência mínima de 15 dias para alterações substanciais.');
par(t, '9.2', 'A continuação da utilização do serviço após a entrada em vigor das alterações implica a aceitação dos novos termos.');

secao(t, 10, 'Lei Aplicável e Foro');
par(t, '10.1', 'Os presentes Termos são regidos pela lei portuguesa e pelo direito da União Europeia, designadamente o Código de Defesa do Consumidor, o Regulamento (UE) 2016/679 (RGPD) e demais normas aplicáveis.');
par(t, '10.2', 'Para resolução alternativa de litígios de consumo, o utilizador pode recorrer a um centro de arbitragem de conflitos de consumo ou à plataforma europeia de resolução de litígios em linha (ec.europa.eu/consumers/odr).');
par(t, '10.3', 'Sem prejuízo do disposto no número anterior, fica eleito o foro português competente para dirimir quaisquer litígios emergentes dos presentes Termos.');

// Rodapé do documento
t.moveDown(0.8);
t.rect(60, t.y, t.page.width - 120, 1).fill(COR_BORDA);
t.moveDown(0.6);
t.fontSize(9).font('Helvetica-Bold').fillColor(COR_ESCURO).text('TEM Defesa', { align: 'center' });
t.fontSize(8).font('Helvetica').fillColor(COR_CINZA).text('Plataforma de defesa de contraordenações rodoviárias · Portugal · tem-defesa.vercel.app', { align: 'center' });

rodape(t);
t.end();
console.log('✅ termos-de-utilizacao.pdf gerado');

// ════════════════════════════════════════════════════════════
// PDF 2 — POLÍTICA DE PRIVACIDADE (RGPD)
// ════════════════════════════════════════════════════════════
const p = criarDoc('politica-de-privacidade.pdf', 'Política de Privacidade — TEM Defesa');
cabecalho(p, 'Política de Privacidade', 'Conformidade com o RGPD — Regulamento (UE) 2016/679');

destaque(p, '#5aaaf0', 'Esta Política descreve como a TEM Defesa recolhe, utiliza, conserva e protege os seus dados pessoais, em conformidade com o Regulamento (UE) 2016/679 (RGPD) e a Lei n.º 58/2019, de 8 de agosto. Ao utilizar o serviço, o utilizador consente com o tratamento aqui descrito.');

secao(p, 1, 'Responsável pelo Tratamento');
par(p, null, 'O responsável pelo tratamento dos dados pessoais recolhidos através da plataforma TEM Defesa é a TEM Defesa, plataforma digital de apoio à defesa de contraordenações rodoviárias, disponível em tem-defesa.vercel.app.');
par(p, 'Encarregado de Proteção de Dados (EPD/DPO):', 'privacidade@tem-defesa.vercel.app · Prazo de resposta: 30 dias (prorrogável até 3 meses em casos complexos, conforme Art. 12.º RGPD)');

secao(p, 2, 'Dados Pessoais Recolhidos');
par(p, 'Fornecidos diretamente pelo utilizador:', 'Nome completo, NIF (Número de Identificação Fiscal), número da carta de condução, endereço de e-mail, número de telemóvel, morada, código postal, localidade, tipo de pessoa (singular ou coletiva).');
par(p, 'Dados relativos à contraordenação:', 'Matrícula, marca e modelo do veículo, número do auto, data, hora e local da infração, autoridade autuante, descrição da infração, artigo do Código da Estrada ou RGCO, relato pessoal dos factos.');
par(p, 'Documentos enviados:', 'Fotografias e ficheiros PDF de autos de contraordenação enviados para processamento pela IA.');
par(p, 'Dados recolhidos automaticamente:', 'Endereço IP, tipo e versão do browser, sistema operativo, páginas visitadas, data e hora de acesso, dados de autenticação (sessão, tokens).');
par(p, 'O que NÃO recolhemos:', 'Dados de cartão de crédito ou bancários, dados de saúde, origem racial ou étnica, convicções religiosas, opiniões políticas, dados biométricos ou dados de menores de 18 anos.');

secao(p, 3, 'Finalidades e Base Legal (Art. 6.º RGPD)');
tabela(p, [
    ['Prestação do serviço', 'Execução do contrato — Art. 6.º, n.º 1, al. b) RGPD'],
    ['Gestão da conta de utilizador', 'Execução do contrato — Art. 6.º, n.º 1, al. b) RGPD'],
    ['Comunicações do serviço', 'Interesse legítimo — Art. 6.º, n.º 1, al. f) RGPD'],
    ['Melhoria da plataforma', 'Interesse legítimo — Art. 6.º, n.º 1, al. f) RGPD'],
    ['Cumprimento de obrigações legais', 'Obrigação legal — Art. 6.º, n.º 1, al. c) RGPD'],
    ['Prevenção de fraude e segurança', 'Interesse legítimo — Art. 6.º, n.º 1, al. f) RGPD'],
]);

secao(p, 4, 'Conservação dos Dados (Princípio da Limitação — Art. 5.º, n.º 1, al. e) RGPD)');
par(p, null, 'Os dados pessoais são conservados apenas pelo período estritamente necessário para cada finalidade:');
tabela(p, [
    ['Dados cadastrais e perfil', 'Enquanto a conta estiver ativa + 3 anos após o encerramento'],
    ['Defesas geradas e respetivos dados', 'Enquanto a conta estiver ativa + 3 anos após o encerramento'],
    ['Documentos enviados (fotos/PDFs)', '30 dias após o processamento, sendo depois eliminados definitivamente'],
    ['Registos de acesso (logs)', '90 dias (segurança e prevenção de abuso)'],
    ['Dados fiscais e de faturação', '10 anos (obrigações fiscais — legislação portuguesa e europeia)'],
]);
par(p, 'Nota:', 'O prazo de 3 anos para dados cadastrais e defesas corresponde ao prazo de prescrição geral de direitos em Portugal (Art. 309.º do Código Civil), justificando a conservação para eventual resolução de litígios. Findo esse prazo, os dados são eliminados ou anonimizados de forma irreversível.');

secao(p, 5, 'Partilha e Transferência de Dados');
par(p, '5.1', 'A TEM Defesa não vende, arrenda nem partilha os seus dados com terceiros para fins comerciais ou publicitários.');
par(p, '5.2', 'Partilhamos apenas os dados estritamente necessários com os seguintes subcontratantes, todos vinculados por cláusulas contratuais adequadas:');
tabela(p, [
    ['Supabase Inc.', 'Base de dados e autenticação · Servidores na UE disponíveis'],
    ['Vercel Inc.', 'Alojamento da aplicação web'],
    ['Anthropic PBC', 'Processamento de IA para leitura de documentos e geração de defesas'],
]);
par(p, '5.3 Transferências internacionais.', 'Alguns subcontratantes têm sede nos EUA. As transferências são efetuadas ao abrigo de Cláusulas Contratuais Tipo (CCT) aprovadas pela Comissão Europeia, garantindo nível de proteção equivalente ao da UE (Art. 46.º RGPD).');
par(p, '5.4', 'Podemos divulgar dados quando exigido por lei, decisão judicial ou autoridade competente, incluindo a CNPD.');

secao(p, 6, 'Segurança dos Dados (Art. 32.º RGPD)');
par(p, null, 'A TEM Defesa adota medidas técnicas e organizativas adequadas para proteger os dados pessoais:');
[
    'Encriptação em trânsito (TLS/HTTPS) e em repouso',
    'Palavras-passe armazenadas com hash criptográfico — nunca em texto claro',
    'Row Level Security: cada utilizador acede apenas aos seus próprios dados',
    'Controlo de acessos baseado em funções (RBAC)',
    'Monitorização contínua de acessos e atividades suspeitas',
    'Alojamento em fornecedores com certificações SOC 2 e ISO 27001',
].forEach(item => par(p, '•', item));
par(p, 'Incidentes de segurança:', 'Em caso de violação de dados pessoais que possa afetar os seus direitos e liberdades, notificaremos a CNPD no prazo de 72 horas (Art. 33.º RGPD) e informaremos os titulares afetados sem demora injustificada (Art. 34.º RGPD).');

secao(p, 7, 'Os Seus Direitos como Titular (Arts. 15.º a 22.º RGPD)');
par(p, null, 'Nos termos do RGPD, tem os seguintes direitos relativamente aos seus dados pessoais:');
tabela(p, [
    ['Direito de acesso (Art. 15.º)', 'Obter confirmação sobre o tratamento e aceder a uma cópia dos seus dados'],
    ['Direito de retificação (Art. 16.º)', 'Corrigir dados inexatos ou incompletos'],
    ['Direito ao apagamento (Art. 17.º)', 'Solicitar a eliminação dos dados ("direito a ser esquecido")'],
    ['Direito de limitação (Art. 18.º)', 'Restringir o tratamento em determinadas circunstâncias'],
    ['Direito de portabilidade (Art. 20.º)', 'Receber os seus dados em formato estruturado e legível por máquina'],
    ['Direito de oposição (Art. 21.º)', 'Opor-se ao tratamento baseado em interesses legítimos'],
    ['Decisões automatizadas (Art. 22.º)', 'Não ficar sujeito exclusivamente a decisões automatizadas com efeitos significativos'],
]);
par(p, 'Como exercer os seus direitos:', 'Envie o seu pedido para privacidade@tem-defesa.vercel.app. Responderemos no prazo de 30 dias (prorrogável até 3 meses em casos complexos). Podemos solicitar verificação de identidade antes de processar o pedido.');
par(p, 'Reclamação junto da CNPD:', 'Tem o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD), a autoridade de controlo competente em Portugal: www.cnpd.pt · Tel: +351 213 928 400.');

secao(p, 8, 'Cookies e Tecnologias Similares');
tabela(p, [
    ['Cookies essenciais', 'Necessários para autenticação e sessão — não podem ser desativados'],
    ['Cookies funcionais', 'Memorizam as suas preferências e definições'],
    ['Cookies analíticos', 'Ajudam a melhorar a plataforma — podem ser recusados'],
]);
par(p, null, 'Não utilizamos cookies de rastreamento publicitário nem de terceiros. A plataforma não contém anúncios. Pode gerir as preferências de cookies através das definições do seu browser; a desativação de cookies essenciais pode comprometer o funcionamento do serviço.');

secao(p, 9, 'Menores de Idade');
par(p, null, 'A TEM Defesa destina-se exclusivamente a pessoas com 18 anos ou mais, dado que o serviço se relaciona com a habilitação legal para conduzir veículos. Em conformidade com o Art. 8.º do RGPD, não recolhemos intencionalmente dados de menores. Se identificarmos dados de menor, procederemos à sua eliminação imediata.');

secao(p, 10, 'IA e Dados Enviados para Processamento');
par(p, '10.1', 'As fotografias e ficheiros PDF de autos de contraordenação enviados pelo utilizador são processados pela API da Anthropic (Claude AI) para extração automática de dados. A transmissão é segura (TLS) e a Anthropic não utiliza esses dados para treino de modelos de IA, conforme a sua política de privacidade (anthropic.com/privacy).');
par(p, '10.2', 'Os documentos enviados são conservados apenas durante 30 dias após o processamento, sendo depois eliminados definitivamente dos nossos sistemas.');
par(p, '10.3', 'Nos termos do Art. 22.º do RGPD, o utilizador tem o direito de solicitar a intervenção humana na apreciação da defesa gerada automaticamente, de expressar o seu ponto de vista e de contestar a decisão automatizada.');

secao(p, 11, 'Alterações a esta Política');
par(p, null, 'A presente Política de Privacidade pode ser atualizada para refletir alterações na legislação ou nas nossas práticas. Alterações significativas serão comunicadas por e-mail ou através de aviso destacado na plataforma com antecedência mínima de 15 dias. A utilização continuada do serviço após a entrada em vigor das alterações implica a aceitação da nova versão.');

secao(p, 12, 'Contacto — Encarregado de Proteção de Dados (EPD)');
par(p, 'E-mail:', 'privacidade@tem-defesa.vercel.app');
par(p, 'Plataforma:', 'tem-defesa.vercel.app');
par(p, 'Prazo de resposta:', 'Até 30 dias (prorrogável até 3 meses em casos complexos — Art. 12.º RGPD)');
par(p, 'Autoridade de controlo (CNPD):', 'www.cnpd.pt · Rua de São Bento, 148-3.º · 1200-821 Lisboa · Tel: +351 213 928 400');
par(p, 'Plataforma UE de resolução de litígios:', 'ec.europa.eu/consumers/odr');

// Assinatura
p.moveDown(0.8);
p.rect(60, p.y, p.page.width - 120, 1).fill(COR_BORDA);
p.moveDown(0.6);
p.fontSize(9).font('Helvetica-Bold').fillColor(COR_ESCURO).text('TEM Defesa', { align: 'center' });
p.fontSize(8).font('Helvetica').fillColor(COR_CINZA)
    .text('Plataforma de defesa de contraordenações rodoviárias · Portugal · tem-defesa.vercel.app', { align: 'center' });

rodape(p);
p.end();
console.log('✅ politica-de-privacidade.pdf gerado');
