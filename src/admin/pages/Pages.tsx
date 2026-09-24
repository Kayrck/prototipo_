import { useState } from "react";
import { StatusBadge, Toast, AdminPageHeader } from "../components/Shared";

interface SitePage {
  id: string;
  name: string;
  path: string;
  status: "publicado" | "rascunho";
}

const initialPages: SitePage[] = [
  { id: "home", name: "Home", path: "/", status: "publicado" },
  { id: "quem-somos", name: "SINTFUB (Quem Somos)", path: "/quem-somos/", status: "publicado" },
  { id: "juridico", name: "Jurídico", path: "/juridico/", status: "publicado" },
  { id: "documentos", name: "Documentos", path: "/category/documentos/", status: "publicado" },
  { id: "transparencia", name: "Transparência", path: "/category/transparencia/", status: "publicado" },
  { id: "aposentados", name: "Aposentados", path: "/category/aposentado/", status: "publicado" },
  { id: "servicos", name: "Serviços", path: "/servicos/", status: "publicado" },
  { id: "agenda", name: "Agenda Institucional", path: "/agenda/", status: "publicado" },
  { id: "temas", name: "Temas (Carreira, URP, Campanha Salarial, Reforma Administrativa)", path: "/temas/", status: "publicado" },
  { id: "convenios", name: "Convênios e Parcerias", path: "/convenios-e-parcerias/", status: "publicado" },
  { id: "hub", name: "Subsede HUB", path: "/hub/", status: "publicado" },
  { id: "contato", name: "Contato", path: "/contato", status: "publicado" },
  { id: "denuncie", name: "Denuncie", path: "/denuncia", status: "publicado" },
  { id: "filie-se", name: "Filie-se", path: "/filie-se", status: "publicado" },
  { id: "multimidia", name: "Multimídia", path: "/category/multimidia", status: "publicado" },
  { id: "privacidade", name: "Política de Privacidade", path: "/politica-de-privacidade", status: "publicado" },
  { id: "termos", name: "Termos de Uso", path: "/termos-de-uso", status: "publicado" },
];

export default function Pages() {
  const [pages, setPages] = useState(initialPages);
  const [toast, setToast] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: p.status === "publicado" ? "rascunho" : "publicado" } : p))
    );
    setToast("Status da página atualizado.");
  };

  return (
    <div>
      <AdminPageHeader title="Páginas" description="Páginas estáticas do site institucional do SINTFUB." />

      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-500 mb-4">
        Estas páginas são componentes fixos do site. A edição de conteúdo estrutural é feita diretamente no código; aqui é possível visualizar, alternar o status de publicação e simular o fluxo editorial.
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">Página</th>
              <th className="px-4 py-3 font-semibold">Rota</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-800">{p.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.path}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <a href={p.path} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-gray-500 hover:text-gray-800 mr-3">
                    Visualizar
                  </a>
                  <button onClick={() => toggleStatus(p.id)} className="text-xs font-semibold text-[#C41230] hover:underline">
                    {p.status === "publicado" ? "Definir como rascunho" : "Publicar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
