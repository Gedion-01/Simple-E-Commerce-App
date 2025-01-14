import serverApi from "@/lib/serverApi";
import Cookies from "js-cookie";

export async function getUserRole(): Promise<string | null> {
  const token = Cookies.get("token");

  if (!token) {
    return null;
  }

  try {
    const response = await serverApi.get("/api/user-role", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.role;
  } catch (error) {
    console.error("Error fetching user role", error);
    return null;
  }
}
