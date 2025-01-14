"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderDetailsPopupProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsPopup({
  order,
  isOpen,
  onClose,
}: OrderDetailsPopupProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order #{order.id}</DialogTitle>
          <div>
            <Badge
              variant={
                order.status === "Delivered"
                  ? "secondary"
                  : order.status === "Shipped"
                  ? "outline"
                  : "default"
              }
            >
              {order.status}
            </Badge>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customer
              </p>
              <p>{order.full_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{order.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Address
              </p>
              <p>{order.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">City</p>
              <p>{order.city}</p>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {order.products.map((product: any) => (
                  <li
                    key={product.id}
                    className="flex justify-between items-center"
                  >
                    <span>{product.name}</span>
                    <span className="text-muted-foreground">
                      {product.pivot.quantity} x ${product.pivot.price}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  $
                  {order.products
                    .reduce(
                      (total: number, product: any) =>
                        total + product.pivot.price * product.pivot.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
