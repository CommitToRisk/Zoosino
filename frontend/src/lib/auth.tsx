import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import type { User } from '@/types'; 

type LoginCredentials = {
  username: string;
  password?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: LoginCredentials) => Promise<void>;
  loginGuest: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateBalance: (newBalance: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const response = await api.get('/api/me');
      setUser(response.data);
    } catch (e) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  function updateBalance(newBalance: number) {
    if (user) {
      setUser({ ...user, balance: newBalance });
    }
  };

  async function login(credentials: LoginCredentials) {
    await api.post('/api/login', credentials);
    await checkAuth();
  }

  async function register(credentials: LoginCredentials) {
    await api.post('/api/register', credentials);
    await checkAuth();
  }

  async function loginGuest() {
    await api.post('/api/guest'); 
    await checkAuth();
  }

  async function logout() {
    try {
      await api.post('/api/logout');
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      loginGuest, 
      logout, 
      checkAuth,
      updateBalance
    }}>
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