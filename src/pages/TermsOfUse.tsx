import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={[{ label: "Termos de Uso" }]} />

      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">
              Termos de Uso
            </h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 ml-4">Última atualização: setembro de 2026</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          <div className="prose prose-gray max-w-none space-y-8">
            {[
              {
                title: "1. Aceitação dos termos",
                content: "Ao acessar e utilizar este site, o usuário declara estar ciente e de acordo com estes Termos de Uso e com a Política de Privacidade do SINTFUB.",
              },
              {
                title: "2. Finalidade do site",
                content: "Este site tem finalidade informativa e institucional. Reúne notícias, publicações, documentos, informações jurídicas e de transparência, além dos canais de contato, denúncia e filiação da entidade.",
              },
              {
                title: "3. Conteúdo",
                content: "O conteúdo é produzido e mantido pelo SINTFUB e pode ser alterado ou removido a qualquer momento. Documentos disponibilizados para download refletem a versão vigente na data de publicação.",
              },
              {
                title: "4. Uso adequado",
                content: "É vedado utilizar este site para fins ilícitos, inserir informações falsas nos formulários de Contato, Denúncia ou Filiação, tentar acessar áreas restritas ou prejudicar o funcionamento das páginas e dos serviços.",
              },
              {
                title: "5. Propriedade intelectual",
                content: "A marca, os textos e os materiais gráficos do SINTFUB são protegidos. A reprodução de conteúdo deve indicar a fonte e respeitar a finalidade sindical e informativa do site.",
              },
              {
                title: "6. Links externos",
                content: "O site pode conter links para páginas de terceiros, como redes sociais, entidades parceiras e órgãos públicos. O SINTFUB não se responsabiliza pelo conteúdo ou pelas práticas de privacidade desses sites.",
              },
              {
                title: "7. Disponibilidade",
                content: "O SINTFUB empenha-se em manter o site disponível, mas não garante funcionamento ininterrupto. Manutenções e indisponibilidades pontuais podem ocorrer sem aviso prévio.",
              },
              {
                title: "8. Formulários e protótipo de demonstração",
                content: "Este site é um protótipo de demonstração: os formulários de Contato, Denúncia e Filiação simulam o envio de dados, sem integração com sistemas internos do SINTFUB. Nenhuma solicitação enviada por aqui é processada de fato.",
              },
              {
                title: "9. Alterações a estes termos",
                content: "Estes Termos de Uso podem ser atualizados periodicamente. A data da última atualização é sempre indicada no topo deste documento.",
              },
              {
                title: "10. Contato",
                content: "Dúvidas sobre estes Termos de Uso podem ser encaminhadas para sintfub@sintfub.org.br ou pelo formulário de contato disponível neste site.",
              },
            ].map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-display)]">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm">{section.content}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 p-5 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-gray-700">
              <strong className="text-[#C41230]">Atenção:</strong> Este é um documento demonstrativo. O texto definitivo dos Termos de Uso deve ser elaborado pelo SINTFUB em conjunto com assessoria jurídica.
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Veja também a{" "}
            <Link to="/politica-de-privacidade/" className="text-[#C41230] font-semibold hover:underline">
              Política de Privacidade
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
