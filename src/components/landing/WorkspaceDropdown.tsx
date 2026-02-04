"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { roleMeta } from "@/src/config/rbac";
import { workspaceRoot } from "@/src/config/routes";
import { Button } from "@/src/components/ui/Button";
import { ChevronDownIcon, LogoutIcon, GridIcon } from "@/src/components/icons";
import { cn } from "@/src/lib/cn";

export function WorkspaceDropdown() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 pl-4 pr-3 text-xs uppercase tracking-wide"
      >
        <span>Workspace</span>
        <ChevronDownIcon className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </Button>

      <div
        className={cn(
          "absolute right-0 top-full mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-2 shadow-lg ring-1 ring-black/5 transition-all dark:border-slate-800 dark:bg-slate-900 dark:ring-white/10",
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <div className="px-3 py-2">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Signed in as</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {roleMeta[user.role].label}
          </p>
        </div>

        <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />

        <Link
          href={workspaceRoot}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          onClick={() => setIsOpen(false)}
        >
          <GridIcon className="h-4 w-4" />
          Enter Workspace
        </Link>

        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            signOut();
          }}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <LogoutIcon className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
