import { z } from "zod";

const CredentialFormSchema = z
  .object({
    credential_username: z
      .string({ message: "Nome do usuário é um campo obrigatório" })
      .min(3, "O Nome do Usuário deve conter no mínimo 3 caracteres"),
    credential_employee: z.string({
      message: "Definir um funcionário é um campo obrigatório",
    }),
    credential_password: z
      .string({ message: "Senha é um campo obrigatório" })
      .min(6, "A Senha deve conter no mínimo 6 caracteres"),
    credential_confirm_password: z
      .string({ message: "Confirmação da Senha é um campo obrigatório" })
      .min(6, "A confirmação da senha deve conter no mínimo 6 caracteres"),
  })
  .refine(
    (data) => data.credential_password === data.credential_confirm_password,
    {
      message: "As senhas não são iguais",
      path: ["credential_confirm_password"],
    }
  );

export { CredentialFormSchema };
