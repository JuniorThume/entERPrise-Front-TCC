export type CredentialFormData = {
  credential_username: string;
  credential_employee: string;
  credential_password: string;
  credential_confirm_password: string;
}

type createCredentialFormData = z.infer<typeof UserFormSchema>