import { z } from "zod";

export const LeadStatus = z.enum(["HOT", "WARM", "WATCHING", "NEW"]);
export const LeadUrgency = z.enum([
  "CALL TODAY",
  "CALL THIS WEEK",
  "FOLLOW UP",
  "MONITOR",
]);
export const TrafficTrend = z.enum(["up", "down", "flat"]);

export const LeadSchema = z.object({
  company: z.string(),
  industry: z.string(),
  location: z.string(),
  score: z.number().min(0).max(100),
  status: LeadStatus,
  urgency: LeadUrgency,
  signals: z.object({
    email: z.boolean(),
    website: z.boolean(),
    meta: z.boolean(),
  }),
  emailOpened: z.boolean(),
  emailClicked: z.boolean(),
  clickedLinks: z.array(z.string()),
  websiteVisits: z.number(),
  pagesViewed: z.array(z.string()),
  topPage: z.string(),
  lastSeen: z.string(),
  instagramSessions: z.number(),
  aiContext: z.string(),
  aiRecommendation: z.string(),
});

export const ProductStatSchema = z.object({
  product: z.string(),
  views: z.number(),
  uniqueCompanies: z.number(),
  trend: TrafficTrend,
  trendPercent: z.number(),
});

export const TrafficSourceSchema = z.object({
  source: z.string(),
  sessions: z.number(),
  percent: z.number(),
});

export const WeeklyIntelligenceDataSchema = z.object({
  weekOf: z.string(),
  processedAt: z.string(),
  sourcesIncluded: z.array(z.string()),
  summary: z.object({
    weeklyInsight: z.string(),
    topOpportunity: z.string(),
    craigCallScript: z.string(),
  }),
  stats: z.object({
    email: z.object({
      campaignName: z.string(),
      openRate: z.number(),
      clickRate: z.number(),
      topClickedLink: z.string(),
      totalOpens: z.number(),
      uniqueClicks: z.number(),
    }),
    website: z.object({
      totalSessions: z.number(),
      uniqueCompanies: z.number(),
      topPage: z.string(),
      avgSessionsPerCompany: z.number(),
    }),
    meta: z.object({
      instagramSessions: z.number(),
      instagramPercent: z.number(),
      topDrivingPost: z.string(),
      instagramLandingPage: z.string(),
    }),
  }),
  leads: z.array(LeadSchema),
  productStats: z.array(ProductStatSchema),
  trafficSources: z.array(TrafficSourceSchema),
});

export type Lead = z.infer<typeof LeadSchema>;
export type ProductStat = z.infer<typeof ProductStatSchema>;
export type TrafficSource = z.infer<typeof TrafficSourceSchema>;
export type WeeklyIntelligenceData = z.infer<typeof WeeklyIntelligenceDataSchema>;

export type WeeklyIntelligenceRow = {
  id: string;
  week_of: string;
  uploaded_by: string | null;
  uploaded_at: string;
  data: WeeklyIntelligenceData;
};

export type WeeklyIntelligenceListRow = {
  id: string;
  week_of: string;
  uploaded_at: string;
  uploaded_by: string | null;
  uploaded_by_name?: string | null;
};

export type Recipient = { name: string; email: string };
