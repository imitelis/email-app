import axios from "axios";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;