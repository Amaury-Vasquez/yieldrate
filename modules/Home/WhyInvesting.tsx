import { TrendingUp, DollarSign, Clock, Target } from "lucide-react";
import { SECTION_IDS } from "@/constants/sections";

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Compound Growth",
    description:
      "Your money grows exponentially over time as interest earns interest, creating a snowball effect that accelerates your wealth.",
  },
  {
    icon: DollarSign,
    title: "Financial Freedom",
    description:
      "Consistent investing builds wealth that can support your lifestyle, fund your dreams, and provide security for your future.",
  },
  {
    icon: Clock,
    title: "Time is Your Ally",
    description:
      "Starting early gives your investments more time to compound, making it easier to reach your financial goals with less effort.",
  },
  {
    icon: Target,
    title: "Reach Your Goals",
    description:
      "Whether it's retirement, a home, or education, strategic investing helps you achieve your financial milestones faster.",
  },
];

const WhyInvesting = () => (
  <section id={SECTION_IDS.WHY_INVESTING}>
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
      Why Investing Matters
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {BENEFITS.map((benefit) => (
        <div key={benefit.title} className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="card-title text-lg mb-2">{benefit.title}</h3>
                <p className="text-base-content/70">{benefit.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default WhyInvesting;
