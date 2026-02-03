import { z } from "zod";

export const employeeSchema = z.object({
  id: z.string(),
  employeeCode: z.string().min(1, "Employee code is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  department: z.string().min(1, "Department is required"),
  managerId: z.string().nullable(),
  hiredOn: z.string().min(1, "Hire date is required")
});

export const employeeCreateSchema = employeeSchema.omit({ id: true }).extend({
  managerId: z.string().nullable().optional()
});

export const employeeListSchema = z.array(employeeSchema);

export const employeeListResponseSchema = z.object({
  data: employeeListSchema,
  total: z.number()
});

export type Employee = z.infer<typeof employeeSchema>;
export type EmployeeCreateInput = z.infer<typeof employeeCreateSchema>;
