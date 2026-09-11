import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import NewsCard, { NewsCardSkeleton } from "../components/NewsCard";
import { newsItems, tagCloud } from "../data/content";

const categoryLabels: Record<string, string> = {
  "publicacoes": "Publicações",
  "noticias": "Notícias",
  "informativos": "Informativos",
  "aposentado": "Aposentados",
  "juridico-trabalhista": "Jurídico Trabalhista",
  "juridico-civel": "Jurídico Cível",
  "multimidia": "Multimídias",
  "fotos": "Fotos",
  "videos": "Vídeos",
  "cards": "Cards",
  "transparencia": "Transparência",
  "prestacao-de-contas": "Prestação de Contas",
  "documentos": "Documentos",
  "consintfub": "CONSINTFUB",
  "eleicoes": "Eleições",
  "comissao-de-etica": "Comissão de Ética",
};

const PAGE_SIZE = 6;
const MULTIMIDIA_SLUGS = ["fotos", "videos", "cards"];

const multimidiaVideos = [
  { label: "HUB · 54 anos", href: "https://www.youtube.com/watch?v=cCoZSAESKpA", image: "/img/video-hub-54-anos.jpg" },
  { label: "Fala da Nadia", href: "https://www.youtube.com/watch?v=RIVp_ClgKGQ", image: "/img/video-fala-nadia.jpg" },
  { label: "Memorial da Greve de 2024", href: "https://www.youtube.com/watch?v=C0cU4hLx398", image: "/img/video-memorial-greve.jpg" },
  { label: "Esclarecimentos sobre a URP/89", href: "https://www.youtube.com/watch?v=KKazZ1_w7dc", image: "/img/video-urp-esclarecimentos.jpg" },
];

export default function NewsListing() {
  const location = useLocation();
  const [loading] = useState(false);
  const [page, setPage] = useState(1);

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

  const catLabel = isTagPage
    ? `Tag: ${tagSlug.replace(/-/g, " ")}`
    : (categoryLabels[leafCategory] || "Publicações");

  const filtered = newsItems.filter((item) => {
    if (isTagPage) return item.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tagSlug);
    // "Publicações" é a categoria-mãe (agrega Notícias, Informativos, Multimídias etc.),
    // então a página raiz /category/publicacoes/ deve mostrar todas as publicações.
    if (leafCategory === "publicacoes" && !parentCategory) return true;
    // "Multimídias" agrega Fotos, Vídeos e Cards na página raiz da categoria.
    if (isMultimidiaRoot) return MULTIMIDIA_SLUGS.includes(item.categorySlug);
    if (leafCategory) return item.categorySlug === leafCategory;
    return true;
  });

  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const breadcrumbItems: { label: string; href?: string }[] = isTagPage
    ? [{ label: catLabel }]
    : parentCategory
    ? [
        { label: categoryLabels[parentCategory] || "Publicações", href: `/category/${parentCategory}/` },
        { label: catLabel },
      ]
    : [{ label: catLabel }];

  return (
    <div className="min-h-screen bg-white">
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
            {filtered.length} {filtered.length === 1 ? "publicação" : "publicações"}
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {isMultimidiaRoot && (
              <div className="mb-10">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Vídeos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {multimidiaVideos.map((video) => (
                    <a
                      key={video.label}
                      href={video.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-2xl overflow-hidden h-40 bg-gray-800"
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
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-[#C41230]/80 transition-colors">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span className="text-white font-bold text-sm text-center px-4 font-[family-name:var(--font-display)]">{video.label}</span>
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
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Sem publicações</h2>
                <p className="text-gray-500 text-sm">Este conteúdo ainda não possui publicações.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paged.map((item) => (
                    <NewsCard key={item.id} {...item} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
                    ))}
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

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0" aria-label="Publicações recentes">
            <div className="sticky top-24">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-6">
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">
                  Notícias recentes
                </h2>
                <div className="divide-y divide-gray-100">
                  {newsItems.slice(0, 6).map((item) => (
                    <NewsCard key={item.id} {...item} variant="horizontal" />
                  ))}
                </div>
              </div>
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
