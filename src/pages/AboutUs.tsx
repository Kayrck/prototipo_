import Breadcrumb from "../components/Breadcrumb";
import { Link, Navigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import {
  TAE_FUB,
  boardGroups,
  boardPhotos,
  substituteBody,
  fiscalCouncil,
  previousBoard,
  consintfubEditions,
  sectors,
} from "../data/institutional";
import { documents } from "../data/content";

interface PageDef {
  slug: string;
  label: string;
  href: string;
}

// Navegação lateral da seção SINTFUB (mesma estrutura do menu superior).
const pages: PageDef[] = [
  { slug: "", label: "Quem Somos", href: "/quem-somos/" },
  { slug: "coordenacao-executiva", label: "Coordenação Executiva", href: "/quem-somos/coordenacao-executiva/" },
  { slug: "conselho-de-representantes", label: "Conselho de Representantes", href: "/quem-somos/conselho-de-representantes/" },
  { slug: "conselho-fiscal", label: "Conselho Fiscal", href: "/quem-somos/conselho-fiscal/" },
  { slug: "comissao-de-etica", label: "Comissão de Ética", href: "/quem-somos/comissao-de-etica/" },
  { slug: "corpo-administrativo", label: "Corpo Administrativo", href: "/quem-somos/corpo-administrativo/" },
  { slug: "memoria-sindical", label: "Memória Sindical", href: "/quem-somos/memoria-sindical/" },
];

// Endereços antigos que foram reorganizados.
const legacyRedirects: Record<string, string> = {
  "historia": "/quem-somos/#historia",
  "missao": "/quem-somos/#missao",
  "agenda-da-coordenacao-executiva": "/agenda/",
};

const nameParticles = new Set(["de", "da", "do", "dos", "das", "e"]);

function initials(name: string) {
  const parts = name.split(/\s+/).filter((p) => !nameParticles.has(p.toLowerCase()));
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function PersonCard({ name, role }: { name: string; role?: string }) {
  const photo = boardPhotos[name];
  return (
    <li className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl">
      {photo ? (
        <img src={photo} alt={`Foto de ${name}`} className="w-16 h-16 rounded-full object-cover object-[50%_20%] flex-shrink-0 bg-gray-100" loading="lazy" />
      ) : (
        <div
          aria-hidden="true"
          className="w-16 h-16 rounded-full bg-red-50 text-[#C41230] font-black text-base flex items-center justify-center flex-shrink-0 font-[family-name:var(--font-display)]"
        >
          {initials(name)}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-snug">{name}</p>
        {role && <p className="text-xs text-gray-500 mt-0.5">{role}</p>}
      </div>
    </li>
  );
}

function NameList({ names }: { names: string[] }) {
  return (
    <ul className="space-y-2">
      {names.map((name) => (
        <li key={name} className="text-gray-700 text-sm py-2 px-4 bg-gray-50 rounded-lg">{name}</li>
      ))}
    </ul>
  );
}

const h2 = "font-bold text-gray-900 text-base mb-3 font-[family-name:var(--font-display)]";

export default function AboutUs() {
  const { slug = "" } = useParams();

  if (legacyRedirects[slug]) return <Navigate to={legacyRedirects[slug]} replace />;

  const current = pages.find((p) => p.slug === slug);
  if (!current) return <NotFound />;

  const etica = documents.find((d) => d.title.includes("Ética"));
  const wideLayout = slug === "coordenacao-executiva";

  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb
        items={
          slug
            ? [{ label: "SINTFUB", href: "/quem-somos/" }, { label: current.label }]
            : [{ label: "SINTFUB" }]
        }
      />

      {/* Hero */}
      <div className="py-12 border-b border-gray-100" style={{ background: "linear-gradient(135deg, #C4123008 0%, white 60%)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#C4123015" }}>
              <svg className="w-8 h-8 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#C41230]">SINTFUB</p>
              <h1 className="text-2xl lg:text-4xl font-black text-gray-900 font-[family-name:var(--font-display)]">
                {current.label}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          <div className={`flex-1 min-w-0 ${wideLayout ? "" : "max-w-3xl"}`}>
            {/* Navegação compacta para telas sem a barra lateral */}
            <nav className="lg:hidden -mx-6 px-6 mb-8 overflow-x-auto" aria-label="Navegação do SINTFUB">
              <ul className="flex gap-2 w-max pb-1">
                {pages.map((p) => (
                  <li key={p.href}>
                    <Link
                      to={p.href}
                      aria-current={p.slug === slug ? "page" : undefined}
                      className={`block whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                        p.slug === slug
                          ? "bg-[#C41230] border-[#C41230] text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-[#C41230] hover:text-[#C41230]"
                      }`}
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {slug === "coordenacao-executiva" ? (
              <div className="space-y-10">
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  A Coordenação Executiva 2026-2029, da chapa "Renovação e Luta", tomou posse em 2 de janeiro de 2026, no Auditório Antônio Rodrigues, sede do SINTFUB. Conheça quem representa os {TAE_FUB} nas 12 coordenações do sindicato.
                </p>
                {boardGroups.map((group) => (
                  <section key={group.title} aria-labelledby={`grupo-${group.title}`}>
                    <h2 id={`grupo-${group.title}`} className={h2}>{group.title}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {group.people.map((name) => (
                        <PersonCard key={name} name={name} />
                      ))}
                    </ul>
                  </section>
                ))}
                <section aria-labelledby="corpo-suplente">
                  <h2 id="corpo-suplente" className={h2}>Corpo Suplente</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {substituteBody.map((name) => (
                      <PersonCard key={name} name={name} />
                    ))}
                  </ul>
                </section>
              </div>
            ) : slug === "conselho-de-representantes" ? (
              <div className="space-y-8">
                <p className="text-gray-700 leading-relaxed">
                  O Conselho de Representantes é a instância que aprova os calendários eleitorais, homologa as chapas candidatas e aprova as prestações de contas do SINTFUB. Reúne-se no Auditório Antônio Rodrigues, na sede do sindicato.
                </p>
                <div>
                  <h2 className={h2}>Eleições 2026-2029</h2>
                  <ul className="space-y-2">
                    <li className="text-gray-700 text-sm py-2 px-4 bg-gray-50 rounded-lg">30/09/2025 — Homologação das chapas: 2 concorrendo à Coordenação Executiva e 9 candidatos ao Conselho Fiscal</li>
                    <li className="text-gray-700 text-sm py-2 px-4 bg-gray-50 rounded-lg">06/10 a 04/11/2025 — Período de campanha eleitoral</li>
                    <li className="text-gray-700 text-sm py-2 px-4 bg-gray-50 rounded-lg">05 e 06/11/2025 — Votação (6h às 20h nos setores BCE, HUB e DISEG; 8h às 18h nos demais)</li>
                  </ul>
                </div>
              </div>
            ) : slug === "conselho-fiscal" ? (
              <div className="space-y-8">
                <p className="text-gray-600 text-sm">Composição do Conselho Fiscal para a gestão 2026/2029.</p>
                <div>
                  <h2 className={h2}>Titulares</h2>
                  <NameList names={fiscalCouncil.titulares} />
                </div>
                <div>
                  <h2 className={h2}>Suplentes</h2>
                  <NameList names={fiscalCouncil.suplentes} />
                </div>
              </div>
            ) : slug === "comissao-de-etica" ? (
              <div className="space-y-8">
                <p className="text-gray-700 leading-relaxed">Regimento e resoluções da Comissão de Ética do SINTFUB.</p>
                {etica && (
                  <a
                    href={etica.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-5 p-6 bg-white border border-gray-200 hover:border-[#C41230] hover:shadow-sm rounded-2xl transition-all"
                  >
                    <div className="w-16 h-20 bg-gray-700 group-hover:bg-[#C41230] rounded-xl flex flex-col items-center justify-center gap-1 flex-shrink-0 transition-colors">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-white text-xs font-bold">PDF</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-700 text-white">{etica.type}</span>
                      <h2 className="font-bold text-gray-900 text-lg mt-2 mb-1 font-[family-name:var(--font-display)] group-hover:text-[#C41230] transition-colors">
                        {etica.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-1">{etica.date} • {etica.size}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 group-hover:text-[#C41230] transition-colors mt-2">
                        Baixar PDF
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </span>
                    </div>
                  </a>
                )}
              </div>
            ) : slug === "corpo-administrativo" ? (
              <div className="space-y-8">
                <p className="text-gray-700 leading-relaxed">
                  O SINTFUB conta com setores de atendimento para receber e orientar os {TAE_FUB}. Fale diretamente com o setor responsável pelo seu assunto.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sectors.map((sector) => (
                    <li key={sector.slug} className="p-5 bg-white border border-gray-100 rounded-2xl">
                      <h2 className="font-bold text-gray-900 text-base font-[family-name:var(--font-display)]">{sector.label}</h2>
                      <p className="text-sm text-gray-500 mt-1 mb-3">{sector.description}</p>
                      <div className="space-y-1.5 text-sm">
                        <a href={`https://api.whatsapp.com/send?phone=${sector.phone}`} target="_blank" rel="noopener noreferrer" className="block text-gray-700 hover:text-[#C41230] transition-colors">
                          WhatsApp: {sector.phoneDisplay}
                        </a>
                        <a href={`mailto:${sector.email}`} className="block text-gray-700 hover:text-[#C41230] transition-colors break-all">
                          {sector.email}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500">
                  Endereço e demais canais de atendimento na página de{" "}
                  <Link to="/contato/" className="text-[#C41230] font-semibold hover:underline">Contato</Link>.
                </p>
              </div>
            ) : slug === "memoria-sindical" ? (
              <div className="space-y-10">
                <p className="text-gray-700 leading-relaxed">
                  A trajetória do SINTFUB é marcada por congressos (CONSINTFUB), assembleias, greves e pelas coordenações que conduziram o sindicato ao longo de mais de três décadas de atuação. Esta página reúne registros dessa memória.
                </p>

                <section aria-labelledby="gestoes-anteriores">
                  <h2 id="gestoes-anteriores" className={h2}>Coordenações anteriores</h2>
                  <details className="group bg-white border border-gray-100 rounded-2xl">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-3 px-5 py-4 font-semibold text-gray-900 text-sm">
                      {previousBoard.period}
                      <svg className="w-4 h-4 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 space-y-4">
                      {previousBoard.groups.map((group) => (
                        <div key={group.title}>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">{group.title}</h3>
                          <p className="text-sm text-gray-700 leading-relaxed">{group.people.join(" · ")}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                  <p className="text-sm text-gray-500 mt-3">
                    A gestão atual está na página da{" "}
                    <Link to="/quem-somos/coordenacao-executiva/" className="text-[#C41230] font-semibold hover:underline">Coordenação Executiva</Link>.
                  </p>
                </section>

                <section aria-labelledby="congressos">
                  <h2 id="congressos" className={h2}>Congressos (CONSINTFUB)</h2>
                  <ul className="space-y-2">
                    {consintfubEditions.map((edition) => (
                      <li key={edition.slug}>
                        <Link
                          to={`/category/documentos/consintfub/${edition.slug}/`}
                          className="flex items-center justify-between gap-3 text-sm py-2.5 px-4 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors group"
                        >
                          <span className="text-gray-800 font-semibold group-hover:text-[#C41230]">{edition.label}</span>
                          <span className="text-gray-500 text-xs text-right">{edition.when}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="registros">
                  <h2 id="registros" className={h2}>Registros históricos</h2>
                  <a
                    href="https://www.youtube.com/watch?v=C0cU4hLx398"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-300 rounded-xl transition-all"
                  >
                    <img src="/img/video-memorial-greve.jpg" alt="" aria-hidden="true" className="w-28 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#C41230] transition-colors">Memorial da Greve de 2024</p>
                      <p className="text-xs text-gray-500 mt-0.5">Vídeo no canal do SINTFUB no YouTube</p>
                    </div>
                  </a>
                </section>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                  {[
                    { value: "1985", label: "Ano de fundação" },
                    { value: "12", label: "Coordenações" },
                    { value: "6", label: "Conselheiros fiscais" },
                    { value: "2", label: "Centrais/federações filiadas" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-5 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="text-2xl font-black text-[#C41230] font-[family-name:var(--font-display)]">{stat.value}</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="prose prose-gray max-w-none">
                  <p className="text-lg font-medium text-gray-800 leading-relaxed mb-6">
                    O SINTFUB, Sindicato dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília, é a entidade representativa dos {TAE_FUB}, da ativa e aposentados, no campus da Universidade de Brasília.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Há mais de três décadas o SINTFUB coloca em prática sua missão, visão e valores. Por meio de greves, acordos, manifestações e interlocução com diferentes atores da vida política brasileira, o sindicato tem sido protagonista na manutenção e conquista de direitos, informando e representando a categoria.
                  </p>
                </div>

                <section id="historia" className="mt-10 scroll-mt-32" aria-labelledby="titulo-historia">
                  <h2 id="titulo-historia" className="font-bold text-gray-900 text-lg mb-6 font-[family-name:var(--font-display)]">História</h2>
                  <div className="space-y-6">
                    {[
                      { year: "1985", text: "Início do Sindicato com a concepção da Associação dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília (ATA-FUB)." },
                      { year: "1992", text: "Mudança estatutária adota a denominação de Sindicato (SINTFUB); filiação à Central Única dos Trabalhadores (CUT) e à FASUBRA." },
                      { year: "1999", text: "Consolidação da denominação Sindicato dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília, com ampliação do alcance da entidade para abranger também aposentados, terceirizados e pensionistas." },
                    ].map((item, idx, arr) => (
                      <div key={item.year} className="flex gap-4">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-red-50 text-[#C41230] font-black text-xs flex items-center justify-center font-[family-name:var(--font-display)]">
                            {item.year}
                          </div>
                          {idx < arr.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-1" />}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed pb-6">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="missao" className="mt-6 scroll-mt-32 space-y-6" aria-labelledby="titulo-missao">
                  <h2 id="titulo-missao" className="font-bold text-gray-900 text-lg font-[family-name:var(--font-display)]">Missão, visão e valores</h2>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5 font-[family-name:var(--font-display)]">Missão</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Desenvolver continuamente políticas estratégicas de negociação com o objetivo de garantir a representação, a defesa, o aperfeiçoamento e a integridade dos trabalhadores da Fundação Universidade de Brasília, perante as autoridades administrativas e jurídicas, visando o fortalecimento do sistema educacional do Brasil, em benefício da sociedade.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5 font-[family-name:var(--font-display)]">Visão</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Ser reconhecido como entidade essencial e de vanguarda na representação e no aperfeiçoamento dos trabalhadores da Fundação Universidade de Brasília.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5 font-[family-name:var(--font-display)]">Valor</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">Ética: atuar segundo os preceitos estatutários da entidade.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5 font-[family-name:var(--font-display)]">Liderança</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">Conduzir com habilidade as ações institucionais para o cumprimento dos objetivos da entidade.</p>
                  </div>
                </section>
              </>
            )}
          </div>

          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-40 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Navegação</h2>
              <ul className="space-y-2">
                {pages.map((p) => (
                  <li key={p.href}>
                    <Link
                      to={p.href}
                      aria-current={p.slug === slug ? "page" : undefined}
                      className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${p.slug === slug ? "bg-red-50 text-[#C41230] font-semibold" : "text-gray-600 hover:text-[#C41230] hover:bg-red-50"}`}
                    >
                      {p.label}
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
