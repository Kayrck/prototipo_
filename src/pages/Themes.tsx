import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import DocRow from "../components/DocRow";
import NewsCard from "../components/NewsCard";
import NotFound from "./NotFound";
import { newsItems } from "../data/content";
import { themes, type Theme } from "../data/themes";

function themeNews(theme: Theme) {
  return newsItems
    .filter((n) => n.tags.some((t) => theme.tags.includes(t.toLowerCase())))
    .sort((a, b) => b.date.localeCompare(a.date));
}

const sectionTitle = "text-xl font-black text-gray-900 mb-5 font-[family-name:var(--font-display)] flex items-center gap-3";

function Header({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-50 border-b border-gray-100 py-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-8 bg-[#C41230] rounded-full" />
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">{title}</h1>
        </div>
        <p className="text-gray-500 text-sm mt-2 ml-4 max-w-3xl">{description}</p>
      </div>
    </div>
  );
}

export default function Themes() {
  const { slug } = useParams();

  if (!slug) {
    return (
      <div className="min-h-screen bg-offwhite">
        <Breadcrumb items={[{ label: "Publicações", href: "/category/publicacoes/" }, { label: "Temas" }]} />
        <Header
          title="Temas"
          description="Páginas de consulta permanente que reúnem notícias, documentos e materiais sobre os assuntos que acompanham a categoria."
        />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themes.map((theme) => {
              const news = themeNews(theme).length;
              return (
                <li key={theme.slug}>
                  <Link
                    to={`/temas/${theme.slug}/`}
                    className="group flex h-full flex-col gap-2 p-6 bg-white border border-gray-100 hover:border-[#C41230] hover:shadow-md rounded-2xl transition-all"
                  >
                    <h2 className="font-bold text-gray-900 text-lg font-[family-name:var(--font-display)] group-hover:text-[#C41230] transition-colors">{theme.label}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed">{theme.summary}</p>
                    <p className="mt-auto pt-2 text-xs font-semibold text-[#C41230]">
                      {news} {news === 1 ? "publicação" : "publicações"} · {theme.docs.length} documentos
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  const theme = themes.find((t) => t.slug === slug);
  if (!theme) return <NotFound />;

  const news = themeNews(theme);

  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb items={[{ label: "Publicações", href: "/category/publicacoes/" }, { label: "Temas", href: "/temas/" }, { label: theme.label }]} />
      <Header title={theme.label} description={theme.summary} />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          <div className="flex-1 min-w-0 space-y-14">
            {/* Navegação compacta para telas sem a barra lateral */}
            <nav className="lg:hidden -mx-6 px-6 overflow-x-auto" aria-label="Temas">
              <ul className="flex gap-2 w-max pb-1">
                {themes.map((t) => (
                  <li key={t.slug}>
                    <Link
                      to={`/temas/${t.slug}/`}
                      aria-current={t.slug === theme.slug ? "page" : undefined}
                      className={`block whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                        t.slug === theme.slug
                          ? "bg-[#C41230] border-[#C41230] text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-[#C41230] hover:text-[#C41230]"
                      }`}
                    >
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <section aria-labelledby="titulo-docs">
              <h2 id="titulo-docs" className={sectionTitle}>
                <div className="w-1 h-6 rounded-full bg-[#C41230]" />
                Documentos
              </h2>
              <div className="space-y-3">
                {theme.docs.map((doc) => (
                  <DocRow key={doc.url} doc={doc} />
                ))}
              </div>
            </section>

            <section aria-labelledby="titulo-noticias">
              <h2 id="titulo-noticias" className={sectionTitle}>
                <div className="w-1 h-6 rounded-full bg-[#C41230]" />
                Publicações
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {news.map((item) => (
                  <NewsCard key={item.id} {...item} />
                ))}
              </div>
            </section>
          </div>

          <aside className="hidden lg:block w-64 flex-shrink-0" aria-label="Temas">
            <div className="sticky top-40 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Navegação</h2>
              <ul className="space-y-1.5">
                {themes.map((t) => (
                  <li key={t.slug}>
                    <Link
                      to={`/temas/${t.slug}/`}
                      aria-current={t.slug === theme.slug ? "page" : undefined}
                      className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${
                        t.slug === theme.slug ? "bg-red-50 text-[#C41230] font-semibold" : "text-gray-600 hover:text-[#C41230] hover:bg-red-50"
                      }`}
                    >
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
