import { z } from "zod";

const EmployeeFormSchema = z
  .object({
    employee_role: z
      .string({ message: "Função do funcionário é um campo obrigatório" }),
    employee_name: z.string().min(3, "O Nome do funcionário deve conter no mínimo 3 caracteres"),
  })

export { EmployeeFormSchema };
