"use client";
import { DeviceProvider } from "@/contexts/DeviceContext";
import PosthogProvider from "./Posthog";

const Provider = ({ children }: { children: React.ReactNode }) => (
  <PosthogProvider>
    <DeviceProvider>{children}</DeviceProvider>
  </PosthogProvider>
);

export default Provider;
