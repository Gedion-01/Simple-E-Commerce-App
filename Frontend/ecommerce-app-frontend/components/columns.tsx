"use client";

import { ColumnDef, TableMeta } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onStatusChange: (orderId: string, status: string) => void;
  }
}

interface CustomTableMeta extends TableMeta<any> {}

export const columns: ColumnDef<any, CustomTableMeta>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "full_name",
    header: "Customer",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = row.original.products.reduce(
        (sum: number, product: any) =>
          sum + product.pivot.price * product.pivot.quantity,
        0
      );
      return `$${total.toFixed(2)}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant={
            status === "Delivered"
              ? "default"
              : status === "Shipped"
              ? "secondary"
              : "outline"
          }
        >
          {status as string}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const order = row.original;
      return (
        <Select
          defaultValue={order.status}
          onValueChange={(value) =>
            table.options.meta?.onStatusChange(order.id, value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Change status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
];
