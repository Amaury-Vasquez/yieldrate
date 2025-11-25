# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 investment visualization application called **YieldRate**. The project focuses on generating graphic views of investments to explore how investments behave over time. The project uses:

- **Next.js 16** with App Router architecture
- **React 19** (latest version)
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **amvasdev-ui** component library for UI components

## Key Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Project Structure

This is a Next.js App Router project with the following architecture:

- **`app/`** - Next.js App Router directory

  - `layout.tsx` - Root layout with Geist Sans and Geist Mono fonts
  - `page.tsx` - Homepage/dashboard
  - `globals.css` - Global styles with Tailwind CSS imports
  - `portfolio/[id]/page.tsx` - Portfolio detail pages
  - `analysis/*/page.tsx` - Analysis feature pages

- **`modules/`** - Feature modules for investment visualization

  - `PortfolioView/` - Portfolio visualization module
  - `AnalysisComparison/` - Investment comparison module
  - `CompoundCalculator/` - Compound interest calculator
  - `MainDashboard/` - Main dashboard view

- **`components/visualization/`** - Shared visualization components

  - `ChartContainer.tsx` - Reusable chart wrapper
  - `TimeSeriesChart.tsx` - Time series charts
  - `MetricsCard.tsx` - Key metrics display
  - `DateRangePicker.tsx` - Date range selection

- **`components/ui/`** - UI components from amvasdev-ui
- **`data/`** - Static data and configuration
- **`lib/`** - Utility functions and helpers
- **`hooks/`** - Custom React hooks

- **`next.config.js`** - Next.js configuration

- **`COMPONENT_USAGE_GUIDE.md`** - **CRITICAL CONTEXT FILE**
  - This file contains comprehensive documentation for the `amvasdev-ui` library
  - Reference this file for all component props, hooks, and utilities
  - Contains examples for: Button, Input, Modal, Select, Textarea, Card, Badge, Alert, Progress, Tabs, Accordion, Toast, Dropdown, Tooltip, and more
  - Includes hooks documentation: `useNotification`, `useForm`, `useLocalStorage`, `useToggle`, etc.
  - Always check this file before implementing UI components

## Important Configuration

- **Path aliases**: `@/*` maps to the root directory (`tsconfig.json`)
- **TypeScript target**: ES2017 with strict mode enabled
- **Fonts**: Uses Geist Sans and Geist Mono from Google Fonts
- **Styling**: Tailwind CSS v4 with dark mode support via `prefers-color-scheme`

## Coding Standards

### Arrow Function Body Style

**IMPORTANT**: Always use implicit returns for arrow functions when there's no additional logic:

**✅ Correct:**

```tsx
const Component = () => <div>Content</div>;

const items = data.map((item) => item.name);
```

**❌ Incorrect:**

```tsx
const Component = () => {
  return <div>Content</div>;
};

const items = data.map((item) => {
  return item.name;
});
```

**When to use braces:**

- When you need multiple statements or logic before the return
- When you need variable declarations
- When you have conditional logic

**ESLint Rule:** This is enforced by the `arrow-body-style: ["error", "as-needed"]` rule in `eslint.config.mjs`

### Links vs Buttons

**CRITICAL: Never use buttons as links.** Always use proper semantic HTML elements:

**✅ Correct:**

```tsx
// For navigation, use Link or anchor tags
import Link from "next/link";

<Link href="/portfolio/123">View Portfolio</Link>
<a href="/analysis">Analysis</a>

// For links styled as buttons, use Button component with asChild from amvasdev-ui
import { Button } from "amvasdev-ui";
import Link from "next/link";

<Button variant="primary" size="lg" asChild>
  <Link href="/get-started">Get Started</Link>
</Button>
```

**❌ Incorrect:**

```tsx
// Never use buttons with router.push or onClick navigation
import { useRouter } from "next/navigation";

const router = useRouter();

<button onClick={() => router.push("/portfolio")}>View Portfolio</button>
```

