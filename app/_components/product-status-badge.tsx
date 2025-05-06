import { CircleIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { ProductStatusDTO } from "../_data-access/products/get-products";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Esgotado";
};

interface ProductStatusBadgeProps {
  status: ProductStatusDTO;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const label = getStatusLabel(status);

  return (
    <Badge
      className={`gap-1.5 ${label === "Em estoque" ? "bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700" : "bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-700"}`}
    >
      <CircleIcon
        className={`${label === "Em estoque" ? "fill-green-600 hover:fill-green-700" : "bg-fill-slate-700 fill-slate-600"}`}
        size={8}
      />
      {label}
    </Badge>
  );
};

export default ProductStatusBadge;
