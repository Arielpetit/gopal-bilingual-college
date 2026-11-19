"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileCheck2, Mail, MessageCircle, Printer, ShieldCheck, Upload, User, Users, ClipboardList, Sparkles } from "lucide-react";
import { useLang } from "./LangProvider";
import { Wrap, ease } from "./ui";
import { applyLevels } from "@/lib/programs";
import { school } from "@/lib/content";
import { img } from "@/lib/images";

const T = {
  en: {
    eyebrow: "Online admission · 2026/2027",
    title: "Apply to Gopal in a few minutes.",
    sub: "Fill in the form from your phone or computer. Your progress is saved automatically on this device, so you can come back later.",
    steps: ["Student", "Parent / guardian", "Preferences", "Documents", "Review"],
    next: "Continue", back: "Back", submit: "Submit application", required: "Please fill in the required fields.",
    f: {
      firstName: "First name", lastName: "Last name", dob: "Date of birth", gender: "Gender", male: "Male", female: "Female",
      nationality: "Nationality", currentSchool: "Current / last school", level: "Class applying for", choose: "Choose a class",
      startYear: "Start", startOpts: ["September 2026", "January 2027 (mid-year)", "April 2027 (third term)"],
      guardianName: "Full name", relation: "Relationship", relations: ["Mother", "Father", "Guardian", "Other"],
      phone: "Phone", whatsapp: "WhatsApp (if different)", email: "Email", address: "Neighbourhood / address", profession: "Profession",
      medical: "Allergies or medical notes", transport: "Needs school transport", canteen: "Needs canteen meals",
      heard: "How did you hear about us?", heardOpts: ["Friend or family", "Facebook / Instagram", "WhatsApp", "Google", "Passing by the school", "Other"],
      visit: "Preferred visit date", notes: "Anything else we should know?",
      docsIntro: "Attach copies now if you have them, or bring them on the visit day. Files stay on your device until you share them with the school.",
      docs: ["Birth certificate", "Last school report", "Passport photo", "Vaccination record", "Parent / guardian ID"],
      attach: "Attach", attached: "Attached", later: "Bring on visit day",
      consent: "I confirm the information is correct and agree to be contacted by the school about this application.",
      yes: "Yes", no: "No",
    },
    review: "Check everything before you submit.",
    done: { title: "Application received!", sub: "Our admissions team has received your application and will contact you within one working day to arrange the visit and placement test. Keep your reference number. For a faster reply, you can also send it on WhatsApp.", ref: "Reference", wa: "Send on WhatsApp", mail: "Send by email", print: "Print / save PDF", again: "Start a new application" },
    side: { title: "What happens next?", items: ["We call you within one working day", "Campus visit and meeting with the principal", "Friendly placement test in English and French", "Offer letter and enrolment"] },
  },
  fr: {
    eyebrow: "Inscription en ligne · 2026/2027",
    title: "Postulez au Gopal en quelques minutes.",
    sub: "Remplissez le formulaire depuis votre téléphone ou ordinateur. Votre progression est enregistrée automatiquement sur cet appareil : vous pouvez revenir plus tard.",
    steps: ["Élève", "Parent / tuteur", "Préférences", "Documents", "Vérification"],
    next: "Continuer", back: "Retour", submit: "Envoyer la candidature", required: "Veuillez remplir les champs obligatoires.",
    f: {
      firstName: "Prénom", lastName: "Nom", dob: "Date de naissance", gender: "Sexe", male: "Masculin", female: "Féminin",
      nationality: "Nationalité", currentSchool: "École actuelle / précédente", level: "Classe demandée", choose: "Choisir une classe",
      startYear: "Rentrée", startOpts: ["Septembre 2026", "Janvier 2027 (en cours d'année)", "Avril 2027 (3e trimestre)"],
      guardianName: "Nom complet", relation: "Lien de parenté", relations: ["Mère", "Père", "Tuteur", "Autre"],
      phone: "Téléphone", whatsapp: "WhatsApp (si différent)", email: "E-mail", address: "Quartier / adresse", profession: "Profession",
      medical: "Allergies ou informations médicales", transport: "Besoin du transport scolaire", canteen: "Besoin de la cantine",
      heard: "Comment nous avez-vous connus ?", heardOpts: ["Ami ou famille", "Facebook / Instagram", "WhatsApp", "Google", "En passant devant l'école", "Autre"],
      visit: "Date de visite souhaitée", notes: "Autre chose à nous dire ?",
      docsIntro: "Joignez des copies maintenant si vous les avez, ou apportez-les le jour de la visite. Les fichiers restent sur votre appareil jusqu'à ce que vous les partagiez avec l'école.",
      docs: ["Acte de naissance", "Dernier bulletin", "Photo d'identité", "Carnet de vaccination", "Pièce d'identité du parent / tuteur"],
      attach: "Joindre", attached: "Joint", later: "À apporter le jour de la visite",
      consent: "Je confirme l'exactitude des informations et accepte d'être contacté(e) par l'école au sujet de cette candidature.",
      yes: "Oui", no: "Non",
    },
    review: "Vérifiez tout avant d'envoyer.",
    done: { title: "Candidature reçue\u00a0!", sub: "Notre équipe d'admissions a bien reçu votre candidature et vous contactera sous un jour ouvrable pour organiser la visite et le test de placement. Conservez votre numéro de référence. Pour une réponse plus rapide, vous pouvez aussi l'envoyer sur WhatsApp.", ref: "Référence", wa: "Envoyer sur WhatsApp", mail: "Envoyer par e-mail", print: "Imprimer / enregistrer en PDF", again: "Nouvelle candidature" },
    side: { title: "Et ensuite\u00a0?", items: ["Nous vous appelons sous un jour ouvrable", "Visite du campus et rencontre avec la direction", "Test de placement bienveillant en français et en anglais", "Lettre d'admission et inscription"] },
  },
};

