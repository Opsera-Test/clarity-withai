import { StructuredResponse } from "@/types/chat";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { ResponseSection } from "./ResponseSection";
import { ConfidenceBadge } from "./ConfidenceBadge";

interface StructuredMessageProps {
  response: StructuredResponse;
}

export function StructuredMessage({ response }: StructuredMessageProps) {
  return (
    <div className="space-y-3 animate-fade-in">
      <ExecutiveSummary content={response.executiveSummary} />
      
      <div className="space-y-2">
        <ResponseSection type="reasoning" title="Reasoning & Logic" defaultOpen={true}>
          <ol className="space-y-2">
            {response.reasoning.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span className="text-foreground leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </ResponseSection>

        <ResponseSection type="assumptions" title="Key Assumptions">
          <ul className="space-y-2">
            {response.assumptions.map((assumption, index) => (
              <li key={index} className="flex gap-2 text-sm">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-foreground leading-relaxed">{assumption}</span>
              </li>
            ))}
          </ul>
        </ResponseSection>

        <ResponseSection type="tradeoffs" title="Trade-offs & Alternatives">
          <div className="space-y-4">
            {response.tradeoffs.map((tradeoff, index) => (
              <div key={index} className="border-l-2 border-purple-300 pl-3">
                <h4 className="font-medium text-sm mb-2">{tradeoff.option}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-emerald-600 font-medium text-xs uppercase tracking-wide">Pros</span>
                    <ul className="mt-1 space-y-1">
                      {tradeoff.pros.map((pro, i) => (
                        <li key={i} className="text-muted-foreground flex gap-1.5">
                          <span className="text-emerald-500">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-red-600 font-medium text-xs uppercase tracking-wide">Cons</span>
                    <ul className="mt-1 space-y-1">
                      {tradeoff.cons.map((con, i) => (
                        <li key={i} className="text-muted-foreground flex gap-1.5">
                          <span className="text-red-500">−</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResponseSection>

        {response.recommendation && (
          <ResponseSection type="recommendation" title="Recommendation" defaultOpen={true}>
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-foreground font-medium leading-relaxed">
                  {response.recommendation.text}
                </p>
                <ConfidenceBadge level={response.recommendation.confidence} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed border-t border-section-recommendation-border pt-3">
                <span className="font-medium">Rationale:</span> {response.recommendation.rationale}
              </p>
            </div>
          </ResponseSection>
        )}
      </div>
    </div>
  );
}
