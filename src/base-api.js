import axios  from './axios-config';

export default class BaseApi {
  constructor() {}
  GET(url) {
    return axios.get(url,);
  }
  POST(url, body) {
    return axios.post(url, body);
  }
  PATCH(url, body) {
    return axios.patch(url, body);
  }
  DELETE(url) {
    return axios.delete(url);
  }
  PUT(url, body) {
    return axios.put(url, body);
  }
}
