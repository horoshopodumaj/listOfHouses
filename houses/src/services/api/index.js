import axios from "axios";

export const API_URL = "https://dispex.org/api/vtest/";

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

export default api;
