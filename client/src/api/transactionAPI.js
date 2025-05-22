// src/api/transactionAPI.js
import axios from "axios";

// Creating an axios instance with the base URL
const API = axios.create({
  baseURL: "http://localhost:8000/api/transactions", // Backend base URL for transactions
  withCredentials: true, // If you are handling cookies/sessions
});

// Adding an interceptor to include the token in the Authorization header
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`; // Add token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions for transactions
export const addTransaction = (transactionData) => API.post("/add", transactionData);
export const getTransactions = () => API.get("/");
export const deleteTransaction = (id) => API.delete(`/${id}`);
export const getTransactionById = (id) => API.get(`/${id}`);
export const updateTransaction = (id, updatedData) => API.put(`/${id}`, updatedData);
