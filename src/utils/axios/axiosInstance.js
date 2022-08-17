import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  timeout: 10000,
});
