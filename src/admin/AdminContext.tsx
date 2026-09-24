import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { newsItems as realNewsItems, documents as realDocuments } from "../data/content";
import { UNION_ADDRESS, TAE_FUB } from "../data/institutional";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type PubStatus = "publicado" | "rascunho" | "agendado" | "arquivado";

export interface AdminPublication {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  gallery: string[];
  video: string;
  date: string;
  scheduledDate: string;
  author: string;
  category: string;
  tags: string[];
  status: PubStatus;
  views: number;
  updatedAt: string;
  externalUrl: string;
  relatedDocument: string;
  seoTitle: string;
  seoDescription: string;
  seoKeyword: string;
  canonicalUrl: string;
  socialImage: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  parent: string;
  description: string;
  image: string;
  status: "ativa" | "inativa";
}

export interface AdminDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  fileName: string;
  fileUrl: string;
  size: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  status: "publicado" | "rascunho";
}

export interface AdminMedia {
  id: string;
  type: "foto" | "video" | "card" | "pdf";
  url: string;
  title: string;
  description: string;
  category: string;
  date: string;
  featured: boolean;
  youtubeUrl: string;
}

export interface AdminFormSubmission {
  id: string;
  formType: "Contato" | "Denuncie" | "Filie-se";
  name: string;
  email: string;
  message: string;
  date: string;
  status: "novo" | "lido" | "respondido";
}

export interface AdminComment {
  id: string;
  author: string;
  content: string;
  publicationTitle: string;
  date: string;
  status: "pendente" | "aprovado" | "spam";
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Administrador" | "Editor" | "Autor";
  status: "ativo" | "inativo";
  lastAccess: string;
}

export interface AdminActivity {
  id: string;
  action: string;
  user: string;
  date: string;
}

export interface AdminSettings {
  siteName: string;
  email: string;
  phoneSecretaria: string;
  phoneJuridico: string;
  phoneFinanceiro: string;
  phoneSubsedeHub: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  seoTitle: string;
  seoDescription: string;
  seoUrl: string;
  seoSocialImage: string;
}

// ---------------------------------------------------------------------------
// Categorias reais do SINTFUB (seed)
// ---------------------------------------------------------------------------

const seedCategories: AdminCategory[] = [
  { id: "cat-1", name: "Notícias", slug: "noticias", parent: "", description: "Notícias gerais do sindicato.", image: "", status: "ativa" },
  { id: "cat-2", name: "Multimídias", slug: "multimidia", parent: "", description: "Fotos, vídeos e cards.", image: "", status: "ativa" },
  { id: "cat-3", name: "Fotos", slug: "fotos", parent: "cat-2", description: "Galerias de fotos de eventos.", image: "", status: "ativa" },
  { id: "cat-4", name: "Vídeos", slug: "videos", parent: "cat-2", description: "Vídeos do canal do SINTFUB.", image: "", status: "ativa" },
  { id: "cat-5", name: "Cards", slug: "cards", parent: "cat-2", description: "Cards e banners de campanha.", image: "", status: "ativa" },
  { id: "cat-6", name: "Informativos", slug: "informativos", parent: "", description: "Boletins, notas, moções e cartas abertas.", image: "", status: "ativa" },
  { id: "cat-7", name: "Atas", slug: "atas", parent: "", description: "Atas de Assembleia Geral.", image: "", status: "ativa" },
  { id: "cat-8", name: "CONSINTFUB", slug: "consintfub", parent: "", description: "Congresso do SINTFUB.", image: "", status: "ativa" },
  { id: "cat-9", name: "Documentos", slug: "documentos", parent: "", description: "Documentos institucionais.", image: "", status: "ativa" },
  { id: "cat-10", name: "Eleições", slug: "eleicoes", parent: "", description: "Processos eleitorais do sindicato.", image: "", status: "ativa" },
  { id: "cat-11", name: "Filie-se", slug: "filie-se", parent: "", description: "Conteúdos sobre filiação.", image: "", status: "ativa" },
  { id: "cat-12", name: "Jurídico - Cível", slug: "juridico-civel", parent: "", description: "Assessoria jurídica cível, família e criminal.", image: "", status: "ativa" },
  { id: "cat-13", name: "Jurídico - Trabalhista", slug: "juridico-trabalhista", parent: "", description: "Assessoria jurídica trabalhista.", image: "", status: "ativa" },
  { id: "cat-14", name: "Aposentado", slug: "aposentados", parent: "", description: "Conteúdos para a categoria aposentada.", image: "", status: "ativa" },
  { id: "cat-15", name: "Plano de Saúde", slug: "plano-de-saude", parent: "", description: "Convênios e planos de saúde.", image: "", status: "ativa" },
  { id: "cat-16", name: "Prestação de Contas", slug: "prestacao-de-contas", parent: "", description: "Prestação de contas da gestão.", image: "", status: "ativa" },
  { id: "cat-17", name: "Transparência", slug: "transparencia", parent: "", description: "Transparência institucional.", image: "", status: "ativa" },
  { id: "cat-18", name: "Campanha Salarial", slug: "campanha-salarial", parent: "", description: "Campanha salarial da categoria.", image: "", status: "ativa" },
  { id: "cat-19", name: "Reforma Administrativa", slug: "reforma-administrativa", parent: "", description: "Acompanhamento da Reforma Administrativa.", image: "", status: "ativa" },
  { id: "cat-20", name: "Informes da FASUBRA", slug: "informes-fasubra", parent: "", description: "Informes de Direção da FASUBRA repassados à categoria.", image: "", status: "ativa" },
];

