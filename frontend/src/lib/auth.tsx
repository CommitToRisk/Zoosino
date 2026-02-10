import React, { createContext, useContext, useEffect, useState } from 'react';
import api, { setAuthToken } from './api';

type AuthContextType = {
  token: string | null;
  user: any | null;
  login: (username: string | undefined, password: string) => Promise<any>;
  register: (password: string) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'zoosino_token';
const USER_KEY = 'zoosino_user';

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    const u = localStorage.getItem(USER_KEY);
    if (t) {
      setToken(t);
      setAuthToken(t);
    }
    if (u) {
      try {
        setUser(JSON.parse(u));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  async function login(username: string | undefined, password: string) {
    // username may be undefined in some flows; backend can accept only password for register
    const payload: any = { password };
    if (username) payload.username = username;

    const resp = await api.post('/api/login', payload);
    const data = resp.data;
    const newToken = data.token ?? data.access_token ?? data.token_value ?? null;
    const newUser = data.user ?? data;
    if (newToken) {
      setToken(newToken);
      setAuthToken(newToken);
      localStorage.setItem(TOKEN_KEY, newToken);
    }
    if (newUser) {
      setUser(newUser);
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      } catch {}
    }
    return data;
  }

  async function register(password: string) {
    const resp = await api.post('/api/register', { password });
    const data = resp.data;
    const newToken = data.token ?? data.access_token ?? null;
    const newUser = data.user ?? data;
    if (newToken) {
      setToken(newToken);
      setAuthToken(newToken);
      localStorage.setItem(TOKEN_KEY, newToken);
    }
    if (newUser) {
      setUser(newUser);
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      } catch {}
    }
    return data;
  }

  function logout() {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
