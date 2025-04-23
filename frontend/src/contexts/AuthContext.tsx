import React, { createContext, useContext, useState } from 'react';

export type Role = 'borrower' | 'lender' | 'admin';

interface AuthState {
  isAuthenticated: boolean;
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setAuth] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const login = (r: Role) => {
    setAuth(true);
    setRole(r);
  };
  const logout = () => {
    setAuth(false);
    setRole(null);
  };
  return <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);