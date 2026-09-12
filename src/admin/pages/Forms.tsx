import { useMemo, useState } from "react";
import { useAdmin, AdminFormSubmission } from "../AdminContext";
import { StatusBadge, EmptyState, Toast, AdminPageHeader } from "../components/Shared";

type FormFilter = "" | "Contato" | "Denuncie" | "Filie-se";

export default function Forms() {
  const { formSubmissions, updateFormSubmission } = useAdmin();
  const [filter, setFilter] = useState<FormFilter>("");
  const [selected, setSelected] = useState<AdminFormSubmission | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      Contato: formSubmissions.filter((f) => f.formType === "Contato").length,
      Denuncie: formSubmissions.filter((f) => f.formType === "Denuncie").length,
      "Filie-se": formSubmissions.filter((f) => f.formType === "Filie-se").length,
      novos: formSubmissions.filter((f) => f.status === "novo").length,
    }),
    [formSubmissions]
  );

  const filtered = filter ? formSubmissions.filter((f) => f.formType === filter) : formSubmissions;

  const openView = (f: AdminFormSubmission) => {
    setSelected(f);
    if (f.status === "novo") updateFormSubmission(f.id, { status: "lido" });
  };

  const handleExport = () => {
    setToast("Exportação demonstrativa gerada (CSV simulado).");
  };

  return (
    <div>
      <AdminPageHeader
        title="Formulários"
        description="Respostas recebidas pelos formulários de Contato, Denuncie e Filie-se."
        action={
          <button onClick={handleExport} className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Exportar (demonstrativo)
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <button onClick={() => setFilter("")} className={`bg-white border rounded-lg p-4 text-left transition-colors ${filter === "" ? "border-[#C41230]" : "border-gray-200 hover:border-gray-300"}`}>
          <p className="text-2xl font-black text-gray-900">{formSubmissions.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total recebido</p>
        </button>
        <button onClick={() => setFilter("Contato")} className={`bg-white border rounded-lg p-4 text-left transition-colors ${filter === "Contato" ? "border-[#C41230]" : "border-gray-200 hover:border-gray-300"}`}>
          <p className="text-2xl font-black text-gray-900">{counts.Contato}</p>
          <p className="text-xs text-gray-500 mt-1">Contato</p>
        </button>
        <button onClick={() => setFilter("Denuncie")} className={`bg-white border rounded-lg p-4 text-left transition-colors ${filter === "Denuncie" ? "border-[#C41230]" : "border-gray-200 hover:border-gray-300"}`}>
          <p className="text-2xl font-black text-gray-900">{counts.Denuncie}</p>
          <p className="text-xs text-gray-500 mt-1">Denuncie</p>
        </button>
        <button onClick={() => setFilter("Filie-se")} className={`bg-white border rounded-lg p-4 text-left transition-colors ${filter === "Filie-se" ? "border-[#C41230]" : "border-gray-200 hover:border-gray-300"}`}>
          <p className="text-2xl font-black text-gray-900">{counts["Filie-se"]}</p>
          <p className="text-xs text-gray-500 mt-1">Filie-se</p>
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Nenhuma resposta encontrada" description="Ainda não há envios para este filtro." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
                <th className="px-4 py-3 font-semibold">Formulário</th>
                <th className="px-4 py-3 font-semibold">Nome</th>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((f) => (
                <tr key={f.id} className={`hover:bg-gray-50 ${f.status === "novo" ? "font-semibold" : ""}`}>
                  <td className="px-4 py-3 text-gray-800">{f.formType}</td>
                  <td className="px-4 py-3 text-gray-800">{f.name}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={f.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openView(f)} className="text-xs font-semibold text-[#C41230] hover:underline">
                      Ver resposta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-base">{selected.formType}</h2>
              <StatusBadge status={selected.status} />
            </div>
            <p className="text-sm text-gray-800 font-semibold">{selected.name}</p>
            <p className="text-xs text-gray-400 mb-3">
              {selected.email} · {selected.date}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 border border-gray-100 rounded-lg p-3.5">{selected.message}</p>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => {
                  updateFormSubmission(selected.id, { status: "respondido" });
                  setToast("Resposta marcada como respondida.");
                  setSelected(null);
                }}
                className="px-4 py-2 text-sm font-bold rounded-lg text-white bg-[#C41230] hover:bg-[#9B0E25]"
              >
                Marcar como respondido
              </button>
              <button onClick={() => setSelected(null)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
