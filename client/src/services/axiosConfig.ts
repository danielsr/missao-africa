import axios from 'axios';
import { redirectToLoginPage, getToken, setToken } from './auth';

axios.defaults.baseURL = 'http://localhost:3001';

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers['Authorization'] = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const newToken = response.headers.token;
    if (newToken) {
      setToken(newToken);
    }
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      redirectToLoginPage();
    }
    return Promise.reject(error);
  }
);

export default axios;
