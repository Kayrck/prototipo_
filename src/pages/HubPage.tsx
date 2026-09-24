import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import NewsCard from "../components/NewsCard";
import DocRow from "../components/DocRow";
import NotFound from "./NotFound";
import { newsItems } from "../data/content";
import { TAE_FUB, WHATSAPP_CHANNEL_URL, partners, sectors, signedTerms, type DocLink } from "../data/institutional";

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
  type: "news" | "links" | "docs" | "info" | "cards" | "faq" | "stats" | "gallery" | "steps" | "alert" | "partners" | "contacts";
  title: string;
  items?: { label: string; href: string; desc?: string; icon?: string }[];
  newsCategory?: string;
  newsTag?: string;
  docs?: DocLink[];
  content?: string;
  faqs?: { q: string; a: string }[];
  stats?: { value: string; label: string }[];
  images?: { src: string; caption: string }[];
  steps?: { title: string; desc: string }[];
  action?: { label: string; href: string };
  sectorSlugs?: string[];
}

const ICON = {
  scale: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  briefcase: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  doc: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  receipt: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z",
  people: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  userPlus: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  play: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  gift: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
  hospital: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  megaphone: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
};

const juridicoPubCount = newsItems.filter((n) => n.categorySlug === "juridico-trabalhista" || n.categorySlug === "juridico-civel").length;

