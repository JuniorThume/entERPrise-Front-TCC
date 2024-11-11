export interface IEmployee {
  id: number;
  role: string;
  name: string;
  personal_data: {
    id: number;
    cpf: string | null;
    email: string | null;
    phone: string | null;
  };
};
