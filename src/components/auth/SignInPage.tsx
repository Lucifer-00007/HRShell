"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { authUsers, demoPassword } from "@/src/config/auth";
import type { Role } from "@/src/config/rbac";
import { roleMeta } from "@/src/config/rbac";
import { landingRoot, workspaceRoot } from "@/src/config/routes";
import { cn } from "@/src/lib/cn";

export function SignInPage() {
  const router = useRouter();
  const { authenticate, isSignedIn, isHydrated } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role>("employee");
  const [email, setEmail] = useState(authUsers[0]?.email ?? "");
  const [password, setPassword] = useState(demoPassword);
  const [error, setError] = useState<string | null>(null);

  const roleOptions = useMemo(
    () =>
      authUsers.map((user) => ({
        role: user.role,
        id: user.id,
        label: roleMeta[user.role].label,
        email: user.email,
        name: user.name,
        title: user.title,
        badgeTone: roleMeta[user.role].badgeTone
      })),
    []
  );

  const selectedUser = roleOptions.find((option) => option.role === selectedRole);

  useEffect(() => {
    if (isHydrated && isSignedIn) {
      router.replace(workspaceRoot);
    }
  }, [isHydrated, isSignedIn, router]);

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    const roleUser = roleOptions.find((option) => option.role === role);
    if (roleUser) {
      setEmail(roleUser.email);
    }
    setPassword(demoPassword);
    setError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = authenticate(email, password);
    if (!result || result.role !== selectedRole) {
      setError("Invalid credentials for the selected role. Use the demo email + password shown.");
      return;
    }
    router.push(workspaceRoot);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(90,111,255,0.18),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_45%)]">
      <header className="border-b border-white/60 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-[960px] items-center justify-between px-6 py-4">
          <Link href={landingRoot} className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            HRMS Studio
          </Link>
          <Link href={landingRoot} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[960px] px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge tone="info">Secure demo login</Badge>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
              Sign in to access the workspace
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Choose a role, enter demo credentials, and continue to the protected HRMS workspace.
            </p>
            <Card className="border-slate-200/70 bg-white/90 p-5 dark:border-slate-800/70 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Demo credentials
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Use <span className="font-semibold">{selectedUser?.email}</span> with password
                <span className="font-semibold"> {demoPassword}</span>.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleRoleChange(option.role)}
                    className={cn(
                      "flex flex-col gap-2 rounded-2xl border px-3 py-3 text-left text-xs transition",
                      selectedRole === option.role
                        ? "border-brand-500/60 bg-brand-50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                      "dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700"
                    )}
                  >
                    <Badge tone={option.badgeTone}>{option.label}</Badge>
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {option.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {option.title}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <Card className="border-slate-200/70 bg-white/95 p-6 dark:border-slate-800/70 dark:bg-slate-950/90">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Credentials
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Enter your demo login
                </h2>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  placeholder={selectedUser?.email}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  autoComplete="current-password"
                  required
                />
              </div>

              {error ? (
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-300">{error}</p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button type="submit" className="rounded-full">
                  Continue to workspace
                </Button>
                <Link
                  href={landingRoot}
                  className="text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
