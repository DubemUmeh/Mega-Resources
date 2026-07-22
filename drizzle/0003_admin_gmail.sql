CREATE TYPE "admin_role" AS ENUM ('SUPER_ADMIN', 'ADMIN');

CREATE TABLE "authorized_admins" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "google_email" varchar(150) NOT NULL UNIQUE,
  "name" varchar(120) NOT NULL,
  "role" "admin_role" DEFAULT 'ADMIN' NOT NULL,
  "active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

INSERT INTO "authorized_admins" ("google_email", "name", "role", "active")
VALUES ('raphaelumeh21@gmail.com', 'Super Admin', 'SUPER_ADMIN', true)
ON CONFLICT ("google_email") DO NOTHING;

CREATE TABLE "admin_sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "admin_id" uuid NOT NULL REFERENCES "authorized_admins"("id") ON DELETE cascade,
  "token_hash" varchar(64) NOT NULL UNIQUE,
  "expires_at" timestamp NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "google_oauth_tokens" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "admin_id" uuid NOT NULL UNIQUE REFERENCES "authorized_admins"("id") ON DELETE cascade,
  "google_email" varchar(150) NOT NULL,
  "access_token" varchar(2000) NOT NULL,
  "refresh_token" varchar(2000),
  "scope" varchar(1000),
  "expires_at" timestamp NOT NULL,
  "revoked_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "business_settings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "business_name" varchar(150) DEFAULT 'Mega Resources LTD' NOT NULL,
  "business_email" varchar(150) DEFAULT '' NOT NULL,
  "phone" varchar(40) DEFAULT '' NOT NULL,
  "address" varchar(300) DEFAULT '' NOT NULL,
  "logo_url" varchar(500) DEFAULT '' NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "gmail_message_metadata" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "gmail_message_id" varchar(120) NOT NULL UNIQUE,
  "handled" boolean DEFAULT false NOT NULL,
  "handled_by" uuid REFERENCES "authorized_admins"("id") ON DELETE set null,
  "handled_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL
);
