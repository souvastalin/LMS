import axios from 'axios';

// Set up a base URL for API requests
const API_URL = 'http://localhost:5000/api';

// Set up axios interceptor to include the token in requests if it exists
axios.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    let token = null;
    if (user) {
        try {
            token = JSON.parse(user).token;
        } catch (error){console.error("Error parsing user data")}
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

