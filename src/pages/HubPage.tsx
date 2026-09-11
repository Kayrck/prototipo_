import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import NewsCard from "../components/NewsCard";
import { newsItems, documents } from "../data/content";
import { Link } from "react-router-dom";

interface HubConfig {
  title: string;
  subtitle: string;
  description: string;
  breadcrumb: string;
  breadcrumbParent?: { label: string; href: string };
  color: string;
  icon: string;
  sections: HubSection[];
}

interface HubSection {
  type: "news" | "links" | "docs" | "info" | "cards";
  title: string;
  items?: { label: string; href: string; desc?: string; icon?: string }[];
  newsCategory?: string;
  docType?: string;
  content?: string;
}

const hubConfigs: Record<string, HubConfig> = {
  "/juridico/": {
    title: "Jurídico",
    subtitle: "Assessoria jurídica para servidores",
    description: "O SINTFUB oferece suporte jurídico nas áreas trabalhista e cível para todos os filiados. Consulte as categorias abaixo para acessar informativos, decisões e orientações legais.",
    breadcrumb: "Jurídico",
    color: "#C41230",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
    sections: [
      {
        type: "cards",
        title: "Áreas de atuação",
        items: [
          { label: "Jurídico Trabalhista", href: "/category/juridico-trabalhista/", desc: "Defesa dos direitos laborais, acordos coletivos, rescisões e demandas trabalhistas.", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
          { label: "Jurídico Cível", href: "/category/juridico-civel/", desc: "Assessoria em demandas cíveis, família e criminal para filiados e dependentes.", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
        ],
      },
      {
        type: "info",
        title: "Como acessar o atendimento jurídico",
        content: "Filiados ao SINTFUB têm direito a consultas jurídicas nas áreas trabalhista e cível. Para agendar atendimento, entre em contato com o departamento jurídico pelos canais disponíveis na página de contato ou pelo WhatsApp.",
      },
      {
        type: "links",
        title: "Links úteis",
        items: [
          { label: "Contato: Departamento Jurídico", href: "/contato/" },
          { label: "WhatsApp Jurídico", href: "/contato/" },
          { label: "Transparência", href: "/category/transparencia/" },
        ],
      },
    ],
  },
  "/category/juridico-trabalhista/": {
    title: "Jurídico Trabalhista",
    subtitle: "Defesa dos seus direitos laborais",
    description: "Publicações, orientações e informações sobre direitos trabalhistas dos servidores da FUB. O SINTFUB atua na defesa dos interesses coletivos e individuais dos trabalhadores.",
    breadcrumb: "Jurídico Trabalhista",
    breadcrumbParent: { label: "Jurídico", href: "/juridico/" },
    color: "#C41230",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    sections: [
      { type: "news", title: "Publicações", newsCategory: "juridico-trabalhista" },
    ],
  },
  "/category/juridico-civel/": {
    title: "Jurídico Cível",
    subtitle: "Assessoria em demandas civis",
    description: "Informações e orientações sobre direitos cíveis para filiados ao SINTFUB.",
    breadcrumb: "Jurídico Cível",
    breadcrumbParent: { label: "Jurídico", href: "/juridico/" },
    color: "#C41230",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    sections: [
      { type: "news", title: "Publicações", newsCategory: "juridico-civel" },
    ],
  },
  "/category/transparencia/": {
    title: "Transparência",
    subtitle: "Gestão transparente ao alcance de todos",
    description: "O SINTFUB compromete-se com a transparência na gestão dos recursos e nas ações da diretoria. Acesse os documentos financeiros, prestações de contas e informações sobre os órgãos de controle.",
    breadcrumb: "Transparência",
    color: "#1D4ED8",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    sections: [
      {
        type: "cards",
        title: "Áreas de transparência",
        items: [
          { label: "Prestação de Contas", href: "/category/transparencia/prestacao-de-contas/", desc: "Relatórios financeiros e prestação de contas da gestão.", icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" },
          { label: "Contratos e Convênios", href: "/contratos-convenios/", desc: "Contratos firmados e convênios ativos do SINTFUB.", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
          { label: "Conselho Fiscal", href: "/quem-somos/conselho-fiscal/", desc: "Composição e atas do Conselho Fiscal.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
          { label: "Comissão de Ética", href: "/category/comissao-de-etica/", desc: "Regimento e informações da Comissão de Ética.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        ],
      },
      { type: "docs", title: "Documentos recentes", docType: "Transparência" },
    ],
  },
  "/category/aposentado/": {
    title: "Aposentados",
    subtitle: "Informações e suporte aos servidores aposentados",
    description: "O SINTFUB representa e apoia os servidores aposentados da FUB. Acesse notícias, orientações sobre benefícios previdenciários e os canais de atendimento disponíveis.",
    breadcrumb: "Aposentados",
    color: "#059669",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    sections: [
      {
        type: "cards",
        title: "Serviços para aposentados",
        items: [
          { label: "Notícias para aposentados", href: "/category/aposentado/", desc: "Informativos e publicações específicas para aposentados.", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" },
          { label: "Filiação de aposentados", href: "/filie-se/", desc: "O formulário de filiação atende ativos e aposentados.", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
          { label: "Jurídico para aposentados", href: "/juridico/", desc: "Assessoria em revisão de benefícios e questões previdenciárias.", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1" },
          { label: "Contato", href: "/contato/", desc: "Fale com o SINTFUB pelos canais disponíveis.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        ],
      },
      { type: "news", title: "Publicações para aposentados", newsCategory: "aposentados" },
      {
        type: "info",
        title: "Informação importante",
        content: "A situação 'Aposentado' está disponível no formulário de filiação (campo Ativo/Aposentado). O mesmo formulário atende servidores ativos e aposentados da FUB.",
      },
    ],
  },
  "/contratos-convenios/": {
    title: "Contratos e Convênios",
    subtitle: "Parcerias e benefícios exclusivos para filiados",
    description: "O SINTFUB firma contratos e convênios para oferecer benefícios exclusivos aos seus filiados. Confira as parcerias ativas.",
    breadcrumb: "Contratos e Convênios",
    breadcrumbParent: { label: "Transparência", href: "/category/transparencia/" },
    color: "#C41230",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    sections: [
      {
        type: "info",
        title: "Convênios ativos",
        content: "Esta seção lista os convênios e contratos atualmente ativos do SINTFUB. O conteúdo é gerenciado pela secretaria e atualizado conforme novos acordos são firmados.",
      },
      {
        type: "cards",
        title: "Acesso rápido",
        items: [
          { label: "Filie-se para ter acesso", href: "/filie-se/", desc: "Os benefícios são exclusivos para filiados ao SINTFUB.", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
          { label: "Fale com a Secretaria", href: "/contato/", desc: "Tire dúvidas sobre os convênios disponíveis.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        ],
      },
    ],
  },
};

export default function HubPage() {
  const { pathname } = useLocation();
  const config = hubConfigs[pathname] || hubConfigs["/juridico/"];

  const breadcrumbItems = config.breadcrumbParent
    ? [config.breadcrumbParent, { label: config.breadcrumb }]
    : [{ label: config.breadcrumb }];

  const filteredNews = newsItems.filter(
    (item) => !config.sections.some((s) => s.newsCategory && s.newsCategory !== item.categorySlug)
  );

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero */}
      <div className="py-12 border-b border-gray-100" style={{ background: `linear-gradient(135deg, ${config.color}08 0%, white 60%)` }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${config.color}15` }}>
              <svg className="w-8 h-8" style={{ color: config.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: config.color }}>
                {config.subtitle}
              </p>
              <h1 className="text-2xl lg:text-4xl font-black text-gray-900 mb-3 font-[family-name:var(--font-display)]">
                {config.title}
              </h1>
              <p className="text-gray-600 text-base leading-relaxed max-w-2xl">{config.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12 space-y-14">
        {config.sections.map((section, i) => {
          if (section.type === "cards" && section.items) {
            return (
              <section key={i} aria-labelledby={`section-${i}`}>
                <h2 id={`section-${i}`} className="text-xl font-black text-gray-900 mb-6 font-[family-name:var(--font-display)] flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full" style={{ backgroundColor: config.color }} />
                  {section.title}
                </h2>
                <div className={`grid gap-4 ${section.items.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}`}>
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="group flex flex-col gap-4 p-6 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md rounded-2xl transition-all"
                    >
                      {item.icon && (
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${config.color}12` }}>
                          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" style={{ color: config.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-900 text-base mb-1 font-[family-name:var(--font-display)] group-hover:text-[#C41230] transition-colors">
                          {item.label}
                        </h3>
                        {item.desc && (
                          <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                        )}
                      </div>
                      <div className="mt-auto flex items-center gap-1 text-xs font-semibold" style={{ color: config.color }}>
                        Acessar
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === "news") {
            return (
              <section key={i} aria-labelledby={`section-${i}`}>
                <h2 id={`section-${i}`} className="text-xl font-black text-gray-900 mb-6 font-[family-name:var(--font-display)] flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full" style={{ backgroundColor: config.color }} />
                  {section.title}
                </h2>
                {filteredNews.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((item) => (
                      <NewsCard key={item.id} {...item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Este conteúdo ainda não possui publicações.</p>
                  </div>
                )}
              </section>
            );
          }

          if (section.type === "docs") {
            const filteredDocs = documents.filter((d) => !section.docType || d.type === section.docType);
            return (
              <section key={i} aria-labelledby={`section-${i}`}>
                <h2 id={`section-${i}`} className="text-xl font-black text-gray-900 mb-6 font-[family-name:var(--font-display)] flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full" style={{ backgroundColor: config.color }} />
                  {section.title}
                </h2>
                {filteredDocs.length > 0 ? (
                  <div className="space-y-3">
                    {filteredDocs.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm rounded-xl transition-all"
                      >
                        <div className="w-10 h-10 bg-red-50 group-hover:bg-[#C41230] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                          <svg className="w-5 h-5 text-[#C41230] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 mb-0.5">{doc.date} • {doc.size}</div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-[#C41230] transition-colors">{doc.title}</p>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-[#C41230] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-gray-500 text-sm">Este conteúdo ainda não possui publicações.</p>
                  </div>
                )}
              </section>
            );
          }

          if (section.type === "links" && section.items) {
            return (
              <section key={i} aria-labelledby={`section-${i}`}>
                <h2 id={`section-${i}`} className="text-xl font-black text-gray-900 mb-5 font-[family-name:var(--font-display)] flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full" style={{ backgroundColor: config.color }} />
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#C41230] transition-colors group"
                      >
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-[#C41230] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          if (section.type === "info") {
            return (
              <section key={i}>
                <div className="p-6 rounded-2xl border-l-4" style={{ borderColor: config.color, backgroundColor: `${config.color}06` }}>
                  <h3 className="font-bold text-gray-900 mb-2 font-[family-name:var(--font-display)]">{section.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
