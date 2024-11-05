export type UpdateCredentialFormData = {
  update_credential_username: string;
  update_credential_old_password: string;
  update_credential_new_password: string;
  update_credential_confirm_new_password: string;
}

type updateCredentialFormData = z.infer<typeof UserFormSchema>