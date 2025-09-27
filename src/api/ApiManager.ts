import axios from 'axios';

// cant use localhost here
const ApiManager = axios.create({
  // baseURL: 'https://bpf-backend.onrender.com/',
  baseURL: 'http://10.197.91.13:6969/',
  // 10.197.91.13
  // responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
