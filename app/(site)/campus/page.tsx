import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import Facilities from "@/components/Facilities";
import { Location } from "@/components/PageSections";
import { GradCTA } from "@/components/More";

export const metadata: Metadata = pageMeta("Campus", "Classrooms, laboratories, library and sports facilities in Bastos, Yaoundé.", "/campus");

export default function Page() {
  return (
    <>
      <PageHero page="campus" />
      <Facilities head={false} />
      <Location />
      <GradCTA />
    </>
  );
}
