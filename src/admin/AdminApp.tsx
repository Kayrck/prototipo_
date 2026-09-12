import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider } from "./AdminContext";
import { isAdminLoggedIn } from "./auth";
import AdminLayout from "./components/AdminLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Publications from "./pages/Publications";
import PublicationEditor from "./pages/PublicationEditor";
import Categories from "./pages/Categories";
import Multimedia from "./pages/Multimedia";
import MediaLibrary from "./pages/MediaLibrary";
import DocumentsAdmin from "./pages/Documents";
import Denuncias from "./pages/Denuncias";
import Juridico from "./pages/Juridico";
import Transparencia from "./pages/Transparencia";
import Aposentados from "./pages/Aposentados";
import Pages from "./pages/Pages";
import Forms from "./pages/Forms";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setOk(isAdminLoggedIn());
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!ok) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="*"
          element={
            <RequireAuth>
              <AdminLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="publicacoes" element={<Publications />} />
                  <Route path="publicacoes/nova" element={<PublicationEditor />} />
                  <Route path="publicacoes/:id" element={<PublicationEditor />} />
                  <Route path="multimidia" element={<Multimedia />} />
                  <Route path="midia" element={<MediaLibrary />} />
                  <Route path="documentos" element={<DocumentsAdmin />} />
                  <Route path="denuncias" element={<Denuncias />} />
                  <Route path="juridico" element={<Juridico />} />
                  <Route path="transparencia" element={<Transparencia />} />
                  <Route path="aposentados" element={<Aposentados />} />
                  <Route path="paginas" element={<Pages />} />
                  <Route path="categorias" element={<Categories />} />
                  <Route path="formularios" element={<Forms />} />
                  <Route path="comentarios" element={<Comments />} />
                  <Route path="usuarios" element={<Users />} />
                  <Route path="configuracoes" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </AdminLayout>
            </RequireAuth>
          }
        />
      </Routes>
    </AdminProvider>
  );
}
