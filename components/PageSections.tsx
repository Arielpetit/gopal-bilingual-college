"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Compass, Heart, Languages, MapPin, ShieldCheck, Sparkles, Target, Telescope, Trophy } from "lucide-react";
import { useLang } from "./LangProvider";
import { Magnetic, Reveal, RevealImage, SectionHead, Wrap, btn, ease } from "./ui";
import { img } from "@/lib/images";

export function Mission() {
  const { t } = useLang();
  const m = t.pages.mission;
  const cards = [
    { I: Target, h: m.mission, p: m.missionText },
    { I: Telescope, h: m.vision, p: m.visionText },
  ];
  return (
    <section className="py-16 sm:py-24">
      <Wrap className="grid gap-5 md:grid-cols-2">
        {cards.map(({ I, h, p }, i) => (
          <Reveal key={h} delay={i * 0.1}>
            <div className={`relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-10 ${i === 0 ? "bg-brand text-white" : "bg-gold text-brand-ink"}`}>
              <div className="dots pointer-events-none absolute inset-0 opacity-30" />
              <I size={30} className={`relative ${i === 0 ? "text-gold" : "text-brand"}`} />
              <h3 className="relative mt-6 font-display text-3xl sm:text-4xl">{h}</h3>
              <p className={`relative mt-4 max-w-md text-lg leading-relaxed ${i === 0 ? "text-white/80" : "text-brand-ink/80"}`}>{p}</p>
            </div>
          </Reveal>
        ))}
      </Wrap>
    </section>
  );
}

const valueIcons = [Trophy, ShieldCheck, Languages, Heart];
export function Values() {
  const { t } = useLang();
  const v = t.pages.values;
  return (
    <section className="bg-bg-2 py-24 sm:py-32">
      <Wrap>
        <SectionHead center eyebrow={v.eyebrow} title={v.title} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {v.items.map((it, i) => {
            const I = valueIcons[i];
            return (
              <Reveal key={it.title} delay={i * 0.08}>
                <div className="group h-full rounded-[1.8rem] bg-surface p-7 ring-1 ring-line transition duration-500 hover:-translate-y-1.5 hover:shadow-soft">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-gold transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"><I size={24} /></span>
                  <h3 className="mt-6 font-display text-2xl text-fg">{it.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{it.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}

export function Location() {
  const { t } = useLang();
  const l = t.pages.location;
  return (
    <section className="py-24 sm:py-32">
      <Wrap className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead eyebrow={l.eyebrow} title={l.title} />
          <Reveal delay={0.1}><p className="mt-6 text-lg leading-relaxed text-muted">{l.text}</p></Reveal>
          <Reveal delay={0.18}>
            <a href="https://www.google.com/maps/search/?api=1&query=Bastos%20Yaound%C3%A9" target="_blank" rel="noopener" className={`${btn.brand} mt-8`}>
              <MapPin size={18} />{t.contact.labels.address}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-line">
            <iframe title="Map: Bastos, Yaoundé" loading="lazy" className="h-[22rem] w-full border-0 sm:h-[26rem] dark:opacity-80 dark:invert-[.9] dark:hue-rotate-180"
              src="https://www.openstreetmap.org/export/embed.html?bbox=11.505%2C3.885%2C11.535%2C3.905&layer=mapnik" />
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function KeyDates() {
  const { t } = useLang();
  const p = t.pages;
  return (
    <section className="py-16 sm:py-24">
      <Wrap className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <Reveal><span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-2 dark:text-gold"><span className="h-px w-10 bg-current opacity-70" />{t.pages.timeline}</span></Reveal>
          <Reveal delay={0.08}><h2 className="mt-4 font-display text-4xl leading-tight text-fg sm:text-5xl">{p.timeline}</h2></Reveal>
          <Reveal delay={0.16}><p className="mt-4 text-sm text-muted">{p.datesNote}</p></Reveal>
        </div>
        <ol className="space-y-3">
          {p.dates.map((d, i) => (
            <Reveal key={d.d} delay={i * 0.08}>
              <li className="flex items-center gap-5 rounded-2xl bg-surface p-5 ring-1 ring-line transition hover:ring-gold">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gold/15 text-brand-2 dark:text-gold"><CalendarDays size={22} /></span>
                <span><span className="block font-display text-xl text-fg">{d.d}</span><span className="block text-sm text-muted">{d.t}</span></span>
              </li>
            </Reveal>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

export function Fees() {
  const { t } = useLang();
  const p = t.pages;
  return (
    <section className="px-3 pb-16 sm:px-5 sm:pb-24">
      <Reveal>
        <div className="relative mx-auto grid max-w-[84rem] items-center gap-8 overflow-hidden rounded-[2rem] bg-brand p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_auto]">
          <div className="dots pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative">
            <Sparkles className="text-gold" />
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">{p.feesTitle}</h2>
            <p className="mt-3 max-w-2xl text-white/75">{p.feesText}</p>
          </div>
          <Magnetic className="relative">
            <a href="/contact" className={btn.gold}><Compass size={18} />{p.feesCta}</a>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  );
}

/** Large photo + caption strip used between sections on the About page. */
export function Banner() {
  const { t } = useLang();
  return (
    <section className="px-3 sm:px-5">
      <div className="relative mx-auto aspect-[16/8] max-w-[84rem] overflow-hidden rounded-[2rem] sm:aspect-[16/6]">
        <RevealImage src={img.bilingual} alt="Pupils at Gopal" parallax={10} sizes="100vw" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/80 to-transparent" />
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="absolute bottom-6 left-6 max-w-md font-display text-2xl text-white sm:bottom-10 sm:left-10 sm:text-4xl">{t.footer.tagline}</motion.p>
      </div>
    </section>
  );
}
