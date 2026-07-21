import type { NewDbReview } from "@/db/schema";
import { db } from "@/db/db";
import { reviews } from "@/db/schema";

const reviewSeeds = [
  {
    id: "10326a78-1e6f-405d-874d-37467b3922aa",
    name: "Mrs. Ama Owusu",
    location: "Tema, Greater Accra",
    services: ["Borehole Drilling"],
    rating: 5,
    message:
      "They found water where two other companies failed. The survey team was upfront about the cost before any drilling started, and the whole job wrapped in three days. Clean work, no mess left behind.",
    date: "June 2026",
    verified: true,
  },
  {
    id: "06c42f4a-3bc4-4ec0-a6b3-e28eb0c9fc15",
    name: "Aisha Mensah",
    title: "Operations Director \u2014 Green Farms Ghana",
    location: "Kumasi, Ashanti Region",
    services: ["Borehole Rehabilitation"],
    rating: 5,
    message:
      "Our farm needed a commercial-grade solution fast. Precise, timely, and the water testing report came back cleaner than what we were getting from our old source. Exceeded expectations.",
    date: "May 2026",
    verified: true,
  },
  {
    id: "b01ca3ad-0081-4412-8f90-e2c9130f2fda",
    name: "David Osei",
    title: "Facilities Manager \u2014 Tamale",
    location: "Tamale, Northern Region",
    services: ["Pump Installation"],
    rating: 4,
    message:
      "Consultation to completion felt seamless. The solar pump took a couple of extra days to arrive but the crew stayed in touch the whole time. School now has consistent water daily.",
    date: "April 2026",
    verified: true,
  },
  {
    id: "28a4167d-305a-4a75-aba0-ca6dc43d3f7a",
    name: "Kwabena Asante",
    location: "Takoradi, Western Region",
    services: ["Borehole Rehabilitation"],
    rating: 5,
    message:
      "Our old borehole had gone muddy and low-yield for over a year. They cleaned and re-developed it in a single visit \u2014 flow is better now than when it was first drilled.",
    date: "April 2026",
    verified: true,
  },
  {
    id: "544eca82-42e2-459e-aad2-49a62fe01a2f",
    name: "Grace Adjei",
    location: "East Legon, Accra",
    services: ["Borehole Drilling"],
    rating: 5,
    message:
      "Licensed, insured, and it showed. They explained every step and never once tried to upsell us on things we didn't need. 220ft and clear water at a strong flow rate.",
    date: "March 2026",
    verified: true,
  },
  {
    id: "d89a11db-1c98-4f83-9806-4969307f0cab",
    name: "Samuel Boateng",
    title: "Site Supervisor \u2014 Sunyani",
    location: "Sunyani, Bono Region",
    services: ["Pump Installation"],
    rating: 4,
    message:
      "Good installation work and the submersible pump has run without issue for months. Only reason it's not five stars is the initial quote took a few days longer than promised.",
    date: "March 2026",
    verified: true,
  },
  {
    id: "a08d039e-59e3-48cc-9a05-359ea821bfd5",
    name: "Efua Darko",
    location: "Cape Coast, Central Region",
    services: ["Geological Survey"],
    rating: 5,
    message:
      "Paid for the survey alone before deciding whether to drill. Report was detailed, easy to understand, and confirmed exactly what they predicted once drilling began weeks later.",
    date: "February 2026",
    verified: true,
  },
  {
    id: "cdb55877-d7c5-4b35-afce-e6da451df041",
    name: "Yaw Mensah",
    location: "Koforidua, Eastern Region",
    services: ["Hydro-fracturing"],
    rating: 4,
    message:
      "Our original borehole had weak yield from day one. The hydro-fracturing treatment noticeably improved flow. Would have liked a bit more communication mid-project, but the result speaks for itself.",
    date: "February 2026",
    verified: false,
  },
  {
    id: "cc1943d1-7a4f-4d78-96d9-45648a4a4817",
    name: "Comfort Nyarko",
    title: "Facilities Coordinator \u2014 St. Peter's Parish",
    location: "Ho, Volta Region",
    services: ["Borehole Drilling"],
    rating: 5,
    message:
      "Church project \u2014 300ft depth plus a 5,000L tank. No more water bills for the compound and the congregation is thrilled. Professional crew from start to finish.",
    date: "January 2026",
    verified: true,
  },
  {
    id: "c7036c70-5e67-4c75-9b5f-d5d939b4b7f8",
    name: "Isaac Appiah",
    location: "Wa, Upper West Region",
    services: ["Borehole Rehabilitation"],
    rating: 5,
    message:
      "Iron levels in our old well were unbearable. Their filtration system fixed it completely \u2014 water finally looks and tastes the way it should.",
    date: "January 2026",
    verified: true,
  },
  {
    id: "6c9a8210-160c-4590-bdc2-659158d316cc",
    name: "Abena Frimpong",
    location: "Obuasi, Ashanti Region",
    services: ["Pump Installation"],
    rating: 3,
    message:
      "The pump itself works fine, but there was a scheduling mix-up that pushed our install back a week. Support team made it right in the end, just wish it had gone smoother.",
    date: "December 2025",
    verified: true,
  },
  {
    id: "d4eb9f74-35ca-44d4-baff-2ab3e751f54f",
    name: "Kofi Amoah",
    title: "Site Manager \u2014 Tarkwa Mining Camp",
    location: "Tarkwa, Western Region",
    services: ["Borehole Drilling"],
    rating: 5,
    message:
      "Mining camp needed reliable water fast. They mobilized within a week, hit water at 180ft, and the whole crew worked long days to hit our deadline. Exactly the reliability we needed.",
    date: "December 2025",
    verified: true,
  },
  {
    id: "3acbfae3-b768-478d-9de5-768d688cdbef",
    name: "Linda Sarpong",
    title: "Estate Manager \u2014 Techiman Residences",
    location: "Techiman, Bono East Region",
    services: ["Borehole Rehabilitation"],
    rating: 4,
    message:
      "Rehab work on a 15-year-old borehole. Yield is back up and they gave us a realistic estimate of how many more years we can expect from it. Honest assessment, fair price.",
    date: "November 2025",
    verified: true,
  },
  {
    id: "11e3fde5-f6b2-4ea5-b010-382e49f2c381",
    name: "Emmanuel Tetteh",
    location: "Nungua, Greater Accra",
    services: ["Geological Survey"],
    rating: 5,
    message:
      "Survey confirmed water on the second attempted site after our first plot came back unsuitable. Appreciated that they told us the truth instead of drilling somewhere they knew would fail.",
    date: "November 2025",
    verified: true,
  },
] satisfies NewDbReview[];

export async function seedReviews() {
  await db
    .insert(reviews)
    .values(reviewSeeds)
    .onConflictDoNothing({ target: reviews.id });
}
