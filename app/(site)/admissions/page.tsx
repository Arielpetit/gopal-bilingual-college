import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Admissions, FAQ } from "@/components/More";
import { KeyDates, Fees } from "@/components/PageSections";

export const metadata: Metadata = { title: "Admissions · Gopal Bilingual International College", description: "How to apply to Gopal: steps, documents, key dates and fees." };

export default function Page() {
  return (
    <>
      <PageHero page="admissions" />
      <Admissions head={false} />
      <KeyDates />
      <Fees />
      <FAQ />
    </>
  );
}
