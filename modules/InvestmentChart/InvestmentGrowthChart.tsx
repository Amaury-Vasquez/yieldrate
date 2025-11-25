"use client";
import { Button } from "amvasdev-ui";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { INVESTMENT_CONTROLS_ID } from "@/constants/sections";
import { useDevice } from "@/contexts/DeviceContext";
import { useInvestment } from "@/contexts/InvestmentContext";
import { useSectionScroll } from "@/hooks/useSectionScroll";

interface DataPoint {
  month: number;
  [key: string]: number;
}

interface CustomLabelProps {
  x: number;
  y: number;
  value: number;
  index: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const InvestmentGrowthChart = () => {
  const {
    renderedInvestments,
    chartType,
    calculatedData,
    isCalculating,
    calculationError,
  } = useInvestment();
  const { isMobile, isTablet } = useDevice();
  const scrollToSection = useSectionScroll();

  const chartData = useMemo(() => {
    if (!calculatedData || renderedInvestments.length === 0) {
      return [];
    }

    // Find the maximum months across all investments
    const maxMonths = Math.max(...renderedInvestments.map((inv) => inv.months));
    const showYears = maxMonths > 36;
    const maxPeriods = showYears ? Math.ceil(maxMonths / 12) : maxMonths;

    // Build chart data from API response
    const data: DataPoint[] = [];

    for (let period = 0; period <= maxPeriods; period++) {
      const month = showYears ? period * 12 : period;
      const dataPoint: DataPoint = { month };

      renderedInvestments.forEach((investment) => {
        const investmentData = calculatedData.investments[investment.id];
        if (investmentData && investmentData.monthlyData[month]) {
          dataPoint[investment.id] = investmentData.monthlyData[month].value;
        } else if (investmentData) {
          // Use last available value if month exceeds investment period
          const lastMonth = Math.min(
            month,
            investmentData.monthlyData.length - 1
          );
          dataPoint[investment.id] =
            investmentData.monthlyData[lastMonth]?.value || 0;
        }
      });

      data.push(dataPoint);
    }

    return data;
  }, [renderedInvestments, calculatedData]);

  const maxMonths = useMemo(
    () => Math.max(...renderedInvestments.map((inv) => inv.months)),
    [renderedInvestments]
  );

  const showYears = maxMonths > 36;
  const maxPeriods = showYears ? Math.ceil(maxMonths / 12) : maxMonths;

  // Calculate tick interval based on time period and device
  const getTickInterval = () => {
    const multiplier = isMobile ? 2 : 1; // Show fewer ticks on mobile

    if (showYears) {
      const years = maxPeriods;
      if (years > 20) return 5 * multiplier;
      if (years > 10) return 2 * multiplier;
      return Math.max(1, 1 * multiplier);
    }
    if (maxMonths < 5) return 1;
    if (maxMonths < 10) return 2 * multiplier;
    if (maxMonths < 20) return 4 * multiplier;
    return 6 * multiplier;
  };

  const tickInterval = getTickInterval();

  // Format X-axis tick
  const formatXAxis = (value: number) => {
    if (showYears) {
      const year = Math.floor(value / 12);
      return `${year}`;
    }
    return `${value}`;
  };

  // Custom label formatter for values
  const renderCustomLabel = (props: CustomLabelProps) => {
    // Hide all value labels on mobile to prevent overlap
    if (isMobile) return null;

    const { x, y, value, index } = props;
    const month = chartData[index]?.month || 0;

    // Determine if we should show this label based on interval
    const labelInterval = isTablet ? tickInterval * 2 : tickInterval;
    const shouldShowLabel = showYears
      ? month % (labelInterval * 12) === 0
      : month % labelInterval === 0;

    if (!shouldShowLabel) return null;

    return (
      <text
        x={x}
        y={y - 15}
        fill="currentColor"
        textAnchor="start"
        fontSize={isTablet ? 10 : 12}
        fontWeight="600"
      >
        {formatCurrency(value)}
      </text>
    );
  };

  if (isCalculating) {
    return (
      <div className="w-full h-72 md:h-80 lg:h-96 bg-base-200 rounded-lg flex items-center justify-center">
        <p className="text-base-content/50 text-center">
          Calculating investments...
          <br />
          <span className="text-sm">Please wait</span>
        </p>
      </div>
    );
  }

  if (calculationError) {
    return (
      <div className="w-full h-72 md:h-80 lg:h-96 bg-error/10 rounded-lg flex items-center justify-center">
        <p className="text-error text-center">
          Error calculating investments
          <br />
          <span className="text-sm">{calculationError}</span>
        </p>
      </div>
    );
  }

  if (renderedInvestments.length === 0 || !calculatedData) {
    return (
      <div className="w-full h-72 md:h-80 lg:h-96 bg-base-200 rounded-lg flex items-center justify-center flex-col gap-6">
        <p className="text-base-content/50 text-center h-fit flex-none">
          No investments to display
          <br />
          <span className="text-sm">
            Add an investment and click <br />
            &quot;Show Yield Rate&quot;
          </span>
        </p>
        <Button
          variant="primary"
          size="md"
          onClick={() => scrollToSection(INVESTMENT_CONTROLS_ID)}
          aria-label="Add investment to chart"
        >
          <Plus className="w-4 h-4" />
          Add Investment
        </Button>
      </div>
    );
  }

  const commonAxisProps = {
    xAxis: {
      dataKey: "month",
      tickFormatter: formatXAxis,
      interval: tickInterval - 1,
      tick: { fontSize: isMobile ? 10 : isTablet ? 11 : 12 },
      label: {
        value: showYears ? "Years" : "Months",
        position: "insideBottom" as const,
        offset: -5,
        fontSize: isMobile ? 11 : isTablet ? 12 : 14,
        fontWeight: 500,
        fill: "oklch(20% 0.05 240)",
      },
    },
    yAxis: {
      tickFormatter: formatCurrency,
      tick: { fontSize: isMobile ? 9 : isTablet ? 11 : 12 },
      label: isMobile
        ? undefined // Hide Y-axis label on mobile to save space
        : {
            value: "Value ($)",
            angle: -90,
            position: "left" as const,
            offset: isTablet ? 20 : 30,
            fontSize: isTablet ? 12 : 14,
            fontWeight: 500,
            fill: "oklch(20% 0.05 240)",
          },
    },
    tooltip: {
      formatter: (value: number) => formatCurrency(value),
      labelFormatter: (label: string | number) => `Month ${label}`,
      contentStyle: {
        backgroundColor: "oklch(95% 0.03 240)",
        borderRadius: "0.5rem",
        wrapperStyle: {
          background: "#000",
        },
      },
    },
  };

  // Responsive chart margins - minimize left space on mobile
  const chartMargins = isMobile
    ? { top: 5, right: 10, left: 15, bottom: 5 }
    : isTablet
    ? { top: 5, right: 20, left: 50, bottom: 5 }
    : { top: 5, right: 30, left: 70, bottom: 5 };

  return (
    <div className="w-full h-72 md:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "line" ? (
          <LineChart data={chartData} margin={chartMargins}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis {...commonAxisProps.xAxis} />
            <YAxis {...commonAxisProps.yAxis} />
            <Tooltip {...commonAxisProps.tooltip} />
            <Legend
              wrapperStyle={{ bottom: -10 }}
              iconSize={isMobile ? 10 : 14}
            />
            {renderedInvestments.map((investment) => (
              <Line
                key={investment.id}
                type="monotone"
                dataKey={investment.id}
                name={investment.label}
                stroke={investment.color}
                strokeWidth={isMobile ? 1.5 : 2}
                dot={false}
                activeDot={{ r: isMobile ? 4 : 6 }}
              >
                {/* @ts-expect-error Type mismatch is intentional for custom label */}
                <LabelList content={renderCustomLabel} />
              </Line>
            ))}
          </LineChart>
        ) : (
          <BarChart data={chartData} margin={chartMargins}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis {...commonAxisProps.xAxis} />
            <YAxis {...commonAxisProps.yAxis} />
            <Tooltip {...commonAxisProps.tooltip} />
            <Legend
              wrapperStyle={{ bottom: -10 }}
              iconSize={isMobile ? 10 : 14}
            />
            {renderedInvestments.map((investment) => (
              <Bar
                key={investment.id}
                dataKey={investment.id}
                name={investment.label}
                fill={investment.color}
              >
                {/* @ts-expect-error Type mismatch is intentional for custom label */}
                <LabelList content={renderCustomLabel} position="top" />
              </Bar>
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentGrowthChart;
