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
      title: "Why this connects with Listed Real Estate",
      body: "Listed REITs and property companies own and operate income-producing properties that serve how people live, work, shop, travel, store goods, consume data and age. They can also acquire, redevelop or develop properties as needs change.",
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
      title: "Why this connects with Listed Infrastructure",
      body: "Listed infrastructure businesses own and operate the essential systems society relies on every day, such as utilities, energy transport, communications towers and transport networks. Their revenues are often tied to regulated or contracted use of these long-lived assets.",
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
      title: "Why this connects with Commodities",
      body: "Commodities are physical raw materials such as energy, metals and agricultural goods. Investment exposure can be accessed through liquid market instruments such as futures, rather than shares in resource-producing companies. Prices respond to changing supply and demand.",
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
      title: "Why this connects with Natural Resource Equities",
      body: "Natural resource equities are shares in listed companies that produce and process resources such as energy, metals and agricultural goods. Unlike the raw commodities themselves, these are operating businesses whose results depend on production, demand and how well they run their assets.",
    },
    artwork: {
      hero: "placeholders/natural-resources.svg",
      alt: "Illustration of a productive resource landscape",
    },
    cta: { label: "Continue exploring real assets", href: "#education" },
  },
};
