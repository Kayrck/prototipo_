import { useState } from "react";
import { useAdmin, AdminCategory } from "../AdminContext";
import { StatusBadge, ConfirmDialog, Toast, AdminPageHeader } from "../components/Shared";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type CategoryForm = Omit<AdminCategory, "id">;

const emptyForm: CategoryForm = { name: "", slug: "", parent: "", description: "", image: "", status: "ativa" };

export default function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<AdminCategory | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (c: AdminCategory) => {
    setEditing(c);
    setForm({ name: c.name, slug: c.slug, parent: c.parent, description: c.description, image: c.image, status: c.status });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editing) {
      updateCategory(editing.id, form);
      setToast("Categoria atualizada.");
    } else {
      addCategory(form);
      setToast("Categoria criada.");
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    deleteCategory(confirmDelete.id);
    setToast("Categoria excluída.");
    setConfirmDelete(null);
  };

  const parentName = (id: string) => categories.find((c) => c.id === id)?.name || "—";

  return (
    <div>
      <AdminPageHeader
        title="Categorias"
        description={`${categories.length} categoria(s) cadastradas.`}
        action={
          <button onClick={openNew} className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            + Nova categoria
          </button>
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Categoria pai</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-800">{c.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{c.slug}</td>
                <td className="px-4 py-3 text-gray-500">{c.parent ? parentName(c.parent) : "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(c)} className="text-xs font-semibold text-gray-500 hover:text-gray-800 mr-3">
                    Editar
                  </button>
                  <button onClick={() => setConfirmDelete(c)} className="text-xs font-semibold text-[#C41230] hover:underline">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-gray-900 text-base mb-4">{editing ? "Editar categoria" : "Nova categoria"}</h2>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Nome</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: editing ? f.slug : slugify(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Slug</label>
                <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Categoria pai</label>
                <select value={form.parent} onChange={(e) => setForm((f) => ({ ...f, parent: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white">
                  <option value="">Nenhuma (categoria raiz)</option>
                  {categories
                    .filter((c) => c.id !== editing?.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Descrição</label>
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Imagem (URL)</label>
                <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Status</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "ativa" | "inativa" }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white">
                  <option value="ativa">Ativa</option>
                  <option value="inativa">Inativa</option>
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
        title="Excluir categoria"
        description={`Tem certeza que deseja excluir "${confirmDelete?.name}"?`}
        confirmLabel="Excluir"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
