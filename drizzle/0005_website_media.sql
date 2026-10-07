CREATE TYPE "public"."media_type" AS ENUM('image', 'video');--> statement-breakpoint
CREATE TABLE "website_media_versions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slot_key" varchar(180) NOT NULL,
  "media_type" "media_type" NOT NULL,
  "secure_url" varchar(1000) NOT NULL,
  "public_id" varchar(500) NOT NULL,
  "alt_text" varchar(300),
  "width" integer,
  "height" integer,
  "duration" integer,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "is_current" boolean DEFAULT true NOT NULL
);--> statement-breakpoint
CREATE INDEX "website_media_slot_current_idx" ON "website_media_versions" USING btree ("slot_key","is_current");