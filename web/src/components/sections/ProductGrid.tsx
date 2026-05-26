"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ExpandOnScrollImage } from "@/components/motion/ExpandOnScrollImage";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { registerGsapPlugins } from "@/lib/gsap/register";
import { createRevealStagger } from "@/lib/gsap/scroll-effects";

interface Product {
  name: string;
  price: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  id?: string;
  sectionImage?: string;
}

export function ProductGrid({
  title,
  products,
  id,
  sectionImage,
}: ProductGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      registerGsapPlugins();
      return createRevealStagger(gridRef.current, "[data-product]");
    },
    { scope: gridRef }
  );

  return (
    <Section id={id} className="bg-cinematic-bg py-24 flex items-center">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {sectionImage && (
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[480px] rounded-2xl overflow-hidden">
              <ExpandOnScrollImage
                src={sectionImage}
                alt={title}
                className="relative rounded-2xl !absolute inset-0"
              />
              <div className="absolute inset-0 z-10 flex items-end p-6">
                <p className="font-display text-2xl font-bold text-white drop-shadow-lg">
                  {title}
                </p>
              </div>
            </div>
          )}

          <div className={sectionImage ? "lg:col-span-7" : "lg:col-span-12"}>
            <RevealGroup>
              {!sectionImage && (
                <h2
                  data-reveal
                  className="font-display text-3xl md:text-5xl font-bold mb-12 text-white"
                >
                  {title}
                </h2>
              )}

              <div
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {products.map((product, index) => (
                  <div
                    key={index}
                    data-product
                    className={`glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-cinematic-accent/30 transition-colors ${
                      index === 0 ? "md:col-span-2 md:p-8" : ""
                    }`}
                  >
                    <span className="font-medium text-white/90 leading-snug">
                      {product.name}
                    </span>
                    <span className="font-display text-xl font-bold text-gradient-iot shrink-0">
                      {product.price}
                    </span>
                  </div>
                ))}
              </div>
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
