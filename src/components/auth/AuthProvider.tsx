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

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role: user?.role ?? null,
      isSignedIn: Boolean(user),
      isHydrated,
      users: authUsers,
      signIn,
      signOut
    }),
    [user, isHydrated, signIn, signOut]
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
