"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { school } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Reveal, SectionHead, Wrap } from "./ui";

export default function Contact({ head = true }: { head?: boolean }) {
  const { t } = useLang();
  const c = t.contact;
  const [sent, setSent] = useState(false);
  const field = "peer w-full rounded-2xl border border-line bg-bg px-4 pb-2.5 pt-6 text-fg outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20";
  const label = "pointer-events-none absolute left-4 top-2 text-[11px] font-bold uppercase tracking-wider text-muted";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = [`${school.short} · ${d.get("level")}`, `${c.form.name}: ${d.get("name")}`, `${c.form.phone}: ${d.get("phone")}`, d.get("email") ? `${c.form.email}: ${d.get("email")}` : "", "", String(d.get("message") || "")].filter((l, i) => l || i === 4).join("\n");
    setSent(true);
    window.open(`https://wa.me/${school.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setTimeout(() => setSent(false), 4000);
  }

  const info = [
    { I: MapPin, k: c.labels.address, v: school.address },
    { I: Phone, k: c.labels.phone, v: school.phone, href: `tel:${school.phone.replace(/\s/g, "")}` },
    { I: Mail, k: c.labels.email, v: school.email, href: `mailto:${school.email}` },
    { I: Clock, k: c.labels.hours, v: c.hoursVal },
  ];

  return (
    <section id="contact" className={head ? "py-24 sm:py-32" : "py-16 sm:py-24"}>
      <Wrap className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          {head && <SectionHead eyebrow={c.eyebrow} title={c.title} sub={c.sub} />}
          <div className={`${head ? "mt-10" : ""} grid gap-3 sm:grid-cols-2`}>
            {info.map(({ I, k, v, href }, i) => (
              <Reveal key={k} delay={i * 0.06}>
                <a href={href} className={`flex h-full gap-4 rounded-2xl bg-surface p-5 ring-1 ring-line transition ${href ? "hover:ring-gold" : "pointer-events-none"}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-gold"><I size={18} /></span>
                  <span><span className="block text-[11px] font-bold uppercase tracking-wider text-muted">{k}</span><span className="mt-1 block text-sm font-semibold text-fg">{v}</span></span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-3 overflow-hidden rounded-2xl ring-1 ring-line">
              <iframe title="Map: Bastos, Yaoundé" loading="lazy" className="h-60 w-full border-0 dark:opacity-80 dark:invert-[.9] dark:hue-rotate-180"
                src="https://www.openstreetmap.org/export/embed.html?bbox=11.505%2C3.885%2C11.535%2C3.905&layer=mapnik" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="relative overflow-hidden rounded-[2.2rem] bg-surface p-6 shadow-soft ring-1 ring-line sm:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative space-y-4">
              <label className="relative block"><input required name="name" placeholder=" " className={field} /><span className={label}>{c.form.name}</span></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="relative block"><input required type="tel" name="phone" placeholder=" " className={field} /><span className={label}>{c.form.phone}</span></label>
                <label className="relative block"><input type="email" name="email" placeholder=" " className={field} /><span className={label}>{c.form.email}</span></label>
              </div>
              <label className="relative block">
                <select name="level" className={`${field} appearance-none`}>{c.levels.map((l) => <option key={l}>{l}</option>)}</select>
                <span className={label}>{c.form.level}</span>
              </label>
              <label className="relative block"><textarea name="message" rows={4} placeholder=" " className={`${field} resize-none`} /><span className={label}>{c.form.message}</span></label>
              <motion.button whileTap={{ scale: 0.97 }} className="flex w-full items-center justify-center gap-2.5 rounded-full bg-brand py-4 font-bold text-white transition hover:bg-brand-2">
                <MessageCircle size={20} className="text-gold" />{sent ? c.form.sent : c.form.send}
              </motion.button>
            </div>
          </form>
        </Reveal>
      </Wrap>
    </section>
  );
}
