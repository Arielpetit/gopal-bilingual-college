"use client";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, Languages, GraduationCap, Users } from "lucide-react";
import { useRef } from "react";
import { useLang } from "./LangProvider";
import { Counter, Magnetic, Wrap, btn, ease } from "./ui";
import { img } from "@/lib/images";

export default function Hero() {
  const { t, lang } = useLang();
  const h = t.hero;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // pointer parallax for the collage
  const mx = useMotionValue(0), my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 }), py = useSpring(my, { stiffness: 60, damping: 18 });
  const l1x = useTransform(px, (v) => v * 14), l1y = useTransform(py, (v) => v * 14);
  const l2x = useTransform(px, (v) => v * -24), l2y = useTransform(py, (v) => v * -24);

  const word = (w: string, i: number, base: number, accent = false) => (
    <span key={`${lang}-${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span className={`inline-block ${accent ? "italic text-brand dark:text-gold" : ""}`}
        initial={{ y: "115%", rotate: 4 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1.1, ease, delay: base + i * 0.08 }}>
        {w}&nbsp;
      </motion.span>
    </span>
  );

  return (
    <section id="top" ref={ref} className="grain relative isolate overflow-hidden bg-bg pt-28 sm:pt-32 lg:min-h-[100svh]"
      onPointerMove={(e) => { if (e.pointerType !== "mouse") return; mx.set(e.clientX / innerWidth - 0.5); my.set(e.clientY / innerHeight - 0.5); }}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-gold/25 blur-[120px] dark:bg-gold/10" />
        <div className="absolute -right-20 -top-20 h-[36rem] w-[36rem] rounded-full bg-brand-2/25 blur-[130px] dark:bg-brand-2/30" />
        <div className="dots absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_65%)]" />
      </div>

      <Wrap className="grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-surface/70 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-fg-2 ring-1 ring-line backdrop-blur">
            <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">New</span>
            {h.eyebrow}
          </motion.span>

          <h1 className="mt-7 font-display text-[3.1rem] font-medium leading-[0.98] tracking-[-0.02em] text-fg sm:text-7xl xl:text-[5.6rem]">
            <span className="block">{h.words.map((w, i) => word(w, i, 0.2))}</span>
            <span className="relative block">
              {h.words2.map((w, i) => word(w, i, 0.45, i > 0))}
              <svg className="absolute -bottom-3 left-0 h-4 w-[70%] text-gold sm:-bottom-4" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                <motion.path key={lang} d="M2 9C60 3 140 2 298 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.1, ease }} />
              </svg>
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.8 }}
            className="mt-9 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{h.sub}</motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.95 }} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic><a href="/apply" className={btn.gold}>{h.apply}<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></a></Magnetic>
            <Magnetic><a href="#contact" className={`${btn.ghost} text-fg`}><CalendarDays size={18} />{h.tour}</a></Magnetic>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }} className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-line">
            {t.stats.slice(0, 3).map((s) => (
              <div key={s.label} className="px-3 first:pl-0 sm:px-4">
                <div className="font-display text-3xl font-medium text-fg sm:text-4xl"><Counter to={s.value} suffix={s.suffix} /></div>
                <div className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Collage */}
        <motion.div style={{ y: yImg }} className="relative mx-auto aspect-[4/4.6] w-full max-w-[34rem]">
          <motion.div style={{ x: l1x, y: l1y }} className="absolute right-0 top-0 h-[82%] w-[74%]">
            <motion.div className="relative h-full w-full overflow-hidden rounded-[2.2rem] shadow-soft"
              initial={{ clipPath: "inset(100% 0 0 0 round 2.2rem)" }} animate={{ clipPath: "inset(0% 0 0 0 round 2.2rem)" }} transition={{ duration: 1.4, ease, delay: 0.3 }}>
              <motion.div className="absolute inset-0" initial={{ scale: 1.35 }} animate={{ scale: 1 }} transition={{ duration: 2, ease, delay: 0.3 }}>
                <Image src={img.heroMain} alt="Students listening attentively in class" fill priority sizes="(min-width:1024px) 30vw, 80vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/50 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div style={{ x: l2x, y: l2y }} className="absolute bottom-0 left-0 h-[48%] w-[46%]">
            <motion.div className="relative h-full w-full overflow-hidden rounded-[1.8rem] shadow-soft ring-[6px] ring-bg"
              initial={{ clipPath: "inset(0 100% 0 0 round 1.8rem)" }} animate={{ clipPath: "inset(0 0% 0 0 round 1.8rem)" }} transition={{ duration: 1.3, ease, delay: 0.7 }}>
              <Image src={img.heroGrad} alt="Graduate smiling in cap and gown" fill priority sizes="(min-width:1024px) 18vw, 45vw" className="object-cover" />
            </motion.div>
          </motion.div>

          {/* Rotating badge */}
          <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, ease, delay: 1.1 }}
            className="absolute left-[4%] top-[6%] grid h-28 w-28 place-items-center rounded-full bg-gold text-brand-ink shadow-soft sm:h-32 sm:w-32">
            <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
              <defs><path id="circ" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" /></defs>
              <text fontSize="8.2" fontWeight="700" letterSpacing="1.6" fill="currentColor">
                <textPath href="#circ">ADMISSIONS 2026 • INSCRIPTIONS 2026 • </textPath>
              </text>
            </svg>
            <GraduationCap size={30} />
          </motion.div>

          <FloatCard className="-left-2 top-[46%] sm:-left-8" delay={1.3} icon={<Languages size={16} />} text={h.card1} />
          <FloatCard className="-right-6 bottom-[10%] hidden sm:block" delay={1.5} icon={<Users size={16} />} text={h.card3} slow />
        </motion.div>
      </Wrap>

      {/* Marquee */}
      <div className="pause-hover relative border-y border-line bg-surface/50 py-5 backdrop-blur">
        <div className="marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[...t.marquee, ...t.marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl text-fg-2 sm:text-3xl">
              <span className={i % 2 ? "italic" : ""}>{m}</span><span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatCard({ className, icon, text, delay, slow }: { className: string; icon: React.ReactNode; text: string; delay: number; slow?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay, duration: 0.9, ease }} className={`absolute ${className}`}>
      <div className={`float flex items-center gap-2.5 rounded-2xl bg-surface/85 px-4 py-3 text-[13px] font-bold text-fg shadow-soft ring-1 ring-line backdrop-blur-xl ${slow ? "[animation-delay:-3s] [animation-duration:7s]" : ""}`}>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-gold">{icon}</span>{text}
      </div>
    </motion.div>
  );
}