// ---------------------------------------------------------------------------
// Seed a partir do conteúdo real já usado no site público
// ---------------------------------------------------------------------------

function seedPublications(): AdminPublication[] {
  return realNewsItems.map((item) => ({
    id: `pub-${item.id}`,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.excerpt,
    image: item.image || "",
    gallery: [],
    video: "",
    date: item.date,
    scheduledDate: "",
    author: "Secretaria de Comunicação",
    category: item.categorySlug,
    tags: item.tags,
    status: "publicado",
    views: Math.max(12, item.tags.length * 37 + item.title.length),
    updatedAt: item.date,
    externalUrl: "",
    relatedDocument: "",
    seoTitle: item.title,
    seoDescription: item.excerpt,
    seoKeyword: item.tags[0] || "",
    canonicalUrl: `https://sintfub.org.br/${item.slug}/`,
    socialImage: item.image || "",
  }));
}

function seedDocuments(): AdminDocument[] {
  return realDocuments.map((doc, i) => ({
    id: `doc-${doc.id}`,
    title: doc.title,
    description: (doc as { description?: string }).description || "",
    category: doc.type,
    fileName: doc.title.replace(/\s+/g, "_") + ".pdf",
    fileUrl: doc.url,
    size: doc.size || "",
    date: doc.date,
    author: "Secretaria",
    tags: [],
    featured: i < 2,
    status: "publicado",
  }));
}

function seedMedia(): AdminMedia[] {
  const photos: AdminMedia[] = realNewsItems
    .filter((i) => i.categorySlug === "fotos" && i.image)
    .map((i) => ({ id: `media-foto-${i.id}`, type: "foto", url: i.image!, title: i.title, description: i.excerpt, category: "fotos", date: i.date, featured: false, youtubeUrl: "" }));

  const cards: AdminMedia[] = realNewsItems
    .filter((i) => i.categorySlug === "cards" && i.image)
    .map((i) => ({ id: `media-card-${i.id}`, type: "card", url: i.image!, title: i.title, description: i.excerpt, category: "cards", date: i.date, featured: false, youtubeUrl: "" }));

  const videos: AdminMedia[] = [
    { id: "media-video-1", type: "video", url: "/img/video-hub-54-anos.jpg", title: "HUB · 54 anos", description: "Vídeo da Sessão Solene dos 54 anos do HUB.", category: "videos", date: "2026-09-03", featured: true, youtubeUrl: "https://www.youtube.com/watch?v=cCoZSAESKpA" },
    { id: "media-video-2", type: "video", url: "/img/video-fala-nadia.jpg", title: "Fala da Nadia", description: "Pronunciamento na Sessão Solene.", category: "videos", date: "2026-09-03", featured: false, youtubeUrl: "https://www.youtube.com/watch?v=RIVp_ClgKGQ" },
    { id: "media-video-3", type: "video", url: "/img/video-memorial-greve.jpg", title: "Memorial da Greve de 2024", description: "Vídeo memorial da greve de 2024.", category: "videos", date: "2024-07-12", featured: false, youtubeUrl: "https://www.youtube.com/watch?v=C0cU4hLx398" },
    { id: "media-video-4", type: "video", url: "/img/video-urp-esclarecimentos.jpg", title: "Esclarecimentos sobre a URP/89", description: "Jurídico do SINTFUB esclarece dúvidas sobre a URP/89.", category: "videos", date: "2024-08-14", featured: false, youtubeUrl: "https://www.youtube.com/watch?v=KKazZ1_w7dc" },
  ];

  const otherImages: AdminMedia[] = realNewsItems
    .filter((i) => i.image && !["fotos", "cards"].includes(i.categorySlug))
    .slice(0, 14)
    .map((i) => ({ id: `media-img-${i.id}`, type: "foto", url: i.image!, title: i.title, description: i.excerpt, category: i.categorySlug, date: i.date, featured: false, youtubeUrl: "" }));

  return [...photos, ...cards, ...videos, ...otherImages];
}

