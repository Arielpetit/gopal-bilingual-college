import type { NextRequest } from "next/server";
import { isAuthed, unauthorized } from "@/lib/server/auth";
import { backend, listApplications } from "@/lib/server/store";

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  try {
    return Response.json({ applications: await listApplications(), backend: backend(), demo: process.env.DEMO_SEED === "true" });
  } catch (e) {
    return Response.json({ error: (e as Error).message, backend: backend() }, { status: 500 });
  }
}
