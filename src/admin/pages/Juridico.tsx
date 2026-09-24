import CategoryWorkspace from "../components/CategoryWorkspace";

export default function Juridico() {
  return (
    <CategoryWorkspace
      title="Jurídico"
      description="Gestão de conteúdos e documentos das áreas trabalhista, cível, de família e dos juizados especiais."
      pubCategorySlugs={["juridico-civel", "juridico-trabalhista"]}
      docCategories={["Jurídico"]}
      docKeywords={["URP"]}
      infoNote="Os plantões jurídicos do SINTFUB acontecem nas áreas trabalhista, cível, de família e dos juizados especiais, na sede do sindicato e na subsede do HUB. Publicações e documentos desta seção devem indicar a área correspondente e, quando aplicável, informações de atendimento ou link externo. Evite afirmar gratuidade do atendimento: ela depende dos contratos vigentes."
    />
  );
}
