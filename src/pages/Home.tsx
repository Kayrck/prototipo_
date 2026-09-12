import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import { newsItems, documents } from "../data/content";

const heroSlides = [
  {
    image: "/img/consintfub-geral.jpg",
    tag: "SINTFUB em ação",
    headline: "Defendendo os trabalhadores da Fundação Universidade de Brasília",
    subtext: "O SINTFUB representa e protege os direitos dos servidores ativos e aposentados da FUB. Juntos somos mais fortes.",
    ctaPrimary: { label: "Filie-se ao SINTFUB", href: "/filie-se/" },
    ctaSecondary: { label: "Saiba mais", href: "/quem-somos/" },
  },
  {
    image: "/img/aposentados-reuniao-2.jpg",
    tag: "Assembleia Geral",
    headline: "Sua voz importa. Participe das assembleias do SINTFUB",
    subtext: "As assembleias gerais são o espaço democrático onde filiados deliberam sobre as principais pautas do sindicato.",
    ctaPrimary: { label: "Ver publicações", href: "/category/publicacoes/" },
    ctaSecondary: { label: "Contato", href: "/contato/" },
  },
  {
    image: "/img/cldf-hub-homenagem.jpg",
    tag: "Unidade e luta",
    headline: "Conquistas coletivas que transformam a vida dos trabalhadores",
    subtext: "Mais de uma década de luta pela valorização, pelos direitos e pela dignidade dos servidores da UnB.",
    ctaPrimary: { label: "Jurídico Trabalhista", href: "/category/juridico-trabalhista/" },
    ctaSecondary: { label: "Denuncie", href: "/denuncia/" },
  },
];

