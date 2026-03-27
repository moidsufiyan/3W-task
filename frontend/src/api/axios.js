import axios from 'axios';
let rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
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