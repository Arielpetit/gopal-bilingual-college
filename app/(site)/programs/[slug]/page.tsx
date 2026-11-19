import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { enabledPrograms, getProgram } from "@/lib/programs";
import ProgramView from "@/components/ProgramView";

export function generateStaticParams() {
  return enabledPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p) return {};
  return { title: `${p.content.en.title} · Gopal Bilingual International College`, description: p.content.en.intro };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProgram(slug)) notFound();
  return <ProgramView slug={slug} />;
}
