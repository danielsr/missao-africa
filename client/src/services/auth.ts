import history from '../routes/history';

export function redirectToLoginPage() {
  setTimeout(() => {
    const queryParams = new URLSearchParams();
    queryParams.append('redirectUrl', `${history.location.pathname}${history.location.search}`);
    history.push(`/login?${queryParams.toString()}`);
  }, 100);
}

export function redirectToReturnUrl() {
  const queryParams = new URLSearchParams(history.location.search);
  history.push(queryParams.get('redirectUrl') ?? '/');
}

export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user && JSON.parse(user);
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}
