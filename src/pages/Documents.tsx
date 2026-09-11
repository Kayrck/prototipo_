import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { documents } from "../data/content";
import { useLocation } from "react-router-dom";

const allDocuments = [
  ...documents,
  { id: 7, title: "Ata de Assembleia · Julho 2026", type: "Ata", date: "Jul/2026", url: "/category/documentos/atas/", size: "310 KB" },
  { id: 8, title: "Resolução n.º 11/2026", type: "Resolução", date: "Jun/2026", url: "/resolucoes-boletins/", size: "145 KB" },
  { id: 9, title: "Boletim Informativo n.º 33", type: "Boletim", date: "Mai/2026", url: "/resolucoes-boletins/", size: "490 KB" },
  { id: 10, title: "Atas de Assembleias 2018 (compilação)", type: "Ata", date: "2018", url: "/atas-de-assembleias-2018/", size: "2,8 MB" },
  { id: 11, title: "XXII CONSINTFUB (Documentos)", type: "CONSINTFUB", date: "2024", url: "/category/consintfub/", size: "5,1 MB" },
  { id: 12, title: "Eleições 2025 (Edital)", type: "Eleições", date: "2025", url: "/category/eleicoes/", size: "410 KB" },
];

const typeColors: Record<string, string> = {
  Estatuto: "bg-purple-100 text-purple-700",
  Ata: "bg-blue-100 text-blue-700",
  Resolução: "bg-orange-100 text-orange-700",
  Boletim: "bg-green-100 text-green-700",
  Transparência: "bg-teal-100 text-teal-700",
  CONSINTFUB: "bg-red-100 text-red-700",
  Eleições: "bg-yellow-100 text-yellow-700",
};

export default function Documents() {
  const { pathname } = useLocation();
  const isEstatuto = pathname.startsWith("/estatuto");
  const pageTitle = isEstatuto ? "Estatuto" : "Documentos";
  const [downloadingId, setDownloadingId] = useState<number | string | null>(null);
  const [downloadedId, setDownloadedId] = useState<number | string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const filteredDocuments = activeType ? allDocuments.filter((d) => d.type === activeType) : allDocuments;

  const simulateDownload = (id: number | string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedId(id);
      setTimeout(() => setDownloadedId((cur) => (cur === id ? null : cur)), 2000);
    }, 700);
  };

  if (isEstatuto) {
    return (
      <div className="min-h-screen bg-white">
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
                <p className="text-sm text-gray-500 mb-1">Atualizado em 2021 • 2,4 MB</p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Documento que rege a organização, funcionamento e objetivos do SINTFUB, Sindicato dos Trabalhadores da Fundação Universidade de Brasília.
                </p>
                <a
                  href="#estatuto-pdf"
                  onClick={simulateDownload("estatuto")}
                  className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] disabled:opacity-70 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
                  aria-label="Baixar estatuto do SINTFUB em PDF"
                >
                  {downloadingId === "estatuto" ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : downloadedId === "estatuto" ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  )}
                  {downloadingId === "estatuto" ? "Baixando..." : downloadedId === "estatuto" ? "Baixado" : "Baixar Estatuto (PDF)"}
                </a>
                <p className="text-xs text-gray-400 mt-2">Protótipo de demonstração: o download é simulado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
            {activeType ? `${filteredDocuments.length} de ${allDocuments.length}` : allDocuments.length} documentos disponíveis para download
          </p>
        </div>
      </div>

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
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-sm">Nenhum documento encontrado para este tipo.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    onClick={simulateDownload(doc.id)}
                    className="group flex items-center gap-4 p-4 lg:p-5 bg-white border border-gray-100 hover:border-[#C41230] hover:shadow-sm rounded-xl transition-all"
                  >
                    <div className="w-12 h-12 bg-red-50 group-hover:bg-[#C41230] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                      <svg className="w-6 h-6 text-[#C41230] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
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
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="hidden sm:inline text-xs font-semibold text-gray-500 group-hover:text-[#C41230] transition-colors">
                        {downloadingId === doc.id ? "Baixando..." : downloadedId === doc.id ? "Baixado" : "Baixar PDF"}
                      </span>
                      {downloadingId === doc.id ? (
                        <svg className="w-5 h-5 text-[#C41230] animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : downloadedId === doc.id ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#C41230] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      )}
                    </div>
                  </a>
                ))}
              </div>
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
