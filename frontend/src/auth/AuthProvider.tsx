import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { client } from '../lib/api/client';
import { refreshClient } from '../lib/api/refreshClient';
import { tokenStore } from './tokenStore';

interface User {
  id?: string;
  _id?: string;
  name?: string;
  email: string;
  role: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Bootstrap: try to refresh token on mount only if user previously logged in
  useEffect(() => {
    const bootstrap = async () => {
      const hasSession = localStorage.getItem('ktux_session') === 'true';
      if (!hasSession) {
        setIsLoading(false);
        return;
      }
      try {
        const { data } = await refreshClient.post<{ data: { accessToken: string } }>('/auth/refresh');
        tokenStore.set(data.data.accessToken);
        // Fetch user profile with new token
        const { data: meData } = await client.get<{ data: { user?: User } | User }>('/auth/me');
        const userObj = (meData.data && 'user' in meData.data && meData.data.user) ? meData.data.user : (meData.data as User);
        setUser(userObj);
      } catch {
        // Session expired or invalid
        localStorage.removeItem('ktux_session');
        tokenStore.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await client.post<{ data: { accessToken: string; user: User } }>('/auth/login', {
      email,
      password,
    });
    localStorage.setItem('ktux_session', 'true');
    tokenStore.set(data.data.accessToken);
    setUser(data.data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await client.post('/auth/logout');
    } finally {
      localStorage.removeItem('ktux_session');
      tokenStore.clear();
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
