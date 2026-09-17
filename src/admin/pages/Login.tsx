import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, DEMO_USER, DEMO_PASSWORD } from "../auth";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() === DEMO_USER && password === DEMO_PASSWORD) {
      setError("");
      adminLogin(remember);
      navigate("/admin");
    } else {
      setError("Usuário ou senha incorretos. Confira as credenciais de demonstração abaixo.");
    }
  };

  const fillDemo = () => {
    setUsername(DEMO_USER);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/sintfub-logo.png" alt="SINTFUB" className="h-14 w-auto mx-auto mb-4" />
          <h1 className="font-black text-gray-900 text-lg">Painel Administrativo</h1>
          <p className="text-sm text-gray-500 mt-1">SINTFUB — Sindicato dos Servidores Técnico-Administrativos da FUB</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-[#C41230] text-sm rounded-lg px-3.5 py-2.5">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@sintfub.org.br"
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41230]/20 focus:border-[#C41230]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                <svg className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.243 4.243M9.878 9.878L3 3m6.878 6.878L21 21" />
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-gray-300 text-[#C41230] focus:ring-[#C41230]/30"
            />
            Lembrar acesso
          </label>

          <button
            type="submit"
            className="w-full bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold text-sm py-2.5 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="mt-5 bg-gray-100 border border-gray-200 rounded-lg px-4 py-3.5 text-xs text-gray-500">
          <p className="font-bold text-gray-600 mb-1.5 uppercase tracking-wide text-[10px]">Ambiente de demonstração</p>
          <p>
            Usuário demo: <span className="font-mono text-gray-700">{DEMO_USER}</span>
          </p>
          <p>
            Senha demo: <span className="font-mono text-gray-700">{DEMO_PASSWORD}</span>
          </p>
          <button type="button" onClick={fillDemo} className="mt-2 text-[#C41230] font-semibold hover:underline">
            Preencher automaticamente
          </button>
        </div>
      </div>
    </div>
  );
}
