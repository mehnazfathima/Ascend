import { SiteNav } from "@/components/marketing/site-nav";
import { Hero } from "@/components/marketing/hero";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { ExplanationSection } from "@/components/marketing/explanation-section";
import { KnowledgeMapPreview } from "@/components/marketing/knowledge-map-preview";
import { CtaSection } from "@/components/marketing/cta-section";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function LandingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <FeatureGrid />
        <ExplanationSection />
        <KnowledgeMapPreview />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
