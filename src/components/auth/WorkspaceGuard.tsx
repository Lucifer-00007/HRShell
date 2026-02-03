"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { signInRoot } from "@/src/config/routes";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";

export function WorkspaceGuard({ children }: { children: ReactNode }) {
  const { isSignedIn, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isSignedIn) {
      router.replace(signInRoot);
    }
  }, [isHydrated, isSignedIn, router]);

  if (!isHydrated) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[960px] items-center justify-center px-6">
        <Card className="w-full max-w-md p-6 text-center">
          <Badge tone="muted">Loading</Badge>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Checking workspace access.
          </p>
        </Card>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[960px] items-center justify-center px-6">
        <Card className="w-full max-w-md p-6 text-center">
          <Badge tone="warning">Restricted</Badge>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Redirecting to the sign-in page.
          </p>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
