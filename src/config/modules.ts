import type { ComponentType } from "react";
import {
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  FileIcon,
  ReceiptIcon,
  UsersIcon,
  WalletIcon
} from "@/src/components/icons";

export type ModuleGroup = "core" | "operations" | "finance";

export type ModuleConfig = {
  id: string;
  name: string;
  href: string;
  description: string;
  group: ModuleGroup;
  accent: string;
  status: "mocked" | "ui-only";
  icon: ComponentType<{ className?: string }>;
};

export const modules = [
  {
    id: "employees",
    name: "Employees",
    href: "/employees",
    description: "People directory, profiles, and role management.",
    group: "core",
    accent: "from-brand-500/20 to-brand-500/5",
    status: "mocked",
    icon: UsersIcon
  },
  {
    id: "departments",
    name: "Departments",
    href: "/departments",
    description: "Org structure, managers, and team assignments.",
    group: "core",
    accent: "from-emerald-500/20 to-emerald-500/5",
    status: "mocked",
    icon: BuildingIcon
  },
  {
    id: "contracts",
    name: "Contracts",
    href: "/contracts",
    description: "Agreements, status tracking, and history.",
    group: "core",
    accent: "from-sky-500/20 to-sky-500/5",
    status: "ui-only",
    icon: FileIcon
  },
  {
    id: "leaves",
    name: "Leaves",
    href: "/leaves",
    description: "Requests, approvals, and balance tracking.",
    group: "operations",
    accent: "from-amber-500/20 to-amber-500/5",
    status: "ui-only",
    icon: CalendarIcon
  },
  {
    id: "attendance",
    name: "Attendance",
    href: "/attendance",
    description: "Daily check-ins, shifts, and timesheets.",
    group: "operations",
    accent: "from-indigo-500/20 to-indigo-500/5",
    status: "ui-only",
    icon: ClockIcon
  },
  {
    id: "payroll",
    name: "Payroll",
    href: "/payroll",
    description: "Payslips, runs, and approvals (UI only).",
    group: "finance",
    accent: "from-rose-500/20 to-rose-500/5",
    status: "ui-only",
    icon: WalletIcon
  },
  {
    id: "recruitment",
    name: "Recruitment",
    href: "/recruitment",
    description: "Hiring pipelines and candidate journeys.",
    group: "operations",
    accent: "from-purple-500/20 to-purple-500/5",
    status: "ui-only",
    icon: BriefcaseIcon
  },
  {
    id: "expenses",
    name: "Expenses",
    href: "/expenses",
    description: "Spend submissions and approvals.",
    group: "finance",
    accent: "from-teal-500/20 to-teal-500/5",
    status: "ui-only",
    icon: ReceiptIcon
  }
] as const satisfies ModuleConfig[];

export type ModuleId = (typeof modules)[number]["id"];

export const moduleGroups: Record<ModuleGroup, { label: string; description: string }> = {
  core: {
    label: "Core HR",
    description: "Employee data, org structure, and contracts."
  },
  operations: {
    label: "Workforce Ops",
    description: "Attendance, leave, and recruiting flows."
  },
  finance: {
    label: "Finance",
    description: "Payroll and expenses operations."
  }
};
