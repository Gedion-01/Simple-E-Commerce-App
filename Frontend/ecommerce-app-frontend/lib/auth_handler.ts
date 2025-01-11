import clientApi from "./clientApi";
import Cookies from "js-cookie";

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function registerUser(user: User) {
  try {
    const response = await clientApi.post("/register", user);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await clientApi.post("/login", { email, password });
    Cookies.set("token", response.data.token, {
      expires: 7, // 7 days
      //   secure: true, // Ensures the browser only sends the cookie over HTTPS
      sameSite: "strict", // Helps protect against CSRF attacks
    });
    return response.data.token;
  } catch (error) {
    console.error("Error logging in user", error);
    throw error;
  }
}

export function logoutUser() {
  Cookies.remove("token");
}
