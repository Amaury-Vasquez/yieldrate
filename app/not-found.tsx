"use client";
import { ArrowLeft, BookOpen, Boxes, Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import CustomLink from "@/components/CustomLink";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();
  const posthog = usePostHog();

  useEffect(() => {
    posthog.captureException("404 page not found", {
      pathname,
      status: 404,
    });
  }, [pathname, posthog]);

  return (
    <div className="flex flex-col items-center justify-center md:min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number with Gradient */}
        <div className="space-y-4">
          <h1 className="font-bold text-9xl tracking-tighter bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-base-content/20" />
            <span className="text-base-content/60 text-sm font-medium uppercase tracking-wider">
              Page Not Found
            </span>
            <div className="h-px w-16 bg-linear-to-r from-base-content/20 to-transparent" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-base-content">
            Oops! This page seems to have wandered off
          </h2>
          <p className="text-base-content/70 text-base max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
          <CustomLink
            href="/"
            variant="primary"
            size="lg"
            className="gap-2 min-w-[160px]"
            ariaLabel="Go to home page"
          >
            <Home size={18} />
            Go Home
          </CustomLink>
          <CustomLink
            href="/components"
            variant="secondary"
            size="lg"
            className="gap-2 min-w-[160px]"
            ariaLabel="Browse all components"
          >
            <Boxes size={18} />
            Browse Components
          </CustomLink>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-base-300">
          <p className="text-sm text-base-content/60 mb-4 font-medium">
            Popular sections:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-base-200 hover:bg-base-300 text-sm text-base-content/80 hover:text-primary transition-colors"
              aria-label="Go to Getting Started page"
            >
              <BookOpen size={14} />
              <span>Getting Started</span>
            </Link>
            <Link
              href="/components/button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-base-200 hover:bg-base-300 text-sm text-base-content/80 hover:text-primary transition-colors"
              aria-label="Go to button component"
            >
              <Boxes size={14} />
              <span>Button</span>
            </Link>
            <Link
              href="/hooks"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-base-200 hover:bg-base-300 text-sm text-base-content/80 hover:text-primary transition-colors"
              aria-label="Go to hooks"
            >
              <Search size={14} />
              <span>Hooks</span>
            </Link>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="pt-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary transition-colors group"
            id="not-found-go-back-button"
            aria-label="Go back to previous page"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Go back to previous page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
