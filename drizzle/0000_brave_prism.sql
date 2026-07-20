CREATE TYPE "public"."contact_method" AS ENUM('call', 'whatsapp', 'email');--> statement-breakpoint
CREATE TYPE "public"."portfolio_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('residential', 'commercial', 'institutional', 'agricultural');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(150) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"location" varchar(150),
	"services" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"message" varchar(2000) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(150) NOT NULL,
	"location" varchar(150) NOT NULL,
	"region" varchar(60) NOT NULL,
	"service" varchar(80) NOT NULL,
	"depth" varchar(30),
	"yield_rate" varchar(30),
	"duration" varchar(30),
	"year" varchar(10),
	"img" varchar(500) NOT NULL,
	"img_public_id" varchar(255),
	"gallery" jsonb DEFAULT '[]'::jsonb,
	"is_video" boolean DEFAULT false,
	"summary" varchar(1000) NOT NULL,
	"status" "portfolio_status" DEFAULT 'draft' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"email" varchar(150),
	"region" varchar(60) NOT NULL,
	"services" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"property_type" "property_type" DEFAULT 'residential' NOT NULL,
	"contact_method" "contact_method" DEFAULT 'call' NOT NULL,
	"message" varchar(2000),
	"consent" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"title" varchar(150),
	"location" varchar(150) NOT NULL,
	"services" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rating" integer NOT NULL,
	"message" varchar(1000) NOT NULL,
	"status" "review_status" DEFAULT 'pending' NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
