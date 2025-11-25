"use client";
import { createContext, ReactNode, useContext } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import useIsMobileOrTablet from "@/hooks/useIsMobileOrTablet";
import useIsTablet from "@/hooks/useIsTablet";

interface DeviceContextValue {
  isMobile: boolean;
  isTablet: boolean;
  isMobileOrTablet: boolean;
  isDesktop: boolean;
}

const DeviceContext = createContext<DeviceContextValue | undefined>(undefined);

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within DeviceProvider");
  }
  return context;
};

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isMobileOrTablet = useIsMobileOrTablet();
  const isDesktop = !isMobileOrTablet;

  return (
    <DeviceContext.Provider
      value={{ isMobile, isTablet, isMobileOrTablet, isDesktop }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
