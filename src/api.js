import axios from "axios";

/** Base URL string for axios and for `fetch` / `window.open` (axios instances are not URLs). */
export const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : import.meta.env.VITE_API_URL || "/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

export default API;