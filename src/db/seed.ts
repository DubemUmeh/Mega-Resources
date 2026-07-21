import { seedReviews } from "./seed/reviews";

const seeders = [
  { name: "reviews", run: seedReviews },
];

async function main() {
  for (const seeder of seeders) {
    await seeder.run();
    console.log(`Seeded ${seeder.name}`);
  }
}

main().catch((error) => {
  console.error("Database seed failed:", error);
  process.exit(1);
});
