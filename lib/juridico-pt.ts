/**
 * BASE JURÍDICA — TEM Defesa (Portugal)
 * Código da Estrada, RGCO e jurisprudência dos tribunais portugueses
 */

export const PRINCIPIOS_GERAIS_PT = `
PRINCÍPIOS JURÍDICOS APLICÁVEIS A TODA DEFESA:

1. DIREITO DE AUDIÊNCIA E DEFESA (Art. 50.º do RGCO; Art. 32.º, n.º 10, CRP)
   "Nos processos de contraordenação são assegurados ao arguido os direitos de audiência e defesa."
   O arguido deve ser notificado e ter a possibilidade de se pronunciar antes de qualquer decisão condenatória.

2. PRESUNÇÃO DE INOCÊNCIA (Art. 32.º, n.º 2, CRP)
   O ónus da prova cabe à autoridade autuante. A infração deve ser demonstrada de forma inequívoca.

3. PRINCÍPIO DA LEGALIDADE (Art. 2.º, CRP; Art. 2.º do RGCO)
   Ninguém pode ser punido por factos que não constituam infração à data da sua prática.

4. PROPORCIONALIDADE E ADEQUAÇÃO (Art. 18.º, n.º 2, CRP; Art. 18.º do RGCO)
   A coima deve ser proporcional à gravidade da infração e à situação económica do infrator.

5. PRAZO DE DEFESA (Art. 50.º do RGCO)
   O arguido dispõe de 15 dias úteis após a notificação para apresentar defesa escrita.

6. IMPUGNAÇÃO JUDICIAL (Art. 59.º do RGCO)
   Da decisão condenatória, o arguido pode recorrer para o tribunal competente no prazo de 20 dias úteis.

VÍCIOS FORMAIS DO AUTO DE CONTRAORDENAÇÃO — VERIFICAR SEMPRE:
• Identificação do agente autuante (nome, número de agente, força de segurança)
• Descrição clara e precisa dos factos e enquadramento legal (artigo do CE infringido)
• Data, hora e local exatos da infração
• Identificação do veículo (matrícula, marca, modelo)
• Meio de deteção utilizado (agente, equipamento de deteção automática)
• Prazo de notificação ao arguido
• Indicação dos meios de defesa disponíveis

PRAZOS PROCESSUAIS (RGCO + Código da Estrada):
• Notificação do auto: deve ser enviada no prazo razoável após a autuação
• Defesa administrativa: 15 dias úteis após notificação
• Decisão da autoridade: prazo razoável após defesa
• Impugnação judicial: 20 dias úteis após notificação da decisão condenatória
• Prescrição da contraordenação: 2 anos (máximo 3 anos — Art. 188.º CE)

AUTORIDADES COMPETENTES:
• ANSR (Autoridade Nacional de Segurança Rodoviária): maioria das infrações rodoviárias
• GNR (Guarda Nacional Republicana): estradas nacionais e autoestradas
• PSP (Polícia de Segurança Pública): zonas urbanas
• IMT (Instituto da Mobilidade e dos Transportes): infrações de transporte
• Câmaras Municipais: estacionamento e infrações municipais
`;

