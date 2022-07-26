import axios from 'axios';
import baseURL from './baseUrl';
const URL = baseURL
export const BASE_URL = URL;

const API = async config => {
  //   const token = await getApiKey();
  //   console.log(token);
  //   if (token) {
  //     config.headers = {
  //       authorization: token,
  //     };
  //   }
  //interceptors handle network error
  axios.interceptors.response.use(
    response => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: 'Network error',
          status: 500,
        };
      }
      if (error.response.status === 401) {
        console.log('Unauthorised');
      }
      return Promise.reject(error);
    },
  );
  config.baseURL = URL;
  return axios(config);
};
export default API;
