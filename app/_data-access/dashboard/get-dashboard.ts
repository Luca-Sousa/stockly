import "server-only";

import { db } from "@/app/_lib/prisma";
import { ProductStatusDTO } from "../products/get-products";

export interface MostSoldProductDTO {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDTO;
  price: number;
}

interface DashboardDTO {
  mostSoldProducts: MostSoldProductDTO[];
}

export const getDashboard = async (): Promise<DashboardDTO> => {
  const mostSoldProductsQuery = `
    SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."id" as "productId"
    FROM "SaleProduct"
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
    ORDER BY "totalSold" DESC
    LIMIT 5;
  `;

  const mostSoldProductsPromise = db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      totalSold: number;
      stock: number;
      price: number;
    }[]
  >(mostSoldProductsQuery);

  const [mostSoldProducts] = await Promise.all([mostSoldProductsPromise]);

  return {
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  };
};
