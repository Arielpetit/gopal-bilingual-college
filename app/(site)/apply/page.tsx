import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";

export const metadata: Metadata = {
  title: "Apply online · Gopal Bilingual International College",
  description: "Online admission form for Gopal Bilingual International College, Yaoundé. Nursery, primary and secondary (Anglophone and Francophone).",
};

export default function ApplyPage() {
  return <ApplyForm />;
}
