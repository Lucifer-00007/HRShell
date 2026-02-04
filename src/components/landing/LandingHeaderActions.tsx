"use client";

import Link from "next/link";
import { ThemeToggle } from "@/src/components/theme/ThemeToggle";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { signInRoot } from "@/src/config/routes";
import { WorkspaceDropdown } from "./WorkspaceDropdown";

export function LandingHeaderActions() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle className="hidden sm:inline-flex" />
      {isSignedIn ? (
        <WorkspaceDropdown />
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
