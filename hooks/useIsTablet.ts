"use client";
import { useBreakpoint } from "amvasdev-ui";
import { LG, SM } from "@/constants/breakpoints";

/**
 * Hook to check if the viewport is tablet (>= sm and < lg breakpoint)
 * @returns boolean indicating if the viewport is tablet (640px <= width < 1024px)
 */
const useIsTablet = () => useBreakpoint({ min: SM, max: LG });

export default useIsTablet;
