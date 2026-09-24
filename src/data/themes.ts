import type { DocLink } from "./institutional";

// Temas permanentes: páginas de consulta que concentram notícias, documentos e materiais
// sobre um assunto (proposta do documento de revisão do cliente, a validar com a direção).
// Os PDFs são do site oficial (sintfub.org.br); as notícias vêm das publicações com as tags.

const UP = "https://sintfub.org.br/wp-content/uploads/";

export interface Theme {
  slug: string;
  label: string;
  summary: string;
  /** Tags das publicações que pertencem ao tema. */
  tags: string[];
  docs: DocLink[];
}

export const themes: Theme[] = [
  {
    slug: "carreira",
    label: "Carreira",
    summary:
      "Notícias, documentos e materiais sobre a carreira dos técnico-administrativos em educação: RSC, PGD, PCCTAE (Lei nº 11.091/2005), auxílios, tabelas salariais e reajustes.",
    tags: ["rsc", "pcctae"],
    docs: [
      { title: "Decreto nº 13.048/2026 · Reconhecimento de Saberes e Competências (DOU, edição extra de 3/7/2026)", date: "Jul/2026", url: `${UP}2026/07/2026_07_03_ASSINADO_do1_extra_B.pdf` },
      { title: "PL 6170/2025 · PCCTAE", date: "Dez/2025", url: `${UP}2025/12/PL-6170-2025_PCCTAE.pdf` },
      { title: "Relatório nº 01/2025 · GT RSC/TAE", date: "Out/2025", url: `${UP}2025/10/Relatorio_01_2025_GT_RSC___TAE_Final.pdf` },
      { title: "Orientação jurídica · Aceleração da progressão para aposentados", date: "Jun/2026", url: `${UP}2026/06/Orientacao-Aceleracao-Aposentados.pdf` },
      { title: "Nota da AJN · Aceleração da progressão", date: "Mai/2025", url: `${UP}2025/05/Aceleracao-da-Progressao.-Nota-AJN_Final.pdf` },
      { title: "Informe do SINTFUB · Indenização por licença-prêmio e férias não gozadas", date: "Fev/2026", url: `${UP}2026/02/Informe-SINTFUB_Licenca-premio-1.pdf` },
    ],
  },
  {
    slug: "urp",
    label: "URP",
    summary: "Notícias, documentos e materiais sobre a URP/89: mediação no TCU, assembleias, termo de acordo e homologação no STF.",
    tags: ["urp"],
    docs: [
      { title: "Termo de Autocomposição · URP (MGI, AGU, FUB, SINTFUB, com interveniência do TCU)", date: "Jun/2026", url: `${UP}2026/06/Final_AcordoMesaURP.pdf` },
      { title: "Homologação de acordo · Mandado de Segurança 28.819 (STF)", date: "Jul/2026", url: `${UP}2026/07/Homologacao-de-acordo-MS-28819.pdf` },
      { title: "Apresentação da Assembleia de 17/03/2026 · URP e mediação no TCU", date: "Mar/2026", url: `${UP}2026/03/APRESENTACAO_Assembleia-CSC-URP-Tec-UnB.pdf` },
      { title: "Edital de Convocação · Assembleia de 17/03/2026", date: "Mar/2026", url: `${UP}2026/03/EDITAL_DE_CONVOCACAO_ASSEMBLEIA_17-3-26.pdf` },
      { title: "Ata de Assembleia Geral Extraordinária · URP · 17/03/2026", date: "Mar/2026", url: `${UP}2026/03/Ata_Assembleia_Geral_Extraordinaria_-_17_03_2026_URP_.pdf`, size: "287 KB" },
      { title: "Recurso acatado · Agravo regimental no Mandado de Segurança 28.819 (STF)", date: "Jun/2023", url: `${UP}2023/06/Recurso-Acatado-URP.pdf` },
    ],
  },
  {
    slug: "campanha-salarial",
    label: "Campanha Salarial",
    summary: "Notícias, documentos e materiais da campanha salarial, da greve e das negociações da categoria com o governo.",
    tags: ["campanhasalarial2024", "greve"],
    docs: [
      { title: "Boletim de Greve 1/2025", date: "Mar/2025", url: `${UP}2025/03/Boletim-de-GREVE-1-2025.pdf` },
      { title: "Carta à comunidade universitária · 25/03/2025", date: "Mar/2025", url: `${UP}2025/03/Carta-Comunidade-Marco-2025-versao-3.pdf` },
      { title: "Proposta da Reitoria para compensação da greve", date: "Out/2025", url: `${UP}2025/10/Proposta-Reitoria-para-compensacao-da-greve.pdf` },
      { title: "Termo de acordo para compensação de atividades represadas por participação em greve", date: "Out/2025", url: `${UP}2025/10/TERMO-DE-ACORDO-PARA-COMPENSACAO-DE-ATIVIDADES-REPRESADAS-POR-PARTICIPACAO-EM-GREVE.pdf` },
      { title: "Ofício SEI · Comunicado de encerramento da greve (UnB)", date: "Out/2025", url: `${UP}2025/10/SEI_23106.093660_2025_18-MRT-Comunicado-Encerramento-da-Greve.pdf` },
    ],
  },
  {
    slug: "reforma-administrativa",
    label: "Reforma Administrativa",
    summary: "Notícias, documentos e materiais sobre a Reforma Administrativa e a mobilização do funcionalismo público contra a proposta.",
    tags: ["reforma-administrativa"],
    docs: [
      { title: "PEC da Reforma Administrativa · versão para 1/10/2025", date: "Out/2025", url: `${UP}2025/10/PEC-Reforma-Administrativa-FINAL-para-1-10-2025-14h30.pdf` },
      { title: "Relatório final · GT da Reforma Administrativa", date: "Out/2025", url: `${UP}2025/10/Relatorio-Final-GT-da-Reforma-Administrativa.pdf` },
      { title: "Propostas legislativas · GT da Reforma Administrativa", date: "Out/2025", url: `${UP}2025/10/Propostas-Legislativas-GT-Reforma-Administrativa.pdf` },
      { title: "Carta de João Pessoa · aprovada pelo Plenário em 3/10/2025", date: "Out/2025", url: `${UP}2025/10/Carta-de-Joao-Pessoa-aprovada-pelo-Plenario-em-03out2025.pdf` },
      { title: "A Reforma Administrativa no contexto do serviço público brasileiro · Márcia Abrahão (8/7/2025)", date: "Jul/2025", url: `${UP}2025/07/A-Reforma-Administrativa-no-Contexto-do-Servico-Publico-Brasileiro-Marcia-Abrahao-Moura-Camara-8-07-2025.pdf` },
      { title: "Reforma Administrativa · apresentação do MGI (julho/2025)", date: "Jul/2025", url: `${UP}2025/07/Reforma-administrativa-MGI-julho-2025.pdf` },
    ],
  },
];
