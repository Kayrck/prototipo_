// Dados institucionais do SINTFUB usados em várias páginas (Quem Somos, Documentos,
// Transparência, Convênios etc.). Todo conteúdo aqui foi conferido no site oficial
// (sintfub.org.br); nomes, datas e PDFs não devem ser inventados.

export const UNION_NAME = "Sindicato dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília";
export const TAE_FUB = "servidores técnico-administrativos em educação da FUB";

export const UNION_ADDRESS_LINES = [
  "SINTFUB, Sindicato dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília - UnB",
  "Edifício Multiuso 1, Bloco C, Sala 54/2",
  "Asa Norte, Brasília/DF",
  "CEP: 70910-900",
];
export const UNION_ADDRESS = UNION_ADDRESS_LINES.join(", ");

export const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbBTawo5fM5RQOLGxO2A";

export const externalLinks = [
  { label: "CUT", desc: "Central Única dos Trabalhadores", href: "https://www.cut.org.br/" },
  { label: "FASUBRA", desc: "Federação de Sindicatos de Trabalhadores Técnico-Administrativos em Instituições de Ensino Superior Públicas do Brasil", href: "https://fasubra.org.br/" },
  { label: "Universidade de Brasília", desc: "Site oficial da UnB", href: "https://www.unb.br/" },
  { label: "SouGov", desc: "Serviços ao servidor público federal", href: "https://www.gov.br/servidor/pt-br/assuntos/sou-gov" },
];

/* ------------------------------------------------------------------ */
/* Setores de atendimento                                              */
/* ------------------------------------------------------------------ */

export interface Sector {
  slug: string;
  label: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  description: string;
}

export const sectors: Sector[] = [
  { slug: "secretaria", label: "Secretaria", phone: "5561992316213", phoneDisplay: "(61) 99231-6213", email: "sintfub@sintfub.org.br", description: "Informações gerais, filiação e atendimento à categoria." },
  { slug: "juridico", label: "Jurídico", phone: "5561992322081", phoneDisplay: "(61) 99232-2081", email: "sintfub@sintfub.org.br", description: "Agendamento dos plantões jurídicos." },
  { slug: "financeiro", label: "Financeiro", phone: "5561992550589", phoneDisplay: "(61) 99255-0589", email: "financeiro@sintfub.org.br", description: "Contribuições, recibos e demais questões financeiras." },
  { slug: "hub", label: "Subsede HUB", phone: "5561992317544", phoneDisplay: "(61) 99231-7544", email: "hub@sintfub.org.br", description: "Atendimento aos filiados lotados no Hospital Universitário de Brasília." },
];

/* ------------------------------------------------------------------ */
/* Coordenação Executiva                                               */
/* ------------------------------------------------------------------ */

export interface BoardGroup {
  title: string;
  people: string[];
}

/** Gestão 2026-2029. */
export const boardGroups: BoardGroup[] = [
  { title: "Coordenação Geral", people: ["Carla Simone Vizzotto", "Maria do Socorro Oliveira Marzola", "Efraim Carlos Costa"] },
  { title: "Coordenação de Administração", people: ["Alice Queiroz Silva", "Taiã Mairon Peixoto Ribeiro"] },
  { title: "Coordenação de Cultura e Esportes", people: ["Jackson Ferreira do Nascimento", "Sinara Sartori de Melo"] },
  { title: "Coordenação de Comunicação e Divulgação", people: ["Camila Oliveira Sobrinho", "Mônica Regina Peres"] },
  { title: "Coordenação de Finanças", people: ["Wilker Luciano Zorzin"] },
  { title: "Coordenação Jurídica e Relações de Trabalho", people: ["Luiz Eduardo Celino Benedito", "Nadia Regina Alves Valadares"] },
  { title: "Coordenação de Políticas Sociais, Saúde e Seguridade Social", people: ["Valdete Silva de Freitas Morais", "Sônia Aparecida Alves"] },
  { title: "Coordenação de Assuntos de Aposentadoria e Pensão", people: ["Celina Menezes Bastos"] },
  { title: "Coordenação de Educação", people: ["Leocádia Aparecida Chaves", "Junia Maria Zandonade Falqueto"] },
  { title: "Coordenação de Raça, Etnia e Diversidade Sexual", people: ["Maria Célia Orlato Selem", "Andrea Henrique Campos Da Fonseca"] },
  { title: "Coordenação de Mulheres", people: ["Luanna Ferreira da Silva", "Iris Dias Santos"] },
  { title: "Coordenação de Organização Política e Formação Sindical", people: ["Alexandre Jorge de Medeiros Fernandes", "Carla Márcia"] },
];

