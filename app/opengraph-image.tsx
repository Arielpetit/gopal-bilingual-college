import { ImageResponse } from "next/og";
import { CrestSvg } from "@/lib/ogCrest";

export const alt = "Gopal Bilingual International College · Two languages. One bright future.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "linear-gradient(135deg,#0c4a36 0%,#062a1f 60%,#041510 100%)", color: "#fff", fontFamily: "sans-serif" }}>
        {/* glow + gold bar */}
        <div style={{ position: "absolute", right: -160, top: -160, width: 620, height: 620, borderRadius: 620, background: "rgba(232,168,37,0.16)" }} />
        <div style={{ position: "absolute", left: -120, bottom: -220, width: 520, height: 520, borderRadius: 520, background: "rgba(23,105,76,0.55)" }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 14, display: "flex" }}>
          <div style={{ flex: 1, background: "#17694c" }} />
          <div style={{ flex: 1, background: "#c4372d" }} />
          <div style={{ flex: 1, background: "#e8a825" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px 78px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <CrestSvg size={92} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }}>Gopal</div>
              <div style={{ fontSize: 20, letterSpacing: 5, color: "#e8a825", marginTop: 4 }}>BILINGUAL INTERNATIONAL COLLEGE</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>Two languages.</div>
            <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#e8a825" }}>One bright future.</div>
            <div style={{ fontSize: 30, color: "rgba(255,255,255,0.78)", marginTop: 26 }}>English &amp; French education, from nursery to GCE A Level and Baccalauréat</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "rgba(255,255,255,0.85)" }}>
            <div style={{ display: "flex", padding: "8px 20px", borderRadius: 40, background: "#e8a825", color: "#062a1f", fontWeight: 700 }}>Admissions open</div>
            <div style={{ display: "flex" }}>Bastos, Yaoundé · Cameroon</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
