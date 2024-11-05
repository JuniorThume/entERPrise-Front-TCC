export interface IEmployee {
  id: number;
  role: string;
  name: string;
  personal_data: {
    id: number;
    cpf: string;
    email: string;
    phone: string | null;
  };
};
