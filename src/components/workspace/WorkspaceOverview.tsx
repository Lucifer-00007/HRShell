"use client";

import Link from "next/link";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { PageHeader } from "@/src/components/layout/PageHeader";
import { StatCard } from "@/src/components/ui/StatCard";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { modules } from "@/src/config/modules";
import { accessLevelMeta, getModuleAccess, roleControls, roleMeta } from "@/src/config/rbac";
import { workspaceCopyByRole, workspaceStatsByRole } from "@/src/config/workspace";
import { cn } from "@/src/lib/cn";

export function WorkspaceOverview() {
  const { user, role } = useAuth();

  if (!role) {
    return null;
  }

  const copy = workspaceCopyByRole[role];
  const stats = workspaceStatsByRole[role];
  const controls = roleControls[role];
  const accessibleModules = modules.filter((module) => getModuleAccess(role, module.id) !== "none");

  return (
    <div className="space-y-6">
      <PageHeader
        title={user ? `Welcome back, ${user.name.split(" ")[0]}` : copy.title}
        description={copy.description}
        breadcrumbs={[{ label: "Workspace" }]}
        actions={<Badge tone={roleMeta[role].badgeTone}>{roleMeta[role].label}</Badge>}
      >
        {user ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Signed in as {user.name} · {user.title}
          </p>
        ) : null}
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Quick actions
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Focused tasks for today
              </h2>
            </div>
            <Badge tone="info">Role controls</Badge>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {controls.map((control) => (
              <div
                key={control.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {control.label}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {control.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} helper={stat.helper} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Your modules
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Modules available to you
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {accessibleModules.length} modules for this role
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {accessibleModules.map((module) => {
            const access = getModuleAccess(role, module.id);
            const accessMeta = accessLevelMeta[access];
            return (
              <Link key={module.id} href={module.href} className="group">
                <Card
                  className={cn(
                    "h-full border-slate-200/80 bg-gradient-to-br p-5 transition group-hover:-translate-y-1 group-hover:shadow-lg dark:border-slate-800/80",
                    module.accent
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="rounded-2xl bg-white/80 p-2 text-slate-800 shadow-sm dark:bg-slate-950/70 dark:text-slate-200">
                      <module.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge tone={accessMeta.tone}>{accessMeta.label}</Badge>
                      <Badge tone={module.status === "mocked" ? "success" : "warning"}>
                        {module.status === "mocked" ? "Mocked" : "UI only"}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {module.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {module.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
