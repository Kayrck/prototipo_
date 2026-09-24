import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import NewsCard, { NewsCardSkeleton } from "../components/NewsCard";
import { newsItems, tagCloud } from "../data/content";
import type { NewsKind } from "../data/types";

const categoryLabels: Record<string, string> = {
  "publicacoes": "Publicações",
  "noticias": "Notícias",
  "informativos": "Informativos",
  "boletins": "Boletins",
  "notas": "Notas",
  "mocoes": "Moções",
  "cartas-abertas": "Cartas Abertas",
  "informes-fasubra": "Informes da FASUBRA",
  "aposentado": "Aposentados",
  "aposentados": "Aposentados",
  "juridico-trabalhista": "Jurídico Trabalhista",
  "juridico-civel": "Jurídico Cível",
  "multimidia": "Multimídia",
  "fotos": "Fotos",
  "videos": "Vídeos",
  "cards": "Cards",
  "transparencia": "Transparência",
  "prestacao-de-contas": "Prestação de Contas",
  "documentos": "Documentos",
  "consintfub": "CONSINTFUB",
  "eleicoes": "Eleições",
};

const pageDescriptions: Record<string, string> = {
  "informativos": "Boletins, notas, moções e cartas abertas do SINTFUB.",
  "boletins": "Boletins Informativos do SINTFUB, com a íntegra de cada edição em PDF.",
  "notas": "Notas públicas e de pesar divulgadas pelo SINTFUB.",
  "mocoes": "Moções aprovadas em Assembleia Geral.",
  "cartas-abertas": "Cartas abertas do SINTFUB à comunidade e às autoridades.",
  "informes-fasubra": "Informes de Direção da FASUBRA repassados pelo SINTFUB à categoria.",
  "multimidia": "Cards, fotos e vídeos do SINTFUB.",
};

/** Subcategorias de "Informativos", pela URL, e o tipo de publicação correspondente. */
const informativoKinds: Record<string, NewsKind> = {
  "boletins": "boletim",
  "notas": "nota",
  "mocoes": "mocao",
  "cartas-abertas": "carta-aberta",
};
const INFORMATIVO_KINDS = Object.values(informativoKinds);

const PUBLICACOES_FAMILY = ["noticias", "informativos", "boletins", "notas", "mocoes", "cartas-abertas", "informes-fasubra", "multimidia", "fotos", "videos", "cards"];

const PAGE_SIZE = 6;
const MULTIMIDIA_SLUGS = ["fotos", "videos", "cards"];

const multimidiaVideos = [
  { label: "HUB · 54 anos", href: "https://www.youtube.com/watch?v=cCoZSAESKpA", image: "/img/video-hub-54-anos.jpg" },
  { label: "Fala da Nadia", href: "https://www.youtube.com/watch?v=RIVp_ClgKGQ", image: "/img/video-fala-nadia.jpg" },
  { label: "Memorial da Greve de 2024", href: "https://www.youtube.com/watch?v=C0cU4hLx398", image: "/img/video-memorial-greve.jpg" },
  { label: "Esclarecimentos sobre a URP/89", href: "https://www.youtube.com/watch?v=KKazZ1_w7dc", image: "/img/video-urp-esclarecimentos.jpg" },
  { label: "SINTFUB recepciona novos servidores e reforça a importância da organização sindical", href: "https://www.youtube.com/watch?v=HvaaUNae5vs", image: "/img/video-novos-servidores.jpg" },
  { label: "Técnico-administrativos da UnB cobram cumprimento de acordo e negociação da URP em audiência pública", href: "https://www.youtube.com/watch?v=GeDpQaLPh8k", image: "/img/video-cobram-acordo.jpg" },
  { label: "Informe e deliberações da Assembleia de 20 de agosto de 2025", href: "https://www.youtube.com/watch?v=R9IACZhk2SA", image: "/img/video-assembleia-20-agosto.jpg" },
  { label: "SINTFUB se reúne com assessoria do ministro Gilmar Mendes", href: "https://www.youtube.com/watch?v=QbNfaiGdw1E", image: "/img/video-gilmar-mendes.jpg" },
];

interface NavItem {
  label: string;
  href: string;
  count?: number;
  external?: boolean;
}

