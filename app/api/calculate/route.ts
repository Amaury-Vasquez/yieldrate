import { NextRequest, NextResponse } from "next/server";
import {
  calculateInvestment,
  calculateMultipleInvestments,
  validateAndParseParams,
  type InvestmentWithId,
} from "@/services/investment";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const validation = validateAndParseParams(
      searchParams.get("months"),
      searchParams.get("initialAmount"),
      searchParams.get("monthlyContribution"),
      searchParams.get("annualInterestRate")
    );

    if (!validation.isValid || !validation.params) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = calculateInvestment(validation.params);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to calculate investment" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if body is an array of investments
    if (Array.isArray(body)) {
      const investments: InvestmentWithId[] = [];
      const errors: string[] = [];

      // Validate each investment
      body.forEach((investment, index) => {
        if (!investment.id) {
          errors.push(`Investment at index ${index} is missing an id`);
          return;
        }

        const validation = validateAndParseParams(
          investment.months,
          investment.initialAmount,
          investment.monthlyContribution,
          investment.annualInterestRate
        );

        if (!validation.isValid || !validation.params) {
          errors.push(`Investment ${investment.id}: ${validation.error}`);
        } else {
          investments.push({
            id: investment.id,
            ...validation.params,
          });
        }
      });

      if (errors.length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
      }

      const result = calculateMultipleInvestments(investments);
      return NextResponse.json(result);
    }

    // Single investment calculation (backwards compatibility)
    const validation = validateAndParseParams(
      body.months,
      body.initialAmount,
      body.monthlyContribution,
      body.annualInterestRate
    );

    if (!validation.isValid || !validation.params) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = calculateInvestment(validation.params);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to calculate investment" },
      { status: 500 }
    );
  }
}
