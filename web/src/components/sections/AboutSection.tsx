"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

interface AboutSectionProps {
  data: {
    title: string;
    text: string;
  };
  id?: string;
}

export function AboutSection({ data, id }: AboutSectionProps) {
  return (
    <Section id={id} className="bg-white flex items-center justify-center">
      <Container className="text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-soleares-black">
            {data.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12">
            {data.text}
          </p>
          <Button size="xl" className="bg-soleares-black text-white hover:bg-gray-800">
            Contactar
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
