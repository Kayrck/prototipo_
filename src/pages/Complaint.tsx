import { useState, useRef } from "react";
import Breadcrumb from "../components/Breadcrumb";

type UploadState = "idle" | "selected" | "loading" | "success" | "error" | "invalid";
type FormStatus = "idle" | "loading" | "success" | "error";

export default function Complaint() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [lgpd, setLgpd] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/gif", "application/zip"];
  const maxSizeMB = 10;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      setUploadState("invalid");
      setUploadFile(null);
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setUploadState("error");
      setUploadFile(null);
      return;
    }
    setUploadState("loading");
    setUploadFile(file);
    setTimeout(() => setUploadState("selected"), 500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const syntheticEvent = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(syntheticEvent);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadFile(null);
    setUploadState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Informe seu nome.";
    if (!formData.email.trim()) errs.email = "Informe seu e-mail.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Informe um e-mail válido.";
    if (!formData.subject.trim()) errs.subject = "Informe o assunto.";
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
      // Protótipo sem backend: digitar um e-mail iniciado por "erro@" simula falha no envio.
      setFormStatus(formData.email.toLowerCase().startsWith("erro@") ? "error" : "success");
    }, 1500);
  };

  if (formStatus === "error") {
    return (
      <div className="min-h-screen bg-offwhite flex flex-col">
        <Breadcrumb items={[{ label: "Canal de Denúncia" }]} />
        <div className="flex-1 flex items-center justify-center py-24 px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-3 font-[family-name:var(--font-display)]">Não foi possível enviar</h1>
            <p className="text-gray-600 mb-8">Ocorreu um erro ao registrar sua denúncia. Tente novamente ou use o WhatsApp da Secretaria.</p>
            <button
              onClick={() => setFormStatus("idle")}
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
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
      <div className="min-h-screen bg-offwhite flex flex-col">
        <Breadcrumb items={[{ label: "Canal de Denúncia" }]} />
        <div className="flex-1 flex items-center justify-center py-24 px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-3 font-[family-name:var(--font-display)]">Denúncia enviada</h1>
            <p className="text-gray-600 mb-8">Sua denúncia foi recebida pelo SINTFUB e será tratada com a devida seriedade e sigilo.</p>
            <a href="/" className="inline-flex items-center gap-2 bg-[#C41230] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#9B0E25] transition-colors">
              Voltar para a Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <Breadcrumb items={[{ label: "Canal de Denúncia" }]} />

      {/* Header */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-red-300 uppercase tracking-widest mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Canal sigiloso
            </span>
            <h1 className="text-2xl lg:text-4xl font-black text-white mb-4 font-[family-name:var(--font-display)]">
              Canal de Denúncia
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Use este canal para registrar denúncias relacionadas as condições de trabalho, irregularidades ou situações que afetam os servidores da FUB. Seu relato será tratado com seriedade e responsabilidade pelo SINTFUB.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              {
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                title: "Sigilo",
                desc: "Sua identidade será protegida. Os dados fornecidos são utilizados exclusivamente para o tratamento da denúncia.",
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Segurança",
                desc: "As informações são processadas com segurança pelo SINTFUB e não são compartilhadas com terceiros.",
              },
              {
                icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
                title: "Atendimento",
                desc: "O SINTFUB analisará sua denúncia e tomará as providências cabíveis. Forneça o e-mail para retorno quando necessário.",
              },
            ].map((card) => (
              <div key={card.title} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} noValidate aria-label="Formulário de denúncia">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="d-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Seu nome
                      <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
                    </label>
                    <input
                      id="d-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      aria-invalid={!!errors.name}
                      aria-required="true"
                      className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.name ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#C41230] focus:border-[#C41230]"}`}
                    />
                    {errors.name && <p className="text-xs text-[#C41230] mt-1" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="d-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Seu e-mail
                      <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
                    </label>
                    <input
                      id="d-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      aria-invalid={!!errors.email}
                      aria-required="true"
                      className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.email ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#C41230] focus:border-[#C41230]"}`}
                    />
                    {errors.email && <p className="text-xs text-[#C41230] mt-1" role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="d-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Assunto
                    <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
                  </label>
                  <input
                    id="d-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    aria-invalid={!!errors.subject}
                    aria-required="true"
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.subject ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#C41230] focus:border-[#C41230]"}`}
                  />
                  {errors.subject && <p className="text-xs text-[#C41230] mt-1" role="alert">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="d-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mensagem / relato <span className="text-gray-400 font-normal">(opcional)</span>
                  </label>
                  <textarea
                    id="d-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descreva aqui o que aconteceu: data, local, pessoas envolvidas e demais detalhes relevantes."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41230] focus:border-[#C41230] resize-none"
                  />
                </div>

                {/* File upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Anexe seu documento <span className="text-gray-400 font-normal">(opcional)</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                      uploadState === "loading" ? "cursor-wait" : "cursor-pointer"
                    } ${
                      uploadState === "invalid" || uploadState === "error"
                        ? "border-red-400 bg-red-50"
                        : uploadState === "success" || uploadState === "selected"
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-300 hover:border-[#C41230] hover:bg-red-50"
                    }`}
                    onClick={() => uploadState !== "loading" && fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    role="button"
                    tabIndex={0}
                    aria-label="Área para upload de arquivo"
                    onKeyDown={(e) => e.key === "Enter" && uploadState !== "loading" && fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png,.gif,.zip"
                      aria-label="Selecionar arquivo para upload"
                    />
                    {uploadState === "idle" && (
                      <>
                        <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm font-medium text-gray-700">Clique ou arraste um arquivo aqui</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, ZIP · máximo 10 MB</p>
                      </>
                    )}
                    {uploadState === "loading" && (
                      <>
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-3 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-700">Enviando arquivo...</p>
                        {uploadFile && <p className="text-xs text-gray-500 mt-1">{uploadFile.name}</p>}
                      </>
                    )}
                    {uploadState === "selected" && uploadFile && (
                      <>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          aria-label="Remover arquivo selecionado"
                          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-[#C41230] hover:bg-white rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <svg className="w-10 h-10 text-gray-900 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-900">{uploadFile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB · Clique para trocar</p>
                      </>
                    )}
                    {uploadState === "invalid" && (
                      <>
                        <svg className="w-10 h-10 text-red-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium text-red-700">Tipo de arquivo não aceito</p>
                        <p className="text-xs text-red-500 mt-1">Use PDF, JPG, PNG ou ZIP. Clique para tentar novamente.</p>
                      </>
                    )}
                    {uploadState === "error" && (
                      <>
                        <svg className="w-10 h-10 text-red-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium text-red-700">Arquivo muito grande (máx. 10 MB)</p>
                        <p className="text-xs text-red-500 mt-1">Clique para selecionar outro arquivo.</p>
                      </>
                    )}
                  </div>
                </div>

                {/* LGPD */}
                <div className={`flex items-start gap-3 p-4 rounded-xl border ${errors.lgpd ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
                  <input
                    id="d-lgpd"
                    type="checkbox"
                    checked={lgpd}
                    onChange={(e) => { setLgpd(e.target.checked); if (errors.lgpd) setErrors((p) => { const e = { ...p }; delete e.lgpd; return e; }); }}
                    className="mt-0.5 w-4 h-4 accent-[#C41230] cursor-pointer flex-shrink-0"
                    aria-required="true"
                    aria-invalid={!!errors.lgpd}
                  />
                  <label htmlFor="d-lgpd" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                    Li e aceito a{" "}
                    <a href="/politica-de-privacidade/" className="text-[#C41230] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                      Política de Privacidade
                    </a>{" "}
                    do SINTFUB e autorizo o uso dos meus dados para o tratamento desta denúncia.
                    <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline">*</abbr>
                  </label>
                </div>
                {errors.lgpd && <p className="text-xs text-[#C41230]" role="alert">{errors.lgpd}</p>}

                {/* Verificação de segurança */}
                <div className={`flex items-center gap-4 p-4 rounded-xl border ${errors.captcha ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
                  <input
                    id="d-captcha" type="checkbox" checked={captcha}
                    onChange={(e) => { setCaptcha(e.target.checked); if (errors.captcha) setErrors((p) => { const e = { ...p }; delete e.captcha; return e; }); }}
                    className="w-5 h-5 accent-gray-900 flex-shrink-0 cursor-pointer" aria-required="true"
                  />
                  <label htmlFor="d-captcha" className="text-sm text-gray-700 cursor-pointer select-none">
                    Não sou um robô
                  </label>
                  <svg className="w-8 h-8 text-gray-300 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {errors.captcha && <p className="text-xs text-[#C41230] -mt-3" role="alert">{errors.captcha}</p>}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-70 text-white font-bold px-8 py-4 rounded-xl transition-colors text-base"
                >
                  {formStatus === "loading" ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Enviar Denúncia
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
