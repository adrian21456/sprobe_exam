"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Optional: Load from localStorage if needed
    const savedToken = localStorage.getItem("token");
    let savedUser = null;
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        savedUser = JSON.parse(userString);
      }
    } catch (err) {
      savedUser = null;
    }
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
