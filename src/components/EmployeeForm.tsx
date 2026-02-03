"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  employeeCreateSchema,
  type EmployeeCreateInput
} from "@/src/lib/schemas/employee";
import { createEmployee } from "@/src/lib/api/employees";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";

export function EmployeeForm() {
  const queryClient = useQueryClient();
  const inputClassName =
    "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<EmployeeCreateInput>({
    resolver: zodResolver(employeeCreateSchema),
    defaultValues: {
      employeeCode: "",
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      managerId: null,
      hiredOn: ""
    }
  });

  const mutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      reset();
    }
  });

  const onSubmit = async (values: EmployeeCreateInput) => {
    await mutation.mutateAsync(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
          <p className="text-xs font-semibold uppercase text-brand-600">Create</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Add new employee
          </h2>
          </div>
          <Button type="submit" disabled={isSubmitting || mutation.isPending}>
            {mutation.isPending ? "Saving…" : "Save"}
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Employee Code
            </span>
            <input
              {...register("employeeCode")}
              className={inputClassName}
            />
            {errors.employeeCode && (
              <span className="text-xs text-red-600">{errors.employeeCode.message}</span>
            )}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Email
            </span>
            <input
              {...register("email")}
              type="email"
              className={inputClassName}
            />
            {errors.email && (
              <span className="text-xs text-red-600">{errors.email.message}</span>
            )}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              First name
            </span>
            <input
              {...register("firstName")}
              className={inputClassName}
            />
            {errors.firstName && (
              <span className="text-xs text-red-600">{errors.firstName.message}</span>
            )}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Last name
            </span>
            <input
              {...register("lastName")}
              className={inputClassName}
            />
            {errors.lastName && (
              <span className="text-xs text-red-600">{errors.lastName.message}</span>
            )}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Department
            </span>
            <input
              {...register("department")}
              className={inputClassName}
            />
            {errors.department && (
              <span className="text-xs text-red-600">{errors.department.message}</span>
            )}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Manager ID
            </span>
            <input
              {...register("managerId", { setValueAs: (value) => value || null })}
              className={inputClassName}
            />
            {errors.managerId && (
              <span className="text-xs text-red-600">{errors.managerId.message}</span>
            )}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Hired on
            </span>
            <input
              {...register("hiredOn")}
              type="date"
              className={inputClassName}
            />
            {errors.hiredOn && (
              <span className="text-xs text-red-600">{errors.hiredOn.message}</span>
            )}
          </label>
        </div>

      {mutation.isSuccess && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-900/30 dark:text-emerald-200">
            Employee created (mocked). The list will refresh automatically.
          </div>
        )}

      {mutation.isError && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-200">
            Could not create employee. Please try again.
          </div>
        )}
      </Card>
    </form>
  );
}
