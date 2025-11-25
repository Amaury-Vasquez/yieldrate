import Logo from "@/components/Logo";
import { SECTION_IDS } from "@/constants/sections";

const Hero = () => (
  <header id={SECTION_IDS.HERO} className="text-center">
    <Logo size="lg" isHeading className="mb-4 justify-center" />
    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
      Visualize the power of compound interest and see how your investments
      grow over time
    </p>
  </header>
);

export default Hero;