const hubConfigs: Record<string, HubConfig> = {
  "/juridico/": {
    title: "Jurídico",
    subtitle: "Assessoria jurídica para filiados do SINTFUB",
    description: "Orientação e atendimento jurídico aos filiados nas áreas trabalhista, cível, de família e dos juizados especiais.",
    breadcrumb: "Jurídico",
    color: "#C41230",
    icon: ICON.scale,
    sections: [
      {
        type: "stats",
        title: "",
        stats: [
          { value: "4", label: "Áreas de plantão" },
          { value: "2", label: "Locais de plantão: sede e subsede HUB" },
          { value: String(juridicoPubCount), label: "Publicações jurídicas" },
        ],
      },
      {
        type: "info",
        title: "Atendimento jurídico aos filiados",
        content:
          "Filiados ao SINTFUB têm direito ao atendimento prestado pelos escritórios de advocacia que oferecem assessoria jurídica ao sindicato. Os plantões nas áreas trabalhista, cível, de família e dos juizados especiais acontecem na sede do SINTFUB, no Campus Darcy Ribeiro, e na subsede do HUB. O agendamento deve ser realizado pelos canais disponíveis na página de Contato ou pelo WhatsApp.",
        action: { label: "Agendar pelo Contato", href: "/contato/" },
      },
      {
        type: "gallery",
        title: "Calendário de plantões jurídicos",
        images: [
          { src: "/img/plantao-juridico-trabalhista.jpg", caption: "Plantão Jurídico Trabalhista" },
          { src: "/img/plantao-juridico-familia.jpg", caption: "Plantão Jurídico Cível, Família e Juizados Especiais" },
        ],
      },
      {
        type: "cards",
        title: "Áreas de atuação",
        items: [
          { label: "Jurídico Trabalhista", href: "/category/juridico-trabalhista/", desc: "Defesa dos direitos laborais, acordos coletivos, rescisões e demandas trabalhistas. Assessoria: Wagner Advogados Associados.", icon: ICON.briefcase },
          { label: "Jurídico Cível", href: "/category/juridico-civel/", desc: "Demandas cíveis, de família e dos juizados especiais, incluindo crimes de menor potencial ofensivo.", icon: ICON.doc },
        ],
      },
      {
        type: "cards",
        title: "Vídeo: orientações jurídicas",
        items: [
          { label: "Jurídico do SINTFUB faz esclarecimentos sobre a URP/89", href: "https://www.youtube.com/watch?v=KKazZ1_w7dc", desc: "Assista no canal do SINTFUB no YouTube.", icon: ICON.play },
        ],
      },
      {
        type: "faq",
        title: "Perguntas frequentes",
        faqs: [
          { q: "Quem tem direito ao atendimento jurídico?", a: "Filiados ao SINTFUB têm direito ao atendimento prestado pelos escritórios de advocacia que oferecem assessoria jurídica ao sindicato." },
          { q: "Quais áreas são atendidas?", a: "Os plantões acontecem nas áreas trabalhista, cível, de família e dos juizados especiais (crimes de menor potencial ofensivo)." },
          { q: "Onde acontecem os plantões?", a: "Na sede do SINTFUB, no Campus Darcy Ribeiro, e na subsede do HUB, conforme a escala de cada área." },
          { q: "Como agendar um atendimento?", a: "Pelos canais disponíveis na página de Contato ou pelo WhatsApp do SINTFUB." },
        ],
      },
      {
        type: "links",
        title: "Links úteis",
        items: [
          { label: "Site da Assessoria Jurídica Trabalhista (Wagner Advogados)", href: "https://wagner.adv.br/" },
          { label: "Contato: Departamento Jurídico", href: "/contato/" },
          { label: "WhatsApp Jurídico", href: "https://api.whatsapp.com/send?phone=5561992322081" },
          { label: "Subsede HUB", href: "/hub/" },
        ],
      },
    ],
  },
  "/category/juridico-trabalhista/": {
    title: "Jurídico Trabalhista",
    subtitle: "Assessoria jurídica para filiados do SINTFUB",
    description: `Publicações, orientações e informações sobre direitos trabalhistas dos ${TAE_FUB}. O SINTFUB atua na defesa dos interesses coletivos e individuais dos trabalhadores.`,
    breadcrumb: "Jurídico Trabalhista",
    breadcrumbParent: { label: "Jurídico", href: "/juridico/" },
    color: "#C41230",
    icon: ICON.briefcase,
    sections: [
      {
        type: "gallery",
        title: "Calendário de plantões",
        images: [{ src: "/img/plantao-juridico-trabalhista.jpg", caption: "Plantão Jurídico Trabalhista" }],
      },
      {
        type: "cards",
        title: "Temas relacionados",
        items: [
          { label: "URP", href: "/temas/urp/", desc: "Notícias, documentos e materiais sobre a URP/89.", icon: ICON.doc },
          { label: "Carreira", href: "/temas/carreira/", desc: "RSC, PCCTAE, licença-prêmio e demais direitos da carreira.", icon: ICON.briefcase },
        ],
      },
      { type: "news", title: "Publicações", newsCategory: "juridico-trabalhista" },
    ],
  },
  "/category/juridico-civel/": {
    title: "Jurídico Cível",
    subtitle: "Assessoria jurídica para filiados do SINTFUB",
    description: "Informações e orientações sobre demandas cíveis, de família e dos juizados especiais para filiados ao SINTFUB.",
    breadcrumb: "Jurídico Cível",
    breadcrumbParent: { label: "Jurídico", href: "/juridico/" },
    color: "#C41230",
    icon: ICON.doc,
    sections: [
      {
        type: "gallery",
        title: "Calendário de plantões",
        images: [{ src: "/img/plantao-juridico-familia.jpg", caption: "Plantão Jurídico Cível, Família e Juizados Especiais" }],
      },
      { type: "news", title: "Publicações", newsCategory: "juridico-civel" },
    ],
  },
  "/category/transparencia/": {
    title: "Transparência",
    subtitle: "Gestão transparente ao alcance de todos",
    description:
      "Acesse os documentos financeiros, prestações de contas e informações sobre os órgãos de controle. SINTFUB atuando com transparência na gestão dos recursos e nas ações da diretoria.",
    breadcrumb: "Transparência",
    color: "#1D4ED8",
    icon: ICON.shield,
    sections: [
      {
        type: "cards",
        title: "Documentos financeiros",
        items: [
          { label: "Prestação de Contas", href: "/category/transparencia/prestacao-de-contas/", desc: "Editais, relatórios e notícias das prestações de contas, organizados por exercício.", icon: ICON.receipt },
          { label: "Contratos", href: "/category/transparencia/contratos/", desc: "Contratos e termos assinados pelo SINTFUB, em PDF.", icon: ICON.doc },
        ],
      },
      {
        type: "cards",
        title: "Órgãos de controle",
        items: [
          { label: "Conselho Fiscal", href: "/quem-somos/conselho-fiscal/", desc: "Composição do Conselho Fiscal, que analisa os documentos financeiros de cada exercício.", icon: ICON.people },
          { label: "Comissão de Ética", href: "/quem-somos/comissao-de-etica/", desc: "Regimento e resoluções da Comissão de Ética do SINTFUB.", icon: ICON.check },
        ],
      },
      {
        type: "steps",
        title: "Como funciona a prestação de contas",
        steps: [
          { title: "Convocação", desc: "A Coordenação Executiva publica edital convocando os filiados para a Assembleia Geral de prestação de contas." },
          { title: "Análise do Conselho Fiscal", desc: "O Conselho Fiscal analisa os documentos financeiros do exercício e elabora relatório para a Assembleia." },
          { title: "Votação em Assembleia", desc: "A Assembleia Geral avalia os relatórios e vota a aprovação ou reprovação das contas do exercício." },
        ],
      },
    ],
  },
  "/category/transparencia/contratos/": {
    title: "Contratos",
    subtitle: "Transparência na gestão dos recursos",
    description: "Contratos e termos assinados pelo SINTFUB, disponíveis em PDF para consulta dos filiados.",
    breadcrumb: "Contratos",
    breadcrumbParent: { label: "Transparência", href: "/category/transparencia/" },
    color: "#1D4ED8",
    icon: ICON.doc,
    sections: [
      { type: "docs", title: "Contratos e termos assinados", docs: signedTerms },
    ],
  },
  "/category/aposentado/": {
    title: "Aposentados",
    subtitle: "Informações e suporte a aposentados, aposentadas e pensionistas",
    description: "O SINTFUB representa e apoia os técnico-administrativos em educação aposentados, aposentadas e pensionistas da FUB. Acesse notícias, orientações e os canais de atendimento.",
    breadcrumb: "Aposentados",
    color: "#059669",
    icon: ICON.user,
    sections: [
      {
        type: "alert",
        title: "Prova de Vida",
        content: "Aposentadas, aposentados e pensionistas vinculados ao serviço público federal devem realizar anualmente a Prova de Vida para garantir a continuidade do benefício.",
        action: { label: "Saiba como fazer", href: "/prova-de-vida-obrigatoria-aposentados/" },
      },
      {
        type: "cards",
        title: "Atendimento",
        items: [
          { label: "Jurídico", href: "/juridico/", desc: "Assessoria jurídica para filiados, incluindo orientações sobre direitos trabalhistas.", icon: ICON.scale },
          { label: "Contato", href: "/contato/", desc: "Fale com a Secretaria do SINTFUB pelos canais disponíveis.", icon: ICON.mail },
          { label: "Filiação", href: "/filie-se/", desc: "Não há filiação diferenciada para aposentados: o processo é o mesmo para todos os filiados.", icon: ICON.userPlus },
        ],
      },
      { type: "news", title: "Publicações para aposentados", newsCategory: "aposentados" },
      {
        type: "info",
        title: "Licença-prêmio e férias não gozadas",
        content: "O período de férias e de licença-prêmio adquirido e não gozado, ou não utilizado para fins de aposentadoria, deve ser convertido em pecúnia. Consulte a página de Jurídico Trabalhista para mais orientações.",
      },
    ],
  },
  "/convenios-e-parcerias/": {
    title: "Convênios e Parcerias",
    subtitle: "Benefícios para filiados",
    description: "O SINTFUB firma convênios e parcerias para ampliar a rede de benefícios oferecida à categoria. Confira as vantagens disponíveis para filiados.",
    breadcrumb: "Convênios e Parcerias",
    breadcrumbParent: { label: "Serviços", href: "/servicos/" },
    color: "#C41230",
    icon: ICON.gift,
    sections: [
      { type: "partners", title: "Convênios e parcerias ativos" },
      {
        type: "cards",
        title: "Acesso rápido",
        items: [
          { label: "Filie-se para ter acesso", href: "/filie-se/", desc: "Os benefícios são exclusivos para filiados ao SINTFUB.", icon: ICON.userPlus },
          { label: "Fale com a Secretaria", href: "/contato/", desc: "Tire dúvidas sobre os convênios e parcerias disponíveis.", icon: ICON.mail },
        ],
      },
    ],
  },
  "/hub/": {
    title: "Subsede HUB",
    subtitle: "Atendimento no Hospital Universitário de Brasília",
    description: `Espaço dedicado aos ${TAE_FUB} lotados no Hospital Universitário de Brasília (HUB): contatos da subsede, plantão jurídico e publicações sobre o HUB.`,
    breadcrumb: "Subsede HUB",
    breadcrumbParent: { label: "Serviços", href: "/servicos/" },
    color: "#C41230",
    icon: ICON.hospital,
    sections: [
      { type: "contacts", title: "Contatos da subsede", sectorSlugs: ["hub"] },
      {
        type: "info",
        title: "Plantão jurídico no HUB",
        content: "Os plantões jurídicos também acontecem na subsede do HUB. O agendamento deve ser realizado pelos canais disponíveis na página de Contato ou pelo WhatsApp.",
        action: { label: "Ver calendário e áreas atendidas", href: "/juridico/" },
      },
      { type: "news", title: "Publicações sobre o HUB", newsTag: "hub" },
    ],
  },
  "/servicos/": {
    title: "Serviços",
    subtitle: "Serviços do SINTFUB para os filiados",
    description: `Agenda, benefícios, atendimento na subsede do HUB e canais de comunicação do SINTFUB para os ${TAE_FUB}.`,
    breadcrumb: "Serviços",
    color: "#C41230",
    icon: ICON.calendar,
    sections: [
      {
        type: "cards",
        title: "O que você procura?",
        items: [
          { label: "Agenda Institucional", href: "/agenda/", desc: "Agenda da Coordenação, da FASUBRA, da CUT e calendário do sindicato.", icon: ICON.calendar },
          { label: "Convênios e Parcerias", href: "/convenios-e-parcerias/", desc: "Vantagens e descontos oferecidos aos filiados.", icon: ICON.gift },
          { label: "Subsede HUB", href: "/hub/", desc: "Contatos, plantão jurídico e publicações sobre o HUB.", icon: ICON.hospital },
          { label: "Canal do SINTFUB no WhatsApp", href: WHATSAPP_CHANNEL_URL, desc: "Receba as informações do sindicato direto no seu celular.", icon: ICON.megaphone },
        ],
      },
    ],
  },
};

