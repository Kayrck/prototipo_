import { useMemo, useState } from "react";
import { useAdmin, AdminMedia } from "../AdminContext";
import { ConfirmDialog, EmptyState, Toast, AdminPageHeader } from "../components/Shared";

type Tab = "foto" | "video" | "card";

function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{6,})/);
  return m ? m[1] : null;
}

const emptyForm = { title: "", description: "", category: "", date: new Date().toISOString().slice(0, 10), featured: false, youtubeUrl: "", url: "" };

export default function Multimedia() {
  const { media, categories, addMedia, updateMedia, deleteMedia } = useAdmin();
  const [tab, setTab] = useState<Tab>("foto");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<AdminMedia | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const items = useMemo(() => media.filter((m) => m.type === tab), [media, tab]);
  const ytId = tab === "video" ? extractYouTubeId(form.youtubeUrl) : null;

  const openNew = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSave = () => {
    const url = tab === "video" && ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : form.url;
    addMedia({ ...form, type: tab, url });
    setToast(tab === "video" ? "Vídeo adicionado." : "Mídia adicionada.");
    setShowForm(false);
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    deleteMedia(confirmDelete.id);
    setToast("Item excluído.");
    setConfirmDelete(null);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "foto", label: "Fotos" },
    { key: "video", label: "Vídeos" },
    { key: "card", label: "Cards / Banners" },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Multimídia"
        description="Gerencie fotos, vídeos e cards do site."
        action={
          <button onClick={openNew} className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            + Adicionar {tab === "foto" ? "foto" : tab === "video" ? "vídeo" : "card"}
          </button>
        }
      />

      <div className="flex gap-1 border-b border-gray-200 mb-5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              tab === t.key ? "border-[#C41230] text-[#C41230]" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState title="Nada por aqui ainda" description={`Nenhum item em ${tabs.find((t) => t.key === tab)?.label.toLowerCase()}.`} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((m) => (
            <div key={m.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden group">
              <div className="aspect-video bg-gray-100 relative">
                {m.url && <img src={m.url} alt="" className="w-full h-full object-cover" />}
                {m.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                {m.featured && <span className="absolute top-2 left-2 bg-[#C41230] text-white text-[10px] font-bold px-2 py-0.5 rounded">Destaque</span>}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-800 truncate">{m.title}</p>
                <p className="text-xs text-gray-400">{m.date}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => updateMedia(m.id, { featured: !m.featured })} className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                    {m.featured ? "Remover destaque" : "Destacar"}
                  </button>
                  <button onClick={() => setConfirmDelete(m)} className="text-xs font-semibold text-[#C41230] hover:underline">
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-gray-900 text-base mb-4">
              Adicionar {tab === "foto" ? "foto" : tab === "video" ? "vídeo" : "card"}
            </h2>
            <div className="space-y-3.5">
              {tab === "video" ? (
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">URL do YouTube</label>
                  <input
                    value={form.youtubeUrl}
                    onChange={(e) => setForm((f) => ({ ...f, youtubeUrl: e.target.value }))}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg"
                  />
                  {ytId && (
                    <div className="mt-2 aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img src={`https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Imagem (upload demonstrativo — URL)</label>
                  <input
                    value={form.url}
                    onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                    placeholder="/img/exemplo.jpg"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg"
                  />
                  {form.url && (
                    <div className="mt-2 aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img src={form.url} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Título</label>
                <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Descrição</label>
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Categoria</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white">
                    <option value="">Selecione</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Data</label>
                  <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="rounded border-gray-300 text-[#C41230]" />
                Marcar como destaque
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                Cancelar
              </button>
              <button onClick={handleSave} className="px-4 py-2 text-sm font-bold rounded-lg text-white bg-[#C41230] hover:bg-[#9B0E25]">
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Excluir item"
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
