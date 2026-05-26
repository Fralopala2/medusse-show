"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { prefersReducedMotion, refreshScrollTrigger } from "@/lib/gsap/scroll-effects";

function shouldUseLenis(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  // Lenis rompe clics y anclas en móvil/táctil
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  if (window.matchMedia("(max-width: 768px)").matches) return false;
  return true;
}

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || !shouldUseLenis()) return;

    registerGsapPlugins();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => refreshScrollTrigger();
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => refreshScrollTrigger());

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [enabled]);
}
