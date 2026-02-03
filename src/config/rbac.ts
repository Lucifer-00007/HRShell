import type { ModuleId } from "@/src/config/modules";

export type Role = "employee" | "hr" | "admin";
export type AccessLevel = "none" | "read" | "full";
export type BadgeTone = "muted" | "info" | "success" | "warning";

export const roleMeta: Record<
  Role,
  {
    label: string;
    description: string;
    badgeTone: BadgeTone;
    avatarGradient: string;
  }
> = {
  employee: {
    label: "Employee",
    description: "Self-service access to personal records, time, and expenses.",
    badgeTone: "info",
    avatarGradient: "from-sky-600 to-cyan-500"
  },
  hr: {
    label: "HR",
    description: "People operations access for org data, contracts, and leave flows.",
    badgeTone: "success",
    avatarGradient: "from-emerald-600 to-lime-500"
  },
  admin: {
    label: "Admin",
    description: "Full oversight of HR, payroll, and system controls.",
    badgeTone: "warning",
    avatarGradient: "from-amber-500 to-orange-500"
  }
};

export const accessLevelMeta: Record<
  AccessLevel,
  {
    label: string;
    description: string;
    tone: BadgeTone;
  }
> = {
  full: {
    label: "Full access",
    description: "Can view and manage workflows.",
    tone: "success"
  },
  read: {
    label: "Read only",
    description: "Can view data without edits.",
    tone: "warning"
  },
  none: {
    label: "No access",
    description: "Module is restricted for this role.",
    tone: "muted"
  }
};

export const moduleAccessByRole: Record<Role, Record<ModuleId, AccessLevel>> = {
  employee: {
    employees: "read",
    departments: "read",
    contracts: "none",
    leaves: "full",
    attendance: "full",
    payroll: "read",
    recruitment: "none",
    expenses: "full"
  },
  hr: {
    employees: "full",
    departments: "full",
    contracts: "full",
    leaves: "full",
    attendance: "read",
    payroll: "read",
    recruitment: "full",
    expenses: "read"
  },
  admin: {
    employees: "full",
    departments: "full",
    contracts: "full",
    leaves: "full",
    attendance: "full",
    payroll: "full",
    recruitment: "full",
    expenses: "full"
  }
};

export const roleControls: Record<
  Role,
  Array<{
    id: string;
    label: string;
    description: string;
  }>
> = {
  employee: [
    {
      id: "request-leave",
      label: "Request leave",
      description: "Submit time-off requests and track balances."
    },
    {
      id: "log-attendance",
      label: "Log attendance",
      description: "Clock in/out and review time logs."
    },
    {
      id: "submit-expense",
      label: "Submit expense",
      description: "Upload receipts for reimbursement."
    }
  ],
  hr: [
    {
      id: "approve-requests",
      label: "Approve requests",
      description: "Review leave and attendance approvals."
    },
    {
      id: "manage-contracts",
      label: "Manage contracts",
      description: "Update agreements and renewals."
    },
    {
      id: "recruitment-pipeline",
      label: "Recruitment pipeline",
      description: "Track candidates from screening to offer."
    }
  ],
  admin: [
    {
      id: "run-payroll",
      label: "Run payroll",
      description: "Finalize payroll cycles and payouts."
    },
    {
      id: "access-controls",
      label: "Manage access",
      description: "Assign roles, permissions, and overrides."
    },
    {
      id: "audit-activity",
      label: "Audit activity",
      description: "Monitor system activity and compliance."
    }
  ]
};

export function getModuleAccess(role: Role | null | undefined, moduleId: ModuleId): AccessLevel {
  if (!role) {
    return "none";
  }
  return moduleAccessByRole[role][moduleId] ?? "none";
}

export function getRolesWithAccess(moduleId: ModuleId): Role[] {
  return (Object.keys(moduleAccessByRole) as Role[]).filter(
    (role) => moduleAccessByRole[role][moduleId] !== "none"
  );
}
