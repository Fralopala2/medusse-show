"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ExpandOnScrollImage } from "@/components/motion/ExpandOnScrollImage";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { sectionImages } from "@/lib/data";

interface AboutSectionProps {
  data: {
    title: string;
    text: string;
  };
  id?: string;
}

export function AboutSection({ data, id }: AboutSectionProps) {
  return (
    <Section id={id} className="bg-cinematic-surface py-24 flex items-center">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative min-h-[360px] rounded-2xl overflow-hidden order-2 lg:order-1">
            <ExpandOnScrollImage
              src={sectionImages.about}
              alt="Proyecto TFG"
              className="relative rounded-2xl !absolute inset-0"
            />
          </div>

          <RevealGroup className="order-1 lg:order-2 text-center lg:text-left">
            <p
              data-reveal
              className="text-cinematic-accent text-sm uppercase tracking-widest mb-3"
            >
              TFG · IES Botet
            </p>
            <h2
              data-reveal
              className="font-display text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              {data.title}
            </h2>
            <p
              data-reveal
              className="text-lg text-medusse-gray leading-relaxed mb-10"
            >
              {data.text}
            </p>
            <div data-reveal>
              <Button
                size="xl"
                onClick={() =>
                  (window.location.href =
                    "mailto:pacoaldev@gmail.com?subject=Consulta sobre Medusse IoT&body=Hola, me gustaría obtener más información sobre el proyecto Medusse IoT.")
                }
              >
                Contactar
              </Button>
            </div>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
