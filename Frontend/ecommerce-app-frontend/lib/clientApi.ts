import axios from "axios";
import Cookies from "js-cookie";

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

clientApi.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clientApi;
