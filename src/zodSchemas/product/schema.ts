import { z } from "zod"

const ProductFormSchema = z.object({
  product_name: z.string({message: "Nome é um campo obrigatório"})
  .min(3, "O Nome deve conter no mínimo 3 caracteres"),
  product_brand: z.string({message: "Marca é um campo obrigatório"})
    .min(3, "A Marca deve conter no mínimo 3 caracteres"),
  product_category: z.string({message: "Categoria é um campo obrigatório"})
    .min(3, "A Categoria deve conter no mínimo 3 caracteres"),
  product_material: z.string({message: "Material é um campo obrigatório"})
    .min(2, "O Material deve conter no mínimo 2 caracteres"),
  product_description: z.string().max(255, "A descrição tem um limite máximo de 255 caracteres").optional(),
  product_genre: z.enum(["Masculino", "Feminino", "Unissex"], { message: "Selecione um gênero válido" }),
  product_image: z.any().optional(),
  button_action: z.string().optional(),
})

export { ProductFormSchema };