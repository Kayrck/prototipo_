import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const footerLinks = {
  institucional: [
    { label: "História", href: "/quem-somos/historia/" },
    { label: "Missão", href: "/quem-somos/missao/" },
    { label: "Corpo Administrativo", href: "/quem-somos/corpo-administrativo/" },
    { label: "Conselho de Representantes", href: "/quem-somos/conselho-de-representantes/" },
    { label: "Conselho Fiscal", href: "/quem-somos/conselho-fiscal/" },
    { label: "Agenda da Coordenação Executiva", href: "/quem-somos/agenda-da-coordenacao-executiva/" },
  ],
  publicacoes: [
    { label: "Notícias", href: "/category/publicacoes/noticias/" },
    { label: "Informativos", href: "/category/informativos/" },
    { label: "Vídeos", href: "/category/multimidia/videos/" },
    { label: "Cards", href: "/category/multimidia/cards/" },
    { label: "Fotos", href: "/category/multimidia/fotos/" },
    { label: "Aposentados", href: "/category/aposentado/" },
  ],
  juridico: [
    { label: "Jurídico Trabalhista", href: "/category/juridico-trabalhista/" },
    { label: "Jurídico Cível", href: "/category/juridico-civel/" },
  ],
  documentos: [
    { label: "Estatuto", href: "/estatuto/" },
    { label: "Atas de Assembleia", href: "/category/documentos/atas/" },
    { label: "Resoluções e Boletins", href: "/resolucoes-boletins/" },
    { label: "CONSINTFUB", href: "/category/consintfub/" },
    { label: "Eleições", href: "/category/eleicoes/" },
  ],
  transparencia: [
    { label: "Prestação de Contas", href: "/category/transparencia/prestacao-de-contas/" },
    { label: "Contratos e Convênios", href: "/contratos-convenios/" },
    { label: "Comissão de Ética", href: "/category/comissao-de-etica/" },
  ],
};

const archiveYears = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"];

export default function Footer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArchive, setSelectedArchive] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca/?s=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleArchiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedArchive(year);
    if (year) {
      navigate(`/${year}/`);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 no-print" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4" aria-label="SINTFUB, página inicial">
              <img src="/sintfub-logo.png" alt="SINTFUB" className="h-11 w-auto flex-shrink-0" />
              <div>
                <div className="text-white font-black text-lg font-[family-name:var(--font-display)]">SINTFUB</div>
                <div className="text-gray-400 text-xs leading-tight">
                  Sindicato dos Servidores Técnico-Administrativos da<br />Fundação Universidade de Brasília
                </div>
              </div>
            </Link>
            <address className="not-italic space-y-2 text-sm mb-6">
              <p className="text-gray-400">
                UnB, Bloco C, Edifício Multiuso 1, Sala 54/2<br />
                Asa Norte, Brasília/DF · CEP 70910-900
              </p>
              <a href="tel:+5561992316213" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Secretaria: (61) 99231-6213
              </a>
              <a href="tel:+5561992322081" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Jurídico: (61) 99232-2081
              </a>
              <a href="tel:+5561992550589" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Financeiro: (61) 99255-0589
              </a>
              <a href="mailto:sintfub@sintfub.org.br" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                sintfub@sintfub.org.br
              </a>
            </address>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/sintfub" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 bg-gray-800 hover:bg-[#C41230] rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCz4A5n0VW_mMyR88MI177BQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 bg-gray-800 hover:bg-[#C41230] rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.instagram.com/sintfub_unb" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-gray-800 hover:bg-[#C41230] rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-[family-name:var(--font-display)]">
              Quem Somos
            </h3>
            <ul className="space-y-2">
              {footerLinks.institucional.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Publicações */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-[family-name:var(--font-display)]">
              Publicações
            </h3>
            <ul className="space-y-2">
              {footerLinks.publicacoes.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mt-6 mb-4 font-[family-name:var(--font-display)]">
              Jurídico
            </h3>
            <ul className="space-y-2">
              {footerLinks.juridico.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentos + Transparência */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-[family-name:var(--font-display)]">
              Documentos
            </h3>
            <ul className="space-y-2">
              {footerLinks.documentos.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mt-6 mb-4 font-[family-name:var(--font-display)]">
              Transparência
            </h3>
            <ul className="space-y-2">
              {footerLinks.transparencia.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search + Archive */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-[family-name:var(--font-display)]">
              Busca
            </h3>
            <form onSubmit={handleSearch} className="mb-6" role="search">
              <label htmlFor="footer-search" className="sr-only">Buscar</label>
              <div className="flex gap-2">
                <input
                  id="footer-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar..."
                  className="flex-1 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C41230] focus:border-transparent min-w-0"
                />
                <button type="submit" className="bg-[#C41230] hover:bg-[#9B0E25] text-white px-3 py-2 rounded-lg transition-colors flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-[family-name:var(--font-display)]">
              Arquivos
            </h3>
            <label htmlFor="footer-archive" className="sr-only">Selecionar arquivo por período</label>
            <select
              id="footer-archive"
              value={selectedArchive}
              onChange={handleArchiveChange}
              className="w-full bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41230]"
            >
              <option value="">Selecionar período...</option>
              {archiveYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="mt-6">
              <Link
                to="/filie-se/"
                className="flex items-center justify-center gap-2 w-full bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Filie-se ao SINTFUB
              </Link>
              <Link
                to="/denuncia/"
                className="flex items-center justify-center gap-2 w-full border border-gray-700 text-gray-300 hover:border-[#C41230] hover:text-white font-semibold py-2.5 rounded-xl transition-colors text-sm mt-2"
              >
                Canal de Denúncia
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} SINTFUB, Sindicato dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/politica-de-privacidade/" className="hover:text-gray-300 transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos-de-uso/" className="hover:text-gray-300 transition-colors">
              Termos de Uso
            </Link>
            <Link to="/contato/" className="hover:text-gray-300 transition-colors">
              Contato
            </Link>
            <Link
              to="/admin/login"
              aria-label="Acesso administrativo"
              title="Acesso administrativo"
              className="flex items-center gap-1 text-gray-700 hover:text-gray-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
