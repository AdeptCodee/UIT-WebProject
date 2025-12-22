import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);

  const value = { isAuthenticated, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
