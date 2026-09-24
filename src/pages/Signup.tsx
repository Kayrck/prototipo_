import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { WHATSAPP_CHANNEL_URL } from "../data/institutional";

type Status = "idle" | "loading" | "success";

const inputBase = "w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2";
const inputOk = "border-gray-300 focus:ring-[#C41230]";
const inputErr = "border-red-400 focus:ring-red-300";

// Mesmos campos do formulário "Cadastre-se no nosso WhatsApp" do site atual do SINTFUB:
// nome, setor, matrícula (opcional), WhatsApp e e-mail, com verificação e aceite da política.
export default function Signup() {
  const [form, setForm] = useState({ name: "", section: "", registration: "", whatsapp: "", email: "" });
  const [captcha, setCaptcha] = useState(false);
  const [lgpd, setLgpd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [key]: e.target.value });
    if (errors[key]) setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Informe seu nome.";
    if (!form.section.trim()) errs.section = "Informe seu setor.";
    if (form.registration && !/^\d+$/.test(form.registration.trim())) errs.registration = "Use apenas números.";
    const digits = form.whatsapp.replace(/\D/g, "");
    if (!form.whatsapp.trim()) errs.whatsapp = "Informe seu WhatsApp.";
    else if (digits.length < 10 || digits.length > 13) errs.whatsapp = "Informe o número com DDD.";
    if (!form.email.trim()) errs.email = "Informe seu e-mail.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Informe um e-mail válido.";
    if (!captcha) errs.captcha = "Confirme a verificação de segurança.";
    if (!lgpd) errs.lgpd = "Você deve aceitar os termos para continuar.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    // Protótipo sem backend: o cadastro é apenas simulado.
    setTimeout(() => setStatus("success"), 1200);
  };

  const field = (id: string, label: string, opts: { key: keyof typeof form; type?: string; required?: boolean; autoComplete?: string; inputMode?: "numeric" | "tel" | "email"; hint?: string }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {opts.required ? (
          <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
        ) : (
          <span className="text-gray-400 font-normal"> (opcional)</span>
        )}
      </label>
      <input
        id={id}
        type={opts.type || "text"}
        value={form[opts.key]}
        onChange={set(opts.key)}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        aria-invalid={!!errors[opts.key]}
        aria-required={opts.required ? "true" : undefined}
        className={`${inputBase} ${errors[opts.key] ? inputErr : inputOk}`}
      />
      {opts.hint && !errors[opts.key] && <p className="text-xs text-gray-400 mt-1">{opts.hint}</p>}
      {errors[opts.key] && <p className="text-xs text-[#C41230] mt-1" role="alert">{errors[opts.key]}</p>}
    </div>
  );

  if (status === "success") {
    return (
      <div className="min-h-screen bg-offwhite flex flex-col">
        <Breadcrumb items={[{ label: "Serviços", href: "/servicos/" }, { label: "Cadastre-se" }]} />
        <div className="flex-1 flex items-center justify-center py-24 px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-3 font-[family-name:var(--font-display)]">Cadastro enviado</h1>
            <p className="text-gray-600 mb-8">
              Obrigado! Você passará a receber notícias, informes e conteúdos relevantes do SINTFUB por e-mail e WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#C41230] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#9B0E25] transition-colors"
              >
                Seguir o Canal no WhatsApp
              </a>
              <Link to="/" className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-[#C41230] hover:text-[#C41230] transition-colors">
                Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb items={[{ label: "Serviços", href: "/servicos/" }, { label: "Cadastre-se" }]} />

      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">Cadastre-se no nosso WhatsApp</h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 ml-4 max-w-2xl">
            Faça seu cadastro agora! Preencha o formulário abaixo e receba notícias, informes e conteúdos relevantes diretamente em seu e-mail e WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <form onSubmit={handleSubmit} noValidate aria-label="Formulário de cadastro" className="lg:col-span-2 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {field("s-name", "Seu nome", { key: "name", required: true, autoComplete: "name" })}
              {field("s-section", "Seu setor", { key: "section", required: true })}
              {field("s-registration", "Matrícula", { key: "registration", inputMode: "numeric" })}
            </div>
            {field("s-whatsapp", "Seu WhatsApp", { key: "whatsapp", type: "tel", required: true, autoComplete: "tel", inputMode: "tel", hint: "Com DDD, por exemplo (61) 99999-9999." })}
            {field("s-email", "Seu e-mail", { key: "email", type: "email", required: true, autoComplete: "email", inputMode: "email" })}

            {/* Verificação de segurança */}
            <div className={`flex items-center gap-4 p-4 rounded-xl border ${errors.captcha ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
              <input
                id="s-captcha"
                type="checkbox"
                checked={captcha}
                onChange={(e) => {
                  setCaptcha(e.target.checked);
                  if (errors.captcha) setErrors((p) => { const n = { ...p }; delete n.captcha; return n; });
                }}
                className="w-5 h-5 accent-[#C41230] flex-shrink-0 cursor-pointer"
                aria-required="true"
              />
              <label htmlFor="s-captcha" className="text-sm text-gray-700 cursor-pointer select-none">Não sou um robô</label>
            </div>
            {errors.captcha && <p className="text-xs text-[#C41230] -mt-3" role="alert">{errors.captcha}</p>}

            {/* LGPD */}
            <div className={`flex items-start gap-3 p-4 rounded-xl border ${errors.lgpd ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
              <input
                id="s-lgpd"
                type="checkbox"
                checked={lgpd}
                onChange={(e) => {
                  setLgpd(e.target.checked);
                  if (errors.lgpd) setErrors((p) => { const n = { ...p }; delete n.lgpd; return n; });
                }}
                className="mt-0.5 w-4 h-4 accent-[#C41230] flex-shrink-0"
                aria-required="true"
              />
              <label htmlFor="s-lgpd" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                Li e aceito os termos descritos nas{" "}
                <a href="/politica-de-privacidade/" className="text-[#C41230] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                  Políticas de Privacidade
                </a>
                .<abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
              </label>
            </div>
            {errors.lgpd && <p className="text-xs text-[#C41230]" role="alert">{errors.lgpd}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] disabled:opacity-70 text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              {status === "loading" ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar cadastro"
              )}
            </button>
          </form>

          <aside className="space-y-4" aria-label="Outras formas de acompanhar o SINTFUB">
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm mb-2">Prefere não se cadastrar?</h2>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Siga o Canal do SINTFUB no WhatsApp e receba as informações do sindicato no seu celular, sem precisar informar dados.
              </p>
              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                Seguir o Canal no WhatsApp
              </a>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm mb-2">Quer se filiar?</h2>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                O cadastro serve apenas para receber informações do sindicato. A filiação é um processo separado.
              </p>
              <Link to="/filie-se/" className="text-xs font-semibold text-[#C41230] hover:underline">
                Ir para a filiação
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
