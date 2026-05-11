'use client';
import { useState } from 'react';
import Link from 'next/link';

const CATEGORIAS = ['Todas', 'Prazos e Processo', 'Defesa e Recurso', 'Sistema de Pontos', 'Tipos de Contraordenação', 'Pagamento e Consequências'];

const FAQS = [
    // ── PRAZOS E PROCESSO ──────────────────────────────────────────────
    {
        cat: 'Prazos e Processo',
        q: 'Qual é o prazo para contestar um auto de contraordenação?',
        a: `O prazo legal para apresentar defesa administrativa está definido no **RGCO (DL 433/82)** e no **Código da Estrada (DL 114/94)**:

• **Defesa escrita:** 15 dias úteis após a notificação do auto de contraordenação. Este é o prazo mais importante — não o perca.
• **Recurso judicial (impugnação):** 20 dias úteis após a notificação da decisão administrativa (coima aplicada pela ANSR ou autoridade autuante).
• **Recurso de impugnação em tribunal:** interposto no Tribunal de Pequena Instância Criminal competente.

⚠️ **Atenção:** os prazos contam em dias úteis (excluem sábados, domingos e feriados nacionais). A data de notificação é a data da assinatura do aviso de receção ou, se não houver, a data da tentativa de entrega.`,
    },
    {
        cat: 'Prazos e Processo',
        q: 'Como funciona o processo de contraordenação rodoviária em Portugal?',
        a: `O processo segue as seguintes fases, previstas no RGCO e Código da Estrada:

**1. Levantamento do auto** — GNR, PSP, ANSR ou agente de autoridade regista a infração no local ou por equipamento automático (radar, câmara).

**2. Notificação** — o arguido recebe por carta registada com AR a notificação do auto. A partir da receção começa a contar o prazo de 15 dias úteis.

**3. Defesa escrita** — o arguido apresenta a sua defesa por escrito à autoridade autuante (ANSR, câmara municipal, etc.).

**4. Decisão administrativa** — a autoridade analisa a defesa e decide: arquivamento, redução da coima ou manutenção.

**5. Impugnação judicial** — se insatisfeito com a decisão, o arguido tem 20 dias úteis para impugnar no tribunal. Nesta fase pode contratar advogado.

**6. Julgamento** — o tribunal aprecia o recurso. Acórdão com possibilidade de recurso para tribunal superior em casos mais graves.`,
    },
    {
        cat: 'Prazos e Processo',
        q: 'O que é a ANSR e qual é o seu papel?',
        a: `A **ANSR (Autoridade Nacional de Segurança Rodoviária)** é o organismo público português responsável pelo tratamento das contraordenações rodoviárias graves e muito graves em todo o território nacional.

**Funções principais:**
• Receber e tratar os autos de contraordenação enviados pela GNR, PSP e outros agentes
• Apreciar as defesas administrativas apresentadas pelos arguidos
• Aplicar as coimas e sanções acessórias (inibição de conduzir, etc.)
• Gerir o **SIPP (Sistema de Inibição por Pontos na Carta de Condução)**
• Fiscalização das escolas de condução

**Contactos ANSR:**
• Endereço: Av. das Forças Armadas, 28 – 1600-082 Lisboa
• Linha: 217 974 500
• Portal: www.ansr.pt

**Contraordenações leves:** tratadas diretamente pelos municípios ou PSP/GNR locais, sem passar pela ANSR.`,
    },
    {
        cat: 'Prazos e Processo',
        q: 'O que é o RGCO e que importância tem na defesa?',
        a: `O **RGCO (Regime Geral das Contraordenações e Coimas)**, aprovado pelo DL 433/82, é a lei-quadro que regula todas as contraordenações em Portugal, incluindo as rodoviárias.

**Por que é importante para a sua defesa:**

• Define os **direitos do arguido**: ser ouvido antes de qualquer decisão, apresentar prova, ser assistido por advogado
• Estabelece as **nulidades processuais**: falta de notificação válida, falta de identificação do agente, violação do contraditório
• Prevê o **princípio da legalidade**: só pode ser sancionado por factos expressamente previstos na lei na altura da infração
• Define o **princípio do in dubio pro reo**: na dúvida, decide-se a favor do arguido
• Regula a **prescrição**: as contraordenações leves prescrevem em 1 ano; graves em 2 anos; muito graves em 5 anos

A TEM Defesa fundamenta todos os documentos no RGCO e no Código da Estrada para maximizar as probabilidades de sucesso.`,
    },

    // ── DEFESA E RECURSO ───────────────────────────────────────────────
    {
        cat: 'Defesa e Recurso',
        q: 'Quais são os fundamentos mais comuns para contestar um auto de contraordenação?',
        a: `As causas de nulidade ou absolvição mais aceites em Portugal:

**Vícios formais (nulidade do auto):**
• Identificação incorreta do veículo (matrícula errada, RENAVAM/chassis divergente)
• Falta de identificação do agente autuante (nome, número mecanográfico)
• Erro na data, hora ou local da infração
• Auto de um equipamento sem homologação ou calibração válida (PTM — Portaria de Teste de Modelos)
• Falta de notificação válida ao arguido

**Mérito:**
• Infração não cometida (testemunhos, imagens, GPS, registos de localização)
• Sinalização de trânsito ausente, ilegível ou não conforme ao Regulamento de Sinalização
• Estado de necessidade (ex: urgência médica documentada)
• Erro sobre a ilicitude do facto (sinalização contraditória ou ambígua)
• Prescrição da contraordenação

**Proporcionalidade:**
• Coima desproporcional face à gravidade concreta e situação económica do arguido (art. 18 RGCO)`,
    },
    {
        cat: 'Defesa e Recurso',
        q: 'A defesa escrita suspende o pagamento da coima?',
        a: `**Sim**, durante o prazo de defesa e enquanto o processo estiver em análise:

• Ao apresentar **defesa escrita** dentro dos 15 dias úteis, o processo fica suspenso — não é exigível o pagamento enquanto não houver decisão.
• Após a **decisão administrativa** que mantém a coima, o arguido tem 20 dias úteis para pagar voluntariamente (com eventual desconto) ou para impugnar judicialmente.
• Se interpuser **impugnação judicial**, o pagamento fica novamente suspenso até decisão do tribunal.

⚠️ **Coimas em local de estacionamento proibido** (câmaras municipais) têm regras ligeiramente diferentes — verifique sempre o prazo indicado na notificação.

**Pagamento voluntário com desconto:** em muitas contraordenações, a ANSR oferece desconto de 50% se pagar dentro de determinado prazo sem contestar. Vale ponderar se a probabilidade de sucesso da defesa justifica o risco de perder o desconto.`,
    },
    {
        cat: 'Defesa e Recurso',
        q: 'Posso contestar uma coima já paga?',
        a: `**Formalmente, não** — o pagamento voluntário da coima equivale à aceitação da decisão e extingue o processo contraordenacional (art. 57 RGCO).

No entanto, **existem exceções:**

• **Pagamento por engano** (erro de facto ou de direito): pode pedir restituição do indevido nos tribunais cíveis.
• **Pagamento sob coação ou vício de vontade**: situação excecional que permite arguir a nulidade.
• **Nulidade absoluta do processo**: em casos raríssimos de violação grave de direitos fundamentais, é possível arguir a nulidade mesmo após pagamento.

**Conselho prático:** antes de pagar, analise sempre se vale a pena contestar. Uma coima de €120 a €2.500 (infrações muito graves) pode justificar a elaboração de uma defesa — especialmente se houver vícios formais evidentes.

A TEM Defesa pode analisar o auto antes de tomar qualquer decisão.`,
    },
    {
        cat: 'Defesa e Recurso',
        q: 'Posso contestar uma multa de radar ou câmara de velocidade?',
        a: `**Sim**, e é um dos recursos mais frequentes em Portugal. Os principais fundamentos:

**Técnicos:**
• Equipamento sem certificado de homologação válido (IMTT/IMT) ou PTM expirada
• Ausência de verificação metrológica periódica obrigatória pelo IPAC (Instituto Português de Acreditação)
• Margem de erro do equipamento não descontada — a lei exige aplicar a incerteza de medição
• Fotografia de má qualidade que não permite identificar inequivocamente o veículo e o condutor
• Falta de sinalização prévia de radar (obrigatória em muitos casos)

**Procedimentais:**
• Sinalização de limite de velocidade ausente, danificada ou não homologada
• Limite de velocidade aplicado incorretamente para o tipo de via (estrada vs. autoestrada vs. via urbana)
• Obras ou situação de emergência que tornavam o limite inaplicável

**Dica:** solicite sempre o certificado de calibração do equipamento — é um direito seu enquanto arguido (art. 50 RGCO) e frequentemente revela irregularidades.`,
    },
    {
        cat: 'Defesa e Recurso',
        q: 'Preciso de advogado para contestar uma contraordenação?',
        a: `**Não é obrigatório** na fase administrativa — pode apresentar a defesa escrita por si mesmo ou através de qualquer mandatário.

**Fase administrativa (defesa escrita à ANSR):**
• Não é exigida constituição de advogado
• Pode redigir a defesa por conta própria ou usar a TEM Defesa para gerar o documento
• Sem custas judiciais

**Fase judicial (impugnação no tribunal):**
• Tecnicamente é possível sem advogado, mas **altamente desaconselhável**
• O processo judicial tem regras processuais complexas (CPC, CPP subsidiário)
• Para infrações muito graves ou inibição de condução, a constituição de advogado é praticamente indispensável

**Custo-benefício:**
• A TEM Defesa cobre a fase mais importante — a **defesa administrativa** — que resolve a maioria dos casos sem precisar de tribunal
• Uma defesa bem fundamentada nesta fase evita os custos e complexidade da via judicial`,
    },

    // ── SISTEMA DE PONTOS ──────────────────────────────────────────────
    {
        cat: 'Sistema de Pontos',
        q: 'Como funciona o sistema de pontos da carta de condução em Portugal?',
        a: `O **SIPP (Sistema de Inibição por Pontos na Carta de Condução)** foi introduzido em Portugal pelo DL 2/98 e reformulado em 2013:

**Funcionamento:**
• Cada condutor começa com **12 pontos**
• As infrações deduzem pontos conforme a gravidade
• Se chegar a **0 pontos**, a carta é cancelada

**Dedução de pontos por gravidade:**
| Tipo | Pontos deduzidos |
|---|---|
| Contraordenação grave | 2 pontos |
| Contraordenação muito grave | 4 pontos |
| Acidente com vítimas + infração grave | +1 ponto extra |

**Recuperação de pontos:**
• +2 pontos por cada 2 anos sem infrações (máximo 12)
• Frequência de ação de formação homologada: +3 pontos (apenas uma vez por período de 2 anos)

**Os pontos só são deduzidos** quando a decisão administrativa for definitiva (sem recurso pendente) ou após decisão judicial.`,
    },
    {
        cat: 'Sistema de Pontos',
        q: 'Quando posso perder a carta de condução em Portugal?',
        a: `A perda da carta de condução (inibição de conduzir) pode ocorrer por duas vias:

**1. Via sistema de pontos (SIPP):**
• Chegada a 0 pontos: cancelamento da habilitação
• Após cancelamento: frequência obrigatória de ação de formação + nova prova de exame teórico e prático

**2. Sanção acessória de inibição de conduzir:**
• Aplicada como sanção acessória às contraordenações muito graves (art. 139 Código da Estrada)
• Duração: 1 mês a 2 anos, conforme a infração
• Infrações que implicam inibição obrigatória: condução com álcool ≥ 1,2 g/l, excesso de velocidade > 60 km/h do limite, uso de telemóvel, condução perigosa

**Infrações com inibição obrigatória:**
| Infração | Inibição mínima |
|---|---|
| Álcool ≥ 1,2 g/l | 3 meses |
| Velocidade > 60 km/h acima limite | 60 dias |
| Condução sem carta | 30 dias |
| Acidente grave + infração muito grave | 6 meses |

A contestação da infração principal suspende também a aplicação da sanção acessória enquanto o recurso estiver pendente.`,
    },
    {
        cat: 'Sistema de Pontos',
        q: 'Como consultar os pontos da minha carta de condução?',
        a: `Pode consultar o saldo de pontos da sua carta de condução através de:

**Online (mais rápido):**
• **Portal ePortugal.gov.pt** — autenticação com Chave Móvel Digital ou Cartão de Cidadão + leitor
• **Portal ANSR** (www.ansr.pt) — secção de consulta de pontos

**Presencialmente:**
• Qualquer **IMT (Instituto da Mobilidade e dos Transportes)** — balcões em Lisboa, Porto e delegações regionais
• **Conservatórias do Registo Civil** em algumas localidades

**Informações disponíveis:**
• Saldo atual de pontos
• Histórico de infrações que geraram deduções
• Data da última dedução e próxima possível recuperação

⚠️ **Nota:** os pontos das infrações em fase de recurso (defesa ou impugnação judicial) **não são deduzidos** enquanto o processo estiver pendente. Só são aplicados quando a decisão for definitiva.`,
    },

    // ── TIPOS DE CONTRAORDENAÇÃO ──────────────────────────────────────
    {
        cat: 'Tipos de Contraordenação',
        q: 'Quais são as principais contraordenações e os valores das coimas?',
        a: `O Código da Estrada classifica as contraordenações em três níveis:

**Contraordenações Leves:**
• Coima: €60 a €300 (condutor ligeiro)
• Não deduzem pontos no SIPP
• Exemplos: falta de triângulo, extintor expirado, documentação incompleta

**Contraordenações Graves:**
• Coima: €120 a €600
• Deduzem **2 pontos** na carta
• Exemplos: excesso de velocidade até 20 km/h, estacionamento em segunda fila, não usar cinto de segurança

**Contraordenações Muito Graves:**
• Coima: €300 a €1.500 (até €2.500 para certas infrações)
• Deduzem **4 pontos** na carta
• Sanção acessória de inibição de conduzir
• Exemplos:
  - Excesso de velocidade > 60 km/h acima do limite: €500–€2.500
  - Álcool 0,5–0,79 g/l: €250–€1.250
  - Álcool ≥ 0,8 g/l: €500–€2.500
  - Uso de telemóvel: €120–€600
  - Condução sem carta: €300–€1.500

*Valores referentes ao Código da Estrada atualizado (DL 114/94 e alterações).*`,
    },
    {
        cat: 'Tipos de Contraordenação',
        q: 'Quais as infrações mais comuns em Portugal?',
        a: `De acordo com os relatórios anuais da ANSR, as infrações mais registadas são:

**Top 5 infrações em Portugal (por volume):**

1. **Excesso de velocidade** — representa mais de 60% de todas as contraordenações; a maioria registada por radar fixo ou móvel
2. **Uso de telemóvel ao volante** — contraordenação muito grave; fiscalização aumentou com câmaras automáticas
3. **Não uso de cinto de segurança** — ainda frequente apesar da fiscalização
4. **Desrespeito por sinal vermelho** — cada vez mais monitorizado por câmaras nas interseções
5. **Condução com taxa de álcool** — represente grande parte das infrações na sinistralidade grave

**Por tipo de via:**
• Autoestradas: principalmente velocidade e uso de telemóvel
• Vias urbanas: estacionamento, sinal vermelho, peões
• Estradas nacionais: ultrapassagens proibidas, velocidade

**Infrações em crescimento:** as câmaras de controlo de velocidade em troço (média de velocidade) têm aumentado significativamente as contraordenações por excesso de velocidade sem margem de contestação técnica.`,
    },
    {
        cat: 'Tipos de Contraordenação',
        q: 'Qual é o limite de álcool permitido em Portugal?',
        a: `Portugal tem um dos limites de alcoolemia mais restritivos da Europa:

**Limites legais (art. 81 Código da Estrada):**
| Condutor | Limite máximo |
|---|---|
| Condutor em geral | 0,5 g/l (sangue) ou 0,25 mg/l (ar expirado) |
| Condutor novato (< 3 anos de carta) | 0,2 g/l |
| Condutor profissional (táxi, TVDE, pesados) | 0,2 g/l |

**Sanções:**
| Taxa | Contraordenação | Coima | Inibição |
|---|---|---|---|
| 0,5–0,79 g/l | Muito grave | €250–€1.250 | Facultativa |
| 0,80–1,19 g/l | Muito grave | €500–€2.500 | 3 meses |
| ≥ 1,2 g/l | Crime (CP) | Tribunal penal | Pena de prisão possível |

**Contestação:** é possível contestar infrações de álcool com base em erros no procedimento de teste (calibração do etilómetro, teste de contraprova não oferecido, etc.). Para valores próximos do limite, a margem de incerteza do aparelho pode ser relevante.`,
    },

    // ── PAGAMENTO E CONSEQUÊNCIAS ─────────────────────────────────────
    {
        cat: 'Pagamento e Consequências',
        q: 'Se não pagar nem contestar a coima, o que acontece?',
        a: `O não pagamento e a ausência de contestação têm consequências progressivas:

**Curto prazo (30 a 60 dias após a decisão):**
• A coima transita em julgado e torna-se definitivamente exigível
• Acréscimo de custas processuais (normalmente €25 a €75)

**Médio prazo:**
• Envio para execução fiscal nas Finanças (art. 88 RGCO)
• Possibilidade de penhora de conta bancária, vencimento ou bens
• Registo em certidão de dívidas do Estado

**Sanções acessórias:**
• A inibição de conduzir é executada mesmo sem pagamento — pode ser comunicada à GNR/PSP para fiscalização
• Retenção da carta de condução se for detido a conduzir durante a inibição

**Não afeta o registo criminal:** as contraordenações não são crimes e não aparecem no certificado de registo criminal — apenas no registo de contraordenações da ANSR.

**Prescrição da execução:** 5 anos após a decisão definitiva (art. 27-A RGCO). Mas os efeitos práticos da dívida persistem até liquidação.`,
    },
    {
        cat: 'Pagamento e Consequências',
        q: 'Existe desconto no pagamento voluntário da coima?',
        a: `**Sim.** O Código da Estrada e o RGCO preveem desconto no pagamento voluntário:

**Pagamento no prazo de apresentação de defesa (15 dias úteis):**
• Desconto de **50%** sobre o valor mínimo da coima
• Apenas para contraordenações onde a ANSR ou autoridade autuante o permita
• Este desconto não está disponível se apresentar defesa — é uma ou a outra

**Pagamento após decisão administrativa (20 dias úteis):**
• Sem desconto adicional, mas evita custas de execução
• Possibilidade de **pagamento em prestações** (requerer junto da ANSR)

**O dilema prático:**
Uma coima de €250 com 50% de desconto fica €125. Se a defesa tem boas probabilidades de sucesso (vício formal, equipamento sem calibração), recorrer pode poupar mais. Se as probabilidades são baixas, o desconto pode ser a opção mais racional.

A TEM Defesa ajuda-o a avaliar os fundamentos do auto antes de decidir — contestar ou pagar com desconto.`,
    },
    {
        cat: 'Pagamento e Consequências',
        q: 'As contraordenações prescrevem? Após quanto tempo?',
        a: `**Sim**, as contraordenações rodoviárias estão sujeitas a prescrição (art. 27 RGCO):

**Prazos de prescrição do procedimento:**
| Gravidade | Prazo |
|---|---|
| Contraordenação leve | 1 ano |
| Contraordenação grave | 2 anos |
| Contraordenação muito grave | 5 anos |

**Contagem:** a partir da data da infração. O prazo suspende-se:
• Com a notificação ao arguido
• Com a apresentação de defesa
• Com a prolação de decisão administrativa

**Prescrição da coima (após decisão definitiva):**
• 5 anos para execução da coima (art. 27-A RGCO)

**Na prática:** a maioria das contraordenações é notificada em semanas — a prescrição raramente é um fundamento válido nas fases iniciais. É mais relevante nos casos em que há demora excessiva do processo pela ANSR ou em recursos judiciais prolongados.

Verificar a data da infração e da notificação pode, em casos específicos, fundamentar a prescrição como argumento de defesa.`,
    },
];