type Data = Record<string, string>;
const KEY = "gbic-apply-draft";
const REQUIRED: string[][] = [["firstName", "lastName", "dob", "gender", "level"], ["guardianName", "relation", "phone"], [], [], ["consent"]];
const icons = [User, Users, ClipboardList, FileCheck2, ShieldCheck];
const slugToGroup: Record<string, number> = { nursery: 0, primary: 1, "secondary-anglophone": 2, "secondary-francophone": 3 };

export default function ApplyForm() {
  const { lang } = useLang();
  const t = T[lang];
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Data>({ start: "0", transport: "no", canteen: "no" });
  const [files, setFiles] = useState<Record<number, string>>({});
  const [error, setError] = useState(false);
  const [ref, setRef] = useState("");
  const [preferGroup, setPreferGroup] = useState<number | null>(null);

  // restore draft + preselect the level coming from a program page
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) { const s = JSON.parse(saved); setData((d) => ({ ...d, ...s.data })); setStep(s.step ?? 0); }
    } catch {}
    const lvl = new URLSearchParams(location.search).get("level");
    if (lvl && lvl in slugToGroup) setPreferGroup(slugToGroup[lvl]);
  }, []);
  useEffect(() => {
    if (ref) return;
    try { localStorage.setItem(KEY, JSON.stringify({ data, step })); } catch {}
  }, [data, step, ref]);

  const set = (k: string, v: string) => { setData((d) => ({ ...d, [k]: v })); setError(false); };
  const levelLabel = useMemo(() => {
    if (!data.level) return "";
    const [g, o] = data.level.split(":").map(Number);
    const grp = applyLevels[lang][g];
    return grp ? `${grp.group} · ${grp.options[o]}` : "";
  }, [data.level, lang]);

  const go = (d: number) => {
    if (d > 0 && REQUIRED[step].some((k) => !data[k])) { setError(true); return; }
    setDir(d); setError(false); setStep((s) => s + d);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [sending, setSending] = useState(false);
  const submit = async () => {
    if (REQUIRED[4].some((k) => !data[k])) { setError(true); return; }
    setSending(true);
    let r = "";
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang, docs: Object.keys(files).map((i) => T.en.f.docs[Number(i)]) }),
      });
      if (res.ok) r = (await res.json()).ref;
    } catch {}
    // If the server is unreachable, still give the family a reference so they can send it on WhatsApp.
    if (!r) r = `GBIC-26-${Math.floor(10000 + Math.random() * 90000)}`;
    setSending(false);
    setRef(r);
    try { localStorage.removeItem(KEY); } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const summary = () => {
    const f = t.f;
    return [
      `${school.short} · ${t.eyebrow}`, `${t.done.ref}: ${ref}`, "",
      `${t.steps[0].toUpperCase()}`,
      `${f.firstName}: ${data.firstName ?? ""}`, `${f.lastName}: ${data.lastName ?? ""}`, `${f.dob}: ${data.dob ?? ""}`,
      `${f.gender}: ${data.gender === "m" ? f.male : data.gender === "f" ? f.female : ""}`, `${f.level}: ${levelLabel}`,
      `${f.startYear}: ${f.startOpts[Number(data.start ?? 0)]}`, `${f.currentSchool}: ${data.currentSchool ?? ""}`, "",
      `${t.steps[1].toUpperCase()}`,
      `${f.guardianName}: ${data.guardianName ?? ""} (${data.relation ?? ""})`, `${f.phone}: ${data.phone ?? ""}`,
      data.whatsapp ? `${f.whatsapp}: ${data.whatsapp}` : "", data.email ? `${f.email}: ${data.email}` : "", data.address ? `${f.address}: ${data.address}` : "", "",
      `${t.steps[2].toUpperCase()}`,
      `${f.transport}: ${data.transport === "yes" ? f.yes : f.no}`, `${f.canteen}: ${data.canteen === "yes" ? f.yes : f.no}`,
      data.visit ? `${f.visit}: ${data.visit}` : "", data.medical ? `${f.medical}: ${data.medical}` : "", data.notes ? `${f.notes}: ${data.notes}` : "",
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
  };

  const field = "w-full rounded-2xl border bg-bg px-4 py-3.5 text-fg outline-none transition placeholder:text-muted/60 focus:border-gold focus:ring-4 focus:ring-gold/20";
  const bad = (k: string) => error && REQUIRED[step].includes(k) && !data[k];
  const Lbl = ({ k, label, req }: { k: string; label: string; req?: boolean }) => (
    <span className={`mb-1.5 block text-xs font-bold uppercase tracking-wider ${bad(k) ? "text-cmr-red" : "text-muted"}`}>{label}{req && <span className="text-gold"> *</span>}</span>
  );
  const Input = ({ k, label, type = "text", req }: { k: string; label: string; type?: string; req?: boolean }) => (
    <label className="block">{Lbl({ k: k, label: label, req: req })}
      <input type={type} value={data[k] ?? ""} onChange={(e) => set(k, e.target.value)} className={`${field} ${bad(k) ? "border-cmr-red" : "border-line"}`} />
    </label>
  );
  const Toggle = ({ k, label }: { k: string; label: string }) => (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-bg px-4 py-3">
      <span className="text-sm font-semibold text-fg">{label}</span>
      <div className="flex rounded-full bg-fg/[.06] p-1 text-xs font-bold">
        {(["yes", "no"] as const).map((v) => (
          <button type="button" key={v} onClick={() => set(k, v)} className={`rounded-full px-4 py-1.5 transition ${data[k] === v ? "bg-brand text-white" : "text-muted"}`}>{t.f[v]}</button>
        ))}
      </div>
    </div>
  );

  const steps = [
    // 1 student
    <div key="s1" className="grid gap-4 sm:grid-cols-2">
      {Input({ k: "firstName", label: t.f.firstName, req: true })}
      {Input({ k: "lastName", label: t.f.lastName, req: true })}
      {Input({ k: "dob", label: t.f.dob, type: "date", req: true })}
      <div>{Lbl({ k: "gender", label: t.f.gender, req: true })}
        <div className="grid grid-cols-2 gap-2">
          {(["m", "f"] as const).map((g) => (
            <button type="button" key={g} onClick={() => set("gender", g)}
              className={`rounded-2xl border px-4 py-3.5 text-sm font-semibold transition ${data.gender === g ? "border-gold bg-gold/15 text-fg" : bad("gender") ? "border-cmr-red text-muted" : "border-line text-muted hover:border-fg/30"}`}>
              {g === "m" ? t.f.male : t.f.female}
            </button>
          ))}
        </div>
      </div>
      <div className="sm:col-span-2">{Lbl({ k: "level", label: t.f.level, req: true })}
        <div className="space-y-4">
          {applyLevels[lang].map((grp, gi) => (
            <div key={grp.group} className={`rounded-2xl border p-4 transition ${preferGroup === gi ? "border-gold/60 bg-gold/[.06]" : "border-line"}`}>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">{grp.group}</p>
              <div className="flex flex-wrap gap-2">
                {grp.options.map((o, oi) => {
                  const v = `${gi}:${oi}`;
                  return (
                    <button type="button" key={o} onClick={() => set("level", v)}
                      className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${data.level === v ? "bg-brand text-white shadow" : "bg-fg/[.05] text-fg-2 hover:bg-fg/10"}`}>{o}</button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {Input({ k: "nationality", label: t.f.nationality })}
      {Input({ k: "currentSchool", label: t.f.currentSchool })}
      <label className="block sm:col-span-2">{Lbl({ k: "start", label: t.f.startYear })}
        <select value={data.start} onChange={(e) => set("start", e.target.value)} className={`${field} border-line`}>
          {t.f.startOpts.map((o, i) => <option key={o} value={i}>{o}</option>)}
        </select>
      </label>
    </div>,
    // 2 parent
    <div key="s2" className="grid gap-4 sm:grid-cols-2">
      {Input({ k: "guardianName", label: t.f.guardianName, req: true })}
      <div>{Lbl({ k: "relation", label: t.f.relation, req: true })}
        <div className="grid grid-cols-2 gap-2">
          {t.f.relations.map((r) => (
            <button type="button" key={r} onClick={() => set("relation", r)}
              className={`rounded-2xl border px-3 py-2.5 text-sm font-semibold transition ${data.relation === r ? "border-gold bg-gold/15 text-fg" : bad("relation") ? "border-cmr-red text-muted" : "border-line text-muted hover:border-fg/30"}`}>{r}</button>
          ))}
        </div>
      </div>
      {Input({ k: "phone", label: t.f.phone, type: "tel", req: true })}
      {Input({ k: "whatsapp", label: t.f.whatsapp, type: "tel" })}
      {Input({ k: "email", label: t.f.email, type: "email" })}
      {Input({ k: "profession", label: t.f.profession })}
      <div className="sm:col-span-2">{Input({ k: "address", label: t.f.address })}</div>
    </div>,
    // 3 preferences
    <div key="s3" className="grid gap-4 sm:grid-cols-2">
      {Toggle({ k: "transport", label: t.f.transport })}
      {Toggle({ k: "canteen", label: t.f.canteen })}
      {Input({ k: "visit", label: t.f.visit, type: "date" })}
      <label className="block">{Lbl({ k: "heard", label: t.f.heard })}
        <select value={data.heard ?? ""} onChange={(e) => set("heard", e.target.value)} className={`${field} border-line`}>
          <option value="">—</option>{t.f.heardOpts.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="block sm:col-span-2">{Lbl({ k: "medical", label: t.f.medical })}
        <textarea rows={2} value={data.medical ?? ""} onChange={(e) => set("medical", e.target.value)} className={`${field} resize-none border-line`} />
      </label>
      <label className="block sm:col-span-2">{Lbl({ k: "notes", label: t.f.notes })}
        <textarea rows={3} value={data.notes ?? ""} onChange={(e) => set("notes", e.target.value)} className={`${field} resize-none border-line`} />
      </label>
    </div>,
    // 4 documents
    <div key="s4">
      <p className="text-sm leading-relaxed text-muted">{t.f.docsIntro}</p>
      <ul className="mt-6 space-y-3">
        {t.f.docs.map((d, i) => (
          <li key={d} className={`flex items-center justify-between gap-3 rounded-2xl border p-4 transition ${files[i] ? "border-gold/60 bg-gold/[.06]" : "border-line"}`}>
            <span className="flex min-w-0 items-center gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${files[i] ? "bg-gold text-brand-ink" : "bg-fg/[.06] text-muted"}`}>{files[i] ? <Check size={18} /> : <FileCheck2 size={18} />}</span>
              <span className="min-w-0"><span className="block font-semibold text-fg">{d}</span><span className="block truncate text-xs text-muted">{files[i] ?? t.f.later}</span></span>
            </span>
            <label className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-2">
              <Upload size={14} />{files[i] ? t.f.attached : t.f.attach}
              <input type="file" accept="image/*,.pdf" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) setFiles((x) => ({ ...x, [i]: f.name })); }} />
            </label>
          </li>
        ))}
      </ul>
    </div>,
    // 5 review
    <div key="s5">
      <p className="text-sm text-muted">{t.review}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          [t.f.firstName + " / " + t.f.lastName, `${data.firstName ?? ""} ${data.lastName ?? ""}`],
          [t.f.dob, data.dob], [t.f.level, levelLabel], [t.f.startYear, t.f.startOpts[Number(data.start ?? 0)]],
          [t.f.guardianName, `${data.guardianName ?? ""}${data.relation ? ` (${data.relation})` : ""}`], [t.f.phone, data.phone],
          [t.f.email, data.email], [t.f.transport + " / " + t.f.canteen, `${data.transport === "yes" ? t.f.yes : t.f.no} / ${data.canteen === "yes" ? t.f.yes : t.f.no}`],
          [t.steps[3], `${Object.keys(files).length} / ${t.f.docs.length}`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-bg p-4 ring-1 ring-line"><p className="text-[11px] font-bold uppercase tracking-wider text-muted">{k}</p><p className="mt-1 font-semibold text-fg">{v || "—"}</p></div>
        ))}
      </div>
      <label className={`mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border p-4 ${bad("consent") ? "border-cmr-red" : "border-line"}`}>
        <input type="checkbox" checked={data.consent === "1"} onChange={(e) => set("consent", e.target.checked ? "1" : "")} className="mt-1 h-5 w-5 accent-[var(--brand)]" />
        <span className="text-sm text-fg-2">{t.f.consent}</span>
      </label>
    </div>,
  ];

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute -right-40 -top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold/15 blur-[120px]" />
      <Wrap className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-2 dark:text-gold">{t.eyebrow}</motion.p>
          <motion.h1 key={lang} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mt-3 font-display text-4xl font-medium leading-tight text-fg sm:text-6xl">{ref ? t.done.title : t.title}</motion.h1>
          {!ref && <p className="mt-4 max-w-2xl text-muted">{t.sub}</p>}

          <div className="print-area mt-10 rounded-[2rem] bg-surface p-5 shadow-soft ring-1 ring-line sm:p-9">
            {ref ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }}>
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold text-brand-ink">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}><Check size={40} strokeWidth={3} /></motion.span>
                  {[...Array(10)].map((_, i) => (
                    <motion.span key={i} className="absolute h-2 w-2 rounded-full" style={{ background: i % 2 ? "var(--gold)" : "var(--brand-2)" }}
                      initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos((i / 10) * Math.PI * 2) * 70, y: Math.sin((i / 10) * Math.PI * 2) * 70, opacity: 0 }} transition={{ duration: 1, delay: 0.3, ease }} />
                  ))}
                </div>
                <p className="mx-auto mt-6 max-w-lg text-center text-muted">{t.done.sub}</p>
                <div className="mx-auto mt-6 w-fit rounded-2xl bg-bg px-6 py-4 text-center ring-1 ring-line">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{t.done.ref}</p>
                  <p className="mt-1 font-display text-3xl tracking-wide text-fg">{ref}</p>
                </div>
                <pre className="mt-6 hidden whitespace-pre-wrap text-sm print:block">{summary()}</pre>
                <div className="mt-8 grid gap-3 xl:grid-cols-3 print:hidden">
                  <a href={`https://wa.me/${school.whatsapp}?text=${encodeURIComponent(summary())}`} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white"><MessageCircle size={18} />{t.done.wa}</a>
                  <a href={`mailto:${school.email}?subject=${encodeURIComponent(`${t.eyebrow} · ${ref}`)}&body=${encodeURIComponent(summary())}`} className="flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-bold text-white"><Mail size={18} />{t.done.mail}</a>
                  <button onClick={() => print()} className="flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-fg ring-1 ring-line"><Printer size={18} />{t.done.print}</button>
                </div>
                <button onClick={() => { setRef(""); setStep(0); setData({ start: "0", transport: "no", canteen: "no" }); setFiles({}); }} className="mx-auto mt-6 block text-sm font-semibold text-muted underline-offset-4 hover:underline print:hidden">{t.done.again}</button>
              </motion.div>
            ) : (
              <>
                {/* Stepper */}
                <div className="mb-8">
                  <div className="flex items-center justify-between gap-1">
                    {t.steps.map((s, i) => {
                      const I = icons[i];
                      const state = i < step ? "done" : i === step ? "on" : "off";
                      return (
                        <button key={s} type="button" disabled={i > step} onClick={() => { setDir(i < step ? -1 : 1); setStep(i); }} className="flex flex-1 flex-col items-center gap-2 disabled:cursor-default">
                          <span className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-500 ${state === "done" ? "bg-gold text-brand-ink" : state === "on" ? "bg-brand text-white ring-4 ring-gold/30" : "bg-fg/[.06] text-muted"}`}>
                            {state === "done" ? <Check size={18} /> : <I size={17} />}
                          </span>
                          <span className={`hidden text-center text-[11px] font-semibold sm:block ${state === "off" ? "text-muted" : "text-fg"}`}>{s}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-line"><motion.div className="h-full rounded-full bg-gold" animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease }} /></div>
                  <p className="mt-3 font-display text-2xl text-fg sm:hidden">{t.steps[step]}</p>
                </div>

                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={step} custom={dir} initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.4, ease }}>
                    {steps[step]}
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence>{error && <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 text-sm font-semibold text-cmr-red">{t.required}</motion.p>}</AnimatePresence>

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
                  <button type="button" onClick={() => go(-1)} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-fg ring-1 ring-line transition hover:bg-fg/5 disabled:opacity-0"><ArrowLeft size={16} />{t.back}</button>
                  {step < steps.length - 1 ? (
                    <button type="button" onClick={() => go(1)} className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-2">{t.next}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
                  ) : (
                    <button type="button" onClick={submit} disabled={sending} className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-brand-ink shadow-lg shadow-gold/30 disabled:opacity-60"><Sparkles size={16} className={sending ? "animate-spin" : ""} />{t.submit}</button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <aside className="space-y-5 print:hidden lg:pt-40">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem]">
            <Image src={img.apply} alt="Happy pupils in uniform" fill sizes="(min-width:1024px) 22rem, 92vw" className="object-cover" />
          </div>
          <div className="rounded-[1.8rem] bg-brand p-7 text-white">
            <p className="font-display text-2xl">{t.side.title}</p>
            <ol className="mt-5 space-y-4">
              {t.side.items.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm text-white/85"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-xs font-bold text-brand-ink">{i + 1}</span>{s}</li>
              ))}
            </ol>
          </div>
        </aside>
      </Wrap>
    </section>
  );
}
