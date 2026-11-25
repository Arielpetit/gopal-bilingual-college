import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Admissions, FAQ } from "@/components/More";
import { KeyDates, Fees } from "@/components/PageSections";

export const metadata: Metadata = pageMeta("Admissions", "How to apply to Gopal: steps, required documents, key dates and fees.", "/admissions");

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
