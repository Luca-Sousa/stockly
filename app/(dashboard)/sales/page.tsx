import { getProducts } from "@/app/_data-access/products/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import CreateSaleButton from "./_components/create-sale-button";

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

        <CreateSaleButton products={products} productOptions={productOptions} />
      </div>
    </div>
  );
};

export default SalesPage;
