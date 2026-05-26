"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ExpandOnScrollImage } from "@/components/motion/ExpandOnScrollImage";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/scroll-to-hash";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  darkText?: boolean;
  ctas?: {
    primary: string;
    secondary?: string;
    primaryAction?: string;
    secondaryAction?: string;
  }[];
  features?: string[];
  id?: string;
}

function handleCtaAction(action?: string) {
  if (!action) return;
  if (action.startsWith("http")) {
    window.open(action, "_blank");
  } else if (action.startsWith("#")) {
    scrollToHash(action);
  } else if (action.startsWith("/")) {
    window.location.href = action;
  }
}

export function HeroSection({
  title,
  subtitle,
  description,
  backgroundImage,
  darkText = false,
  ctas,
  features,
  id,
}: HeroSectionProps) {
  return (
    <Section id={id} className="flex items-center justify-center">
      {backgroundImage ? (
        <ExpandOnScrollImage
          src={backgroundImage}
          alt={title}
          darkText={darkText}
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-cinematic-surface grid-pattern" />
      )}

      <div className="absolute inset-0 z-[2] noise-overlay pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center text-center min-h-[100svh] justify-center pt-20 px-4 sm:px-6 lg:px-8 touch-manipulation">
        <RevealGroup className="flex flex-col items-center gap-4 max-w-4xl">
          <p
            data-reveal
            className="text-xs uppercase tracking-[0.3em] text-cinematic-accent font-medium"
          >
            Medusse IoT · TFG 2025/2026
          </p>
          <h1
            data-reveal
            className={cn(
              "font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight",
              darkText ? "text-cinematic-bg" : "text-white"
            )}
          >
            {title === "Medusse IoT" ? (
              <span className="text-gradient-iot">{title}</span>
            ) : (
              title
            )}
          </h1>

          {subtitle && (
            <p
              data-reveal
              className={cn(
                "text-xl md:text-2xl font-medium",
                darkText ? "text-cinematic-bg/80" : "text-white/90"
              )}
            >
              {subtitle}
            </p>
          )}

          {description && (
            <p
              data-reveal
              className={cn(
                "text-sm md:text-lg max-w-2xl mt-2 leading-relaxed",
                darkText ? "text-cinematic-bg/70" : "text-white/75"
              )}
            >
              {description}
            </p>
          )}

          {features && features.length > 0 && (
            <ul
              data-reveal
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-left text-sm md:text-base max-w-2xl"
            >
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      darkText ? "bg-medusse-blue" : "bg-cinematic-accent"
                    )}
                  />
                  <span
                    className={
                      darkText ? "text-cinematic-bg/90" : "text-white/85"
                    }
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div
            data-reveal
            className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
          >
          {ctas?.map((cta, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4">
              <Button
                variant={darkText ? "dark" : "default"}
                size="lg"
                className="w-full sm:w-auto min-w-[180px]"
                onClick={() => handleCtaAction(cta.primaryAction)}
              >
                {cta.primary}
              </Button>
              {cta.secondary && (
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(
                    "w-full sm:w-auto min-w-[180px]",
                    darkText &&
                      "border-cinematic-bg/30 text-cinematic-bg hover:bg-cinematic-bg/10"
                  )}
                  onClick={() => handleCtaAction(cta.secondaryAction)}
                >
                  {cta.secondary}
                </Button>
              )}
            </div>
          ))}
          </div>
        </RevealGroup>
      </Container>
    </Section>
  );
}
