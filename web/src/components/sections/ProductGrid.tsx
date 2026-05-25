"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

interface Product {
  name: string;
  price: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  id?: string;
}

export function ProductGrid({ title, products, id }: ProductGridProps) {
  return (
    <Section id={id} className="bg-soleares-white flex items-center py-20 h-auto min-h-screen">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          {title}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex justify-between items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow border border-gray-100"
            >
              <span className="font-medium text-soleares-black">{product.name}</span>
              <span className="font-bold text-soleares-blue">{product.price}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
