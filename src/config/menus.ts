export interface MenuItem {
  shortTitle: string;
  title: string;
  description: string;
}

export enum modes {
  qa = "qa",
  panel = "panel", 
  interview = "interview",
}

export type Menus = {
  [key in modes]: {
    items: MenuItem[];
    modifiers?: string[];
  };
};

export interface Question {
  key: string;
  manual?: boolean;
  question: string;
  category?: string;
  address?: string;
  questionNumber?: number;
  originalText?: string;
  status: "submitted" | "cancelled" | "answered" | "featured";
  priority?: "high" | "medium" | "low";
}

export interface Order {
  key: string;
  manual?: boolean;
  item: string;
  modifiers?: string;
  address?: string;
  orderNumber?: number;
  originalText?: string;
  status: "queued" | "cancelled" | "ready" | "delivered";
  reminded?: true;
}

export default {
 qa: {
    items: [
      {
        title: "Technical Question",
        shortTitle: "Technical",
        description: "Questions about technical implementations, coding, or system architecture",
      },
      {
        title: "Product Question", 
        shortTitle: "Product",
        description: "Questions about Twilio products, features, or roadmap",
      },
      {
        title: "Business Question",
        shortTitle: "Business", 
        description: "Questions about business strategy, use cases, or industry insights",
      },
      {
        title: "General Question",
        shortTitle: "General",
        description: "General questions about the topic or discussion",
      },
    ],
    modifiers: ["Urgent", "Follow-up", "Beginner", "Advanced"],
  },
  panel: {
    items: [
      {
        title: "Panel Discussion Topic",
        shortTitle: "Discussion",
        description: "Questions for panel discussion participants",
      },
      {
        title: "Industry Insight Question",
        shortTitle: "Industry",
        description: "Questions about industry trends and insights",
      },
      {
        title: "Experience Question",
        shortTitle: "Experience",
        description: "Questions about personal experiences or case studies",
      },
    ],
    modifiers: ["High Priority", "Time Sensitive", "Research Related"],
  },
  interview: {
    items: [
      {
        title: "Career Question",
        shortTitle: "Career",
        description: "Questions about career advice or professional development",
      },
      {
        title: "Technical Deep Dive",
        shortTitle: "Deep Dive",
        description: "In-depth technical questions for expert discussion",
      },
      {
        title: "Personal Question",
        shortTitle: "Personal",
        description: "Questions about the interviewee's background or journey",
      },
    ],
    modifiers: ["Must Ask", "Time Permitting", "Audience Favorite"],
  },
} as Menus;
