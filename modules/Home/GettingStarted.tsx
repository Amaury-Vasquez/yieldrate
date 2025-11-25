import { SECTION_IDS } from "@/constants/sections";

const GettingStarted = () => (
  <section id={SECTION_IDS.GETTING_STARTED}>
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl md:text-3xl mb-4">Getting Started</h2>
        <div className="space-y-4 text-base-content/80">
          <p>
            Use the interactive chart above to explore different investment
            scenarios. Adjust the parameters to see how:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your initial investment amount affects long-term growth</li>
            <li>Regular monthly contributions accelerate wealth building</li>
            <li>Different interest rates impact your final returns</li>
            <li>Time periods influence the power of compounding</li>
          </ul>
          <p>
            Compare multiple investment strategies side-by-side to find the
            approach that works best for your financial goals and timeline.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default GettingStarted;