const strategicCTAs = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Convênios e Parcerias",
    desc: "Benefícios exclusivos para filiados",
    href: "/contratos-convenios/",
    highlight: false,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    label: "Jurídico Trabalhista",
    desc: "Defesa dos seus direitos laborais",
    href: "/category/juridico-trabalhista/",
    highlight: false,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: "Jurídico Cível",
    desc: "Assessoria em demandas civis",
    href: "/category/juridico-civel/",
    highlight: false,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    label: "Filie-se",
    desc: "Junte-se ao SINTFUB hoje",
    href: "/filie-se/",
    highlight: true,
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[540px] lg:h-[620px] bg-gray-900 overflow-hidden" aria-label="Banner principal">
        <img
          key={currentSlide}
          src={slide.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-45 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative h-full max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold text-[#C41230] bg-black/35 border border-white/20 rounded-full px-4 py-1.5 mb-5 uppercase tracking-widest">
              {slide.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5 font-[family-name:var(--font-display)]">
              {slide.headline}
            </h1>
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
              {slide.subtext}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={slide.ctaPrimary.href}
                className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                {slide.ctaPrimary.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to={slide.ctaSecondary.href}
                className="inline-flex items-center gap-2 bg-black/35 hover:bg-black/50 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                {slide.ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-6 lg:left-8 flex gap-2" role="tablist" aria-label="Controles do carrossel">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentSlide}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-[#C41230]" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Strategic CTAs */}
      <section className="bg-offwhite border-b border-gray-100" aria-label="Áreas de acesso rápido">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 -mt-10 relative z-10 gap-3 pb-8 pt-0 sm:gap-4">
            {strategicCTAs.map((cta) => (
              <Link
                key={cta.label}
                to={cta.href}
                className={`group flex flex-col items-center text-center gap-3 rounded-2xl p-5 lg:p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${
                  cta.highlight
                    ? "bg-[#C41230] text-white"
                    : "bg-white text-gray-800 border border-gray-100"
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  cta.highlight ? "bg-white/20" : "bg-red-50 text-[#C41230] group-hover:bg-[#C41230] group-hover:text-white transition-colors"
                }`}>
                  {cta.icon}
                </div>
                <div>
                  <div className={`font-bold text-sm lg:text-base leading-tight font-[family-name:var(--font-display)] ${
                    cta.highlight ? "text-white" : "text-gray-900"
                  }`}>
                    {cta.label}
                  </div>
                  <div className={`text-xs mt-1 hidden sm:block ${cta.highlight ? "text-red-200" : "text-gray-500"}`}>
                    {cta.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-100 py-8 bg-offwhite" aria-label="Números do SINTFUB">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto sm:mx-0">
            {[
              { value: "40+", label: "Anos de luta sindical", desc: "Defendendo os trabalhadores da FUB desde 1985" },
              { value: "4", label: "Departamentos de atendimento", desc: "Secretaria, Jurídico, Financeiro e HUB" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col bg-white border border-gray-100 border-l-4 border-l-[#C41230] rounded-xl px-5 py-4 sm:px-6 sm:py-5 shadow-sm"
              >
                <div className="text-3xl lg:text-4xl font-black text-[#C41230] font-[family-name:var(--font-display)] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-gray-900">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News section */}
      <section className="py-16 bg-offwhite" aria-labelledby="news-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-[#C41230] uppercase tracking-widest mb-2">Últimas</p>
              <h2 id="news-heading" className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">
                Notícias em destaque
              </h2>
            </div>
            <Link
              to="/category/publicacoes/noticias/"
              className="text-sm font-semibold text-[#C41230] flex items-center gap-1.5 hidden sm:flex"
            >
              Ver todas
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <NewsCard {...newsItems[0]} variant="featured" />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {newsItems.slice(1, 5).map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </div>
          </div>
          <div className="mt-6 sm:hidden">
            <Link
              to="/category/publicacoes/noticias/"
              className="flex items-center justify-center gap-2 w-full border border-[#C41230] text-[#C41230] font-semibold py-3 rounded-xl hover:bg-red-50 transition-colors text-sm"
            >
              Ver todas as notícias
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Documents highlight */}
      <section className="py-16 bg-white" aria-labelledby="docs-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-[#C41230] uppercase tracking-widest mb-2">Documentos</p>
              <h2 id="docs-heading" className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">
                Documentos em destaque
              </h2>
            </div>
            <Link
              to="/category/documentos/"
              className="text-sm font-semibold text-[#C41230] flex items-center gap-1.5 hidden sm:flex"
            >
              Ver todos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                className="group flex items-start gap-4 p-5 bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 rounded-xl transition-all"
              >
                <div className="w-12 h-12 bg-[#C41230] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#9B0E25] transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-[#C41230] uppercase tracking-wider block mb-1">{doc.type}</span>
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-[#C41230] transition-colors line-clamp-2">
                    {doc.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">{doc.date}</span>
                    {doc.size && <span className="text-xs text-gray-400">• {doc.size}</span>}
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#C41230] flex-shrink-0 transition-colors mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Multimedia section */}
      <section className="py-16 bg-gray-900" aria-labelledby="media-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-[#C41230] uppercase tracking-widest mb-2">Conteúdo</p>
              <h2 id="media-heading" className="text-2xl lg:text-3xl font-black text-white font-[family-name:var(--font-display)]">
                Multimídias
              </h2>
            </div>
            <Link
              to="/category/multimidia/"
              className="text-sm font-semibold text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              Ver todos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "HUB · 54 anos",
                href: "https://www.youtube.com/watch?v=cCoZSAESKpA",
                external: true,
                image: "/img/video-hub-54-anos.jpg",
                icon: (
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ),
              },
              {
                label: "Fala da Nadia",
                href: "https://www.youtube.com/watch?v=RIVp_ClgKGQ",
                external: true,
                image: "/img/video-fala-nadia.jpg",
                icon: (
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ),
              },
              {
                label: "Fotos",
                href: "/category/multimidia/fotos/",
                image: "/img/consintfub-8.png",
                icon: (
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                label: "Cards",
                href: "/category/multimidia/cards/",
                image: "/img/conf-educacao.jpg",
                icon: (
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
              },
            ].map((item) => {
              const tile = (
                <>
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="relative h-full flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-black/35 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-[#C41230]/80 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-white font-bold text-lg font-[family-name:var(--font-display)]">{item.label}</span>
                  </div>
                </>
              );
              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden h-48 bg-gray-800"
                  aria-label={`Assistir "${item.label}" no YouTube`}
                >
                  {tile}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="group relative rounded-2xl overflow-hidden h-48 bg-gray-800"
                  aria-label={item.label}
                >
                  {tile}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Filiação */}
      <section className="py-16 bg-[#C41230]" aria-labelledby="cta-filiacao">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 id="cta-filiacao" className="text-2xl lg:text-4xl font-black text-white mb-4 font-[family-name:var(--font-display)]">
                Faça parte do SINTFUB
              </h2>
              <p className="text-red-200 text-base lg:text-lg leading-relaxed">
                A filiação garante acesso a representação jurídica, convênios exclusivos, participação nas assembleias e muito mais. Proteja seus direitos como servidor da FUB.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                to="/filie-se/"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#C41230] font-black px-8 py-4 rounded-xl hover:bg-red-50 transition-colors text-base shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Quero me filiar
              </Link>
              <Link
                to="/contato/"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base"
              >
                Tirar dúvidas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Informativos section */}
      <section className="py-16 sm:py-20 bg-offwhite" aria-labelledby="informativos-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo collage */}
            <div className="hidden lg:flex flex-col gap-4">
              <img
                src="/img/cldf-hub-homenagem.jpg"
                alt=""
                aria-hidden="true"
                className="w-full h-56 rounded-[1.75rem] object-cover shadow-lg"
              />
              <div className="grid grid-cols-2 gap-4 items-start">
                <div className="bg-[#C41230] rounded-2xl shadow-lg p-3.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-white text-xs font-bold leading-tight font-[family-name:var(--font-display)]">
                    40+ anos<br />de história
                  </div>
                </div>
                <img
                  src="/img/aposentados-reuniao-2.jpg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-44 rounded-[1.75rem] object-cover shadow-lg"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-xs font-bold text-[#C41230] uppercase tracking-widest mb-2">Publicações</p>
              <h2 id="informativos-heading" className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 font-[family-name:var(--font-display)]">
                Informativos e publicações
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Acompanhe as notícias, informativos e comunicados mais recentes do SINTFUB sobre a categoria.
              </p>
              <div className="space-y-5 mb-8">
                {newsItems.slice(3, 6).map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#C41230]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <Link to={`/${item.slug}/`} className="font-bold text-gray-900 text-sm hover:text-[#C41230] transition-colors line-clamp-1">
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{item.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/category/informativos/"
                className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#9B0E25] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Ver todas as publicações
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Access areas */}
      <section className="py-16 bg-offwhite" aria-labelledby="areas-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-[#C41230] uppercase tracking-widest mb-2">Acesso rápido</p>
            <h2 id="areas-heading" className="text-2xl lg:text-3xl font-black text-gray-900 font-[family-name:var(--font-display)]">
              Áreas do SINTFUB
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: "Quem Somos", href: "/quem-somos/", desc: "História, missão e coordenação executiva", illustration: "/img/area-quem-somos.svg" },
              { label: "Transparência", href: "/category/transparencia/", desc: "Prestação de contas e documentos financeiros", illustration: "/img/area-transparencia.svg" },
              { label: "Aposentados", href: "/category/aposentado/", desc: "Notícias e suporte previdenciário", illustration: "/img/area-aposentados.svg" },
              { label: "Denúncia", href: "/denuncia/", desc: "Canal de denúncias com sigilo garantido", illustration: "/img/area-denuncia.svg" },
              { label: "Contato", href: "/contato/", desc: "Fale com a Secretaria e demais setores", illustration: "/img/area-contato.svg" },
            ].map((area) => (
              <Link
                key={area.label}
                to={area.href}
                className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-gray-100 hover:border-[#C41230] hover:shadow-md transition-all bg-white"
              >
                <img src={area.illustration} alt="" aria-hidden="true" className="w-full h-28 object-contain" />
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#C41230] transition-colors font-[family-name:var(--font-display)]">
                  {area.label}
                </span>
                <span className="text-xs text-gray-500 leading-snug">{area.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
