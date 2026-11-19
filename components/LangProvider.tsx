"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { dict, type Lang } from "@/lib/content";

type T = (typeof dict)["en"];
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: T }>({ lang: "en", setLang: () => {}, t: dict.en });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    try {
      const s = localStorage.getItem("gbic-lang");
      if (s === "en" || s === "fr") setLangState(s);
      else if (navigator.language.toLowerCase().startsWith("fr")) setLangState("fr");
    } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("gbic-lang", l); } catch {}
  };
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
