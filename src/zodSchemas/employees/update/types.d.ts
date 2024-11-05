import { UpdateEmployeeFormSchema } from "./schema";

export type EmployeeFormData = {
  employee_role: string;
  employee_name: string;
  personal_data_email: string;
  personal_data_cpf: string;
  personal_data_phone: string;
}

type UpdateEmployeeFormData = z.infer<typeof UpdateEmployeeFormSchema>