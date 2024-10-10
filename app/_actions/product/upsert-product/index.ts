"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";

export const upsertProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);

  await db.product.upsert({
    // Se for encontrado o product pelo ID ele será atualizado, se não será criado;
    where: { id: data.id ?? "" },
    update: data,
    create: data,
  });

  revalidatePath("/products");
};
