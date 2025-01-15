import { isAuthenticated } from "@/hooks/useAuth";
import { Orders } from "./_components/orders";
import { redirect } from "next/navigation";

async function OrdersPage() {
  const auth = await isAuthenticated();
  if (!auth) {
    return redirect("/login");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <Orders />
    </div>
  );
}

export default OrdersPage;
