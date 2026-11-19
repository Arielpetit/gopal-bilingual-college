"use client";
import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, delay = 0, className = "", y = 32 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  );
}

/** Splits a line into words that rise from behind a mask. */
export function SplitText({ text, className = "", delay = 0, stagger = 0.05, as = "span" }: { text: string; className?: string; delay?: number; stagger?: number; as?: "span" | "h2" | "h3" }) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Tag ref={ref as never} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={`${text}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: seen ? 0 : "110%" }}
            transition={{ duration: 0.9, ease, delay: delay + i * stagger }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] ${light ? "text-gold" : "text-brand-2 dark:text-gold"}`}>
      <span className="h-px w-10 bg-current opacity-70" />{children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, sub, light = false, center = false, className = "" }: { eyebrow: string; title: string; sub?: string; light?: boolean; center?: boolean; className?: string }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal><Eyebrow light={light}>{eyebrow}</Eyebrow></Reveal>
      <SplitText as="h2" text={title} className={`mt-4 block font-display text-[2.1rem] font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem] ${light ? "text-white" : "text-fg"}`} />
      {sub && <Reveal delay={0.15}><p className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${center ? "mx-auto" : ""} ${light ? "text-white/70" : "text-muted"}`}>{sub}</p></Reveal>}
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{v}{suffix}</span>;
}

export const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[84rem] px-4 sm:px-8 lg:px-10 ${className}`}>{children}</div>
);

/** Image that unveils with a clip-path wipe and settles from a slight zoom; optional scroll parallax. */
export function RevealImage({ src, alt, className = "", sizes = "100vw", parallax = 0, priority = false, delay = 0 }: { src: string; alt: string; className?: string; sizes?: string; parallax?: number; priority?: boolean; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 1.2, ease, delay }}>
      <motion.div className="absolute -inset-y-[12%] inset-x-0" style={{ y: parallax ? y : 0 }}
        initial={{ scale: 1.25 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease, delay }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/** Button/link that leans toward the pointer. */
export function Magnetic({ children, className = "", strength = 0.3 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={`inline-block ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

export const btn = {
  gold: "group inline-flex items-center justify-center gap-2.5 rounded-full bg-gold px-7 py-4 text-[15px] font-bold text-brand-ink shadow-[0_12px_30px_-10px] shadow-gold/60 transition-[transform,box-shadow] duration-300 hover:shadow-[0_18px_40px_-10px] hover:shadow-gold/70 active:scale-[.97]",
  ghost: "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[15px] font-semibold ring-1 ring-current/25 transition hover:bg-current/[.06] active:scale-[.97]",
  brand: "group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-4 text-[15px] font-bold text-white transition hover:bg-brand-2 active:scale-[.97]",
};
