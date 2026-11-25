import type { Metadata } from "next";

export const SITE = {
  name: "Gopal Bilingual International College",
  short: "GBIC",
  // Set NEXT_PUBLIC_SITE_URL to the real domain in production (e.g. https://www.gopalcollege.cm).
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3111",
  description:
    "Gopal Bilingual International College in Bastos, Yaoundé: English and French education from nursery to GCE A Level and Baccalauréat. Two languages, one bright future.",
  keywords: [
    "Gopal Bilingual International College", "bilingual school Yaoundé", "collège bilingue Yaoundé", "Bastos school",
    "GCE O Level Cameroon", "GCE A Level Yaoundé", "BEPC Probatoire Baccalauréat", "école bilingue Cameroun", "admissions Yaoundé",
  ],
};

/** Per-page metadata: title, description, canonical URL, Open Graph and Twitter card. */
export function pageMeta(title: string, description: string, path: string): Metadata {
  const full = `${title} · ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, siteName: SITE.name, type: "website", locale: "en_CM", alternateLocale: ["fr_CM"] },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
