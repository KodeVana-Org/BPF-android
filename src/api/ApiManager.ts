import axios from 'axios';

// cant use localhost here
const ApiManager = axios.create({
  // baseURL: 'https://bpf-backend.onrender.com/',
  baseURL: 'http://10.69.176.13:6969/',
  // responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
