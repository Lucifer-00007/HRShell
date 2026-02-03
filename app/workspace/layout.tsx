import type { ReactNode } from "react";
import { AppShell } from "@/src/components/layout/AppShell";
import { WorkspaceGuard } from "@/src/components/auth/WorkspaceGuard";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <WorkspaceGuard>
      <AppShell>{children}</AppShell>
    </WorkspaceGuard>
  );
}
