import { ImageResponse } from "next/og";
import { CrestSvg } from "@/lib/ogCrest";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}><CrestSvg size={60} /></div>, { ...size });
}
