"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { MultipleInvestmentResult } from "@/services/investment";
import { calculateInvestments } from "@/utils/api";

export type ChartType = "line" | "bar";

export interface InvestmentParams {
  id: string;
  label: string;
  months: number;
  initialAmount: number;
  monthlyContribution: number;
  annualInterestRate: number;
  color: string;
}

interface InvestmentContextValue {
  investments: InvestmentParams[];
  renderedInvestments: InvestmentParams[];
  calculatedData: MultipleInvestmentResult | null;
  isCalculating: boolean;
  calculationError: string | null;
  maxInvestments: number;
  isLimitReached: boolean;
  limitError: string | null;
  focusedInvestmentId: string | null;
  chartType: ChartType;
  clearLimitError: () => void;
  addInvestment: (investment: Omit<InvestmentParams, "id">) => boolean;
  updateInvestment: (id: string, investment: Partial<InvestmentParams>) => void;
  removeInvestment: (id: string) => void;
  setFocusedInvestment: (id: string | null) => void;
  handleDeleteInvestment: () => void;
  drawChart: () => Promise<void>;
  clearInvestments: () => void;
  setChartType: (type: ChartType) => void;
}

const InvestmentContext = createContext<InvestmentContextValue | undefined>(
  undefined
);

const MAX_INVESTMENTS = 3;

const COLOR_RECORD: Record<string, string> = {
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  accent: "#ec4899",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
};

export const DEFAULT_COLORS = Object.keys(COLOR_RECORD);

const DEFAULT_INVESTMENT: Omit<InvestmentParams, "id"> = {
  label: "Investment 1",
  months: 120,
  initialAmount: 10000,
  monthlyContribution: 500,
  annualInterestRate: 7,
  color: COLOR_RECORD.primary,
};

const generateInvestmentId = (isInitialInvestment = false) => {
  if (isInitialInvestment) {
    return "investment-initial";
  }
  return crypto.randomUUID();
};

const createInitialInvestment = (): InvestmentParams[] => {
  const initialInvestment = {
    ...DEFAULT_INVESTMENT,
    id: generateInvestmentId(true),
  };
  return [initialInvestment];
};

export const InvestmentProvider = ({ children }: { children: ReactNode }) => {
  const [investments, setInvestments] = useState<InvestmentParams[]>(
    createInitialInvestment
  );
  const [renderedInvestments, setRenderedInvestments] = useState<
    InvestmentParams[]
  >(createInitialInvestment);
  const [calculatedData, setCalculatedData] =
    useState<MultipleInvestmentResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [limitError, setLimitError] = useState<string | null>(null);
  const [focusedInvestmentId, setFocusedInvestmentId] = useState<string | null>(
    () => investments[0]?.id ?? null
  );
  const [chartType, setChartTypeState] = useState<ChartType>("bar");

  const addInvestment = useCallback(
    (investment: Omit<InvestmentParams, "id">) => {
      if (investments.length >= MAX_INVESTMENTS) {
        setLimitError(
          `Maximum of ${MAX_INVESTMENTS} investments reached. Remove an investment to add a new one.`
        );
        return false;
      }

      const id = generateInvestmentId();
      const colorIndex = investments.length % DEFAULT_COLORS.length;
      const color =
        investment.color || COLOR_RECORD[DEFAULT_COLORS[colorIndex]];

      setInvestments((prev) => [
        ...prev,
        {
          ...investment,
          id,
          color,
        },
      ]);
      setLimitError(null);
      setFocusedInvestmentId(id);
      return true;
    },
    [investments.length]
  );

  const clearLimitError = useCallback(() => {
    setLimitError(null);
  }, []);

  const setFocusedInvestment = useCallback((id: string | null) => {
    setFocusedInvestmentId(id);
  }, []);

  const updateInvestment = useCallback(
    (id: string, investment: Partial<InvestmentParams>) => {
      setInvestments((prev) =>
        prev.map((inv) => (inv.id === id ? { ...inv, ...investment } : inv))
      );
    },
    []
  );

  const removeInvestment = useCallback((id: string) => {
    setInvestments((prev) => prev.filter((inv) => inv.id !== id));
  }, []);

  const handleDeleteInvestment = useCallback(() => {
    if (!focusedInvestmentId) return;

    const currentIndex = investments.findIndex(
      (inv) => inv.id === focusedInvestmentId
    );
    if (currentIndex === -1) return;

    // Determine next focused investment
    const nextInvestment =
      investments[currentIndex + 1] || investments[currentIndex - 1] || null;

    setFocusedInvestmentId(nextInvestment?.id ?? null);
    removeInvestment(focusedInvestmentId);

    // Update chart after removal
    const updatedInvestments = investments.filter(
      (inv) => inv.id !== focusedInvestmentId
    );
    setRenderedInvestments(updatedInvestments);
  }, [focusedInvestmentId, investments, removeInvestment]);

  const drawChart = useCallback(async () => {
    setRenderedInvestments([...investments]);
    setIsCalculating(true);
    setCalculationError(null);

    try {
      const investmentsToCalculate = investments.map((inv) => ({
        id: inv.id,
        months: inv.months,
        initialAmount: inv.initialAmount,
        monthlyContribution: inv.monthlyContribution,
        annualInterestRate: inv.annualInterestRate,
      }));

      const result = await calculateInvestments(investmentsToCalculate);
      setCalculatedData(result);
    } catch (error) {
      setCalculationError(
        error instanceof Error
          ? error.message
          : "Failed to calculate investments"
      );
      setCalculatedData(null);
    } finally {
      setIsCalculating(false);
    }
  }, [investments]);

  const clearInvestments = useCallback(() => {
    setInvestments([]);
    setFocusedInvestmentId(null);
  }, []);

  const setChartType = useCallback(
    (type: ChartType) => {
      setChartTypeState(type);
      drawChart();
    },
    [drawChart]
  );

  const isLimitReached = useMemo(
    () => investments.length >= MAX_INVESTMENTS,
    [investments.length]
  );

  const contextValue = useMemo(
    () => ({
      investments,
      renderedInvestments,
      calculatedData,
      isCalculating,
      calculationError,
      maxInvestments: MAX_INVESTMENTS,
      isLimitReached,
      limitError,
      focusedInvestmentId,
      chartType,
      clearLimitError,
      addInvestment,
      updateInvestment,
      removeInvestment,
      setFocusedInvestment,
      handleDeleteInvestment,
      drawChart,
      clearInvestments,
      setChartType,
    }),
    [
      investments,
      renderedInvestments,
      calculatedData,
      isCalculating,
      calculationError,
      isLimitReached,
      limitError,
      focusedInvestmentId,
      chartType,
      clearLimitError,
      addInvestment,
      updateInvestment,
      removeInvestment,
      setFocusedInvestment,
      handleDeleteInvestment,
      drawChart,
      clearInvestments,
      setChartType,
    ]
  );

  return (
    <InvestmentContext.Provider value={contextValue}>
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (context === undefined) {
    throw new Error("useInvestment must be used within an InvestmentProvider");
  }
  return context;
};
