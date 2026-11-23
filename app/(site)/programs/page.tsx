import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Programs, Bilingual } from "@/components/Sections";
import { GradCTA, FAQ } from "@/components/More";

export const metadata: Metadata = { title: "Programs · Gopal Bilingual International College", description: "Nursery, primary and secondary programs in the Anglophone and Francophone sub-systems." };

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
