import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import DocRow from "../components/DocRow";
import NotFound from "./NotFound";
import { juridicoSections } from "../data/juridico";

// Navegação lateral do Jurídico Trabalhista: URP, Pareceres e Ações do SINTFUB.
const navItems = [
  { label: "URP", href: "/temas/urp/" },
  ...juridicoSections.map((s) => ({ label: s.label, href: `/category/juridico-trabalhista/${s.slug}/` })),
];

export default function JuridicoSection() {
  const { section } = useParams();
  const current = juridicoSections.find((s) => s.slug === section);
  if (!current) return <NotFound />;
  const currentHref = `/category/juridico-trabalhista/${current.slug}/`;

  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb
        items={[
          { label: "Jurídico", href: "/juridico/" },
          { label: "Jurídico Trabalhista", href: "/category/juridico-trabalhista/" },
          { label: current.label },
        ]}
      />
      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-1 ml-4 text-[#C41230]">Assessoria jurídica para filiados do SINTFUB</p>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">{current.label}</h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 ml-4 max-w-3xl">{current.summary}</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          <div className="flex-1 min-w-0 space-y-10">
            {/* Navegação compacta para telas sem a barra lateral */}
            <nav className="lg:hidden -mx-6 px-6 overflow-x-auto" aria-label="Navegação do Jurídico Trabalhista">
              <ul className="flex gap-2 w-max pb-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      aria-current={item.href === currentHref ? "page" : undefined}
                      className={`block whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                        item.href === currentHref
                          ? "bg-[#C41230] border-[#C41230] text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-[#C41230] hover:text-[#C41230]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {current.groups.map((group) => (
              <section key={group.label} aria-label={group.label}>
                <h2 className="font-bold text-gray-900 text-base mb-3 font-[family-name:var(--font-display)]">{group.label}</h2>
                <div className="space-y-3">
                  {group.docs.map((doc) => (
                    <DocRow key={doc.url} doc={doc} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="hidden lg:block w-64 flex-shrink-0" aria-label="Navegação do Jurídico Trabalhista">
            <div className="sticky top-40 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Navegação</h2>
              <ul className="space-y-1.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      aria-current={item.href === currentHref ? "page" : undefined}
                      className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${
                        item.href === currentHref ? "bg-red-50 text-[#C41230] font-semibold" : "text-gray-600 hover:text-[#C41230] hover:bg-red-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/category/juridico-trabalhista/" className="block mt-4 text-xs font-semibold text-[#C41230] hover:underline">
                Voltar ao Jurídico Trabalhista
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
