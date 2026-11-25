// Shield crest used by the generated social image and icons (satori-compatible markup:
// no <text> inside SVG, so the "G" is an HTML node laid over the shield).
export function CrestSvg({ size }: { size: number }) {
  return (
    <div style={{ display: "flex", position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 48 48" style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#13684c" />
            <stop offset="1" stopColor="#063524" />
          </linearGradient>
        </defs>
        <path d="M24 2 43 9v14c0 11.5-7.8 19.6-19 23C12.8 42.6 5 34.5 5 23V9z" fill="url(#g)" />
        <path d="M24 5.5 40 11.4V23c0 9.6-6.4 16.5-16 19.6C14.4 39.5 8 32.6 8 23V11.4z" fill="none" stroke="#e8a825" strokeWidth="1.2" />
        <path d="m24 9.5 1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5z" fill="#e8a825" />
      </svg>
      <div style={{ position: "absolute", left: 0, width: size, top: size * 0.4, display: "flex", justifyContent: "center", fontSize: size * 0.36, fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>G</div>
    </div>
  );
}
