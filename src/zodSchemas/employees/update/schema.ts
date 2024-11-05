import { z } from "zod";

const UpdateEmployeeFormSchema = z
  .object({
    employee_role: z
      .string({ message: "Função do funcionário é um campo obrigatório" }).optional(),
    employee_name: z.string().min(3, "O Nome do funcionário deve conter no mínimo 3 caracteres").optional(),
    personal_data_email: z
      .string({ message: "Função do funcionário é um campo obrigatório" }).email({message: "Um e-mail válido deve ser inserido"}).optional(),
    personal_data_cpf: z.string().length(11, "Digite um CPF válido com 11 dígitos").optional(),
    personal_data_phone: z
      .string().min(9, "O número deve contar com, no mínimo, 9 números").max(11, "O número de telefone deve ter no máximo 11 dígitos, sendo o DDD e os outros 9 dígitos que compõem o número").optional(),
  })

export { UpdateEmployeeFormSchema };
