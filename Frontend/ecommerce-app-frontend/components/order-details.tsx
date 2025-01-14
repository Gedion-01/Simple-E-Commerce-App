import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderDetailsProps {
  order: any;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Customer</p>
          <p className="font-medium">{order.full_name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{order.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Address</p>
          <p className="font-medium">{order.address}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">City</p>
          <p className="font-medium">{order.city}</p>
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
  );
}
