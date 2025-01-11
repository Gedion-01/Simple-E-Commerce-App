import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ProtectedContent from "./_components/protected-content";

async function ProtectedPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Token", token);

  if (!token) {
    redirect("/login");
  }

  return <ProtectedContent />;
}

export default ProtectedPage;
