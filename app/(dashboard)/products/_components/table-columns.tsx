"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Esgotado";
};

export const productsTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor Unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);

      return (
        <Badge
          className={`gap-1.5 ${label === "Em estoque" ? "bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700" : "bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-700"}`}
        >
          <CircleIcon
            className={`${label === "Em estoque" ? "fill-green-600 hover:fill-green-700" : "bg-fill-slate-700 fill-slate-600"}`}
            size={8}
          />
          {label}
        </Badge>
      );
    },
  },
];
