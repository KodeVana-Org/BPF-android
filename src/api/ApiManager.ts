import axios from 'axios';

// cant use localhost here
const ApiManager = axios.create({
  // baseURL: 'https://bpf-backend.onrender.com/',
  baseURL: 'http://192.168.1.156:6969/',
  // responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
