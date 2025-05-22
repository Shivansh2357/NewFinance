import axios from "axios";

// Creating an axios instance with the base URL
const API = axios.create({
  baseURL: "http://localhost:8000/api/tax", // Backend base URL for taxes
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

// API functions for taxes
export const addTax = (taxData) => API.post("/add", taxData);   // Create a tax record
export const getTaxes = () => API.get("/");                      // Get all tax records for the user
export const getTaxById = (id) => API.get(`/${id}`);             // Get a specific tax record by ID
export const updateTax = (id, updatedData) => API.put(`/${id}`, updatedData);  // Update a tax record
export const deleteTax = (id) => API.delete(`/${id}`);           // Delete a tax record
