"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  darkText?: boolean; // If true, text is black (for light backgrounds)
  ctas?: {
    primary: string;
    secondary?: string;
  }[];
  features?: string[];
  id?: string;
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
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundColor: !backgroundImage ? "#f5f5f5" : undefined,
        }}
      />
      
      {/* Overlay for better text readability if needed */}
      {backgroundImage && !darkText && (
        <div className="absolute inset-0 bg-black/30 z-0" />
      )}

      <Container className="relative z-10 flex flex-col items-center text-center h-full justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "flex flex-col items-center gap-4 max-w-3xl",
            darkText ? "text-soleares-black" : "text-white"
          )}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl font-medium opacity-90">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-sm md:text-base opacity-80 max-w-xl mt-2">
              {description}
            </p>
          )}

          {features && features.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-left text-sm md:text-base">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={cn("h-1.5 w-1.5 rounded-full", darkText ? "bg-soleares-blue" : "bg-white")} />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* CTAs - Pushed to bottom or just below text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          {ctas?.map((cta, i) => (
            <div key={i} className="flex gap-4">
               <Button
                variant={darkText ? "default" : "secondary"}
                size="lg"
                className="w-full sm:w-auto min-w-[160px]"
              >
                {cta.primary}
              </Button>
              {cta.secondary && (
                <Button
                  variant={darkText ? "outline" : "outline"}
                  size="lg"
                  className={cn(
                    "w-full sm:w-auto min-w-[160px]",
                    darkText ? "border-soleares-black text-soleares-black hover:bg-soleares-black hover:text-white" : "text-white border-white hover:bg-white hover:text-black"
                  )}
                >
                  {cta.secondary}
                </Button>
              )}
            </div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