**Why this matters:**

- **Accessibility**: Screen readers understand links vs buttons
- **SEO**: Search engines can crawl and index link relationships
- **User Experience**: Right-click → "Open in new tab" works properly
- **Keyboard Navigation**: Proper tab order and Enter/Space key behavior
- **Semantic HTML**: Buttons are for actions, links are for navigation

**When to use each:**

- **`<Link>` or `<a>`**: Basic navigation to different pages/routes
- **`<Button asChild><Link>...`**: Navigation that should look like a button (CTAs, primary actions)
- **`<button>`**: Triggering actions (submit forms, toggle modals, open dropdowns, etc.)

### Import Organization

Imports are automatically sorted by ESLint in this order:

1. Node.js built-in modules
2. External packages (node_modules)
3. Internal aliased imports (@/)
4. Relative imports (parent/sibling)
5. Index imports

All groups are sorted alphabetically and should have no blank lines between them.

### Naming Conventions

**Static Constants**: Use SCREAMING_SNAKE_CASE for module-level constants that are never reassigned:

**✅ Correct:**

```tsx
export const INVESTMENT_TYPES: Record<string, InvestmentType> = { ... };
export const API_BASE_URL = "https://api.yieldrate.com";
export const DEFAULT_CHART_COLORS = ["#3b82f6", "#10b981", "#f59e0b"];
export const MAX_PORTFOLIO_ITEMS = 100;
```

**❌ Incorrect:**

```tsx
export const investmentTypes: Record<string, InvestmentType> = { ... };
export const apiBaseUrl = "https://api.yieldrate.com";
export const defaultChartColors = ["#3b82f6", "#10b981", "#f59e0b"];
```

**Why this matters:**

- Immediately identifies values that should never change
- Distinguishes static data from reactive state or mutable variables
- Follows common JavaScript/TypeScript conventions for constants

**When to use:**

- Static configuration objects that never change
- Hardcoded lookup tables or data structures
- API URLs, magic numbers, or other fixed values
- Chart configurations, color palettes, default settings

## Development Notes

### Working with amvasdev-ui Library

When using `amvasdev-ui` components in YieldRate:

1. Always import the CSS: `import "amvasdev-ui/dist/index.css";` (typically in root layout)
2. Reference `COMPONENT_USAGE_GUIDE.md` for accurate component APIs and props
3. Components support variants, sizes, custom styling, and theme customization
4. The library uses a design system with consistent color variants: `base`, `neutral`, `primary`, `secondary`, `accent`, `info`, `success`, `warning`, `error`, `ghost`, `link`

**Common UI Components:**

```tsx
import { Button, Card, Input, Select, Modal, Badge, Alert } from "amvasdev-ui";
```

### Next.js 16 Specifics

- Uses React 19 with the new compiler runtime
- Server Components by default (add `"use client"` directive when needed)
- Automatic font optimization with `next/font`
- Image optimization with `next/image` component

### Styling Patterns

- Tailwind CSS v4 with inline theme configuration in `globals.css`
- CSS variables for theming: `--background`, `--foreground`, `--font-sans`, `--font-mono`
- Dark mode handled automatically via `prefers-color-scheme`

## Code Formatting Standards

### Template Literal Indentation

**CRITICAL**: When writing code examples in template literals, add 2 spaces to each continuation line to ensure proper indentation display:

**✅ Correct:**

```tsx
<code>
  {`const portfolio = {
  name: "My Portfolio",
  value: 10000,
  returns: 12.5
};`}
</code>
```

**❌ Incorrect:**

```tsx
<code>
  {`const portfolio = {
name: "My Portfolio",
value: 10000,
returns: 12.5
};`}
</code>
```

**Why this matters:**

- Template literals don't preserve source code indentation
- The rendered output will show no indentation without explicit spacing
- Always add 2 spaces at the start of each line after the first one

