"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { createRevealStagger } from "@/lib/gsap/scroll-effects";
import { registerGsapPlugins } from "@/lib/gsap/register";

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  selector?: string;
}

export function RevealGroup({
  children,
  className,
  selector = "[data-reveal]",
}: RevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const container = containerRef.current;
      if (!container) return;

      return createRevealStagger(container, selector);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