// Formulários e comentários: dados de demonstração explícitos (o site público
// não tem um backend real para respostas de formulário ou comentários — esta
// seção existe só para demonstrar como a tela administrativa funcionaria).
const seedFormSubmissions: AdminFormSubmission[] = [
  { id: "form-1", formType: "Contato", name: "Marina Alves Ribeiro", email: "marina.ribeiro@exemplo.com", message: "Gostaria de saber como atualizar meus dados cadastrais de filiação.", date: "2026-09-10", status: "novo" },
  { id: "form-2", formType: "Filie-se", name: "Carlos Eduardo Santos", email: "carlos.santos@exemplo.com", message: "Solicitação de filiação enviada pelo formulário do site.", date: "2026-09-09", status: "lido" },
  { id: "form-3", formType: "Denuncie", name: "Anônimo", email: "anonimo@exemplo.com", message: "Denúncia registrada através do canal de denúncias do site.", date: "2026-09-08", status: "novo" },
  { id: "form-4", formType: "Contato", name: "Fernanda Lima Costa", email: "fernanda.costa@exemplo.com", message: "Dúvida sobre o convênio médico disponível para filiados.", date: "2026-09-05", status: "respondido" },
  { id: "form-5", formType: "Filie-se", name: "Roberto Junqueira", email: "roberto.junqueira@exemplo.com", message: "Solicitação de filiação de servidor aposentado.", date: "2026-09-02", status: "lido" },
];

const seedComments: AdminComment[] = [
  { id: "comment-1", author: "José Antônio Ferreira", content: "Ótima iniciativa do sindicato em defesa da categoria!", publicationTitle: "XXIV CONSINTFUB fortalece a organização da categoria e aprova plano de lutas", date: "2026-08-29", status: "pendente" },
  { id: "comment-2", author: "Teresa Cristina Souza", content: "Alguém sabe informar o horário exato da assembleia?", publicationTitle: "Comunicado de mudança no expediente do dia 03/09, quinta-feira", date: "2026-09-02", status: "aprovado" },
  { id: "comment-3", author: "usuario_spam123", content: "Ganhe dinheiro rápido clicando aqui!!!", publicationTitle: "Sessão Solene na CLDF homenageia os 54 anos do HUB", date: "2026-09-03", status: "spam" },
  { id: "comment-4", author: "Aparecida Melo", content: "Muito importante esse reconhecimento aos servidores do HUB.", publicationTitle: "Sessão Solene na CLDF homenageia os 54 anos do HUB", date: "2026-09-04", status: "pendente" },
];

const seedUsers: AdminUser[] = [
  { id: "user-1", name: "Coordenação de Comunicação e Divulgação", email: "admin@sintfub.org.br", role: "Administrador", status: "ativo", lastAccess: "2026-09-11" },
  { id: "user-2", name: "Camila Oliveira Sobrinho", email: "camila.oliveira@sintfub.org.br", role: "Editor", status: "ativo", lastAccess: "2026-09-10" },
  { id: "user-3", name: "Mônica Regina Peres", email: "monica.peres@sintfub.org.br", role: "Autor", status: "ativo", lastAccess: "2026-09-08" },
  { id: "user-4", name: "Secretaria Geral", email: "secretaria@sintfub.org.br", role: "Editor", status: "inativo", lastAccess: "2026-07-20" },
];

const seedActivities: AdminActivity[] = [
  { id: "act-1", action: "Publicação criada: \"UnB assina primeiros atos de concessão do RSC\"", user: "Coordenação de Comunicação", date: "2026-09-11 09:42" },
  { id: "act-2", action: "Documento atualizado: Ata de Assembleia Geral · 13/05/2026", user: "Secretaria Geral", date: "2026-09-10 15:10" },
  { id: "act-3", action: "Vídeo adicionado: Esclarecimentos sobre a URP/89", user: "Camila Oliveira Sobrinho", date: "2026-09-09 11:05" },
  { id: "act-4", action: "Página publicada: Transparência", user: "Coordenação de Comunicação", date: "2026-09-07 16:30" },
  { id: "act-5", action: "Usuário entrou no sistema", user: "admin@sintfub.org.br", date: "2026-09-11 08:15" },
];

