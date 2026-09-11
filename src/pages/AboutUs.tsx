import Breadcrumb from "../components/Breadcrumb";
import { Link, useParams } from "react-router-dom";

export default function AboutUs() {
  const { slug } = useParams();

  const emptyPages = ["conselho-de-representantes", "missao", "memoria-sindical", "agenda-da-coordenacao-executiva", "corpo-administrativo"];
  const isEmpty = slug && emptyPages.includes(slug);

  const pageLabels: Record<string, string> = {
    "conselho-de-representantes": "Conselho de Representantes",
    "missao": "Missão",
    "memoria-sindical": "Memória Sindical",
    "agenda-da-coordenacao-executiva": "Agenda da Coordenação Executiva",
    "corpo-administrativo": "Corpo Administrativo",
    "conselho-fiscal": "Conselho Fiscal",
    "historia": "História",
  };
  const pageLabel = (slug && pageLabels[slug]) || "Quem Somos";

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb
        items={[
          { label: "Quem Somos", href: "/quem-somos/" },
          { label: pageLabel },
        ]}
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
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#C41230]">Institucional</p>
              <h1 className="text-2xl lg:text-4xl font-black text-gray-900 font-[family-name:var(--font-display)]">
                {pageLabel}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        {isEmpty ? (
          <div className="flex gap-10">
            <div className="flex-1">
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Conteúdo em elaboração</h2>
                <p className="text-gray-500 text-sm">Este conteúdo ainda não possui publicações.</p>
              </div>
            </div>
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Navegação</h2>
                <ul className="space-y-2">
                  {Object.entries(pageLabels).map(([s, label]) => (
                    <li key={s}>
                      <Link to={`/quem-somos/${s}/`} className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${s === slug ? "bg-red-50 text-[#C41230] font-semibold" : "text-gray-600 hover:text-[#C41230] hover:bg-red-50"}`}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        ) : (
          <div className="flex gap-10">
            <div className="flex-1 max-w-3xl">
              <div className="prose prose-gray max-w-none">
                <p className="text-lg font-medium text-gray-800 leading-relaxed mb-6">
                  O SINTFUB, Sindicato dos Trabalhadores da Fundação Universidade de Brasília, é a entidade representativa dos trabalhadores técnico-administrativos ativos e aposentados da FUB, campus da Universidade de Brasília.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Fundado com o objetivo de defender os interesses coletivos e individuais dos servidores, o SINTFUB atua em múltiplas frentes: negociações coletivas, assessoria jurídica trabalhista e cível, convênios de saúde e outros benefícios, além de iniciativas de transparência e participação democrática.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A diretoria é eleita pelos filiados em assembleias periódicas, garantindo legitimidade democrática as decisões e as pautas de reivindicação junto as instituições competentes.
                </p>
                <div className="bg-red-50 border-l-4 border-[#C41230] rounded-r-xl p-5 my-6">
                  <p className="text-sm text-gray-700 italic">
                    <strong>Conteúdo demonstrativo.</strong> O texto real desta página deve ser fornecido pelo SINTFUB e inserido no sistema de gestão de conteúdo.
                  </p>
                </div>
              </div>
            </div>
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Navegação</h2>
                <ul className="space-y-2">
                  {Object.entries(pageLabels).map(([s, label]) => (
                    <li key={s}>
                      <Link to={`/quem-somos/${s}/`} className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${s === slug ? "bg-red-50 text-[#C41230] font-semibold" : "text-gray-600 hover:text-[#C41230] hover:bg-red-50"}`}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
