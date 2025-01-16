"use client";

import { useEffect, useState } from "react";
import { fetchUserOrders } from "@/lib/orders_handler";
import { Package, Truck, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    const fetchOrders = async (page: number) => {
      try {
        const data = await fetchUserOrders(page);
        console.log(data);
        setOrders(data.data);
        setTotalPages(data.last_page);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders(currentPage);
  }, [currentPage]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-yellow-500" />;
    }
  };

  const calculateTotalPrice = (products: any[]) => {
    return products
      .reduce((total, product) => {
        return total + product.pivot.quantity * parseFloat(product.pivot.price);
      }, 0)
      .toFixed(2);
  };

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredOrders = orders.filter((order: any) => {
    if (selectedTab === "all") return true;
    return order.status.toLowerCase() === selectedTab;
  });

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
      <TabsList>
        <TabsTrigger value="all">All Orders</TabsTrigger>
        <TabsTrigger value="shipped">Shipped</TabsTrigger>
        <TabsTrigger value="delivered">Delivered</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-6">
        <div className="space-y-6">
          {filteredOrders.map((order: any) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className="ml-2 text-sm font-medium">
                    {order.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">
                Date: {formatDateTime(order.created_at)}
              </p>
              <p className="text-gray-600 mb-4">
                Total: ${calculateTotalPrice(order.products)}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Order Items:</h3>
                <ul className="list-disc list-inside">
                  {order.products.map((item: any, index: number) => (
                    <li key={index} className="text-gray-600">
                      {item.name} - Quantity: {item.pivot.quantity}, Price: $
                      {item.pivot.price}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
      </TabsContent>
      <TabsContent value="shipped" className="mt-6">
        <div className="space-y-6">
          {filteredOrders.map((order: any) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className="ml-2 text-sm font-medium">
                    {order.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">
                Date: {formatDateTime(order.created_at)}
              </p>
              <p className="text-gray-600 mb-4">
                Total: ${calculateTotalPrice(order.products)}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Order Items:</h3>
                <ul className="list-disc list-inside">
                  {order.products.map((item: any, index: number) => (
                    <li key={index} className="text-gray-600">
                      {item.name} - Quantity: {item.pivot.quantity}, Price: $
                      {item.pivot.price}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
      </TabsContent>
      <TabsContent value="delivered" className="mt-6">
        <div className="space-y-6">
          {filteredOrders.map((order: any) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className="ml-2 text-sm font-medium">
                    {order.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">
                Date: {formatDateTime(order.created_at)}
              </p>
              <p className="text-gray-600 mb-4">
                Total: ${calculateTotalPrice(order.products)}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Order Items:</h3>
                <ul className="list-disc list-inside">
                  {order.products.map((item: any, index: number) => (
                    <li key={index} className="text-gray-600">
                      {item.name} - Quantity: {item.pivot.quantity}, Price: $
                      {item.pivot.price}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
