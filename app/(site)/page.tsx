import Hero from "@/components/Hero";
import { About, StatsBand, Programs, Bilingual, Why } from "@/components/Sections";
import { Voices, GradCTA, News } from "@/components/More";

export default function Home() {
  return (
    <>
      <Hero />
      <About more />
      <StatsBand />
      <Programs more />
      <Bilingual />
      <Why />
      <Voices />
      <GradCTA />
      <News more />
    </>
  );
}
