import { useMemo, useState } from "react";
import { useAdmin } from "../AdminContext";
import { StatusBadge, EmptyState, ConfirmDialog, Toast, AdminPageHeader } from "../components/Shared";
import type { AdminComment } from "../AdminContext";

type Filter = "" | "pendente" | "aprovado" | "spam";

export default function Comments() {
  const { comments, updateComment, deleteComment } = useAdmin();
  const [filter, setFilter] = useState<Filter>("");
  const [confirmDelete, setConfirmDelete] = useState<AdminComment | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => (filter ? comments.filter((c) => c.status === filter) : comments), [comments, filter]);

  const tabs: { key: Filter; label: string }[] = [
    { key: "", label: `Todos (${comments.length})` },
    { key: "pendente", label: `Pendentes (${comments.filter((c) => c.status === "pendente").length})` },
    { key: "aprovado", label: `Aprovados (${comments.filter((c) => c.status === "aprovado").length})` },
    { key: "spam", label: `Spam (${comments.filter((c) => c.status === "spam").length})` },
  ];

  const handleDelete = () => {
    if (!confirmDelete) return;
    deleteComment(confirmDelete.id);
    setToast("Comentário excluído.");
    setConfirmDelete(null);
  };

  return (
    <div>
      <AdminPageHeader title="Comentários" description="Modere comentários enviados nas publicações do site." />

      <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              filter === t.key ? "border-[#C41230] text-[#C41230]" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Nenhum comentário" description="Não há comentários para este filtro." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
          {filtered.map((c) => (
            <div key={c.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{c.author}</p>
                  <p className="text-xs text-gray-400 mb-2">
                    em <span className="italic">{c.publicationTitle}</span> · {c.date}
                  </p>
                  <p className="text-sm text-gray-600">{c.content}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
              <div className="flex items-center gap-4 mt-3">
                {c.status !== "aprovado" && (
                  <button onClick={() => updateComment(c.id, { status: "aprovado" })} className="text-xs font-semibold text-green-700 hover:underline">
                    Aprovar
                  </button>
                )}
                {c.status !== "spam" && (
                  <button onClick={() => updateComment(c.id, { status: "spam" })} className="text-xs font-semibold text-yellow-700 hover:underline">
                    Marcar como spam
                  </button>
                )}
                <button onClick={() => setConfirmDelete(c)} className="text-xs font-semibold text-[#C41230] hover:underline">
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Excluir comentário"
        description="Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
