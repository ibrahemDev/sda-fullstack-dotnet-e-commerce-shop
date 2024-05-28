import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'https://sda-fullstack-dotnet-e-commerce-shop.onrender.com/api'

if (isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:3000/api'
}


const api = axios.create({
  baseURL
})


// Axios interceptor to add JWT to Authorization header
api.interceptors.request.use(
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
