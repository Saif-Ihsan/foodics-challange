import axios from 'axios';
import ls from './modules/shared/services/localstorage-actions';

const baseURL = '';
const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    data: {},
});

api.defaults.timeout = 60000;

api.interceptors.request.use(
    config => {
      const token = ls.getValue('token');
      if (token) {
          if (config.url.indexOf('login') === -1) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
          }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.data);
      } else {

        return Promise.reject(response);
      }
    },
  error => {
      if (error && error.response && error.response.status) {
        switch (error.response.status) {
          case 400:
           
           //do something
            break;
        
          case 401:
            // alert('session expired');
            ls.removeValue('user');
            break;
          case 403:
            // router.replace({
            //   path: '/login',
            //   query: { redirect: router.currentRoute.fullPath }
            // });
             break;
          case 404:
            // alert('page not exist');
            break;
          case 502:
           setTimeout(() => {
            //   router.replace({
            //     path: '/login',
            //     query: {
            //       redirect: router.currentRoute.fullPath
            //     }
            //   });
            }, 1000);
        }
        return Promise.reject(error.response);
      } else {
        return Promise.reject(error);
      }
    }
  );



export default api;