import { ProductFormSchema } from "./schema";

export type ProductFormData = {
  product_name: string;
  product_description: string;
  product_code: string;
  product_category: string;
  product_brand: string;
  product_material: string;
  product_genre: string;
  product_image: string;
  button_action: string;
}

type createProductFormData = z.infer<typeof ProductFormSchema>