function SectionTitle({ id, color, children }: { id: string; color: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xl font-black text-gray-900 mb-6 font-[family-name:var(--font-display)] flex items-center gap-3">
      <div className="w-1 h-6 rounded-full" style={{ backgroundColor: color }} />
      {children}
    </h2>
  );
}

const arrowIcon = (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function HubPage() {
  const { pathname } = useLocation();
  const config = hubConfigs[pathname];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!config) return <NotFound />;

  const breadcrumbItems = config.breadcrumbParent
    ? [config.breadcrumbParent, { label: config.breadcrumb }]
    : [{ label: config.breadcrumb }];

  return (
    <div className="min-h-screen bg-offwhite">
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
          const headingId = `section-${i}`;

          if (section.type === "cards" && section.items) {
            return (
              <section key={i} aria-labelledby={headingId}>
                <SectionTitle id={headingId} color={config.color}>{section.title}</SectionTitle>
                <div className={`grid gap-4 ${section.items.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : section.items.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}`}>
                  {section.items.map((item) => {
                    const external = /^https?:\/\//.test(item.href);
                    const cardClassName = "group flex flex-col gap-4 p-6 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md rounded-2xl transition-all";
                    const cardContent = (
                      <>
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
                          {item.desc && <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>}
                        </div>
                        <div className="mt-auto flex items-center gap-1 text-xs font-semibold" style={{ color: config.color }}>
                          {external ? "Acessar site" : "Acessar"}
                          {arrowIcon}
                        </div>
                      </>
                    );
                    return external ? (
                      <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
                        {cardContent}
                      </a>
                    ) : (
                      <Link key={item.label} to={item.href} className={cardClassName}>
                        {cardContent}
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          }

          if (section.type === "news") {
            const news = newsItems
              .filter((item) => {
                if (section.newsCategory) return item.categorySlug === section.newsCategory;
                if (section.newsTag) return item.tags.some((t) => t.toLowerCase() === section.newsTag);
                return true;
              })
              .sort((a, b) => b.date.localeCompare(a.date));
            return (
              <section key={i} aria-labelledby={headingId}>
                <SectionTitle id={headingId} color={config.color}>{section.title}</SectionTitle>
                {news.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item) => (
                      <NewsCard key={item.id} {...item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-gray-500 text-sm">Este conteúdo ainda não possui publicações.</p>
                  </div>
                )}
              </section>
            );
          }

          if (section.type === "docs" && section.docs) {
            return (
              <section key={i} aria-labelledby={headingId}>
                <SectionTitle id={headingId} color={config.color}>{section.title}</SectionTitle>
                <div className="space-y-3">
                  {section.docs.map((doc) => (
                    <DocRow key={doc.url} doc={doc} />
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === "partners") {
            return (
              <section key={i} aria-labelledby={headingId}>
                <SectionTitle id={headingId} color={config.color}>{section.title}</SectionTitle>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {partners.map((partner) => (
                    <li key={partner.name} className="flex flex-col p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">{partner.date}</p>
                      <h3 className="font-bold text-gray-900 text-base mb-1.5 font-[family-name:var(--font-display)]">{partner.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{partner.benefit}</p>
                      <Link
                        to={`/${partner.postSlug}/`}
                        className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#C41230] hover:underline"
                      >
                        Ver publicação
                        {arrowIcon}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          if (section.type === "contacts") {
            const list = sectors.filter((s) => section.sectorSlugs?.includes(s.slug));
            return (
              <section key={i} aria-labelledby={headingId}>
                <SectionTitle id={headingId} color={config.color}>{section.title}</SectionTitle>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {list.map((sector) => (
                    <li key={sector.slug} className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                      <h3 className="font-bold text-gray-900 text-base font-[family-name:var(--font-display)]">{sector.label}</h3>
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
              </section>
            );
          }

          if (section.type === "links" && section.items) {
            return (
              <section key={i} aria-labelledby={headingId}>
                <SectionTitle id={headingId} color={config.color}>{section.title}</SectionTitle>
                <ul className="space-y-2">
                  {section.items.map((item) => {
                    const external = /^https?:\/\//.test(item.href);
                    const linkClassName = "flex items-center gap-2 text-sm text-gray-700 hover:text-[#C41230] transition-colors group";
                    const linkContent = (
                      <>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-[#C41230] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        {item.label}
                      </>
                    );
                    return (
                      <li key={item.label}>
                        {external ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                            {linkContent}
                          </a>
                        ) : (
                          <Link to={item.href} className={linkClassName}>
                            {linkContent}
                          </Link>
                        )}
                      </li>
                    );
                  })}
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
                  {section.action && (
                    <Link to={section.action.href} className="inline-flex items-center gap-1 mt-3 text-sm font-semibold hover:underline" style={{ color: config.color }}>
                      {section.action.label}
                      {arrowIcon}
                    </Link>
                  )}
                </div>
              </section>
            );
          }

          if (section.type === "alert") {
            return (
              <section key={i} role="note" aria-label={section.title}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl border-2" style={{ borderColor: config.color, backgroundColor: `${config.color}08` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: config.color }}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1 font-[family-name:var(--font-display)]">{section.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                  {section.action && (
                    <Link
                      to={section.action.href}
                      className="inline-flex items-center justify-center gap-1.5 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-opacity hover:opacity-90 whitespace-nowrap"
                      style={{ backgroundColor: config.color }}
                    >
                      {section.action.label}
                      {arrowIcon}
                    </Link>
                  )}
                </div>
              </section>
            );
          }

          if (section.type === "stats" && section.stats) {
            return (
              <section key={i} aria-label={section.title || "Números"}>
                <div className={`grid grid-cols-2 gap-4 ${section.stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                  {section.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="text-3xl font-black mb-1 font-[family-name:var(--font-display)]" style={{ color: config.color }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === "gallery" && section.images) {
            return (
              <section key={i} aria-labelledby={headingId}>
                <SectionTitle id={headingId} color={config.color}>{section.title}</SectionTitle>
                <div className={`grid grid-cols-1 gap-4 ${section.images.length > 1 ? "sm:grid-cols-2 max-w-3xl" : "max-w-md"}`}>
                  {section.images.map((img) => (
                    <figure key={img.src} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
                      <a href={img.src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar: ${img.caption}`}>
                        <img src={img.src} alt={img.caption} className="w-full h-auto object-cover" />
                      </a>
                      <figcaption className="px-3 py-2.5 text-xs font-semibold text-gray-700 bg-gray-50">{img.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === "faq" && section.faqs) {
            return (
              <section key={i} aria-labelledby={headingId}>
                <SectionTitle id={headingId} color={config.color}>{section.title}</SectionTitle>
                <div className="space-y-3">
                  {section.faqs.map((faq, fi) => {
                    const isOpen = openFaq === fi;
                    return (
                      <div key={faq.q} className="border border-gray-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : fi)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-gray-50 hover:bg-red-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                          <svg
                            className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && <div className="px-5 py-4 text-sm text-gray-600 leading-relaxed bg-white">{faq.a}</div>}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          }

          if (section.type === "steps" && section.steps) {
            return (
              <section key={i} aria-labelledby={headingId}>
                <SectionTitle id={headingId} color={config.color}>{section.title}</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {section.steps.map((step, si) => (
                    <div key={step.title} className="relative pl-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm mb-3"
                        style={{ backgroundColor: `${config.color}12`, color: config.color }}
                      >
                        {si + 1}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1 font-[family-name:var(--font-display)]">{step.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
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
