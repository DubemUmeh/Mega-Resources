import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(150),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  location: z.string().trim().max(150).optional(),
  services: z.array(z.string()).max(10).optional().default([]),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});
export type ContactFormData = z.infer<typeof contactSchema>;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(150)
    .optional()
    .or(z.literal("")),
  region: z.string().trim().min(2, "Please select your region").max(60),
  services: z
    .array(z.string())
    .min(1, "Please select at least one service")
    .max(10),
  propertyType: z.enum([
    "residential",
    "commercial",
    "institutional",
    "agricultural",
  ]),
  contactMethod: z.enum(["call", "whatsapp", "email"]),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, {
    message: "Please confirm you're okay with us contacting you.",
  }),
});
export type QuoteFormData = z.infer<typeof quoteSchema>;

export const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  title: z.string().trim().max(150).optional(),
  location: z
    .string()
    .trim()
    .min(2, "Please tell us your city or region")
    .max(150),
  services: z
    .array(z.string())
    .min(1, "Please select at least one service")
    .max(10),
  rating: z.number().int().min(1).max(5),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few more words about your experience")
    .max(1000, "Reviews must be under 1000 characters"),
});
export type ReviewFormData = z.infer<typeof reviewSchema>;

export const portfolioSchema = z.object({
  slug: z.string().trim().max(180).optional(),
  title: z.string().trim().min(2).max(150),
  location: z.string().trim().min(2).max(150),
  region: z.string().trim().min(2).max(60),
  service: z.string().trim().min(2).max(80),
  depth: z.string().trim().max(30).optional(),
  yieldRate: z.string().trim().max(30).optional(),
  duration: z.string().trim().max(30).optional(),
  year: z.string().trim().max(10).optional(),
  img: z
    .string()
    .url("Image is required")
    .max(500, "Please upload the cover image before saving."),
  imgPublicId: z.string().max(255).optional(),
  gallery: z.array(z.string().url()).optional().default([]),
  isVideo: z.boolean().optional().default(false),
  summary: z.string().trim().min(10).max(1000),
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().optional().default(false),
});
export type PortfolioFormData = z.infer<typeof portfolioSchema>;
