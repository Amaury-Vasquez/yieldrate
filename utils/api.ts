import type {
  InvestmentWithId,
  MultipleInvestmentResult,
} from "@/services/investment";

export const calculateInvestments = async (
  investments: InvestmentWithId[]
): Promise<MultipleInvestmentResult> => {
  const response = await fetch("/api/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(investments),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.errors?.join(", ") || "Failed to calculate investments");
  }

  return response.json();
};
