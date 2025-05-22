import axios from "axios";

const LOCAL_BASE_URL = "http://localhost:8000/api/transactions";
const PROD_BASE_URL = "https://newfinance.onrender.com/api/transactions";

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

export const addTransaction = (transactionData) => API.post("/add", transactionData);
export const getTransactions = () => API.get("/");
export const deleteTransaction = (id) => API.delete(`/${id}`);
export const getTransactionById = (id) => API.get(`/${id}`);
export const updateTransaction = (id, updatedData) => API.put(`/${id}`, updatedData);