export const substituteBody: string[] = [
  "Vidigal Barbosa",
  "Christina Elisa Madeira Mauriz Saraiva",
  "Vanderléia da Conceição Indiano",
  "Elton Jhon Almeida de Souza",
  "Felícia Maria de Souza",
  "Alessandra de Cássia Alves de Carvalho",
  "Rafael Romualdo dos Reis",
  "Maria Sueli de Lima",
  "Camila Siebert Altavini",
  "José Almiram Rodrigues",
  "Cecília Ribeiro de Sena",
  "Patricia Rosa de Lima Alves",
  "Geralda Ducenir Izidorio Rocha da Silva",
  "Paulo Meira Lima Mattos",
  "Gercino Duarte Silva",
  "Rejane Sarmento Costa",
  "Débora Cirlene de Sousa",
  "Daniel Roberto Milke",
  "Jane Lucia Bendixen Tesch Auersvald",
  "Mariana Dias Batista Logrado",
  "Flavio Renato de Aguiar Lopes",
  "Fernando Soares dos Santos",
  "Alan Ribeiro Mol",
  "Sara Regina Morais Kollar",
  "Danilo Gustavo Rodrigues de Oliveira",
];

/**
 * Fotografias da Coordenação Executiva e do Corpo Suplente, indexadas pelo nome completo
 * (arquivos em /public/img/coordenacao, obtidos da página oficial da gestão 2026-2029).
 * Quem não tem foto cadastrada aqui aparece com as iniciais.
 */
