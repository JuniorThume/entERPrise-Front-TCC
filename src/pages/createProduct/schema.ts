import { z } from "zod"

const createProductFormSchema = z.object({
  product_name: z.string()
    .min(3, "O Nome deve conter no mínimo 3 caracteres"),
  product_brand: z.string()
    .min(3, "A Marca deve conter no mínimo 3 caracteres"),
  product_category: z.string()
    .min(3, "A Categoria deve conter no mínimo 3 caracteres"),
  product_material: z.string()
    .min(3, "O Material deve conter no mínimo 3 caracteres"),
  product_description: z.string().optional(),
  // product_img: z.string()
})

export { createProductFormSchema };