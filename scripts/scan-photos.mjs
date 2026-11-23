// Lists the school's own photos in public/gopal so the site can prefer them over stock images.
// Runs automatically before `npm run dev` and `npm run build`.
import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname, basename } from "node:path";

const dir = join(process.cwd(), "public", "gopal");
mkdirSync(dir, { recursive: true });
const ok = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"]);
const files = readdirSync(dir).filter((f) => ok.has(extname(f).toLowerCase()));
const manifest = Object.fromEntries(files.map((f) => [basename(f, extname(f)).toLowerCase(), `/gopal/${f}`]));
writeFileSync(join(process.cwd(), "lib", "gopal-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`[gopal photos] ${files.length} school photo(s) found`);
