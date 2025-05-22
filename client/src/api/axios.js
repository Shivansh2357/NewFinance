// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api", // 👈 backend base URL
  withCredentials: true, // if you plan to handle cookies/sessions
});

// Adding a response interceptor to handle errors globally
instance.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  (error) => {
    // Handle global errors here
    if (error.response) {
      // The request was made, and the server responded with a status code
      console.error('Error Response:', error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something else happened
      console.error('Error Message:', error.message);
    }

    // You can also show a global notification or redirect, depending on the error
    // For example, redirect to login on 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Redirect to login page or handle session expiration
      console.log('Session expired, redirecting to login...');
    }

    return Promise.reject(error);
  }
);

export default instance;
