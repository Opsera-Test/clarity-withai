import { Sparkles } from "lucide-react";

interface ExecutiveSummaryProps {
  content: string;
}

export function ExecutiveSummary({ content }: ExecutiveSummaryProps) {
  return (
    <div className="bg-summary border border-summary-border rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
          Executive Summary
        </h3>
      </div>
      <p className="text-foreground leading-relaxed">{content}</p>
    </div>
  );
}