export const boardPhotos: Record<string, string> = {
  "Carla Simone Vizzotto": "/img/coordenacao/carla-simone-vizzotto.jpg",
  "Maria do Socorro Oliveira Marzola": "/img/coordenacao/maria-do-socorro-oliveira-marzola.jpg",
  "Efraim Carlos Costa": "/img/coordenacao/efraim-carlos-costa.jpg",
  "Alice Queiroz Silva": "/img/coordenacao/alice-queiroz-silva.jpg",
  "Taiã Mairon Peixoto Ribeiro": "/img/coordenacao/taia-mairon-peixoto-ribeiro.jpg",
  "Jackson Ferreira do Nascimento": "/img/coordenacao/jackson-ferreira-do-nascimento.jpg",
  "Sinara Sartori de Melo": "/img/coordenacao/sinara-sartori-de-melo.jpg",
  "Camila Oliveira Sobrinho": "/img/coordenacao/camila-oliveira-sobrinho.jpg",
  "Mônica Regina Peres": "/img/coordenacao/monica-regina-peres.jpg",
  "Wilker Luciano Zorzin": "/img/coordenacao/wilker-luciano-zorzin.jpg",
  "Luiz Eduardo Celino Benedito": "/img/coordenacao/luiz-eduardo-celino-benedito.jpg",
  "Nadia Regina Alves Valadares": "/img/coordenacao/nadia-regina-alves-valadares.jpg",
  "Valdete Silva de Freitas Morais": "/img/coordenacao/valdete-silva-de-freitas-morais.jpg",
  "Sônia Aparecida Alves": "/img/coordenacao/sonia-aparecida-alves.jpg",
  "Celina Menezes Bastos": "/img/coordenacao/celina-menezes-bastos.jpg",
  "Leocádia Aparecida Chaves": "/img/coordenacao/leocadia-aparecida-chaves.jpg",
  "Junia Maria Zandonade Falqueto": "/img/coordenacao/junia-maria-zandonade-falqueto.jpg",
  "Maria Célia Orlato Selem": "/img/coordenacao/maria-celia-orlato-selem.jpg",
  "Andrea Henrique Campos Da Fonseca": "/img/coordenacao/andrea-henrique-campos-da-fonseca.jpg",
  "Luanna Ferreira da Silva": "/img/coordenacao/luanna-ferreira-da-silva.jpg",
  "Iris Dias Santos": "/img/coordenacao/iris-dias-santos.jpg",
  "Alexandre Jorge de Medeiros Fernandes": "/img/coordenacao/alexandre-jorge-de-medeiros-fernandes.jpg",
  "Carla Márcia": "/img/coordenacao/carla-marcia.jpg",
  "Vidigal Barbosa": "/img/coordenacao/vidigal-barbosa.jpg",
  "Christina Elisa Madeira Mauriz Saraiva": "/img/coordenacao/christina-elisa-madeira-mauriz-saraiva.jpg",
  "Vanderléia da Conceição Indiano": "/img/coordenacao/vanderleia-da-conceicao-indiano.jpg",
  "Elton Jhon Almeida de Souza": "/img/coordenacao/elton-jhon-almeida-de-souza.jpg",
  "Felícia Maria de Souza": "/img/coordenacao/felicia-maria-de-souza.jpg",
  "Alessandra de Cássia Alves de Carvalho": "/img/coordenacao/alessandra-de-cassia-alves-de-carvalho.jpg",
  "Rafael Romualdo dos Reis": "/img/coordenacao/rafael-romualdo-dos-reis.jpg",
  "Maria Sueli de Lima": "/img/coordenacao/maria-sueli-de-lima.jpg",
  "Camila Siebert Altavini": "/img/coordenacao/camila-siebert-altavini.jpg",
  "José Almiram Rodrigues": "/img/coordenacao/jose-almiram-rodrigues.jpg",
  "Cecília Ribeiro de Sena": "/img/coordenacao/cecilia-ribeiro-de-sena.jpg",
  "Patricia Rosa de Lima Alves": "/img/coordenacao/patricia-rosa-de-lima-alves.jpg",
  "Geralda Ducenir Izidorio Rocha da Silva": "/img/coordenacao/geralda-ducenir-izidorio-rocha-da-silva.jpg",
  "Paulo Meira Lima Mattos": "/img/coordenacao/paulo-meira-lima-mattos.jpg",
  "Gercino Duarte Silva": "/img/coordenacao/gercino-duarte-silva.jpg",
  "Débora Cirlene de Sousa": "/img/coordenacao/debora-cirlene-de-sousa.jpg",
  "Daniel Roberto Milke": "/img/coordenacao/daniel-roberto-milke.jpg",
  "Jane Lucia Bendixen Tesch Auersvald": "/img/coordenacao/jane-lucia-bendixen-tesch-auersvald.jpg",
  "Mariana Dias Batista Logrado": "/img/coordenacao/mariana-dias-batista-logrado.jpg",
  "Flavio Renato de Aguiar Lopes": "/img/coordenacao/flavio-renato-de-aguiar-lopes.jpg",
  "Fernando Soares dos Santos": "/img/coordenacao/fernando-soares-dos-santos.jpg",
  "Alan Ribeiro Mol": "/img/coordenacao/alan-ribeiro-mol.jpg",
  "Sara Regina Morais Kollar": "/img/coordenacao/sara-regina-morais-kollar.jpg",
  "Danilo Gustavo Rodrigues de Oliveira": "/img/coordenacao/danilo-gustavo-rodrigues-de-oliveira.jpg",
};

