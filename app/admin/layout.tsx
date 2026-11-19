import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions dashboard · Gopal Bilingual International College",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-svh bg-bg">{children}</div>;
}