export default function PerguntasFrequentes() {
    const [catAtiva, setCatAtiva] = useState('Todas');
    const [aberta, setAberta] = useState<number | null>(null);

    const filtradas = catAtiva === 'Todas' ? FAQS : FAQS.filter(f => f.cat === catAtiva);
    const toggle = (i: number) => setAberta(prev => prev === i ? null : i);

    const renderTexto = (texto: string) => {
        return texto.split('\n').map((linha, i) => {
            const negrito = linha.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#f0ebe0">$1</strong>');
            const isBullet = linha.startsWith('• ');
            return (
                <p key={i} style={{
                    margin: isBullet ? '2px 0 2px 12px' : '4px 0',
                    fontSize: 13,
                    color: '#a0aac0',
                    lineHeight: 1.65,
                }} dangerouslySetInnerHTML={{ __html: negrito }} />
            );
        });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0b0e18', color: '#f0ebe0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

            {/* NAV */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(11,14,24,.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e2540', padding: '0 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#c9973e' }}>TEM</span>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#f0ebe0' }}>Defesa</span>
                    </Link>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Link href="/como-recorrer" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#8892aa', textDecoration: 'none' }}>Como Recorrer</Link>
                        <Link href="/planos" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#8892aa', textDecoration: 'none' }}>Planos</Link>
                        <Link href="/login" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#8892aa', textDecoration: 'none' }}>Entrar</Link>
                        <Link href="/login" style={{ padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: '#c9973e', color: '#0b0e18', textDecoration: 'none' }}>Começar grátis</Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 40px', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 20, background: 'rgba(201,151,62,.1)', border: '1px solid rgba(201,151,62,.2)', fontSize: 12, color: '#c9973e', fontWeight: 700, marginBottom: 20, textTransform: 'uppercase' as const, letterSpacing: '.08em' }}>
                    Base de conhecimento
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
                    Perguntas Frequentes
                </h1>
                <p style={{ fontSize: 15, color: '#8892aa', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
                    Tudo o que precisa saber sobre como contestar contraordenações rodoviárias em Portugal,
                    com base no Código da Estrada (DL 114/94) e no RGCO (DL 433/82).
                </p>
            </section>

            {/* CATEGORIAS */}
            <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 32px' }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {CATEGORIAS.map(cat => (
                        <button key={cat} onClick={() => { setCatAtiva(cat); setAberta(null); }} style={{
                            padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
                            background: catAtiva === cat ? '#c9973e' : 'transparent',
                            color: catAtiva === cat ? '#0b0e18' : '#8892aa',
                            border: catAtiva === cat ? '1px solid #c9973e' : '1px solid #2a304a',
                        }}>
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* PERGUNTAS */}
            <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {filtradas.map((faq) => {
                        const globalIdx = FAQS.indexOf(faq);
                        const isOpen = aberta === globalIdx;
                        return (
                            <div key={globalIdx} style={{
                                background: '#111526',
                                border: `1px solid ${isOpen ? '#c9973e' : '#1e2540'}`,
                                borderRadius: 12,
                                overflow: 'hidden',
                                transition: 'border-color .2s',
                            }}>
                                <button onClick={() => toggle(globalIdx)} style={{
                                    width: '100%', textAlign: 'left', padding: '18px 20px',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: '#c9973e', textTransform: 'uppercase' as const, letterSpacing: '.06em', background: 'rgba(201,151,62,.1)', padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
                                            {faq.cat}
                                        </span>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: '#f0ebe0', lineHeight: 1.4 }}>{faq.q}</span>
                                    </div>
                                    <span style={{ color: '#c9973e', fontSize: 18, fontWeight: 700, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>+</span>
                                </button>
                                {isOpen && (
                                    <div style={{ padding: '0 20px 18px', borderTop: '1px solid #1e2540' }}>
                                        <div style={{ paddingTop: 14 }}>
                                            {renderTexto(faq.a)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div style={{ marginTop: 48, background: 'linear-gradient(135deg, rgba(201,151,62,.08), rgba(201,151,62,.03))', border: '1px solid rgba(201,151,62,.2)', borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
                    <p style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Pronto para contestar a sua coima?</p>
                    <p style={{ fontSize: 14, color: '#8892aa', marginBottom: 24, lineHeight: 1.6 }}>
                        A TEM Defesa gera a sua defesa fundamentada no RGCO e no Código da Estrada em minutos.<br />
                        A partir de €9,90 — sem advogado, sem burocracia.
                    </p>
                    <Link href="/login" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 10, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                        Gerar a minha defesa
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ borderTop: '1px solid #1e2540', padding: '24px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                    <Link href="/" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Início</Link>
                    <Link href="/como-recorrer" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Como Recorrer</Link>
                    <Link href="/planos" style={{ fontSize: 13, color: '#8892aa', textDecoration: 'none' }}>Planos</Link>
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
