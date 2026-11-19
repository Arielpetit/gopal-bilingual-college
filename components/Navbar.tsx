"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useLang } from "./LangProvider";
import { useTheme } from "./ThemeProvider";
import { Crest } from "./Brand";
import { ease } from "./ui";
import { school } from "@/lib/content";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    setHidden(y > 500 && y > prev && !open);
  });

  useEffect(() => {
    if (location.pathname !== "/") { setActive(""); return; }
    const ids = t.nav.map((n) => n.href.split("#")[1]);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [t.nav]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header animate={{ y: hidden && !open ? -110 : 0 }} transition={{ duration: 0.45, ease }} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className={`mx-auto flex h-14 max-w-[84rem] items-center justify-between rounded-full pl-3 pr-2 transition-all duration-500 sm:h-16 sm:pl-4 ${scrolled || open ? "bg-surface/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,.25)] ring-1 ring-line backdrop-blur-xl" : ""}`}>
          <a href="/#top" className="flex items-center gap-2.5" aria-label={school.name} onClick={() => setOpen(false)}>
            <Crest className="h-9 w-9 sm:h-10 sm:w-10" />
            <span className="leading-none">
              <span className="block font-display text-[17px] font-semibold text-fg">Gopal</span>
              <span className="mt-1 block whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.16em] text-muted sm:text-[9px] sm:tracking-[0.2em]">Bilingual Int&apos;l College</span>
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
            {t.nav.map((n) => {
              const on = active === n.href.split("#")[1];
              return (
                <a key={n.href} href={n.href} className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${on ? "text-brand-ink" : "text-fg-2 hover:text-fg"}`}>
                  {on && <motion.span layoutId="navpill" className="absolute inset-0 -z-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{n.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex rounded-full bg-fg/[.06] p-1 text-[11px] font-bold" role="group" aria-label="Language / Langue">
              {(["en", "fr"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className="relative rounded-full px-2.5 py-1.5 uppercase">
                  {lang === l && <motion.span layoutId="langpill" className="absolute inset-0 rounded-full bg-surface shadow ring-1 ring-line" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  <span className={`relative ${lang === l ? "text-fg" : "text-muted"}`}>{l}</span>
                </button>
              ))}
            </div>
            <button onClick={(e) => toggle(e)} aria-label={t.themeLabel[theme]} title={t.themeLabel[theme]}
              className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-fg/[.06] text-fg transition hover:bg-fg/10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ y: 18, rotate: -90, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} exit={{ y: -18, rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href="/apply" className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-2 sm:inline-flex">
              {t.cta}<ArrowUpRight size={16} />
            </a>
            <button className="relative grid h-10 w-10 place-items-center rounded-full bg-fg text-bg xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
              <span className={`absolute h-0.5 w-4 rounded bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-0.5 w-4 rounded bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: bar }} className={`mx-auto mt-1.5 h-[2px] max-w-[84rem] origin-left rounded-full bg-gold transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 flex flex-col bg-bg px-6 pb-8 pt-28 xl:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }} animate={{ clipPath: "circle(150% at 92% 6%)" }} exit={{ clipPath: "circle(0% at 92% 6%)" }} transition={{ duration: 0.7, ease }}>
            <nav className="flex-1" aria-label="Mobile">
              {t.nav.map((n, i) => (
                <div key={n.href} className="overflow-hidden border-b border-line">
                  <motion.a href={n.href} onClick={() => setOpen(false)} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease }}
                    className="flex items-baseline justify-between py-4 font-display text-4xl text-fg">
                    {n.label}<span className="font-sans text-xs text-muted">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.a href="/apply" onClick={() => setOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="flex items-center justify-center gap-2 rounded-full bg-gold py-4 font-bold text-brand-ink">
              {t.cta}<ArrowUpRight size={18} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
