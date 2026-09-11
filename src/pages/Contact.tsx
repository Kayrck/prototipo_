import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";

type FormStatus = "idle" | "loading" | "success" | "error";

const departments = [
  { label: "Secretaria", phone: "(61) 99231-6213", email: "sintfub@sintfub.org.br", wa: "5561992316213" },
  { label: "Jurídico", phone: "(61) 99232-2081", email: "sintfub@sintfub.org.br", wa: "5561992322081" },
  { label: "Financeiro", phone: "(61) 99255-0589", email: "sintfub@sintfub.org.br", wa: "5561992550589" },
  { label: "Subsede HUB", phone: "(61) 99231-7544", email: "sintfub@sintfub.org.br", wa: "5561992317544" },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [lgpd, setLgpd] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Informe seu nome.";
    if (!formData.email.trim()) errs.email = "Informe seu e-mail.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Informe um e-mail válido.";
    if (!formData.subject.trim()) errs.subject = "Informe o assunto.";
    if (!formData.message.trim()) errs.message = "Escreva sua mensagem.";
    if (!captcha) errs.captcha = "Confirme a verificação de segurança.";
    if (!lgpd) errs.lgpd = "Você deve aceitar os termos para continuar.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setFormStatus("loading");
    setTimeout(() => {
      // Protótipo sem backend: um envio de demonstração pode ser simulado como
      // falha digitando um e-mail iniciado por "erro@", para testar o estado de erro.
      if (formData.email.toLowerCase().startsWith("erro@")) {
        setFormStatus("error");
      } else {
        setFormStatus("success");
      }
    }, 1500);
  };

  if (formStatus === "error") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Breadcrumb items={[{ label: "Contato" }]} />
        <div className="flex-1 flex items-center justify-center py-24 px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-3 font-[family-name:var(--font-display)]">Não foi possível enviar</h1>
            <p className="text-gray-600 mb-8">Ocorreu um erro ao enviar sua mensagem. Tente novamente ou entre em contato pelo WhatsApp.</p>
            <button
              onClick={() => setFormStatus("idle")}
              className="inline-flex items-center gap-2 bg-[#C41230] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#9B0E25] transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (formStatus === "success") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Breadcrumb items={[{ label: "Contato" }]} />
        <div className="flex-1 flex items-center justify-center py-24 px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-3 font-[family-name:var(--font-display)]">Mensagem enviada!</h1>
            <p className="text-gray-600 mb-8">Sua mensagem foi recebida pelo SINTFUB. Entraremos em contato em breve.</p>
            <a href="/" className="inline-flex items-center gap-2 bg-[#C41230] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#9B0E25] transition-colors">
              Voltar para a Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={[{ label: "Contato" }]} />

      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">Fale com o SINTFUB</h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 ml-4">Entre em contato com os nossos departamentos ou envie uma mensagem pelo formulário abaixo.</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div>
            <h2 className="font-bold text-gray-900 mb-6 text-lg font-[family-name:var(--font-display)]">Departamentos</h2>
            <div className="space-y-4 mb-8">
              {departments.map((dept) => (
                <div key={dept.label} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{dept.label}</h3>
                  <div className="space-y-1.5">
                    <a href={`tel:${dept.phone}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#C41230] transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {dept.phone}
                    </a>
                    <a href={`mailto:${dept.email}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#C41230] transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {dept.email}
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${dept.wa}&text=Olá!%20Gostaria%20de%20falar%20com%20o%20departamento%20de%20${encodeURIComponent(dept.label)}%20do%20SINTFUB.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#25D366] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Endereço</h3>
              <address className="not-italic text-xs text-gray-600 leading-relaxed">
                SINTFUB, Sindicato dos Trabalhadores da<br />
                Fundação Universidade de Brasília<br />
                UnB, Bloco C, Edifício Multiuso 1, Sala 54/2<br />
                Asa Norte, Brasília/DF<br />
                CEP: 70910-900
              </address>
            </div>
          </div>

          {/* Form + Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Google Map embed placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 h-56 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-10 h-10 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm font-medium">Mapa do Google</p>
                <p className="text-xs text-gray-400">Campus UnB, Asa Norte, Brasília/DF</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate aria-label="Formulário de contato">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="c-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Seu nome <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
                    </label>
                    <input
                      id="c-name" type="text" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      aria-invalid={!!errors.name} aria-required="true"
                      className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.name ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#C41230]"}`}
                    />
                    {errors.name && <p className="text-xs text-[#C41230] mt-1" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Seu E-mail <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
                    </label>
                    <input
                      id="c-email" type="email" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      aria-invalid={!!errors.email} aria-required="true"
                      className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.email ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#C41230]"}`}
                    />
                    {errors.email && <p className="text-xs text-[#C41230] mt-1" role="alert">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Assunto <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
                  </label>
                  <input
                    id="c-subject" type="text" value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    aria-invalid={!!errors.subject} aria-required="true"
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.subject ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#C41230]"}`}
                  />
                  {errors.subject && <p className="text-xs text-[#C41230] mt-1" role="alert">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="c-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Digite sua mensagem <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
                  </label>
                  <textarea
                    id="c-message" rows={5} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    aria-invalid={!!errors.message} aria-required="true"
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none ${errors.message ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#C41230]"}`}
                  />
                  {errors.message && <p className="text-xs text-[#C41230] mt-1" role="alert">{errors.message}</p>}
                </div>

                {/* Verificação de segurança */}
                <div className={`flex items-center gap-4 p-4 rounded-xl border ${errors.captcha ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
                  <input
                    id="c-captcha" type="checkbox" checked={captcha}
                    onChange={(e) => { setCaptcha(e.target.checked); if (errors.captcha) setErrors((p) => { const e = { ...p }; delete e.captcha; return e; }); }}
                    className="w-5 h-5 accent-[#C41230] flex-shrink-0 cursor-pointer" aria-required="true"
                  />
                  <label htmlFor="c-captcha" className="text-sm text-gray-700 cursor-pointer select-none">
                    Não sou um robô
                  </label>
                  <svg className="w-8 h-8 text-gray-300 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {errors.captcha && <p className="text-xs text-[#C41230] -mt-3" role="alert">{errors.captcha}</p>}

                {/* LGPD */}
                <div className={`flex items-start gap-3 p-4 rounded-xl border ${errors.lgpd ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
                  <input
                    id="c-lgpd" type="checkbox" checked={lgpd}
                    onChange={(e) => { setLgpd(e.target.checked); if (errors.lgpd) setErrors((p) => { const e = { ...p }; delete e.lgpd; return e; }); }}
                    className="mt-0.5 w-4 h-4 accent-[#C41230] flex-shrink-0" aria-required="true"
                  />
                  <label htmlFor="c-lgpd" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                    Li e aceito a{" "}
                    <a href="/politica-de-privacidade/" className="text-[#C41230] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                      Política de Privacidade
                    </a>{" "}
                    do SINTFUB.
                    <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
                  </label>
                </div>
                {errors.lgpd && <p className="text-xs text-[#C41230]" role="alert">{errors.lgpd}</p>}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] disabled:opacity-70 text-white font-bold px-8 py-4 rounded-xl transition-colors"
                >
                  {formStatus === "loading" ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </>
                  ) : "Enviar mensagem"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
