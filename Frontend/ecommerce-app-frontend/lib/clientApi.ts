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

clientApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.data.message == "Unauthorized" &&
      error.response.status === 401
    ) {
      Cookies.remove("token");
      console.log("removed token");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(() => {});
    }
    return Promise.reject(error);
  }
);

export default clientApi;
