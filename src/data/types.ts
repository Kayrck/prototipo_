/** Tipo de publicação dentro de "Informativos" e "Informes da FASUBRA". */
export type NewsKind = "boletim" | "nota" | "mocao" | "carta-aberta" | "informe-fasubra";

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateFormatted: string;
  category: string;
  categorySlug: string;
  image?: string;
  tags: string[];
  /** Subcategoria da publicação (Boletins, Notas, Moções...). */
  kind?: NewsKind;
  /** PDF anexo da publicação, quando houver. */
  pdf?: string;
}

export const newsKindLabels: Record<NewsKind, string> = {
  "boletim": "Boletins",
  "nota": "Notas",
  "mocao": "Moções",
  "carta-aberta": "Cartas Abertas",
  "informe-fasubra": "Informes da FASUBRA",
};
