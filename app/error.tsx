"use client";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import CustomLink from "@/components/CustomLink";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const posthog = usePostHog();

  useEffect(() => {
    posthog.captureException(error, {
      pathname,
      digest: error.digest,
      message: error.message,
      stack: error.stack,
    });
  }, [error, pathname, posthog]);

  return (
    <div className="flex flex-col items-center justify-center md:min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-error/20 blur-3xl rounded-full" />
              <div className="relative bg-error/10 p-6 rounded-full">
                <AlertTriangle className="w-16 h-16 text-error" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-base-content/20" />
            <span className="text-base-content/60 text-sm font-medium uppercase tracking-wider">
              Something Went Wrong
            </span>
            <div className="h-px w-16 bg-linear-to-r from-base-content/20 to-transparent" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-base-content">
            Oops! An error occurred
          </h1>
          <p className="text-base-content/70 text-base max-w-md mx-auto">
            We apologize for the inconvenience. The error has been logged and
            we&apos;ll look into it. Please try again.
          </p>
          {error.digest ? (
            <p className="text-xs text-base-content/50 font-mono mt-4">
              Error ID: {error.digest}
            </p>
          ) : null}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
          <button
            onClick={reset}
            className="btn btn-primary btn-lg gap-2 min-w-[160px]"
            id="error-try-again-button"
            aria-label="Try again"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <CustomLink
            href="/"
            variant="secondary"
            size="lg"
            className="gap-2 min-w-[160px]"
            ariaLabel="Go to home page"
          >
            <Home size={18} />
            Go Home
          </CustomLink>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" ? (
          <div className="pt-8 border-t border-base-300">
            <details className="text-left">
              <summary className="cursor-pointer text-sm font-medium text-base-content/70 hover:text-primary transition-colors">
                Error Details (Development)
              </summary>
              <div className="mt-4 p-4 bg-base-200 rounded-lg">
                <p className="text-xs font-semibold text-error mb-2">
                  {error.name}: {error.message}
                </p>
                {error.stack ? (
                  <pre className="text-xs text-base-content/60 overflow-x-auto whitespace-pre-wrap wrap-break-word">
                    {error.stack}
                  </pre>
                ) : null}
              </div>
            </details>
          </div>
        ) : null}

        {/* Back Navigation */}
        <div className="pt-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary transition-colors group"
            id="error-go-back-button"
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
