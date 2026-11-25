import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Programs, Bilingual } from "@/components/Sections";
import { GradCTA, FAQ } from "@/components/More";

export const metadata: Metadata = pageMeta("Programs", "Nursery, primary and secondary programs in the Anglophone and Francophone sub-systems: GCE, BEPC, Probatoire and Baccalauréat.", "/programs");

export default function Page() {
  return (
    <>
      <PageHero page="programs" />
      <Programs head={false} />
      <Bilingual />
      <FAQ />
      <GradCTA />
    </>
  );
}
