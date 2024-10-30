import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { getProducts } from "@/app/_data-access/products/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

const SalesPage = async () => {
  const products = await getProducts();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h1 className="text-xl font-semibold">Vendas</h1>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button>Nova venda</Button>
          </SheetTrigger>

          <UpsertSheetContent products={products} productOptions={productOptions} />
        </Sheet>
      </div>
    </div>
  );
};

export default SalesPage;
