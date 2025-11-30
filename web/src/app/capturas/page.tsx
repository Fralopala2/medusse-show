"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const screenshots = [
  {
    title: "Pantalla Principal",
    description: "Vista general con 4 ubicaciones monitoreadas en tiempo real",
    image: "/images/app-home.jpg",
  },
  {
    title: "Detalle de Ubicación",
    description: "18 sensores con valores actuales y alertas inteligentes",
    image: "/images/app-detail.jpg",
  },
  {
    title: "Gráficos Históricos",
    description: "Visualización interactiva con estadísticas min/max/avg",
    image: "/images/app-charts.jpg",
  },
  {
    title: "Configuración",
    description: "Ajustes de servidor y conexión con test integrado",
    image: "/images/app-settings.jpg",
  },
];

export default function CapturasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            App Móvil Flutter
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Multiplataforma • Tiempo Real • Material Design 3
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Windows
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Android
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              iOS
            </span>
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              Web
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-96 bg-gray-100">
                <Image
                  src={screenshot.image}
                  alt={screenshot.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{screenshot.title}</h3>
                <p className="text-gray-600">{screenshot.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-6">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold mb-2">Datos en Tiempo Real</h3>
              <p className="text-sm text-gray-600">
                WebSocket para actualizaciones automáticas cada 15 segundos
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-bold mb-2">Gráficos Interactivos</h3>
              <p className="text-sm text-gray-600">
                Visualización con fl_chart, zoom, pan y tooltips
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">🔔</div>
              <h3 className="font-bold mb-2">Sistema de Alertas</h3>
              <p className="text-sm text-gray-600">
                Notificaciones inteligentes por umbrales de CO2 y batería
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="https://github.com/Fralopala2/proyecto-medusse/tree/clase/medusse_app"
              target="_blank"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ver Código en GitHub
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Volver al Inicio
            </Link>
          </div>
        </motion.div>
      </Container>

      <Footer />
    </main>
  );
}
