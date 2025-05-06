import "server-only";

import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
import { ProductStatusDTO } from "../products/get-products";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

export interface MostSoldProductDTO {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDTO;
  price: number;
}

interface DashboardDTO {
  totalLast14DaysRevenue: DayTotalRevenue[];
  mostSoldProducts: MostSoldProductDTO[];
}

export const getDashboard = async (): Promise<DashboardDTO> => {
  const today = dayjs().endOf("day").toDate();
  const totalLast14DaysRevenue: DayTotalRevenue[] = [];

  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );

  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: number }[]
    >(
      `
      SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;
      `,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );

    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: dayTotalRevenue[0].totalRevenue || 0,
    });
  }

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

  const [mostSoldProducts] = await Promise.all([
    mostSoldProductsPromise,
  ]);

  return {
    totalLast14DaysRevenue,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  };
};
