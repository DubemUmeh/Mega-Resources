ALTER TABLE "portfolio_projects" ADD COLUMN "slug" varchar(180);
UPDATE "portfolio_projects"
SET "slug" = lower(regexp_replace(regexp_replace(coalesce("service", '') || ' ' || coalesce("location", ''), '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g')) || '-' || substr("id"::text, 1, 8)
WHERE "slug" IS NULL;
ALTER TABLE "portfolio_projects" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "portfolio_projects" ADD CONSTRAINT "portfolio_projects_slug_unique" UNIQUE("slug");
