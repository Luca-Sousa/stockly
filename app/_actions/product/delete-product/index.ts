"use server"

import { db } from "@/app/_lib/prisma";
import { deleteProductSchema, DeleteProductSchema } from "./shema";
import { revalidatePath } from "next/cache";

export const deleteproject = async ({ id }: DeleteProductSchema) => {
  deleteProductSchema.parse({ id });

  await db.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/products")
};
