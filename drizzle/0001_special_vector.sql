ALTER TABLE "reviews" ALTER COLUMN "id" SET DATA TYPE varchar(40);--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "date" varchar(40);