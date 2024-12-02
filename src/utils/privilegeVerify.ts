import { roles } from "../consts/privilege";

export const privilegeVerify = (user_role: keyof typeof roles, endpoint: string) : boolean => {
  if (roles[user_role]?.includes(endpoint)) return true;
  return false;
}