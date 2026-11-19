import { createApplication } from "@/lib/server/store";
import { applyLevels } from "@/lib/programs";

const s = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Public endpoint used by the online admission form.
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return Response.json({ error: "invalid json" }, { status: 400 }); }
  if (s(b.website)) return Response.json({ ok: true, ref: "GBIC-00-00000" }); // honeypot: silently drop bots

  const [group, index] = s(b.level, 10).split(":").map(Number);
  const levelOk = Number.isInteger(group) && Number.isInteger(index) && applyLevels.en[group]?.options[index] !== undefined;
  const required = [s(b.firstName), s(b.lastName), s(b.dob, 10), s(b.guardianName), s(b.phone, 40)];
  if (required.some((v) => !v) || !levelOk || !["m", "f"].includes(s(b.gender, 1))) {
    return Response.json({ error: "missing required fields" }, { status: 422 });
  }

  let app;
  try {
  app = await createApplication({
    lang: b.lang === "fr" ? "fr" : "en",
    student: { firstName: s(b.firstName, 80), lastName: s(b.lastName, 80), dob: s(b.dob, 10), gender: s(b.gender, 1) as "m" | "f", nationality: s(b.nationality, 80), currentSchool: s(b.currentSchool, 120) },
    level: { group, index },
    start: Math.min(2, Math.max(0, Number(b.start) || 0)),
    guardian: { name: s(b.guardianName, 120), relation: s(b.relation, 40), phone: s(b.phone, 40), whatsapp: s(b.whatsapp, 40), email: s(b.email, 120), address: s(b.address, 200), profession: s(b.profession, 80) },
    prefs: { transport: b.transport === "yes", canteen: b.canteen === "yes", visitDate: s(b.visit, 10), heard: s(b.heard, 60), medical: s(b.medical, 500), notes: s(b.notes, 1000) },
    docs: Array.isArray(b.docs) ? b.docs.slice(0, 10).map((d) => s(d, 120)).filter(Boolean) : [],
  });
  } catch (e) { console.error(e); return Response.json({ error: "storage error" }, { status: 500 }); }
  return Response.json({ ok: true, ref: app.ref });
}
