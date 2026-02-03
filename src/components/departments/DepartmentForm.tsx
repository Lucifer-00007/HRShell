"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  departmentCreateSchema,
  type DepartmentCreateInput
} from "@/src/lib/schemas/department";
import { createDepartment } from "@/src/lib/api/departments";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";

export function DepartmentForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<DepartmentCreateInput>({
    resolver: zodResolver(departmentCreateSchema),
    defaultValues: {
      name: "",
      managerName: "",
      location: "",
      headcount: 0
    }
  });

  const mutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      reset();
    }
  });

  const onSubmit = async (values: DepartmentCreateInput) => {
    await mutation.mutateAsync({
      ...values,
      headcount: Number(values.headcount)
    });
  };

  const inputClassName =
    "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-brand-600">Create</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Add department
            </h2>
          </div>
          <Button type="submit" disabled={isSubmitting || mutation.isPending}>
            {mutation.isPending ? "Saving…" : "Save"}
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Department Name
            </span>
            <input {...register("name")} className={inputClassName} />
            {errors.name && (
              <span className="text-xs text-red-600">{errors.name.message}</span>
            )}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Manager
            </span>
            <input {...register("managerName")} className={inputClassName} />
            {errors.managerName && (
              <span className="text-xs text-red-600">{errors.managerName.message}</span>
            )}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Location
            </span>
            <input {...register("location")} className={inputClassName} />
            {errors.location && (
              <span className="text-xs text-red-600">{errors.location.message}</span>
            )}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Headcount
            </span>
            <input
              {...register("headcount", { valueAsNumber: true })}
              type="number"
              min={0}
              className={inputClassName}
            />
            {errors.headcount && (
              <span className="text-xs text-red-600">{errors.headcount.message}</span>
            )}
          </label>
        </div>

        {mutation.isSuccess && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-900/30 dark:text-emerald-200">
            Department created (mocked). The list will refresh automatically.
          </div>
        )}

        {mutation.isError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-200">
            Could not create department. Please try again.
          </div>
        )}
      </Card>
    </form>
  );
}
