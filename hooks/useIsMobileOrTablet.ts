"use client";
import { useBreakpoint } from "amvasdev-ui";
import { LG } from "@/constants/breakpoints";

/**
 * Hook to check if the viewport is mobile or tablet (< lg breakpoint)
 * @returns boolean indicating if the viewport is mobile or tablet (< 1024px)
 */
const useIsMobileOrTablet = () => useBreakpoint({ max: LG });

export default useIsMobileOrTablet;
