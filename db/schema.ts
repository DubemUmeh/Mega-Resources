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

export const adminRoleEnum = pgEnum("admin_role", ["SUPER_ADMIN", "ADMIN"]);

export const authorizedAdmins = pgTable("authorized_admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  googleEmail: varchar("google_email", { length: 150 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  role: adminRoleEnum("role").notNull().default("ADMIN"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminSessions = pgTable("admin_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  adminId: uuid("admin_id").notNull().references(() => authorizedAdmins.id, { onDelete: "cascade" }),
  tokenHash: varchar("token_hash", { length: 64 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const googleOAuthTokens = pgTable("google_oauth_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  adminId: uuid("admin_id").notNull().references(() => authorizedAdmins.id, { onDelete: "cascade" }).unique(),
  googleEmail: varchar("google_email", { length: 150 }).notNull(),
  accessToken: varchar("access_token", { length: 2000 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 2000 }),
  scope: varchar("scope", { length: 1000 }),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const businessSettings = pgTable("business_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessName: varchar("business_name", { length: 150 }).notNull().default("Mega Resources LTD"),
  businessEmail: varchar("business_email", { length: 150 }).notNull().default(""),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  address: varchar("address", { length: 300 }).notNull().default(""),
  logoUrl: varchar("logo_url", { length: 500 }).notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const gmailMessageMetadata = pgTable("gmail_message_metadata", {
  id: uuid("id").primaryKey().defaultRandom(),
  gmailMessageId: varchar("gmail_message_id", { length: 120 }).notNull().unique(),
  handled: boolean("handled").notNull().default(false),
  handledBy: uuid("handled_by").references(() => authorizedAdmins.id, { onDelete: "set null" }),
  handledAt: timestamp("handled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type DbAuthorizedAdmin = typeof authorizedAdmins.$inferSelect;
export type DbBusinessSettings = typeof businessSettings.$inferSelect;
