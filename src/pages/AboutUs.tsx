import Breadcrumb from "../components/Breadcrumb";
import { Link, useParams } from "react-router-dom";

const pageLabels: Record<string, string> = {
  "conselho-de-representantes": "Conselho de Representantes",
  "missao": "Missão",
  "memoria-sindical": "Memória Sindical",
  "agenda-da-coordenacao-executiva": "Agenda da Coordenação Executiva",
  "corpo-administrativo": "Corpo Administrativo",
  "conselho-fiscal": "Conselho Fiscal",
  "historia": "História",
};

const boardGroups: { title: string; people: string[] }[] = [
  { title: "Coordenação Geral", people: ["Carla Simone Vizzotto", "Maria do Socorro Oliveira Marzola", "Efraim Carlos Costa"] },
  { title: "Coordenação de Administração", people: ["Alice Queiroz Silva", "Taiã Mairon Peixoto Ribeiro"] },
  { title: "Coordenação de Cultura e Esportes", people: ["Jackson Ferreira do Nascimento", "Sinara Sartori de Melo"] },
  { title: "Coordenação de Comunicação e Divulgação", people: ["Camila Oliveira Sobrinho", "Mônica Regina Peres"] },
  { title: "Coordenação de Finanças", people: ["Wilker Luciano Zorzin"] },
  { title: "Coordenação Jurídica e Relações de Trabalho", people: ["Luiz Eduardo Celino Benedito", "Nadia Regina Alves Valadares"] },
  { title: "Coordenação de Políticas Sociais, Saúde e Seguridade Social", people: ["Valdete Silva de Freitas Morais", "Sônia Aparecida Alves"] },
  { title: "Coordenação de Assuntos de Aposentadoria e Pensão", people: ["Celina Menezes Bastos"] },
  { title: "Coordenação de Educação", people: ["Leocádia Aparecida Chaves", "Junia Maria Zandonade Falqueto"] },
  { title: "Coordenação de Raça, Etnia e Diversidade Sexual", people: ["Maria Célia Orlato Selem", "Andrea Henrique Campos Da Fonseca"] },
  { title: "Coordenação de Mulheres", people: ["Luanna Ferreira da Silva", "Iris Dias Santos"] },
  { title: "Coordenação de Organização Política e Formação Sindical", people: ["Alexandre Jorge de Medeiros Fernandes", "Carla Márcia"] },
];

const fiscalCouncil = {
  titulares: ["Frederico Cristiano Gonçalves Mourão", "Rosângela Rodrigues de Araújo Fraga", "Dijalma José da Silva"],
  suplentes: ["José Humberto Alves", "Elmar Rodrigues de Lima", "Sérgio Rubens Ribeiro"],
};

export default function AboutUs() {
  const { slug } = useParams();
  const pageLabel = (slug && pageLabels[slug]) || "Quem Somos";

  const emptyOnRealSite = ["conselho-de-representantes", "memoria-sindical", "agenda-da-coordenacao-executiva"];
  const isEmpty = !!slug && emptyOnRealSite.includes(slug);

  return (
    <div className="min-h-screen bg-offwhite">
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
        <div className="flex gap-10">
          <div className="flex-1 max-w-3xl">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Conteúdo em elaboração</h2>
                <p className="text-gray-500 text-sm">Esta página ainda não possui conteúdo publicado no site oficial do SINTFUB.</p>
              </div>
            ) : slug === "conselho-fiscal" ? (
              <div className="space-y-8">
                <p className="text-gray-600 text-sm">Composição do Conselho Fiscal para a gestão 2026/2029.</p>
                <div>
                  <h2 className="font-bold text-gray-900 text-base mb-3 font-[family-name:var(--font-display)]">Titulares</h2>
                  <ul className="space-y-2">
                    {fiscalCouncil.titulares.map((name) => (
                      <li key={name} className="text-gray-700 text-sm py-2 px-4 bg-gray-50 rounded-lg">{name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-base mb-3 font-[family-name:var(--font-display)]">Suplentes</h2>
                  <ul className="space-y-2">
                    {fiscalCouncil.suplentes.map((name) => (
                      <li key={name} className="text-gray-700 text-sm py-2 px-4 bg-gray-50 rounded-lg">{name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : slug === "corpo-administrativo" ? (
              <div className="space-y-8">
                <p className="text-gray-600 text-sm">Coordenação Executiva do SINTFUB, gestão 2026-2029.</p>
                {boardGroups.map((group) => (
                  <div key={group.title}>
                    <h2 className="font-bold text-gray-900 text-base mb-3 font-[family-name:var(--font-display)]">{group.title}</h2>
                    <ul className="space-y-2">
                      {group.people.map((name) => (
                        <li key={name} className="text-gray-700 text-sm py-2 px-4 bg-gray-50 rounded-lg">{name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : slug === "missao" ? (
              <div className="prose prose-gray max-w-none space-y-6">
                <div>
                  <h2 className="font-bold text-gray-900 text-base mb-2 font-[family-name:var(--font-display)]">Missão</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Desenvolver continuamente políticas estratégicas de negociação com o objetivo de garantir a representação, a defesa, o aperfeiçoamento e a integridade dos trabalhadores da Fundação Universidade de Brasília, perante as autoridades administrativas e jurídicas, visando o fortalecimento do sistema educacional do Brasil, em benefício da sociedade.
                  </p>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-base mb-2 font-[family-name:var(--font-display)]">Visão</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Ser reconhecido como entidade essencial e de vanguarda na representação e no aperfeiçoamento dos trabalhadores da Fundação Universidade de Brasília.
                  </p>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-base mb-2 font-[family-name:var(--font-display)]">Valor</h2>
                  <p className="text-gray-700 leading-relaxed">Ética – atuar segundo os preceitos estatutários da entidade.</p>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-base mb-2 font-[family-name:var(--font-display)]">Liderança</h2>
                  <p className="text-gray-700 leading-relaxed">Conduzir com habilidade as ações institucionais para o cumprimento dos objetivos da entidade.</p>
                </div>
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
                    O SINTFUB, Sindicato dos Trabalhadores da Fundação Universidade de Brasília, é a entidade representativa dos trabalhadores técnico-administrativos ativos e aposentados da FUB, campus da Universidade de Brasília.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Há mais de três décadas o SINTFUB coloca em prática sua missão, visão e valores. Por meio de greves, acordos, manifestações e interlocução com diferentes atores da vida política brasileira, o sindicato tem sido protagonista na manutenção e conquista de direitos, informando e representando a categoria.
                  </p>
                </div>

                <div className="mt-10">
                  <h2 className="font-bold text-gray-900 text-base mb-6 font-[family-name:var(--font-display)]">Linha do tempo</h2>
                  <div className="space-y-6">
                    {[
                      { year: "1985", text: "Início do Sindicato com a concepção da Associação dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília (ATA-FUB)." },
                      { year: "1992", text: "Mudança estatutária adota a denominação de Sindicato (SINTFUB); filiação à Central Única dos Trabalhadores (CUT) e à FASUBRA." },
                      { year: "1999", text: "Nova mudança na sigla: de Sindicato dos Servidores Técnico-Administrativos para Sindicato dos Trabalhadores da FUB, passando a abranger ativos, aposentados, terceirizados e pensionistas." },
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
                </div>
              </>
            )}
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
      </div>
    </div>
  );
}
