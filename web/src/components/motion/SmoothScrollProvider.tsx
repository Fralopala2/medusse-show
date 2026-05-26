"use client";

import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";
import { refreshScrollTrigger } from "@/lib/gsap/scroll-effects";
import { scrollToHash } from "@/lib/scroll-to-hash";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  className?: string;
}

export function SmoothScrollProvider({
  children,
  className,
}: SmoothScrollProviderProps) {
  useSmoothScroll(true);

  useEffect(() => {
    registerGsapPlugins();
    const timer = setTimeout(() => refreshScrollTrigger(), 100);

    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    }

    return () => clearTimeout(timer);
  }, []);

  return <div className={className}>{children}</div>;
}
