import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Application, Activity, Stage } from "../admissions";
import { seedApplications } from "./seed";

/*
  Storage for admissions.
  - Supabase (table public.applications) when NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRET_KEY are set.
  - Otherwise a local JSON file (data/applications.json), so the demo runs with zero setup.
  The API routes and dashboard only use the exported functions below.
*/

type Row = {
  id: string; ref: string; created_at: string; updated_at: string; stage: Stage; lang: "en" | "fr";
  student: Application["student"]; level: Application["level"]; start: number; guardian: Application["guardian"];
  prefs: Application["prefs"]; docs: string[]; visit_at: string; scores: Application["scores"]; activity: Activity[];
};
const toApp = (r: Row): Application => ({
  id: r.id, ref: r.ref, createdAt: r.created_at, updatedAt: r.updated_at, stage: r.stage, lang: r.lang, student: r.student,
  level: r.level, start: r.start, guardian: r.guardian, prefs: r.prefs, docs: r.docs, visitAt: r.visit_at, scores: r.scores, activity: r.activity,
});
const toRow = (a: Application): Row => ({
  id: a.id, ref: a.ref, created_at: a.createdAt, updated_at: a.updatedAt, stage: a.stage, lang: a.lang, student: a.student,
  level: a.level, start: a.start, guardian: a.guardian, prefs: a.prefs, docs: a.docs, visit_at: a.visitAt, scores: a.scores, activity: a.activity,
});

let client: SupabaseClient | null = null;
function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  client ??= createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}
const demoSeed = () => process.env.DEMO_SEED === "true";

/* ---------- JSON file fallback ---------- */
const FILE = path.join(process.cwd(), "data", "applications.json");
let queue: Promise<unknown> = Promise.resolve();
async function fileRead(): Promise<Application[]> {
  try { return JSON.parse(await fs.readFile(FILE, "utf8")); }
  catch { const s = demoSeed() ? seedApplications() : []; await fileWrite(s); return s; }
}
async function fileWrite(list: Application[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2));
  await fs.rename(tmp, FILE);
}
function locked<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}

/* ---------- public API ---------- */
export const backend = () => (db() ? "supabase" : "file");

export async function listApplications(): Promise<Application[]> {
  const sb = db();
  if (!sb) return (await fileRead()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const { data, error } = await sb.from("applications").select("*").order("created_at", { ascending: false }).limit(2000);
  if (error) throw new Error(`Supabase: ${error.message}`);
  if (data.length === 0 && demoSeed()) {
    const seeded = seedApplications();
    const ins = await sb.from("applications").insert(seeded.map(toRow));
    if (ins.error) throw new Error(`Supabase: ${ins.error.message}`);
    return seeded.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  return (data as Row[]).map(toApp);
}

type NewApp = Omit<Application, "id" | "ref" | "createdAt" | "updatedAt" | "stage" | "activity" | "visitAt" | "scores">;

export async function createApplication(input: NewApp): Promise<Application> {
  const now = new Date().toISOString();
  const make = (): Application => ({
    ...input, id: randomUUID(), ref: `GBIC-${now.slice(2, 4)}-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: now, updatedAt: now, stage: "new", visitAt: "", scores: { english: null, french: null, maths: null },
    activity: [{ at: now, type: "created", text: "Application submitted online", by: "Parent" }],
  });
  const sb = db();
  if (!sb) return locked(async () => { const all = await fileRead(); const a = make(); all.push(a); await fileWrite(all); return a; });
  for (let i = 0; i < 5; i++) { // retry on the rare duplicate reference
    const a = make();
    const { error } = await sb.from("applications").insert(toRow(a));
    if (!error) return a;
    if (error.code !== "23505") throw new Error(`Supabase: ${error.message}`);
  }
  throw new Error("Could not allocate a reference number");
}

type Patch = { stage?: Stage; visitAt?: string; scores?: Application["scores"]; note?: string; message?: string };

function applyPatch(app: Application, patch: Patch, by: string) {
  const now = new Date().toISOString();
  const log = (type: Activity["type"], text: string) => app.activity.push({ at: now, type, text, by });
  if (patch.stage && patch.stage !== app.stage) { log("stage", `${app.stage} → ${patch.stage}`); app.stage = patch.stage; }
  if (patch.visitAt !== undefined && patch.visitAt !== app.visitAt) { app.visitAt = patch.visitAt; log("update", patch.visitAt ? `Visit scheduled: ${patch.visitAt}` : "Visit cleared"); }
  if (patch.scores) { app.scores = patch.scores; log("update", "Placement test scores updated"); }
  if (patch.note?.trim()) log("note", patch.note.trim().slice(0, 2000));
  if (patch.message?.trim()) log("message", patch.message.trim().slice(0, 2000));
  app.updatedAt = now;
  return app;
}

export async function updateApplication(id: string, patch: Patch, by = "Admissions"): Promise<Application | null> {
  const sb = db();
  if (!sb) return locked(async () => {
    const all = await fileRead();
    const app = all.find((a) => a.id === id);
    if (!app) return null;
    applyPatch(app, patch, by);
    await fileWrite(all);
    return app;
  });
  const { data, error } = await sb.from("applications").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`Supabase: ${error.message}`);
  if (!data) return null;
  const app = applyPatch(toApp(data as Row), patch, by);
  const r = toRow(app);
  const up = await sb.from("applications")
    .update({ stage: r.stage, visit_at: r.visit_at, scores: r.scores, activity: r.activity, updated_at: r.updated_at })
    .eq("id", id);
  if (up.error) throw new Error(`Supabase: ${up.error.message}`);
  return app;
}

/** Replace everything with the fictional demo data (dashboard "Reset demo" button). */
export async function resetDemo(): Promise<number> {
  const seeded = seedApplications();
  const sb = db();
  if (!sb) return locked(async () => { await fileWrite(seeded); return seeded.length; });
  const del = await sb.from("applications").delete().not("id", "is", null);
  if (del.error) throw new Error(`Supabase: ${del.error.message}`);
  const ins = await sb.from("applications").insert(seeded.map(toRow));
  if (ins.error) throw new Error(`Supabase: ${ins.error.message}`);
  return seeded.length;
}
