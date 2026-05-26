"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ExpandOnScrollImage } from "@/components/motion/ExpandOnScrollImage";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { sectionImages } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { createRevealStagger, prefersReducedMotion } from "@/lib/gsap/scroll-effects";

const screenshots = [
  {
    title: "Pantalla Principal",
    description:
      "Vista general con 4 ubicaciones monitoreadas en tiempo real",
    image: "/images/app-home.jpg",
  },
  {
    title: "Detalle de Ubicación",
    description: "18 sensores con valores actuales y alertas inteligentes",
    image: "/images/app-detail.jpg",
  },
  {
    title: "Visualización de Alarmas",
    description:
      "Sistema de alertas inteligentes con notificaciones en tiempo real",
    image: "/images/app-charts.jpg",
  },
  {
    title: "Configuración",
    description: "Ajustes de servidor y conexión con test integrado",
    image: "/images/app-settings.jpg",
  },
];

export default function CapturasPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      registerGsapPlugins();
      return createRevealStagger(gridRef.current, "[data-capture]");
    },
    { scope: gridRef }
  );

  const handleCardHover = (el: HTMLElement, entering: boolean) => {
    if (prefersReducedMotion()) return;
    gsap.to(el, {
      y: entering ? -8 : 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <SmoothScrollProvider className="bg-cinematic-bg min-h-screen">
      <main>
        <Header />

        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <ExpandOnScrollImage
            src={sectionImages.capturasHero}
            alt="App móvil Flutter"
          />
          <Container className="relative z-10 pt-28 pb-16 text-center">
            <RevealGroup>
              <p
                data-reveal
                className="text-cinematic-accent text-sm uppercase tracking-widest mb-4"
              >
                Flutter · Multiplataforma
              </p>
              <h1
                data-reveal
                className="font-display text-4xl md:text-6xl font-bold text-white mb-4"
              >
                App Móvil Flutter
              </h1>
              <p data-reveal className="text-xl text-white/75 mb-8">
                Tiempo real · Material Design 3 · WebSocket
              </p>
              <div
                data-reveal
                className="flex gap-3 justify-center flex-wrap"
              >
                {["Windows", "Android", "Web"].map((platform) => (
                  <span
                    key={platform}
                    className="glass-card px-4 py-2 rounded-full text-sm text-white/90"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </RevealGroup>
          </Container>
        </section>

        <Container className="py-20">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          >
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                data-capture
                className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(index)}
                onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
              >
                <div className="relative h-80 bg-cinematic-surface">
                  <Image
                    src={screenshot.image}
                    alt={screenshot.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 border-t border-white/10">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {screenshot.title}
                  </h3>
                  <p className="text-medusse-gray text-sm">
                    {screenshot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <RevealGroup>
            <h2
              data-reveal
              className="font-display text-2xl font-bold text-center text-white mb-10"
            >
              Características principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: "📊",
                  title: "Datos en Tiempo Real",
                  text: "WebSocket para actualizaciones automáticas cada 15 segundos",
                },
                {
                  icon: "📈",
                  title: "Gráficos Interactivos",
                  text: "Visualización con fl_chart, zoom, pan y tooltips",
                },
                {
                  icon: "🔔",
                  title: "Sistema de Alertas",
                  text: "Notificaciones inteligentes por umbrales de CO₂ y batería",
                },
              ].map((feat) => (
                <div
                  key={feat.title}
                  data-reveal
                  className="glass-card rounded-xl p-6 text-center"
                >
                  <div className="text-3xl mb-3">{feat.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-medusse-gray">{feat.text}</p>
                </div>
              ))}
            </div>

            <div
              data-reveal
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="https://github.com/Fralopala2/medusse-show/tree/clase/medusse_app"
                target="_blank"
              >
                <Button size="lg">Ver código en GitHub</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </RevealGroup>
        </Container>

        <Footer />

        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-white/70 z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
              <Image
                src={screenshots[selectedImage].image}
                alt={screenshots[selectedImage].title}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-white px-4">
              <h3 className="font-display text-2xl font-bold mb-2">
                {screenshots[selectedImage].title}
              </h3>
              <p className="text-medusse-gray">
                {screenshots[selectedImage].description}
              </p>
            </div>
          </div>
        )}
      </main>
    </SmoothScrollProvider>
  );
}
