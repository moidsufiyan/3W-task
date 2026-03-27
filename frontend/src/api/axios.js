import axios from 'axios';
let rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://taskplanet-social-lja3.onrender.com/api';
if (rawBaseUrl && !rawBaseUrl.endsWith('/api')) {
  rawBaseUrl += '/api';
}
const api = axios.create({
  baseURL: rawBaseUrl,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;