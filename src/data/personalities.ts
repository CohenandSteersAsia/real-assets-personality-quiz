import type { AssetClass, PersonalityContent } from "../types/quiz";

// PROVISIONAL / [PLACEHOLDER] result and education copy. Replace after approval.
export const personalities: Record<AssetClass, PersonalityContent> = {
  "real-estate": {
    id: "real-estate",
    assetClassName: "Listed Real Estate",
    personalityName: "The Evergreen",
    tagline: "The best things keep earning their place.",
    traits: ["Enduring", "Relevant", "Grounded", "Evolving"],
    shortDescription: "You value staying power without standing still.",
    longDescription:
      "You are drawn to things that prove their usefulness over time, while evolving when people’s needs do. Novelty alone does not impress you; lasting relevance does.",
    educationalContent: {
      title: "Why this connects with Listed Real Estate",
      body: "[PLACEHOLDER] Listed real estate includes income-producing property businesses that must remain relevant as the ways people live, work, shop, travel, store goods, consume data and age evolve.",
    },
    artwork: {
      hero: "placeholders/real-estate.svg",
      alt: "Abstract illustration of layered architectural forms and leaves",
    },
    cta: { label: "Continue exploring real assets", href: "#education" },
  },
  infrastructure: {
    id: "infrastructure",
    assetClassName: "Listed Infrastructure",
    personalityName: "The Backbone",
    tagline: "Quietly essential. Consistently there.",
    traits: ["Reliable", "Organised", "Consistent", "Essential"],
    shortDescription:
      "You appreciate the systems that help everything else work.",
    longDescription:
      "Dependable, organised and steady, you naturally notice how the pieces connect. You find satisfaction in making sure people can rely on what matters every day.",
    educationalContent: {
      title: "Why this connects with Listed Infrastructure",
      body: "[PLACEHOLDER] Listed infrastructure businesses own and/or operate essential systems and networks on which society depends.",
    },
    artwork: {
      hero: "placeholders/infrastructure.svg",
      alt: "Abstract illustration of an interconnected structural network",
    },
    cta: { label: "Continue exploring real assets", href: "#education" },
  },
  commodities: {
    id: "commodities",
    assetClassName: "Commodities",
    personalityName: "The Adapter",
    tagline: "Ready when the conditions change.",
    traits: ["Adaptive", "Alert", "Flexible", "Responsive"],
    shortDescription: "You read the room, adjust and keep moving.",
    longDescription:
      "Alert and flexible, you are comfortable responding as circumstances evolve. You pay attention to what conditions are telling you and do not cling to a plan after the world has changed.",
    educationalContent: {
      title: "Why this connects with Commodities",
      body: "[PLACEHOLDER] Commodities are physical raw materials whose conditions of supply and demand can change as the world around them changes.",
    },
    artwork: {
      hero: "placeholders/commodities.svg",
      alt: "Abstract illustration of shifting mineral shapes and orbiting forms",
    },
    cta: { label: "Continue exploring real assets", href: "#education" },
  },
  "natural-resources": {
    id: "natural-resources",
    assetClassName: "Natural Resource Equities",
    personalityName: "The Resourceful Provider",
    tagline: "Making what is available matter.",
    traits: ["Resourceful", "Practical", "Productive", "Driven"],
    shortDescription:
      "You make effective use of what is available to provide what is needed.",
    longDescription:
      "Practical and productive, you take stock of the resources at hand and work out how to deliver something useful. You are less interested in perfect conditions than in making progress with what is real.",
    educationalContent: {
      title: "Why this connects with Natural Resource Equities",
      body: "[PLACEHOLDER] Natural resource equities represent companies involved in extracting, producing and/or processing resources across areas such as energy, metals and mining, and agriculture.",
    },
    artwork: {
      hero: "placeholders/natural-resources.svg",
      alt: "Abstract illustration of a sun, field lines and resource forms",
    },
    cta: { label: "Continue exploring real assets", href: "#education" },
  },
};
