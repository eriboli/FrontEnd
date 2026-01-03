import axios from 'axios';

const api = axios.create({
  baseURL: 'https://riboli.cloud/api'
});

export default api;