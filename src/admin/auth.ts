const AUTH_KEY = "sintfub_admin_auth_v1";

export const DEMO_USER = "admin@sintfub.org.br";
export const DEMO_PASSWORD = "SINTFUB2026";

export function isAdminLoggedIn(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "1" || sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function adminLogin(remember: boolean) {
  try {
    if (remember) localStorage.setItem(AUTH_KEY, "1");
    else sessionStorage.setItem(AUTH_KEY, "1");
  } catch {
    // ignora ambientes sem storage disponível
  }
}

export function adminLogout() {
  try {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
  } catch {
    // ignora
  }
}