export const fiscalCouncil = {
  titulares: ["Frederico Cristiano Gonçalves Mourão", "Rosângela Rodrigues de Araújo Fraga", "Dijalma José da Silva"],
  suplentes: ["José Humberto Alves", "Elmar Rodrigues de Lima", "Sérgio Rubens Ribeiro"],
};

/** Gestão 2022-2025, para a Memória Sindical. */
export const previousBoard: { period: string; groups: BoardGroup[] } = {
  period: "Gestão 2022-2025",
  groups: [
    { title: "Coordenação Geral", people: ["Edmilson Rodrigues de Lima", "Vania Felício da Silva", "Francisco de Assis Menezes Rodrigues"] },
    { title: "Coordenação de Administração", people: ["Eudes de Queiroz e Silva"] },
    { title: "Coordenação de Cultura e Esportes", people: ["Francisco de Assis da Silva", "Djan Franco Souza Ferreira"] },
    { title: "Coordenação de Imprensa e Divulgação", people: ["Maurício Sabino de Araújo Rocha", "José Almiram Rodrigues"] },
    { title: "Coordenação de Finanças", people: ["Raquel Gonçalves Pinheiro", "José Gilberto Lopes Macêdo"] },
    { title: "Coordenação Jurídica e Relações de Trabalho", people: ["Evani Bispo de Oliveira", "Cleonice Argenta Carlos"] },
    { title: "Coordenação de Políticas Sociais, Saúde e Seguridade Social", people: ["Abadia Vieira Calácia", "Osvanildo Lourenso da Silva"] },
    { title: "Coordenação de Assuntos de Aposentadoria e Pensão", people: ["Francisca Nascimento de Albuquerque", "Benedito Ferreira de Almeida"] },
    { title: "Coordenação de Educação", people: ["Messias Adjalbas Muniz Barbosa", "Ieri de Sousa Braga Junior"] },
    { title: "Coordenação de Raça, Etnia e Diversidade Sexual", people: ["Aidil Alcoeres Coelho", "Jane Aparecida Rosa"] },
    { title: "Coordenação de Mulheres", people: ["Rozangela Baia Silva", "Carla Marcia Viana David"] },
    { title: "Coordenação de Organização Política e Formação Sindical", people: ["Lara Seabra de Macêdo", "Alexandre Magno Rodrigues"] },
  ],
};

/* ------------------------------------------------------------------ */
/* Documentos                                                          */
/* ------------------------------------------------------------------ */

export interface DocLink {
  title: string;
  date: string;
  url: string;
  size?: string;
  note?: string;
}

const UP = "https://sintfub.org.br/wp-content/uploads/";

/** CONSINTFUB: Congresso do SINTFUB. */
export interface ConsintfubEdition {
  slug: string;
  label: string;
  when: string;
  summary: string;
  docs: DocLink[];
  /** Tag das publicações internas relacionadas à edição. */
  tag?: string;
  /** Materiais que ainda estão publicados apenas no site atual do SINTFUB. */
  legacyUrl?: string;
}

export const consintfubEditions: ConsintfubEdition[] = [
  {
    slug: "xxiv",
    label: "XXIV CONSINTFUB",
    when: "25 a 27 de agosto de 2026",
    summary: "Fortaleceu a organização da categoria e aprovou o plano de lutas em defesa da educação pública e dos trabalhadores.",
    docs: [{ title: "Programação · XXIV CONSINTFUB", date: "Ago/2026", url: `${UP}2026/08/Programacao_XXIV_CONSINTFUB.pdf` }],
    tag: "consintfub",
  },
  {
    slug: "xxii",
    label: "XXII CONSINTFUB",
    when: "Novembro de 2022",
    summary: "Debateu conjuntura nacional e plano de lutas, aprovou o regimento interno e tratou da filiação do SINTFUB a uma central sindical.",
    docs: [],
    legacyUrl: "https://sintfub.org.br/category/xxii-consintfub/",
  },
  {
    slug: "xxi",
    label: "XXI CONSINTFUB",
    when: "26 de agosto de 2021",
    summary: "Realizado na Praça Chico Mendes.",
    docs: [],
    legacyUrl: "https://sintfub.org.br/category/xxi-consintfub/",
  },
  {
    slug: "xix",
    label: "XIX CONSINTFUB",
    when: "Maio de 2017",
    summary: "Marcado por debates e pela participação democrática da categoria.",
    docs: [],
    legacyUrl: "https://sintfub.org.br/category/xix-consintfub/",
  },
];

