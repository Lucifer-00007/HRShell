import type { Department } from "@/src/lib/schemas/department";
import { ListView, type ColumnDef } from "@/src/components/views/ListView";
import { Badge } from "@/src/components/ui/Badge";

const columns: ColumnDef<Department>[] = [
  {
    key: "name",
    header: "Department",
    cell: (department) => (
      <div>
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {department.name}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {department.location}
        </div>
      </div>
    )
  },
  {
    key: "manager",
    header: "Manager",
    cell: (department) => (
      <span className="text-sm text-slate-700 dark:text-slate-300">
        {department.managerName}
      </span>
    )
  },
  {
    key: "headcount",
    header: "Headcount",
    cell: (department) => <Badge tone="info">{department.headcount}</Badge>
  }
];

export function DepartmentListView({
  departments,
  isLoading
}: {
  departments: Department[];
  isLoading?: boolean;
}) {
  return (
    <ListView
      columns={columns}
      rows={departments}
      rowKey={(department) => department.id}
      isLoading={isLoading}
      emptyState={{
        title: "No departments found",
        description: "Create a department to begin organizing teams."
      }}
    />
  );
}