/** Navegação lateral: apenas categorias relacionadas ao conteúdo da página, sem repetir o menu superior. */
function buildNavigation(leaf: string, parent: string): { title: string; items: NavItem[] } | null {
  const countKind = (kind: NewsKind) => newsItems.filter((n) => n.kind === kind).length;

  if (leaf === "informativos" || parent === "informativos") {
    return {
      title: "Navegação",
      items: [
        { label: "Todos os informativos", href: "/category/informativos/", count: newsItems.filter((n) => n.categorySlug === "informativos" || (n.kind && INFORMATIVO_KINDS.includes(n.kind))).length },
        { label: "Boletins", href: "/category/informativos/boletins/", count: countKind("boletim") },
        { label: "Notas", href: "/category/informativos/notas/", count: countKind("nota") },
        { label: "Moções", href: "/category/informativos/mocoes/", count: countKind("mocao") },
        { label: "Cartas Abertas", href: "/category/informativos/cartas-abertas/", count: countKind("carta-aberta") },
      ],
    };
  }
  if (leaf === "informes-fasubra") {
    return {
      title: "Navegação",
      items: [
        { label: "Agenda da FASUBRA", href: "/agenda/#fasubra" },
        { label: "Informativos do SINTFUB", href: "/category/informativos/" },
        { label: "Site da FASUBRA", href: "https://fasubra.org.br/", external: true },
      ],
    };
  }
  if (leaf === "multimidia" || parent === "multimidia") {
    return {
      title: "Navegação",
      items: [
        { label: "Toda a multimídia", href: "/category/multimidia/" },
        { label: "Cards", href: "/category/multimidia/cards/", count: newsItems.filter((n) => n.categorySlug === "cards").length },
        { label: "Fotos", href: "/category/multimidia/fotos/", count: newsItems.filter((n) => n.categorySlug === "fotos").length },
        { label: "Vídeos", href: "/category/multimidia/videos/", count: multimidiaVideos.length },
      ],
    };
  }
  if (leaf === "publicacoes" || leaf === "noticias") {
    return {
      title: "Navegação",
      items: [
        { label: "Aposentados", href: "/category/aposentado/", count: newsItems.filter((n) => n.categorySlug === "aposentados").length },
        { label: "Jurídico Trabalhista", href: "/category/juridico-trabalhista/", count: newsItems.filter((n) => n.categorySlug === "juridico-trabalhista").length },
        { label: "Jurídico Cível", href: "/category/juridico-civel/", count: newsItems.filter((n) => n.categorySlug === "juridico-civel").length },
        { label: "Subsede HUB", href: "/hub/" },
      ],
    };
  }
  return null;
}

/** Janela de páginas com reticências, para a paginação caber em telas estreitas. */
function pageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = new Set([1, total, current - 1, current, current + 1].filter((n) => n >= 1 && n <= total));
  const sorted = Array.from(keep).sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) result.push("…");
    result.push(n);
  });
  return result;
}

