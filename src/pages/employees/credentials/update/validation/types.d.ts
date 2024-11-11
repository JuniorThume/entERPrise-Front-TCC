export type UpdateCredentialFormData = {
  update_credential_username: string;
  update_credential_old_password: string;
  alter_password: boolean;
  update_credential_new_password: string | undefined;
  update_credential_confirm_new_password: string | undefined;
}

type updateCredentialFormData = Zod.infer<typeof UpdateCredentialFormSchema>