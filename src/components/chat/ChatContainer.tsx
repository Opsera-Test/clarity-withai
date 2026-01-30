import { useState, useRef, useEffect } from "react";
import { Message, StructuredResponse } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";
import { WelcomeMessage } from "./WelcomeMessage";
import { sampleMessages } from "@/data/sampleConversation";

// Simulated AI response for demo
const generateDemoResponse = (userMessage: string): StructuredResponse => ({
  executiveSummary: `I've analyzed your question about "${userMessage.slice(0, 50)}..." and here's my assessment. This is a demonstration of the structured response format.`,
  reasoning: [
    "First, I identified the core question and its business context",
    "Next, I considered relevant factors including market conditions, internal capabilities, and timing",
    "I evaluated multiple approaches against your implied criteria",
    "Finally, I synthesized findings into actionable recommendations",
  ],
  assumptions: [
    "You have decision-making authority or are gathering information for leadership",
    "Standard enterprise constraints apply (budget cycles, stakeholder alignment)",
    "The timeline is strategic rather than urgent",
  ],
  tradeoffs: [
    {
      option: "Move Forward Now",
      pros: ["First-mover advantage", "Team momentum", "Market timing"],
      cons: ["Higher risk", "Less information", "Resource strain"],
    },
    {
      option: "Wait for More Data",
      pros: ["Better informed decision", "Lower risk", "More stakeholder buy-in"],
      cons: ["Opportunity cost", "Analysis paralysis risk", "Competitor movement"],
    },
  ],
  recommendation: {
    text: "I recommend a phased approach that balances speed with risk management.",
    confidence: "medium",
    rationale: "This allows you to capture early benefits while maintaining flexibility to adjust based on initial results and emerging information.",
  },
});

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      structuredResponse: generateDemoResponse(content),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader />
      
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-4 animate-fade-in">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground text-sm font-medium">C</span>
              </div>
              <div className="bg-card rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse-subtle" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse-subtle" style={{ animationDelay: "200ms" }} />
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse-subtle" style={{ animationDelay: "400ms" }} />
                  </div>
                  <span className="text-sm text-muted-foreground">Analyzing and structuring response...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      <footer className="border-t border-border bg-background px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput 
            onSend={handleSend} 
            disabled={isLoading}
            placeholder="Ask a strategic question..."
          />
        </div>
      </footer>
    </div>
  );
}
