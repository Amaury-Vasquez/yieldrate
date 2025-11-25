import clsx from "clsx";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "amvasdev-ui/dist/index.css";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Provider from "@/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YieldRate - Investment Growth Visualization",
  description:
    "Explore how your investments grow over time with interactive charts and compound interest calculations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          `antialiased bg-linear-to-br from-base-100 to-base-200 min-h-svh flex flex-col`,
          inter.variable,
          robotoMono.variable
        )}
      >
        <Provider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
