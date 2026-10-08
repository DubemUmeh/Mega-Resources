export type ServiceType =
  | "Geological Surveys"
  | "Borehole Drilling"
  | "Air Lifting / Developing"
  | "Pumping Tests"
  | "Water Quality Analysis"
  | "Pump Installation"
  | "Borehole Rehabilitation"
  | "Hydro-fracturing"
  | "Piezometer Drilling"
  | "Observation Wells"
  | "Dewatering Wells"
  | "Horizontal Drain Drilling";

export const SERVICE_TYPES: ServiceType[] = [
  "Geological Surveys",
  "Borehole Drilling",
  "Air Lifting / Developing",
  "Pumping Tests",
  "Water Quality Analysis",
  "Pump Installation",
  "Borehole Rehabilitation",
  "Hydro-fracturing",
  "Piezometer Drilling",
  "Observation Wells",
  "Dewatering Wells",
  "Horizontal Drain Drilling",
];

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  name: string;
  title?: string; // optional role/company, e.g. "Operations Director — Green Farms Ghana"
  location: string;
  services: ServiceType[]; // a review can cover more than one service performed on the same job
  rating: number; // 1–5
  message: string;
  date: string; // display string, e.g. "March 2026"
  status: ReviewStatus;
}

export interface ReviewState {
  message: string | null;
  errors: Partial<
    Record<
      "name" | "title" | "location" | "service" | "rating" | "message",
      string[]
    >
  >;
  success: boolean;
  newReview?: Review;
}

/* ---------------------------------------------------------------------- */
/*  Portfolio / Projects                                                  */
/* ---------------------------------------------------------------------- */

export type PortfolioService =
  | "Geological Surveys"
  | "Borehole Drilling"
  | "Air Lifting / Developing"
  | "Pumping Tests"
  | "Water Quality Analysis"
  | "Pump Installation"
  | "Borehole Rehabilitation"
  | "Hydro-fracturing"
  | "Piezometer Drilling"
  | "Observation Wells"
  | "Dewatering Wells"
  | "Horizontal Drain Drilling";

export const PORTFOLIO_SERVICES: PortfolioService[] = [
  "Geological Surveys",
  "Borehole Drilling",
  "Air Lifting / Developing",
  "Pumping Tests",
  "Water Quality Analysis",
  "Pump Installation",
  "Borehole Rehabilitation",
  "Hydro-fracturing",
  "Piezometer Drilling",
  "Observation Wells",
  "Dewatering Wells",
  "Horizontal Drain Drilling",
];

export type Region =
  | "Greater Accra"
  | "Ashanti"
  | "Northern"
  | "Western"
  | "Eastern"
  | "Central";

export const REGIONS: Region[] = [
  "Greater Accra",
  "Ashanti",
  "Northern",
  "Western",
  "Eastern",
  "Central",
];

export type PortfolioStatus = "published" | "draft";

export interface Portfolio {
  id: string;
  slug?: string;
  title: string;
  location: string;
  region: Region;
  service: PortfolioService;
  depth: string;
  yieldRate: string;
  duration: string;
  year: string;
  img: string;
  imgPublicId?: string;
  gallery?: string[];
  isVideo?: boolean;
  summary: string;
  status: PortfolioStatus;
  featured: boolean;
  createdAt: string; // ISO date, used for sorting in admin
}

export interface PortfolioFormErrors {
  slug?: string[];
  title?: string[];
  location?: string[];
  region?: string[];
  service?: string[];
  depth?: string[];
  yieldRate?: string[];
  duration?: string[];
  year?: string[];
  img?: string[];
  summary?: string[];
}
