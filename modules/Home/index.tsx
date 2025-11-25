"use client";
import { SECTION_IDS } from "@/constants/sections";
import InvestmentChart from "@/modules/InvestmentChart";
import GettingStarted from "./GettingStarted";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import TimeAdvantage from "./TimeAdvantage";
import WhyInvesting from "./WhyInvesting";

const Home = () => (
  <div className="min-h-svh bg-base-200">
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl flex flex-col gap-8 md:gap-12">
      <Hero />
      <div id={SECTION_IDS.INVESTMENT_CHART}>
        <InvestmentChart />
      </div>
      <TimeAdvantage />
      <GettingStarted />
      <WhyInvesting />
      <HowItWorks />
    </div>
  </div>
);

export default Home;
