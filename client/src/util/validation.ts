import { isValid } from '@fnando/cpf';

export function required(value: string) {
  return value ? null : 'Required';
}

export function email(value: string) {
  const re = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/i;
  return re.test(value) ? null : 'Invalid email';
}

export function cpf(value: string) {
  return isValid(value) ? null : 'Invalid CPF';
}
