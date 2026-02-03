"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { authUsers } from "@/src/config/auth";
import type { Role } from "@/src/config/rbac";
import { roleMeta } from "@/src/config/rbac";
import { workspaceRoot } from "@/src/config/routes";
import { cn } from "@/src/lib/cn";

const demoPassword = "demo1234";

export function SignInDialog() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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

  const openDialog = () => {
    setError(null);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setError(null);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
    const candidate = roleOptions.find(
      (option) =>
        option.role === selectedRole &&
        option.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!candidate) {
      setError("Use the demo credentials shown for the selected role.");
      return;
    }

    signIn(candidate.id);
    closeDialog();
    router.push(workspaceRoot);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={openDialog}
        className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="demo-signin-dialog"
      >
        Sign in
      </Button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeDialog}
          />
          <Card
            id="demo-signin-dialog"
            className="relative z-10 w-full max-w-lg border-slate-200/70 bg-white/95 p-6 dark:border-slate-800/70 dark:bg-slate-950/95"
            role="dialog"
            aria-modal="true"
            aria-label="Sign in"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Demo sign in
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Choose a role to enter the workspace
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 dark:border-slate-800 dark:text-slate-300"
              >
                Close
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Role
                </label>
                <div className="grid gap-2 sm:grid-cols-3">
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
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
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
                    required
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Demo credentials</p>
                <p className="mt-1">
                  {selectedUser ? (
                    <span>
                      Use <span className="font-semibold">{selectedUser.email}</span> with password
                      <span className="font-semibold"> {demoPassword}</span>.
                    </span>
                  ) : (
                    "Select a role to reveal the demo login credentials."
                  )}
                </p>
              </div>

              {error ? (
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-300">{error}</p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button type="submit" className="rounded-full">
                  Continue to workspace
                </Button>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}
    </>
  );
}
