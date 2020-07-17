export function required(value: string) {
  return value ? null : 'Required';
}

export function validateEmail(email) {
  const re = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/i;
  return re.test(String(email).toLowerCase());
}

export function email(value: string) {
  return validateEmail(value) ? null : 'Invalid email';
}
