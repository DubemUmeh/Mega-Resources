import HeroClient from "./hero-client";
import { getResolvedMedia } from "@/lib/media";

export default async function Hero() {
  const media = await getResolvedMedia("homepage.hero");
  return <HeroClient media={media} />;
}
