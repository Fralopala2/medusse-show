"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { createImageExpand } from "@/lib/gsap/scroll-effects";
import { registerGsapPlugins } from "@/lib/gsap/register";

interface ExpandOnScrollImageProps {
  src: string;
  alt?: string;
  className?: string;
  overlayClassName?: string;
  darkText?: boolean;
}

export function ExpandOnScrollImage({
  src,
  alt = "",
  className,
  overlayClassName,
  darkText = false,
}: ExpandOnScrollImageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      return createImageExpand(image, section);
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}
    >
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform pointer-events-none"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
      <div
        className={cn(
          "absolute inset-0 z-[1] pointer-events-none",
          darkText
            ? "bg-gradient-to-b from-white/70 via-white/40 to-[#0a0e17]/90"
            : "bg-gradient-to-b from-[#0a0e17]/40 via-[#0a0e17]/60 to-[#0a0e17]/95",
          overlayClassName
        )}
      />
    </div>
  );
}
