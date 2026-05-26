"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { createParallax } from "@/lib/gsap/scroll-effects";
import { registerGsapPlugins } from "@/lib/gsap/register";

interface ParallaxLayerProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function ParallaxLayer({
  children,
  className,
  speed = -15,
  triggerRef,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const localTriggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const layer = layerRef.current;
      const trigger = triggerRef?.current ?? localTriggerRef.current;
      if (!layer || !trigger) return;

      return createParallax(layer, trigger, speed);
    },
    { dependencies: [speed], scope: localTriggerRef }
  );

  return (
    <div ref={localTriggerRef} className="relative">
      <div ref={layerRef} className={cn("will-change-transform", className)}>
        {children}
      </div>
    </div>
  );
}
