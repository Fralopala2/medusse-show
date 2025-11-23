# Web Medusse IoT - Integración con Proyecto TFG

## Descripción

Aplicación web moderna desarrollada con **Next.js 16**, **TypeScript**, **Tailwind CSS** y **Framer Motion** para el proyecto Medusse IoT. Esta web sirve como interfaz principal para usuarios y administradores del sistema de monitoreo ambiental.

## Tecnologías Utilizadas

### Frontend Framework
- **Next.js 16.0.3** - Framework React con SSR y App Router
- **React 19.2.0** - Librería de UI
- **TypeScript 5** - Tipado estático

### Estilos y UI
- **Tailwind CSS 4** - Framework CSS utility-first
- **Framer Motion 12.23.24** - Animaciones y transiciones
- **Lucide React 0.554.0** - Iconos modernos
- **class-variance-authority** - Gestión de variantes de componentes

### Utilidades
- **clsx** - Gestión de clases CSS
- **tailwind-merge** - Merge inteligente de clases Tailwind

## Estructura del Proyecto

```
web/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── page.tsx           # Página principal
│   │   ├── layout.tsx         # Layout global
│   │   ├── globals.css        # Estilos globales
│   │   └── favicon.ico        # Favicon
│   ├── components/
│   │   ├── layout/            # Componentes de layout
│   │   │   ├── Header.tsx     # Cabecera con navegación
│   │   │   └── Footer.tsx     # Pie de página
│   │   ├── sections/          # Secciones de la página
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── TechnologySection.tsx
│   │   │   └── AboutSection.tsx
│   │   └── ui/                # Componentes UI reutilizables
│   │       ├── Button.tsx
│   │       ├── Container.tsx
│   │       └── Section.tsx
│   ├── hooks/                 # Custom hooks
│   │   └── use-scroll.ts      # Hook para detectar scroll
│   └── lib/                   # Utilidades y datos
│       ├── data.ts            # Datos de contenido
│       └── utils.ts           # Funciones auxiliares
├── public/                    # Archivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Adaptación para Medusse IoT

### Cambios Necesarios

#### 1. Actualizar Branding
- [ ] Cambiar nombre de "Soleares" a "Medusse IoT"
- [ ] Actualizar colores corporativos
- [ ] Añadir logo de Medusse
- [ ] Actualizar metadata (title, description)

#### 2. Adaptar Contenido
- [ ] Hero Section: Sistema IoT de Monitoreo Ambiental
- [ ] Productos: Nodos ESP32, Sensores, Gateway LoRa
- [ ] Servicios: Instalación, Monitoreo, Mantenimiento
- [ ] Tecnología: MQTT, InfluxDB, Grafana, Flutter

#### 3. Integrar con API REST
- [ ] Conectar con API en puerto 3001
- [ ] Mostrar datos en tiempo real de sensores
- [ ] Dashboard de usuario con gráficos
- [ ] Panel de administración

#### 4. Añadir Funcionalidades IoT
- [ ] Visualización de ubicaciones (Aula 20, 21, Gimnasio, Lab)
- [ ] Gráficos de sensores en tiempo real
- [ ] Sistema de alertas
- [ ] Histórico de datos

## Instalación y Ejecución

### Requisitos Previos
- Node.js 20+ instalado
- npm o yarn

### Instalación

```bash
# Navegar a la carpeta web
cd web

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La web estará disponible en http://localhost:3000
```

### Producción

```bash
# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## Integración con Proyecto Medusse

### Puerto de Desarrollo
- **Web Next.js**: `http://localhost:3000`
- **API REST**: `http://localhost:3001`
- **WebSocket**: `ws://localhost:3002`
- **Grafana**: `http://localhost:3000` (conflicto - cambiar puerto)

### Solución de Conflicto de Puertos

Grafana usa el puerto 3000, por lo que Next.js debe usar otro puerto:

```bash
# Opción 1: Cambiar puerto en comando
npm run dev -- -p 3100

# Opción 2: Variable de entorno
PORT=3100 npm run dev
```

### Conexión con API REST

Crear archivo `web/src/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchLocations() {
  const response = await fetch(`${API_BASE_URL}/api/locations`);
  return response.json();
}

export async function fetchSummary() {
  const response = await fetch(`${API_BASE_URL}/api/summary`);
  return response.json();
}

export async function fetchLatestData(location: string) {
  const response = await fetch(`${API_BASE_URL}/api/latest/${location}`);
  return response.json();
}
```

## Retos TFG Cubiertos

### ✅ Reto 4: Diseño de Bocetos
- Estructura de componentes definida
- Layout responsive implementado
- Secciones modulares

### ✅ Reto 5: Diseño de Interfaces HTML/CSS
- Componentes React con TypeScript
- Estilos con Tailwind CSS
- Diseño moderno y profesional

### ⏳ Reto 7: Validación de Formularios JS
- Pendiente: Añadir formularios de login/registro
- Pendiente: Validación con React Hook Form

### ⏳ Reto 8: Transferencia Front-end/Back-end
- Pendiente: Integrar con API REST
- Pendiente: Fetch de datos de sensores

### ⏳ Reto 13: Framework Entorno Cliente
- ✅ Next.js implementado
- ✅ React 19 con TypeScript
- ✅ Componentes reutilizables

### ⏳ Reto 14: Diseño Web Avanzado
- ✅ Responsive design con Tailwind
- ✅ Animaciones con Framer Motion
- Pendiente: Optimizaciones adicionales

## Próximos Pasos

### Fase 1: Adaptación de Contenido (1-2 días)
1. Actualizar `src/lib/data.ts` con contenido de Medusse IoT
2. Cambiar branding y colores
3. Actualizar metadata y SEO

### Fase 2: Integración con API (2-3 días)
1. Crear cliente API en `src/lib/api.ts`
2. Implementar fetching de datos
3. Crear componentes de visualización de sensores
4. Integrar WebSocket para tiempo real

### Fase 3: Autenticación (2-3 días)
1. Implementar formularios de login/registro
2. Integrar con sistema de sesiones
3. Proteger rutas privadas
4. Crear panel de usuario

### Fase 4: Dashboard y Admin (3-4 días)
1. Crear dashboard de usuario
2. Implementar panel de administración
3. Gráficos con Chart.js o Recharts
4. Gestión de usuarios

### Fase 5: Optimización (1-2 días)
1. Optimizar rendimiento
2. Lazy loading de componentes
3. SEO y accesibilidad
4. Testing

## Scripts Disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Construir producción
npm start        # Servidor producción
npm run lint     # Linter ESLint
```

## Variables de Entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3002
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3000
```

## Documentación Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Notas de Desarrollo

### Convenciones de Código
- Componentes en PascalCase
- Archivos de utilidades en kebab-case
- Hooks con prefijo `use-`
- Tipos TypeScript en interfaces

### Estructura de Componentes
- Componentes de UI genéricos en `components/ui/`
- Componentes de layout en `components/layout/`
- Secciones específicas en `components/sections/`

### Estilos
- Usar Tailwind CSS como primera opción
- Clases personalizadas en `globals.css` solo si es necesario
- Mantener consistencia con design system

---

**Autor**: Francisco Manuel López Alarte  
**Proyecto**: Medusse IoT - TFG 2025/2026  
**Rama**: clase  
**Última actualización**: 2025-11-23
