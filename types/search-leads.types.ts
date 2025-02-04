export enum SearchCategory {
  COMPANY = "COMPANY",
  PEOPLE = "PEOPLE",
  ARTICLES = "ARTICLES",
  RESEARCH = "RESEARCH",
  OTHER = "OTHER",
}

export const CATEGORY_MAPPING: { [key: string]: SearchCategory } = {
  Companies: SearchCategory.COMPANY,
  People: SearchCategory.PEOPLE,
  Articles: SearchCategory.ARTICLES,
  Research: SearchCategory.RESEARCH,
  Other: SearchCategory.OTHER,
};

type SocialPatterns =
  | "email"
  | "instagram"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "whatsapp"
  | "snapchat"
  | "reddit"
  | "medium"
  | "github";

// Exclude 'email' from social platforms since it's handled separately

export interface ScrapeResult {
  domain: string;
  title?: string;
  description?: string;
  email?: string[];
  phone?: string[];
  social_links: Partial<Record<SocialPatterns, string[]>>;
  emailTemplate?: string;
}

export interface SearchLeadsResponse {
  message?: string | undefined;
  query: string;
  data: ScrapeResult[];
  totalDomains: number;
  successfulCrawls: number;
  totalTimeMs: number;
}

export interface SearchJobResponse {
  query: string;
  result: SearchLeadsResponse | null;
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
