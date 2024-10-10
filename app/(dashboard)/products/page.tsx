import { DataTable } from "@/app/_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";
import { getProducts } from "@/app/_data-access/products/get-products";
import CreateProductButton from "./_components/create-product-button";

// Essa página será montada uma vez e reutilizada (SSG), podendo ser incrementada de forma regenerativa (ISR)
export const dynamic = "force-static";

const Productspage = async () => {
  const products = await getProducts();

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Produtos
          </span>
          <h1 className="text-xl font-semibold">Produtos</h1>
        </div>

        <CreateProductButton />
      </div>

      <DataTable
        columns={productsTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default Productspage;
