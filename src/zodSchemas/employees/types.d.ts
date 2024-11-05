export type EmployeeFormData = {
  employee_role: string;
  employee_name: string;
}

type createEmployeeFormData = z.infer<typeof UserFormSchema>