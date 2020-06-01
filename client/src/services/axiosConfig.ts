import axios from 'axios';
import { redirectToLoginPage, getToken } from './auth';

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
    // Todo: Refresh token
    return response;
  },
  function (error) {
    if (error.response.status) {
      redirectToLoginPage();
    }
    return Promise.reject(error);
  }
);

export default axios;
