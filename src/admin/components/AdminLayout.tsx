import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { adminLogout } from "../auth";
import { useAdmin } from "../AdminContext";

const editorialNav = [
  { label: "Dashboard", href: "/admin", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Publicações", href: "/admin/publicacoes", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" },
  { label: "Multimídia", href: "/admin/multimidia", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
  { label: "Categorias", href: "/admin/categorias", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
  { label: "Documentos", href: "/admin/documentos", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { label: "Jurídico", href: "/admin/juridico", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
  { label: "Transparência", href: "/admin/transparencia", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { label: "Denúncias", href: "/admin/denuncias", icon: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z", badgeKey: "denuncias" },
  { label: "Aposentados", href: "/admin/aposentados", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { label: "Páginas", href: "/admin/paginas", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { label: "Mídia", href: "/admin/midia", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8h16M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" },
];

const adminNav = [
  { label: "Comentários", href: "/admin/comentarios", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", badgeKey: "comentarios" },
  { label: "Formulários", href: "/admin/formularios", icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2", badgeKey: "formularios" },
  { label: "Usuários", href: "/admin/usuarios", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Configurações", href: "/admin/configuracoes", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
];

const breadcrumbLabels: Record<string, string> = {
  admin: "Admin",
  publicacoes: "Publicações",
  nova: "Nova publicação",
  multimidia: "Multimídia",
  midia: "Mídia",
  documentos: "Documentos",
  juridico: "Jurídico",
  transparencia: "Transparência",
  denuncias: "Denúncias",
  aposentados: "Aposentados",
  paginas: "Páginas",
  categorias: "Categorias",
  formularios: "Formulários",
  comentarios: "Comentários",
  usuarios: "Usuários",
  configuracoes: "Configurações",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { formSubmissions, comments } = useAdmin();

  const newSubmissions = formSubmissions.filter((f) => f.status === "novo").length;
  const newDenuncias = formSubmissions.filter((f) => f.formType === "Denuncie" && f.status === "novo").length;
  const pendingComments = comments.filter((c) => c.status === "pendente").length;
  const notifCount = newSubmissions + pendingComments;

  const navBadges: Record<string, number> = {
    denuncias: newDenuncias,
    formularios: newSubmissions,
    comentarios: pendingComments,
  };

  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = segments
    .filter((s) => !/^pub-/.test(s) && !/^\d+$/.test(s))
    .map((s) => breadcrumbLabels[s] || s);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  const NavList = () => (
    <>
      <div className="px-4 mt-2 mb-1">
        <p className={`text-[11px] font-bold text-gray-400 uppercase tracking-widest ${collapsed ? "hidden" : ""}`}>Conteúdo editorial</p>
      </div>
      <nav className="space-y-0.5 px-2">
        {editorialNav.map((item) => {
          const badge = item.badgeKey ? navBadges[item.badgeKey] : 0;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/admin"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-[#C41230] text-white" : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <svg className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className={`flex-1 ${collapsed ? "hidden" : ""}`}>{item.label}</span>
                  {!!badge && (
                    <span
                      className={`flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center ${
                        isActive ? "bg-white text-[#C41230]" : "bg-[#C41230] text-white"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div className="px-4 mt-5 mb-1">
        <p className={`text-[11px] font-bold text-gray-400 uppercase tracking-widest ${collapsed ? "hidden" : ""}`}>Administração</p>
      </div>
      <nav className="space-y-0.5 px-2">
        {adminNav.map((item) => {
          const badge = item.badgeKey ? navBadges[item.badgeKey] : 0;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-[#C41230] text-white" : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <svg className="flex-shrink-0" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className={`flex-1 ${collapsed ? "hidden" : ""}`}>{item.label}</span>
                  {!!badge && (
                    <span
                      className={`flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center ${
                        isActive ? "bg-white text-[#C41230]" : "bg-[#C41230] text-white"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar desktop/tablet */}
      <aside className={`hidden md:flex flex-col border-r border-gray-200 bg-white flex-shrink-0 transition-all ${collapsed ? "w-[72px]" : "w-64"}`}>
        <div className="h-16 flex items-center gap-2.5 px-4 border-b border-gray-100 flex-shrink-0">
          <img src="/sintfub-logo.png" alt="SINTFUB" className="h-8 w-auto flex-shrink-0" />
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-black text-[#C41230] text-sm">SINTFUB</div>
              <div className="text-gray-400 text-[10px] uppercase tracking-widest">Admin</div>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto py-3">
          <NavList />
        </div>
      </aside>

      {/* Sidebar mobile (drawer) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col">
            <div className="h-16 flex items-center justify-between gap-2.5 px-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <img src="/sintfub-logo.png" alt="SINTFUB" className="h-8 w-auto" />
                <div className="leading-tight">
                  <div className="font-black text-[#C41230] text-sm">SINTFUB</div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-widest">Admin</div>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu" className="p-2 text-gray-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-3">
              <NavList />
            </div>
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center gap-4 px-4 lg:px-6 flex-shrink-0 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} aria-label="Abrir menu" className="md:hidden p-2 -ml-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            title={collapsed ? "Expandir menu" : "Recolher menu"}
            className="hidden md:flex p-2 -ml-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M9 4v16" />
              {collapsed ? <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3-3 3" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-3 3 3 3" />}
            </svg>
          </button>

          <div className="hidden sm:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Buscar no painel administrativo..."
                aria-label="Busca administrativa"
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#C41230] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Ver site
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <div className="relative">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                aria-label="Notificações"
                aria-expanded={notifOpen}
                className="relative p-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C41230] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {notifCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-40">
                  <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Notificações</p>
                  {newDenuncias > 0 && (
                    <Link to="/admin/denuncias" onClick={() => setNotifOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      {newDenuncias} nova(s) denúncia(s)
                    </Link>
                  )}
                  {newSubmissions - newDenuncias > 0 && (
                    <Link to="/admin/formularios" onClick={() => setNotifOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      {newSubmissions - newDenuncias} nova(s) resposta(s) de formulário
                    </Link>
                  )}
                  {pendingComments > 0 && (
                    <Link to="/admin/comentarios" onClick={() => setNotifOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      {pendingComments} comentário(s) pendente(s)
                    </Link>
                  )}
                  {notifCount === 0 && <p className="px-4 py-3 text-sm text-gray-400">Nenhuma notificação nova.</p>}
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-gray-200 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2.5 pl-1">
              <div className="w-8 h-8 rounded-full bg-[#C41230] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                A
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold text-gray-800">Administrador</div>
                <div className="text-[11px] text-gray-400">admin@sintfub.org.br</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              aria-label="Sair"
              title="Sair"
              className="p-2 text-gray-500 hover:text-[#C41230] rounded-lg hover:bg-red-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="px-4 lg:px-6 py-3 border-b border-gray-100 bg-white">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                <span className={i === crumbs.length - 1 ? "text-gray-700 font-semibold" : ""}>{c}</span>
              </span>
            ))}
          </nav>
        </div>

        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
