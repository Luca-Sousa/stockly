"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";

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
      // @ts-expect-error - status is a string
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
  {
    accessorKey: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acões</DropdownMenuLabel>
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-1.5">
              <EditIcon size={16} />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-1.5">
              <TrashIcon size={16} />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
