import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import NewsCard, { NewsCardSkeleton } from "../components/NewsCard";
import { newsItems } from "../data/content";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("s") || "";
  const [inputVal, setInputVal] = useState(query);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(newsItems);

  useEffect(() => {
    if (!query) { setResults([]); return; }
    setLoading(true);
    setTimeout(() => {
      const filtered = newsItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
      setLoading(false);
    }, 600);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchParams({ s: inputVal.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb items={[{ label: "Busca" }]} />

      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">
              {query ? `Resultados para "${query}"` : "Busca"}
            </h1>
          </div>
          <form onSubmit={handleSearch} className="flex gap-3 max-w-xl ml-4" role="search">
            <label htmlFor="main-search" className="sr-only">Buscar no site</label>
            <input
              id="main-search"
              type="search"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Digite sua busca..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41230] focus:border-transparent bg-white"
            />
            <button
              type="submit"
              className="bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <NewsCardSkeleton key={i} />)}
          </div>
        ) : !query ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Pesquise o conteúdo do SINTFUB</h2>
            <p className="text-gray-500 text-sm">Use o campo acima para buscar notícias, documentos e publicações.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Nenhum resultado encontrado</h2>
            <p className="text-gray-500 text-sm mb-8">
              Não foram encontrados resultados para "<strong>{query}</strong>". Tente outros termos.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/" className="text-sm font-semibold text-[#C41230] border border-[#C41230] px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                Página inicial
              </Link>
              <Link to="/category/publicacoes/noticias/" className="text-sm font-semibold text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:border-gray-400 transition-colors">
                Ver notícias
              </Link>
              <Link to="/category/documentos/" className="text-sm font-semibold text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:border-gray-400 transition-colors">
                Ver documentos
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              <strong>{results.length}</strong> resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""} para "<strong>{query}</strong>"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
