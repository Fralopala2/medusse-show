# Medusse IoT - Web Application

Sistema web moderno para el proyecto Medusse IoT desarrollado con Next.js 16, TypeScript y Tailwind CSS.

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)
Desde la raíz del proyecto:
```bash
ejecutar_web.bat
```

### Opción 2: Manual
```bash
cd web
npm install
npm run dev
```

La aplicación estará disponible en [http://localhost:3100](http://localhost:3100)

**Nota:** Usamos el puerto 3100 para evitar conflicto con Grafana (puerto 3000)

## 📋 Requisitos

- Node.js 20+
- npm o yarn

## 🛠️ Tecnologías

- **Next.js 16.0.3** - Framework React con SSR
- **React 19.2.0** - Librería UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Estilos utility-first
- **Framer Motion 12** - Animaciones
- **Lucide React** - Iconos

## 📁 Estructura

```
web/
├── src/
│   ├── app/              # App Router
│   ├── components/       # Componentes React
│   ├── hooks/           # Custom hooks
│   └── lib/             # Utilidades y datos
├── public/              # Archivos estáticos
└── .env.local          # Variables de entorno
```

## 🔗 Integración con Medusse IoT

- **API REST**: http://localhost:3001
- **WebSocket**: ws://localhost:3002
- **Grafana**: http://localhost:3000

## 📚 Documentación

- [README_MEDUSSE.md](./README_MEDUSSE.md) - Documentación técnica completa
- [PLAN_ADAPTACION.md](./PLAN_ADAPTACION.md) - Plan de desarrollo

## 🎯 Estado del Proyecto

✅ Fase 1: Adaptación de branding y contenido - **COMPLETADO**
⏳ Fase 2: Integración con API REST - Pendiente
⏳ Fase 3: Sistema de autenticación - Pendiente
⏳ Fase 4: Panel de administración - Pendiente
⏳ Fase 5: Optimización y testing - Pendiente

## 👨‍💻 Autor

Francisco Manuel López Alarte  
IES José Rodrigo Botet - TFG 2025/2026

## 📄 Licencia

All Rights Reserved
