import { DataTable } from "@/app/_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";
import { getProducts } from "@/app/_data-access/products/get-products";
import CreateProductButton from "./_components/create-product-button";
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";

const Productspage = async () => {
  const products = await getProducts();

  return (
    <div className="m-8 flex w-full flex-col space-y-8 overflow-hidden rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>

        <HeaderRight>
          <CreateProductButton />
        </HeaderRight>
      </Header>

      <div className="overflow-y-auto">
        <DataTable
          columns={productsTableColumns}
          data={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </div>
  );
};

export default Productspage;
