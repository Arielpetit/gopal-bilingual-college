import Hero from "@/components/Hero";
import { About, StatsBand, Programs, Bilingual, Why } from "@/components/Sections";
import Facilities from "@/components/Facilities";
import Life from "@/components/Life";
import { Admissions, Voices, GradCTA, News, FAQ } from "@/components/More";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <StatsBand />
      <Programs />
      <Bilingual />
      <Why />
      <Facilities />
      <Life />
      <Admissions />
      <Voices />
      <GradCTA />
      <News />
      <FAQ />
      <Contact />
    </>
  );
}
