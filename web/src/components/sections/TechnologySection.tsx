"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { ExpandOnScrollImage } from "@/components/motion/ExpandOnScrollImage";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { sectionImages } from "@/lib/data";
import { registerGsapPlugins } from "@/lib/gsap/register";
import { createParallax } from "@/lib/gsap/scroll-effects";

interface TechnologySectionProps {
  data: {
    title: string;
    subtitle: string;
    points: string[];
  };
  id?: string;
}

export function TechnologySection({ data, id }: TechnologySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const visual = visualRef.current;
      if (!section || !visual) return;
      registerGsapPlugins();
      return createParallax(visual, section, -12);
    },
    { scope: sectionRef }
  );

  return (
    <Section
      ref={sectionRef}
      id={id}
      className="bg-cinematic-surface py-24 flex items-center"
    >
      <Container className="flex flex-col lg:flex-row items-center gap-14">
        <RevealGroup className="flex-1">
          <p
            data-reveal
            className="text-cinematic-accent text-sm uppercase tracking-widest mb-3"
          >
            Arquitectura
          </p>
          <h2
            data-reveal
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            {data.title}
          </h2>
          <p data-reveal className="text-lg text-medusse-gray mb-8">
            {data.subtitle}
          </p>

          <ul className="space-y-4 mb-10">
            {data.points.map((point, index) => (
              <li
                key={index}
                data-reveal
                className="flex items-center gap-3 text-base text-white/85"
              >
                <CheckCircle2 className="text-cinematic-accent w-5 h-5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          <div data-reveal>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "https://github.com/Fralopala2/medusse-show/blob/clase/README.md",
                  "_blank"
                )
              }
            >
              Descargar documentación técnica
            </Button>
          </div>
        </RevealGroup>

        <div
          ref={visualRef}
          className="flex-1 w-full min-h-[400px] rounded-2xl overflow-hidden relative glass-card"
        >
          <ExpandOnScrollImage
            src={sectionImages.technology}
            alt="Stack tecnológico"
            className="relative !absolute inset-0 rounded-2xl"
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="text-center p-8 glass-card rounded-xl">
              <div className="font-mono text-5xl sm:text-6xl font-bold text-gradient-iot mb-2">
                MQTT
              </div>
              <div className="text-xs text-medusse-gray uppercase tracking-[0.25em]">
                Protocolo IoT
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