### Conditional Rendering with Nullish Coalescing

**Prefer nullish coalescing over logical AND** for checking array/object properties:

**✅ Correct:**

```tsx
{
  (portfolio.assets?.length ?? 0) > 0 ? <AssetList assets={portfolio.assets} /> : null;
}
```

**❌ Incorrect:**

```tsx
{
  portfolio.assets?.length && <AssetList assets={portfolio.assets} />;
}
```

## Project Architecture

### Module-Based Architecture for SEO

**CRITICAL**: All feature pages use a module-based architecture to support SEO metadata while maintaining client-side interactivity for charts and calculations.

**Structure:**

```
app/
  portfolio/
    [id]/
      page.tsx              # Server component - exports metadata, renders module

modules/
  PortfolioView/
    index.tsx              # Main client component with portfolio view
    PerformanceChart.tsx   # Portfolio-specific chart component
    AssetAllocation.tsx    # Portfolio-specific allocation view
    ...

components/visualization/   # Shared visualization components
  ChartContainer.tsx
  TimeSeriesChart.tsx
  MetricsCard.tsx
  DateRangePicker.tsx
```

**Page Pattern (app/.../page.tsx):**

```tsx
import type { Metadata } from "next";
import PortfolioView from "@/modules/PortfolioView";

export const metadata: Metadata = {
  title: "Portfolio View | YieldRate",
  description: "Visualize and analyze your investment portfolio performance over time",
};

export default function PortfolioViewPage() {
  return <PortfolioView />;
}
```

**Module Index Pattern (modules/PortfolioView/index.tsx):**

```tsx
"use client";
import { useState } from "react";
import DateRangePicker from "@/components/visualization/DateRangePicker";
import MetricsCard from "@/components/visualization/MetricsCard";
import PerformanceChart from "./PerformanceChart";
import AssetAllocation from "./AssetAllocation";

const PortfolioView = () => {
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold">Portfolio View</h1>

      <DateRangePicker value={dateRange} onChange={setDateRange} />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricsCard title="Total Return" value="12.5%" trend="up" />
        {/* More metrics */}
      </section>

      <PerformanceChart dateRange={dateRange} />
      <AssetAllocation />
    </div>
  );
};

export default PortfolioView;
```

**Page-Specific Components (modules/PortfolioView/PerformanceChart.tsx):**

```tsx
import { TimeSeriesChart } from "@/components/visualization/TimeSeriesChart";
import ChartContainer from "@/components/visualization/ChartContainer";

interface PerformanceChartProps {
  dateRange: { start: Date | null; end: Date | null };
}

const PerformanceChart = ({ dateRange }: PerformanceChartProps) => {
  const data = [
    { date: "2024-01", value: 10000 },
    { date: "2024-02", value: 10500 },
    // ... more data points
  ];

  return (
    <ChartContainer title="Portfolio Value" controls={["export", "fullscreen"]}>
      <TimeSeriesChart data={data} xKey="date" yKey="value" lineColor="hsl(var(--primary))" />
    </ChartContainer>
  );
};

export default PerformanceChart;
```

**Naming Conventions:**

- **Modules:** CamelCase (e.g., `PortfolioView`, `AnalysisComparison`)
- **Module exports:** Same as folder name (e.g., `PortfolioView`)
- **Page-specific components:** Descriptive names (e.g., `PerformanceChart`, `AssetAllocation`)

**Shared Visualization Components:**

- `ChartContainer` - Wrapper for charts with controls
- `TimeSeriesChart` - Line/area charts for time-based data
- `MetricsCard` - Display key metrics with trends
- `DateRangePicker` - Date range selection
- `AllocationPieChart` - Pie/donut charts for allocations
- `DataTable` - Tables with sorting/filtering

**"use client" Directive:**

