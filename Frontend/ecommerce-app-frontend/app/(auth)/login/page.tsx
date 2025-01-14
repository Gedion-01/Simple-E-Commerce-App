import { redirect } from "next/navigation";
import LoginForm from "@/components/authForm/login-form";
import { isAuthenticated } from "@/hooks/useAuth";

async function LoginPage() {
  const auth = await isAuthenticated();
  if (auth) {
    redirect("/protected");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
