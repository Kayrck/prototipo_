import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";

interface FieldDef {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  colSpan?: number;
}

const sections: { title: string; description?: string; fields: FieldDef[] }[] = [
  {
    title: "1. Identificação Funcional",
    description: "Dados de identificação do servidor na FUB e no governo federal.",
    fields: [
      { name: "matricula_fub", label: "Matrícula FUB", type: "text", required: true },
      { name: "matricula_siape", label: "Matrícula SIAPE", type: "text", required: true },
      { name: "identificacao_unica", label: "Identificação Única", type: "text" },
      { name: "matricula", label: "Matrícula", type: "text" },
      {
        name: "situacao",
        label: "Situação Funcional (Ativo/Aposentado)",
        type: "select",
        required: true,
        options: ["Ativo", "Aposentado"],
        colSpan: 2,
      },
    ],
  },
  {
    title: "2. Dados Pessoais",
    description: "Informações pessoais do servidor.",
    fields: [
      { name: "nome", label: "Nome do Servidor", type: "text", required: true, colSpan: 2 },
      { name: "filiacao_pai", label: "Filiação (Pai)", type: "text" },
      { name: "filiacao_mae", label: "Filiação (Mãe)", type: "text" },
      { name: "naturalidade", label: "Naturalidade", type: "text" },
      { name: "uf", label: "UF (Estado)", type: "select", options: ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"] },
      { name: "data_nascimento", label: "Data de Nascimento", type: "date", required: true },
      { name: "estado_civil", label: "Estado Civil", type: "text" },
    ],
  },
  {
    title: "3. Endereço",
    description: "Endereço residencial do servidor.",
    fields: [
      { name: "bairro", label: "Bairro", type: "text" },
      { name: "cidade", label: "Cidade", type: "text" },
      { name: "cep", label: "CEP", type: "text" },
      { name: "tel_residencial", label: "Telefone Residencial", type: "tel" },
    ],
  },
  {
    title: "4. Documentação",
    description: "Documentos de identificação e registros funcionais.",
    fields: [
      { name: "cpf", label: "CPF", type: "text", required: true },
      { name: "rg", label: "RG", type: "text", required: true },
      { name: "org_expedidor", label: "Órgão Expedidor", type: "text" },
      { name: "data_expedicao", label: "Data de Expedição", type: "date" },
      { name: "pis", label: "PIS", type: "text" },
      { name: "ctps", label: "CTPS", type: "text" },
      { name: "serie_ctps", label: "Série CTPS", type: "text" },
      { name: "titulo", label: "Título de Eleitor", type: "text" },
      { name: "zona", label: "Zona Eleitoral", type: "text" },
      { name: "secao", label: "Seção Eleitoral", type: "text" },
    ],
  },
  {
    title: "5. Dados Trabalhistas",
    description: "Informações sobre a situação trabalhista na FUB.",
    fields: [
      { name: "local_trabalho", label: "Local de Trabalho", type: "text", colSpan: 2 },
      { name: "data_admissao", label: "Data de Admissão", type: "date" },
      { name: "cargo", label: "Cargo", type: "text" },
      { name: "classe", label: "Classe", type: "text" },
    ],
  },
  {
    title: "6. Contato",
    description: "Canais de contato do servidor.",
    fields: [
      { name: "tel_trabalho", label: "Telefone do Trabalho", type: "tel" },
      { name: "celular", label: "Celular", type: "tel", required: true },
      { name: "email_pessoal", label: "E-Mail Pessoal", type: "email", required: true },
      { name: "email_profissional", label: "E-Mail Profissional", type: "email" },
    ],
  },
  {
    title: "7. Dados Bancários",
    description: "Informações bancárias para desconto em folha.",
    fields: [
      { name: "banco", label: "Banco", type: "text", required: true },
      { name: "agencia", label: "Agência", type: "text", required: true },
      { name: "conta", label: "Conta", type: "text", required: true },
      { name: "operacao", label: "Operação", type: "text" },
    ],
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Membership() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [lgpd, setLgpd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const e = { ...prev }; delete e[name]; return e; });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    sections.forEach((s) => {
      s.fields.forEach((f) => {
        if (f.required && !formData[f.name]) {
          newErrors[f.name] = "Campo obrigatório";
        }
      });
    });
    if (!lgpd) newErrors["lgpd"] = "Você deve aceitar os termos para continuar.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstError = document.querySelector("[aria-invalid='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      // Protótipo sem backend: digitar um e-mail pessoal iniciado por "erro@" simula falha no envio.
      setStatus((formData.email_pessoal || "").toLowerCase().startsWith("erro@") ? "error" : "success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-offwhite flex flex-col">
        <Breadcrumb items={[{ label: "Filie-se" }]} />
        <div className="flex-1 flex items-center justify-center py-24 px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-3 font-[family-name:var(--font-display)]">
              Ficha enviada com sucesso!
            </h1>
            <p className="text-gray-600 mb-8">
              Sua solicitação de filiação foi recebida pelo SINTFUB. Aguarde o contato da secretaria para confirmação.
            </p>
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
      <Breadcrumb items={[{ label: "Filie-se ao SINTFUB" }]} />

      {/* Page header */}
      <div className="bg-[#C41230] py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold text-red-200 uppercase tracking-widest mb-3">Filiação sindical</span>
            <h1 className="text-2xl lg:text-4xl font-black text-white mb-4 font-[family-name:var(--font-display)]">
              Filie-se ao SINTFUB
            </h1>
            <p className="text-red-100 text-base leading-relaxed">
              Preencha o formulário abaixo para solicitar sua filiação ao Sindicato dos Trabalhadores da Fundação Universidade de Brasília. Todos os campos marcados com <abbr title="obrigatório" className="no-underline text-white font-bold">*</abbr> são obrigatórios.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Sticky sidebar: section index (desktop) */}
          <aside className="hidden xl:block w-60 flex-shrink-0" aria-label="Seções do formulário">
            <div className="sticky top-24">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Seções</p>
              <nav>
                <ol className="space-y-1">
                  {sections.map((s, i) => (
                    <li key={s.title}>
                      <a
                        href={`#section-${i}`}
                        className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-[#C41230] py-1.5 transition-colors group"
                      >
                        <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-[#C41230] group-hover:text-white text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors">
                          {i + 1}
                        </span>
                        {s.title.replace(/^\d+\. /, "")}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#section-lgpd"
                      className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-[#C41230] py-1.5 transition-colors group"
                    >
                      <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-[#C41230] group-hover:text-white text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors">
                        8
                      </span>
                      Consentimento
                    </a>
                  </li>
                </ol>
              </nav>
              <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong className="text-[#C41230]">Atenção:</strong> Todos os campos marcados com <strong>*</strong> são obrigatórios para a filiação.
                </p>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
        {status === "error" && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3" role="alert">
            <svg className="w-5 h-5 text-[#C41230] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-[#C41230] text-sm">Erro ao enviar o formulário</p>
              <p className="text-red-700 text-sm mt-0.5">Verifique os campos destacados e tente novamente.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate aria-label="Formulário de filiação ao SINTFUB">
          <div className="space-y-10">
            {sections.map((section, sIdx) => (
              <fieldset key={section.title} id={`section-${sIdx}`} className="border-0 p-0 m-0 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-7 bg-[#C41230] rounded-full flex-shrink-0" />
                  <legend className="text-lg font-bold text-gray-900 font-[family-name:var(--font-display)]">
                    {section.title}
                  </legend>
                </div>
                {section.description && (
                  <p className="text-sm text-gray-500 ml-4 mb-5">{section.description}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-4 mt-4">
                  {section.fields.map((field) => {
                    const isError = !!errors[field.name];
                    const baseInputClass = `w-full border rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                      isError
                        ? "border-red-400 bg-red-50 focus:ring-red-300"
                        : "border-gray-300 bg-white focus:ring-[#C41230] focus:border-[#C41230]"
                    }`;

                    return (
                      <div
                        key={field.name}
                        className={field.colSpan === 2 ? "sm:col-span-2" : ""}
                      >
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          {field.label}
                          {field.required && (
                            <abbr title="Campo obrigatório" className="ml-1 text-[#C41230] no-underline font-bold">
                              *
                            </abbr>
                          )}
                        </label>
                        {field.type === "select" ? (
                          <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            aria-invalid={isError}
                            aria-describedby={isError ? `${field.name}-error` : undefined}
                            aria-required={field.required}
                            className={baseInputClass}
                          >
                            <option value="">Selecione...</option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            aria-invalid={isError}
                            aria-describedby={isError ? `${field.name}-error` : undefined}
                            aria-required={field.required}
                            className={baseInputClass}
                          />
                        )}
                        {isError && (
                          <p id={`${field.name}-error`} className="text-xs text-[#C41230] mt-1 flex items-center gap-1" role="alert">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            {/* LGPD */}
            <fieldset id="section-lgpd" className="border-0 p-0 m-0 scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-7 bg-[#C41230] rounded-full flex-shrink-0" />
                <legend className="text-lg font-bold text-gray-900 font-[family-name:var(--font-display)]">
                  8. Consentimento LGPD
                </legend>
              </div>
              <div className="ml-4 bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      id="lgpd"
                      name="lgpd"
                      type="checkbox"
                      checked={lgpd}
                      onChange={(e) => {
                        setLgpd(e.target.checked);
                        if (errors["lgpd"]) setErrors((prev) => { const e = { ...prev }; delete e["lgpd"]; return e; });
                      }}
                      aria-required="true"
                      aria-invalid={!!errors["lgpd"]}
                      aria-describedby={errors["lgpd"] ? "lgpd-error" : undefined}
                      className="w-4 h-4 accent-[#C41230] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="lgpd" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                      Li e aceito os termos da{" "}
                      <a href="/politica-de-privacidade/" className="text-[#C41230] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                        Política de Privacidade
                      </a>{" "}
                      do SINTFUB e autorizo o uso dos meus dados pessoais para fins de filiação sindical, conforme a Lei Geral de Proteção de Dados (LGPD, Lei n.º 13.709/2018).
                      <abbr title="obrigatório" className="ml-1 text-[#C41230] no-underline font-bold">*</abbr>
                    </label>
                    {errors["lgpd"] && (
                      <p id="lgpd-error" className="text-xs text-[#C41230] mt-1 flex items-center gap-1" role="alert">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors["lgpd"]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-disabled={status === "loading"}
                  className="flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-colors text-base"
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
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Enviar ficha de filiação
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                  Seus dados são protegidos pela LGPD e utilizados exclusivamente para fins de filiação sindical.
                </p>
              </div>
            </div>
          </div>
        </form>
          </div>{/* end flex-1 */}
        </div>{/* end flex gap-10 */}
      </div>
    </div>
  );
}
