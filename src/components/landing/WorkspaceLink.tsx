"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { signInRoot, workspaceRoot } from "@/src/config/routes";
import { cn } from "@/src/lib/cn";

export function WorkspaceLink({
  children,
  className,
  hrefWhenSignedOut = signInRoot
}: {
  children: ReactNode;
  className?: string;
  hrefWhenSignedOut?: string;
}) {
  const { isSignedIn } = useAuth();
  const href = isSignedIn ? workspaceRoot : hrefWhenSignedOut;

  return (
    <Link href={href} className={cn(className)}>
      {children}
    </Link>
  );
}
