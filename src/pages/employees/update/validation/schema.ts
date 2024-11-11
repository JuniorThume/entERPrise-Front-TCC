import { z } from "zod";

const UpdateEmployeeFormSchema = z.object({
  employee: z.object({
    role: z.string({
      message: "Função do funcionário é um campo obrigatório",
    }),
    name: z
      .string()
      .min(3, "O Nome do funcionário deve conter no mínimo 3 caracteres"),
  }),
  personal_data: z.object({
    email: z
      .string({ message: "Função do funcionário é um campo obrigatório" })
      .email({ message: "Um e-mail válido deve ser inserido" })
      .or(
        z.literal("").transform((val) => {
          if (!val) {
            return null;
          }
          return val;
        })
      ),

    cpf: z
      .string()
      .length(11, "Digite um CPF válido com 11 dígitos")
      .regex(/^(\d{11})$/g, "Insira um CPF válido de 11 dígitos")
      .or(z.literal(""))
      .transform((val) => {
        if (!val) {
          return null;
        }
        return val;
      }),
    phone: z
      .string()
      .min(11, "O número deve ter, no mínimo, 11 dígitos")
      .max(
        11,
        "O número de telefone deve ter no máximo 11 dígitos, sendo o DDD e os outros 9 dígitos que compõem o número"
      )
      .regex(/^(\d{9}|\d{11})$/g, "O número deve conter apenas números, certifique-se de inserir com o DDD")
      .or(z.literal(""))
      .transform((val) => {
        if (!val) {
          return null;
        }
        return val;
      }),
  }),
});

export { UpdateEmployeeFormSchema };
