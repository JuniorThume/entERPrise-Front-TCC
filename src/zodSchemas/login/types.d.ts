export type LoginFormData = {
  username: string;
  password: string;
}

type createUserFormData = z.infer<typeof UserFormSchema>