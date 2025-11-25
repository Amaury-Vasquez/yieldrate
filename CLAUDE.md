# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 investment visualization application called **YieldRate**. The project focuses on generating graphic views of investments to explore how investments behave over time. The project uses:

- **Next.js 16** with App Router architecture
- **React 19** (latest version)
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling with DaisyUI plugin
- **Recharts** for data visualization
- **amvasdev-ui** component library for UI components
- **PostHog** for analytics

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
  - `layout.tsx` - Root layout with Inter and Roboto Mono fonts
  - `page.tsx` - Homepage rendering Home module
  - `globals.css` - Global styles with Tailwind CSS and DaisyUI themes
  - `api/calculate/route.ts` - API route for investment calculations (GET/POST)
  - `error.tsx` - Error boundary
  - `not-found.tsx` - 404 page

- **`modules/`** - Feature modules organized by functionality
  - `Home/` - Landing page sections (Hero, TimeAdvantage, WhyInvesting, etc.)
  - `InvestmentChart/` - Investment comparison and visualization module

- **`components/`** - Shared UI components
  - `Navbar/` - Navigation bar
  - `Footer/` - Footer component
  - `Logo/` - Brand logo
  - `CustomLink/` - Link component wrapper

- **`contexts/`** - React Context providers
  - `InvestmentContext.tsx` - Investment state management (add/update/remove investments, chart type)
  - `DeviceContext.tsx` - Device detection context

- **`providers/`** - Top-level providers
  - `index.tsx` - Root provider wrapping PostHog and Device contexts
  - `Posthog.tsx` - PostHog analytics provider

- **`services/`** - Business logic and calculations
  - `investment.ts` - Investment calculation algorithms, validation, and types

- **`hooks/`** - Custom React hooks
  - `useIsMobile.ts` - Mobile device detection
  - `useIsTablet.ts` - Tablet device detection
  - `useIsMobileOrTablet.ts` - Mobile or tablet detection
  - `useSectionScroll.ts` - Section scrolling behavior

- **`utils/`** - Utility functions
  - `api.ts` - API client functions
  - `string.ts` - String manipulation utilities
  - `validations.ts` - Validation helpers

- **`constants/`** - Static configuration
  - `sections.ts` - Section IDs and navigation links
  - `globals.ts` - Global constants
  - `breakpoints.ts` - Responsive breakpoints

- **`public/`** - Static assets

## Important Configuration

- **Path aliases**: `@/*` maps to the root directory (`tsconfig.json`)
- **TypeScript target**: ES2017 with strict mode enabled
- **Fonts**: Uses Inter and Roboto Mono from Google Fonts
- **Styling**: Tailwind CSS v4 with DaisyUI plugin
  - Default theme: `winter` (light)
  - Dark theme: `dim` (auto-switches via `prefers-color-scheme`)
  - CSS variables: `--font-sans` (Inter), `--font-mono` (Roboto Mono)

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

1. Always import the CSS: `import "amvasdev-ui/dist/index.css";` (imported in root layout)
2. Components support variants, sizes, custom styling, and theme customization
3. The library uses a design system with consistent color variants: `base`, `neutral`, `primary`, `secondary`, `accent`, `info`, `success`, `warning`, `error`, `ghost`, `link`

**Common UI Components:**
```tsx
import { Button, Card, Input, Select, Modal, Badge, Alert } from "amvasdev-ui";
```

### DaisyUI Theme Configuration

The app uses DaisyUI themes defined in `app/globals.css`:

```css
@plugin "daisyui" {
  themes: winter --default, dim --prefersdark;
}
```

- **Light mode**: `winter` theme (default)
- **Dark mode**: `dim` theme (automatically applies based on system preference)
- Theme switching is automatic via `prefers-color-scheme`

### Next.js 16 Specifics

- Uses React 19 with the new compiler runtime
- Server Components by default (add `"use client"` directive when needed)
- Automatic font optimization with `next/font`
- Image optimization with `next/image` component

### Styling Patterns

- Tailwind CSS v4 with DaisyUI plugin
- CSS variables for fonts: `--font-sans`, `--font-mono`
- DaisyUI utility classes for colors: `bg-base-100`, `text-primary`, etc.
- Responsive design with Tailwind breakpoints: `md:`, `lg:`, etc.

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
{(portfolio.assets?.length ?? 0) > 0 ? (
  <AssetList assets={portfolio.assets} />
) : null}
```

**❌ Incorrect:**
```tsx
{portfolio.assets?.length && <AssetList assets={portfolio.assets} />}
```

## Project Architecture

### Module Pattern

YieldRate uses a module-based architecture where each feature is encapsulated in its own directory:

**Structure:**
```
app/
  page.tsx              # Server component - exports metadata, renders module

