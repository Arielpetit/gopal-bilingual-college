import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz", "SOFT"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · Yaoundé`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} · Yaoundé`,
    description: "Two languages. One bright future. English and French education in Bastos, Yaoundé, from nursery to GCE A Level and Baccalauréat.",
    url: "/",
    siteName: SITE.name,
    type: "website",
    locale: "en_CM",
    alternateLocale: ["fr_CM"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · Yaoundé`,
    description: "Two languages. One bright future. English and French education in Bastos, Yaoundé.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5ee" },
    { media: "(prefers-color-scheme: dark)", color: "#07110d" },
  ],
};

// Runs before paint so the saved theme and language never flash.
const boot = `(function(){try{var t=localStorage.getItem('gbic-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');var l=localStorage.getItem('gbic-lang');if(l)document.documentElement.lang=l;}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${fraunces.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