const seedSettings: AdminSettings = {
  siteName: "SINTFUB — Sindicato dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília",
  email: "sintfub@sintfub.org.br",
  phoneSecretaria: "(61) 99231-6213",
  phoneJuridico: "(61) 99232-2081",
  phoneFinanceiro: "(61) 99255-0589",
  phoneSubsedeHub: "(61) 99231-7544",
  address: UNION_ADDRESS,
  facebook: "https://www.facebook.com/sintfub",
  instagram: "https://www.instagram.com/sintfub_unb",
  youtube: "https://www.youtube.com/channel/UCz4A5n0VW_mMyR88MI177BQ",
  seoTitle: "SINTFUB - Sindicato dos Servidores Técnico-Administrativos da Fundação Universidade de Brasília",
  seoDescription: `O SINTFUB representa e protege os direitos dos ${TAE_FUB}, ativos e aposentados.`,
  seoUrl: "https://sintfub.org.br",
  seoSocialImage: "/sintfub-logo.png",
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

interface AdminStore {
  publications: AdminPublication[];
  categories: AdminCategory[];
  documents: AdminDocument[];
  media: AdminMedia[];
  formSubmissions: AdminFormSubmission[];
  comments: AdminComment[];
  users: AdminUser[];
  activities: AdminActivity[];
  settings: AdminSettings;
}

function loadStore(): AdminStore {
  try {
    const raw = localStorage.getItem("sintfub_admin_store_v1");
    if (raw) return JSON.parse(raw) as AdminStore;
  } catch {
    // ignora dados corrompidos e recria a partir do seed
  }
  return {
    publications: seedPublications(),
    categories: seedCategories,
    documents: seedDocuments(),
    media: seedMedia(),
    formSubmissions: seedFormSubmissions,
    comments: seedComments,
    users: seedUsers,
    activities: seedActivities,
    settings: seedSettings,
  };
}

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

interface AdminContextValue extends AdminStore {
  logActivity: (action: string) => void;
  addPublication: (pub: Partial<AdminPublication>) => AdminPublication;
  updatePublication: (id: string, patch: Partial<AdminPublication>) => void;
  deletePublication: (id: string) => void;
  duplicatePublication: (id: string) => void;
  addCategory: (cat: Partial<AdminCategory>) => void;
  updateCategory: (id: string, patch: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;
  addDocument: (doc: Partial<AdminDocument>) => void;
  updateDocument: (id: string, patch: Partial<AdminDocument>) => void;
  deleteDocument: (id: string) => void;
  addMedia: (item: Partial<AdminMedia>) => void;
  updateMedia: (id: string, patch: Partial<AdminMedia>) => void;
  deleteMedia: (id: string) => void;
  updateFormSubmission: (id: string, patch: Partial<AdminFormSubmission>) => void;
  updateComment: (id: string, patch: Partial<AdminComment>) => void;
  deleteComment: (id: string) => void;
  addUser: (user: Partial<AdminUser>) => void;
  updateUser: (id: string, patch: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
  updateSettings: (patch: Partial<AdminSettings>) => void;
  resetDemoData: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<AdminStore>(loadStore);

  useEffect(() => {
    try {
      localStorage.setItem("sintfub_admin_store_v1", JSON.stringify(store));
    } catch {
      // armazenamento indisponível (ex: modo privado); segue apenas em memória
    }
  }, [store]);

  const logActivity = (action: string) => {
    setStore((s) => ({
      activities: [{ id: newId("act"), action, user: "admin@sintfub.org.br", date: new Date().toLocaleString("pt-BR") }, ...s.activities].slice(0, 30),
      publications: s.publications,
      categories: s.categories,
      documents: s.documents,
      media: s.media,
      formSubmissions: s.formSubmissions,
      comments: s.comments,
      users: s.users,
      settings: s.settings,
    }));
  };

  const value: AdminContextValue = {
    ...store,
    logActivity,
    addPublication: (pub) => {
      const created: AdminPublication = {
        id: newId("pub"), title: "", slug: "", excerpt: "", content: "", image: "", gallery: [], video: "",
        date: new Date().toISOString().slice(0, 10), scheduledDate: "", author: "admin@sintfub.org.br", category: "noticias",
        tags: [], status: "rascunho", views: 0, updatedAt: new Date().toISOString().slice(0, 10), externalUrl: "",
        relatedDocument: "", seoTitle: "", seoDescription: "", seoKeyword: "", canonicalUrl: "", socialImage: "",
        ...pub,
      };
      setStore((s) => ({ ...s, publications: [created, ...s.publications] }));
      logActivity(`Publicação criada: "${created.title || "(sem título)"}"`);
      return created;
    },
    updatePublication: (id, patch) => {
      setStore((s) => ({ ...s, publications: s.publications.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString().slice(0, 10) } : p)) }));
    },
    deletePublication: (id) => {
      setStore((s) => ({ ...s, publications: s.publications.filter((p) => p.id !== id) }));
      logActivity("Publicação excluída");
    },
    duplicatePublication: (id) => {
      setStore((s) => {
        const orig = s.publications.find((p) => p.id === id);
        if (!orig) return s;
        const copy: AdminPublication = { ...orig, id: newId("pub"), title: `${orig.title} (cópia)`, slug: `${orig.slug}-copia`, status: "rascunho", views: 0 };
        return { ...s, publications: [copy, ...s.publications] };
      });
      logActivity("Publicação duplicada");
    },
    addCategory: (cat) => {
      const created: AdminCategory = { id: newId("cat"), name: "", slug: "", parent: "", description: "", image: "", status: "ativa", ...cat };
      setStore((s) => ({ ...s, categories: [...s.categories, created] }));
      logActivity(`Categoria criada: "${created.name}"`);
    },
    updateCategory: (id, patch) => {
      setStore((s) => ({ ...s, categories: s.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
    },
    deleteCategory: (id) => {
      setStore((s) => ({ ...s, categories: s.categories.filter((c) => c.id !== id) }));
      logActivity("Categoria excluída");
    },
    addDocument: (doc) => {
      const created: AdminDocument = { id: newId("doc"), title: "", description: "", category: "Ata", fileName: "", fileUrl: "", size: "—", date: new Date().toISOString().slice(0, 10), author: "admin@sintfub.org.br", tags: [], featured: false, status: "rascunho", ...doc };
      setStore((s) => ({ ...s, documents: [created, ...s.documents] }));
      logActivity(`Documento adicionado: "${created.title}"`);
    },
    updateDocument: (id, patch) => {
      setStore((s) => ({ ...s, documents: s.documents.map((d) => (d.id === id ? { ...d, ...patch } : d)) }));
      logActivity("Documento atualizado");
    },
    deleteDocument: (id) => {
      setStore((s) => ({ ...s, documents: s.documents.filter((d) => d.id !== id) }));
      logActivity("Documento excluído");
    },
    addMedia: (item) => {
      const created: AdminMedia = { id: newId("media"), type: "foto", url: "", title: "", description: "", category: "", date: new Date().toISOString().slice(0, 10), featured: false, youtubeUrl: "", ...item };
      setStore((s) => ({ ...s, media: [created, ...s.media] }));
      logActivity(`${created.type === "video" ? "Vídeo adicionado" : "Mídia adicionada"}: "${created.title}"`);
    },
    updateMedia: (id, patch) => {
      setStore((s) => ({ ...s, media: s.media.map((m) => (m.id === id ? { ...m, ...patch } : m)) }));
    },
    deleteMedia: (id) => {
      setStore((s) => ({ ...s, media: s.media.filter((m) => m.id !== id) }));
      logActivity("Mídia excluída");
    },
    updateFormSubmission: (id, patch) => {
      setStore((s) => ({ ...s, formSubmissions: s.formSubmissions.map((f) => (f.id === id ? { ...f, ...patch } : f)) }));
    },
    updateComment: (id, patch) => {
      setStore((s) => ({ ...s, comments: s.comments.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
    },
    deleteComment: (id) => {
      setStore((s) => ({ ...s, comments: s.comments.filter((c) => c.id !== id) }));
    },
    addUser: (user) => {
      const created: AdminUser = { id: newId("user"), name: "", email: "", role: "Autor", status: "ativo", lastAccess: "—", ...user };
      setStore((s) => ({ ...s, users: [...s.users, created] }));
      logActivity(`Usuário criado: "${created.name}"`);
    },
    updateUser: (id, patch) => {
      setStore((s) => ({ ...s, users: s.users.map((u) => (u.id === id ? { ...u, ...patch } : u)) }));
    },
    deleteUser: (id) => {
      setStore((s) => ({ ...s, users: s.users.filter((u) => u.id !== id) }));
    },
    updateSettings: (patch) => {
      setStore((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
      logActivity("Configurações atualizadas");
    },
    resetDemoData: () => {
      localStorage.removeItem("sintfub_admin_store_v1");
      setStore({
        publications: seedPublications(),
        categories: seedCategories,
        documents: seedDocuments(),
        media: seedMedia(),
        formSubmissions: seedFormSubmissions,
        comments: seedComments,
        users: seedUsers,
        activities: seedActivities,
        settings: seedSettings,
      });
    },
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin deve ser usado dentro de AdminProvider");
  return ctx;
}
