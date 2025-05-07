import { getProducts } from "@/app/_data-access/products/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import CreateSaleButton from "./_components/create-sale-button";
import { DataTable } from "@/app/_components/ui/data-table";
import { saleTableColumns } from "./_components/table-columns";
import { getSales } from "@/app/_data-access/sale/get-sales";
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";

const SalesPage = async () => {
  const products = await getProducts();
  const sales = await getSales();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8 flex flex-col">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Vendas</HeaderSubtitle>
          <HeaderTitle>Vendas</HeaderTitle>
        </HeaderLeft>

        <HeaderRight>
          <CreateSaleButton
            products={products}
            productOptions={productOptions}
          />
        </HeaderRight>
      </Header>

      <div className="overflow-y-auto">
        <DataTable columns={saleTableColumns} data={tableData} />
      </div>
    </div>
  );
};

export default SalesPage;
