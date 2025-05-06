"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductTableDropdownMenu from "./table-dropdown-menu";
import { ProductDTO } from "@/app/_data-access/products/get-products";
import ProductStatusBadge from "@/app/_components/product-status-badge";

export const productsTableColumns: ColumnDef<ProductDTO>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor Unitário",
    cell: ({
      row: {
        original: { price },
      },
    }) => {
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({
      row: {
        original: { status },
      },
    }) => {
      return <ProductStatusBadge status={status} />;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({
      row: {
        original: { ...product },
      },
    }) => <ProductTableDropdownMenu product={product} />,
  },
];
