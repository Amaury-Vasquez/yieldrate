"use client";
import { useBreakpoint } from "amvasdev-ui";
import { SM } from "@/constants/breakpoints";

/**
 * Hook to check if the viewport is mobile (<= sm breakpoint)
 * @returns boolean indicating if the viewport is mobile (< 640px)
 */
const useIsMobile = () => useBreakpoint({ max: SM });

export default useIsMobile;
