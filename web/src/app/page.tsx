import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import {
  heroSections,
  hardwareProducts,
  softwareModules,
  technologyData,
  servicesData,
  aboutData,
  sectionImages,
} from "@/lib/data";

export default function Home() {
  return (
    <SmoothScrollProvider className="theme-cinematic">
      <main className="w-full">
        <Header />

        {heroSections.map((hero) => (
          <HeroSection key={hero.id} {...hero} id={hero.id} />
        ))}

        <DashboardSection />

        <div id="precios">
          <ProductGrid
            title="Productos Hardware"
            products={hardwareProducts}
            sectionImage={sectionImages.hardware}
          />
        </div>

        <ProductGrid
          title="Módulos Software"
          products={softwareModules}
          sectionImage={sectionImages.software}
        />

        <div id="tecnologia">
          <TechnologySection data={technologyData} />
        </div>

        <div id="soluciones">
          <ServicesGrid services={servicesData} />
        </div>

        <AboutSection data={aboutData} />

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
