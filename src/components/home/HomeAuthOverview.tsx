"use client";

import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { modules } from "@/src/config/modules";
import { accessLevelMeta, getModuleAccess, roleControls, roleMeta } from "@/src/config/rbac";

function formatRoleList(roleLabels: string[]) {
  if (roleLabels.length <= 1) {
    return roleLabels.join("");
  }
  return `${roleLabels.slice(0, -1).join(", ")} and ${roleLabels[roleLabels.length - 1]}`;
}

export function HomeAuthOverview() {
  const { user, role } = useAuth();

  if (!user || !role) {
    const roleEntries = Object.values(roleMeta);
    return (
      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="p-5">
          <Badge tone="info">Role-based demo</Badge>
          <h2 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Sign in from the header to personalize access
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Pick a demo user to unlock modules, controls, and workflows tailored to that role.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {roleEntries.map((entry) => (
              <div
                key={entry.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <Badge tone={entry.badgeTone}>{entry.label}</Badge>
                <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <Badge tone="muted">Access snapshot</Badge>
          <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">
            What changes by role
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Employees get self-service tools, HR manages org workflows, and Admins retain full
            oversight.
          </p>
          <div className="mt-4 space-y-3">
            {Object.entries(roleMeta).map(([key, entry]) => {
              const roleKey = key as keyof typeof roleMeta;
              return (
                <div key={entry.label} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Badge tone={entry.badgeTone}>{entry.label}</Badge>
                    <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {roleControls[roleKey].length} controls
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    {entry.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    );
  }

  const accessByModule = modules.map((module) => ({
    ...module,
    access: getModuleAccess(role, module.id)
  }));
  const accessCounts = accessByModule.reduce(
    (acc, module) => {
      acc[module.access] += 1;
      return acc;
    },
    { full: 0, read: 0, none: 0 }
  );

  const controls = roleControls[role];
  const accessMeta = accessLevelMeta;

  return (
    <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={roleMeta[role].badgeTone}>{roleMeta[role].label}</Badge>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Signed in as {user.name} · {user.title}
          </p>
        </div>
        <h2 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
          Role control center
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Your role unlocks {formatRoleList([
            `${accessCounts.full} full`,
            `${accessCounts.read} read-only`
          ])} modules.
        </p>
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
      <Card className="p-5">
        <Badge tone="muted">Access snapshot</Badge>
        <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">
          Module visibility
        </h3>
        <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center justify-between">
            <span>{accessMeta.full.label}</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {accessCounts.full}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>{accessMeta.read.label}</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {accessCounts.read}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>{accessMeta.none.label}</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {accessCounts.none}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {accessByModule
            .filter((module) => module.access !== "none")
            .map((module) => (
              <Badge key={module.id} tone={accessLevelMeta[module.access].tone}>
                {module.name}
              </Badge>
            ))}
        </div>
      </Card>
    </section>
  );
}
