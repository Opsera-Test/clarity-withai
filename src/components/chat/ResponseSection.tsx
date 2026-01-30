import { useState } from "react";
import { ChevronDown, ChevronRight, Brain, AlertTriangle, Scale, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionType = "reasoning" | "assumptions" | "tradeoffs" | "recommendation";

interface ResponseSectionProps {
  type: SectionType;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const sectionConfig = {
  reasoning: {
    icon: Brain,
    bgClass: "bg-section-reasoning",
    borderClass: "border-section-reasoning-border",
    iconClass: "text-blue-600",
  },
  assumptions: {
    icon: AlertTriangle,
    bgClass: "bg-section-assumptions",
    borderClass: "border-section-assumptions-border",
    iconClass: "text-amber-600",
  },
  tradeoffs: {
    icon: Scale,
    bgClass: "bg-section-tradeoffs",
    borderClass: "border-section-tradeoffs-border",
    iconClass: "text-purple-600",
  },
  recommendation: {
    icon: CheckCircle2,
    bgClass: "bg-section-recommendation",
    borderClass: "border-section-recommendation-border",
    iconClass: "text-emerald-600",
  },
};

export function ResponseSection({ type, title, children, defaultOpen = false }: ResponseSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = sectionConfig[type];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "rounded-lg border overflow-hidden transition-all duration-200",
        config.bgClass,
        config.borderClass
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-black/[0.02] transition-colors"
      >
        <Icon className={cn("h-4 w-4 flex-shrink-0", config.iconClass)} />
        <span className="font-medium text-sm flex-1">{title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      
      <div 
        className={cn(
          "section-expand overflow-hidden",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pb-4 pt-1">
          {children}
        </div>
      </div>
    </div>
  );
}