/** Processos eleitorais (Documentos > Eleições). */
export interface ElectionProcess {
  slug: string;
  label: string;
  summary: string;
  docs: DocLink[];
  /** Tag das publicações internas relacionadas ao processo. */
  tag?: string;
}

export const electionProcesses: ElectionProcess[] = [
  {
    slug: "sintfub",
    label: "Eleições SINTFUB",
    summary: "Eleição da Coordenação Executiva e do Conselho Fiscal do SINTFUB (quadriênio 2026-2029) e documentos do processo de 2019.",
    docs: [
      { title: "Edital de Convocação de Eleição · Quadriênio 2026-2029", date: "Ago/2025", url: `${UP}2025/08/ELEICAO-SINTFUB-EDITAL-DE-CONVOCACAO-DE-ELEICAO-QUADRIENIO-2026-A-2029.pdf` },
      { title: "Calendário das Eleições · Quadriênio 2026-2029", date: "Ago/2025", url: `${UP}2025/08/CALENDARIO-ELEICOES-QUADRIENIO-2026-2029-.Recuperacao-Automatica.pdf` },
      { title: "Regimento da Eleição da Coordenação Executiva do SINTFUB · 2025-2026", date: "Out/2025", url: `${UP}2025/10/Regimento-da-Eleicao-da-Coordenacao-Executiva-do-SINTFUB-2025-2026.pdf` },
      { title: "Regimento do Conselho Fiscal · 2025", date: "Nov/2025", url: `${UP}2025/11/2025_regimento_conselhofiscal.pdf` },
      { title: "Divulgação do resultado · Eleição SINTFUB 2025", date: "Nov/2025", url: `${UP}2025/11/divulgacao_resultado_eleicao2025.pdf` },
      { title: "Boletim Informativo · Eleições 2 (2019)", date: "2019", url: `${UP}2019/05/BoletimInformativoEleicoesDois.pdf` },
    ],
    tag: "eleicoes-sintfub",
  },
  {
    slug: "reitoria",
    label: "Eleições Reitoria",
    summary: "Acompanhamento da Consulta para a Reitoria da UnB e da nomeação da nova reitoria, em 2024.",
    docs: [],
    tag: "eleicoes-reitoria",
  },
  {
    slug: "cad",
    label: "CAD",
    summary: "Eleição de representantes da categoria no Conselho de Administração (CAD) da UnB.",
    docs: [
      { title: "Edital de Convocação · CAD e CONSUNI 2025", date: "Out/2025", url: `${UP}2025/10/EDITAL-DE-CONVOCACAO-CAD-CONSUNI-2025.pdf` },
      { title: "Regimento Eleitoral · CAD e CONSUNI 2025", date: "Out/2025", url: `${UP}2025/10/Regimento-Eleitoral-CADE-CONSUNI-2025.pdf` },
      { title: "Ficha de Inscrição · CAD 2025", date: "Out/2025", url: `${UP}2025/10/Ficha-de-Inscricao-CAD-2025.pdf` },
      { title: "Homologação de candidatos · CAD, CONSUNI e CIS 2025", date: "Nov/2025", url: `${UP}2025/11/HOMOLOGACAO-CANDITATOS-AO-CAD_CONSUNI_CIS-2025.pdf` },
      { title: "Resultado preliminar · Eleições CAD, CONSUNI e CIS 2025", date: "Nov/2025", url: `${UP}2025/11/RESULTADO-PRELIMINAR-ELEICOES-CAD-CONSUNI-E-CIS-2025.pdf` },
      { title: "Ato da Reitoria CAD nº 0064/2026", date: "Mar/2026", url: `${UP}2026/03/SEI_13668868_Ato_da_Reitoria_CAD_n__0064_2026.pdf` },
      { title: "Resolução Nº 4 · Comissão Eleitoral CAD/CONSUNI (2019)", date: "2019", url: `${UP}2019/05/RESOlucaoQuatroCADCONSUNI.pdf` },
    ],
    tag: "eleicoes-cad",
  },
  {
    slug: "consuni",
    label: "Consuni",
    summary: "Eleição de representantes da categoria no Conselho Universitário (Consuni) da UnB.",
    docs: [
      { title: "Edital de Convocação · CAD e CONSUNI 2025", date: "Out/2025", url: `${UP}2025/10/EDITAL-DE-CONVOCACAO-CAD-CONSUNI-2025.pdf` },
      { title: "Regimento Eleitoral · CAD e CONSUNI 2025", date: "Out/2025", url: `${UP}2025/10/Regimento-Eleitoral-CADE-CONSUNI-2025.pdf` },
      { title: "Ficha de Inscrição · CONSUNI 2025", date: "Out/2025", url: `${UP}2025/10/Ficha-de-Inscricao-CONSUNI-2025.pdf` },
      { title: "Homologação de candidatos · CAD, CONSUNI e CIS 2025", date: "Nov/2025", url: `${UP}2025/11/HOMOLOGACAO-CANDITATOS-AO-CAD_CONSUNI_CIS-2025.pdf` },
      { title: "Resultado preliminar · Eleições CAD, CONSUNI e CIS 2025", date: "Nov/2025", url: `${UP}2025/11/RESULTADO-PRELIMINAR-ELEICOES-CAD-CONSUNI-E-CIS-2025.pdf` },
      { title: "Ato da Reitoria CONSUNI nº 0065/2026", date: "Mar/2026", url: `${UP}2026/03/SEI_13670945_Ato_da_Reitoria_CONSUNI_n__0065_2026.pdf` },
      { title: "Resolução Nº 4 · Comissão Eleitoral CAD/CONSUNI (2019)", date: "2019", url: `${UP}2019/05/RESOlucaoQuatroCADCONSUNI.pdf` },
    ],
    tag: "eleicoes-consuni",
  },
  {
    slug: "cis",
    label: "CIS",
    summary: "Eleição de representantes da categoria na Comissão Interna de Supervisão (CIS) da UnB.",
    docs: [
      { title: "Edital de Convocação · CIS 2025", date: "Out/2025", url: `${UP}2025/10/EDITAL-CIS-2025-2.pdf` },
      { title: "Regimento Interno da Eleição · CIS 2025", date: "Out/2025", url: `${UP}2025/10/Regimento-Interno-Eleicao-CIS-2025.pdf` },
      { title: "Homologação de candidatos · CAD, CONSUNI e CIS 2025", date: "Nov/2025", url: `${UP}2025/11/HOMOLOGACAO-CANDITATOS-AO-CAD_CONSUNI_CIS-2025.pdf` },
      { title: "Resultado preliminar · Eleições CAD, CONSUNI e CIS 2025", date: "Nov/2025", url: `${UP}2025/11/RESULTADO-PRELIMINAR-ELEICOES-CAD-CONSUNI-E-CIS-2025.pdf` },
      { title: "Ato da Reitoria CIS nº 0206/2026", date: "Mar/2026", url: `${UP}2026/03/SEI_13851175_Ato_da_Reitoria_CIS_n__0206_2026.pdf` },
      { title: "Resolução Nº 5 · Comissão Eleitoral CIS (2019)", date: "2019", url: `${UP}2019/05/ResolucaoCincoCIS.pdf` },
    ],
    tag: "eleicoes-cis",
  },
];

