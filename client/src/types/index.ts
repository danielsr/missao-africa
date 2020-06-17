export type Sponsor = {
  submitedAt?: Date | null;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  locale: string;
};

export type Label = {
  id: number;
  name: string;
  color: string;
  description?: string;
};
