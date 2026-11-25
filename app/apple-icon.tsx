import { ImageResponse } from "next/og";
import { CrestSvg } from "@/lib/ogCrest";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#f8f5ee" }}><CrestSvg size={150} /></div>,
    { ...size },
  );
}
