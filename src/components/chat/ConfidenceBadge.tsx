import { cn } from "@/lib/utils";

interface ConfidenceBadgeProps {
  level: "high" | "medium" | "low";
}

const badgeConfig = {
  high: {
    label: "High Confidence",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  medium: {
    label: "Medium Confidence",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  low: {
    label: "Low Confidence",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

export function ConfidenceBadge({ level }: ConfidenceBadgeProps) {
  const config = badgeConfig[level];
  
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
