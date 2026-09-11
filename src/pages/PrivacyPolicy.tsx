import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={[{ label: "Política de Privacidade" }]} />

      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#C41230] rounded-full" />
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">
              Política de Privacidade
            </h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 ml-4">
            Última atualização: setembro de 2026 · Base legal: LGPD (Lei n.º 13.709/2018)
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          <div className="prose prose-gray max-w-none space-y-8">
            {[
              {
                title: "1. Quem somos",
                content: "O SINTFUB, Sindicato dos Trabalhadores da Fundação Universidade de Brasília, é o controlador dos dados pessoais coletados por meio deste site (sintfub.org.br) e de seus formulários. Para contato sobre privacidade de dados: sintfub@sintfub.org.br.",
              },
              {
                title: "2. Dados que coletamos",
                content: "Coletamos dados fornecidos voluntariamente pelos usuários por meio dos formulários de Contato, Denúncia e Filiação. Os dados coletados incluem, conforme o formulário: nome, e-mail, telefone, CPF, RG, dados bancários, matrícula funcional, entre outros necessários ao processo de filiação sindical.",
              },
              {
                title: "3. Finalidade do tratamento",
                content: "Os dados são utilizados exclusivamente para: (a) processar solicitações de filiação sindical; (b) responder a mensagens de contato; (c) processar e investigar denúncias recebidas; (d) cumprir obrigações legais do SINTFUB como entidade sindical.",
              },
              {
                title: "4. Base legal",
                content: "O tratamento de dados é realizado com base no consentimento do titular (art. 7.º, inciso I da LGPD), no legítimo interesse do SINTFUB como entidade representativa (art. 7.º, inciso IX) e no cumprimento de obrigação legal (art. 7.º, inciso II).",
              },
              {
                title: "5. Compartilhamento de dados",
                content: "O SINTFUB não comercializa dados pessoais. Os dados poderão ser compartilhados apenas com: (a) parceiros operacionais necessários a prestação dos serviços; (b) autoridades competentes quando exigido por lei.",
              },
              {
                title: "6. Retenção de dados",
                content: "Os dados são retidos pelo prazo necessário ao cumprimento das finalidades descritas nesta política, observados os prazos legais aplicáveis. Dados de filiação são mantidos enquanto a filiação estiver ativa e por período adicional conforme exigência legal.",
              },
              {
                title: "7. Direitos do titular",
                content: "Nos termos da LGPD, o titular dos dados tem direito a: acesso, correção, portabilidade, anonimização, bloqueio ou eliminação de dados desnecessários, revogação do consentimento e oposição ao tratamento. Para exercer esses direitos, entre em contato pelo e-mail: sintfub@sintfub.org.br.",
              },
              {
                title: "8. Cookies",
                content: "Este site pode utilizar cookies para melhorar a experiência de navegação. Os cookies utilizados são de caráter técnico e não rastreiam o comportamento dos usuários fora do site.",
              },
              {
                title: "9. Alterações a esta política",
                content: "Esta política pode ser atualizada periodicamente. Alterações relevantes serão comunicadas por meio do site. A data da última atualização é sempre indicada no topo deste documento.",
              },
              {
                title: "10. Contato",
                content: "Para dúvidas ou solicitações relacionadas a esta política, entre em contato com o SINTFUB pelo e-mail sintfub@sintfub.org.br ou pelo formulário de contato disponível neste site.",
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
              <strong className="text-[#C41230]">Atenção:</strong> Este é um documento demonstrativo. O texto definitivo da Política de Privacidade deve ser elaborado pelo SINTFUB em conjunto com assessoria jurídica especializada em LGPD.
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Veja também os{" "}
            <Link to="/termos-de-uso/" className="text-[#C41230] font-semibold hover:underline">
              Termos de Uso
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
