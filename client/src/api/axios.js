import axios from "axios";

// Hardcoded URLs for local and production
const LOCAL_BASE_URL = "http://localhost:8000/api";
const PROD_BASE_URL = "https://newfinance.onrender.com/api";

// Simple runtime check on window.location.hostname to pick URL
const BASE_URL = window.location.hostname === "localhost" ? LOCAL_BASE_URL : PROD_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Error Response:", error.response);
    } else if (error.request) {
      console.error("Error Request:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }

    if (error.response && error.response.status === 401) {
      console.log("Session expired, redirecting to login...");
    }

    return Promise.reject(error);
  }
);

export default instance;
