
import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '@/services/authService.js';
import profileService from '@/services/profileService.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = authService.getToken();
    const u = authService.getUser();
    if (t) {
      setToken(t);
      if (u) {
        setUser(u);
        setProfile(u);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (mobile, password) => {
    try {
      const res = await authService.login(mobile, password);
      if (res?.error) return { error: res.error };
      if (res?.token) setToken(res.token);
      if (res?.user) {
        setUser(res.user);
        setProfile(res.user);
      }
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error('Login failed') };
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
    } finally {
      setToken(null);
      setUser(null);
      setProfile(null);
      navigate('/auth');
    }
  };

  const hasRole = (role) => {
    if (!user) return false;
    if (user.role && user.role === role) return true;
    if (Array.isArray(user.roles)) return user.roles.includes(role);
    return false;
  };

  const roles = user?.roles || (user?.role ? [user.role] : []);

  return (
    <AuthContext.Provider value={{ user, profile, roles, token, isLoading, signIn, signOut, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
