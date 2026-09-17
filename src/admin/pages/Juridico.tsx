import CategoryWorkspace from "../components/CategoryWorkspace";

export default function Juridico() {
  return (
    <CategoryWorkspace
      title="Jurídico"
      description="Gestão de conteúdos e documentos das áreas Trabalhista, Cível, Família e Criminal."
      pubCategorySlugs={["juridico-civel", "juridico-trabalhista"]}
      docCategories={["Jurídico"]}
      docKeywords={["URP"]}
      infoNote="A assessoria jurídica do SINTFUB atende as áreas Trabalhista, Cível, Família e Criminal. Publicações e documentos desta seção devem indicar a área correspondente e, quando aplicável, informações de atendimento ou link externo."
    />
  );
}
