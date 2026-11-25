import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { enabledPrograms } from "@/lib/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/programs", "/campus", "/admissions", "/news", "/contact", "/apply"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...enabledPrograms.map((p) => ({ url: `${SITE.url}/programs/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
