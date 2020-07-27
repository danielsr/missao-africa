export type PersonValidationErrors = {
  cpf?: string;
  email?: string;
};

export type Person = {
  id?: number;
  submitedAt?: Date | null;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  locale: string;
  validationErrors?: PersonValidationErrors;
};

export type Label = {
  id: number;
  name: string;
  color: string;
  description?: string;
};

export type User = {
  name: string;
  email: string;
  id: string;
};

export type Pagination = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
};
