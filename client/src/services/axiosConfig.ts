import axios from 'axios';
import history from '../routes/history';

axios.defaults.baseURL = 'http://localhost:3001';

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = sessionStorage.getItem('token');
    config.headers['Authorization'] = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log(response.headers);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status) {
      history.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axios;
