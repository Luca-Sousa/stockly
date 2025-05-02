import "server-only";

import { db } from "@/app/_lib/prisma";

interface SaleProductDTO {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface SaleDTO {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductDTO[];
}

export const getSales = async (): Promise<SaleDTO[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return sales.map(
    (sale): SaleDTO => ({
      id: sale.id,
      productNames: sale.saleProducts
        .map((saleProduct) => saleProduct.product.name)
        .join(" • "),
      totalProducts: sale.saleProducts.reduce(
        (acc, saleProduct) => acc + saleProduct.quantity,
        0,
      ),
      totalAmount: sale.saleProducts.reduce(
        (acc, saleProduct) =>
          acc + saleProduct.quantity * Number(saleProduct.unitPrice),
        0,
      ),
      date: sale.date,
      saleProducts: sale.saleProducts.map(
        (saleProduct): SaleProductDTO => ({
          productId: saleProduct.productId,
          productName: saleProduct.product.name,
          quantity: saleProduct.quantity,
          unitPrice: Number(saleProduct.unitPrice),
        }),
      ),
    }),
  );
};
