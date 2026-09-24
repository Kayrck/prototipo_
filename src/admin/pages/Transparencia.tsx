import CategoryWorkspace from "../components/CategoryWorkspace";

export default function Transparencia() {
  return (
    <CategoryWorkspace
      title="Transparência"
      description="Prestação de Contas e Contratos: documentos financeiros e informações sobre os órgãos de controle."
      pubCategorySlugs={["transparencia", "prestacao-de-contas"]}
      docCategories={["Transparência", "Prestação de Contas"]}
    />
  );
}
