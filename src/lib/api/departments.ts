import {
  departmentCreateSchema,
  departmentListResponseSchema,
  departmentSchema,
  type Department,
  type DepartmentCreateInput
} from "@/src/lib/schemas/department";
import { apiFetch, jsonBody } from "@/src/lib/fetcher";

export async function fetchDepartments(query: string): Promise<Department[]> {
  const url = `/api/departments?q=${encodeURIComponent(query)}`;
  const response = await apiFetch(url, departmentListResponseSchema);
  return response.data;
}

export async function fetchDepartment(id: string): Promise<Department> {
  return apiFetch(`/api/departments/${id}`, departmentSchema);
}

export async function createDepartment(
  input: DepartmentCreateInput
): Promise<Department> {
  const parsed = departmentCreateSchema.parse(input);
  return apiFetch("/api/departments", departmentSchema, {
    method: "POST",
    ...jsonBody(parsed)
  });
}
