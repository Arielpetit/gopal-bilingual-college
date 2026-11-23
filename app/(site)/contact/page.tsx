import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";

export const metadata: Metadata = { title: "Contact · Gopal Bilingual International College", description: "Visit, call or message Gopal Bilingual International College in Bastos, Yaoundé." };

export default function Page() {
  return (
    <>
      <PageHero page="contact" />
      <Contact head={false} />
    </>
  );
}
