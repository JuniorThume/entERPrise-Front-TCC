import { z } from "zod";

const UpdateCredentialFormSchema = z
  .object({
    username: z
      .string({ message: "Nome do usuário é um campo obrigatório" })
      .min(3, "O Nome do Usuário deve conter no mínimo 3 caracteres"),
    old_password: z
      .string({ message: "Senha é um campo obrigatório" })
      .min(6, "A Senha deve conter no mínimo 6 caracteres"),
    checkbox: z.boolean().optional(),
    new_password: z.string().min(6, 'A nova senha deve ter, no mínimo, 6 caracteres').optional(),
    confirm_new_password: z.string().optional(),
  })
  .superRefine(
    ({ checkbox, confirm_new_password, new_password, old_password }, ctx) => {
      if (checkbox) {
        console.log(checkbox);
        if (!new_password) {
          ctx.addIssue({
            path: ["new_password"],
            message: "A nova senha precisa ser informada",
            code: "custom",
          });
        }
        if (!confirm_new_password) {
          ctx.addIssue({
            message: "É necessário confirmar a nova senha",
            path: ["confirm_new_password"],
            code: "custom",
          });
        }
        if (new_password !== confirm_new_password) {
          ctx.addIssue({
            message: "As senhas não são iguais",
            path: ["new_password"],
            code: "custom",
          });
        }
        if (new_password === old_password) {
          ctx.addIssue({
            message: "A nova senha não pode ser igual a senha atual",
            path: ["new_password"],
            code: "custom",
          });
        }
      }
    }
  )
  .transform((data) => {
    if (data.new_password === undefined) {
      delete data.new_password;
    }
    delete data.checkbox;
    delete data.confirm_new_password;
    return data;
  });

export { UpdateCredentialFormSchema };
