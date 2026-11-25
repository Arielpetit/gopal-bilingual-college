import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";

export const metadata: Metadata = pageMeta("Contact", "Visit, call or message Gopal Bilingual International College in Bastos, Yaoundé.", "/contact");

export default function Page() {
  return (
    <>
      <PageHero page="contact" />
      <Contact head={false} />
    </>
  );
}
