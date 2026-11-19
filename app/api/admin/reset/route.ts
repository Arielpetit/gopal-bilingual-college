import type { NextRequest } from "next/server";
import { isAuthed, unauthorized } from "@/lib/server/auth";
import { resetDemo } from "@/lib/server/store";

// Restores the fictional demo data. Only allowed while DEMO_SEED=true, so real applications are never wiped.
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  if (process.env.DEMO_SEED !== "true") return Response.json({ error: "disabled" }, { status: 403 });
  try { return Response.json({ count: await resetDemo() }); }
  catch (e) { return Response.json({ error: (e as Error).message }, { status: 500 }); }
}
