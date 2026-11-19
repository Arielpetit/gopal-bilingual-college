"use client";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { SectionHead, Wrap } from "./ui";
import { img } from "@/lib/images";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Life() {
  const { t } = useLang();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useIso(() => {
    const measure = () => {
      const d = matchMedia("(min-width: 1024px)").matches;
      setDesktop(d);
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const sx = useSpring(x, { stiffness: 90, damping: 24, mass: 0.4 });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const cards = t.life.items.map((label, i) => (
    <motion.figure key={i} className={`group relative shrink-0 snap-center overflow-hidden rounded-[2rem] ${i % 3 === 0 ? "h-[26rem] w-[19rem] sm:h-[30rem] sm:w-[26rem] lg:h-[34rem] lg:w-[30rem]" : "h-[26rem] w-[16rem] sm:h-[30rem] sm:w-[20rem] lg:h-[34rem] lg:w-[23rem]"}`}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: (i % 4) * 0.08 }}>
      <Image src={img.life[i]} alt={label} fill sizes="(min-width:1024px) 30rem, 80vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
        <span className="font-display text-2xl text-white sm:text-3xl">{label}</span>
        <span className="font-display text-sm text-gold">0{i + 1}</span>
      </figcaption>
    </motion.figure>
  ));

  return (
    <section id="life" ref={section} className="relative bg-bg" style={desktop ? { height: `calc(100vh + ${dist}px)` } : undefined}>
      <div className={desktop ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24 sm:py-32"}>
        <Wrap className="flex items-end justify-between gap-6">
          <SectionHead eyebrow={t.life.eyebrow} title={t.life.title} />
          <p className="hidden shrink-0 text-sm text-muted lg:block">{t.life.sub}</p>
        </Wrap>
        <motion.div ref={track} style={desktop ? { x: sx } : undefined}
          className={`mt-12 flex gap-5 px-4 sm:px-8 lg:mt-14 lg:w-max lg:px-10 ${desktop ? "" : "no-scrollbar snap-x snap-mandatory overflow-x-auto pb-4"}`}>
          {cards}
        </motion.div>
        {desktop && (
          <Wrap className="mt-10">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-line"><motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gold" /></div>
          </Wrap>
        )}
      </div>
    </section>
  );
}
