import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { db } from "@/app/_lib/prisma";
import { PlusIcon } from "lucide-react";
import { productsTableColumns } from "./_components/table-columns";

const Productspage = async () => {
  const products = await db.product.findMany();

  return (
    <div className="m-8 rounded-lg w-full space-y-8 p-8 bg-white">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Produtos
          </span>
          <h1 className="text-xl font-semibold">Produtos</h1>
        </div>

        <Button className="gap-2 ">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </div>

      <DataTable columns={productsTableColumns} data={products} />
    </div>
  );
};

export default Productspage;
