import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import NewsCard from "../components/NewsCard";
import { newsItems, tagCloud } from "../data/content";

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [shareOpen, setShareOpen] = useState(false);
  const [copyLinkOpen, setCopyLinkOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = newsItems.find((n) => n.slug === slug) || newsItems[0];
  const related = newsItems.filter((n) => n.slug !== post.slug).slice(0, 5);

  const currentUrl = `https://sintfub.org.br/${post.slug}/`;

  const shareNetworks = [
    { label: "Facebook", color: "#1877F2" },
    { label: "X / Twitter", color: "#000000" },
    { label: "WhatsApp", color: "#25D366" },
    { label: "Telegram", color: "#0088CC" },
    { label: "LinkedIn", color: "#0A66C2" },
    { label: "E-mail", color: "#6B7280" },
    { label: "Imprimir", color: "#374151" },
    { label: "PDF", color: "#C41230" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb
        items={[
          { label: post.category, href: `/category/${post.categorySlug}/` },
          { label: post.title },
        ]}
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-10">
          {/* Share sidebar (vertical, floating) */}
          <div className="hidden xl:flex flex-col items-center gap-2 pt-2 sticky top-24 h-fit" aria-label="Compartilhar verticalmente">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1" style={{ writingMode: "vertical-rl" }}>
              Compartilhar
            </span>
            {[
              { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", color: "hover:bg-[#1877F2]" },
              { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", color: "hover:bg-black" },
              { label: "WhatsApp", path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z", color: "hover:bg-[#25D366]" },
            ].map((net) => (
              <button
                key={net.label}
                aria-label={`Compartilhar no ${net.label}`}
                className={`w-9 h-9 bg-gray-100 ${net.color} hover:text-white text-gray-600 rounded-lg flex items-center justify-center transition-colors`}
                onClick={() => setShareOpen(true)}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d={net.path} />
                </svg>
              </button>
            ))}
          </div>

          {/* Main content */}
          <article className="flex-1 min-w-0">
            <div className="mb-6">
              <Link
                to={`/category/${post.categorySlug}/`}
                className="inline-block text-xs font-bold text-[#C41230] uppercase tracking-widest mb-3 hover:underline"
              >
                {post.category}
              </Link>
              <h1 className="text-2xl lg:text-4xl font-black text-gray-900 leading-tight font-[family-name:var(--font-display)] mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <time dateTime={post.date}>{post.dateFormatted}</time>
                <button
                  onClick={() => setShareOpen(true)}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-[#C41230] transition-colors"
                  aria-label="Compartilhar publicação"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Featured image */}
            {post.image && (
              <div className="rounded-2xl overflow-hidden mb-8 bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-96 object-cover"
                />
              </div>
            )}

            {/* Horizontal share bar */}
            <div className="flex flex-wrap items-center gap-3 py-4 px-5 bg-gray-50 rounded-xl border border-gray-100 mb-8">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">Compartilhe:</span>
              {shareNetworks.slice(0, 6).map((net) => (
                <button
                  key={net.label}
                  onClick={() => setShareOpen(true)}
                  aria-label={`Compartilhar no ${net.label}`}
                  className="text-xs font-medium text-gray-600 border border-gray-200 hover:border-[#C41230] hover:text-[#C41230] px-3 py-1.5 rounded-lg transition-colors"
                >
                  {net.label}
                </button>
              ))}
              <button
                onClick={() => setCopyLinkOpen(true)}
                className="sm:ml-auto text-xs font-medium text-gray-600 border border-gray-200 hover:border-[#C41230] hover:text-[#C41230] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                aria-label="Copiar link"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar link
              </button>
            </div>

            {/* Post content */}
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg font-medium text-gray-800">{post.excerpt}</p>
              <p>
                O SINTFUB, Sindicato dos Trabalhadores da Fundação Universidade de Brasília, atua continuamente em defesa dos direitos e interesses dos servidores ativos e aposentados da FUB. Esta é uma publicação demonstrativa representando o conteúdo que seria exibido nesta página.
              </p>
              <p>
                A diretoria do SINTFUB mantém constante diálogo com a administração da UnB e com as instâncias do governo federal para garantir condições dignas de trabalho e a valorização dos servidores. Todas as ações e conquistas são comunicadas aos filiados por meio das publicações, informativos e das redes sociais do sindicato.
              </p>
              <p>
                Para mais informações, entre em contato com o SINTFUB pelos canais oficiais ou acompanhe as publicações no site.
              </p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                <span className="text-sm text-gray-500 font-medium">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tag/${tag.replace(/\s+/g, "-")}/`}
                    className="text-sm bg-gray-100 hover:bg-red-50 hover:text-[#C41230] text-gray-600 px-3 py-1 rounded-full transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Post navigation */}
            <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-gray-100">
              <Link
                to={`/${newsItems[1]?.slug}/`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-gray-100 hover:border-[#C41230] hover:bg-red-50 transition-all"
              >
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Publicação anterior
                </span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-[#C41230] line-clamp-2 transition-colors">
                  {newsItems[1]?.title || "Publicação anterior"}
                </span>
              </Link>
              <Link
                to={`/${newsItems[2]?.slug}/`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-gray-100 hover:border-[#C41230] hover:bg-red-50 transition-all text-right"
              >
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-end gap-1">
                  Próxima publicação
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-[#C41230] line-clamp-2 transition-colors">
                  {newsItems[2]?.title || "Próxima publicação"}
                </span>
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0" aria-label="Notícias recentes">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">
                  Notícias recentes
                </h2>
                <div className="divide-y divide-gray-100">
                  {related.map((item) => (
                    <NewsCard key={item.id} {...item} variant="horizontal" />
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tagCloud.slice(0, 14).map((tag) => (
                    <Link
                      key={tag.label}
                      to={`/tag/${tag.label.replace(/\s+/g, "-")}/`}
                      className="text-xs text-gray-600 bg-white border border-gray-200 hover:border-[#C41230] hover:text-[#C41230] px-2.5 py-1 rounded-full transition-colors"
                    >
                      {tag.label}
                      <span className="ml-1 text-gray-400">{tag.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Share Modal */}
      {shareOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Compartilhar publicação">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Compartilhar publicação</h2>
              <button onClick={() => setShareOpen(false)} className="text-gray-400 hover:text-gray-600" aria-label="Fechar">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-4 gap-3 mb-5">
                {shareNetworks.map((net) => (
                  <button
                    key={net.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors"
                    aria-label={`Compartilhar no ${net.label}`}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${net.color}20` }}>
                      <span className="text-xs font-bold" style={{ color: net.color }}>{net.label[0]}</span>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{net.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setShareOpen(false); setCopyLinkOpen(true); }}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:border-[#C41230] hover:text-[#C41230] transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copy Link Modal */}
      {copyLinkOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Copiar link">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Copiar link</h2>
              <button onClick={() => setCopyLinkOpen(false)} className="text-gray-400 hover:text-gray-600" aria-label="Fechar">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C41230]"
                  aria-label="URL para copiar"
                />
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                    copied ? "bg-green-500 text-white" : "bg-[#C41230] hover:bg-[#9B0E25] text-white"
                  }`}
                >
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
