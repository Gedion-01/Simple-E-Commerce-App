"use client";

import React, { useEffect, useState } from "react";
import {
  fetchOrders,
  fetchOrderDetails,
  updateOrderStatus,
} from "@/lib/admin_handler";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId: number, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  const handleOrderClick = async (orderId: number) => {
    try {
      const orderDetails = await fetchOrderDetails(orderId);
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error("Error fetching order details", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.customer_name}</td>
                <td className="py-2">${order.total}</td>
                <td className="py-2">{order.status}</td>
                <td className="py-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="bg-gray-200 p-2 rounded-md"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedOrder && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Customer:</strong> {selectedOrder.customer_name}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.total}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <h3 className="font-semibold mt-4 mb-2">Order Items:</h3>
            <ul className="list-disc list-inside">
              {selectedOrder.products.map((item: any, index: number) => (
                <li key={index} className="text-gray-600">
                  {item.name} - Quantity: {item.pivot.quantity}, Price: $
                  {item.pivot.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