/** Resoluções (Documentos > Resoluções), separadas por origem. */
export interface ResolutionArea {
  slug: string;
  label: string;
  summary: string;
  docs: DocLink[];
}

export const resolutionAreas: ResolutionArea[] = [
  {
    slug: "sintfub",
    label: "Resoluções do SINTFUB",
    summary: "Resoluções das comissões do sindicato.",
    docs: [
      { title: "Resolução Nº 3 · Comissão de Ética", date: "2019", url: `${UP}2019/05/ResolucaoTresEtica.pdf`, size: "732 KB" },
      { title: "Resolução Nº 4 · Comissão Eleitoral CAD/CONSUNI", date: "2019", url: `${UP}2019/05/RESOlucaoQuatroCADCONSUNI.pdf`, size: "1,3 MB" },
      { title: "Resolução Nº 5 · Comissão Eleitoral CIS", date: "2019", url: `${UP}2019/05/ResolucaoCincoCIS.pdf`, size: "1,3 MB" },
    ],
  },
  {
    slug: "unb",
    label: "Resoluções da UnB",
    summary: "Atos da Reitoria da Universidade de Brasília divulgados pelo SINTFUB.",
    docs: [
      { title: "Ato da Reitoria CAD nº 0064/2026", date: "Mar/2026", url: `${UP}2026/03/SEI_13668868_Ato_da_Reitoria_CAD_n__0064_2026.pdf` },
      { title: "Ato da Reitoria CONSUNI nº 0065/2026", date: "Mar/2026", url: `${UP}2026/03/SEI_13670945_Ato_da_Reitoria_CONSUNI_n__0065_2026.pdf` },
      { title: "Ato da Reitoria CIS nº 0206/2026", date: "Mar/2026", url: `${UP}2026/03/SEI_13851175_Ato_da_Reitoria_CIS_n__0206_2026.pdf` },
    ],
  },
  {
    slug: "mgi",
    label: "Resoluções do MGI",
    summary: "Normas do Ministério da Gestão e da Inovação em Serviços Públicos.",
    docs: [
      { title: "Portaria MGI nº 9.888, de 6 de novembro de 2025 · Auxílio-alimentação", date: "Nov/2025", url: `${UP}2025/11/PORTARIA_MGI-No-9.888-DE-6-DE-NOVEMBRO-DE-2025-AUXILIO-ALIMENTACAO-DOU.pdf` },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Transparência                                                       */
/* ------------------------------------------------------------------ */

/** Contratos, termos de convênio e de parceria assinados, em PDF. */
export const signedTerms: DocLink[] = [
  { title: "Termo de Contrato · Escola Vivendo e Aprendendo", date: "Set/2026", url: `${UP}2026/09/Termo_de_Contrato_Vivendo-Sintfub_assinado_assinado_assinado_assinado.pdf` },
  { title: "Termo de Convênio · Vivace Clínica Odontológica", date: "Mai/2026", url: `${UP}2026/05/Termo_de_Convenio_-_Vivace_Odontologia.pdf` },
  { title: "Termo de Parceria · Atendimento psicológico", date: "Mai/2026", url: `${UP}2026/05/Termo_de_Parceria_Psicologia.pdf` },
  { title: "Termo de Parceria · Lótus Fisioterapia", date: "Abr/2026", url: `${UP}2026/04/Parceria_Lotus_Fisioterapia_assinado_assinado_assinado.pdf` },
  { title: "Convênio Geral SESC nº CG 011/2022", date: "Mar/2026", url: `${UP}2026/03/Convenio-Geral-SESC-_-COORDENACAO-DE-RELACIONAMENTO-n.o-CG-011_2022-1.pdf` },
  { title: "Termo de Parceria Comercial · Restaurante Calamares", date: "Mar/2026", url: `${UP}2026/03/TERMO_DE_PARCERIA_COMERCIAL_SINTFUB_-_CALAMARES.pdf` },
  { title: "Proposta de Convênio · Educaminas EAD", date: "Mar/2026", url: `${UP}2026/03/PROPOSTA_DE_CONVENIO_-Educaminas_assinado.pdf` },
];

/** Prestação de contas organizada por exercício. */
export interface AccountsYear {
  year: string;
  docs: DocLink[];
  /** Slugs das publicações internas sobre o exercício. */
  newsSlugs: string[];
}

export const accountsByYear: AccountsYear[] = [
  {
    year: "2024",
    docs: [
      { title: "Edital de Convocação · Prestação de Contas 2024", date: "Mai/2026", url: `${UP}2026/05/Edital_Convocacao_Prestacao_Contas_2024_assinado_assinado_assinado.pdf` },
      { title: "Relatório Completo · Exercício 2024", date: "Mai/2026", url: `${UP}2026/05/Relatorio-Completo-2024.pdf` },
    ],
    newsSlugs: ["convocacao-assembleia-prestacao-contas-28-de-maio"],
  },
  {
    year: "2023",
    docs: [
      { title: "Edital de Convocação · Prestação de Contas 2023", date: "Mar/2026", url: `${UP}2026/03/Edital_Convocacao_Prestacao_Contas_2023.pdf`, size: "182 KB" },
      { title: "Relatórios do Conselho Fiscal · Prestação de Contas 2023", date: "Abr/2026", url: `${UP}2026/04/Relatorios-CF-2023.pdf`, size: "19,3 MB" },
    ],
    newsSlugs: [
      "assembleia-geral-reprovacao-contas-2023",
      "documentos-prestacao-de-contas-2023-assembleia-09-04",
      "sintfub-convoca-assembleia-prestacao-9-de-abril",
    ],
  },
  {
    year: "2022",
    docs: [],
    newsSlugs: ["assembleia-estatutaria-aprova-prestacao-contas-2022", "edital-assembleia-geral-ordinaria-prestacao-de-contas"],
  },
];

/* ------------------------------------------------------------------ */
/* Convênios e Parcerias                                               */
/* ------------------------------------------------------------------ */

export interface Partner {
  name: string;
  benefit: string;
  date: string;
  /** Slug da publicação interna que divulga a parceria. */
  postSlug: string;
}

export const partners: Partner[] = [
  { name: "Escola Vivendo e Aprendendo", benefit: "25% de desconto para filiados e suas famílias na escola associativa da Asa Norte.", date: "11 de setembro de 2026", postSlug: "parceria-escola-vivendo-aprendendo" },
  { name: "Wellhub", benefit: "Acesso a uma rede de academias e plataformas de bem-estar.", date: "25 de julho de 2026", postSlug: "sintfub-parceria-wellhub" },
  { name: "Atendimento psicológico", benefit: "25% de desconto em atendimento psicológico com a psicóloga Ana Cristina Almeida Santiago.", date: "12 de junho de 2026", postSlug: "parceria-atendimento-psicologico" },
  { name: "Vivace Clínica Odontológica Especializada", benefit: "15% de desconto em serviços e procedimentos odontológicos não estéticos, na Asa Norte.", date: "26 de maio de 2026", postSlug: "parceria-vivace-clinica-odontologica" },
  { name: "Lótus Fisioterapia Especializada", benefit: "Parceria que amplia os benefícios para filiadas e filiados.", date: "28 de abril de 2026", postSlug: "parceria-lotus-fisioterapia" },
  { name: "Sesc-DF", benefit: "Acesso a serviços de saúde, cultura, esporte, lazer e assistência social.", date: "25 de março de 2026", postSlug: "convenio-sesc-servicos-saude-lazer-cultura" },
  { name: "Calamares Restaurante, Drink's e Pizzaria", benefit: "15% de desconto na refeição para sindicalizados.", date: "20 de março de 2026", postSlug: "parceria-restaurante-calamares" },
  { name: "Instituto Educaminas EAD", benefit: "Benefícios exclusivos em cursos de pós-graduação com módulos a distância, para filiados(as) e dependentes.", date: "6 de março de 2026", postSlug: "convenio-educaminas-ead-pos-graduacao" },
];
