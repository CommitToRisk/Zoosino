import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './api';

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<any>;
  register: (data: any) => Promise<any>;
  logout: () => void;
  checkAuth: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const response = await api.get('/me');
      const data = response.data;
      console.log('auth check response:', data);
      setUser(data);
    } catch (e) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    console.log('checking auth');
  }, []);

  async function login(credentials: any) {
    await api.post('/api/login', credentials);
    await checkAuth();
  }

  async function register(data: any) {
    await api.post('/api/register', data);
    // optionally login immediately after registration
  }

  function logout() {
    try {
      api.post('/api/logout');
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, checkAuth }}>
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
