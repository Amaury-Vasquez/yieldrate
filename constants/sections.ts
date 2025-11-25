import { formatTextWithSpaces } from "@/utils/string";

export const SECTION_IDS = {
  HERO: "hero",
  INVESTMENT_CHART: "investment-chart",
  TIME_ADVANTAGE: "time-advantage",
  GETTING_STARTED: "getting-started",
  WHY_INVESTING: "why-investing",
  HOW_IT_WORKS: "how-it-works",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const SECTION_LINKS = Object.values(SECTION_IDS).map((value) => ({
  id: value,
  name: formatTextWithSpaces(value),
}));
