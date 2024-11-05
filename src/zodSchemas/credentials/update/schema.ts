import { z } from "zod";

const UpdateCredentialFormSchema = z
  .object({
    update_credential_username: z
      .string({ message: "Nome do usuário é um campo obrigatório" })
      .min(3, "O Nome do Usuário deve conter no mínimo 3 caracteres"),
    update_credential_old_password: z
      .string({ message: "Senha é um campo obrigatório" })
      .min(6, "A Senha deve conter no mínimo 6 caracteres"),
    update_credential_new_password: z
      .string({ message: "A nova senha é um campo obrigatório" })
      .min(6, "A Senha deve conter no mínimo 6 caracteres")
      .optional(),
    update_credential_confirm_new_password: z
      .string({ message: "A confirmação da senha é um campo obrigatório" })
      .min(6, "A confirmação da senha deve conter no mínimo 6 caracteres")
      .optional(),
  })
  .refine(
    (data) => data.update_credential_new_password === data.update_credential_confirm_new_password,
    {
      message: "As senhas não são iguais",
      path: ["update_credential_new_password"],
    }
  )
  .refine(
    (data) => data.update_credential_old_password === data.update_credential_new_password,
    {
      message: "A senha antiga não pode ser igual à nova senha",
      path: ["update_credential_new_password"],
    }
  );

export { UpdateCredentialFormSchema };
