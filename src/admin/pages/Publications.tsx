import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin, AdminPublication } from "../AdminContext";
import { StatusBadge, EmptyState, TableSkeleton, useDelayedLoading, ConfirmDialog, Toast, AdminPageHeader } from "../components/Shared";

export default function Publications() {
  const { publications, categories, deletePublication, duplicatePublication, updatePublication } = useAdmin();
  const navigate = useNavigate();
  const loading = useDelayedLoading([publications.length]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [author, setAuthor] = useState("");
  const [period, setPeriod] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<AdminPublication | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const authors = useMemo(() => Array.from(new Set(publications.map((p) => p.author))), [publications]);

  const filtered = useMemo(() => {
    const now = new Date();
    return publications.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && p.category !== category) return false;
      if (status && p.status !== status) return false;
      if (author && p.author !== author) return false;
      if (period) {
        const d = new Date(p.date);
        const days = (now.getTime() - d.getTime()) / 86400000;
        if (period === "7" && days > 7) return false;
        if (period === "30" && days > 30) return false;
        if (period === "365" && days > 365) return false;
      }
      return true;
    });
  }, [publications, search, category, status, author, period]);

  const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name || slug;

  const handleDelete = () => {
    if (!confirmDelete) return;
    deletePublication(confirmDelete.id);
    setToast("Publicação excluída.");
    setConfirmDelete(null);
  };

  const togglePublish = (p: AdminPublication) => {
    const next = p.status === "publicado" ? "rascunho" : "publicado";
    updatePublication(p.id, { status: next });
    setToast(next === "publicado" ? "Publicação publicada." : "Publicação despublicada.");
  };

  return (
    <div>
      <AdminPageHeader
        title="Publicações"
        description={`${publications.length} publicação(ões) no total.`}
        action={
          <Link to="/admin/publicacoes/nova" className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            + Nova publicação
          </Link>
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
          <option value="">Todos os status</option>
          <option value="publicado">Publicado</option>
          <option value="rascunho">Rascunho</option>
          <option value="agendado">Agendado</option>
          <option value="arquivado">Arquivado</option>
        </select>
        <select value={author} onChange={(e) => setAuthor(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
          <option value="">Todos os autores</option>
          {authors.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
          <option value="">Qualquer período</option>
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="365">Último ano</option>
        </select>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nenhuma publicação encontrada"
          description="Ajuste os filtros ou crie uma nova publicação."
          action={
            <Link to="/admin/publicacoes/nova" className="inline-block bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              + Nova publicação
            </Link>
          }
        />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
                <th className="px-4 py-3 font-semibold">Publicação</th>
                <th className="px-4 py-3 font-semibold">Categoria</th>
                <th className="px-4 py-3 font-semibold">Autor</th>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Views</th>
                <th className="px-4 py-3 font-semibold">Atualizado</th>
                <th className="px-4 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 max-w-xs">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <span className="font-semibold text-gray-800 truncate">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{categoryName(p.category)}</td>
                  <td className="px-4 py-3 text-gray-500">{p.author}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.views}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.updatedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/${p.slug}`} target="_blank" rel="noopener noreferrer" title="Visualizar" className="p-1.5 text-gray-400 hover:text-gray-700 rounded">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </Link>
                      <button onClick={() => navigate(`/admin/publicacoes/${p.id}`)} title="Editar" className="p-1.5 text-gray-400 hover:text-gray-700 rounded">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => duplicatePublication(p.id)} title="Duplicar" className="p-1.5 text-gray-400 hover:text-gray-700 rounded">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button onClick={() => togglePublish(p)} title={p.status === "publicado" ? "Despublicar" : "Publicar"} className="p-1.5 text-gray-400 hover:text-gray-700 rounded">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          {p.status === "publicado" ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.243 4.243M9.878 9.878L3 3m6.878 6.878L21 21" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          )}
                        </svg>
                      </button>
                      <button onClick={() => setConfirmDelete(p)} title="Excluir" className="p-1.5 text-gray-400 hover:text-[#C41230] rounded">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Excluir publicação"
        description={`Tem certeza que deseja excluir "${confirmDelete?.title}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
