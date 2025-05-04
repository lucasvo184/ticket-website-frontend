import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://ticket-website-backend-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
