export const ASSET_CLASSES = [
  "real-estate",
  "infrastructure",
  "commodities",
  "natural-resources",
] as const;

export type AssetClass = (typeof ASSET_CLASSES)[number];
export type ScoreMap = Partial<Record<AssetClass, number>>;

export interface QuizAnswer {
  id: string;
  text: string;
  scores: ScoreMap;
  primaryAssetClass?: AssetClass;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
  weight?: number;
}

export type AnswersByQuestion = Record<string, string>;

export interface QuizResult {
  primary: AssetClass;
  secondary: AssetClass | null;
  scores: Record<AssetClass, number>;
}

export interface PersonalityContent {
  id: AssetClass;
  assetClassName: string;
  personalityName: string;
  tagline: string;
  traits: string[];
  shortDescription: string;
  longDescription: string;
  educationalContent: {
    title: string;
    body: string;
  };
  artwork: {
    hero: string;
    share?: string;
    alt: string;
  };
  cta?: {
    label: string;
    href: string;
  };
}
