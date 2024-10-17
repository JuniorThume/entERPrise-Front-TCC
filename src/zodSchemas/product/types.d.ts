export type ProductFormData = {
  product_name: string;
  product_description: string;
  product_category: string;
  product_brand: string;
  product_material: string;
  product_genre: string;
  product_image: string;
  button_action: string;
  
}

type createUserFormData = z.infer<typeof UserFormSchema>