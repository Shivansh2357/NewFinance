import axios from "axios";
//import { useAuth } from "../context/AuthContext"; // Import the useAuth hook to access the token

// Create an axios instance
const API = axios.create({
  baseURL: "http://localhost:8000/api/savings", // Backend base URL
  withCredentials: true, // Include cookies if using session-based auth
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

// API calls for savings
export const getSavings = async () => {
  try {
    const response = await API.get("/"); // Send GET request to /api/savings
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching savings data", error);
    throw error; // Propagate error to be handled by the calling component
  }
};

export const addSavings = async (savingsData) => {
  try {
    const response = await API.post("/add", savingsData); // Add new savings goal
    return response.data;
  } catch (error) {
    console.error("Error adding savings goal", error);
    throw error;
  }
};

export const updateSavings = async (id, savingsData) => {
  try {
    const response = await API.put(`/${id}`, savingsData); // Update savings goal
    return response.data;
  } catch (error) {
    console.error("Error updating savings goal", error);
    throw error;
  }
};

export const deleteSavings = async (id) => {
  try {
    const response = await API.delete(`/${id}`); // Delete savings goal
    return response.data;
  } catch (error) {
    console.error("Error deleting savings goal", error);
    throw error;
  }
};