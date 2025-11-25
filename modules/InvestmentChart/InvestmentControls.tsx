"use client";
import { Button, Select } from "amvasdev-ui";
import { Plus } from "lucide-react";
import { INVESTMENT_CONTROLS_ID } from "@/constants/sections";
import { useInvestment } from "@/contexts/InvestmentContext";
import InvestmentsList from "./InvestmentsList";

const CHART_OPTIONS = [
  {
    id: "line",
    text: "Line Chart",
  },
  {
    id: "bar",
    text: "Bar Chart",
  },
];

const InvestmentControls = () => {
  const { investments, addInvestment, chartType, setChartType } =
    useInvestment();

  const handleAddInvestment = () => {
    const nextNumber = investments.length + 1;
    addInvestment({
      label: `Investment ${nextNumber}`,
      months: 120,
      initialAmount: 10000,
      monthlyContribution: 500,
      annualInterestRate: 7,
      color: "", // Will be auto-assigned by context
    });
  };

  const handleChartTypeChange = (option: { id: string; text: string }) => {
    setChartType(option.id as "line" | "bar");
  };

  return (
    <div
      className="card bg-base-100 shadow-xl w-full"
      id={INVESTMENT_CONTROLS_ID}
    >
      <div className="card-body">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="card-title text-xl">Investments</h2>
          <div className="flex flex-col gap-2 items-end md:flex-row">
            <Select
              label="Chart Type"
              options={CHART_OPTIONS}
              value={CHART_OPTIONS.find((option) => option.id === chartType)}
              containerClassName="w-full md:w-48"
              selectClassName="w-full"
              id="chart-type-select"
              onChange={handleChartTypeChange}
            />
            <Button
              variant="primary"
              outlined
              size="md"
              onClick={handleAddInvestment}
              className="gap-2 w-full md:w-fit"
              aria-label="Add investment to chart"
            >
              <Plus className="w-4 h-4" />
              Add Investment
            </Button>
          </div>
        </div>
        <InvestmentsList />
      </div>
    </div>
  );
};

export default InvestmentControls;
