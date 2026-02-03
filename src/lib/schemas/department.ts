import { z } from "zod";

export const departmentSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Department name is required"),
  managerName: z.string().min(1, "Manager is required"),
  location: z.string().min(1, "Location is required"),
  headcount: z.number().int().nonnegative()
});

export const departmentCreateSchema = departmentSchema.omit({ id: true });

export const departmentListSchema = z.array(departmentSchema);

export const departmentListResponseSchema = z.object({
  data: departmentListSchema,
  total: z.number()
});

export type Department = z.infer<typeof departmentSchema>;
export type DepartmentCreateInput = z.infer<typeof departmentCreateSchema>;
