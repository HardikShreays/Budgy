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

  const signup = (userData = null) => {
    if (!userData || !userData.email || !userData.password) {
      throw new Error('Email and password are required.');
    }
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('budgy-users') || '[]');
    // Check if user already exists
    if (users.some(u => u.email === userData.email)) {
      throw new Error('User already exists with this email.');
    }
    // Add new user
    users.push({ email: userData.email, password: userData.password, name: userData.name });
    localStorage.setItem('budgy-users', JSON.stringify(users));
    // Optionally, log the user in immediately:
    // setIsLoggedIn(true);
    // localStorage.setItem('budgy-auth', JSON.stringify({ isLoggedIn: true, user: userData }));
    // router.push('/dashboard');
    // Or redirect to login page:
    router.push('/login');
  };

  const login = (userData = null) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('budgy-users') || '[]');
    // Check credentials
    const user = users.find(u => u.email === userData?.email && u.password === userData?.password);
    if (!user) {
      throw new Error('Invalid email or password.');
    }
    setIsLoggedIn(true);
    // Store auth data in localStorage
    localStorage.setItem('budgy-auth', JSON.stringify({
      isLoggedIn: true,
      user: userData
    }));
    router.push('/dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Clear auth data from localStorage
    localStorage.removeItem('budgy-auth');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, signup, authLoading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
