import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { News, GradCTA } from "@/components/More";

export const metadata: Metadata = { title: "News · Gopal Bilingual International College", description: "Announcements, events and stories from Gopal Bilingual International College." };

export default function Page() {
  return (
    <>
      <PageHero page="news" />
      <News head={false} limit={6} />
      <GradCTA />
    </>
  );
}