modules/
  Home/
    index.tsx           # Main client component
    Hero.tsx            # Page-specific subcomponents
    TimeAdvantage.tsx
    ...
  InvestmentChart/
    index.tsx           # Main client component with context provider
    ChartContainer.tsx
    InvestmentControls.tsx
    ...
```

**Page Pattern (app/page.tsx):**
```tsx
import Home from "@/modules/Home";

export default function HomePage() {
  return <Home />;
}
```

**Module Index Pattern (modules/Home/index.tsx):**
```tsx
"use client";
import { SECTION_IDS } from "@/constants/sections";
import InvestmentChart from "@/modules/InvestmentChart";
import Hero from "./Hero";
import TimeAdvantage from "./TimeAdvantage";

const Home = () => (
  <div className="min-h-svh bg-base-200">
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <div id={SECTION_IDS.INVESTMENT_CHART}>
        <InvestmentChart />
      </div>
      <TimeAdvantage />
    </div>
  </div>
);

export default Home;
```

**"use client" Directive:**
- Add to module index files that manage state and interactivity
- Add to components that use React hooks, browser APIs, or event handlers
- NOT needed in page.tsx (server component for metadata)
- NOT needed in pure presentational components

### Context Provider Pattern

The `InvestmentChart` module uses React Context for state management:

```tsx
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
```

**InvestmentContext Features:**
- Manages up to 3 investments (MAX_INVESTMENTS = 3)
- Provides CRUD operations: `addInvestment`, `updateInvestment`, `removeInvestment`
- Handles chart calculations via `drawChart()` (calls API route)
- Supports chart type switching: `"line"` or `"bar"`
- Tracks focused investment with `focusedInvestmentId`
- Default color palette: primary, secondary, accent (from DaisyUI)

### API Route Pattern

Investment calculations are handled server-side:

**Route:** `app/api/calculate/route.ts`

**GET endpoint:** Single investment calculation via query params
```
GET /api/calculate?months=120&initialAmount=10000&monthlyContribution=500&annualInterestRate=7
```

**POST endpoint:** Multiple investment calculations
```json
POST /api/calculate
[
  {
    "id": "investment-1",
    "months": 120,
    "initialAmount": 10000,
    "monthlyContribution": 500,
    "annualInterestRate": 7
  },
  {
    "id": "investment-2",
    "months": 60,
    "initialAmount": 5000,
    "monthlyContribution": 300,
    "annualInterestRate": 5
  }
]
```

**Business Logic:** All calculations are in `services/investment.ts`
- `validateAndParseParams()` - Validates input parameters
- `calculateInvestment()` - Calculates monthly data, total value, interest
- `calculateMultipleInvestments()` - Calculates multiple investments

### State Management Guidelines

- **Local state:** Use for UI interactions (modal open/close, form inputs)
- **Context state:** Use for feature-specific data (InvestmentContext)
- **Global providers:** Use for app-wide state (DeviceContext, PostHog)

## Common Patterns

### Investment Calculation Flow

1. User inputs investment parameters in `InvestmentControls`
2. Parameters stored in `InvestmentContext`
3. User clicks "Draw Chart" → calls `drawChart()`
4. Context calls API via `utils/api.ts` → `calculateInvestments()`
5. API route validates and calculates using `services/investment.ts`
6. Results stored in context → `ChartContainer` renders with Recharts

### Device Detection Pattern

```tsx
import { useDevice } from "@/contexts/DeviceContext";

const MyComponent = () => {
  const { isMobile, isTablet } = useDevice();

  return (
    <div className={isMobile ? "flex-col" : "flex-row"}>
      {/* Responsive content */}
    </div>
  );
};
```

### Section Navigation Pattern

```tsx
import { SECTION_IDS } from "@/constants/sections";
import Link from "next/link";

<Link href={`#${SECTION_IDS.INVESTMENT_CHART}`}>
  Go to Investment Chart
</Link>
```

### Module-Level Constants Pattern

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
8. **amvasdev-ui components** - Import from `amvasdev-ui` package
9. **DaisyUI utility classes** - Use for theming (`bg-base-100`, `text-primary`, etc.)
10. **Responsive design** - Use Tailwind breakpoints (`md:`, `lg:`, etc.)
11. **Number formatting** - Use proper currency and percentage formatting for investment data
12. **Data validation** - Always validate investment parameters via `validateAndParseParams()`
