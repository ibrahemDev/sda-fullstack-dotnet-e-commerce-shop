import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'http://localhost:3000/api'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:3000/api'
}

// Axios interceptor to add JWT to Authorization header
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Get JWT token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const api = axios.create({
  baseURL
})

// use this to handle errors gracefully
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 500) {
//       throw new Error(error.response.data)
//     }
//   }
// )

export default api
