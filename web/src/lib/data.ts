export const companyData = {
  name: "Medusse IoT",
  claim:
    "Sistema de monitoreo ambiental en tiempo real con 18 tipos de sensores, visualización profesional y gestión inteligente de energía solar.",
  contact: {
    email: "pacoaldev@gmail.com",
    copyright: "© Medusse IoT 2025 - IES José Rodrigo Botet",
  },
};

export const DOCS_GENERAL_URL =
  "https://github.com/Fralopala2/medusse-show/blob/clase/documentacion/DOCUMENTACION_GENERAL_RETOS.md";

export const sectionImages = {
  hardware:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  software:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  technology:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  about:
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
  capturasHero:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
};

export const heroSections = [
  {
    id: "hero-main",
    title: "Medusse IoT",
    subtitle: "Monitoreo ambiental inteligente",
    description:
      "Sistema IoT completo con 18 tipos de sensores, visualización en tiempo real, gestión de energía solar y arquitectura de microservicios",
    ctas: [
      {
        primary: "Ver Dashboard",
        secondary: "Documentación",
        primaryAction: "#dashboard",
        secondaryAction: DOCS_GENERAL_URL,
      },
    ],
    backgroundImage:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "hero-dashboard",
    title: "Dashboard en tiempo real",
    subtitle: "Visualización profesional con Grafana",
    features: [
      "4 ubicaciones monitoreadas",
      "18 tipos de sensores",
      "Actualización cada 30 segundos",
      "Alertas automáticas inteligentes",
    ],
    ctas: [
      {
        primary: "Acceder a Grafana",
        primaryAction: "http://localhost:3600",
      },
    ],
    backgroundImage: "/dashboard-raspberry.png",
    darkText: false,
  },
  {
    id: "hero-mobile",
    title: "App móvil Flutter",
    subtitle: "Multiplataforma y tiempo real",
    features: [
      "Windows, Web, Android",
      "WebSocket para datos en vivo",
      "Gráficos interactivos con fl_chart",
      "Sistema de alertas por umbrales",
    ],
    ctas: [
      {
        primary: "Descargar App",
        secondary: "Ver Capturas",
        primaryAction:
          "https://github.com/Fralopala2/medusse-show/tree/clase/medusse_app",
        secondaryAction: "/capturas",
      },
    ],
    backgroundImage:
      "https://images.unsplash.com/photo-1526498460520-4c123789a6b0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "hero-sensors",
    title: "18 tipos de sensores",
    subtitle: "Monitoreo completo",
    description:
      "Sensores ambientales, calidad de agua, suelo y gestión de energía solar con batería inteligente",
    features: [
      "Temperatura, Humedad, CO₂, Presión",
      "VOC, IAQ, pH, TDS, Oxígeno disuelto",
      "Voltaje solar y batería",
      "Modo de bajo consumo automático",
    ],
    ctas: [
      {
        primary: "Ver Sensores",
        secondary: "Especificaciones",
        primaryAction: "#dashboard",
        secondaryAction: DOCS_GENERAL_URL,
      },
    ],
    backgroundImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "hero-api",
    title: "API REST completa",
    subtitle: "Integración fácil",
    description:
      "7 endpoints HTTP + WebSocket para streaming en tiempo real. Documentación completa y ejemplos de uso",
    ctas: [
      {
        primary: "Ver API Docs",
        secondary: "Probar Endpoints",
        primaryAction:
          "https://github.com/Fralopala2/medusse-show/blob/clase/api/README.md",
        secondaryAction: "http://localhost:4001/api/summary",
      },
    ],
    backgroundImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  },
  {
    id: "hero-lora",
    title: "Preparado para LoRa Mesh",
    subtitle: "Migración a hardware real",
    description:
      "Arquitectura compatible con comunicación LoRa. Gateway intercambiable sin modificar API o Flutter",
    ctas: [
      {
        primary: "Ver Migración",
        secondary: "Hardware Necesario",
        primaryAction:
          "https://github.com/Fralopala2/medusse-show/blob/clase/documentacion/MIGRACION.md",
        secondaryAction: "#precios",
      },
    ],
    backgroundImage:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
  },
];

export const hardwareProducts = [
  { name: "Nodo ESP32 + sensores ambientales (DHT22, BME680)", price: "150 €" },
  { name: "Nodo ESP32 + sensores de agua (pH, TDS, DO)", price: "180 €" },
  { name: "Nodo ESP32 + panel solar + batería", price: "200 €" },
  { name: "Gateway LoRa Raspberry Pi 4 (4GB)", price: "250 €" },
  { name: "Sensor DHT22 (temperatura/humedad)", price: "15 €" },
  { name: "Sensor BME680 (calidad aire + VOC)", price: "25 €" },
  { name: "Sensor pH para agua", price: "30 €" },
  { name: "Módulo LoRa SX1276 868MHz", price: "20 €" },
];

export const softwareModules = [
  { name: "Dashboard Grafana personalizado", price: "Incluido" },
  { name: "API REST + WebSocket", price: "Incluido" },
  { name: "App Flutter multiplataforma", price: "Incluido" },
  { name: "Sistema de alertas inteligentes", price: "50 €" },
  { name: "Panel de administración de usuarios", price: "100 €" },
  { name: "Integración LoRa Mesh", price: "200 €" },
];

export const technologyData = {
  title: "Stack tecnológico moderno",
  subtitle: "Arquitectura de microservicios robusta y escalable",
  points: [
    "MQTT (Mosquitto 2.0) para comunicación IoT",
    "InfluxDB 2.7 para series temporales",
    "Grafana 10.2.0 para visualización profesional",
    "Docker Compose para orquestación de servicios",
    "Next.js + Flutter para interfaces modernas",
  ],
};

export const servicesData = [
  { title: "Instalación completa del sistema", price: "500 €" },
  { title: "Configuración de nodos ESP32", price: "100 €/nodo" },
  { title: "Soporte técnico especializado", price: "50 €/hora" },
  { title: "Mantenimiento anual", price: "600 €/año" },
  { title: "Formación personalizada", price: "300 €/día" },
];

export const aboutData = {
  title: "Proyecto de trabajo de fin de grado",
  text: "Medusse IoT es un proyecto de TFG desarrollado en el IES José Rodrigo Botet (curso 2025/2026). Sistema completo de monitoreo ambiental con arquitectura de microservicios, 18 tipos de sensores, visualización en tiempo real y preparado para migración a hardware real con comunicación LoRa Mesh. Incluye dashboard Grafana, API REST, WebSocket y app móvil Flutter.",
};
