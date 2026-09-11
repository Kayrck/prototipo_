import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "../data/content";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca/?s=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#C41230] text-white text-sm no-print">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <a
              href="mailto:sintfub@sintfub.org.br"
              className="flex items-center gap-1.5 hover:text-red-200 transition-colors text-xs"
              aria-label="E-mail do SINTFUB"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">sintfub@sintfub.org.br</span>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5561992316213&text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20o%20SINTFUB."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-red-200 transition-colors text-xs"
              aria-label="WhatsApp do SINTFUB"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="hidden sm:inline">(61) 99231-6213</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/sintfub" target="_blank" rel="noopener noreferrer" aria-label="Facebook do SINTFUB" className="hover:text-red-200 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.youtube.com/channel/UCz4A5n0VW_mMyR88MI177BQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube do SINTFUB" className="hover:text-red-200 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://www.instagram.com/sintfub_unb" target="_blank" rel="noopener noreferrer" aria-label="Instagram do SINTFUB" className="hover:text-red-200 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`bg-white border-b border-gray-200 no-print transition-shadow ${sticky ? "sticky top-0 z-50 shadow-md" : ""}`}
        role="banner"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center h-16 lg:h-20 gap-2 lg:gap-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="SINTFUB, página inicial">
              <img src="/sintfub-logo.png" alt="SINTFUB" className="h-11 w-auto flex-shrink-0" />
              <div className="hidden sm:block leading-tight">
                <div className="font-black text-[#C41230] text-lg font-[family-name:var(--font-display)]">SINTFUB</div>
                <div className="text-gray-500 text-xs leading-tight max-w-[220px]">
                  Sindicato dos Trabalhadores da<br />Fundação Universidade de Brasília
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center justify-center gap-0 mx-auto" aria-label="Navegação principal">
              {menuItems.map((item) => (
                <div key={item.label} className="mega-menu-item relative group">
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-3.5 py-6 text-sm font-semibold transition-colors whitespace-nowrap ${
                      item.highlight
                        ? "text-[#C41230] hover:text-[#9B0E25]"
                        : "text-gray-700 hover:text-[#C41230]"
                    }`}
                  >
                    {item.label}
                    {item.children && item.children.length > 0 && (
                      <svg className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="mega-menu-dropdown absolute top-full left-0 bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-56 z-50">
                      {item.children.map((child) => (
                        <div key={child.label} className="group/sub relative">
                          <Link
                            to={child.href}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#C41230] transition-colors"
                          >
                            {child.label}
                            {"children" in child && child.children && child.children.length > 0 && (
                              <svg className="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </Link>
                          {"children" in child && child.children && child.children.length > 0 && (
                            <div className="absolute left-full top-0 hidden group-hover/sub:block bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-48 z-50">
                              {child.children.map((sub) => (
                                <Link
                                  key={sub.label}
                                  to={sub.href}
                                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#C41230] transition-colors"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-[#C41230] transition-colors"
                aria-label="Buscar"
                aria-expanded={searchOpen}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Filie-se CTA */}
              <Link
                to="/filie-se/"
                className="hidden sm:flex items-center gap-2 whitespace-nowrap flex-shrink-0 bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Filie-se
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 text-gray-700 hover:text-[#C41230] transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menu"
                aria-expanded={mobileOpen}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search bar expansion */}
          {searchOpen && (
            <div className="border-t border-gray-100 py-3">
              <form onSubmit={handleSearch} className="flex gap-2" role="search">
                <label htmlFor="header-search" className="sr-only">Buscar no site</label>
                <input
                  ref={searchRef}
                  id="header-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Digite sua busca..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41230] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-[#C41230] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#9B0E25] transition-colors"
                >
                  Buscar
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-500 hover:text-gray-700 px-2"
                  aria-label="Fechar busca"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden no-print">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="absolute top-0 right-0 bottom-0 w-80 max-w-full bg-white shadow-2xl flex flex-col overflow-y-auto"
            aria-label="Menu móvel"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#C41230]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-xs font-[family-name:var(--font-display)]">S</span>
                </div>
                <span className="text-white font-bold text-sm font-[family-name:var(--font-display)]">SINTFUB</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white hover:text-red-200 transition-colors p-1"
                aria-label="Fechar menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile search */}
            <div className="p-4 border-b border-gray-100">
              <form onSubmit={handleSearch} role="search">
                <label htmlFor="mobile-search" className="sr-only">Buscar</label>
                <div className="flex gap-2">
                  <input
                    id="mobile-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar no site..."
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41230]"
                  />
                  <button type="submit" className="bg-[#C41230] text-white px-3 py-2 rounded-lg">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Mobile nav items */}
            <div className="flex-1 py-2">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.children && item.children.length > 0 ? (
                    <>
                      <button
                        onClick={() => setOpenMobile(openMobile === item.label ? null : item.label)}
                        className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold transition-colors text-left ${
                          item.highlight ? "text-[#C41230]" : "text-gray-800"
                        }`}
                        aria-expanded={openMobile === item.label}
                      >
                        {item.label}
                        <svg
                          className={`w-4 h-4 opacity-50 transition-transform ${openMobile === item.label ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openMobile === item.label && (
                        <div className="bg-gray-50 border-y border-gray-100">
                          {item.children.map((child) => (
                            <div key={child.label}>
                              {"children" in child && child.children && child.children.length > 0 ? (
                                <>
                                  <button
                                    onClick={() => setOpenMobileSub(openMobileSub === child.label ? null : child.label)}
                                    className="w-full flex items-center justify-between pl-8 pr-5 py-3 text-sm text-gray-700 text-left"
                                    aria-expanded={openMobileSub === child.label}
                                  >
                                    {child.label}
                                    <svg
                                      className={`w-3.5 h-3.5 opacity-40 transition-transform ${openMobileSub === child.label ? "rotate-180" : ""}`}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                  {openMobileSub === child.label && (
                                    <div className="bg-gray-100">
                                      {child.children.map((sub) => (
                                        <Link
                                          key={sub.label}
                                          to={sub.href}
                                          className="block pl-12 pr-5 py-2.5 text-sm text-gray-600 hover:text-[#C41230] hover:bg-red-50 transition-colors"
                                        >
                                          {sub.label}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  to={child.href}
                                  className="block pl-8 pr-5 py-3 text-sm text-gray-700 hover:text-[#C41230] hover:bg-red-50 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-5 py-3.5 text-sm font-semibold transition-colors ${
                        item.highlight
                          ? "text-[#C41230] hover:bg-red-50"
                          : "text-gray-800 hover:text-[#C41230] hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                  <div className="border-b border-gray-100 mx-5" />
                </div>
              ))}
            </div>

            {/* Mobile footer */}
            <div className="p-4 border-t border-gray-100 space-y-2">
              <Link
                to="/filie-se/"
                className="flex items-center justify-center gap-2 w-full bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold py-3 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Filie-se ao SINTFUB
              </Link>
              <div className="flex items-center justify-center gap-4 pt-1">
                <a href="mailto:sintfub@sintfub.org.br" className="text-gray-500 hover:text-[#C41230] text-xs transition-colors">
                  sintfub@sintfub.org.br
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
