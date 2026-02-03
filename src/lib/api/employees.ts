import {
  employeeCreateSchema,
  employeeListResponseSchema,
  employeeSchema,
  type Employee,
  type EmployeeCreateInput
} from "@/src/lib/schemas/employee";
import { apiFetch, jsonBody } from "@/src/lib/fetcher";

export async function fetchEmployees(query: string): Promise<Employee[]> {
  const url = `/api/employees?q=${encodeURIComponent(query)}`;
  const response = await apiFetch(url, employeeListResponseSchema);
  return response.data;
}

export async function fetchEmployee(id: string): Promise<Employee> {
  return apiFetch(`/api/employees/${id}`, employeeSchema);
}

export async function createEmployee(input: EmployeeCreateInput): Promise<Employee> {
  const parsed = employeeCreateSchema.parse(input);
  return apiFetch("/api/employees", employeeSchema, {
    method: "POST",
    ...jsonBody(parsed)
  });
}
