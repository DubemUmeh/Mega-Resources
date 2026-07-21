import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

/* ------------------------------------------------------------------ */
/*  Add these alongside your existing `wishes` / `images` / `admins`   */
/*  tables in schema.ts. Nothing here touches those.                   */
/* ------------------------------------------------------------------ */

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "approved",
  "rejected",
]);

export const portfolioStatusEnum = pgEnum("portfolio_status", [
  "draft",
  "published",
]);

export const propertyTypeEnum = pgEnum("property_type", [
  "residential",
  "commercial",
  "institutional",
  "agricultural",
]);

export const contactMethodEnum = pgEnum("contact_method", [
  "call",
  "whatsapp",
  "email",
]);

/* ---------------------------------- Contact form submissions ------- */
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  location: varchar("location", { length: 150 }),
  services: jsonb("services").$type<string[]>().default([]).notNull(),
  message: varchar("message", { length: 2000 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ------------------------------------------ Quote requests --------- */
export const quoteRequests = pgTable("quote_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  email: varchar("email", { length: 150 }),
  region: varchar("region", { length: 60 }).notNull(),
  services: jsonb("services").$type<string[]>().default([]).notNull(),
  propertyType: propertyTypeEnum("property_type")
    .notNull()
    .default("residential"),
  contactMethod: contactMethodEnum("contact_method").notNull().default("call"),
  message: varchar("message", { length: 2000 }),
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ------------------------------------------------------- Reviews --- */
export const reviews = pgTable("reviews", {
  id: varchar("id", { length: 40 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  title: varchar("title", { length: 150 }),
  location: varchar("location", { length: 150 }).notNull(),
  services: jsonb("services").$type<string[]>().default([]).notNull(),
  rating: integer("rating").notNull(),
  message: varchar("message", { length: 1000 }).notNull(),
  date: varchar("date", { length: 40 }),
  status: reviewStatusEnum("status").notNull().default("pending"),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ----------------------------------------------------- Portfolio --- */
export const portfolioProjects = pgTable("portfolio_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 150 }).notNull(),
  location: varchar("location", { length: 150 }).notNull(),
  region: varchar("region", { length: 60 }).notNull(),
  service: varchar("service", { length: 80 }).notNull(),
  depth: varchar("depth", { length: 30 }),
  yieldRate: varchar("yield_rate", { length: 30 }),
  duration: varchar("duration", { length: 30 }),
  year: varchar("year", { length: 10 }),
  img: varchar("img", { length: 500 }).notNull(),
  imgPublicId: varchar("img_public_id", { length: 255 }),
  gallery: jsonb("gallery").$type<string[]>().default([]),
  isVideo: boolean("is_video").default(false),
  summary: varchar("summary", { length: 1000 }).notNull(),
  status: portfolioStatusEnum("status").notNull().default("draft"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* Drizzle-inferred types, same convention as your DbWish/DbImage */
export type DbContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewDbContactSubmission = typeof contactSubmissions.$inferInsert;
export type DbQuoteRequest = typeof quoteRequests.$inferSelect;
export type NewDbQuoteRequest = typeof quoteRequests.$inferInsert;
export type DbReview = typeof reviews.$inferSelect;
export type NewDbReview = typeof reviews.$inferInsert;
export type DbPortfolioProject = typeof portfolioProjects.$inferSelect;
export type NewDbPortfolioProject = typeof portfolioProjects.$inferInsert;
