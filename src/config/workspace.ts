import type { Role } from "@/src/config/rbac";

export type WorkspaceStat = {
  label: string;
  value: string;
  helper: string;
};

export type WorkspaceCopy = {
  title: string;
  description: string;
};

export const workspaceCopyByRole: Record<Role, WorkspaceCopy> = {
  employee: {
    title: "Employee workspace",
    description: "Track time, leave, and expenses from a focused employee hub."
  },
  hr: {
    title: "HR workspace",
    description: "Manage people operations, approvals, and org data in one place."
  },
  admin: {
    title: "Admin workspace",
    description: "Oversee payroll, compliance, and system access across HR operations."
  }
};

export const workspaceStatsByRole: Record<Role, WorkspaceStat[]> = {
  employee: [
    {
      label: "Leave balance",
      value: "12 days",
      helper: "Next holiday in 9 days"
    },
    {
      label: "Hours this week",
      value: "32.5",
      helper: "3.5 hrs logged today"
    },
    {
      label: "Open expenses",
      value: "$184",
      helper: "2 submissions pending"
    }
  ],
  hr: [
    {
      label: "Pending approvals",
      value: "8",
      helper: "4 leave · 4 expenses"
    },
    {
      label: "Open roles",
      value: "5",
      helper: "2 urgent openings"
    },
    {
      label: "New hires",
      value: "3",
      helper: "Starting this month"
    }
  ],
  admin: [
    {
      label: "Payroll cycle",
      value: "2 days",
      helper: "Next run on Friday"
    },
    {
      label: "Compliance tasks",
      value: "4",
      helper: "2 due this week"
    },
    {
      label: "System alerts",
      value: "1",
      helper: "Policy review needed"
    }
  ]
};
