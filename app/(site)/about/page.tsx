import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { About, StatsBand, Why } from "@/components/Sections";
import { Mission, Values, Banner } from "@/components/PageSections";
import { Voices, GradCTA } from "@/components/More";

export const metadata: Metadata = { title: "About · Gopal Bilingual International College", description: "Our story, mission, values and what makes Gopal a bilingual school in Bastos, Yaoundé." };

export default function Page() {
  return (
    <>
      <PageHero page="about" />
      <About />
      <Mission />
      <Banner />
      <Values />
      <StatsBand />
      <Why />
      <Voices />
      <GradCTA />
    </>
  );
}
