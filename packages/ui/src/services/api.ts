import axios from 'axios';
import { toast } from 'react-toastify';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        toast.error(error.response.data.error || 'An error occurred.');
      } else if (error.request) {
        toast.error('No response from server.');
      } else {
        toast.error('Error setting up request.');
      }
      return Promise.reject(error);
    }
  );

export default api;