- Add to module index files (they manage state and interactivity)
- Add to page-specific components that use client-side features (state, effects, event handlers)
- NOT needed in page.tsx (server component for metadata)
- NOT needed in pure presentational components

**Rule:** Only add "use client" to components that use React hooks, browser APIs, or event handlers.

### Data Flow Pattern

For investment data:

```tsx
// 1. Data fetching/calculation at module level
const PortfolioView = () => {
  const { data, loading } = usePortfolioData(portfolioId);

  if (loading) return <LoadingSpinner />;

  // 2. Pass processed data to child components
  return <PerformanceChart data={data.performance} />;
};

// 3. Child components focus on visualization only
const PerformanceChart = ({ data }) => <TimeSeriesChart data={data} />;
```

### State Management Guidelines

- **Local state:** Use for UI interactions (date ranges, chart zoom, filters)
- **Module state:** Use for feature-specific data (portfolio data, calculations)
- **Global state:** Use for user preferences, authentication, cross-module data

## Common Patterns

### Investment Metrics Display

```tsx
const METRIC_CARDS = [
  { title: "Total Value", value: "$125,450", trend: "up" as const },
  { title: "Total Return", value: "12.5%", trend: "up" as const },
  { title: "YTD Return", value: "8.2%", trend: "up" as const },
  { title: "Risk Score", value: "6/10", trend: "neutral" as const },
];

export default function PortfolioMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {METRIC_CARDS.map((metric) => (
        <MetricsCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
```

### Chart Configuration

```tsx
const CHART_CONFIG = {
  colors: {
    primary: "hsl(var(--primary))",
    success: "hsl(var(--success))",
    warning: "hsl(var(--warning))",
  },
  defaultTimeRange: "1Y",
  animationDuration: 300,
};

const PerformanceChart = ({ data }: ChartProps) => (
  <TimeSeriesChart
    data={data}
    lineColor={CHART_CONFIG.colors.primary}
    animationDuration={CHART_CONFIG.animationDuration}
  />
);
```

### Date Range Selection

```tsx
"use client";
import { useState } from "react";
import DateRangePicker from "@/components/visualization/DateRangePicker";

const DEFAULT_DATE_RANGE = {
  start: new Date(new Date().getFullYear() - 1, 0, 1),
  end: new Date(),
};

export default function AnalysisPage() {
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);

  return <DateRangePicker value={dateRange} onChange={setDateRange} />;
}
```

### Module-Level Constants

Declare all static data outside the component using SCREAMING_SNAKE_CASE:

```tsx
const INVESTMENT_TYPES = [
  { id: "stocks", name: "Stocks", color: "#3b82f6" },
  { id: "bonds", name: "Bonds", color: "#10b981" },
  { id: "real-estate", name: "Real Estate", color: "#f59e0b" },
];

const TIME_RANGES = [
  { value: "1M", label: "1 Month" },
  { value: "3M", label: "3 Months" },
  { value: "1Y", label: "1 Year" },
  { value: "5Y", label: "5 Years" },
  { value: "ALL", label: "All Time" },
];

export default function Page() {
  // Component code
}
```

## Important Reminders

1. **Never use console.log** in production code
2. **Always use "use client"** when component has state, effects, or interactive features
3. **Import order matters** - Automatically sorted by ESLint
4. **Template literal indentation** - Add 2 spaces to continuation lines
5. **Nullish coalescing** - Use `??` instead of `&&` for conditional rendering
6. **SCREAMING_SNAKE_CASE** - For all module-level constants
7. **Links not buttons** - Use proper semantic elements for navigation
8. **amvasdev-ui components** - Reference COMPONENT_USAGE_GUIDE.md for props
9. **Responsive design** - Use grid with breakpoints (md:grid-cols-2, lg:grid-cols-3, etc.)
10. **Data validation** - Always validate and sanitize investment data before display
11. **Number formatting** - Use proper currency and percentage formatting
12. **Chart accessibility** - Provide alternative text and data tables for charts
