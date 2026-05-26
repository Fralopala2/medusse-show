"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { createRevealStagger, prefersReducedMotion } from "@/lib/gsap/scroll-effects";

interface Service {
  title: string;
  price: string;
}

interface ServicesGridProps {
  services: Service[];
  id?: string;
}

export function ServicesGrid({ services, id }: ServicesGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      registerGsapPlugins();
      return createRevealStagger(gridRef.current, "[data-service]");
    },
    { scope: gridRef }
  );

  const handleCardHover = (
    el: HTMLElement,
    entering: boolean
  ) => {
    if (prefersReducedMotion()) return;
    gsap.to(el, {
      scale: entering ? 1.03 : 1,
      boxShadow: entering
        ? "0 20px 60px rgba(33, 150, 243, 0.25)"
        : "0 8px 32px rgba(0, 0, 0, 0.35)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <Section id={id} className="bg-cinematic-bg py-24 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-cinematic-accent/5 via-transparent to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <RevealGroup>
          <h2
            data-reveal
            className="font-display text-3xl md:text-5xl font-bold mb-4 text-center text-white"
          >
            Servicios
          </h2>
          <p
            data-reveal
            className="text-medusse-gray text-center mb-14 max-w-2xl mx-auto"
          >
            Instalación, soporte y formación para desplegar Medusse IoT en tu
            entorno
          </p>
        </RevealGroup>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              data-service
              className="glass-card rounded-2xl p-8 flex flex-col justify-center items-center text-center min-h-[200px] cursor-default"
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            >
              <h3 className="text-lg font-semibold text-white mb-4 leading-snug">
                {service.title}
              </h3>
              <p className="font-display text-2xl font-bold text-gradient-iot">
                {service.price}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
