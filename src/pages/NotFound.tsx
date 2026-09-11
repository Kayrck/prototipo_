import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/busca/?s=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24">
      <div className="text-center max-w-lg">
        <div className="text-[120px] font-black text-gray-100 leading-none font-[family-name:var(--font-display)] mb-4 select-none">
          404
        </div>
        <div className="w-16 h-1 bg-[#C41230] rounded-full mx-auto mb-8" />
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 font-[family-name:var(--font-display)]">
          Página não encontrada
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-10">
          A página que você está tentando acessar não existe ou foi movida. Verifique o endereço ou use a busca abaixo.
        </p>

        <form onSubmit={handleSearch} className="flex gap-3 mb-8" role="search">
          <label htmlFor="notfound-search" className="sr-only">Buscar no site</label>
          <input
            id="notfound-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar no site..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41230]"
          />
          <button
            type="submit"
            className="bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
          >
            Buscar
          </button>
        </form>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Voltar para a Home
          </Link>
          <Link
            to="/contato/"
            className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-[#C41230] hover:text-[#C41230] transition-colors text-sm"
          >
            Fale com o SINTFUB
          </Link>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">Links úteis</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Notícias", href: "/category/publicacoes/noticias/" },
              { label: "Documentos", href: "/category/documentos/" },
              { label: "Filie-se", href: "/filie-se/" },
              { label: "Jurídico", href: "/juridico/" },
              { label: "Transparência", href: "/category/transparencia/" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#C41230] hover:text-[#C41230] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
