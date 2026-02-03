"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { ThemeToggle } from "@/src/components/theme/ThemeToggle";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleOptions = authUsers.map((user) => ({
    role: user.role,
    id: user.id,
    label: roleMeta[user.role].label,
    email: user.email,
    name: user.name,
    title: user.title,
    badgeTone: roleMeta[user.role].badgeTone
  }));

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
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(90,111,255,0.18),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_45%)]">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl dark:bg-brand-500/20" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px] dark:bg-emerald-500/10" />
      <header className="relative z-10 border-b border-white/60 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-[1040px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold uppercase tracking-wide text-white dark:bg-slate-100 dark:text-slate-900">
              HR
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">HRMS Studio</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Secure demo login</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Link
              href={landingRoot}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1040px] px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Badge tone="info">Secure demo login</Badge>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-100 sm:text-5xl">
              Sign in to access the workspace
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Choose a role, enter demo credentials, and continue to the protected HRMS workspace.
            </p>
            <Card className="rounded-3xl border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800/70 dark:bg-slate-900/70">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Demo credentials
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Use <span className="font-semibold">{selectedUser?.email}</span> with password
                    <span className="font-semibold"> {demoPassword}</span>.
                  </p>
                </div>
                <Badge tone={selectedUser?.badgeTone ?? "info"}>
                  {selectedUser?.label ?? "Employee"}
                </Badge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleRoleChange(option.role)}
                    className={cn(
                      "flex flex-col gap-2 rounded-2xl border px-3 py-3 text-left text-xs transition",
                      selectedRole === option.role
                        ? "border-brand-500/70 bg-brand-50 ring-2 ring-brand-200/60"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                      "dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:ring-brand-500/30"
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

          <Card className="rounded-3xl border-slate-200/70 bg-white/95 p-6 shadow-xl shadow-slate-900/10 dark:border-slate-800/70 dark:bg-slate-950/90">
            <form className="space-y-5" onSubmit={handleSubmit}>
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
                  className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"
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
                <div className="relative">
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 pr-20 text-sm text-slate-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-transparent px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:border-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white"
                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    aria-pressed={isPasswordVisible}
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error ? (
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-300">{error}</p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <Link
                  href={landingRoot}
                  className="inline-flex w-1/3 items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white"
                >
                  Cancel
                </Link>

                <Button type="submit" className="w-1/3 rounded-lg">
                  Sign In
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
