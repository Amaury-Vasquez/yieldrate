import clsx, { ClassValue } from "clsx";
import InvestmentGrowthChart from "./InvestmentGrowthChart";

interface ChartContainerProps {
  className?: ClassValue;
}

const ChartContainer = ({ className }: ChartContainerProps) => (
  <div className={clsx("card bg-base-100 shadow-xl w-full", className)}>
    <div className="card-body justify-center gap-8">
      <h2 className="card-title text-xl md:text-2xl text-center block">
        Investment Growth Over Time
      </h2>
      <InvestmentGrowthChart />
    </div>
  </div>
);

export default ChartContainer;
