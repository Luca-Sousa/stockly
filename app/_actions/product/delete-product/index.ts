"use server";

import { db } from "@/app/_lib/prisma";
import { deleteProductSchema } from "./shema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";

export const deleteProject = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/", "layout")
  });
