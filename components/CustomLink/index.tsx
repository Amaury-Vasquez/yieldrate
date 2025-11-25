"use client";
import { ButtonSize, ButtonVariant, getButtonClasses } from "amvasdev-ui";
import clsx from "clsx";
import Link from "next/link";
import { MouseEvent, ReactNode } from "react";
import { useSectionScroll } from "@/hooks/useSectionScroll";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  outlined?: boolean;
  className?: string;
  target?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * CustomLink component - A Next.js Link wrapper styled as a button using amvasdev-ui utilities
 *
 * Use this component when you need a link that should look like a button.
 * It combines Next.js Link functionality with DaisyUI button styling via getButtonClasses().
 * Handles smooth scrolling to sections with navbar offset for hash links.
 *
 * @example
 * <CustomLink href="/dashboard" variant="primary">
 *   Go to Dashboard
 * </CustomLink>
 *
 * @example
 * <CustomLink href="#section-id" variant="ghost" size="lg">
 *   Go to Section
 * </CustomLink>
 */
const CustomLink = ({
  href,
  children,
  variant = "base",
  size = "md",
  outlined = false,
  className = "",
  target = "_self",
  onClick,
  ariaLabel,
}: CustomLinkProps) => {
  const scrollToSection = useSectionScroll();
  const buttonClasses = getButtonClasses({
    variant,
    size,
    outlined,
  });

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    // Handle hash links for smooth scrolling with navbar offset
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      scrollToSection(targetId);
    }
  };

  return (
    <Link
      href={href}
      className={clsx(buttonClasses, className)}
      target={target}
      onClick={handleClick}
      aria-label={ariaLabel ?? `Go to ${href.replaceAll(/[/-_]/g, " ")}`.trim()}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
