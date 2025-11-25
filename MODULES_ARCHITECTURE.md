# Modules Architecture

This document outlines the module-based architecture for the YieldRate investment visualization application.

## Overview

To support proper SEO with Next.js App Router while maintaining client-side interactivity for investment charts and calculations, we separate page logic into modules under `/modules` directory.

## Architecture

```
app/
  portfolio/
    [id]/
      page.tsx              # Server component - exports metadata, renders module
  analysis/
    comparison/
      page.tsx              # Server component - exports metadata, renders module

modules/
  PortfolioView/
    index.tsx              # Main client component with portfolio view
    PerformanceChart.tsx   # Portfolio-specific chart component
    AssetAllocation.tsx    # Portfolio-specific allocation view
    ReturnsTable.tsx       # Portfolio-specific returns table
    ...                    # Other portfolio-specific components

  AnalysisComparison/
    index.tsx              # Main client component with comparison view
    ComparisonChart.tsx    # Comparison-specific chart
    MetricsTable.tsx       # Comparison-specific metrics
    ...

components/visualization/   # Shared visualization components
  ChartContainer.tsx       # Reusable chart wrapper with controls
  TimeSeriesChart.tsx      # Reusable time series line/area chart
  AllocationPieChart.tsx   # Reusable pie/donut chart for allocations
  MetricsCard.tsx          # Reusable card for displaying key metrics
  DataTable.tsx            # Reusable data table with sorting/filtering
  DateRangePicker.tsx      # Reusable date range selector
  LegendPanel.tsx          # Reusable chart legend
```

## Pattern

### 1. Page File (Server Component)
**Location:** `app/[category]/[feature]/page.tsx`

```tsx
import type { Metadata } from "next";
import PortfolioView from "@/modules/PortfolioView";
import { FEATURES_DATA } from "@/data/features";

const featureData = FEATURES_DATA.portfolioView;

export const metadata: Metadata = {
  title: `${featureData.name} | YieldRate`,
  description: featureData.description,
};

export default function PortfolioViewPage() {
  return <PortfolioView />;
}
```

### 2. Module Index (Client Component)
**Location:** `modules/PortfolioView/index.tsx`

```tsx
"use client";
import { useState } from "react";
import { FEATURES_DATA } from "@/data/features";
import PageHeader from "@/components/visualization/PageHeader";
import DateRangePicker from "@/components/visualization/DateRangePicker";
import MetricsCard from "@/components/visualization/MetricsCard";
import PerformanceChart from "./PerformanceChart";
import AssetAllocation from "./AssetAllocation";
import ReturnsTable from "./ReturnsTable";

const featureData = FEATURES_DATA.portfolioView;

const PortfolioView = () => {
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <PageHeader
        title={featureData.name}
        description={featureData.description}
      />

      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricsCard
          title="Total Return"
          value="12.5%"
          trend="up"
        />
        {/* More metrics */}
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Performance Over Time</h2>
        <PerformanceChart dateRange={dateRange} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AssetAllocation />
        <ReturnsTable />
      </section>
    </div>
  );
};

export default PortfolioView;
```

### 3. Page-Specific Components
**Location:** `modules/PortfolioView/PerformanceChart.tsx`

```tsx
import { TimeSeriesChart } from "@/components/visualization/TimeSeriesChart";
import ChartContainer from "@/components/visualization/ChartContainer";

interface PerformanceChartProps {
  dateRange: { start: Date | null; end: Date | null };
}

const PerformanceChart = ({ dateRange }: PerformanceChartProps) => {
  // Fetch or calculate portfolio performance data
  const data = [
    { date: "2024-01", value: 10000 },
    { date: "2024-02", value: 10500 },
    // ... more data points
  ];

  return (
    <ChartContainer
      title="Portfolio Value"
      controls={["export", "fullscreen"]}
    >
      <TimeSeriesChart
        data={data}
        xKey="date"
        yKey="value"
        lineColor="hsl(var(--primary))"
      />
    </ChartContainer>
  );
};

export default PerformanceChart;
```

### 4. Shared Visualization Components
**Location:** `components/visualization/MetricsCard.tsx`

```tsx
interface MetricsCardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
}

const MetricsCard = ({ title, value, trend, subtitle }: MetricsCardProps) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h3 className="card-title text-sm font-normal opacity-70">{title}</h3>
      <p className="text-3xl font-bold">
        {value}
        {trend && (
          <span className={`ml-2 text-sm ${
            trend === "up" ? "text-success" :
            trend === "down" ? "text-error" :
            "text-base-content"
          }`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </span>
        )}
      </p>
      {subtitle && <p className="text-sm opacity-60">{subtitle}</p>}
    </div>
  </div>
);

export default MetricsCard;
```

## Benefits

1. **SEO-Friendly:** Server components can export metadata for investment strategies/views
2. **Clean Separation:** Client logic for charts and calculations separated from page routing
3. **Reusability:** Shared visualization components reduce duplication across views
4. **Maintainability:** Investment-specific components are organized by module
5. **Performance:** Server components render on server, client components only where needed for interactivity

## Naming Convention

- **Modules:** `CamelCase` (e.g., `PortfolioView`, `AnalysisComparison`)
- **Module exports:** Same as module name (e.g., `PortfolioView`, `AnalysisComparison`)
- **Page-specific components:** CamelCase descriptive names (e.g., `PerformanceChart`, `AssetAllocation`)
- **Shared components:** CamelCase generic names (e.g., `MetricsCard`, `TimeSeriesChart`)

## Module Categories

1. **Portfolio Views:** `modules/PortfolioView/`, `modules/PortfolioSummary/`
2. **Analysis Pages:** `modules/AnalysisComparison/`, `modules/AnalysisCorrelation/`
3. **Calculator Pages:** `modules/CompoundCalculator/`, `modules/RetirementCalculator/`
4. **Report Pages:** `modules/PerformanceReport/`, `modules/TaxReport/`
5. **Dashboard Pages:** `modules/MainDashboard/`, `modules/InsightsDashboard/`
6. **Other Pages:** `modules/About/`, `modules/Settings/`

## Data Flow Pattern

For investment data:

```tsx
// 1. Data fetching/calculation at module level
const PortfolioView = () => {
  const { data, loading } = usePortfolioData(portfolioId);

  // 2. Pass processed data to child components
  return (
    <PerformanceChart data={data.performance} />
  );
};

// 3. Child components focus on visualization only
const PerformanceChart = ({ data }) => {
  return <TimeSeriesChart data={data} />;
};
```

## State Management Guidelines

- **Local state:** Use for UI interactions (date ranges, chart zoom, filters)
- **Module state:** Use for feature-specific data (portfolio data, calculations)
- **Global state:** Use for user preferences, authentication, cross-module data

## Visualization Component Types

1. **Chart Components:** Time series, allocation, comparison charts
2. **Data Components:** Tables, grids, metric cards
3. **Control Components:** Date pickers, filters, export buttons
4. **Layout Components:** Chart containers, panels, sections
