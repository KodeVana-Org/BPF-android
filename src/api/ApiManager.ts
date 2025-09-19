import axios from 'axios';

// cant use localhost here
const ApiManager = axios.create({
  baseURL: 'https://bpf-backend.onrender.com/',
  // baseURL: 'http://10.170.52.13:6969/',
  // responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
