import clsx from "clsx";
import { TrendingUp } from "lucide-react";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  size?: LogoSize;
  isHeading?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<LogoSize, { text: string; icon: string }> = {
  sm: {
    text: "text-xl",
    icon: "w-6 h-6",
  },
  md: {
    text: "text-2xl md:text-3xl",
    icon: "w-7 h-7 md:w-8 md:h-8",
  },
  lg: {
    text: "text-4xl md:text-5xl",
    icon: "w-8 h-8 md:w-10 md:h-10",
  },
};

const Logo = ({ size = "md", isHeading = false, className }: LogoProps) => {
  const { text, icon } = SIZE_CLASSES[size];
  const Tag = isHeading ? "h1" : "span";

  return (
    <Tag
      className={clsx(
        "flex items-center gap-2 font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent",
        text,
        className
      )}
      translate="no"
    >
      <TrendingUp className={clsx(icon, "text-primary")} />
      YieldRate
    </Tag>
  );
};

export default Logo;
