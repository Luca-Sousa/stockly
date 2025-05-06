import { CircleDollarSignIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { getTotalSales } from "../../_data-access/dashboard/get-total-sales";

const TotdalSalesCard = () => {
  const totalSales = getTotalSales();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <CircleDollarSignIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
      <SummaryCardValue>{totalSales}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotdalSalesCard;
