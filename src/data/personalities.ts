import type { AssetClass, PersonalityContent } from "../types/quiz";

// PROVISIONAL COPY: approved creative direction; final marketing/compliance signoff pending.
export const personalities: Record<AssetClass, PersonalityContent> = {
  "real-estate": {
    id: "real-estate",
    assetClassName: "Listed Real Estate",
    personalityName: "The Place-Maker",
    tagline: "You know what makes a place matter.",
    traits: ["Perceptive", "Enterprising", "Grounded", "Evolving"],
    shortDescription:
      "You see the potential in places and the people who use them.",
    longDescription:
      "You have a feel for what people need from the places around them. You spot potential, appreciate what already works, and see how thoughtful changes can make somewhere even better. For you, lasting appeal comes from staying connected to how people live.",
    educationalContent: {
      title: "About Listed Real Estate",
      body: "Listed real estate consists of shares in publicly traded real estate investment trusts (REITs) and other real estate companies that own, operate or develop properties, including residential, retail, office, industrial and specialized real estate such as data centres and cell towers.",
    },
    artwork: {
      hero: "placeholders/real-estate.svg",
      alt: "Illustration of a functioning property collage",
    },
    cta: { label: "Continue exploring real assets", href: "#education" },
  },
  infrastructure: {
    id: "infrastructure",
    assetClassName: "Listed Infrastructure",
    personalityName: "The Backbone",
    tagline: "You make the everyday work.",
    traits: ["Reliable", "Organised", "Consistent", "Essential"],
    shortDescription:
      "You appreciate the systems that help everything else work.",
    longDescription:
      "Dependable, organised and steady, you naturally notice how the pieces connect. You find satisfaction in making sure people can rely on what matters every day.",
    educationalContent: {
      title: "About Listed Infrastructure",
      body: "Listed infrastructure consists of shares in publicly traded companies that own or operate essential networks and facilities, including utilities, transport, energy pipelines and communications infrastructure. These businesses often earn regulated or contracted revenues.",
    },
    artwork: {
      hero: "placeholders/infrastructure.svg",
      alt: "Illustration of a connected bridge and utilities",
    },
    cta: { label: "Continue exploring real assets", href: "#education" },
  },
  commodities: {
    id: "commodities",
    assetClassName: "Commodities",
    personalityName: "The Adapter",
    tagline: "When the world shifts, you find your next move.",
    traits: ["Adaptive", "Alert", "Flexible", "Responsive"],
    shortDescription: "You read the room, adjust and keep moving.",
    longDescription:
      "Alert and flexible, you are comfortable responding as circumstances evolve. You pay attention to what conditions are telling you and do not cling to a plan after the world has changed.",
    educationalContent: {
      title: "About Commodities",
      body: "Commodities are physical raw materials—such as energy, metals, agricultural products and livestock—whose prices are driven by global supply and demand. Investment exposure is typically obtained through liquid futures contracts rather than shares of companies.",
    },
    artwork: {
      hero: "placeholders/commodities.svg",
      alt: "Illustration of shifting raw materials",
    },
    cta: { label: "Continue exploring real assets", href: "#education" },
  },
  "natural-resources": {
    id: "natural-resources",
    assetClassName: "Natural Resource Equities",
    personalityName: "The Resourceful",
    tagline: "You turn what’s available into what’s needed.",
    traits: ["Resourceful", "Practical", "Productive", "Driven"],
    shortDescription:
      "You make effective use of what is available to provide what is needed.",
    longDescription:
      "Practical and productive, you take stock of the resources at hand and work out how to deliver something useful. You are less interested in perfect conditions than in making progress with what is real.",
    educationalContent: {
      title: "About Natural Resource Equities",
      body: "Natural resource equities are shares in publicly traded companies involved in the production or processing of raw materials, including energy, metals, mining and agriculture. Returns reflect both commodity prices and company-specific factors.",
    },
    artwork: {
      hero: "placeholders/natural-resources.svg",
      alt: "Illustration of a productive resource landscape",
    },
    cta: { label: "Continue exploring real assets", href: "#education" },
  },
};
