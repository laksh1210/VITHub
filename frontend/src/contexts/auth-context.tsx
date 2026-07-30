"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserSummaryResponse } from "@/types/auth";
import { getUser, isAuthenticated as checkIsAuthenticated } from "@/lib/auth-storage";

interface AuthContextType {
  user: UserSummaryResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthenticating: boolean;
  isLoggingOut: boolean;
  isRefreshing: boolean;
  setUser: (user: UserSummaryResponse | null) => void;
  setIsAuthenticating: (state: boolean) => void;
  setIsLoggingOut: (state: boolean) => void;
  setIsRefreshing: (state: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const storedUser = getUser();
    const timeout = setTimeout(() => {
      if (storedUser && checkIsAuthenticated()) {
        setUserState(storedUser);
      }
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const setUser = (newUser: UserSummaryResponse | null) => {
    setUserState(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthenticating,
        isLoggingOut,
        isRefreshing,
        setUser,
        setIsAuthenticating,
        setIsLoggingOut,
        setIsRefreshing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
