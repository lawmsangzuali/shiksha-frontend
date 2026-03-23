import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/apiClient";
import extractError from "../utils/extractError";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!(user && (user.id || user.email || user.username));

  const bootstrap = useCallback(async () => {
    try {
      const res = await api.get("/api/accounts/me/");
      const me = res.data;

      if (me && (me.id || me.email || me.username)) {
        setUser(me);
        return me;
      } else {
        setUser(null);
        return null;
      }
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const login = async (email, password) => {
    try {
      await api.post("/api/accounts/login/", { email, password });
      setLoading(true);
      const me = await bootstrap();
      return me;
    } catch (err) {
      setLoading(false);
      return Promise.reject(extractError(err));
    }
  };

  const signup = async (payload) => {
    try {
      await api.post("/api/accounts/signup/", payload);
    } catch (err) {
      return Promise.reject(extractError(err));
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/accounts/logout/");
    } catch {
      // ignore network failure
    }

    setUser(null);
  };

  const hasRole = (role) => {
    if (!user) return false;

    if (String(user?.role || "").toLowerCase() === role.toLowerCase()) {
      return true;
    }

    if (Array.isArray(user?.roles)) {
      return user.roles.some(
        (r) => String(r).toLowerCase() === role.toLowerCase()
      );
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, signup, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);