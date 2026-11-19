"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Clock, GraduationCap, Sparkles } from "lucide-react";
import { getProgram, enabledPrograms } from "@/lib/programs";
import { img } from "@/lib/images";
import { useLang } from "./LangProvider";
import { Eyebrow, Magnetic, Reveal, RevealImage, SectionHead, SplitText, Wrap, btn, ease } from "./ui";

const L = {
  en: { back: "All programs", sched: "Schedule", apply: "Apply for this level", visit: "Book a visit", classes: "Class structure", subjects: "What students learn", exams: "Exams & certificates", day: "A typical day", why: "Why families choose this section", others: "Explore other levels", note: "Details follow the national Cameroonian curriculum. Final subject offer is confirmed by the school." },
  fr: { back: "Tous les programmes", sched: "Emploi du temps", apply: "Postuler pour ce niveau", visit: "Réserver une visite", classes: "Organisation des classes", subjects: "Ce que les élèves apprennent", exams: "Examens et diplômes", day: "Une journée type", why: "Pourquoi les familles choisissent cette section", others: "Découvrir les autres niveaux", note: "Contenu conforme au programme national camerounais. L'offre finale de matières est confirmée par l'école." },
};

export default function ProgramView({ slug }: { slug: string }) {
  const { lang } = useLang();
  const p = getProgram(slug)!;
  const c = p.content[lang];
  const l = L[lang];
  const photos = img.programs[p.slug];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const others = enabledPrograms.filter((o) => o.slug !== p.slug);

  return (
    <>
      {/* Hero */}
      <section ref={ref} className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 -z-10" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease }}>
          <Image src={photos[0]} alt={c.title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink via-brand-ink/60 to-brand-ink/10" />
        <Wrap className="pb-16 pt-36 text-white sm:pb-24">
          <Link href="/#programs" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-gold"><ArrowLeft size={16} />{l.back}</Link>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease }} className="mt-8"><Eyebrow light>{c.age}</Eyebrow></motion.p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-[1] tracking-tight sm:text-7xl lg:text-8xl">
            {c.title.split(" ").map((w, i) => (
              <span key={`${lang}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.25 + i * 0.07 }}>{w}&nbsp;</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-5 font-display text-2xl italic text-gold sm:text-3xl">{c.tagline}</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease }} className="mt-9 flex flex-wrap gap-3">
            <Magnetic><Link href={`/apply?level=${p.slug}`} className={btn.gold}>{l.apply}<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link></Magnetic>
            <Magnetic><Link href="/#contact" className={`${btn.ghost} text-white`}>{l.visit}</Link></Magnetic>
          </motion.div>
        </Wrap>
      </section>

      {/* Intro + classes */}
      <section className="py-20 sm:py-28">
        <Wrap className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Reveal><p className="font-display text-xl leading-[1.5] text-fg sm:text-2xl">{c.intro}</p></Reveal>
            <div className="mt-12 grid grid-cols-2 gap-4">
              <RevealImage src={photos[1]} alt="" sizes="(min-width:1024px) 25vw, 45vw" className="aspect-[4/5] rounded-[1.6rem]" />
              <RevealImage src={photos[2]} alt="" delay={0.15} sizes="(min-width:1024px) 25vw, 45vw" className="mt-10 aspect-[4/5] rounded-[1.6rem]" />
            </div>
          </div>
          <div>
            <Reveal><h2 className="flex items-center gap-3 font-display text-3xl text-fg"><GraduationCap className="text-gold" />{l.classes}</h2></Reveal>
            <ol className="mt-8 space-y-3">
              {c.classes.map((k, i) => (
                <Reveal key={k.name} delay={i * 0.06}>
                  <li className="group flex items-center gap-5 rounded-2xl bg-surface p-5 ring-1 ring-line transition hover:ring-gold">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand font-display text-lg text-gold">{i + 1}</span>
                    <span><span className="block font-display text-xl text-fg">{k.name}</span><span className="mt-0.5 block text-sm text-muted">{k.detail}</span></span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Wrap>
      </section>

      {/* Subjects */}
      <section className="bg-bg-2 py-20 sm:py-28">
        <Wrap>
          <SectionHead eyebrow={c.subjectsTitle} title={l.subjects} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {c.subjects.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.08}>
                <div className="h-full rounded-[1.8rem] bg-surface p-7 ring-1 ring-line">
                  <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-brand-ink"><BookOpen size={20} /></span><h3 className="font-display text-2xl text-fg">{g.group}</h3></div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.items.map((s) => <li key={s} className="rounded-full bg-bg-2 px-3.5 py-1.5 text-sm font-medium text-fg-2 ring-1 ring-line">{s}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Exams + Day */}
      <section className="py-20 sm:py-28">
        <Wrap className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead eyebrow={c.examsTitle} title={l.exams} />
            <div className="mt-10 space-y-4">
              {c.exams.map((e, i) => (
                <Reveal key={e.name} delay={i * 0.08}>
                  <div className="flex gap-4 rounded-2xl bg-brand p-6 text-white">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-gold" />
                    <div><p className="font-display text-xl">{e.name}</p><p className="mt-1 text-sm text-white/70">{e.detail}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {c.highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-surface p-5 ring-1 ring-line">
                    <Sparkles size={18} className="text-gold" />
                    <p className="mt-3 font-display text-lg leading-snug text-fg">{h.title}</p>
                    <p className="mt-2 text-sm text-muted">{h.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHead eyebrow={l.sched} title={l.day} />
            <div className="relative mt-10 rounded-[2rem] bg-surface p-6 ring-1 ring-line sm:p-8">
              {c.day.map((d, i) => (
                <Reveal key={d.time} delay={i * 0.05}>
                  <div className="flex items-center gap-5 border-b border-line py-4 last:border-0">
                    <span className="flex w-20 shrink-0 items-center gap-2 font-display text-lg text-brand-2 dark:text-gold"><Clock size={15} />{d.time}</span>
                    <span className="text-fg-2">{d.activity}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted">{l.note}</p>
          </div>
        </Wrap>
      </section>

      {/* Others */}
      <section className="bg-bg-2 py-20 sm:py-28">
        <Wrap>
          <SplitText as="h2" text={l.others} className="block font-display text-4xl text-fg sm:text-5xl" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.08}>
                <Link href={`/programs/${o.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[1.8rem]">
                  <Image src={img.programs[o.slug][0]} alt="" fill sizes="(min-width:768px) 30vw, 92vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                    <div><p className="text-[11px] font-bold uppercase tracking-wider text-gold">{o.content[lang].age}</p><p className="mt-1 font-display text-2xl">{o.content[lang].title}</p></div>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-gold group-hover:text-brand-ink"><ArrowUpRight size={18} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  );
}
