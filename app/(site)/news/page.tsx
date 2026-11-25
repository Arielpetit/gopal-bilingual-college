import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { News, GradCTA } from "@/components/More";

export const metadata: Metadata = pageMeta("News & events", "Announcements, events and stories from Gopal Bilingual International College.", "/news");

export default function Page() {
  return (
    <>
      <PageHero page="news" />
      <News head={false} limit={6} />
      <GradCTA />
    </>
  );
}
