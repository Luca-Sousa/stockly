import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { SummaryCardSkeleton } from "./_components/summary-card";
import { Suspense } from "react";
import TotalRevenueCard from "./_components/total-revenue-card";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotdalSalesCard from "./_components/total-sales-card";
import TotalInStockCard from "./_components/total-in-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import TotalLast14DaysRevenueChart from "./_components/total-last-14-days-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";
import MostSoldProductCard, {
  MostSoldProductsSkeleton,
} from "./_components/most-sold-products-card";

const Home = async () => {
  return (
    <div className="m-8 flex w-full flex-col space-y-5 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão Geral</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>

      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayRevenueCard />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotdalSalesCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalInStockCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>

      <div className="grid min-h-0 grid-cols-3 gap-4">
        <div className="col-span-2 min-h-0">
          <Suspense
            fallback={
              <Skeleton className="bg-white p-6">
                <div className="space-y-2">
                  <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
                  <div className="h-4 w-48 rounded-md bg-gray-200" />
                </div>
              </Skeleton>
            }
          >
            <TotalLast14DaysRevenueChart />
          </Suspense>
        </div>

        <Suspense fallback={<MostSoldProductsSkeleton />}>
          <MostSoldProductCard />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
