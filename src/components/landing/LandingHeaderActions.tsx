"use client";

import Link from "next/link";
import { ThemeToggle } from "@/src/components/theme/ThemeToggle";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { roleMeta } from "@/src/config/rbac";
import { signInRoot, workspaceRoot } from "@/src/config/routes";

export function LandingHeaderActions() {
  const { isSignedIn, user, signOut } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle className="hidden sm:inline-flex" />
      {isSignedIn && user ? (
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm sm:flex dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
          <span className="uppercase tracking-wide text-slate-500 dark:text-slate-400">Signed in</span>
          <span className="text-slate-900 dark:text-slate-100">{roleMeta[user.role].label}</span>
        </div>
      ) : null}
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <Link
            href={workspaceRoot}
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Workspace
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="hidden text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-900 sm:inline-flex dark:text-slate-400 dark:hover:text-white"
          >
            Sign out
          </button>
        </div>
      ) : (
        <Link
          href={signInRoot}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          Sign in
        </Link>
      )}
    </div>
  );
}
