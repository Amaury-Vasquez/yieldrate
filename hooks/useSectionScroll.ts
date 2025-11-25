"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const NAVBAR_HEIGHT = 80; // 4rem = 64px of navbar + 16px of padding

/**
 * Custom hook for smooth scrolling to sections with navbar offset
 *
 * @returns scrollToSection function that accepts a section ID
 *
 * @example
 * const scrollToSection = useSectionScroll();
 * scrollToSection("hero");
 */
export const useSectionScroll = () => {
  const router = useRouter();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);

      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - NAVBAR_HEIGHT;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL hash using Next.js router
        router.push(`#${sectionId}`, { scroll: false });
      }
    },
    [router]
  );

  return scrollToSection;
};
