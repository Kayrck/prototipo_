import { useMemo, useState } from "react";
import { useAdmin, AdminDocument } from "../AdminContext";
import { StatusBadge, EmptyState, TableSkeleton, useDelayedLoading, ConfirmDialog, Toast, AdminPageHeader } from "../components/Shared";

const documentCategories = [
  "Estatuto",
  "Atas",
  "CONSINTFUB",
  "Eleições",
  "Resoluções/Boletins",
  "Informes",
  "Prestação de Contas",
  "Transparência",
  "Jurídico",
];

type DocumentForm = Omit<AdminDocument, "id" | "tags">;

const emptyForm: DocumentForm = {
  title: "",
  description: "",
  category: documentCategories[0],
  fileName: "",
  fileUrl: "",
  size: "",
  date: new Date().toISOString().slice(0, 10),
  author: "Secretaria",
  featured: false,
  status: "rascunho",
};

export default function Documents() {
  const { documents, addDocument, updateDocument, deleteDocument } = useAdmin();
  const loading = useDelayedLoading([documents.length]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AdminDocument | null>(null);
  const [form, setForm] = useState<DocumentForm>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<AdminDocument | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      if (search && !d.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && d.category !== category) return false;
      return true;
    });
  }, [documents, search, category]);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setTagsInput("");
    setShowForm(true);
  };

  const openEdit = (d: AdminDocument) => {
    setEditing(d);
    setForm({ ...d });
    setTagsInput(d.tags.join(", "));
    setShowForm(true);
  };

  const handleSave = () => {
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    if (editing) {
      updateDocument(editing.id, { ...form, tags });
      setToast("Documento atualizado.");
    } else {
      addDocument({ ...form, tags });
      setToast("Documento adicionado.");
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    deleteDocument(confirmDelete.id);
    setToast("Documento excluído.");
    setConfirmDelete(null);
  };

  return (
    <div>
      <AdminPageHeader
        title="Documentos"
        description={`${documents.length} documento(s) cadastrados.`}
        action={
          <button onClick={openNew} className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            + Novo documento
          </button>
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
          <option value="">Todas as categorias</option>
          {documentCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState title="Nenhum documento encontrado" description="Ajuste os filtros ou adicione um novo documento." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[850px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
                <th className="px-4 py-3 font-semibold">Documento</th>
                <th className="px-4 py-3 font-semibold">Categoria</th>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold">Autor</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5 max-w-sm">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{d.title}</p>
                        {d.featured && <span className="text-[10px] font-bold text-[#C41230]">DESTAQUE</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{d.category}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.date}</td>
                  <td className="px-4 py-3 text-gray-500">{d.author}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {d.fileUrl && (
                        <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" title="Ver / baixar" className="p-1.5 text-gray-400 hover:text-gray-700 rounded">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      )}
                      <button onClick={() => openEdit(d)} title="Editar" className="p-1.5 text-gray-400 hover:text-gray-700 rounded">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => updateDocument(d.id, { status: d.status === "publicado" ? "rascunho" : "publicado" })}
                        title={d.status === "publicado" ? "Despublicar" : "Publicar"}
                        className="p-1.5 text-gray-400 hover:text-gray-700 rounded"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button onClick={() => setConfirmDelete(d)} title="Excluir" className="p-1.5 text-gray-400 hover:text-[#C41230] rounded">
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

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-gray-900 text-base mb-4">{editing ? "Editar documento" : "Novo documento"}</h2>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Título</label>
                <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Descrição</label>
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Categoria</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white">
                  {documentCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Arquivo PDF (URL demonstrativa)</label>
                <input value={form.fileUrl} onChange={(e) => setForm((f) => ({ ...f, fileUrl: e.target.value }))} placeholder="/docs/arquivo.pdf" className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Data</label>
                  <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Autor</label>
                  <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Tags (separadas por vírgula)</label>
                <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="rounded border-gray-300 text-[#C41230]" />
                  Destaque
                </label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "publicado" | "rascunho" }))} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
                  <option value="rascunho">Rascunho</option>
                  <option value="publicado">Publicado</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                Cancelar
              </button>
              <button onClick={handleSave} className="px-4 py-2 text-sm font-bold rounded-lg text-white bg-[#C41230] hover:bg-[#9B0E25]">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Excluir documento"
        description={`Tem certeza que deseja excluir "${confirmDelete?.title}"?`}
        confirmLabel="Excluir"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
