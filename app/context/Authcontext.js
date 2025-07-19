"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check localStorage on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('budgy-auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsLoggedIn(authData.isLoggedIn);
    }
    setIsLoading(false);
  }, []);

  const login = (userData = null) => {
    setIsLoggedIn(true);
    // Store auth data in localStorage
    localStorage.setItem('budgy-auth', JSON.stringify({
      isLoggedIn: true,
      user: userData
    }));
    router.push('/dashboard');
  };

  const signup = () => {
    router.push('/signup');
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Clear auth data from localStorage
    localStorage.removeItem('budgy-auth');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
