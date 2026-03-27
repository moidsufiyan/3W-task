import axios from 'axios';
let rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://taskplanet-social-lja3.onrender.com/api';
if (rawBaseUrl && !rawBaseUrl.endsWith('/api')) {
  rawBaseUrl += '/api';
}
const axiosClient = axios.create({
  baseURL: rawBaseUrl,
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosClient;