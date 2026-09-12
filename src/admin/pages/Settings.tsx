import { useState } from "react";
import { useAdmin } from "../AdminContext";
import { Toast, AdminPageHeader } from "../components/Shared";

export default function Settings() {
  const { settings, updateSettings } = useAdmin();
  const [form, setForm] = useState(settings);
  const [toast, setToast] = useState<string | null>(null);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = () => {
    updateSettings(form);
    setToast("Configurações salvas.");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <AdminPageHeader
        title="Configurações"
        description="Informações institucionais, redes sociais, SEO e configurações gerais do site."
        action={
          <button onClick={handleSave} className="bg-[#C41230] hover:bg-[#9B0E25] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            Salvar alterações
          </button>
        }
      />

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
          <h2 className="font-bold text-gray-900 text-sm">Dados do sindicato</h2>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Nome</label>
            <input value={form.siteName} onChange={(e) => set("siteName", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">E-mail</label>
            <input value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Telefone · Secretaria</label>
              <input value={form.phoneSecretaria} onChange={(e) => set("phoneSecretaria", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Telefone · Jurídico</label>
              <input value={form.phoneJuridico} onChange={(e) => set("phoneJuridico", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Telefone · Financeiro</label>
              <input value={form.phoneFinanceiro} onChange={(e) => set("phoneFinanceiro", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Telefone · Subsede HUB</label>
              <input value={form.phoneSubsedeHub} onChange={(e) => set("phoneSubsedeHub", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Endereço</label>
            <textarea value={form.address} onChange={(e) => set("address", e.target.value)} rows={2} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg resize-none" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
          <h2 className="font-bold text-gray-900 text-sm">Redes sociais</h2>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Facebook</label>
            <input value={form.facebook} onChange={(e) => set("facebook", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Instagram</label>
            <input value={form.instagram} onChange={(e) => set("instagram", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">YouTube</label>
            <input value={form.youtube} onChange={(e) => set("youtube", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
          <h2 className="font-bold text-gray-900 text-sm">SEO</h2>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Título do site</label>
            <input value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Descrição</label>
            <textarea value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} rows={2} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg resize-none" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">URL</label>
              <input value={form.seoUrl} onChange={(e) => set("seoUrl", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Imagem social</label>
              <input value={form.seoSocialImage} onChange={(e) => set("seoSocialImage", e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg font-mono" />
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
