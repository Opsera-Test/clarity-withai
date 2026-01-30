import { Message, StructuredResponse } from "@/types/chat";

const sampleResponse: StructuredResponse = {
  executiveSummary: "Based on your current market position and growth trajectory, building an in-house solution is the recommended path. This provides better long-term control and customization, though it requires higher upfront investment and a 6-9 month development timeline.",
  reasoning: [
    "Your company's technical talent pool is strong, with 40+ engineers capable of this project",
    "The buy option (SaaS vendors) shows 3-year TCO of ~$2.4M vs build estimate of $1.8M",
    "Custom requirements around data residency and compliance make off-the-shelf solutions require significant customization anyway",
    "Building creates a competitive moat and enables faster iteration on product-specific features",
    "Market analysis shows similar-sized competitors who built in-house achieved 30% faster feature velocity",
  ],
  assumptions: [
    "Engineering team has capacity to dedicate 8-10 FTEs for 6-9 months",
    "Regulatory requirements will remain stable or increase, favoring control",
    "Current SaaS pricing reflects enterprise tier; volume discounts may reduce gap",
    "Maintenance costs estimated at 20% of build cost annually post-launch",
    "No major technology shifts expected in core stack within 3-year horizon",
  ],
  tradeoffs: [
    {
      option: "Build In-House",
      pros: [
        "Full control over roadmap and customization",
        "Lower long-term TCO ($1.8M vs $2.4M over 3 years)",
        "Competitive differentiation and IP ownership",
        "Easier compliance with data residency requirements",
      ],
      cons: [
        "6-9 month development timeline before value delivery",
        "Diverts engineering resources from core product",
        "Ongoing maintenance responsibility",
        "Risk of scope creep and budget overrun",
      ],
    },
    {
      option: "Buy SaaS Solution",
      pros: [
        "Immediate deployment (weeks vs months)",
        "Vendor handles updates, security, scaling",
        "Predictable monthly costs",
        "Access to vendor's R&D and innovation",
      ],
      cons: [
        "Higher 3-year TCO (~25% premium)",
        "Limited customization flexibility",
        "Vendor lock-in risk",
        "Data residency may require costly add-ons",
      ],
    },
  ],
  recommendation: {
    text: "Proceed with the build option, but establish clear milestones and a hybrid backup plan.",
    confidence: "high",
    rationale: "The combination of your strong engineering capability, specific compliance needs, and favorable long-term economics makes building the superior choice. However, I recommend setting a 3-month proof-of-concept gate with defined success criteria before full commitment.",
  },
};

export const sampleMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "We're evaluating whether to build or buy our customer data platform. Can you help us think through this decision?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    role: "assistant",
    content: "",
    structuredResponse: sampleResponse,
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
];
