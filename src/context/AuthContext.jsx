import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentAdmin, loginAdmin } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("namari_user"));
    } catch {
      return null;
    }
  });
  const [checkingAuth, setCheckingAuth] = useState(Boolean(localStorage.getItem("namari_token")));

  useEffect(() => {
    if (!localStorage.getItem("namari_token")) return;
    getCurrentAdmin()
      .then(({ user: currentUser }) => {
        setUser(currentUser);
        localStorage.setItem("namari_user", JSON.stringify(currentUser));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("namari_token");
        localStorage.removeItem("namari_user");
      })
      .finally(() => setCheckingAuth(false));
  }, []);

  const login = async (credentials) => {
    const data = await loginAdmin(credentials);
    localStorage.setItem("namari_token", data.token);
    localStorage.setItem("namari_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("namari_token");
    localStorage.removeItem("namari_user");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), checkingAuth, login, logout }),
    [user, checkingAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
