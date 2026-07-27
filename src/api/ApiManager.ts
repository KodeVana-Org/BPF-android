import axios from 'axios';

// cant use localhost here
const ApiManager = axios.create({
  baseURL: 'https://bpf-backend.onrender.com/',
  // timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate', // Forces compressed fast payloads like Postman
  },
  // baseURL: 'http://10.55.14.13:6969/',
  // 10.197.91.13
  // responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