export default function NewsListing() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Os parâmetros de rota variam por categoria (algumas rotas usam :sub, outras
  // :category/:subcategory, outras são literais sem parâmetro nenhum). Em vez de
  // depender do nome do parâmetro, extrai a categoria diretamente da URL: o
  // último segmento é sempre a categoria "folha" que corresponde a categorySlug.
  const segments = location.pathname.split("/").filter(Boolean);
  const isTagPage = segments[0] === "tag";
  const tagSlug = isTagPage ? segments[1] || "" : "";
  const leafCategory = !isTagPage && segments[0] === "category" ? segments[segments.length - 1] : "";
  const parentCategory = !isTagPage && segments.length === 3 ? segments[1] : "";
  const isMultimidiaRoot = leafCategory === "multimidia" && !parentCategory;
  const showVideoTiles = isMultimidiaRoot || (leafCategory === "videos" && parentCategory === "multimidia");

  const catLabel = isTagPage
    ? `Tag: ${tagSlug.replace(/-/g, " ")}`
    : (categoryLabels[leafCategory] || "Publicações");

  const filtered = newsItems
    .filter((item) => {
      if (isTagPage) return item.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tagSlug);
      // "Publicações" é a categoria-mãe (agrega Notícias, Informativos, Multimídia etc.),
      // então a página raiz /category/publicacoes/ deve mostrar todas as publicações.
      if (leafCategory === "publicacoes" && !parentCategory) return true;
      // "Multimídia" agrega Fotos, Vídeos e Cards na página raiz da categoria.
      if (isMultimidiaRoot) return MULTIMIDIA_SLUGS.includes(item.categorySlug);
      // Subcategorias de Informativos (Boletins, Notas, Moções, Cartas Abertas).
      if (parentCategory === "informativos") return item.kind === informativoKinds[leafCategory];
      if (leafCategory === "informativos") return item.categorySlug === "informativos" || (item.kind !== undefined && INFORMATIVO_KINDS.includes(item.kind));
      if (leafCategory === "informes-fasubra") return item.kind === "informe-fasubra";
      if (leafCategory) return item.categorySlug === leafCategory;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const inPublicacoes = PUBLICACOES_FAMILY.includes(leafCategory) || PUBLICACOES_FAMILY.includes(parentCategory);
  const breadcrumbItems: { label: string; href?: string }[] = isTagPage
    ? [{ label: catLabel }]
    : parentCategory
    ? [
        ...(inPublicacoes && parentCategory !== "publicacoes" ? [{ label: "Publicações", href: "/category/publicacoes/" }] : []),
        { label: categoryLabels[parentCategory] || "Publicações", href: `/category/${parentCategory}/` },
        { label: catLabel },
      ]
    : inPublicacoes && leafCategory !== "publicacoes"
    ? [{ label: "Publicações", href: "/category/publicacoes/" }, { label: catLabel }]
    : [{ label: catLabel }];

  const navigation = isTagPage ? null : buildNavigation(leafCategory, parentCategory);
  const description = pageDescriptions[leafCategory];

  const isActive = (item: NavItem) => item.href === location.pathname;

  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb items={breadcrumbItems} />

      {/* Page header */}
      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">
              {catLabel}
            </h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 ml-4">
            {description && <span>{description} </span>}
            {showVideoTiles
              ? `${filtered.length + multimidiaVideos.length} ${filtered.length + multimidiaVideos.length === 1 ? "publicação" : "publicações"}`
              : `${filtered.length} ${filtered.length === 1 ? "publicação" : "publicações"}`}
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Navegação compacta para telas sem a barra lateral */}
            {navigation && (
              <nav className="lg:hidden -mx-6 px-6 mb-6 overflow-x-auto" aria-label={navigation.title}>
                <ul className="flex gap-2 w-max pb-1">
                  {navigation.items.map((item) => (
                    <li key={item.href}>
                      {item.external ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="block whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border bg-white border-gray-200 text-gray-600">
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          aria-current={isActive(item) ? "page" : undefined}
                          className={`block whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                            isActive(item)
                              ? "bg-[#C41230] border-[#C41230] text-white"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#C41230] hover:text-[#C41230]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {showVideoTiles && (
              <div className="mb-10">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Vídeos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {multimidiaVideos.map((video) => (
                    <a
                      key={video.label}
                      href={video.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-2xl overflow-hidden h-48 bg-gray-800"
                      aria-label={`Assistir "${video.label}" no YouTube`}
                    >
                      <img
                        src={video.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="relative h-full flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 bg-black/35 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-[#C41230]/80 transition-colors">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span className="text-white font-bold text-sm text-center px-4 line-clamp-3 font-[family-name:var(--font-display)]">{video.label}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <NewsCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              showVideoTiles ? null : (
                <div className="text-center py-24">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Sem publicações</h2>
                  <p className="text-gray-500 text-sm">Este conteúdo ainda não possui publicações.</p>
                </div>
              )
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paged.map((item) => (
                    <NewsCard key={item.id} {...item} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#C41230] hover:text-[#C41230] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Página anterior"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Anterior
                    </button>
                    {pageWindow(currentPage, totalPages).map((p, i) =>
                      p === "…" ? (
                        <span key={`gap-${i}`} aria-hidden="true" className="w-6 text-center text-gray-400">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          aria-label={`Página ${p}`}
                          aria-current={currentPage === p ? "page" : undefined}
                          className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                            currentPage === p
                              ? "bg-[#C41230] text-white"
                              : "border border-gray-200 text-gray-600 hover:border-[#C41230] hover:text-[#C41230]"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#C41230] hover:text-[#C41230] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Próxima página"
                    >
                      Próxima
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar: navegação contextual + tags */}
          <aside className="hidden lg:block w-72 flex-shrink-0" aria-label="Navegação da seção">
            <div className="sticky top-40 space-y-6">
              {navigation && (
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">{navigation.title}</h2>
                  <ul className="space-y-1.5">
                    {navigation.items.map((item) => (
                      <li key={item.href}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg text-gray-600 hover:text-[#C41230] hover:bg-red-50 transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            to={item.href}
                            aria-current={isActive(item) ? "page" : undefined}
                            className={`flex items-center justify-between text-sm py-1.5 px-3 rounded-lg transition-colors ${
                              isActive(item) ? "bg-red-50 text-[#C41230] font-semibold" : "text-gray-600 hover:text-[#C41230] hover:bg-red-50"
                            }`}
                          >
                            {item.label}
                            {item.count !== undefined && <span className="text-xs text-gray-400">{item.count}</span>}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tagCloud.slice(0, 14).map((tag) => (
                    <Link
                      key={tag.label}
                      to={`/tag/${tag.label.replace(/\s+/g, "-")}/`}
                      className="text-xs text-gray-600 bg-white border border-gray-200 hover:border-[#C41230] hover:text-[#C41230] px-2.5 py-1 rounded-full transition-colors"
                    >
                      {tag.label}
                      <span className="ml-1 text-gray-400">{tag.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
