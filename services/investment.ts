export interface InvestmentParams {
  months: number;
  initialAmount: number;
  monthlyContribution: number;
  annualInterestRate: number;
}

export interface MonthlyData {
  month: number;
  value: number;
  monthlyInterest: number;
  contribution: number;
}

export interface InvestmentResult {
  monthlyData: MonthlyData[];
  totalValue: number;
  normalReturn: number;
  totalGain: number;
  totalContributions: number;
  totalInterest: number;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
  params?: InvestmentParams;
}

export function validateAndParseParams(
  months: unknown,
  initialAmount: unknown,
  monthlyContribution: unknown,
  annualInterestRate: unknown
): ValidationResult {
  const parsedMonths = Number(months);
  const parsedInitialAmount = Number(initialAmount);
  const parsedMonthlyContribution = Number(monthlyContribution);
  const parsedAnnualInterestRate = Number(annualInterestRate);

  if (
    Number.isNaN(parsedMonths) ||
    Number.isNaN(parsedInitialAmount) ||
    Number.isNaN(parsedMonthlyContribution) ||
    Number.isNaN(parsedAnnualInterestRate)
  ) {
    return {
      isValid: false,
      error: "All parameters must be valid numbers",
    };
  }

  if (parsedMonths <= 0) {
    return {
      isValid: false,
      error: "Months must be greater than 0",
    };
  }

  if (parsedInitialAmount < 0) {
    return {
      isValid: false,
      error: "Initial amount cannot be negative",
    };
  }

  if (parsedMonthlyContribution < 0) {
    return {
      isValid: false,
      error: "Monthly contribution cannot be negative",
    };
  }

  if (parsedAnnualInterestRate < 0) {
    return {
      isValid: false,
      error: "Annual interest rate cannot be negative",
    };
  }

  if (parsedAnnualInterestRate > 100) {
    return {
      isValid: false,
      error: "Annual interest rate cannot exceed 100%",
    };
  }

  return {
    isValid: true,
    params: {
      months: parsedMonths,
      initialAmount: parsedInitialAmount,
      monthlyContribution: parsedMonthlyContribution,
      annualInterestRate: parsedAnnualInterestRate,
    },
  };
}

export function getMonthlyInterestRate(annualInterestRate: number) {
  return annualInterestRate / 100 / 12;
}

export function calculateInvestment(
  params: InvestmentParams
): InvestmentResult {
  const { months, initialAmount, monthlyContribution, annualInterestRate } =
    params;

  let total = initialAmount;
  const monthlyInterestRate = getMonthlyInterestRate(annualInterestRate);

  const monthlyData: MonthlyData[] = [];

  for (let i = 0; i < months; i++) {
    const monthlyInterest = i > 0 ? total * monthlyInterestRate : 0;
    total += monthlyContribution + monthlyInterest;

    monthlyData.push({
      month: i + 1,
      value: total,
      monthlyInterest,
      contribution: monthlyContribution,
    });
  }

  const totalContributions = initialAmount + months * monthlyContribution;
  const totalInterest = total - totalContributions;
  const normalReturn = initialAmount + months * monthlyContribution;

  return {
    monthlyData,
    totalValue: total,
    normalReturn,
    totalGain: total - normalReturn,
    totalContributions,
    totalInterest,
  };
}

export interface InvestmentWithId extends InvestmentParams {
  id: string;
}

export interface MultipleInvestmentResult {
  investments: Record<string, InvestmentResult>;
}

export function calculateMultipleInvestments(
  investments: InvestmentWithId[]
): MultipleInvestmentResult {
  const results: Record<string, InvestmentResult> = {};

  investments.forEach((investment) => {
    const { id, ...params } = investment;
    results[id] = calculateInvestment(params);
  });

  return { investments: results };
}
