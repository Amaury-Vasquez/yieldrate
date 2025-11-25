import { Button, ErrorLabel } from "amvasdev-ui";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { SECTION_IDS } from "@/constants/sections";
import { useInvestment } from "@/contexts/InvestmentContext";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import InvestmentEditControl from "./InvestmentEditControl";

const InvestmentsList = () => {
  const {
    investments,
    updateInvestment,
    focusedInvestmentId,
    setFocusedInvestment,
    handleDeleteInvestment,
    drawChart,
    limitError,
    clearLimitError,
  } = useInvestment();
  const scrollToSection = useSectionScroll();

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);

  const handleValidationChange = (_id: string, isValid: boolean) => {
    setIsCurrentFormValid(isValid);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCurrentFormValid) {
      scrollToSection(SECTION_IDS.INVESTMENT_CHART);
      drawChart();
    }
  };

  const focusedInvestment = useMemo(
    () => investments.find((i) => i.id === focusedInvestmentId),
    [investments, focusedInvestmentId]
  );

  return (
    <form
      id="investments-form"
      onSubmit={handleSubmit}
      onFocus={clearLimitError}
      className="flex flex-col gap-4"
    >
      <div
        role="tablist"
        className="tabs tabs-border tabs-box overflow-x-auto flex-nowrap"
      >
        {investments.map((investment) => (
          <input
            type="radio"
            name="investment-tabs"
            className="tab"
            aria-label={investment.label}
            key={investment.id}
            onChange={() => setFocusedInvestment(investment.id)}
            checked={focusedInvestmentId === investment.id}
            disabled={!isCurrentFormValid}
          />
        ))}
      </div>
      {limitError ? <ErrorLabel className="ml-2" text={limitError} /> : null}
      <div className="flex gap-4 items-center md:flex-row flex-col">
        {focusedInvestmentId ? (
          <InvestmentEditControl
            key={focusedInvestmentId}
            investment={investments.find((i) => i.id === focusedInvestmentId)!}
            onChange={updateInvestment}
            onValidationChange={handleValidationChange}
          />
        ) : null}

        <div className="flex gap-4 justify-center shrink-0 w-full flex-col-reverse md:flex-col md:w-48">
          <Button
            variant="primary"
            type="submit"
            disabled={!isCurrentFormValid}
            className="w-full"
          >
            {`Show Yield Rate${investments.length > 1 ? "s" : ""}`}
          </Button>
          {focusedInvestmentId &&
          focusedInvestment &&
          investments.length > 1 ? (
            <Button
              id={`remove-investment-${focusedInvestmentId}`}
              aria-label={`Remove ${focusedInvestment.label}`}
              onClick={handleDeleteInvestment}
              variant="error"
              className="w-full"
            >
              <Trash2 size="16" />
              Remove investment
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default InvestmentsList;
