import { SECTION_IDS } from "@/constants/sections";

const HowItWorks = () => (
  <section id={SECTION_IDS.HOW_IT_WORKS}>
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl md:text-3xl mb-4">
          How Investment Growth Works
        </h2>
        <div className="space-y-4 text-base-content/80">
          <p>
            Investment growth is powered by <strong>compound interest</strong> -
            one of the most powerful concepts in finance. When you invest money,
            you earn returns on your initial investment. But here&apos;s where it
            gets interesting: those returns also generate their own returns.
          </p>
          <p>
            For example, if you invest $10,000 at a 7% annual return, you&apos;ll
            earn $700 in the first year. But in the second year, you earn 7% on
            $10,700, not just your original $10,000. This compounding effect
            accelerates over time, creating exponential growth rather than linear
            growth.
          </p>
          <p>
            Regular contributions amplify this effect even more. By consistently
            adding to your investment each month, you&apos;re continuously feeding
            the compounding machine, dramatically increasing your wealth over the
            long term.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
