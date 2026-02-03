import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeCard } from "./EmployeeCard";
import type { Employee } from "@/src/lib/schemas/employee";

const sampleEmployee: Employee = {
  id: "e99",
  employeeCode: "EMP-099",
  firstName: "Jordan",
  lastName: "Lee",
  email: "jordan.lee@example.com",
  department: "Operations",
  managerId: "e3",
  hiredOn: "2024-02-12"
};

const meta: Meta<typeof EmployeeCard> = {
  title: "Components/EmployeeCard",
  component: EmployeeCard
};

export default meta;

type Story = StoryObj<typeof EmployeeCard>;

export const Default: Story = {
  args: {
    employee: sampleEmployee
  }
};
