// loanAPI.js
import axios from "axios";

// Creating an axios instance with the base URL
const API = axios.create({
  baseURL: "http://localhost:8000/api/loans", // Backend base URL for loans
  withCredentials: true, // Include cookies if using session-based auth
});

// Add interceptor to attach JWT token to Authorization header
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API functions for loans
export const addLoan = (loanData) => API.post("/add", loanData);               // Add a new loan
export const getLoans = () => API.get("/");                                     // Get all loans for the logged-in user
export const updateLoan = (id, updatedData) => API.put(`/${id}`, updatedData);
export const deleteLoan = (id) => API.delete(`/${id}`);                         // Delete a loan
