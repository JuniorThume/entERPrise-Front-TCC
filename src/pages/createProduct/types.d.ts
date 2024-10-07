export type createProductFormData = {
  product_name: string;
  product_description: string;
  product_category: string;
  product_brand: string;
  product_material: string;
  product_genre: string;
}

type createUserFormData = z.infer<typeof createUserFormSchema>