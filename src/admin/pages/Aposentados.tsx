import CategoryWorkspace from "../components/CategoryWorkspace";

export default function Aposentados() {
  return (
    <CategoryWorkspace
      title="Aposentados"
      description="Notícias, comunicados, eventos, documentos, vídeos e fotos voltados à categoria aposentada."
      pubCategorySlugs={["aposentados"]}
      docCategories={["Aposentado"]}
    />
  );
}
