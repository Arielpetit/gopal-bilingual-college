import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const COOKIE = "gbic_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

const secret = () => process.env.SESSION_SECRET || "dev-only-secret-change-me";
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("base64url");

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const a = Buffer.from(input), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createSession() {
  const payload = `admin.${Date.now() + MAX_AGE * 1000}`;
  return { value: `${payload}.${sign(payload)}`, maxAge: MAX_AGE };
}

export function isAuthed(req: NextRequest) {
  const raw = req.cookies.get(COOKIE)?.value;
  if (!raw) return false;
  const i = raw.lastIndexOf(".");
  const payload = raw.slice(0, i), sig = raw.slice(i + 1);
  const good = sign(payload);
  if (sig.length !== good.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return false;
  return Number(payload.split(".")[1]) > Date.now();
}

export const unauthorized = () => Response.json({ error: "unauthorized" }, { status: 401 });
