import type { NextRequest } from "next/server";
import { COOKIE, checkPassword, createSession } from "@/lib/server/auth";

const attempts = new Map<string, { n: number; until: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const a = attempts.get(ip);
  if (a && a.until > Date.now()) return Response.json({ error: "too many attempts" }, { status: 429 });
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(String(password ?? ""))) {
    const n = (a?.n ?? 0) + 1;
    attempts.set(ip, { n, until: n >= 5 ? Date.now() + 5 * 60_000 : 0 });
    return Response.json({ error: "invalid" }, { status: 401 });
  }
  attempts.delete(ip);
  const { value, maxAge } = createSession();
  const res = Response.json({ ok: true });
  res.headers.append("Set-Cookie", `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
  return res;
}
