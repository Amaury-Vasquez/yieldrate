"use client";
import { InvestmentProvider } from "@/contexts/InvestmentContext";
import ChartContainer from "./ChartContainer";
import InvestmentControls from "./InvestmentControls";

const InvestmentChart = () => (
  <InvestmentProvider>
    <div className="flex flex-col gap-6 w-full">
      <ChartContainer />
      <InvestmentControls />
    </div>
  </InvestmentProvider>
);

export default InvestmentChart;
