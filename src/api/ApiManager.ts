import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://13.235.94.196:6969/',
  // responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
