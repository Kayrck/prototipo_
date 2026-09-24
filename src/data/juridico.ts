import type { DocLink } from "./institutional";

// Páginas do Jurídico Trabalhista sugeridas no documento de revisão do cliente ("Navegação" com
// URP, Pareceres e Ações do SINTFUB), a validar com a coordenação. Os PDFs são do site oficial.

const UP = "https://sintfub.org.br/wp-content/uploads/";

export interface JuridicoGroup {
  label: string;
  docs: DocLink[];
}

export interface JuridicoSection {
  slug: string;
  label: string;
  summary: string;
  groups: JuridicoGroup[];
}

export const juridicoSections: JuridicoSection[] = [
  {
    slug: "pareceres",
    label: "Pareceres",
    summary: "Pareceres, notas e informes jurídicos divulgados pelo SINTFUB e por sua assessoria jurídica.",
    groups: [
      {
        label: "Pareceres e notas jurídicas",
        docs: [
          { title: "Orientação jurídica · Aceleração da progressão para aposentados", date: "Jun/2026", url: `${UP}2026/06/Orientacao-Aceleracao-Aposentados.pdf` },
          { title: "Informe jurídico · TCU elabora parecer admitindo a Mesa de Negociação da URP/89", date: "Nov/2025", url: `${UP}2025/11/informejuridico_PARECER_DE_ADMISSIBILIDADE_TCU.pdf` },
          { title: "Nota da Wagner Advogados Associados · 8/5/2025", date: "Mai/2025", url: `${UP}2025/05/NOTA-WAGNER-ADV-ASSOCIADOS-8.5.2025.pdf` },
          { title: "Nota da AJN · Aceleração da progressão", date: "Mai/2025", url: `${UP}2025/05/Aceleracao-da-Progressao.-Nota-AJN_Final.pdf` },
          { title: "Ofício SINTFUB nº 009 · Parecer sobre a situação do reajuste de médicos e médicos veterinários", date: "Fev/2025", url: `${UP}2025/02/Oficio-009-SINTFUB-PARECER-SITUACAO-REAJUSTE-MEDICO-E-MEDICOS-VETERINARIOS.pdf` },
          { title: "Parecer de Força Executória nº 00019/2024 · AGU/PGF (MS 28.819)", date: "Nov/2024", url: `${UP}2024/11/PARECER-DE-FORCA-EXECUTORIA-n.-00019.2024.PRIO_.DEPCONT.PGF_.AGU_.pdf` },
        ],
      },
    ],
  },
  {
    slug: "acoes",
    label: "Ações do SINTFUB",
    summary: "Documentos das ações judiciais do SINTFUB e de decisões que interessam à categoria, com destaque para a URP/89.",
    groups: [
      {
        label: "URP/89 · Mandado de Segurança 28.819 (STF)",
        docs: [
          { title: "Homologação de acordo · Mandado de Segurança 28.819", date: "Jul/2026", url: `${UP}2026/07/Homologacao-de-acordo-MS-28819.pdf` },
          { title: "Despacho do Presidente do TCU · Solicitação de Solução Consensual nº 020.691/2025-4", date: "Jan/2026", url: `${UP}2026/01/despachopresidenteTCU.pdf` },
          { title: "Despacho do ministro Gilmar Mendes · suspensão do trâmite por mais 120 dias", date: "Dez/2025", url: `${UP}2025/12/decisaoGM16-12-25.pdf` },
          { title: "Decisão do ministro Gilmar Mendes · suspensão por 60 dias para as tratativas na Secex-Consenso/TCU", date: "Out/2025", url: `${UP}2025/10/decisaoGilmar_susoensao.pdf` },
          { title: "Petição do SINTFUB · Aceite da Mesa de Negociação", date: "Out/2025", url: `${UP}2025/10/MS-28.819_Aceite-Mesa-de-Negociacao.pdf` },
          { title: "Petição do SINTFUB · Núcleo de Solução Consensual de Conflitos", date: "Jun/2025", url: `${UP}2025/06/MS-28.819_Nucleo-de-solucao-consensual-de-conflito.pdf` },
          { title: "Decisão do ministro Gilmar Mendes · embargos de declaração (8/5/2025)", date: "Mai/2025", url: `${UP}2025/05/8-5.2025.decisao-gilmar-mendes.pdf` },
          { title: "Decisão do ministro Gilmar Mendes · embargos de declaração opostos pela FUB", date: "Mar/2025", url: `${UP}2025/03/determinacao-GilmarMendes.pdf` },
          { title: "Boletim Informativo Especial · URP (21/2/2025)", date: "Fev/2025", url: `${UP}2025/02/Boletim-Informativo-Especial-URP-21-1.pdf` },
          { title: "Boletim Informativo Especial · URP (11/11/2024)", date: "Nov/2024", url: `${UP}2024/11/Boletim-Informativo-Especial-URP-11-11-24.pdf` },
          { title: "Certidão de trânsito em julgado · MS 28.819 (7/11/2024)", date: "Nov/2024", url: `${UP}2025/03/certidao-transito-em-julgado_MS28819.pdf` },
          { title: "Informe · Decisão da 2ª Turma do STF mantém os 26,05%", date: "Jun/2024", url: `${UP}2024/06/Informe-Decisao-URP-Decisao-da-2a-Turma.pdf` },
          { title: "Informe · Decisão nos embargos de declaração sobre a URP/89 (3/5/2024)", date: "Mai/2024", url: `${UP}2024/05/Informe-Decisao-ED-URP.pdf` },
          { title: "Recurso acatado · Agravo regimental no Mandado de Segurança 28.819", date: "Jun/2023", url: `${UP}2023/06/Recurso-Acatado-URP.pdf` },
        ],
      },
      {
        label: "Outras ações e decisões",
        docs: [
          { title: "Informe do SINTFUB · Indenização por licença-prêmio e férias não gozadas (ação coletiva)", date: "Fev/2026", url: `${UP}2026/02/Informe-SINTFUB_Licenca-premio-1.pdf` },
          { title: "Informe da assessoria jurídica · Tema 1157 do STF (reenquadramento de servidores contratados sem concurso)", date: "Abr/2022", url: `${UP}2022/04/CORRESP_SINTFUB_Tema1157_STF_IngressoSemConcurso_Reenquadramento.pdf` },
          { title: "Acórdão do TCU · A cessão de trabalhadores à Ebserh não é obrigatória", date: "Abr/2021", url: `${UP}2021/04/AcordaoTCUFASUBRA.pdf` },
        ],
      },
    ],
  },
];
