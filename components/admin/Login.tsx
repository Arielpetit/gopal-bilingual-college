"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { Crest } from "../Brand";
import { useLang } from "../LangProvider";
import { adminText } from "@/lib/adminText";
import { img } from "@/lib/images";

export default function Login() {
  const { lang, setLang } = useLang();
  const t = adminText[lang].login;
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    setBusy(false);
    if (res.ok) router.replace("/admin");
    else setErr(res.status === 429 ? t.locked : t.wrong);
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image src={img.heroMain} alt="" fill priority sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />
        <p className="absolute bottom-12 left-12 max-w-md font-display text-4xl leading-tight text-white">{lang === "fr" ? "Chaque candidature, suivie du premier appel à l'inscription." : "Every application, tracked from first call to enrolment."}</p>
      </div>
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-fg"><ArrowLeft size={16} />{t.back}</Link>
          <div className="flex rounded-full bg-fg/[.06] p-1 text-[11px] font-bold">
            {(["en", "fr"] as const).map((l) => <button key={l} onClick={() => setLang(l)} className={`rounded-full px-2.5 py-1 uppercase ${lang === l ? "bg-surface text-fg shadow" : "text-muted"}`}>{l}</button>)}
          </div>
        </div>
        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="m-auto w-full max-w-sm py-16">
          <Crest className="h-14 w-14" />
          <h1 className="mt-6 font-display text-4xl text-fg">{t.title}</h1>
          <p className="mt-2 text-muted">{t.sub}</p>
          <label className="mt-10 block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">{t.password}</span>
            <span className="relative block">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input type="password" autoFocus required value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password"
                className="w-full rounded-2xl border border-line bg-surface py-3.5 pl-11 pr-4 text-fg outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" />
            </span>
          </label>
          {err && <p className="mt-3 text-sm font-semibold text-cmr-red">{err}</p>}
          <button disabled={busy} className="mt-6 w-full rounded-full bg-brand py-3.5 font-bold text-white transition hover:bg-brand-2 disabled:opacity-60">{t.submit}</button>
        </motion.form>
      </div>
    </div>
  );
}
