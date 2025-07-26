// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',         // Vite proxy에 의해 localhost:4000으로 포워딩됩니다
  withCredentials: true,   // 필요 시 쿠키 전송을 허용
});

export default api;
