import type { NextRequest } from "next/server";
import { isAuthed, unauthorized } from "@/lib/server/auth";
import { updateApplication } from "@/lib/server/store";
import { STAGES, type Stage } from "@/lib/admissions";

const score = (v: unknown) => (v === null || v === "" || v === undefined ? null : Math.max(0, Math.min(100, Math.round(Number(v)))) || 0);

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) return unauthorized();
  const { id } = await ctx.params;
  const b = await req.json().catch(() => ({}));
  if (b.stage && !STAGES.includes(b.stage)) return Response.json({ error: "bad stage" }, { status: 400 });
  let app;
  try {
  app = await updateApplication(id, {
    stage: b.stage as Stage | undefined,
    visitAt: typeof b.visitAt === "string" ? b.visitAt.slice(0, 16) : undefined,
    scores: b.scores ? { english: score(b.scores.english), french: score(b.scores.french), maths: score(b.scores.maths) } : undefined,
    note: typeof b.note === "string" ? b.note : undefined,
    message: typeof b.message === "string" ? b.message : undefined,
  }, typeof b.by === "string" && b.by.trim() ? b.by.trim().slice(0, 60) : "Admissions");
  } catch (e) { return Response.json({ error: (e as Error).message }, { status: 500 }); }
  if (!app) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json({ application: app });
}
