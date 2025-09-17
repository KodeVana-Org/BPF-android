import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://bpf-backend.onrender.com/',
  // responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
