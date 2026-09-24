import type { DocLink } from "../data/institutional";

const isExternal = (url: string) => url.startsWith("http");

/** Linha de documento (PDF) usada em Atas, CONSINTFUB, Eleições, Resoluções, Contratos etc. */
export default function DocRow({ doc }: { doc: DocLink }) {
  const external = isExternal(doc.url);
  return (
    <a
      href={doc.url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 p-4 bg-white border border-gray-100 hover:border-[#C41230] hover:shadow-sm rounded-xl transition-all"
    >
      <div className="w-10 h-10 bg-red-50 group-hover:bg-[#C41230] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
        <svg className="w-5 h-5 text-[#C41230] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 mb-0.5">
          {doc.date}
          {doc.size ? ` • ${doc.size}` : ""}
        </div>
        <p className="text-sm font-semibold text-gray-900 group-hover:text-[#C41230] transition-colors">{doc.title}</p>
        {doc.note && <p className="text-xs text-gray-500 mt-0.5">{doc.note}</p>}
      </div>
      <span className="hidden sm:inline text-xs font-semibold text-gray-500 group-hover:text-[#C41230] transition-colors">
        {external ? "Baixar PDF" : "Abrir"}
      </span>
      <svg className="w-4 h-4 text-gray-400 group-hover:text-[#C41230] transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    </a>
  );
}
