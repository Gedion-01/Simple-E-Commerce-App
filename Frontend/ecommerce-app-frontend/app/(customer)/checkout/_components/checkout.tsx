"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { placeOrder } from "@/lib/orders_handler";
import Confetti from "react-confetti";

export const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export function Checkout() {
  const [step, setStep] = useState(1);
  const { cartItems, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<null | string>(null);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (confettiVisible) {
      const timer = setTimeout(() => {
        setConfettiVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [confettiVisible]);

  const shippingForm = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  const onSubmit: SubmitHandler<ShippingFormData> = async (data) => {
    try {
      setLoading(true);
      const orderData = {
        full_name: data.fullName,
        email: data.email,
        address: data.address,
        city: data.city,
        zip_code: data.zipCode,
        products: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await placeOrder(orderData);
      console.log("Order placed successfully", response);
      setOrderId(response.order.id);
      clearCart();
      setStep(2);
      setConfettiVisible(true);
    } catch (error) {
      console.error("Error placing order", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <motion.div
        className="w-full lg:w-2/3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form
              onSubmit={shippingForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...shippingForm.register("fullName")} />
                {shippingForm.formState.errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {shippingForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...shippingForm.register("email")}
                />
                {shippingForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {shippingForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...shippingForm.register("address")} />
                {shippingForm.formState.errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {shippingForm.formState.errors.address.message}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...shippingForm.register("city")} />
                  {shippingForm.formState.errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {shippingForm.formState.errors.city.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" {...shippingForm.register("zipCode")} />
                  {shippingForm.formState.errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {shippingForm.formState.errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                Continue to Payment
              </Button>
            </form>
          </div>
        )}
        {step === 2 && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {confettiVisible && (
              <Confetti
                width={windowDimensions.width}
                height={windowDimensions.height}
              />
            )}
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
            <p className="text-gray-600 mb-4">
              Order number:{" "}
              <span className="font-semibold">
                #{orderId != null ? orderId : ""}
              </span>
            </p>
            <Button
              onClick={() => (window.location.href = "/orders")}
              className="w-full"
            >
              View Orders
            </Button>
          </motion.div>
        )}
      </motion.div>
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <Separator className="my-4" />
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center text-green-600 mb-4">
            <Truck className="w-5 h-5 mr-2" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CreditCard className="w-5 h-5 mr-2" />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
