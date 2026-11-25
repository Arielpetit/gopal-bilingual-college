import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ApplyForm from "@/components/ApplyForm";

export const metadata: Metadata = pageMeta("Apply online", "Online admission form for Gopal Bilingual International College, Yaoundé. Nursery, primary and secondary (Anglophone and Francophone).", "/apply");

export default function ApplyPage() {
  return <ApplyForm />;
}
