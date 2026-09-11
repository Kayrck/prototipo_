import { BrowserRouter, Routes, Route, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import Home from "./pages/Home";
import NewsListing from "./pages/NewsListing";
import Post from "./pages/Post";
import Membership from "./pages/Membership";
import Complaint from "./pages/Complaint";
import Contact from "./pages/Contact";
import Documents from "./pages/Documents";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import HubPage from "./pages/HubPage";
import BackToTop from "./components/BackToTop";
import { newsItems } from "./data/content";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PostOrNotFound() {
  const { slug } = useParams<{ slug: string }>();
  const post = newsItems.find((n) => n.slug === slug);
  if (post) return <Post />;
  return <NotFound />;
}

function AppShell() {
  const location = useLocation();
  const isFormPage = ["/filie-se", "/denuncia", "/contato"].some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <div className="flex flex-col min-h-full">
      <a href="#main-content" className="skip-link">Ir para o conteúdo principal</a>
      <ScrollToTop />
      <Header />
      <main id="main-content" className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Search */}
          <Route path="/busca/" element={<Search />} />
          <Route path="/busca" element={<Search />} />

          {/* Institutional forms */}
          <Route path="/filie-se/" element={<Membership />} />
          <Route path="/filie-se" element={<Membership />} />
          <Route path="/denuncia/" element={<Complaint />} />
          <Route path="/denuncia" element={<Complaint />} />
          <Route path="/contato/" element={<Contact />} />
          <Route path="/contato" element={<Contact />} />

          {/* Documents */}
          <Route path="/estatuto/" element={<Documents />} />
          <Route path="/estatuto" element={<Documents />} />
          <Route path="/resolucoes-boletins/" element={<Documents />} />
          <Route path="/resolucoes-boletins" element={<Documents />} />
          <Route path="/atas-de-assembleias-2018/" element={<Documents />} />
          <Route path="/atas-de-assembleias-2018" element={<Documents />} />

          {/* Categories, ordered most specific first */}
          <Route path="/category/documentos/" element={<Documents />} />
          <Route path="/category/documentos/atas/" element={<Documents />} />
          <Route path="/category/consintfub/" element={<Documents />} />
          <Route path="/category/eleicoes/" element={<Documents />} />

          <Route path="/category/juridico-trabalhista/" element={<HubPage />} />
          <Route path="/category/juridico-civel/" element={<HubPage />} />
          <Route path="/category/transparencia/" element={<HubPage />} />
          <Route path="/category/transparencia/:sub/" element={<NewsListing />} />
          <Route path="/category/aposentado/" element={<HubPage />} />

          <Route path="/category/publicacoes/" element={<NewsListing />} />
          <Route path="/category/publicacoes/:sub/" element={<NewsListing />} />
          <Route path="/category/noticias/" element={<NewsListing />} />
          <Route path="/category/publicacoes/noticias/" element={<NewsListing />} />
          <Route path="/category/informativos/" element={<NewsListing />} />
          <Route path="/category/multimidia/" element={<NewsListing />} />
          <Route path="/category/multimidia/:sub/" element={<NewsListing />} />
          <Route path="/category/comissao-de-etica/" element={<NewsListing />} />
          <Route path="/category/:category/" element={<NewsListing />} />
          <Route path="/category/:category/:subcategory/" element={<NewsListing />} />

          {/* Tags */}
          <Route path="/tag/:tag/" element={<NewsListing />} />
          <Route path="/tag/:tag" element={<NewsListing />} />

          {/* Institutional pages */}
          <Route path="/quem-somos/" element={<AboutUs />} />
          <Route path="/quem-somos" element={<AboutUs />} />
          <Route path="/quem-somos/:slug/" element={<AboutUs />} />
          <Route path="/quem-somos/:slug" element={<AboutUs />} />
          <Route path="/missao/" element={<AboutUs />} />
          <Route path="/memoria-sindical/" element={<AboutUs />} />
          <Route path="/agenda-da-coordenacao-executiva/" element={<AboutUs />} />
          <Route path="/corpo-administrativo/" element={<AboutUs />} />
          <Route path="/juridico/" element={<HubPage />} />
          <Route path="/contratos-convenios/" element={<HubPage />} />

          {/* Legal */}
          <Route path="/politica-de-privacidade/" element={<PrivacyPolicy />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-de-uso/" element={<TermsOfUse />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />

          {/* Posts by slug, catch-all before 404. A single dynamic segment
              also used to be split into a sibling "/:year/" route, but two
              same-shape params are ambiguous to the router and one of them
              always wins arbitrarily; both pointed at PostOrNotFound anyway. */}
          <Route path="/:slug/" element={<PostOrNotFound />} />
          <Route path="/:slug" element={<PostOrNotFound />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />

      {/* WhatsApp widget: safe bottom zone on form pages mobile */}
      <div className={isFormPage ? "sm:block" : ""}>
        <WhatsAppWidget />
      </div>
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
