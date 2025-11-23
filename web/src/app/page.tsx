import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { AboutSection } from "@/components/sections/AboutSection";
import {
  heroSections,
  hardwareProducts,
  softwareModules,
  technologyData,
  servicesData,
  aboutData,
} from "@/lib/data";

export default function Home() {
  return (
    <main className="snap-y-mandatory w-full">
      <Header />

      {/* Hero Sections */}
      {heroSections.map((hero) => (
        <HeroSection key={hero.id} {...hero} />
      ))}

      {/* Hardware Grid */}
      <div id="precios">
        <ProductGrid title="Productos Hardware" products={hardwareProducts} />
      </div>

      {/* Software Grid */}
      <ProductGrid title="Módulos Software" products={softwareModules} />

      {/* Technology Section */}
      <div id="tecnologia">
        <TechnologySection data={technologyData} />
      </div>

      {/* Services Section */}
      <div id="soluciones">
        <ServicesGrid services={servicesData} />
      </div>

      {/* About Section */}
      <AboutSection data={aboutData} />

      {/* Footer */}
      <div id="contacto">
        <Footer />
      </div>
    </main>
  );
}
