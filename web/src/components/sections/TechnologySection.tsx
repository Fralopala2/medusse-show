"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface TechnologySectionProps {
  data: {
    title: string;
    subtitle: string;
    points: string[];
  };
  id?: string;
}

export function TechnologySection({ data, id }: TechnologySectionProps) {
  return (
    <Section id={id} className="bg-soleares-black text-white flex items-center justify-center">
      <Container className="flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">{data.title}</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">{data.subtitle}</p>
          
          <ul className="space-y-4 mb-8">
            {data.points.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 text-base sm:text-lg text-gray-100"
              >
                <CheckCircle2 className="text-green-400 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                {point}
              </motion.li>
            ))}
          </ul>

          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-black"
            onClick={() => window.open('/README.md', '_blank')}
          >
            Descargar documentación técnica
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden"
        >
           {/* Placeholder for tech visualization */}
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
           <div className="z-10 text-center p-8">
             <div className="text-5xl sm:text-6xl font-mono font-bold text-blue-400 mb-2">MQTT</div>
             <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-widest">Protocolo Seguro</div>
           </div>
        </motion.div>
      </Container>
    </Section>
  );
}
