"use client";
import Image from "next/image";
import { FlaskConical, Cpu, Library, Trophy, Baby, MapPin } from "lucide-react";
import { useLang } from "./LangProvider";
import { Reveal, SectionHead, Wrap } from "./ui";
import { img } from "@/lib/images";

const pics = [img.facilities.science, img.facilities.computer, img.facilities.library, img.facilities.sports, img.facilities.earlyYears, img.facilities.campus];
const icons = [FlaskConical, Cpu, Library, Trophy, Baby, MapPin];
// bento layout: big tiles at 0 and 5
const span = ["md:col-span-2 md:row-span-2", "", "", "", "", "sm:col-span-2 md:col-span-4"];

export default function Facilities() {
  const { t } = useLang();
  const f = t.facilities;
  return (
    <section id="facilities" className="py-24 sm:py-32">
      <Wrap>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead eyebrow={f.eyebrow} title={f.title} />
          <Reveal className="max-w-sm"><p className="text-muted">{f.sub}</p></Reveal>
        </div>
        <div className="mt-14 grid auto-rows-[15rem] gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[14rem]">
          {f.items.map((it, i) => {
            const I = icons[i];
            return (
              <Reveal key={i} delay={(i % 4) * 0.07} className={`${span[i]} h-full`}>
                <div className="group relative h-full overflow-hidden rounded-[1.8rem]">
                  <Image src={pics[i]} alt={it.title} fill sizes={i === 0 ? "(min-width:768px) 50vw, 92vw" : "(min-width:768px) 25vw, 92vw"} className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-brand-ink"><I size={18} /></span>
                    <h3 className={`mt-3 font-display ${i === 0 ? "text-3xl" : "text-xl"}`}>{it.title}</h3>
                    <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100 [@media(hover:none)]:max-h-20 [@media(hover:none)]:opacity-100">{it.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