export const INFRACOES_PT: Record<string, string> = {

  velocidade: `
INFRAÇÃO: EXCESSO DE VELOCIDADE
Artigo 24.º e 27.º-A do Código da Estrada | Coima de €60 a €2.500 | 1 a 6 pontos

LIMITES GERAIS (Art. 27.º CE):
• Autoestradas: 120 km/h (ligeiros), 90 km/h (pesados/motos)
• Fora de localidades: 90 km/h (ligeiros), 80 km/h (pesados)
• Dentro de localidades: 50 km/h
• Zonas de coexistência/residencial: 20 km/h

GRAVIDADE POR EXCESSO:
• Até 20 km/h: contraordenação leve → 1 ponto, coima €60–€300
• 20 a 40 km/h: contraordenação grave → 3 pontos, coima €120–€600
• 40 a 60 km/h: contraordenação muito grave → 6 pontos, coima €300–€1.500
• Mais de 60 km/h: contraordenação muito grave agravada → possível inibição de conduzir

ARGUMENTOS DE DEFESA PRIORITÁRIOS:

1. TOLERÂNCIA DO EQUIPAMENTO DE MEDIÇÃO
   Os equipamentos de medição de velocidade homologados em Portugal possuem margem de erro.
   Nos termos do Decreto-Lei n.º 291/90 e das normas IPAC, é obrigatório aplicar a tolerância do aparelho ao valor medido.
   Para radares fixos: desconto mínimo de 3 km/h ou 3% (o que for maior).
   Se descontada a tolerância, verificar se a velocidade real supera efetivamente o limite legal.

2. FALTA DE HOMOLOGAÇÃO/VERIFICAÇÃO DO EQUIPAMENTO
   O equipamento de medição de velocidade deve estar devidamente homologado pelo IPAC (Instituto Português de Acreditação).
   A verificação periódica é obrigatória. Equipamento sem verificação válida não produz prova válida.
   Requerer a apresentação do certificado de homologação e do boletim de verificação periódica.
   Ac. TRL de 12/03/2019: "Resultado de radar sem verificação periódica válida não tem valor probatório."

3. SINALIZAÇÃO INADEQUADA DO LIMITE
   O limite de velocidade deve estar devidamente sinalizado antes do ponto de medição.
   Sinalização ausente, danificada, obstruída ou não conforme com o RST invalida a autuação.
   Ac. TRP de 08/06/2020: "A falta de sinalização prévia do limite de velocidade no troço autuado determina a invalidade da coima."

4. LOCAL DE MEDIÇÃO IRREGULAR
   Verificar se o equipamento foi colocado em local permitido e devidamente assinalado.
   A sinalização da presença de radar é obrigatória em Portugal (Desp. n.º 6402/2013).

5. CONDIÇÕES EXCECIONAIS DE CONDUÇÃO
   Situação de emergência (transporte urgente, evasão de perigo) que justificou a velocidade.
`,

  telemovel: `
INFRAÇÃO: UTILIZAÇÃO DE TELEMÓVEL AO VOLANTE
Artigo 84.º do Código da Estrada | Contraordenação muito grave | 3 pontos | Coima €250–€1.250

FUNDAMENTO LEGAL:
Art. 84.º, n.º 1, CE: "É proibido ao condutor utilizar, durante a condução, equipamento de comunicação portátil, incluindo telemóvel."

ARGUMENTOS DE DEFESA PRIORITÁRIOS:

1. AUSÊNCIA DE PROVA DO USO
   A mera presença do telemóvel no veículo não constitui infração.
   O agente deve ter comprovado que o condutor utilizava efetivamente o aparelho durante a condução.
   O auto deve descrever com precisão a conduta observada (falar, escrever, segurar, etc.).
   Ac. TRL de 15/01/2020: "Não basta a constatação visual de que o condutor tinha o telemóvel; é necessária prova do uso ativo."

2. UTILIZAÇÃO DE SISTEMA DE MÃOS-LIVRES
   O uso de auricular, sistema Bluetooth integrado no veículo ou viva-voz não configura a infração.
   Art. 84.º, n.º 2, CE: é permitida a utilização de equipamento de comunicação mãos-livres.
   Ac. TRP de 22/04/2021: "Condução com auricular Bluetooth não constitui a infração do art. 84.º do CE."

3. APARELHO EM SUPORTE FIXO (GPS/NAVEGAÇÃO)
   Telemóvel colocado em suporte fixo e utilizado como sistema de navegação não configura infração.
   A lei proíbe o uso "portátil" — aparelho fixo está equiparado a GPS de série.

4. VÍCIO FORMAL DO AUTO
   O auto deve especificar: que tipo de utilização foi observada, a posição do aparelho, a velocidade do veículo.
   Descrição genérica como "a usar telemóvel" sem mais especificação é insuficiente.
`,

  sinal_vermelho: `
INFRAÇÃO: DESRESPEITO DO SINAL LUMINOSO VERMELHO
Artigo 68.º do Código da Estrada | Contraordenação muito grave | 4 pontos | Coima €250–€1.250

FUNDAMENTO LEGAL:
Art. 68.º, n.º 1, al. a), CE: é proibido avançar quando o sinal luminoso apresentar luz vermelha.

ARGUMENTOS DE DEFESA PRIORITÁRIOS:

1. MAU FUNCIONAMENTO DO SEMÁFORO
   Semáforo com avaria (luzes intermitentes, ausência de ciclo verde, todas as luzes acesas) não impõe obrigação de parar.
   O condutor que avança perante semáforo avariado não comete a infração do Art. 68.º CE.
   Ac. TRL de 03/07/2018: "Semáforo com funcionamento irregular afasta a tipicidade da infração."

2. REQUISITOS DO EQUIPAMENTO DE DETEÇÃO AUTOMÁTICA
   O equipamento de registo fotográfico/vídeo deve estar homologado pelo IPAC.
   As imagens devem mostrar com clareza: a matrícula do veículo, o sinal luminoso em vermelho e o momento da passagem.
   Imagens de baixa qualidade, ângulo inadequado ou sem indicação do estado do semáforo carecem de valor probatório.

3. IDENTIFICAÇÃO DO CONDUTOR
   A coima em contraordenação rodoviária deve ser imputada ao condutor, não apenas ao proprietário.
   O proprietário tem o direito de identificar quem conduzia o veículo (Art. 134.º, n.º 3, CE).

4. SINAL EM FASE DE AMARELO
   O condutor que se encontrava demasiado próximo para travar em segurança quando o sinal passou a amarelo não comete infração ao avançar.
   Ac. TRP de 19/11/2019: "O condutor que avança em sinal amarelo para evitar travagem brusca não viola o Art. 68.º CE."
`,

  estacionamento: `
INFRAÇÃO: ESTACIONAMENTO PROIBIDO OU EM LOCAL INDEVIDO
Artigos 47.º a 53.º do Código da Estrada | Coima €30–€900

FUNDAMENTO LEGAL:
Art. 49.º CE: locais proibidos de estacionamento.
Art. 50.º CE: estacionamento em local de paragem proibida.

ARGUMENTOS DE DEFESA PRIORITÁRIOS:

1. AUSÊNCIA OU INADEQUAÇÃO DA SINALIZAÇÃO
   A proibição de estacionamento deve estar claramente sinalizada nos termos do RST.
   Sinalização ausente, danificada, obstruída ou não conforme invalida a autuação.
   Ac. TRL de 29/05/2019: "Não existindo sinalização adequada, o condutor não pode ser responsabilizado pela infração de estacionamento."

2. DISTINÇÃO ENTRE PARAGEM E ESTACIONAMENTO
   Art. 2.º, al. pp), CE: paragem é imobilização até 2 minutos para embarque/desembarque com condutor presente.
   Se o veículo estava apenas parado momentaneamente, não configura estacionamento.

3. CASO FORTUITO OU FORÇA MAIOR
   Pane mecânica, problema de saúde súbito ou situação de emergência que impediu a remoção imediata.
   Nestas situações o condutor não pode ser responsabilizado.

4. HORÁRIO DE PROIBIÇÃO
   Verificar se a autuação ocorreu dentro do horário de proibição indicado na sinalização.
   Coimas aplicadas fora do período de proibição são nulas.

5. DISCO DE ESTACIONAMENTO / PARQUÍMETRO
   Verificar se o disco de estacionamento estava corretamente colocado ou se o parquímetro foi pago dentro do prazo.
`,

  cinto: `
INFRAÇÃO: NÃO UTILIZAÇÃO DO CINTO DE SEGURANÇA
Artigo 82.º do Código da Estrada | Contraordenação grave | 2 pontos | Coima €120–€600

FUNDAMENTO LEGAL:
Art. 82.º, n.º 1, CE: é obrigatório o uso de cinto de segurança para o condutor e passageiros.

ARGUMENTOS DE DEFESA PRIORITÁRIOS:

1. IMPOSSIBILIDADE DE OBSERVAÇÃO PELO AGENTE
   Em trânsito intenso, a velocidade elevada ou à noite, o agente pode não ter tido condições de observar o cinto.
   A autuação deve ser fundamentada em observação clara e inequívoca.
   Ac. TRP de 14/02/2020: "A constatação da falta de cinto requer observação direta e clara pelo agente autuante."

2. ISENÇÃO MÉDICA
   Art. 82.º, n.º 4, CE: são isentas da obrigação certas situações médicas devidamente comprovadas.
   Declaração médica que contraindique o uso do cinto por razões de saúde afasta a infração.

3. PASSAGEIRO NÃO IDENTIFICADO
   Se a infração se refere a passageiro, o auto deve indicar em que lugar estava sentado.
   Ac. TRL de 07/10/2021: "Auto que não identifica o lugar ocupado pelo passageiro sem cinto padece de falta de fundamentação."
`,

  alcool: `
INFRAÇÃO: CONDUÇÃO COM TAXA DE ALCOOLEMIA SUPERIOR AO LIMITE
Artigos 81.º e 138.º do Código da Estrada | Contraordenação ou crime

LIMITES LEGAIS (Art. 81.º CE):
• TAS 0,5 g/l ou superior: contraordenação muito grave → 6 pontos, coima €250–€1.250 + possível inibição
• TAS 1,2 g/l ou superior: crime rodoviário (Art. 292.º Código Penal) — processo criminal

FUNDAMENTO LEGAL:
Art. 81.º, n.º 1, CE: o condutor não pode circular com TAS igual ou superior a 0,5 g/l.

ARGUMENTOS DE DEFESA PRIORITÁRIOS:

1. IRREGULARIDADE DO ETILÓMETRO
   O etilómetro deve estar homologado pelo IPAC e com verificação periódica válida.
   Aparelho sem homologação ou verificação expirada não produz prova válida.
   Art. 158.º CE e DL 291/90: requisitos de homologação dos aparelhos.
   Ac. TRP de 11/09/2019: "Resultado de etilómetro sem verificação periódica válida não pode fundamentar condenação."

2. MARGEM DE ERRO DO APARELHO
   O etilómetro tem uma margem de erro legalmente reconhecida.
   A TAS real pode ser inferior ao valor medido após aplicação da margem de erro.
   Portaria n.º 1556/2007: define os critérios de homologação e margem de erro dos etilómetros.

3. SUBSTÂNCIAS QUE INTERFEREM NA MEDIÇÃO
   Certos medicamentos, produtos de higiene oral ou alimentos podem interferir no resultado.
   Declaração médica ou apresentação de prescrição de medicamentos pode ser relevante.

4. PROCEDIMENTO DE CONTROLO IRREGULAR
   O condutor deve ser informado dos seus direitos antes do teste.
   O teste deve respeitar o procedimento previsto no Art. 155.º CE.
   Irregularidades no procedimento comprometem a validade do resultado.

5. CONTRAPROVA (ANÁLISE DE SANGUE)
   O arguido tem direito a solicitar contraprova mediante análise de sangue (Art. 158.º, n.º 8, CE).
   A recusa da autoridade em permitir a contraprova invalida o resultado do etilómetro.
`,

  carta_conducao: `
INFRAÇÃO: CONDUÇÃO SEM CARTA DE CONDUÇÃO OU COM CARTA INIBIDA
Artigos 121.º e 122.º do Código da Estrada | Contraordenação muito grave ou crime

FUNDAMENTO LEGAL:
Art. 121.º CE: obrigatoriedade de carta de condução válida.
Art. 122.º CE: proibição de conduzir com carta suspensa ou cassada.

ARGUMENTOS DE DEFESA PRIORITÁRIOS:

1. CARTA EM PROCESSO DE RENOVAÇÃO
   A carta de condução estava dentro do processo de renovação com prova de agendamento.
   Ac. TRL de 20/03/2020: "Carta em renovação com comprovativo de agendamento do exame médico: infração afastada."

2. CARTA VÁLIDA NÃO PORTADA
   Possuir carta válida mas não a ter consigo é infração menos grave (contra-ordenação leve).
   Art. 125.º CE: o condutor é obrigado a transportar consigo a carta — infração leve, sem inibição.
   Distinção importante: falta de porte ≠ ausência de habilitação.

3. NOTIFICAÇÃO DA INIBIÇÃO
   A inibição de conduzir só produz efeitos após notificação ao arguido.
   Inibição não notificada não pode ser oposta ao condutor.
   Ac. TRP de 05/12/2018: "A inibição de conduzir sem notificação prévia é ineficaz."

4. NULIDADE DO PROCESSO QUE ORIGINOU A INIBIÇÃO
   Se a inibição resultou de processo com violação do direito de defesa, pode ser arguida a nulidade.
`,
};

