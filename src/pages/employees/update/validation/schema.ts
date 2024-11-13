import { z } from "zod";

const UpdateEmployeeFormSchema = z
  .object({
    role: z.string({ message: "Função do funcionário é um campo obrigatório" }),
    name: z
      .string()
      .min(3, "O Nome do funcionário deve conter no mínimo 3 caracteres"),
    email: z.string().optional(),
    cpf: z.string().optional(),
    phone: z.string().optional(),
  })
  .superRefine(({ email, cpf, phone }, ctx) => {
    if (email !== "" && !z.string().email().safeParse(email).success) {
      ctx.addIssue({
        message: "Insira um e-mail valido.",
        path: ["email"],
        code: "custom",
      });
    }
    if (
      cpf !== "" &&
      !z
        .string()
        .length(11)
        .regex(/(\d{11})/g)
        .safeParse(cpf).success
    ) {
      ctx.addIssue({
        message:
          "O CPF deve ser composto apenas por números, precisa conter 11 dígitos e ser válido.",
        path: ["cpf"],
        code: "custom",
      });
    }

    if (
      phone !== "" &&
      !z
        .string()
        .length(11)
        .regex(/(\d{11})/g)
        .safeParse(phone).success
    ) {
      ctx.addIssue({
        message:
          "O Telefone deve ser composto apenas por números, precisa conter 11 dígitos(incluindo DDD).",
        path: ["phone"],
        code: "custom",
      });
    }
  })
  .transform((data) => {
    // if (data.name === employee.name) {
    //   delete data.name;
    // }
    // if (data.role === employee.role) {
    //   delete data.role;
    // }
    if (data.email === "" /*|| data.email === employee.personal_data.email*/) {
      delete data.email;
    }
    if (data.cpf === "" /*|| data.cpf === employee.personal_data.cpf*/) {
      delete data.cpf;
    }
    if (data.phone === "" /*|| data.phone === employee.personal_data.phone*/) {
      delete data.phone;
    }

    return data;
  });

export { UpdateEmployeeFormSchema };
