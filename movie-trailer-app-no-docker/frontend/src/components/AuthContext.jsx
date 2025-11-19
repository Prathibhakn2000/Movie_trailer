// src/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext(null);

// Provider
export function AuthProvider({ children }) {
  const [role, setRole] = useState(null); // "user" or "admin"
  const [token, setToken] = useState(null);

  const login = (newRole, newToken) => {
    setRole(newRole);
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
