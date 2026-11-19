"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";

const Svg = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden><path d={d} /></svg>;
const Facebook = () => <Svg d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V14h2.7v8z" />;
const Instagram = () => <Svg d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3m0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6m6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0M21.9 8c-.1-1.6-.4-3-1.6-4.2S17.6 2.2 16 2.1C14.4 2 9.6 2 8 2.1 6.4 2.2 5 2.5 3.8 3.7S2.2 6.4 2.1 8C2 9.6 2 14.4 2.1 16c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.4 0-8" />;
const Youtube = () => <Svg d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8M9.7 15.5v-7l6 3.5z" />;
import { useRef } from "react";
import { school } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Crest } from "./Brand";
import { Wrap } from "./ui";

export default function Footer() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const socials = [
    { I: Facebook, href: school.socials.facebook, label: "Facebook" },
    { I: Instagram, href: school.socials.instagram, label: "Instagram" },
    { I: Youtube, href: school.socials.youtube, label: "YouTube" },
  ];
  return (
    <>
      <footer ref={ref} className="grain relative mt-24 overflow-hidden bg-brand-ink pt-20 text-white/70 sm:mt-32">
        <Wrap className="relative">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3"><Crest className="h-12 w-12" /><p className="font-display text-2xl text-white">{school.name}</p></div>
              <p className="mt-5 font-display text-xl italic text-gold">{t.footer.tagline}</p>
              <div className="mt-7 flex gap-2">
                {socials.map(({ I, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/15 transition hover:bg-gold hover:text-brand-ink"><I /></a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">{t.footer.links}</p>
              <ul className="mt-5 space-y-3">{t.nav.map((n) => <li key={n.href}><a href={n.href} className="transition hover:text-gold">{n.label}</a></li>)}</ul>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">{t.footer.contact}</p>
              <p className="pt-2">{school.address}</p><p>{school.phone}</p><p>{school.email}</p>
              <a href="/#top" className="!mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 font-semibold text-white transition hover:bg-gold hover:text-brand-ink"><ArrowUp size={16} />{t.footer.top}</a>
            </div>
          </div>
          <div className="mt-16 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row">
            <p>© 2026 {school.name}. {t.footer.rights}</p>
            <p className="text-white/40">{t.footer.note} · <a href="/admin" className="underline-offset-4 hover:text-gold hover:underline">Staff</a></p>
          </div>
        </Wrap>
        <motion.p style={{ y }} aria-hidden className="pointer-events-none mt-6 select-none whitespace-nowrap text-center font-display text-[24vw] font-semibold leading-[0.75] tracking-tighter text-white/[.05]">
          Gopal
        </motion.p>
      </footer>
      <motion.a href={`https://wa.me/${school.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle size={26} className="relative" />
      </motion.a>
    </>
  );
}
