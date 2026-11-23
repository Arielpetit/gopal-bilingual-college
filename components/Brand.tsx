"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import { ease } from "./ui";
import { logoSrc } from "@/lib/images";

export function Crest({ className = "h-10 w-10" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (logoSrc) return <img src={logoSrc} alt="" className={`${className} object-contain`} />;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#13684c" /><stop offset="1" stopColor="#063524" /></linearGradient>
      </defs>
      <path d="M24 2 43 9v14c0 11.5-7.8 19.6-19 23C12.8 42.6 5 34.5 5 23V9z" fill="url(#cg)" />
      <path d="M24 5.5 40 11.4V23c0 9.6-6.4 16.5-16 19.6C14.4 39.5 8 32.6 8 23V11.4z" fill="none" stroke="#e8a825" strokeWidth="1.2" opacity=".85" />
      <path d="m24 9.5 1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5z" fill="#e8a825" />
      <text x="24" y="36" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fontWeight="700" fill="#fff">G</text>
    </svg>
  );
}

/** Short intro curtain shown once per browser session. */
export function Loader() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("gbic-intro")) return;
      sessionStorage.setItem("gbic-intro", "1");
    } catch {}
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const id = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(id);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-brand-ink text-white"
          exit={{ clipPath: "inset(0 0 100% 0)" }} initial={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 0.9, ease }}>
          <div className="flex flex-col items-center">
            <motion.div initial={{ scale: 0.6, opacity: 0, rotate: -8 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.8, ease }}>
              <Crest className="h-20 w-20" />
            </motion.div>
            <div className="mt-5 overflow-hidden">
              <motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }} className="font-display text-2xl italic text-gold sm:text-3xl">
                {t.loader}
              </motion.p>
            </div>
            <motion.div className="mt-6 h-px w-40 origin-left bg-gold/70" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 1.3, ease }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
