# YieldRate

**YieldRate** is an investment visualization application that helps you explore how your investments grow over time. Built with Next.js 16 and React 19, it provides interactive charts and compound interest calculations to visualize investment performance.

## Features

- 📊 **Interactive Investment Charts** - Compare up to 3 investment scenarios side-by-side
- 💰 **Compound Interest Calculator** - Calculate returns with monthly contributions
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Beautiful UI** - Modern design with DaisyUI themes (light/dark mode)
- ⚡ **Fast Performance** - Built on Next.js 16 with React 19
- 📈 **Detailed Analytics** - View monthly breakdowns, total returns, and interest earned

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/yieldrate.git
cd yieldrate

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Project Structure

```
yieldrate/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── calculate/        # Investment calculation endpoints
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── modules/                  # Feature modules
│   ├── Home/                 # Landing page sections
│   └── InvestmentChart/      # Investment visualization
├── components/               # Shared UI components
│   ├── Navbar/
│   ├── Footer/
│   └── ...
├── contexts/                 # React Context providers
│   ├── InvestmentContext.tsx
│   └── DeviceContext.tsx
├── services/                 # Business logic
│   └── investment.ts         # Investment calculations
├── hooks/                    # Custom React hooks
├── utils/                    # Utility functions
├── constants/                # Static configuration
└── public/                   # Static assets
```

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/)
- **Components**: [amvasdev-ui](https://github.com/amvasdev/amvasdev-ui)
- **Charts**: [Recharts](https://recharts.org/)
- **Analytics**: [PostHog](https://posthog.com/)
- **Fonts**: Inter and Roboto Mono from Google Fonts

## Key Features Explained

### Investment Comparison

Compare up to 3 different investment scenarios:
- Set initial investment amount
- Define monthly contributions
- Adjust annual interest rates
- View results over different time periods (months)

### Visual Charts

- **Bar Chart**: Compare total values across investments
- **Line Chart**: View growth trends over time
- Interactive tooltips with detailed monthly data

### Calculations

The app calculates:
- **Total Value**: Final investment value after all contributions and interest
- **Total Contributions**: Sum of initial amount and all monthly contributions
- **Total Interest**: Interest earned through compound growth
- **Normal Return**: Total value without interest (contributions only)
- **Total Gain**: Difference between total value and normal return

## Configuration

### Themes

The app supports automatic theme switching based on system preferences:
- **Light mode**: `winter` theme (default)
- **Dark mode**: `dim` theme (enabled automatically)

Configure themes in `app/globals.css`:
```css
@plugin "daisyui" {
  themes: winter --default, dim --prefersdark;
}
```

### Path Aliases

TypeScript path alias `@/*` maps to the root directory. Use it for cleaner imports:

```tsx
import { Button } from "amvasdev-ui";
import { useInvestment } from "@/contexts/InvestmentContext";
import { calculateInvestments } from "@/utils/api";
```

## Development Guidelines

### Coding Standards

- **Arrow Functions**: Use implicit returns when possible
- **Imports**: Automatically sorted by ESLint
- **Constants**: Use `SCREAMING_SNAKE_CASE` for module-level constants
- **Links**: Use `<Link>` or `<a>` tags, not buttons with onClick navigation

### ESLint Rules

The project uses strict ESLint configuration:
- Automatic import sorting
- Enforced implicit returns for arrow functions
- Unused variable detection (with underscore prefix support)

For more details, see [CLAUDE.md](./CLAUDE.md).

## API Endpoints

### Calculate Investment

**GET** `/api/calculate`

Query parameters:
- `months` - Investment duration in months
- `initialAmount` - Starting investment amount
- `monthlyContribution` - Monthly contribution amount
- `annualInterestRate` - Annual interest rate (percentage)

**POST** `/api/calculate`

Request body (array of investments):
```json
[
  {
    "id": "investment-1",
    "months": 120,
    "initialAmount": 10000,
    "monthlyContribution": 500,
    "annualInterestRate": 7
  }
]
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Make sure to:
- Follow the coding standards in [CLAUDE.md](./CLAUDE.md)
- Run `npm run lint` before committing
- Write clear, descriptive commit messages

## License

This project is private and proprietary.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
