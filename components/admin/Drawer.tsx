"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Mail, MessageCircle, Phone, Printer, Send, StickyNote, X, CalendarClock, ClipboardCheck, History } from "lucide-react";
import { adminText } from "@/lib/adminText";
import { STAGES, stageMeta, fullName, template, type Application, type Stage } from "@/lib/admissions";
import { school } from "@/lib/content";
import type { Lang } from "@/lib/content";
import { StageBadge, Initials, ago, levelLabel, sectionLabel } from "./shared";

type Props = { app: Application | null; lang: Lang; onClose: () => void; onUpdate: (id: string, patch: Record<string, unknown>) => Promise<Application | null> };

const logText = (text: string, lang: Lang) => {
  if (lang !== "fr") return text;
  return text
    .replace("Placement test scores updated", "Notes du test de placement mises à jour")
    .replace("Visit scheduled: ", "Visite planifiée : ")
    .replace("Visit cleared", "Visite annulée");
};
const digits = (p: string) => p.replace(/[^\d]/g, "");
const age = (dob: string) => { const d = new Date(dob); if (isNaN(+d)) return ""; return String(Math.floor((Date.now() - +d) / (365.25 * 86400000))); };

export default function Drawer({ app, lang, onClose, onUpdate }: Props) {
  useEffect(() => {
    if (!app) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [app, onClose]);

  return (
    <AnimatePresence>
      {app && (
        <>
          <motion.div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm print:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside role="dialog" aria-modal="true" aria-label={fullName(app)}
            className="print-area fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col bg-bg shadow-2xl print:static print:max-w-none print:shadow-none"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 36 }}>
            <Body key={app.id} app={app} lang={lang} onClose={onClose} onUpdate={onUpdate} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Info({ rows }: { rows: [string, string | undefined][] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
      {rows.map(([k, v]) => <div key={k}><dt className="text-[11px] font-bold uppercase tracking-wider text-muted">{k}</dt><dd className="mt-0.5 break-words font-semibold text-fg">{v || "—"}</dd></div>)}
    </dl>
  );
}
function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-surface p-5 ring-1 ring-line sm:p-6 print:ring-0">
      <h3 className="mb-4 flex items-center gap-2 font-display text-xl text-fg"><span className="text-brand-2 dark:text-gold">{icon}</span>{title}</h3>
      {children}
    </section>
  );
}

function Body({ app, lang, onClose, onUpdate }: Props & { app: Application }) {
  const t = adminText[lang];
  const d = t.drawer;
  const lvl = levelLabel(app, lang);
  const famLvl = levelLabel(app, app.lang);
  const [msg, setMsg] = useState(() => template(app, app.stage, famLvl, school.name));
  const [visit, setVisit] = useState(app.visitAt);
  const [scores, setScores] = useState({ english: app.scores.english ?? "", french: app.scores.french ?? "", maths: app.scores.maths ?? "" });
  const [note, setNote] = useState("");
  const [flash, setFlash] = useState("");

  const saved = (k: string) => { setFlash(k); setTimeout(() => setFlash(""), 1600); };
  const setStage = async (s: Stage) => {
    const a = await onUpdate(app.id, { stage: s });
    if (a) setMsg(template(a, s, famLvl, school.name));
  };
  const wa = digits(app.guardian.whatsapp || app.guardian.phone);
  const sendWhatsApp = () => {
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    onUpdate(app.id, { message: msg });
  };
  const nums = [scores.english, scores.french, scores.maths].filter((v) => v !== "").map(Number);
  const avg = nums.length ? Math.round(nums.reduce((s, v) => s + v, 0) / nums.length) : null;

  const input = "rounded-xl border border-line bg-bg px-3 py-2.5 text-sm text-fg outline-none focus:border-gold focus:ring-4 focus:ring-gold/20";

  return (
    <>
      <header className="flex items-start gap-4 border-b border-line p-5 sm:p-6">
        <Initials a={app} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-2xl text-fg sm:text-3xl">{fullName(app)}</h2>
          <p className="mt-1 text-sm text-muted">{lvl} · {sectionLabel(app.level.group, lang)}</p>
          <p className="mt-1 font-mono text-xs text-muted">{app.ref} · {ago(app.createdAt, lang)} · {app.lang.toUpperCase()}</p>
        </div>
        <button onClick={onClose} aria-label={d.close} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-fg/[.06] text-fg hover:bg-fg/10 print:hidden"><X size={18} /></button>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6" data-lenis-prevent>
        {/* Stage stepper */}
        <section className="print:hidden">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted">{d.stage}</p>
          <div className="flex flex-wrap gap-1.5">
            {STAGES.map((s) => (
              <button key={s} onClick={() => setStage(s)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${app.stage === s ? "bg-brand text-white shadow" : "bg-fg/[.05] text-fg-2 hover:bg-fg/10"}`}>
                <span className="h-2 w-2 rounded-full ring-1 ring-white/40" style={{ background: stageMeta[s].color }} />
                {stageMeta[s][lang]}{app.stage === s && <Check size={12} />}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            <button onClick={sendWhatsApp} className="flex flex-col items-center gap-1 rounded-2xl bg-[#25D366] py-3 text-xs font-bold text-white"><MessageCircle size={18} />{d.whatsapp}</button>
            <a href={`tel:+${digits(app.guardian.phone)}`} className="flex flex-col items-center gap-1 rounded-2xl bg-surface py-3 text-xs font-bold text-fg ring-1 ring-line"><Phone size={18} />{d.call}</a>
            <a href={app.guardian.email ? `mailto:${app.guardian.email}?subject=${encodeURIComponent(`${school.name} · ${app.ref}`)}&body=${encodeURIComponent(msg)}` : undefined}
              className={`flex flex-col items-center gap-1 rounded-2xl bg-surface py-3 text-xs font-bold ring-1 ring-line ${app.guardian.email ? "text-fg" : "pointer-events-none text-muted/50"}`}><Mail size={18} />{d.email}</a>
            <button onClick={() => print()} className="flex flex-col items-center gap-1 rounded-2xl bg-surface py-3 text-xs font-bold text-fg ring-1 ring-line"><Printer size={18} />{d.print}</button>
          </div>
        </section>

        <div className="print:hidden"><Section icon={<Send size={18} />} title={d.messageTitle}>
          <p className="-mt-2 mb-3 text-xs text-muted">{d.messageSub}</p>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={5} className={`${input} w-full resize-y leading-relaxed`} />
          <button onClick={sendWhatsApp} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white"><MessageCircle size={16} />{d.send}</button>
        </Section></div>

        <div className="hidden print:block"><StageBadge stage={app.stage} lang={lang} /></div>

        <Section icon={<ClipboardCheck size={18} />} title={d.student}>
          <Info rows={[
            [d.dob, app.student.dob], [d.age, age(app.student.dob) && `${age(app.student.dob)} ${d.years}`],
            [d.gender, app.student.gender === "m" ? d.male : app.student.gender === "f" ? d.female : ""], [d.nationality, app.student.nationality],
            [d.school, app.student.currentSchool], [d.start, t.startOpts[app.start]],
          ]} />
        </Section>

        <Section icon={<Phone size={18} />} title={d.guardian}>
          <Info rows={[
            [d.guardian, app.guardian.name], [d.relation, app.guardian.relation], [d.phone, app.guardian.phone], ["WhatsApp", app.guardian.whatsapp || app.guardian.phone],
            [d.email2, app.guardian.email], [d.address, app.guardian.address], [d.profession, app.guardian.profession],
          ]} />
        </Section>

        <Section icon={<StickyNote size={18} />} title={d.prefs}>
          <Info rows={[
            [d.transport, app.prefs.transport ? d.yes : d.no], [d.canteen, app.prefs.canteen ? d.yes : d.no], [d.heard, app.prefs.heard],
            [d.medical, app.prefs.medical], [d.notes, app.prefs.notes],
          ]} />
          <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted">{d.docs}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {app.docs.length === 0 ? <span className="text-sm text-muted">{d.none}</span> : app.docs.map((x) => <span key={x} className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-fg"><Check size={12} />{x}</span>)}
          </div>
        </Section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Section icon={<CalendarClock size={18} />} title={d.visit}>
            <input type="datetime-local" value={visit} onChange={(e) => setVisit(e.target.value)} className={`${input} w-full`} />
            <button onClick={async () => { if (await onUpdate(app.id, { visitAt: visit, ...(visit && ["new", "contacted"].includes(app.stage) ? { stage: "visit" } : {}) })) saved("visit"); }}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-white print:hidden">{flash === "visit" ? <><Check size={15} />{d.saved}</> : d.visitSave}</button>
          </Section>
          <Section icon={<ClipboardCheck size={18} />} title={d.scores}>
            <div className="grid grid-cols-3 gap-2">
              {(["english", "french", "maths"] as const).map((k) => (
                <label key={k} className="block"><span className="text-[10px] font-bold uppercase tracking-wider text-muted">{d[k]}</span>
                  <input type="number" min={0} max={100} value={scores[k]} onChange={(e) => setScores((s) => ({ ...s, [k]: e.target.value }))} className={`${input} mt-1 w-full`} />
                </label>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted">{d.average}: <b className="font-display text-xl text-fg">{avg ?? "—"}{avg !== null && "%"}</b></span>
              <button onClick={async () => { if (await onUpdate(app.id, { scores, ...(["new", "contacted", "visit"].includes(app.stage) ? { stage: "tested" } : {}) })) saved("scores"); }}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-white print:hidden">{flash === "scores" ? <><Check size={15} />{d.saved}</> : d.saveScores}</button>
            </div>
          </Section>
        </div>

        <Section icon={<History size={18} />} title={d.history}>
          <div className="print:hidden">
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={d.addNote} rows={2} className={`${input} w-full resize-none`} />
            <button disabled={!note.trim()} onClick={async () => { if (await onUpdate(app.id, { note })) setNote(""); }}
              className="mt-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-brand-ink disabled:opacity-40">{d.saveNote}</button>
          </div>
          <ol className="relative mt-6 space-y-5 border-l-2 border-line pl-5">
            {[...app.activity].reverse().map((x, i) => (
              <motion.li key={x.at + i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i, 8) * 0.03 }} className="relative">
                <span className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full ring-4 ring-surface ${x.type === "note" ? "bg-gold" : x.type === "message" ? "bg-[#25D366]" : "bg-brand-2"}`} />
                <p className="text-sm font-semibold text-fg">
                  {t.act[x.type]}
                  {x.type === "stage" && <span className="font-normal text-fg-2">: {x.text.split(" → ").map((s) => stageMeta[s as Stage]?.[lang] ?? s).join(" → ")}</span>}
                </p>
                {(x.type === "note" || x.type === "message" || x.type === "update") && <p className="mt-1 whitespace-pre-wrap rounded-xl bg-bg p-3 text-sm text-fg-2">{x.type === "update" ? logText(x.text, lang) : x.text}</p>}
                <p className="mt-1 text-xs text-muted">{x.by} · {new Date(x.at).toLocaleString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
              </motion.li>
            ))}
          </ol>
        </Section>
      </div>
    </>
  );
}
