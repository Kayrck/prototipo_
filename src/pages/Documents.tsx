import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { documents } from "../data/content";
import { useLocation } from "react-router-dom";

const allDocuments = documents;
const PAGE_SIZE = 6;

const typeColors: Record<string, string> = {
  Estatuto: "bg-[#C41230] text-white",
  Ata: "bg-gray-900 text-white",
  Resolução: "bg-gray-700 text-white",
  Boletim: "bg-red-50 text-[#C41230]",
  Transparência: "bg-gray-100 text-gray-700",
};

export default function Documents() {
  const { pathname } = useLocation();
  const isEstatuto = pathname.startsWith("/estatuto");
  const pageTitle = isEstatuto ? "Estatuto" : "Documentos";
  const [activeType, setActiveType] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const filteredDocuments = activeType ? allDocuments.filter((d) => d.type === activeType) : allDocuments;
  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedDocuments = filteredDocuments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [activeType]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeType, page, pathname]);

  const isExternal = (url: string) => url.startsWith("http");

  if (isEstatuto) {
    return (
      <div className="min-h-screen bg-offwhite">
        <Breadcrumb items={[{ label: "Documentos", href: "/category/documentos/" }, { label: "Estatuto" }]} />
        <div className="bg-gray-50 border-b border-gray-100 py-10">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-8 bg-[#C41230] rounded-full" />
              <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">
                Estatuto do SINTFUB
              </h1>
            </div>
            <p className="text-gray-500 text-sm mt-2 ml-4">Documento normativo máximo do sindicato.</p>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
          <div className="max-w-xl">
            <div className="flex items-start gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-16 h-20 bg-[#C41230] rounded-xl flex flex-col items-center justify-center gap-1 flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-xs font-bold">PDF</span>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-gray-900 text-lg mb-1 font-[family-name:var(--font-display)]">
                  Estatuto do SINTFUB (vigente)
                </h2>
                <p className="text-sm text-gray-500 mb-1">Atualizado em 2021 • 6,1 MB</p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Documento que rege a organização, funcionamento e objetivos do SINTFUB, Sindicato dos Trabalhadores da Fundação Universidade de Brasília.
                </p>
                <a
                  href="https://sintfub.org.br/wp-content/uploads/2021/11/ESTATUTOVIGENTE2021SINTFUB.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
                  aria-label="Baixar estatuto do SINTFUB em PDF"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Baixar Estatuto (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb items={[{ label: pageTitle }]} />
      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">
              {pageTitle}
            </h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 ml-4">
            {activeType ? `${filteredDocuments.length} de ${allDocuments.length}` : allDocuments.length} documentos disponíveis para consulta e download
          </p>
        </div>
      </div>

      {!isEstatuto && (
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {Object.keys(typeColors).map((type) => {
              const count = allDocuments.filter((d) => d.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setActiveType(activeType === type ? null : type)}
                  aria-pressed={activeType === type}
                  className={`text-center p-4 rounded-2xl border transition-all ${
                    activeType === type ? "border-[#C41230] ring-2 ring-[#C41230]/20" : "border-gray-100 hover:border-gray-300"
                  } bg-gray-50`}
                >
                  <div className="text-2xl font-black text-gray-900 font-[family-name:var(--font-display)]">{count}</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">{type}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {/* Filtro ativo (mobile + confirmação visual) */}
            {activeType && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-gray-500">Filtrando por:</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeColors[activeType]}`}>{activeType}</span>
                <button
                  onClick={() => setActiveType(null)}
                  className="text-xs font-semibold text-gray-500 hover:text-[#C41230] underline"
                >
                  Limpar filtro
                </button>
              </div>
            )}
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 lg:p-5 bg-white border border-gray-100 rounded-xl">
                    <div className="skeleton w-12 h-12 rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="skeleton h-3 w-24 rounded" />
                      <div className="skeleton h-4 w-3/4 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-sm">Nenhum documento encontrado para este tipo.</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {pagedDocuments.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target={isExternal(doc.url) ? "_blank" : undefined}
                      rel={isExternal(doc.url) ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 p-4 lg:p-5 bg-white border border-gray-100 hover:border-[#C41230] hover:shadow-sm rounded-xl transition-all"
                    >
                      {doc.image ? (
                        <img
                          src={doc.image}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-red-50 group-hover:bg-[#C41230] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                          <svg className="w-6 h-6 text-[#C41230] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeColors[doc.type] || "bg-gray-100 text-gray-600"}`}>
                            {doc.type}
                          </span>
                          <span className="text-xs text-gray-400">{doc.date}</span>
                          {doc.size && <span className="text-xs text-gray-400">• {doc.size}</span>}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#C41230] transition-colors truncate">
                          {doc.title}
                        </h3>
                        {doc.description && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{doc.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="hidden sm:inline text-xs font-semibold text-gray-500 group-hover:text-[#C41230] transition-colors">
                          {isExternal(doc.url) ? "Baixar PDF" : "Ver documento"}
                        </span>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#C41230] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>

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
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Por tipo</h2>
                  {activeType && (
                    <button onClick={() => setActiveType(null)} className="text-xs font-semibold text-gray-500 hover:text-[#C41230]">
                      Todos
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {Object.entries(typeColors).map(([type, cls]) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(activeType === type ? null : type)}
                      aria-pressed={activeType === type}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all text-left ${cls} ${
                        activeType === type ? "ring-2 ring-offset-1 ring-[#C41230]" : "hover:opacity-80"
                      } ${activeType && activeType !== type ? "opacity-40" : ""}`}
                    >
                      <span className="text-sm font-medium">{type}</span>
                      <span className="text-xs font-bold">
                        {allDocuments.filter((d) => d.type === type).length}
                      </span>
                    </button>
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
