import { Brain, Shield, Scale, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Transparent Reasoning",
    description: "See the step-by-step logic behind every answer",
  },
  {
    icon: Shield,
    title: "Explicit Assumptions",
    description: "Know what's being assumed or inferred",
  },
  {
    icon: Scale,
    title: "Trade-off Analysis",
    description: "Understand pros, cons, and alternatives",
  },
  {
    icon: Lightbulb,
    title: "Clear Recommendations",
    description: "Actionable guidance with confidence levels",
  },
];

export function WelcomeMessage() {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
        <span className="text-accent text-3xl font-bold">C</span>
      </div>
      
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Welcome to Clarity AI
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Your explanation-first AI assistant. Every response is designed for 
        transparency, showing you the reasoning behind the answer.
      </p>
      
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {features.map((feature) => (
          <div 
            key={feature.title}
            className="bg-card border border-border rounded-xl p-4 text-left hover:shadow-sm transition-shadow"
          >
            <feature.icon className="h-5 w-5 text-accent mb-2" />
            <h3 className="font-medium text-sm text-foreground mb-1">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 space-y-2">
        <p className="text-sm text-muted-foreground">Try asking:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Should we build or buy?",
            "Evaluate this acquisition",
            "Explain our risk exposure",
          ].map((prompt) => (
            <button
              key={prompt}
              className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-sm text-foreground rounded-full transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
