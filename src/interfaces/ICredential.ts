import { IEmployee } from "./IEmployee";

export interface ICredential {
  employee_id: number;
  employee: IEmployee;
  username: string;
  created_at: Date;
}