"use client";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Award, Check, Globe2, HeartHandshake, Laptop, MessagesSquare, Sparkles, Users } from "lucide-react";
import { useLang } from "./LangProvider";
import { Counter, Reveal, RevealImage, SectionHead, Wrap, ease } from "./ui";
import { img } from "@/lib/images";

export function About() {
  const { t } = useLang();
  const a = t.about;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <Wrap className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative order-2 mx-auto w-full max-w-lg lg:order-1">
          <RevealImage src={img.aboutMain} alt="Teacher leading a lesson with young pupils" parallax={8} sizes="(min-width:1024px) 34vw, 90vw" className="aspect-[4/5] w-[82%] rounded-[2.4rem] shadow-soft" />
          <motion.div style={{ y: y2 }} className="absolute -bottom-10 right-0 w-[48%]">
            <RevealImage src={img.aboutSmall} alt="Two smiling pupils in school uniform" delay={0.25} sizes="(min-width:1024px) 20vw, 45vw" className="aspect-square rounded-[1.8rem] shadow-soft ring-[6px] ring-bg" />
          </motion.div>
          <Reveal delay={0.4} className="absolute -left-3 top-10 sm:-left-8">
            <div className="float rounded-2xl bg-brand p-5 text-white shadow-soft">
              <Sparkles className="text-gold" size={22} />
              <p className="mt-3 font-display text-xl leading-tight">{a.badge}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">{a.motto}</p>
            </div>
          </Reveal>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHead eyebrow={a.eyebrow} title={a.title} />
          <Reveal delay={0.1}><p className="mt-7 text-lg leading-relaxed text-fg-2">{a.p1}</p></Reveal>
          <Reveal delay={0.18}><p className="mt-4 leading-relaxed text-muted">{a.p2}</p></Reveal>
          <ul className="mt-9 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {a.points.map((p, i) => (
              <Reveal key={p} delay={0.15 + i * 0.07}>
                <li className="flex items-start gap-3 font-semibold text-fg">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-brand-ink"><Check size={14} strokeWidth={3} /></span>{p}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  );
}

export function StatsBand() {
  const { t } = useLang();
  return (
    <section className="grain relative overflow-hidden bg-brand py-16 text-white sm:py-20">
      <div className="dots pointer-events-none absolute inset-0 opacity-40" />
      <Wrap className="relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {t.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="border-white/15 px-2 text-center lg:border-l lg:first:border-l-0">
            <div className="font-display text-5xl font-medium text-gold sm:text-6xl"><Counter to={s.value} suffix={s.suffix} /></div>
            <div className="mx-auto mt-2 max-w-[12rem] text-sm text-white/70">{s.label}</div>
          </Reveal>
        ))}
      </Wrap>
    </section>
  );
}

const progImgs = [img.nursery, img.primary, img.secAnglo, img.secFranco];
const progSlugs = ["nursery", "primary", "secondary-anglophone", "secondary-francophone"];
export function Programs() {
  const { t } = useLang();
  const p = t.programs;
  return (
    <section id="programs" className="bg-bg-2 py-24 sm:py-32">
      <Wrap>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead eyebrow={p.eyebrow} title={p.title} />
          <Reveal className="max-w-sm"><p className="text-muted">{p.sub}</p></Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {p.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a href={`/programs/${progSlugs[i]}`} className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-surface ring-1 ring-line transition-[box-shadow,transform] duration-500 hover:-translate-y-2 hover:shadow-soft">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={progImgs[i]} alt={it.title} fill sizes="(min-width:1280px) 22vw, (min-width:640px) 45vw, 90vw" className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 to-transparent" />
                  <span className="absolute left-5 top-5 font-display text-5xl font-medium text-white/90">0{i + 1}</span>
                  <span className="absolute bottom-4 left-5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">{it.age}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-medium text-fg">{it.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{it.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {it.tags.map((g) => <span key={g} className="rounded-full bg-bg-2 px-3 py-1 text-[11px] font-semibold text-fg-2">{g}</span>)}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-2 dark:text-gold">
                    {p.more}<ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function Bilingual() {
  const { t } = useLang();
  const b = t.bilingual;
  const [side, setSide] = useState<"en" | "fr">("en");
  const list = side === "en" ? b.enList : b.frList;
  return (
    <section id="bilingual" className="grain relative overflow-hidden bg-brand-ink py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-brand-2/40 blur-[140px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-gold/15 blur-[100px]" />
      <Wrap className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHead light eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
          <Reveal delay={0.2}>
            <div className="mt-10 inline-flex rounded-full bg-white/[.07] p-1.5 ring-1 ring-white/15" role="tablist" aria-label="Language track">
              {(["en", "fr"] as const).map((s) => (
                <button key={s} role="tab" aria-selected={side === s} onClick={() => setSide(s)} className="relative rounded-full px-7 py-3 text-sm font-bold">
                  {side === s && <motion.span layoutId="bpill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  <span className={`relative transition-colors ${side === s ? "text-brand-ink" : "text-white/80"}`}>{b.tabs[s]}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-[2.4rem] ring-1 ring-white/10">
            <div className="relative aspect-[16/10]">
              <Image src={img.bilingual} alt="Smiling pupils in a classroom" fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />
            </div>
            <div className="relative -mt-28 p-7 sm:-mt-32 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div key={side} initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20, filter: "blur(6px)" }} transition={{ duration: 0.45, ease }}>
                  <p className="font-display text-3xl italic text-gold sm:text-4xl">{b.greet[side]}</p>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {list.map((x, i) => (
                      <motion.li key={x} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                        className="flex items-center gap-3 rounded-2xl bg-white/[.06] px-4 py-3.5 text-sm font-semibold ring-1 ring-white/10 backdrop-blur">
                        <MessagesSquare size={18} className="shrink-0 text-gold" />{x}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}

const whyIcons = [Award, Users, Laptop, HeartHandshake, Globe2, MessagesSquare];
export function Why() {
  const { t } = useLang();
  return (
    <section className="py-24 sm:py-32">
      <Wrap>
        <SectionHead center eyebrow={t.why.eyebrow} title={t.why.title} />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((it, i) => {
            const I = whyIcons[i];
            return (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <motion.div whileHover="hover" className="group relative h-full overflow-hidden rounded-[1.8rem] bg-surface p-8 ring-1 ring-line">
                  <motion.div variants={{ hover: { scale: 1, opacity: 1 } }} initial={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.6, ease }}
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-2xl" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand text-gold transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <I size={24} />
                  </span>
                  <h3 className="relative mt-7 font-display text-2xl font-medium text-fg">{it.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-muted">{it.desc}</p>
                  <span className="absolute right-7 top-7 font-display text-sm text-muted/60">0{i + 1}</span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
