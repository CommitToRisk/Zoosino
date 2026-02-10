import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './api';
import type { User } from '@/types';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (phrase: string) => Promise<any>;
  updateDisplayName: (newName: string) => Promise<void>;
  checkAuth: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
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

  async function updateDisplayName(newName: string) {
    try {
      await api.put('/api/me', { displayName: newName });
      await checkAuth();
    } catch (e) {
      console.error("Failed to update display name", e);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, updateDisplayName, checkAuth }}>
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
