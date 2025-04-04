import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5122/api/", // Use environment variable for base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Removed the interceptor for token handling

export default apiClient;
