"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarClock, Download, ExternalLink, KanbanSquare, LayoutDashboard, List, LogOut, Moon, RefreshCw, RotateCcw, Search, Sun,
  TrendingUp, UserPlus, Users, GraduationCap, CheckCircle2, Database, AlertTriangle,
} from "lucide-react";
import { Crest } from "../Brand";
import { useLang } from "../LangProvider";
import { useTheme } from "../ThemeProvider";
import { Counter } from "../ui";
import Drawer from "./Drawer";
import { levelLabel, sectionLabel, StageBadge, Initials, ago, PIPE, rank, DAY } from "./shared";
import { adminText } from "@/lib/adminText";
import { STAGES, stageMeta, fullName, type Application, type Stage } from "@/lib/admissions";
import { applyLevels } from "@/lib/programs";
import type { Lang } from "@/lib/content";

export default function Dashboard() {
  const { lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const t = adminText[lang];
  const router = useRouter();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState({ backend: "", demo: false });
  const [tab, setTab] = useState<"overview" | "pipeline" | "list">("overview");
  const [openId, setOpenId] = useState<string | null>(null);
  const [staff, setStaff] = useState("");
  const [today, setToday] = useState("\u00a0");
  useEffect(() => { setToday(new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { weekday: "long", day: "numeric", month: "long" })); }, [lang]);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/applications", { cache: "no-store" });
    if (res.status === 401) { router.replace("/admin/login"); return; }
    const j = await res.json();
    if (!res.ok) { setError(j.error ?? "error"); setMeta({ backend: j.backend ?? "", demo: false }); }
    else { setApps(j.applications); setMeta({ backend: j.backend, demo: j.demo }); setError(""); }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
    try { setStaff(localStorage.getItem("gbic-staff") ?? ""); } catch {}
  }, [load]);

  const update = useCallback(async (id: string, patch: Record<string, unknown>) => {
    // optimistic stage change so drag & drop feels instant
    if (patch.stage) setApps((xs) => xs.map((a) => (a.id === id ? { ...a, stage: patch.stage as Stage } : a)));
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...patch, by: staff || undefined }),
    });
    if (res.status === 401) { router.replace("/admin/login"); return null; }
    if (!res.ok) { load(); return null; }
    const { application } = await res.json();
    setApps((xs) => xs.map((a) => (a.id === id ? application : a)));
    return application as Application;
  }, [staff, router, load]);

  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); };
  const reset = async () => { if (!confirm(t.resetConfirm)) return; await fetch("/api/admin/reset", { method: "POST" }); load(); };
  const open = apps.find((a) => a.id === openId) ?? null;

  const tabs = [
    { id: "overview" as const, label: t.nav.overview, I: LayoutDashboard },
    { id: "pipeline" as const, label: t.nav.pipeline, I: KanbanSquare },
    { id: "list" as const, label: t.nav.list, I: List },
  ];
  const newCount = apps.filter((a) => a.stage === "new").length;

  return (
    <div className="lg:grid lg:min-h-svh lg:grid-cols-[17rem_1fr]">
      {/* Sidebar (desktop) / top bar (mobile) */}
      <aside className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur-xl lg:flex lg:h-svh lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-6 lg:py-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Crest className="h-9 w-9" />
            <span className="leading-none"><span className="block font-display text-lg text-fg">Gopal</span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-muted">{t.title}</span></span>
          </Link>
          <div className="flex items-center gap-1.5 lg:hidden">
            <button onClick={(e) => toggle(e)} aria-label="Theme" className="grid h-9 w-9 place-items-center rounded-full bg-fg/[.06] text-fg">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
            <button onClick={() => setLang(lang === "en" ? "fr" : "en")} className="h-9 rounded-full bg-fg/[.06] px-3 text-xs font-bold uppercase text-fg">{lang === "en" ? "fr" : "en"}</button>
            <button onClick={logout} aria-label={t.logout} className="grid h-9 w-9 place-items-center rounded-full bg-fg/[.06] text-fg"><LogOut size={16} /></button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-4 lg:pb-0">
          {tabs.map(({ id, label, I }) => (
            <button key={id} onClick={() => setTab(id)} className={`relative flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${tab === id ? "text-white" : "text-fg-2 hover:bg-fg/5"}`}>
              {tab === id && <motion.span layoutId="admintab" className="absolute inset-0 rounded-xl bg-brand" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <I size={18} className="relative" /><span className="relative">{label}</span>
              {id === "pipeline" && newCount > 0 && <span className="relative ml-auto rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold text-brand-ink">{newCount}</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto hidden space-y-3 p-4 lg:block">
          <label className="block rounded-xl bg-bg p-3 ring-1 ring-line">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">{t.you}</span>
            <input value={staff} onChange={(e) => { setStaff(e.target.value); try { localStorage.setItem("gbic-staff", e.target.value); } catch {} }}
              placeholder="Mrs. Eyong" className="mt-1 w-full bg-transparent text-sm font-semibold text-fg outline-none placeholder:text-muted/50" />
          </label>
          <div className="flex items-center gap-2">
            <button onClick={(e) => toggle(e)} aria-label="Theme" className="grid h-10 w-10 place-items-center rounded-xl bg-fg/[.06] text-fg hover:bg-fg/10">{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>
            <div className="flex flex-1 rounded-xl bg-fg/[.06] p-1 text-xs font-bold">
              {(["en", "fr"] as const).map((l) => <button key={l} onClick={() => setLang(l)} className={`flex-1 rounded-lg py-1.5 uppercase ${lang === l ? "bg-surface text-fg shadow" : "text-muted"}`}>{l}</button>)}
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-fg-2 hover:bg-fg/5"><ExternalLink size={16} />{t.website}</Link>
          {meta.demo && <button onClick={reset} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-fg-2 hover:bg-fg/5"><RotateCcw size={16} />{t.reset}</button>}
          <button onClick={logout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-fg-2 hover:bg-fg/5"><LogOut size={16} />{t.logout}</button>
          {meta.backend && <p className="flex items-center gap-1.5 px-3 text-[11px] text-muted"><Database size={12} />{meta.backend === "supabase" ? "Supabase" : "Local file"}</p>}
        </div>
      </aside>

      <main className="min-w-0 px-4 py-6 sm:px-8 lg:px-10 lg:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-2 dark:text-gold">{today}</p>
            <h1 className="mt-1 font-display text-4xl text-fg sm:text-5xl">{tabs.find((x) => x.id === tab)?.label}</h1>
          </div>
          <button onClick={load} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-fg ring-1 ring-line hover:bg-fg/5">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />{t.refresh}
          </button>
        </div>

        {error ? (
          <div className="rounded-3xl border border-gold/40 bg-gold/10 p-8">
            <AlertTriangle className="text-gold" />
            <h2 className="mt-3 font-display text-2xl text-fg">{t.setup.title}</h2>
            <p className="mt-2 max-w-xl text-muted">{t.setup.sub}</p>
            <p className="mt-4 font-mono text-xs text-muted">{error}</p>
          </div>
        ) : loading && apps.length === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[...Array(8)].map((_, i) => <div key={i} className="h-32 animate-pulse rounded-3xl bg-fg/[.05]" />)}</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              {tab === "overview" && <Overview apps={apps} lang={lang} onOpen={setOpenId} />}
              {tab === "pipeline" && <Pipeline apps={apps} lang={lang} onOpen={setOpenId} onMove={(id, s) => update(id, { stage: s })} />}
              {tab === "list" && <ListView apps={apps} lang={lang} onOpen={setOpenId} />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <Drawer app={open} lang={lang} onClose={() => setOpenId(null)} onUpdate={update} />
    </div>
  );
}

/* ---------------- Overview ---------------- */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl bg-surface p-6 ring-1 ring-line ${className}`}>{children}</div>;
}

function Overview({ apps, lang, onOpen }: { apps: Application[]; lang: Lang; onOpen: (id: string) => void }) {
  const t = adminText[lang];
  const s = useMemo(() => {
    const now = Date.now();
    const week = apps.filter((a) => now - new Date(a.createdAt).getTime() < 7 * DAY).length;
    const upcoming = apps.filter((a) => a.visitAt && new Date(a.visitAt).getTime() > now && a.stage === "visit").sort((a, b) => a.visitAt.localeCompare(b.visitAt));
    const yes = apps.filter((a) => a.stage === "accepted" || a.stage === "enrolled").length;
    const no = apps.filter((a) => a.stage === "declined").length;
    const funnel = PIPE.map((st, i) => ({ st, n: apps.filter((a) => rank(a) >= i && !(a.stage === "declined" && i > 3)).length }));
    const weeks = [...Array(8)].map((_, i) => {
      const end = now - (7 - i) * 7 * DAY + 7 * DAY, start = end - 7 * DAY;
      return { start, n: apps.filter((a) => { const t0 = new Date(a.createdAt).getTime(); return t0 >= start && t0 < end; }).length };
    });
    const sections = [0, 1, 2, 3].map((g) => ({ g, n: apps.filter((a) => a.level.group === g).length }));
    const src = new Map<string, number>();
    apps.forEach((a) => a.prefs.heard && src.set(a.prefs.heard, (src.get(a.prefs.heard) ?? 0) + 1));
    const sources = [...src.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    const recent = apps.flatMap((a) => a.activity.map((x) => ({ ...x, a }))).sort((x, y) => y.at.localeCompare(x.at)).slice(0, 8);
    return { week, upcoming, rate: yes + no ? Math.round((yes / (yes + no)) * 100) : 0, enrolled: apps.filter((a) => a.stage === "enrolled").length, funnel, weeks, sections, sources, recent };
  }, [apps]);

  const kpis = [
    { label: t.kpi.total, v: apps.length, I: Users },
    { label: t.kpi.week, v: s.week, I: UserPlus },
    { label: t.kpi.visits, v: s.upcoming.length, I: CalendarClock },
    { label: t.kpi.rate, v: s.rate, suffix: "%", I: TrendingUp, hint: t.kpi.rateHint },
    { label: t.kpi.enrolled, v: s.enrolled, I: GraduationCap },
  ];
  const fmax = Math.max(1, ...s.funnel.map((f) => f.n));
  const wmax = Math.max(1, ...s.weeks.map((w) => w.n));
  const smax = Math.max(1, ...s.sections.map((x) => x.n));
  const srcMax = Math.max(1, ...s.sources.map((x) => x[1]));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {kpis.map(({ label, v, suffix, I, hint }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`rounded-3xl p-5 ring-1 ring-line ${i === 0 ? "bg-brand text-white ring-0" : "bg-surface"}`}>
            <I size={18} className={i === 0 ? "text-gold" : "text-brand-2 dark:text-gold"} />
            <p className={`mt-4 font-display text-4xl ${i === 0 ? "text-white" : "text-fg"}`}><Counter to={v} suffix={suffix} /></p>
            <p className={`mt-1 text-xs font-semibold ${i === 0 ? "text-white/70" : "text-muted"}`}>{label}</p>
            {hint && <p className="text-[10px] text-muted">{hint}</p>}
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <h2 className="font-display text-2xl text-fg">{t.funnel}</h2>
          <p className="text-sm text-muted">{t.funnelSub}</p>
          <div className="mt-6 space-y-3">
            {s.funnel.map(({ st, n }, i) => (
              <div key={st} className="group grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3">
                <span className="truncate text-sm font-semibold text-fg-2">{stageMeta[st][lang]}</span>
                <div className="h-7 rounded-md bg-fg/[.04]">
                  <motion.div className="h-full rounded-md" style={{ background: stageMeta[st].color }} initial={{ width: 0 }} animate={{ width: `${(n / fmax) * 100}%` }} transition={{ delay: 0.1 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                </div>
                <span className="text-right font-display text-lg tabular-nums text-fg">{n}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-2xl text-fg">{t.weekly}</h2>
          <p className="text-sm text-muted">{t.weeklySub}</p>
          <div className="mt-6 flex h-48 items-end gap-2 border-b border-line">
            {s.weeks.map((w, i) => (
              <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
                <span className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-fg px-2 py-1 text-[11px] font-semibold text-bg opacity-0 transition group-hover:opacity-100">
                  {new Date(w.start).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short" })} · {w.n}
                </span>
                <motion.div className="rounded-t-[4px] bg-brand-2 transition-colors group-hover:bg-gold" initial={{ height: 0 }} animate={{ height: `${(w.n / wmax) * 100}%` }} transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ minHeight: w.n ? 4 : 0 }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-muted">
            <span>{new Date(s.weeks[0].start).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short" })}</span>
            <span>{lang === "fr" ? "Cette semaine" : "This week"}</span>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <h2 className="font-display text-xl text-fg">{t.bySection}</h2>
          <div className="mt-5 space-y-4">
            {s.sections.map(({ g, n }) => (
              <div key={g}>
                <div className="flex justify-between text-sm"><span className="font-semibold text-fg-2">{sectionLabel(g, lang)}</span><span className="tabular-nums text-fg">{n}</span></div>
                <div className="mt-1.5 h-2 rounded-full bg-fg/[.05]"><motion.div className="h-full rounded-full bg-brand-2" initial={{ width: 0 }} animate={{ width: `${(n / smax) * 100}%` }} transition={{ duration: 0.9 }} /></div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-display text-xl text-fg">{t.sources}</h2>
          <div className="mt-5 space-y-4">
            {s.sources.map(([k, n]) => (
              <div key={k}>
                <div className="flex justify-between text-sm"><span className="font-semibold text-fg-2">{k}</span><span className="tabular-nums text-fg">{n}</span></div>
                <div className="mt-1.5 h-2 rounded-full bg-fg/[.05]"><motion.div className="h-full rounded-full bg-gold" initial={{ width: 0 }} animate={{ width: `${(n / srcMax) * 100}%` }} transition={{ duration: 0.9 }} /></div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-2 xl:col-span-1">
          <h2 className="font-display text-xl text-fg">{t.upcoming}</h2>
          <div className="mt-4 space-y-2">
            {s.upcoming.length === 0 && <p className="text-sm text-muted">{t.noVisits}</p>}
            {s.upcoming.slice(0, 5).map((a) => {
              const d = new Date(a.visitAt);
              return (
                <button key={a.id} onClick={() => onOpen(a.id)} className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-fg/5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-center leading-none text-fg">
                    <span><span className="block font-display text-lg">{d.getDate()}</span><span className="text-[10px] font-bold uppercase">{d.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { month: "short" })}</span></span>
                  </span>
                  <span className="min-w-0 flex-1"><span className="block truncate font-semibold text-fg">{fullName(a)}</span><span className="block truncate text-xs text-muted">{levelLabel(a, lang)} · {d.toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-GB", { hour: "2-digit", minute: "2-digit" })}</span></span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="font-display text-xl text-fg">{t.recent}</h2>
        <ul className="mt-4 divide-y divide-line">
          {s.recent.map((r, i) => (
            <li key={i}>
              <button onClick={() => onOpen(r.a.id)} className="flex w-full items-center gap-3 py-3 text-left hover:opacity-80">
                <Initials a={r.a} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-fg"><b>{fullName(r.a)}</b> · {t.act[r.type]}{r.type === "stage" ? `: ${r.text.split(" → ").map((x) => stageMeta[x as Stage]?.[lang] ?? x).join(" → ")}` : r.type === "note" ? `: ${r.text}` : ""}</span>
                  <span className="block text-xs text-muted">{r.by} · {ago(r.at, lang)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* ---------------- Pipeline (kanban) ---------------- */
function Pipeline({ apps, lang, onOpen, onMove }: { apps: Application[]; lang: Lang; onOpen: (id: string) => void; onMove: (id: string, s: Stage) => void }) {
  const t = adminText[lang];
  const [over, setOver] = useState<Stage | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  return (
    <div>
      <p className="mb-4 text-sm text-muted">{t.dragHint}</p>
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-6 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
        {STAGES.map((st) => {
          const items = apps.filter((a) => a.stage === st);
          return (
            <div key={st}
              onDragOver={(e) => { e.preventDefault(); setOver(st); }} onDragLeave={() => setOver((o) => (o === st ? null : o))}
              onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); setOver(null); setDragId(null); if (id) onMove(id, st); }}
              className={`flex w-72 shrink-0 flex-col rounded-3xl p-3 transition-colors ${over === st ? "bg-gold/15 ring-2 ring-gold" : "bg-fg/[.035] ring-1 ring-line"}`}>
              <div className="flex items-center justify-between px-2 py-2">
                <StageBadge stage={st} lang={lang} />
                <span className="font-display text-lg tabular-nums text-fg">{items.length}</span>
              </div>
              <div className="mt-2 flex min-h-24 flex-col gap-2.5">
                <AnimatePresence initial={false}>
                  {items.map((a) => (
                    <motion.button layout layoutId={a.id} key={a.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: dragId === a.id ? 0.4 : 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      draggable onDragStartCapture={(e: React.DragEvent) => { e.dataTransfer.setData("text/plain", a.id); setDragId(a.id); }} onDragEndCapture={() => setDragId(null)}
                      onClick={() => onOpen(a.id)}
                      className="cursor-grab rounded-2xl bg-surface p-4 text-left shadow-sm ring-1 ring-line transition-shadow hover:shadow-md hover:ring-gold/60 active:cursor-grabbing">
                      <div className="flex items-center gap-3">
                        <Initials a={a} />
                        <span className="min-w-0"><span className="block truncate font-semibold text-fg">{fullName(a)}</span><span className="block truncate text-xs text-muted">{levelLabel(a, lang)}</span></span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
                        <span className="truncate">{a.guardian.name}</span>
                        <span className="shrink-0">{ago(a.createdAt, lang)}</span>
                      </div>
                      {st === "visit" && a.visitAt && (
                        <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-gold/15 px-2 py-1 text-[11px] font-semibold text-fg"><CalendarClock size={12} />{new Date(a.visitAt).toLocaleString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
                      )}
                      {a.scores.english !== null && <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-fg-2"><CheckCircle2 size={12} className="text-brand-2 dark:text-gold" />{Math.round(((a.scores.english ?? 0) + (a.scores.french ?? 0) + (a.scores.maths ?? 0)) / 3)}%</p>}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- List / table ---------------- */
function ListView({ apps, lang, onOpen }: { apps: Application[]; lang: Lang; onOpen: (id: string) => void }) {
  const t = adminText[lang];
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<Stage | "">("");
  const [section, setSection] = useState<number | "">("");
  const rows = useMemo(() => {
    const n = q.trim().toLowerCase();
    return apps.filter((a) =>
      (!stage || a.stage === stage) && (section === "" || a.level.group === section) &&
      (!n || [fullName(a), a.guardian.name, a.guardian.phone, a.ref, a.guardian.email].join(" ").toLowerCase().includes(n)));
  }, [apps, q, stage, section]);

  const csv = () => {
    const head = ["Reference", "Received", "Stage", "Student", "Date of birth", "Gender", "Section", "Class", "Parent", "Relationship", "Phone", "WhatsApp", "Email", "Neighbourhood", "Transport", "Canteen", "Visit", "English", "French", "Maths", "Found us via"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = rows.map((a) => [a.ref, a.createdAt.slice(0, 10), stageMeta[a.stage].en, fullName(a), a.student.dob, a.student.gender, sectionLabel(a.level.group, "en"), levelLabel(a, "en"), a.guardian.name, a.guardian.relation, a.guardian.phone, a.guardian.whatsapp, a.guardian.email, a.guardian.address, a.prefs.transport ? "yes" : "no", a.prefs.canteen ? "yes" : "no", a.visitAt, a.scores.english, a.scores.french, a.scores.maths, a.prefs.heard].map(esc).join(","));
    const blob = new Blob(["﻿" + [head.map(esc).join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("a"), { href: url, download: `gbic-applications-${new Date().toISOString().slice(0, 10)}.csv` });
    link.click(); URL.revokeObjectURL(url);
  };

  const sel = "rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-fg outline-none focus:border-gold";
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-0 flex-1 basis-64">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} className="w-full rounded-full border border-line bg-surface py-2.5 pl-11 pr-4 text-sm text-fg outline-none focus:border-gold" />
        </label>
        <select value={stage} onChange={(e) => setStage(e.target.value as Stage | "")} className={sel}>
          <option value="">{t.allStages}</option>{STAGES.map((s) => <option key={s} value={s}>{stageMeta[s][lang]}</option>)}
        </select>
        <select value={section} onChange={(e) => setSection(e.target.value === "" ? "" : Number(e.target.value))} className={sel}>
          <option value="">{t.allSections}</option>{[0, 1, 2, 3].map((g) => <option key={g} value={g}>{sectionLabel(g, lang)}</option>)}
        </select>
        <button onClick={csv} className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-2"><Download size={16} />{t.exportCsv}</button>
      </div>
      <p className="mt-4 text-sm text-muted">{rows.length} {t.results}</p>

      {rows.length === 0 ? <p className="mt-10 text-center text-muted">{t.empty}</p> : (
        <>
          {/* desktop table */}
          <div className="mt-3 hidden overflow-hidden rounded-3xl bg-surface ring-1 ring-line xl:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-[11px] uppercase tracking-wider text-muted">
                <tr>{[t.cols.student, t.cols.level, t.cols.parent, t.cols.stage, t.cols.date].map((h) => <th key={h} className="px-5 py-3.5 font-bold">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((a) => (
                  <tr key={a.id} onClick={() => onOpen(a.id)} className="cursor-pointer transition-colors hover:bg-fg/[.03]">
                    <td className="px-5 py-3"><div className="flex items-center gap-3"><Initials a={a} /><div><p className="font-semibold text-fg">{fullName(a)}</p><p className="font-mono text-[11px] text-muted">{a.ref}</p></div></div></td>
                    <td className="px-5 py-3"><p className="text-fg">{levelLabel(a, lang)}</p><p className="text-xs text-muted">{sectionLabel(a.level.group, lang)}</p></td>
                    <td className="px-5 py-3"><p className="text-fg">{a.guardian.name}</p><p className="text-xs text-muted">{a.guardian.phone}</p></td>
                    <td className="px-5 py-3"><StageBadge stage={a.stage} lang={lang} /></td>
                    <td className="whitespace-nowrap px-5 py-3 text-muted">{new Date(a.createdAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* mobile cards */}
          <div className="mt-3 space-y-2 xl:hidden">
            {rows.map((a) => (
              <button key={a.id} onClick={() => onOpen(a.id)} className="flex w-full items-center gap-3 rounded-2xl bg-surface p-4 text-left ring-1 ring-line">
                <Initials a={a} />
                <span className="min-w-0 flex-1"><span className="block truncate font-semibold text-fg">{fullName(a)}</span><span className="block truncate text-xs text-muted">{levelLabel(a, lang)} · {ago(a.createdAt, lang)}</span></span>
                <StageBadge stage={a.stage} lang={lang} small />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
