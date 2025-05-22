import axios from "axios";

const LOCAL_BASE_URL = "http://localhost:8000/api/tax";
const PROD_BASE_URL = "https://newfinance.onrender.com/api/tax";

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

export const addTax = (taxData) => API.post("/add", taxData);
export const getTaxes = () => API.get("/");
export const getTaxById = (id) => API.get(`/${id}`);
export const updateTax = (id, updatedData) => API.put(`/${id}`, updatedData);
export const deleteTax = (id) => API.delete(`/${id}`);
