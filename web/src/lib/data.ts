export const companyData = {
  name: "Soleares",
  claim: "Mejora la conexión con el centro de control, evita limitaciones a la producción, incidencias y penalizaciones. Lectura de contadores operativa en 72h.",
  contact: {
    email: "info@soleares.eu",
    copyright: "© Soleares 2025",
  },
};

export const heroSections = [
  {
    id: "hero-main",
    title: "Soleares",
    subtitle: "Lectura de contadores operativa en 72h",
    description: "Soluciones innovadoras para comunicar instalaciones de producción eléctrica con REE y centros de control (CCO)",
    ctas: [{ primary: "Ver soluciones", secondary: "Solicitar información" }],
    backgroundImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop", // Wind/Solar landscape
  },
  {
    id: "hero-102tcp",
    title: "Solución 102TCP",
    subtitle: "Desde 2.600 €",
    features: [
      "Entrega urgente 72h",
      "SIM con IP pública incluida",
      "Router Soleares 4G",
      "Servicio mensual: 40 €/mes",
    ],
    ctas: [{ primary: "Solicitar ahora", secondary: "Descargar PDF" }],
    backgroundImage: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=2070&auto=format&fit=crop", // Electric meter / industrial
    darkText: true,
  },
  {
    id: "hero-solearesmq",
    title: "Remota SolearesMQ",
    subtitle: "Desde 800 €",
    features: [
      "Dispositivo hardware único",
      "Múltiples módulos de software",
      "Protocolo MQTT seguro",
      "Escalable según necesidades",
    ],
    ctas: [{ primary: "Configurar", secondary: "Más información" }],
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", // Tech/Hardware
  },
  {
    id: "hero-srap",
    title: "Sistema SRAP",
    subtitle: "Desde 6.000 €",
    description: "Evita limitaciones a la producción con nuestro sistema certificado de Reducción Automática de Potencia",
    features: [
      "Certificado con varios CCO",
      "Redundancia de comunicaciones",
      "Respeta Mínimo Técnico",
      "Tiempos de respuesta < 4 segundos",
    ],
    ctas: [{ primary: "Solicitar certificación", secondary: "Más información" }],
    backgroundImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop", // Solar plant
  },
  {
    id: "hero-ttr",
    title: "Telemedida en Tiempo Real",
    subtitle: "Desde 2.500 €",
    description: "Envío de P, Q, V desde el contador al CCO y red de Telecontrol",
    ctas: [{ primary: "Solicitar", secondary: "Más información" }],
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Abstract network
  },
  {
    id: "hero-despacho",
    title: "Despacho Delegado",
    subtitle: "Desde 4.000 €",
    description: "Envío de datos y recepción de consignas de potencia desde REE",
    ctas: [{ primary: "Solicitar", secondary: "Más información" }],
    backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", // Control room / industrial
  },
];

export const hardwareProducts = [
  { name: "Remota SolearesMQ 102TCP-1", price: "2.100 €" },
  { name: "Remota SolearesMQ 102TCP-2", price: "2.700 €" },
  { name: "Remota Estándar SolearesMQ", price: "800 €" },
  { name: "SAI (autonomía 3h)", price: "100 €" },
  { name: "Módem 4G", price: "300 €" },
  { name: "SIM con IP pública", price: "30 €/mes" },
  { name: "Adaptador USB-Serie", price: "100 €" },
  { name: "GPS/GNSS USB", price: "100 €" },
];

export const softwareModules = [
  { name: "Telemedida fiscal (102TCP)", price: "800 €" },
  { name: "Telemedida secundaria (102TCP+)", price: "500 €" },
  { name: "DNS Dinámico (DDNS)", price: "200 € + 120 €/año" },
  { name: "TTR (Tiempo Real)", price: "2.500 €" },
  { name: "Despacho Delegado", price: "4.000 €" },
  { name: "SRAP", price: "6.000 €" },
];

export const technologyData = {
  title: "Tecnología MQTT",
  subtitle: "Un protocolo seguro y robusto",
  points: [
    "Patrón pub/sub (como WhatsApp)",
    "Comunicaciones cifradas y encriptadas",
    "Comunicación instantánea o diferida",
    "Redundancia de comunicaciones (RedCOM)",
    "Aislamiento con módulo DUO+",
  ],
};

export const servicesData = [
  { title: "Servicio DDNS-HCS", price: "120 €/año" },
  { title: "Monitorización Web", price: "360 €/año" },
  { title: "Mantenimiento Remoto", price: "Consultar" },
  { title: "Instalación en planta", price: "400 €" },
  { title: "Soporte remoto", price: "100 €/hora" },
];

export const aboutData = {
  title: "Una startup con 20 años de experiencia",
  text: "Soleares se constituye como startup a principios de 2023, tras casi 20 años de presencia en el mercado eléctrico mediante colaboraciones freelance. Somos independientes, desvinculados de comercializadoras y distribuidoras.",
};
