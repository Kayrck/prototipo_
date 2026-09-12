import { Link } from "react-router-dom";
import { useAdmin } from "../AdminContext";
import { StatusBadge, AdminPageHeader } from "../components/Shared";

function StatCard({ label, value, href }: { label: string; value: number; href?: string }) {
  const inner = (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors h-full">
      <p className="text-2xl font-black text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
  return href ? <Link to={href}>{inner}</Link> : inner;
}

export default function Dashboard() {
  const { publications, documents, media, activities, formSubmissions } = useAdmin();

  const published = publications.filter((p) => p.status === "publicado").length;
  const drafts = publications.filter((p) => p.status === "rascunho");
  const videos = media.filter((m) => m.type === "video").length;
  const photos = media.filter((m) => m.type === "foto").length;
  const denuncias = formSubmissions.filter((f) => f.formType === "Denuncie").length;
  const filiacoes = formSubmissions.filter((f) => f.formType === "Filie-se").length;
  const messages = formSubmissions.length;

  const recentPublications = [...publications]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 5);
  const latestDocuments = [...documents].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Visão geral da administração do site do SINTFUB."
        action={
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/publicacoes/nova" className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              + Nova publicação
            </Link>
            <Link to="/admin/documentos" className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Adicionar documento
            </Link>
            <Link to="/admin/multimidia" className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Adicionar vídeo
            </Link>
            <Link to="/admin/midia" className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Gerenciar mídia
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        <StatCard label="Publicações" value={publications.length} href="/admin/publicacoes" />
        <StatCard label="Publicados" value={published} href="/admin/publicacoes" />
        <StatCard label="Rascunhos" value={drafts.length} href="/admin/publicacoes" />
        <StatCard label="Documentos" value={documents.length} href="/admin/documentos" />
        <StatCard label="Páginas" value={12} href="/admin/paginas" />
        <StatCard label="Vídeos" value={videos} href="/admin/multimidia" />
        <StatCard label="Fotos" value={photos} href="/admin/midia" />
        <StatCard label="Mensagens recebidas" value={messages} href="/admin/formularios" />
        <StatCard label="Denúncias recebidas" value={denuncias} href="/admin/denuncias" />
        <StatCard label="Filiações recebidas" value={filiacoes} href="/admin/formularios" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-sm">Publicações recentes</h2>
            <Link to="/admin/publicacoes" className="text-xs font-semibold text-[#C41230] hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPublications.map((p) => (
              <Link key={p.id} to={`/admin/publicacoes/${p.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                  {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.updatedAt}</p>
                </div>
                <StatusBadge status={p.status} />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-sm">Atividade recente</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-[360px] overflow-y-auto">
            {activities.slice(0, 8).map((a) => (
              <div key={a.id} className="px-5 py-3">
                <p className="text-sm text-gray-700">{a.action}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {a.user} · {a.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-sm">Últimos documentos</h2>
            <Link to="/admin/documentos" className="text-xs font-semibold text-[#C41230] hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {latestDocuments.map((d) => (
              <div key={d.id} className="px-5 py-3">
                <p className="text-sm font-semibold text-gray-800 truncate">{d.title}</p>
                <p className="text-xs text-gray-400">
                  {d.category} · {d.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-sm">Rascunhos</h2>
            <Link to="/admin/publicacoes" className="text-xs font-semibold text-[#C41230] hover:underline">
              Ver todos
            </Link>
          </div>
          {drafts.length === 0 ? (
            <p className="px-5 py-6 text-sm text-gray-400">Nenhum rascunho no momento.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {drafts.slice(0, 5).map((p) => (
                <Link key={p.id} to={`/admin/publicacoes/${p.id}`} className="block px-5 py-3 hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.title || "(sem título)"}</p>
                  <p className="text-xs text-gray-400">{p.updatedAt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
