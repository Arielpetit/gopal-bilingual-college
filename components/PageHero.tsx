"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useLang } from "./LangProvider";
import { Eyebrow, Wrap, ease } from "./ui";
import { img } from "@/lib/images";

type Key = "about" | "programs" | "campus" | "admissions" | "news" | "contact";

/** Cinematic page header with photo, breadcrumb and word-by-word title reveal. */
export default function PageHero({ page }: { page: Key }) {
  const { t, lang } = useLang();
  const h = t.pages[page];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  return (
    <section ref={ref} className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-brand-ink sm:min-h-[32rem] lg:min-h-[36rem]">
      <motion.div style={{ y }} className="absolute inset-0 -z-10" initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, ease }}>
        <Image src={img.page[page]} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink via-brand-ink/70 to-brand-ink/30" />
      <div className="dots absolute inset-0 -z-10 opacity-30 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
      <Wrap className="w-full pb-12 pt-32 text-white sm:pb-16 sm:pt-40">
        <motion.div style={{ opacity: fade }}>
          <motion.nav initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease }} aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs font-semibold text-white/70">
            <Link href="/" className="transition hover:text-gold">{t.pages.home}</Link><ChevronRight size={13} /><span className="text-gold">{h.eyebrow}</span>
          </motion.nav>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6"><Eyebrow light>{h.eyebrow}</Eyebrow></motion.p>
          <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {h.title.split(" ").map((w, i) => (
              <span key={`${lang}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.35 + i * 0.06 }}>{w}&nbsp;</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease }} className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">{h.sub}</motion.p>
        </motion.div>
      </Wrap>
    </section>
  );
}
