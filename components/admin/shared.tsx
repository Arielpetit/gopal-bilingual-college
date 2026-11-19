"use client";
import { stageMeta, type Application, type Stage } from "@/lib/admissions";
import { applyLevels } from "@/lib/programs";
import type { Lang } from "@/lib/content";

export const levelLabel = (a: Application, lang: Lang) => {
  const g = applyLevels[lang][a.level.group];
  return g ? g.options[a.level.index] ?? "" : "";
};
export const sectionLabel = (group: number, lang: Lang) => applyLevels[lang][group]?.group ?? "";
export const PIPE: Stage[] = ["new", "contacted", "visit", "tested", "accepted", "enrolled"];
export const rank = (a: Application) => (a.stage === "declined" ? 3 : PIPE.indexOf(a.stage));
export const DAY = 86400000;

export function StageBadge({ stage, lang, small }: { stage: Stage; lang: Lang; small?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-fg/[.05] font-semibold text-fg-2 ring-1 ring-line ${small ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"}`}>
      <span className="h-2 w-2 rounded-full ring-1 ring-fg/20" style={{ background: stageMeta[stage].color }} />
      {stageMeta[stage][lang]}
    </span>
  );
}

export function Initials({ a }: { a: Application }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-gold">
      {(a.student.firstName[0] ?? "") + (a.student.lastName[0] ?? "")}
    </span>
  );
}

export const ago = (iso: string, lang: Lang) => {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / DAY);
  if (d <= 0) return lang === "fr" ? "aujourd'hui" : "today";
  if (d === 1) return lang === "fr" ? "hier" : "yesterday";
  return lang === "fr" ? `il y a ${d} j` : `${d}d ago`;
};

