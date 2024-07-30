import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://3.108.26.92:6969/',
  // responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
