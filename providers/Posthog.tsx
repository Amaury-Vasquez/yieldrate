"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { POSTHOG_KEY, POSTHOG_HOST } from "@/constants/globals";

if (typeof window !== "undefined" && !posthog.__loaded) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "always",
    name: "amvasdev-ui-docs",
  });
}

const PosthogProvider = ({ children }: { children: React.ReactNode }) => (
  <PHProvider client={posthog}>{children}</PHProvider>
);

export default PosthogProvider;
