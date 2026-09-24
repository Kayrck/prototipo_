import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { documents } from "../data/content";

interface AgendaEvent {
  date: string;
  label: string;
  place?: string;
  ataUrl?: string;
}

const ataUrl = (fragment: string) => documents.find((d) => d.title.includes(fragment))?.url;

// Eventos reais da gestão 2026-2029, do mais recente para o mais antigo.
const coordinationEvents: AgendaEvent[] = [
  { date: "28/05/2026", label: "Assembleia Geral de Prestação de Contas" },
  { date: "13/05/2026", label: "Assembleia Geral", place: "Praça Chico Mendes", ataUrl: ataUrl("13/05/2026") },
  { date: "09/04/2026", label: "Assembleia Geral Ordinária de Prestação de Contas do exercício de 2023" },
  { date: "17/03/2026", label: "Assembleia Geral Extraordinária (URP)", place: "Auditório ADUnB", ataUrl: ataUrl("17/03/2026") },
  { date: "12/02/2026", label: "Assembleia Geral Extraordinária", place: "Praça Chico Mendes", ataUrl: ataUrl("12/02/2026") },
  { date: "22/01/2026", label: "Assembleia Geral", place: "Praça Chico Mendes", ataUrl: ataUrl("22/01/2026") },
  { date: "02/01/2026", label: "Posse da Coordenação Executiva e do Conselho Fiscal", place: "Auditório Antônio Rodrigues, sede do SINTFUB" },
];

const sections = [
  { id: "coordenacao", label: "Coordenação Executiva" },
  { id: "calendario", label: "Calendário do Sindicato" },
  { id: "fasubra", label: "FASUBRA" },
  { id: "cut", label: "CUT" },
];

const externalIcon = (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const sectionTitle = "text-xl font-black text-gray-900 mb-5 font-[family-name:var(--font-display)] flex items-center gap-3";

export default function Agenda() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb items={[{ label: "Serviços", href: "/servicos/" }, { label: "Agenda Institucional" }]} />

      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">Agenda Institucional</h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 ml-4 max-w-3xl">
            Assembleias, congressos e demais compromissos do SINTFUB, com atalhos para as agendas da FASUBRA e da CUT.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          <div className="flex-1 min-w-0 space-y-14">
            <section id="coordenacao" className="scroll-mt-40" aria-labelledby="titulo-coordenacao">
              <h2 id="titulo-coordenacao" className={sectionTitle}>
                <div className="w-1 h-6 rounded-full bg-[#C41230]" />
                Agenda da Coordenação Executiva
              </h2>
              <p className="text-sm text-gray-600 mb-4 max-w-2xl">
                Assembleias e convocações da gestão 2026-2029 (Coordenação Executiva da chapa "Renovação e Luta").
              </p>
              <ol className="space-y-2">
                {coordinationEvents.map((event) => (
                  <li key={event.date + event.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-white border border-gray-100 rounded-xl">
                    <time className="text-sm font-black text-[#C41230] font-[family-name:var(--font-display)] sm:w-28 flex-shrink-0">{event.date}</time>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{event.label}</p>
                      {event.place && <p className="text-xs text-gray-500 mt-0.5">{event.place}</p>}
                    </div>
                    {event.ataUrl && (
                      <a href={event.ataUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#C41230] hover:underline whitespace-nowrap">
                        Ata (PDF)
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            <section id="calendario" className="scroll-mt-40" aria-labelledby="titulo-calendario">
              <h2 id="titulo-calendario" className={sectionTitle}>
                <div className="w-1 h-6 rounded-full bg-[#C41230]" />
                Calendário do Sindicato
              </h2>
              <ul className="space-y-2">
                <li className="p-4 bg-white border border-gray-100 rounded-xl">
                  <p className="text-sm font-black text-[#C41230] font-[family-name:var(--font-display)]">25 a 27 de agosto de 2026</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">XXIV CONSINTFUB</p>
                  <Link to="/category/documentos/consintfub/xxiv/" className="text-xs font-semibold text-[#C41230] hover:underline">
                    Programação e publicações do congresso
                  </Link>
                </li>
                <li className="p-4 bg-white border border-gray-100 rounded-xl">
                  <p className="text-sm font-semibold text-gray-900">Plantões jurídicos</p>
                  <p className="text-xs text-gray-500 mt-0.5">Na sede do SINTFUB, no Campus Darcy Ribeiro, e na subsede do HUB.</p>
                  <Link to="/juridico/" className="text-xs font-semibold text-[#C41230] hover:underline">
                    Ver calendário dos plantões
                  </Link>
                </li>
                <li className="p-4 bg-white border border-gray-100 rounded-xl">
                  <p className="text-sm font-semibold text-gray-900">Assembleias Gerais</p>
                  <p className="text-xs text-gray-500 mt-0.5">Atas das assembleias realizadas, organizadas por ano.</p>
                  <Link to="/category/documentos/atas/" className="text-xs font-semibold text-[#C41230] hover:underline">
                    Acessar as atas
                  </Link>
                </li>
              </ul>
            </section>

            <section id="fasubra" className="scroll-mt-40" aria-labelledby="titulo-fasubra">
              <h2 id="titulo-fasubra" className={sectionTitle}>
                <div className="w-1 h-6 rounded-full bg-[#C41230]" />
                Agenda da FASUBRA
              </h2>
              <p className="text-sm text-gray-600 mb-4 max-w-2xl">
                Reuniões, plenárias e mobilizações nacionais da federação são divulgadas nos Informes da FASUBRA, repassados pelo SINTFUB, e no site da entidade.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/category/informes-fasubra/" className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors">
                  Informes da FASUBRA
                </Link>
                <a href="https://fasubra.org.br/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#C41230] hover:text-[#C41230] text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                  Site da FASUBRA
                  {externalIcon}
                </a>
              </div>
            </section>

            <section id="cut" className="scroll-mt-40" aria-labelledby="titulo-cut">
              <h2 id="titulo-cut" className={sectionTitle}>
                <div className="w-1 h-6 rounded-full bg-[#C41230]" />
                Agenda da CUT
              </h2>
              <p className="text-sm text-gray-600 mb-4 max-w-2xl">
                Atos, campanhas e atividades da Central Única dos Trabalhadores, à qual o SINTFUB é filiado, são divulgados no site da central.
              </p>
              <a href="https://www.cut.org.br/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#C41230] hover:text-[#C41230] text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Site da CUT
                {externalIcon}
              </a>
            </section>
          </div>

          <aside className="hidden lg:block w-64 flex-shrink-0" aria-label="Seções da agenda">
            <div className="sticky top-40 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Nesta página</h2>
              <ul className="space-y-1.5">
                {sections.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="block text-sm py-1.5 px-3 rounded-lg text-gray-600 hover:text-[#C41230] hover:bg-red-50 transition-colors">
                      {item.label}
                    </a>
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