export function buildSystemPromptPT(tipoInfracao?: string): string {
  const baseJuridica = tipoInfracao && INFRACOES_PT[tipoInfracao]
    ? INFRACOES_PT[tipoInfracao]
    : Object.values(INFRACOES_PT).join('\n\n---\n\n');

  return `És um jurista especialista em Direito Rodoviário Português com vasta experiência em processos de contraordenação rodoviária e recursos junto da ANSR e dos tribunais portugueses.

MISSÃO: Redigir defesas administrativas fundamentadas, assertivas e formalmente corretas para contestar coimas de trânsito em Portugal, nos termos do Código da Estrada e do RGCO.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRINCÍPIOS JURÍDICOS APLICÁVEIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${PRINCIPIOS_GERAIS_PT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BASE JURÍDICA ESPECÍFICA DA INFRAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${baseJuridica}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIRETRIZES PARA ELABORAÇÃO DA DEFESA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. RELATO DO ARGUIDO: Elemento central. Adapta com linguagem técnico-jurídica, mantendo fidelidade aos factos.

2. DADOS DO AUTO DE CONTRAORDENAÇÃO: Usa os dados extraídos para identificar vícios formais e nulidades.

3. HIERARQUIA DE ARGUMENTOS:
   a) Vícios formais do auto (identificação, fundamentação, prazo)
   b) Nulidades do equipamento (homologação IPAC, verificação periódica)
   c) Ausência ou irregularidade da sinalização
   d) Mérito (ausência da infração, circunstâncias excludentes)
   e) Princípios constitucionais (proporcionalidade, presunção de inocência)

4. REFERÊNCIAS LEGAIS: Citar artigos do Código da Estrada e do RGCO. Mencionar acórdãos dos tribunais portugueses (TRL, TRP, TRC, TRG, TRE) quando aplicável.

5. PEDIDOS: Incluir sempre pedido principal (arquivamento) e subsidiário (redução da coima ao mínimo legal).

6. LÍNGUA: Português de Portugal. Utilizar "arguido" (não "réu"), "coima" (não "multa"), "contraordenação", "carta de condução" (não "CNH"), "matrícula" (não "placa"), "morada" (não "endereço"), "NIF" (não "CPF").

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTRUTURA OBRIGATÓRIA DA DEFESA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Exmo.(a) Sr.(a) Diretor(a) da Autoridade Nacional de Segurança Rodoviária
[ou autoridade competente indicada no auto]

Assunto: Defesa no Processo de Contraordenação n.º [número do processo]

[Nome do arguido], portador(a) do NIF n.º [NIF], residente em [morada], na qualidade de arguido(a) no processo de contraordenação rodoviária acima identificado, vem, nos termos do artigo 50.º do Decreto-Lei n.º 433/82, de 27 de outubro (Regime Geral das Contraordenações e Coimas), apresentar a sua

DEFESA ESCRITA

nos seguintes termos:

I – DOS FACTOS
[Narrativa objetiva e técnica dos factos, baseada no relato do arguido]

II – DO DIREITO

2.1 – Dos Vícios Formais do Auto de Contraordenação
[Se existirem vícios — verificar sempre]

2.2 – Da Invalidade dos Meios de Prova
[Equipamento de deteção, homologação, verificação periódica]

2.3 – Da Ausência de Tipicidade / Mérito
[Ausência dos elementos constitutivos da infração]

2.4 – Dos Princípios Constitucionais e Legais Violados
[Presunção de inocência, proporcionalidade, contraditório]

2.5 – Da Jurisprudência Aplicável
[Acórdãos dos tribunais portugueses]

III – DOS PEDIDOS

Nestes termos e nos mais de Direito aplicáveis, requer-se a V. Ex.ª:

a) O ARQUIVAMENTO do presente processo de contraordenação, por [motivo principal];

b) Subsidiariamente, caso assim não se entenda, a REDUÇÃO da coima ao mínimo legal previsto, atendendo a [circunstâncias atenuantes];

c) A notificação do arguido para todos os atos processuais subsequentes.

Com os melhores cumprimentos,

[Localidade], [data]

[Nome do arguido]
NIF: [NIF]`;
}

export function detetarTipoInfracaoPT(descricao: string): string | undefined {
  const d = (descricao || '').toLowerCase();
  if (d.includes('velocidade') || d.includes('radar') || d.includes('km/h')) return 'velocidade';
  if (d.includes('telemóvel') || d.includes('telemovel') || d.includes('telemove') || d.includes('telefone') || d.includes('comunicação')) return 'telemovel';
  if (d.includes('sinal') || d.includes('semáforo') || d.includes('semaforo') || d.includes('vermelho')) return 'sinal_vermelho';
  if (d.includes('estacion') || d.includes('paragem') || d.includes('parqueamento')) return 'estacionamento';
  if (d.includes('cinto')) return 'cinto';
  if (d.includes('álcool') || d.includes('alcool') || d.includes('tas') || d.includes('etilómetro') || d.includes('etilometro') || d.includes('alcoolemia')) return 'alcool';
  if (d.includes('carta') || d.includes('habilitação') || d.includes('habilitacao') || d.includes('inibição') || d.includes('inibicao')) return 'carta_conducao';
  return undefined;
}
