"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), anchors: { offset: -80 } });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);

    // Smooth-scroll "/#section" links when already on the home page.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='/#']") as HTMLAnchorElement | null;
      if (!a || location.pathname !== "/") return;
      const el = document.getElementById(a.getAttribute("href")!.slice(2));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
      history.replaceState(null, "", a.getAttribute("href")!.slice(1));
    };
    document.addEventListener("click", onClick);

    // After navigating to "/#section" from another page, land on that section.
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => lenis.scrollTo(el, { offset: -80, immediate: true }), 50);
    }
    return () => { cancelAnimationFrame(id); document.removeEventListener("click", onClick); lenis.destroy(); };
  }, []);
  return null;
}
