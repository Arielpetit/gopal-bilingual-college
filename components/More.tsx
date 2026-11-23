"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, FileText, Phone, Plus, Quote } from "lucide-react";
import { useLang } from "./LangProvider";
import { Magnetic, Reveal, RevealImage, SectionHead, SplitText, Wrap, btn, ease } from "./ui";
import { img } from "@/lib/images";
import { school } from "@/lib/content";

export function Admissions({ head = true }: { head?: boolean }) {
  const { t } = useLang();
  const a = t.admissions;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  return (
    <section id="admissions" className={`bg-bg-2 ${head ? "py-24 sm:py-32" : "py-16 sm:py-24"}`}>
      <Wrap>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            {head && <SectionHead eyebrow={a.eyebrow} title={a.title} sub={a.sub} />}
            <div ref={ref} className={`relative ${head ? "mt-14" : ""} pl-12 sm:pl-16`}>
              <div className="absolute bottom-6 left-[19px] top-6 w-[2px] bg-line sm:left-[23px]">
                <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-gold" />
              </div>
              {a.steps.map((s, i) => (
                <Reveal key={i} delay={i * 0.08} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-12 grid h-10 w-10 place-items-center rounded-full bg-brand font-display text-lg text-gold ring-[6px] ring-bg-2 sm:-left-16 sm:h-12 sm:w-12">{i + 1}</span>
                  <h3 className="pt-1.5 font-display text-2xl font-medium text-fg">{s.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-muted">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <RevealImage src={img.admissions} alt="Pupils in a classroom" parallax={6} sizes="(min-width:1024px) 38vw, 92vw" className="aspect-[4/3.4] rounded-[2rem] shadow-soft" />
            <Reveal delay={0.1}>
              <div className="rounded-[2rem] bg-brand p-7 text-white sm:p-9">
                <h3 className="flex items-center gap-3 font-display text-2xl"><FileText className="text-gold" size={22} />{a.docs}</h3>
                <ul className="mt-6 space-y-3">
                  {a.docsList.map((d) => <li key={d} className="flex items-center gap-3 text-white/85"><Check size={16} className="text-gold" />{d}</li>)}
                </ul>
                <a href="/apply" className="group mt-8 flex items-center justify-between gap-3 rounded-2xl bg-gold px-5 py-4 text-brand-ink transition hover:brightness-105">
                  <span><span className="block font-bold">{a.applyOnline}</span><span className="block text-xs opacity-75">{a.applyNote}</span></span>
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

export function Voices() {
  const { t } = useLang();
  const v = t.voices;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d: number) => { setDir(d); setI((p) => (p + d + v.items.length) % v.items.length); };
  useEffect(() => {
    const id = setTimeout(() => go(1), 7000);
    return () => clearTimeout(id);
  });
  const item = v.items[i];
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Wrap>
        <SectionHead eyebrow={v.eyebrow} title={v.title} />
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.8fr_1.4fr]">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <AnimatePresence mode="popLayout" custom={dir}>
              <motion.div key={i} className="absolute inset-0 overflow-hidden rounded-[2.4rem] shadow-soft"
                initial={{ clipPath: dir > 0 ? "inset(0 0 0 100% round 2.4rem)" : "inset(0 100% 0 0 round 2.4rem)" }}
                animate={{ clipPath: "inset(0 0 0 0% round 2.4rem)" }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.9, ease }}>
                <Image src={img.avatars[i]} alt="" fill sizes="(min-width:1024px) 24rem, 80vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="absolute -right-4 -top-4 z-10 grid h-16 w-16 place-items-center rounded-full bg-gold text-brand-ink shadow-soft"><Quote size={26} /></span>
          </div>
          <div>
            <AnimatePresence mode="wait">
              <motion.blockquote key={`${i}-${t.voices.title}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5, ease }}>
                <p className="font-display text-2xl font-normal leading-[1.3] text-fg sm:text-4xl">“{item.quote}”</p>
                <footer className="mt-8">
                  <p className="font-bold text-fg">{item.name}</p>
                  <p className="text-sm text-muted">{item.role}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-10 flex items-center gap-4">
              <button onClick={() => go(-1)} aria-label="Previous" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-line transition hover:bg-fg hover:text-bg"><ChevronLeft size={20} /></button>
              <button onClick={() => go(1)} aria-label="Next" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-line transition hover:bg-fg hover:text-bg"><ChevronRight size={20} /></button>
              <div className="ml-2 flex gap-2">
                {v.items.map((_, k) => (
                  <span key={k} className="h-1 w-10 overflow-hidden rounded-full bg-line">
                    {k === i && <motion.span key={i} className="block h-full origin-left bg-gold" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 7, ease: "linear" }} />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

export function GradCTA() {
  const { t } = useLang();
  const g = t.grad;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [48, 24]);
  return (
    <section ref={ref} className="px-3 sm:px-5">
      <motion.div style={{ scale, borderRadius: radius }} className="relative mx-auto max-w-[90rem] overflow-hidden">
        <motion.div style={{ y }} className="absolute -inset-y-[20%] inset-x-0">
          <Image src={img.graduation} alt="Graduates in caps and gowns" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/95 via-brand-ink/75 to-brand-ink/30" />
        <div className="relative px-6 py-24 sm:px-14 sm:py-32 lg:px-20 lg:py-40">
          <SplitText as="h2" text={g.title} className="block max-w-3xl font-display text-4xl font-medium leading-[1.05] text-white sm:text-6xl" />
          <Reveal delay={0.2}><p className="mt-6 max-w-xl text-lg text-white/75">{g.sub}</p></Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <Magnetic><a href="/apply" className={btn.gold}>{g.cta}<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></a></Magnetic>
            <Magnetic><a href={`tel:${school.phone.replace(/\s/g, "")}`} className={`${btn.ghost} text-white`}><Phone size={18} />{g.call}</a></Magnetic>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

export function News({ limit = 3, more = false, head = true }: { limit?: number; more?: boolean; head?: boolean }) {
  const { t } = useLang();
  return (
    <section className={head ? "py-24 sm:py-32" : "py-16 sm:py-24"}>
      <Wrap>
        {head && <SectionHead eyebrow={t.news.eyebrow} title={t.news.title} />}
        <div className={`${head ? "mt-14" : ""} grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3`}>
          {t.news.items.slice(0, limit).map((n, i) => (
            <Reveal key={i} delay={(i % 3) * 0.1}>
              <a href="/contact" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem]">
                  <Image src={img.news[i % img.news.length]} alt="" fill sizes="(min-width:768px) 30vw, 92vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-bold text-fg backdrop-blur">{n.tag}</span>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-muted">{n.date}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug text-fg">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">{n.title}</span>
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-2 dark:text-gold">{t.news.read}<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </a>
            </Reveal>
          ))}
        </div>
        {more && <Reveal className="mt-12 text-center"><Link href="/news" className={btn.brand}>{t.pages.seeNews}<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link></Reveal>}
      </Wrap>
    </section>
  );
}

export function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-bg-2 py-24 sm:py-32">
      <Wrap className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="space-y-3">
          {t.faq.items.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className={`overflow-hidden rounded-[1.4rem] transition-colors duration-300 ${on ? "bg-surface shadow-soft ring-1 ring-line" : "bg-surface/50 ring-1 ring-line"}`}>
                  <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="font-display text-lg text-fg sm:text-xl">{f.q}</span>
                    <motion.span animate={{ rotate: on ? 45 : 0, backgroundColor: on ? "var(--gold)" : "var(--line)" }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-fg">
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                        <p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
