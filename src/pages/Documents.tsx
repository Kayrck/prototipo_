import { Link, Navigate, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import DocRow from "../components/DocRow";
import NotFound from "./NotFound";
import { documents, newsItems } from "../data/content";
import {
  accountsByYear,
  consintfubEditions,
  electionProcesses,
  resolutionAreas,
  type DocLink,
} from "../data/institutional";

type Crumb = { label: string; href?: string };

const pdfIcon = (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

function Shell({
  crumbs,
  title,
  description,
  children,
  aside,
}: {
  crumbs: Crumb[];
  title: string;
  description?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb items={crumbs} />
      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">{title}</h1>
          </div>
          {description && <p className="text-gray-500 text-sm mt-2 ml-4 max-w-3xl">{description}</p>}
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          <div className="flex-1 min-w-0">{children}</div>
          {aside}
        </div>
      </div>
    </div>
  );
}

function LandingCards({ items }: { items: { label: string; desc?: string; href: string; meta?: string }[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            to={item.href}
            className="group flex h-full flex-col gap-3 p-6 bg-white border border-gray-100 hover:border-[#C41230] hover:shadow-md rounded-2xl transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-red-50 group-hover:bg-[#C41230] text-[#C41230] group-hover:text-white flex items-center justify-center transition-colors">
              {pdfIcon}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base font-[family-name:var(--font-display)] group-hover:text-[#C41230] transition-colors">
                {item.label}
              </h2>
              {item.meta && <p className="text-xs font-semibold text-gray-500 mt-0.5">{item.meta}</p>}
              {item.desc && <p className="text-sm text-gray-500 leading-relaxed mt-1.5">{item.desc}</p>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function DocList({ docs }: { docs: DocLink[] }) {
  return (
    <div className="space-y-3">
      {docs.map((doc) => (
        <DocRow key={doc.url} doc={doc} />
      ))}
    </div>
  );
}

function SideNav({ title, items, activeHref }: { title: string; items: { label: string; href: string }[]; activeHref?: string }) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0" aria-label={title}>
      <div className="sticky top-40 bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">{title}</h2>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                aria-current={item.href === activeHref ? "page" : undefined}
                className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${
                  item.href === activeHref ? "bg-red-50 text-[#C41230] font-semibold" : "text-gray-600 hover:text-[#C41230] hover:bg-red-50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

const atas = documents.filter((d) => d.type === "Ata");
const yearOf = (d: { date: string }) => d.date.slice(-4);
const ataYears = Array.from(new Set(atas.map(yearOf))).sort((a, b) => Number(b) - Number(a));

function relatedNews(tag?: string) {
  if (!tag) return [];
  return newsItems.filter((n) => n.tags.some((t) => t.toLowerCase() === tag)).sort((a, b) => b.date.localeCompare(a.date));
}

function NewsLinks({ tag, title }: { tag?: string; title: string }) {
  const list = relatedNews(tag);
  if (list.length === 0) return null;
  return (
    <section className="mt-10" aria-label={title}>
      <h2 className="font-bold text-gray-900 text-base mb-3 font-[family-name:var(--font-display)]">{title}</h2>
      <ul className="space-y-2">
        {list.map((n) => (
          <li key={n.id}>
            <Link to={`/${n.slug}/`} className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 px-4 py-3 bg-white border border-gray-100 hover:border-[#C41230] rounded-xl transition-colors">
              <span className="text-sm font-semibold text-gray-900 group-hover:text-[#C41230] transition-colors">{n.title}</span>
              <span className="text-xs text-gray-500 flex-shrink-0">{n.dateFormatted}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Documents() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  const documentosCrumb: Crumb = { label: "Documentos", href: "/category/documentos/" };

  // Endereços antigos
  if (parts[0] === "atas-de-assembleias-2018") return <Navigate to="/category/documentos/atas/" replace />;
  if (parts[0] === "resolucoes-boletins") return <Navigate to="/category/documentos/resolucoes/" replace />;
  if (parts[0] === "category" && parts[1] === "comissao-de-etica") return <Navigate to="/quem-somos/comissao-de-etica/" replace />;

  /* ---------------------------- Estatuto ---------------------------- */
  if (parts[0] === "estatuto") {
    return (
      <Shell crumbs={[documentosCrumb, { label: "Estatuto" }]} title="Estatuto do SINTFUB" description="Documento normativo máximo do sindicato.">
        <div className="max-w-xl">
          <div className="flex items-start gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="w-16 h-20 bg-[#C41230] rounded-xl flex flex-col items-center justify-center gap-1 flex-shrink-0 text-white">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold">PDF</span>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900 text-lg mb-1 font-[family-name:var(--font-display)]">Estatuto do SINTFUB (vigente)</h2>
              <p className="text-sm text-gray-500 mb-1">Atualizado em 2021 • 6,1 MB</p>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Documento que rege a organização, funcionamento e objetivos do SINTFUB, Sindicato dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília.
              </p>
              <a
                href="https://sintfub.org.br/wp-content/uploads/2021/11/ESTATUTOVIGENTE2021SINTFUB.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
                aria-label="Baixar estatuto do SINTFUB em PDF"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar Estatuto (PDF)
              </a>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  /* ---------------------- Prestação de Contas ----------------------- */
  if (parts[2] === "prestacao-de-contas") {
    const yearNav = accountsByYear.map((y) => ({ label: `Exercício ${y.year}`, href: `#exercicio-${y.year}` }));
    return (
      <Shell
        crumbs={[{ label: "Transparência", href: "/category/transparencia/" }, { label: "Prestação de Contas" }]}
        title="Prestação de Contas"
        description="Editais, relatórios e notícias das prestações de contas, organizados por exercício."
        aside={
          <aside className="hidden lg:block w-64 flex-shrink-0" aria-label="Exercícios">
            <div className="sticky top-40 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Por exercício</h2>
              <ul className="space-y-1.5">
                {yearNav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="block text-sm py-1.5 px-3 rounded-lg text-gray-600 hover:text-[#C41230] hover:bg-red-50 transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        }
      >
        <div className="space-y-12">
          {accountsByYear.map((y) => {
            const posts = y.newsSlugs.map((slug) => newsItems.find((n) => n.slug === slug)).filter((n): n is NonNullable<typeof n> => Boolean(n));
            return (
              <section key={y.year} id={`exercicio-${y.year}`} className="scroll-mt-40" aria-labelledby={`titulo-${y.year}`}>
                <h2 id={`titulo-${y.year}`} className="text-xl font-black text-gray-900 mb-5 font-[family-name:var(--font-display)] flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-[#1D4ED8]" />
                  Exercício {y.year}
                </h2>
                {y.docs.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Documentos</h3>
                    <DocList docs={y.docs} />
                  </div>
                )}
                {posts.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Notícias</h3>
                    <ul className="space-y-2">
                      {posts.map((n) => (
                        <li key={n.id}>
                          <Link to={`/${n.slug}/`} className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 px-4 py-3 bg-white border border-gray-100 hover:border-[#C41230] rounded-xl transition-colors">
                            <span className="text-sm font-semibold text-gray-900 group-hover:text-[#C41230] transition-colors">{n.title}</span>
                            <span className="text-xs text-gray-500 flex-shrink-0">{n.dateFormatted}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </Shell>
    );
  }

  /* ---------------------------- Eleições ---------------------------- */
  if (parts[0] === "category" && parts[1] === "eleicoes") {
    const processNav = electionProcesses.map((p) => ({ label: p.label, href: `/category/eleicoes/${p.slug}/` }));
    if (!parts[2]) {
      return (
        <Shell
          crumbs={[documentosCrumb, { label: "Eleições" }]}
          title="Eleições"
          description="Editais, regimentos, resultados e publicações dos processos eleitorais do SINTFUB e das representações da categoria na UnB."
        >
          <LandingCards items={processNav.map((n, i) => ({ label: n.label, href: n.href, desc: electionProcesses[i].summary }))} />
        </Shell>
      );
    }
    const process = electionProcesses.find((p) => p.slug === parts[2]);
    if (!process) return <NotFound />;
    return (
      <Shell
        crumbs={[documentosCrumb, { label: "Eleições", href: "/category/eleicoes/" }, { label: process.label }]}
        title={process.label}
        description={process.summary}
        aside={<SideNav title="Processos eleitorais" items={processNav} activeHref={`/category/eleicoes/${process.slug}/`} />}
      >
        {process.docs.length > 0 && <DocList docs={process.docs} />}
        <NewsLinks tag={process.tag} title="Publicações" />
      </Shell>
    );
  }

  if (parts[0] !== "category" || parts[1] !== "documentos") return <NotFound />;

  /* --------------------------- Documentos --------------------------- */
  if (!parts[2]) {
    return (
      <Shell
        crumbs={[{ label: "Documentos" }]}
        title="Documentos"
        description="Estatuto, atas, documentos dos congressos, eleições e resoluções."
      >
        <LandingCards
          items={[
            { label: "Estatuto", href: "/estatuto/", desc: "Documento que rege a organização, o funcionamento e os objetivos do SINTFUB." },
            { label: "Atas", href: "/category/documentos/atas/", desc: "Atas das Assembleias Gerais, organizadas por ano." },
            { label: "CONSINTFUB", href: "/category/documentos/consintfub/", desc: "Congresso do SINTFUB: programação, materiais e publicações de cada edição." },
            { label: "Eleições", href: "/category/eleicoes/", desc: "Editais, regimentos e resultados dos processos eleitorais." },
            { label: "Resoluções", href: "/category/documentos/resolucoes/", desc: "Resoluções do SINTFUB, da UnB e do MGI." },
          ]}
        />
      </Shell>
    );
  }

  /* ------------------------------ Atas ------------------------------ */
  if (parts[2] === "atas") {
    const yearNav = ataYears.map((y) => ({ label: `Atas de ${y}`, href: `/category/documentos/atas/${y}/` }));
    if (!parts[3]) {
      return (
        <Shell
          crumbs={[documentosCrumb, { label: "Atas" }]}
          title="Atas"
          description="Atas das Assembleias Gerais do SINTFUB. Escolha o ano para acessar os documentos em PDF."
        >
          <LandingCards
            items={ataYears.map((y) => {
              const count = atas.filter((d) => yearOf(d) === y).length;
              return { label: y, href: `/category/documentos/atas/${y}/`, meta: `${count} ${count === 1 ? "ata" : "atas"} em PDF` };
            })}
          />
        </Shell>
      );
    }
    const year = parts[3];
    const list = atas.filter((d) => yearOf(d) === year);
    if (list.length === 0) return <NotFound />;
    return (
      <Shell
        crumbs={[documentosCrumb, { label: "Atas", href: "/category/documentos/atas/" }, { label: year }]}
        title={`Atas de ${year}`}
        description="Atas das Assembleias Gerais em PDF."
        aside={<SideNav title="Anos" items={yearNav} activeHref={`/category/documentos/atas/${year}/`} />}
      >
        <DocList docs={list.map((d) => ({ ...d, note: d.description }))} />
      </Shell>
    );
  }

  /* --------------------------- CONSINTFUB --------------------------- */
  if (parts[2] === "consintfub") {
    const editionNav = consintfubEditions.map((e) => ({ label: e.label, href: `/category/documentos/consintfub/${e.slug}/` }));
    if (!parts[3]) {
      return (
        <Shell
          crumbs={[documentosCrumb, { label: "CONSINTFUB" }]}
          title="CONSINTFUB"
          description="O CONSINTFUB é o Congresso do SINTFUB. A cada edição, a categoria elege delegadas e delegados, que debatem teses e a conjuntura, aprovam o regimento interno e definem o plano de lutas do sindicato."
        >
          <LandingCards
            items={consintfubEditions.map((e) => ({ label: e.label, href: `/category/documentos/consintfub/${e.slug}/`, meta: e.when, desc: e.summary }))}
          />
        </Shell>
      );
    }
    const edition = consintfubEditions.find((e) => e.slug === parts[3]);
    if (!edition) return <NotFound />;
    return (
      <Shell
        crumbs={[documentosCrumb, { label: "CONSINTFUB", href: "/category/documentos/consintfub/" }, { label: edition.label }]}
        title={edition.label}
        description={`${edition.when}. ${edition.summary}`}
        aside={<SideNav title="Edições" items={editionNav} activeHref={`/category/documentos/consintfub/${edition.slug}/`} />}
      >
        {edition.docs.length > 0 && <DocList docs={edition.docs} />}
        <NewsLinks tag={edition.tag} title="Publicações" />
        {edition.legacyUrl && (
          <a
            href={edition.legacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 p-5 bg-white border border-gray-100 hover:border-[#C41230] rounded-xl transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#C41230] transition-colors">Materiais e publicações desta edição</p>
              <p className="text-xs text-gray-500 mt-0.5">Disponíveis no site atual do SINTFUB (sintfub.org.br)</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-[#C41230] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </Shell>
    );
  }

  /* --------------------------- Resoluções --------------------------- */
  if (parts[2] === "resolucoes") {
    const areaNav = resolutionAreas.map((a) => ({ label: a.label, href: `/category/documentos/resolucoes/${a.slug}/` }));
    if (!parts[3]) {
      return (
        <Shell
          crumbs={[documentosCrumb, { label: "Resoluções" }]}
          title="Resoluções"
          description="Resoluções e normas organizadas por origem: SINTFUB, UnB e MGI."
        >
          <LandingCards
            items={resolutionAreas.map((a) => ({
              label: a.label,
              href: `/category/documentos/resolucoes/${a.slug}/`,
              desc: a.summary,
              meta: `${a.docs.length} ${a.docs.length === 1 ? "documento" : "documentos"}`,
            }))}
          />
        </Shell>
      );
    }
    const area = resolutionAreas.find((a) => a.slug === parts[3]);
    if (!area) return <NotFound />;
    return (
      <Shell
        crumbs={[documentosCrumb, { label: "Resoluções", href: "/category/documentos/resolucoes/" }, { label: area.label }]}
        title={area.label}
        description={area.summary}
        aside={<SideNav title="Resoluções" items={areaNav} activeHref={`/category/documentos/resolucoes/${area.slug}/`} />}
      >
        <DocList docs={area.docs} />
      </Shell>
    );
  }

  return <NotFound />;
}
