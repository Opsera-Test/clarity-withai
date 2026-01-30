export interface StructuredResponse {
  executiveSummary: string;
  reasoning: string[];
  assumptions: string[];
  tradeoffs: {
    option: string;
    pros: string[];
    cons: string[];
  }[];
  recommendation?: {
    text: string;
    confidence: "high" | "medium" | "low";
    rationale: string;
  };
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  structuredResponse?: StructuredResponse;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
