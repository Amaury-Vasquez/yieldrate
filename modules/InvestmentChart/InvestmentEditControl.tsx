import { Input, Select } from "amvasdev-ui";
import { CircleDollarSign, Tag, Timer, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { InvestmentParams, useInvestment } from "@/contexts/InvestmentContext";
import {
  validateMonths,
  validateNonEmpty,
  validateNonNegative,
} from "@/utils/validations";

const COLOR_MAP: Record<string, string> = {
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  accent: "#ec4899",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
};

interface InvestmentEditControlProps {
  onChange: (id: string, investment: Partial<InvestmentParams>) => void;
  investment: InvestmentParams;
  onValidationChange?: (id: string, isValid: boolean) => void;
}

const COLOR_OPTIONS = Object.keys(COLOR_MAP).map((colorKey) => ({
  id: colorKey,
  text: colorKey,
}));

const InvestmentEditControl = ({
  onChange,
  investment,
  onValidationChange,
}: InvestmentEditControlProps) => {
  const { clearLimitError } = useInvestment();
  const [errors, setErrors] = useState({
    label: "",
    months: "",
    initialAmount: "",
    monthlyContribution: "",
    annualInterestRate: "",
  });

  const handleLabelBlur = () => {
    const error = validateNonEmpty(investment.label);
    setErrors((prev) => ({ ...prev, label: error }));
  };

  const handleMonthsBlur = () => {
    const error = validateMonths(investment.months);
    setErrors((prev) => ({ ...prev, months: error }));
  };

  const handleInitialAmountBlur = () => {
    const error = validateNonNegative(
      investment.initialAmount,
      "Initial amount"
    );
    setErrors((prev) => ({ ...prev, initialAmount: error }));
  };

  const handleMonthlyContributionBlur = () => {
    const error = validateNonNegative(
      investment.monthlyContribution,
      "Monthly contribution"
    );
    setErrors((prev) => ({ ...prev, monthlyContribution: error }));
  };

  const handleAnnualInterestRateBlur = () => {
    const error = validateNonNegative(
      investment.annualInterestRate,
      "Annual interest rate"
    );
    setErrors((prev) => ({ ...prev, annualInterestRate: error }));
  };

  useEffect(() => {
    const isValid = Object.values(errors).every((error) => error === "");
    onValidationChange?.(investment.id, isValid);
  }, [errors, investment.id, onValidationChange]);

  return (
    <div
      className="flex flex-col border border-base-300 rounded-lg p-4 relative gap-4 w-full"
      id={`investment-form-${investment.id}`}
      onFocus={clearLimitError}
    >
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Input
          label="Investment name"
          id={`investment-name-${investment.id}`}
          value={investment.label}
          onChange={(e) =>
            onChange(investment.id, {
              label: e.currentTarget.value,
            })
          }
          onBlur={handleLabelBlur}
          leftIcon={<Tag size="14" />}
          errorMessage={errors.label}
        />
        <Input
          label="Time period (months)"
          type="number"
          id={`investment-months-${investment.id}`}
          value={investment.months}
          onChange={(e) => {
            const value = e.currentTarget.value;
            onChange(investment.id, {
              months: value ? Number(value ?? 1) : undefined,
            });
          }}
          onBlur={handleMonthsBlur}
          leftIcon={<Timer size="14" />}
          errorMessage={errors.months}
        />
        <Input
          label="Initial amount ($)"
          type="number"
          id={`investment-initial-amount-${investment.id}`}
          value={investment.initialAmount}
          onChange={(e) => {
            const value = e.currentTarget.value;
            onChange(investment.id, {
              initialAmount: value ? Number(value) : undefined,
            });
          }}
          onBlur={handleInitialAmountBlur}
          leftIcon={<CircleDollarSign size="14" />}
          errorMessage={errors.initialAmount}
        />
        <Input
          label="Monthly contribution ($)"
          type="number"
          min="1"
          id={`investment-monthly-contribution-${investment.id}`}
          value={investment.monthlyContribution}
          onChange={(e) => {
            const value = e.currentTarget.value;
            onChange(investment.id, {
              monthlyContribution: value ? Number(value) : undefined,
            });
          }}
          onBlur={handleMonthlyContributionBlur}
          leftIcon={<CircleDollarSign size="14" />}
          errorMessage={errors.monthlyContribution}
        />
        <Input
          label="Annual interest rate (%)"
          type="number"
          id={`investment-annual-interest-rate-${investment.id}`}
          value={investment.annualInterestRate}
          onChange={(e) => {
            const value = e.currentTarget.value;
            onChange(investment.id, {
              annualInterestRate: value ? Number(value) : undefined,
            });
          }}
          onBlur={handleAnnualInterestRateBlur}
          leftIcon={<TrendingUp size="14" />}
          errorMessage={errors.annualInterestRate}
        />
        <Select
          id={`investment-color-${investment.id}`}
          label="Color"
          selectClassName="w-full [&>button]:capitalize"
          optionsClassName="capitalize"
          menuClassName="capitalize"
          value={
            COLOR_OPTIONS.find(
              (option) =>
                option.id === investment.color ||
                COLOR_MAP[option.id] === investment.color
            ) || COLOR_OPTIONS[0]
          }
          onChange={(selectedOption) =>
            onChange(investment.id, {
              color: COLOR_MAP[selectedOption.id],
            })
          }
          options={COLOR_OPTIONS}
        />
      </div>
    </div>
  );
};

export default InvestmentEditControl;
