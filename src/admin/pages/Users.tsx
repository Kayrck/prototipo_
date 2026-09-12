import { useState } from "react";
import { useAdmin, AdminUser } from "../AdminContext";
import { StatusBadge, ConfirmDialog, Toast, AdminPageHeader } from "../components/Shared";

type UserForm = Omit<AdminUser, "id" | "lastAccess">;

const emptyForm: UserForm = { name: "", email: "", role: "Autor", status: "ativo" };

export default function Users() {
  const { users, addUser, updateUser, deleteUser } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<AdminUser | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (u: AdminUser) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editing) {
      updateUser(editing.id, form);
      setToast("Usuário atualizado.");
    } else {
      addUser({ ...form, lastAccess: "—" });
      setToast("Usuário criado.");
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    deleteUser(confirmDelete.id);
    setToast("Usuário excluído.");
    setConfirmDelete(null);
  };

  return (
    <div>
      <AdminPageHeader
        title="Usuários"
        description="Gestão demonstrativa de usuários administrativos. Não representa autenticação real."
        action={
          <button onClick={openNew} className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            + Novo usuário
          </button>
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold">E-mail</th>
              <th className="px-4 py-3 font-semibold">Função</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Último acesso</th>
              <th className="px-4 py-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-800">{u.name}</td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3 text-gray-500">{u.role}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-4 py-3 text-gray-500">{u.lastAccess}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(u)} className="text-xs font-semibold text-gray-500 hover:text-gray-800 mr-3">
                    Editar
                  </button>
                  <button onClick={() => setConfirmDelete(u)} className="text-xs font-semibold text-[#C41230] hover:underline">
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
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-sm w-full p-6">
            <h2 className="font-bold text-gray-900 text-base mb-4">{editing ? "Editar usuário" : "Novo usuário"}</h2>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Nome</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">E-mail</label>
                <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Função</label>
                <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as AdminUser["role"] }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white">
                  <option value="Administrador">Administrador</option>
                  <option value="Editor">Editor</option>
                  <option value="Autor">Autor</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Status</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "ativo" | "inativo" }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white">
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
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
        title="Excluir usuário"
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
