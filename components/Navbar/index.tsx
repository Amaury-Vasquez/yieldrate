"use client";
import { HamburgerMenu } from "amvasdev-ui";
import { Menu } from "lucide-react";
import Link from "next/link";
import CustomLink from "@/components/CustomLink";
import Logo from "@/components/Logo";
import { SECTION_LINKS } from "@/constants/sections";

const Navbar = () => (
  <header className="sticky top-0 z-50 shadow-lg bg-base-100/95 backdrop-blur-sm border-b border-base-300">
    <nav className="container mx-auto px-4 max-w-7xl">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="hover:text-primary transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Home page"
        >
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {SECTION_LINKS.slice(1).map((link) => (
            <CustomLink
              key={link.id}
              href={`#${link.id}`}
              variant="ghost"
              size="sm"
              className="capitalize"
              ariaLabel={`Go to ${link.name} section`}
            >
              {link.name}
            </CustomLink>
          ))}
        </div>

        <HamburgerMenu
          icon={Menu}
          position="right"
          className="md:hidden"
          menuClassName="w-52"
        >
          {SECTION_LINKS.slice(1).map((link) => (
            <CustomLink
              key={link.id}
              href={`#${link.id}`}
              variant="ghost"
              size="md"
              className="capitalize justify-start"
              ariaLabel={`Go to ${link.name} section`}
            >
              {link.name}
            </CustomLink>
          ))}
        </HamburgerMenu>
      </div>
    </nav>
  </header>
);

export default Navbar;
