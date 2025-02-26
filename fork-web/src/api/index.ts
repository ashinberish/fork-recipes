import _axios from 'axios';

const ignoreCredentialsEndpoints = [''];

const axios = _axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
 * Interceptor to ignore credentials for specific endpoints
 */
axios.interceptors.request.use(
  (config) => {
    if (!ignoreCredentialsEndpoints.includes(config.url || '')) {
      config.withCredentials = true;
    } else {
      config.withCredentials = false;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axios };
