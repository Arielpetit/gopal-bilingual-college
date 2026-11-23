import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Facilities from "@/components/Facilities";
import { Location } from "@/components/PageSections";
import { GradCTA } from "@/components/More";

export const metadata: Metadata = { title: "Campus · Gopal Bilingual International College", description: "Classrooms, laboratories, library and sports facilities in Bastos, Yaoundé." };

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
