import clientApi from "./clientApi";

interface OrderProduct {
  id: number;
  quantity: number;
}

interface OrderData {
  full_name: string;
  email: string;
  address: string;
  city: string;
  zip_code: string;
  products: OrderProduct[];
}

export async function placeOrder(orderData: OrderData) {
  try {
    const response = await clientApi.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order", error);
    throw error;
  }
}

export async function fetchUserOrders(page: number = 1) {
  try {
    const response = await clientApi.get(`/orders/user?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders", error);
    throw error;
  }
}
