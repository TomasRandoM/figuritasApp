import React, { createContext, useContext, useState, useCallback } from 'react';

import UsuarioController from '../controllers/UsuarioController';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback(async (mail, password) => {
    const user = await UsuarioController.login(mail, password);
    setCurrentUser(user);
    return user;
  }, []);

  const register = useCallback(async (payload) => {
    const user = await UsuarioController.create(payload);
    setCurrentUser(user);
    return user;
  }, []);

  const logout = useCallback(() => setCurrentUser(null), []);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
