import axios from "axios";

// Set up the API base URL
const API_BASE_URL = "http://localhost:3000"; // Change this when deploying

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
