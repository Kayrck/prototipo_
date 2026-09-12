import { useMemo, useState } from "react";
import { useAdmin, AdminFormSubmission } from "../AdminContext";
import { StatusBadge, EmptyState, Toast, AdminPageHeader } from "../components/Shared";

export default function Denuncias() {
  const { formSubmissions, updateFormSubmission } = useAdmin();
  const [selected, setSelected] = useState<AdminFormSubmission | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const denuncias = useMemo(() => formSubmissions.filter((f) => f.formType === "Denuncie"), [formSubmissions]);
  const novas = denuncias.filter((d) => d.status === "novo").length;
  const respondidas = denuncias.filter((d) => d.status === "respondido").length;

  const openView = (d: AdminFormSubmission) => {
    setSelected(d);
    if (d.status === "novo") updateFormSubmission(d.id, { status: "lido" });
  };

  return (
    <div>
      <AdminPageHeader title="Denúncias" description="Denúncias recebidas pelo Canal de Denúncia do site." />

      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800 mb-5 flex items-start gap-2.5">
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <span>Denúncias podem ser enviadas de forma anônima pelo canal público. Trate essas informações com confidencialidade e evite compartilhá-las fora do necessário.</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-black text-gray-900">{denuncias.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total recebido</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-black text-gray-900">{novas}</p>
          <p className="text-xs text-gray-500 mt-1">Novas</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-2xl font-black text-gray-900">{respondidas}</p>
          <p className="text-xs text-gray-500 mt-1">Respondidas</p>
        </div>
      </div>

      {denuncias.length === 0 ? (
        <EmptyState title="Nenhuma denúncia recebida" description="Quando houver envios pelo Canal de Denúncia, eles aparecerão aqui." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
                <th className="px-4 py-3 font-semibold">Remetente</th>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {denuncias.map((d) => (
                <tr key={d.id} className={`hover:bg-gray-50 ${d.status === "novo" ? "font-semibold" : ""}`}>
                  <td className="px-4 py-3 text-gray-800">{d.name}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openView(d)} className="text-xs font-semibold text-[#C41230] hover:underline">
                      Ver denúncia
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 animate-overlay-in" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-md w-full p-6 animate-dropdown-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-base">Denúncia</h2>
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
                  setToast("Denúncia marcada como respondida.");
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
