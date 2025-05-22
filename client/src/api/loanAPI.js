import axios from "axios";

// Hardcoded base URLs
const LOCAL_BASE_URL = "http://localhost:8000/api/loans";
const PROD_BASE_URL = "https://newfinance.onrender.com/api/loans";

// Pick base URL based on hostname
const BASE_URL =
  window.location.hostname === "localhost" ? LOCAL_BASE_URL : PROD_BASE_URL;

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

export const addLoan = (loanData) => API.post("/add", loanData);
export const getLoans = () => API.get("/");
export const updateLoan = (id, updatedData) => API.put(`/${id}`, updatedData);
export const deleteLoan = (id) => API.delete(`/${id}`);
