import { getRandomApprovedReviews } from "@/db/actions/reviews";
import TestimonialsClient from "./testimonials-client";

export default async function Testimonials() {
  const shuffled = await getRandomApprovedReviews(5);

  return (
    <TestimonialsClient
      testimonials={shuffled.map((review) => ({
        quote: review.message,
        name: review.name,
        title: `${review.title ? `${review.title} — ` : ""}${review.location}`,
        img: "/icons/android-chrome-512x512.png",
      }))}
    />
  );
}
