import { SECTION_IDS } from "@/constants/sections";

const TimeAdvantage = () => (
  <section id={SECTION_IDS.TIME_ADVANTAGE}>
    <div className="card bg-primary text-primary-content shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl md:text-3xl mb-4">
          The Time Advantage
        </h2>
        <div className="space-y-4">
          <p>
            The earlier you start investing, the less money you need to
            contribute to reach the same goal. This is because time allows
            compound interest to work its magic. A 25-year-old investing
            $500/month at 7% annual return will have significantly more at
            retirement than a 35-year-old investing $1,000/month with the same
            return.
          </p>
          <p className="font-semibold">
            The best time to start investing was yesterday. The second best time
            is today.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default TimeAdvantage;
