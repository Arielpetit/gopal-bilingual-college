import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz", "SOFT"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Gopal Bilingual International College · Yaoundé",
  description:
    "Gopal Bilingual International College, Bastos, Yaoundé. English and French education from nursery to GCE A Level and Baccalauréat.",
  openGraph: {
    title: "Gopal Bilingual International College",
    description: "Two languages. One bright future. Bastos, Yaoundé, Cameroon.",
    type: "website",
    locale: "en_CM",
    alternateLocale: "fr_CM",
  },
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
