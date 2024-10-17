import { z } from "zod"

const LoginFormSchema = z.object({
  username: z.string({message: "Usuário é um campo obrigatório"})
    .min(3, "O nome do Usuário deve conter no mínimo 3 caracteres"),
  password: z.string({message: "Senha é um campo obrigatório"})
    .min(6, "A senha possuir no mínimo 6 caracteres")
})

export { LoginFormSchema };