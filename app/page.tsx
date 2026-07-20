import Hero from "@/components/home/hero";
import ProblemSolution from "@/components/home/problem-solution";
import Services from "@/components/home/services";
import HowItWorks from "@/components/home/how-it-works";
import WhyChooseUs from "@/components/home/why-choose-us";
import Projects from "@/components/home/projects";
import Pricing from "@/components/home/pricing";
import Testimonials from "@/components/home/testimonials";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/faq";

export default function HomePage() {
  return (
    <main className="text-white font-sans min-h-screen selection:bg-gray-800 selection:text-white">
      <Hero />
      <section className="relative overflow-hidden bg-background/80">
        <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_10%_10%,rgba(255,205,112,0.16),transparent_38%),radial-gradient(circle_at_90%_20%,rgba(255,184,142,0.14),transparent_40%)]" />
        <ProblemSolution />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <Projects />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </section>
    </main>
  );
}