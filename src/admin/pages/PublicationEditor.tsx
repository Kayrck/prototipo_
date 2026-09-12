import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAdmin, AdminPublication, PubStatus } from "../AdminContext";
import { Toast } from "../components/Shared";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptyForm: Omit<AdminPublication, "id" | "views" | "updatedAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  gallery: [],
  video: "",
  date: new Date().toISOString().slice(0, 10),
  scheduledDate: "",
  author: "Secretaria de Comunicação",
  category: "noticias",
  tags: [],
  status: "rascunho",
  externalUrl: "",
  relatedDocument: "",
  seoTitle: "",
  seoDescription: "",
  seoKeyword: "",
  canonicalUrl: "",
  socialImage: "",
};

export default function PublicationEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications, categories, documents, addPublication, updatePublication } = useAdmin();
  const isNew = !id;
  const existing = publications.find((p) => p.id === id);

  const [form, setForm] = useState(existing || emptyForm);
  const [tagsInput, setTagsInput] = useState((existing?.tags || []).join(", "));
  const [scheduleMode, setScheduleMode] = useState<"now" | "schedule">(existing?.status === "agendado" ? "schedule" : "now");
  const [toast, setToast] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(!!existing);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (existing) {
      setForm(existing);
      setTagsInput(existing.tags.join(", "));
      setSlugTouched(true);
    }
  }, [existing]);

  if (!isNew && !existing) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Publicação não encontrada.</p>
        <Link to="/admin/publicacoes" className="text-[#C41230] font-semibold text-sm mt-2 inline-block">
          Voltar para publicações
        </Link>
      </div>
    );
  }

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleTitleChange = (v: string) => {
    set("title", v);
    if (!slugTouched) set("slug", slugify(v));
  };

  const wrapSelection = (before: string, after = before) => {
    const el = contentRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const value = form.content;
    const selected = value.slice(start, end) || "texto";
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    set("content", next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const insertLine = (prefix: string) => {
    const el = contentRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const value = form.content;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    set("content", next);
    requestAnimationFrame(() => el.focus());
  };

  const persist = (status: PubStatus) => {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const finalStatus: PubStatus = status === "publicado" && scheduleMode === "schedule" && form.scheduledDate ? "agendado" : status;
    const payload = { ...form, tags, status: finalStatus };

    if (isNew) {
      addPublication(payload);
    } else if (existing) {
      updatePublication(existing.id, payload);
    }
    setToast(finalStatus === "publicado" ? "Publicação publicada com sucesso." : finalStatus === "agendado" ? "Publicação agendada." : "Rascunho salvo.");
    setTimeout(() => navigate("/admin/publicacoes"), 900);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{isNew ? "Nova publicação" : "Editar publicação"}</h1>
          <p className="text-sm text-gray-500 mt-1">Preencha os campos abaixo para {isNew ? "criar" : "atualizar"} a publicação.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => persist("rascunho")} className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Salvar rascunho
          </button>
          {form.slug && (
            <Link to={`/${form.slug}`} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Visualizar
            </Link>
          )}
          <button onClick={() => persist("publicado")} className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            {scheduleMode === "schedule" && form.scheduledDate ? "Agendar publicação" : "Publicar"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Título</label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Título da publicação"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Slug (URL)</label>
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", slugify(e.target.value));
                }}
                placeholder="titulo-da-publicacao"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
              />
              <p className="text-xs text-gray-400 mt-1">sintfub.org.br/{form.slug || "..."}</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Resumo</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                rows={2}
                placeholder="Resumo curto exibido nas listagens"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Conteúdo</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
                  <button type="button" title="Negrito" onClick={() => wrapSelection("**")} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 font-bold text-sm">
                    B
                  </button>
                  <button type="button" title="Itálico" onClick={() => wrapSelection("_")} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 italic text-sm">
                    I
                  </button>
                  <button type="button" title="Título" onClick={() => insertLine("## ")} className="px-2 h-7 flex items-center justify-center rounded hover:bg-gray-200 font-bold text-xs">
                    H2
                  </button>
                  <button type="button" title="Lista" onClick={() => insertLine("- ")} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-sm">
                    •
                  </button>
                  <button type="button" title="Link" onClick={() => wrapSelection("[", "](https://)")} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-sm">
                    🔗
                  </button>
                  <button type="button" title="Imagem" onClick={() => insertLine("![descrição](https://url-da-imagem.jpg)\n")} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-sm">
                    🖼
                  </button>
                  <button type="button" title="Vídeo incorporado" onClick={() => insertLine("[vídeo: https://youtube.com/watch?v=...]\n")} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-sm">
                    ▶
                  </button>
                </div>
                <textarea
                  ref={contentRef}
                  value={form.content}
                  onChange={(e) => set("content", e.target.value)}
                  rows={12}
                  placeholder="Escreva o conteúdo completo da publicação..."
                  className="w-full px-3.5 py-3 text-sm focus:outline-none resize-y font-mono"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm">Mídia</h2>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Imagem destacada (URL)</label>
              <input
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="/img/exemplo.jpg"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
              />
              {form.image && (
                <div className="mt-2 w-full h-36 rounded-lg overflow-hidden bg-gray-100">
                  <img src={form.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Galeria de imagens (uma URL por linha)</label>
              <textarea
                value={form.gallery.join("\n")}
                onChange={(e) => set("gallery", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
                rows={3}
                placeholder={"/img/foto1.jpg\n/img/foto2.jpg"}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Vídeo incorporado (URL do YouTube)</label>
              <input
                value={form.video}
                onChange={(e) => set("video", e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm">SEO da publicação</h2>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Meta título</label>
              <input
                value={form.seoTitle}
                onChange={(e) => set("seoTitle", e.target.value)}
                placeholder={form.title || "Meta título"}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Meta descrição</label>
              <textarea
                value={form.seoDescription}
                onChange={(e) => set("seoDescription", e.target.value)}
                rows={2}
                placeholder={form.excerpt || "Meta descrição"}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Palavra-chave</label>
                <input
                  value={form.seoKeyword}
                  onChange={(e) => set("seoKeyword", e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">URL canônica</label>
                <input
                  value={form.canonicalUrl}
                  onChange={(e) => set("canonicalUrl", e.target.value)}
                  placeholder={`https://sintfub.org.br/${form.slug || ""}`}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
                />
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3.5 bg-gray-50">
              <p className="text-[11px] text-gray-400 mb-1">Prévia na busca</p>
              <p className="text-[#1a0dab] text-base leading-tight truncate">{form.seoTitle || form.title || "Título da publicação"}</p>
              <p className="text-[#006621] text-xs">{`sintfub.org.br › ${form.slug || "..."}`}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{form.seoDescription || form.excerpt || "Descrição da publicação aparecerá aqui."}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm">Publicação</h2>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value as PubStatus)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white">
                <option value="rascunho">Rascunho</option>
                <option value="publicado">Publicado</option>
                <option value="agendado">Agendado</option>
                <option value="arquivado">Arquivado</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Quando publicar</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setScheduleMode("now")}
                  className={`flex-1 text-xs font-semibold py-2 rounded-lg border ${scheduleMode === "now" ? "bg-[#C41230] text-white border-[#C41230]" : "bg-white text-gray-600 border-gray-300"}`}
                >
                  Publicar agora
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleMode("schedule")}
                  className={`flex-1 text-xs font-semibold py-2 rounded-lg border ${scheduleMode === "schedule" ? "bg-[#C41230] text-white border-[#C41230]" : "bg-white text-gray-600 border-gray-300"}`}
                >
                  Agendar
                </button>
              </div>
              {scheduleMode === "schedule" && (
                <input
                  type="date"
                  value={form.scheduledDate}
                  onChange={(e) => set("scheduledDate", e.target.value)}
                  className="w-full mt-2 px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg"
                />
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Data de publicação</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Autor</label>
              <input value={form.author} onChange={(e) => set("author", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Categoria</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white">
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Tags (separadas por vírgula)</label>
              <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="sindicato, categoria, assembleia" className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm">Links relacionados</h2>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">URL externa</label>
              <input value={form.externalUrl} onChange={(e) => set("externalUrl", e.target.value)} placeholder="https://..." className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Documento/PDF relacionado</label>
              <select value={form.relatedDocument} onChange={(e) => set("relatedDocument", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white">
                <option value="">Nenhum</option>
                {documents.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
