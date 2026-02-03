"use client";

import { useRef } from "react";
import { Badge } from "@/src/components/ui/Badge";
import { cn } from "@/src/lib/cn";
import { roleMeta } from "@/src/config/rbac";
import { useAuth } from "@/src/components/auth/AuthProvider";

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AuthMenu() {
  const { user, users, signIn, signOut, isHydrated } = useAuth();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => {
    detailsRef.current?.removeAttribute("open");
  };

  const handleSelect = (userId: string) => {
    signIn(userId);
    closeMenu();
  };

  const handleSignOut = () => {
    signOut();
    closeMenu();
  };

  return (
    <details ref={detailsRef} className="relative">
      <summary
        className={cn(
          "list-none",
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
          "border border-slate-200 bg-white text-slate-700 hover:border-slate-300",
          "dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200",
          !isHydrated && "pointer-events-none opacity-70",
          !user && "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
        )}
        aria-label={user ? "Open account menu" : "Open sign in menu"}
      >
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold",
            user ? roleMeta[user.role].avatarGradient : "from-slate-900 to-slate-700",
            user ? "text-white" : "text-white"
          )}
        >
          {user ? initialsFromName(user.name) : "HR"}
        </div>
        <span className="hidden sm:inline">
          {user ? roleMeta[user.role].label : "Sign in"}
        </span>
      </summary>
      <div
        className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-950"
        role="menu"
      >
        <div className="space-y-1 border-b border-slate-100 pb-3 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {user ? "Signed in" : "Choose a role"}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {user
              ? `${user.name} · ${user.title}`
              : "Select a demo user to preview role-based access."}
          </p>
        </div>
        <div className="mt-4 space-y-2">
          {users.map((entry) => {
            const isActive = user?.id === entry.id;
            const meta = roleMeta[entry.role];
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => handleSelect(entry.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition",
                  isActive
                    ? "border-brand-500/60 bg-brand-50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                  "dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white",
                    meta.avatarGradient
                  )}
                >
                  {initialsFromName(entry.name)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {entry.name}
                    </p>
                    {isActive ? <Badge tone="success">Active</Badge> : null}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {entry.title} · {meta.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{entry.email}</p>
                </div>
              </button>
            );
          })}
        </div>
        {user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-4 w-full rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700"
          >
            Sign out
          </button>
        ) : null}
      </div>
    </details>
  );
}
