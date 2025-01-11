import axios from "axios";
import { headers } from "next/headers";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serverApi.interceptors.request.use(
  async (config) => {
    const cookieHeader = (await headers()).get("cookie");
    console.log("cookieHeader", cookieHeader);
    if (cookieHeader) {
      // the token from cookies
      const match = cookieHeader.match(/token=([^;]+)/);
      if (match) {
        const token = match[1];
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default serverApi;
