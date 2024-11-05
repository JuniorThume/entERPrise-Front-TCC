import { z } from "zod"

const CreateOptionsFormSchema = z.object({
  options_size: z.string({ message: "Tamanho é um campo obrigatório" }).min(1).max(6),
  options_color: z.string({message: "Cor é um campo obrigatório"}).min(3).max(15),
  options_quantity: z.coerce.number().positive().min(1).max(9999),
  options_price: z.coerce.number().positive().min(1).max(9999),
})

export { CreateOptionsFormSchema };