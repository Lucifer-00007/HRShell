"use client";

import type { ReactNode } from "react";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { useAuth } from "@/src/components/auth/AuthProvider";
import type { ModuleId } from "@/src/config/modules";
import { accessLevelMeta, getModuleAccess, getRolesWithAccess, roleMeta } from "@/src/config/rbac";

export function RoleGate({ moduleId, children }: { moduleId: ModuleId; children: ReactNode }) {
  const { role, user, isHydrated } = useAuth();
  const access = getModuleAccess(role, moduleId);

  if (!isHydrated) {
    return (
      <Card className="p-6">
        <div className="space-y-2">
          <Badge tone="muted">Checking access</Badge>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Loading role-based permissions.
          </p>
        </div>
      </Card>
    );
  }

  if (access === "none") {
    const allowedRoles = getRolesWithAccess(moduleId);
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="warning">Access restricted</Badge>
            {allowedRoles.map((allowedRole) => (
              <Badge key={allowedRole} tone={roleMeta[allowedRole].badgeTone}>
                {roleMeta[allowedRole].label}
              </Badge>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {user ? "Switch roles to continue" : "Sign in to continue"}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {user
                ? `${roleMeta[role ?? "employee"].label} access does not include this module.`
                : "Select a demo user from the header to unlock module access."}
            </p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Available roles: {allowedRoles.map((allowedRole) => roleMeta[allowedRole].label).join(", ")}
          </p>
        </div>
      </Card>
    );
  }

  const accessMeta = accessLevelMeta[access];
  return (
    <div className="space-y-4">
      {access === "read" ? (
        <Card className="border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-900/10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={accessMeta.tone}>{accessMeta.label}</Badge>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              This module is available in view-only mode for your role.
            </p>
          </div>
        </Card>
      ) : null}
      {children}
    </div>
  );
}
