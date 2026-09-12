import { Link } from "react-router-dom";
import { useAdmin } from "../AdminContext";
import { StatusBadge, EmptyState, AdminPageHeader } from "./Shared";

interface CategoryWorkspaceProps {
  title: string;
  description: string;
  pubCategorySlugs: string[];
  docCategories: string[];
  infoNote?: string;
}

export default function CategoryWorkspace({ title, description, pubCategorySlugs, docCategories, infoNote }: CategoryWorkspaceProps) {
  const { publications, documents } = useAdmin();

  const relatedPublications = publications.filter((p) => pubCategorySlugs.includes(p.category));
  const relatedDocuments = documents.filter((d) => docCategories.includes(d.category));

  return (
    <div>
      <AdminPageHeader
        title={title}
        description={description}
        action={
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/publicacoes/nova" className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              + Nova publicação
            </Link>
            <Link to="/admin/documentos" className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              + Novo documento
            </Link>
          </div>
        }
      />

      {infoNote && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-500 mb-6">{infoNote}</div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-sm">Publicações ({relatedPublications.length})</h2>
        </div>
        {relatedPublications.length === 0 ? (
          <div className="p-5">
            <EmptyState title="Nenhuma publicação nesta área" description="Crie uma nova publicação e associe à categoria correspondente." />
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {relatedPublications.map((p) => (
              <Link key={p.id} to={`/admin/publicacoes/${p.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                  {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.date}</p>
                </div>
                <StatusBadge status={p.status} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-sm">Documentos ({relatedDocuments.length})</h2>
        </div>
        {relatedDocuments.length === 0 ? (
          <div className="p-5">
            <EmptyState title="Nenhum documento nesta área" description="Adicione um documento e associe à categoria correspondente." />
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {relatedDocuments.map((d) => (
              <div key={d.id} className="flex items-center gap-3 px-5 py-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{d.title}</p>
                  <p className="text-xs text-gray-400">
                    {d.category} · {d.date}
                  </p>
                </div>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
