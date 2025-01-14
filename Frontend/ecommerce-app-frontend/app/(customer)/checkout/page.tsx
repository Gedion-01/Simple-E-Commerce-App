import { redirect } from "next/navigation";
import { isAuthenticated } from "@/hooks/useAuth";
import { Checkout } from "./_components/checkout";

export default async function CheckoutPage() {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    return redirect("/login");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <Checkout />
    </div>
  );
}
