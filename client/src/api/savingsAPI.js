import axios from "axios";

const LOCAL_BASE_URL = "http://localhost:8000/api/savings";
const PROD_BASE_URL = "https://newfinance.onrender.com/api/savings";

const BASE_URL = window.location.hostname === "localhost" ? LOCAL_BASE_URL : PROD_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

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

export const getSavings = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching savings data", error);
    throw error;
  }
};

export const addSavings = async (savingsData) => {
  try {
    const response = await API.post("/add", savingsData);
    return response.data;
  } catch (error) {
    console.error("Error adding savings goal", error);
    throw error;
  }
};

export const updateSavings = async (id, savingsData) => {
  try {
    const response = await API.put(`/${id}`, savingsData);
    return response.data;
  } catch (error) {
    console.error("Error updating savings goal", error);
    throw error;
  }
};

export const deleteSavings = async (id) => {
  try {
    const response = await API.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting savings goal", error);
    throw error;
  }
};
