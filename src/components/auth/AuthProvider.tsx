"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authUsers, authStorageKey, type AuthUser } from "@/src/config/auth";
import type { Role } from "@/src/config/rbac";

export type AuthContextValue = {
  user: AuthUser | null;
  role: Role | null;
  isSignedIn: boolean;
  isHydrated: boolean;
  users: AuthUser[];
  signIn: (userId: string) => void;
  authenticate: (email: string, password: string) => AuthUser | null;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedId = typeof window !== "undefined" ? localStorage.getItem(authStorageKey) : null;
    if (storedId) {
      const storedUser = authUsers.find((entry) => entry.id === storedId) ?? null;
      setUser(storedUser);
    }
    setIsHydrated(true);
  }, []);

  const signIn = useCallback((userId: string) => {
    const selected = authUsers.find((entry) => entry.id === userId) ?? null;
    setUser(selected);
    if (typeof window === "undefined") {
      return;
    }
    if (selected) {
      localStorage.setItem(authStorageKey, selected.id);
    } else {
      localStorage.removeItem(authStorageKey);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem(authStorageKey);
  }, []);

  const authenticate = useCallback(
    (email: string, password: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      const matched = authUsers.find(
        (entry) =>
          entry.email.toLowerCase() === normalizedEmail && entry.password === password.trim()
      );
      if (!matched) {
        return null;
      }
      setUser(matched);
      if (typeof window !== "undefined") {
        localStorage.setItem(authStorageKey, matched.id);
      }
      return matched;
    },
    []
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role: user?.role ?? null,
      isSignedIn: Boolean(user),
      isHydrated,
      users: authUsers,
      signIn,
      authenticate,
      signOut
    }),
    [user, isHydrated, signIn, authenticate, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
