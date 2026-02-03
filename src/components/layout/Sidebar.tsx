"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/cn";
import { moduleGroups, modules } from "@/src/config/modules";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { getModuleAccess } from "@/src/config/rbac";
import { workspaceRoot } from "@/src/config/routes";

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  return (
    <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Modules
        </p>
        <nav className="mt-3 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Overview
            </p>
            <Link
              href={workspaceRoot}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                pathname === workspaceRoot
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              Launchpad
            </Link>
          </div>
          {(Object.keys(moduleGroups) as Array<keyof typeof moduleGroups>).map((groupKey) => {
            const group = moduleGroups[groupKey];
            const groupModules = modules.filter((module) => module.group === groupKey);
            return (
              <div key={groupKey} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {groupModules.map((module) => {
                    const isActive = pathname.startsWith(module.href);
                    const access = getModuleAccess(role, module.id);
                    const sharedClasses =
                      "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition";
                    if (access === "none") {
                      return (
                        <div
                          key={module.id}
                          className={cn(
                            sharedClasses,
                            "cursor-not-allowed text-slate-400 opacity-70 dark:text-slate-500"
                          )}
                          aria-disabled
                        >
                          <module.icon className="h-4 w-4" />
                          {module.name}
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={module.id}
                        href={module.href}
                        className={cn(
                          sharedClasses,
                          isActive
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        )}
                      >
                        <module.icon className="h-4 w-4" />
                        {module.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
