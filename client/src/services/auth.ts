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

export function setToken(token) {
  sessionStorage.setItem('token', token);
}

export function getToken() {
  return sessionStorage.getItem('token');
}
