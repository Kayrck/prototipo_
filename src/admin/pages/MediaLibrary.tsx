import { useMemo, useState } from "react";
import { useAdmin, AdminMedia } from "../AdminContext";
import { ConfirmDialog, EmptyState, Toast, AdminPageHeader } from "../components/Shared";

export default function MediaLibrary() {
  const { media, documents, deleteMedia } = useAdmin();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AdminMedia | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadPreview, setUploadPreview] = useState("");

  const library = useMemo(() => {
    const pdfEntries: AdminMedia[] = documents.map((d) => ({
      id: `libdoc-${d.id}`,
      type: "pdf",
      url: d.fileUrl,
      title: d.title,
      description: d.description,
      category: d.category,
      date: d.date,
      featured: d.featured,
      youtubeUrl: "",
    }));
    return [...media, ...pdfEntries];
  }, [media, documents]);

  const filtered = useMemo(() => {
    return library.filter((m) => {
      if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter && m.type !== typeFilter) return false;
      return true;
    });
  }, [library, search, typeFilter]);

  const selectedItem = library.find((m) => m.id === selected);

  const copyUrl = (url: string) => {
    navigator.clipboard?.writeText(url).catch(() => {});
    setToast("URL copiada para a área de transferência.");
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    deleteMedia(confirmDelete.id);
    setSelected(null);
    setToast("Item excluído da biblioteca.");
    setConfirmDelete(null);
  };

  return (
    <div>
      <AdminPageHeader
        title="Biblioteca de mídia"
        description={`${library.length} arquivo(s) disponíveis (fotos, capas, banners, thumbnails e PDFs).`}
        action={
          <button onClick={() => setShowUpload(true)} className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            + Upload
          </button>
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
          <option value="">Todos os tipos</option>
          <option value="foto">Fotos</option>
          <option value="video">Vídeos</option>
          <option value="card">Cards</option>
          <option value="pdf">PDFs</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Nenhum arquivo encontrado" description="Ajuste a busca ou envie um novo arquivo." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`bg-white border rounded-lg overflow-hidden text-left transition-colors ${selected === m.id ? "border-[#C41230] ring-2 ring-[#C41230]/20" : "border-gray-200 hover:border-gray-300"}`}
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {m.type === "pdf" ? (
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ) : (
                  m.url && <img src={m.url} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-semibold text-gray-700 truncate">{m.title}</p>
                <p className="text-[10px] text-gray-400 uppercase">{m.type}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
              {selectedItem.type === "pdf" ? (
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              ) : (
                selectedItem.url && <img src={selectedItem.url} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <p className="font-bold text-gray-900 text-sm mb-1">{selectedItem.title}</p>
            <p className="text-xs text-gray-400 font-mono break-all mb-4">{selectedItem.url}</p>
            <div className="flex flex-wrap justify-end gap-2">
              <button onClick={() => setSelected(null)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                Fechar
              </button>
              <button onClick={() => copyUrl(selectedItem.url)} className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400">
                Copiar URL
              </button>
              {media.some((m) => m.id === selectedItem.id) && (
                <button onClick={() => setConfirmDelete(selectedItem)} className="px-4 py-2 text-sm font-bold text-white bg-[#C41230] hover:bg-[#9B0E25] rounded-lg">
                  Excluir
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showUpload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-sm w-full p-6">
            <h2 className="font-bold text-gray-900 text-base mb-4">Upload de arquivo (demonstrativo)</h2>
            <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setUploadPreview(URL.createObjectURL(file));
                }}
              />
              {uploadPreview ? (
                <img src={uploadPreview} alt="Pré-visualização" className="max-h-40 mx-auto rounded-lg" />
              ) : (
                <>
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-500">Clique para selecionar uma imagem</p>
                </>
              )}
            </label>
            <p className="text-xs text-gray-400 mt-3">Este upload é apenas demonstrativo e não é enviado a nenhum servidor.</p>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => {
                  setShowUpload(false);
                  setUploadPreview("");
                }}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Excluir arquivo"
        description={`Tem certeza que deseja excluir "${confirmDelete?.title}" da biblioteca?`}
        confirmLabel="Excluir"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
