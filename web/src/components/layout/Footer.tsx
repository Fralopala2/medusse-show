"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { prefersReducedMotion } from "@/lib/gsap/scroll-effects";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !lineRef.current || !footerRef.current)
        return;
      registerGsapPlugins();

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="contacto"
      className="relative bg-cinematic-bg border-t border-white/5 py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={lineRef}
          className="h-px w-full bg-gradient-to-r from-transparent via-cinematic-accent to-transparent mb-10 origin-left"
        />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-semibold text-white mb-1">
              Medusse IoT
            </p>
            <p className="text-sm text-medusse-gray">
              © Pacoaldev 2025 · TFG IES José Rodrigo Botet
            </p>
            <a
              href="mailto:pacoaldev@gmail.com"
              className="text-sm text-cinematic-accent hover:underline mt-1 inline-block"
            >
              pacoaldev@gmail.com
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/aviso-legal"
              className="text-medusse-gray hover:text-white transition-colors"
            >
              Aviso Legal
            </Link>
            <Link
              href="/politica-privacidad"
              className="text-medusse-gray hover:text-white transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/mapa-sitio"
              className="text-medusse-gray hover:text-white transition-colors"
            >
              Mapa del Sitio
            </Link>
            <Link
              href="/capturas"
              className="text-medusse-gray hover:text-white transition-colors"
            >
              Capturas App
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
