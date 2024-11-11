import { z } from "zod";

const EmployeeFormSchema = z
  .object({
    employee_role: z
      .enum(['manager', 'salesman'], { message: "Selecione um cargo válido" }),
    employee_name: z.string().min(3, "O Nome do funcionário deve conter no mínimo 3 caracteres"),
    personal_data_email: z.string().email().optional(),
    personal_data_cpf: z.string().min(11).max(11).optional(),
    personal_data_phone: z.string().min(9).max(11).optional(),
  })

export { EmployeeFormSchema };
