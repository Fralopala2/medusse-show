"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

interface Service {
  title: string;
  price: string;
}

interface ServicesGridProps {
  services: Service[];
  id?: string;
}

export function ServicesGrid({ services, id }: ServicesGridProps) {
  return (
    <Section id={id} className="bg-gray-50 flex items-center py-20 h-auto min-h-screen">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Servicios
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-center items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 aspect-video md:aspect-square text-center border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-2xl font-bold text-soleares-blue">{service.price}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
