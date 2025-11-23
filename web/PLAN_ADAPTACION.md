# Plan de Adaptación Web Soleares → Medusse IoT

## Objetivo
Adaptar la web existente de Soleares para convertirla en la interfaz principal del proyecto Medusse IoT, integrándola con la API REST, WebSocket y sistema de autenticación.

---

## Fase 1: Adaptación de Branding y Contenido (Prioridad: ALTA)

### 1.1 Actualizar Metadata y Configuración
**Archivos a modificar:**
- `src/app/layout.tsx`
- `package.json`
- `next.config.ts`

**Cambios:**
```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: "Medusse IoT - Sistema de Monitoreo Ambiental",
  description: "Sistema IoT completo para monitoreo ambiental con ESP32, MQTT, InfluxDB y Grafana",
};
```

```json
// package.json
{
  "name": "medusse-web",
  "version": "1.0.0",
  "description": "Web interface for Medusse IoT monitoring system"
}
```

### 1.2 Actualizar Datos de Contenido
**Archivo:** `src/lib/data.ts`

**Nuevo contenido:**
```typescript
export const companyData = {
  name: "Medusse IoT",
  claim: "Sistema de Monitoreo Ambiental en Tiempo Real",
  contact: {
    email: "pacoaldev@gmail.com",
    copyright: "© Medusse IoT 2025 - IES José Rodrigo Botet",
  },
};

export const heroSections = [
  {
    id: "hero-main",
    title: "Medusse IoT",
    subtitle: "Monitoreo Ambiental Inteligente",
    description: "Sistema IoT completo con 18 tipos de sensores, visualización en tiempo real y gestión de energía solar",
    ctas: [{ primary: "Ver Dashboard", secondary: "Documentación" }],
    backgroundImage: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070",
  },
  {
    id: "hero-dashboard",
    title: "Dashboard en Tiempo Real",
    subtitle: "Visualización Profesional",
    features: [
      "4 ubicaciones monitoreadas",
      "18 tipos de sensores",
      "Actualización cada 30 segundos",
      "Alertas automáticas",
    ],
    ctas: [{ primary: "Acceder a Grafana", secondary: "Ver Demo" }],
    backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
  },
  {
    id: "hero-mobile",
    title: "App Móvil Flutter",
    subtitle: "Multiplataforma",
    features: [
      "Windows, Web, Android, iOS",
      "Tiempo real con WebSocket",
      "Gráficos interactivos",
      "Sistema de alertas",
    ],
    ctas: [{ primary: "Descargar App", secondary: "Ver Capturas" }],
    backgroundImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070",
  },
];

export const hardwareProducts = [
  { name: "Nodo ESP32 + Sensores Ambientales", price: "150 €" },
  { name: "Nodo ESP32 + Sensores de Agua", price: "180 €" },
  { name: "Nodo ESP32 + Panel Solar", price: "200 €" },
  { name: "Gateway LoRa Raspberry Pi", price: "250 €" },
  { name: "Sensor DHT22 (Temp/Humedad)", price: "15 €" },
  { name: "Sensor BME680 (Calidad Aire)", price: "25 €" },
  { name: "Sensor pH", price: "30 €" },
  { name: "Módulo LoRa SX1276", price: "20 €" },
];

export const softwareModules = [
  { name: "Dashboard Grafana Personalizado", price: "Incluido" },
  { name: "API REST + WebSocket", price: "Incluido" },
  { name: "App Flutter Multiplataforma", price: "Incluido" },
  { name: "Sistema de Alertas", price: "50 €" },
  { name: "Panel de Administración", price: "100 €" },
  { name: "Integración LoRa Mesh", price: "200 €" },
];

export const technologyData = {
  title: "Stack Tecnológico",
  subtitle: "Tecnologías modernas y robustas",
  points: [
    "MQTT para comunicación IoT",
    "InfluxDB para series temporales",
    "Grafana para visualización",
    "Docker para contenedores",
    "Next.js + Flutter para interfaces",
  ],
};

export const servicesData = [
  { title: "Instalación Completa", price: "500 €" },
  { title: "Configuración de Nodos", price: "100 €/nodo" },
  { title: "Soporte Técnico", price: "50 €/hora" },
  { title: "Mantenimiento Anual", price: "600 €/año" },
  { title: "Formación Personalizada", price: "300 €/día" },
];

export const aboutData = {
  title: "Proyecto de Fin de Grado",
  text: "Medusse IoT es un proyecto de Trabajo de Fin de Grado desarrollado en el IES José Rodrigo Botet. Sistema completo de monitoreo ambiental con arquitectura de microservicios, preparado para migración a hardware real con comunicación LoRa Mesh.",
};
```

### 1.3 Actualizar Colores Corporativos
**Archivo:** `tailwind.config.ts`

**Añadir colores de Medusse:**
```typescript
theme: {
  extend: {
    colors: {
      medusse: {
        blue: '#2196F3',
        darkblue: '#1976D2',
        red: '#E53E3E',
        purple: '#805AD5',
        orange: '#FF9800',
        green: '#38A169',
      },
    },
  },
}
```

---

## Fase 2: Integración con API REST (Prioridad: ALTA)

### 2.1 Crear Cliente API
**Archivo nuevo:** `src/lib/api.ts`

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Location {
  name: string;
  color: string;
  node: string;
}

export interface SensorData {
  value: number;
  sensor: string;
  time: string;
  location: string;
}

export interface Summary {
  [location: string]: {
    [sensor: string]: SensorData;
  };
}

export async function fetchLocations(): Promise<{ locations: string[] }> {
  const response = await fetch(`${API_BASE_URL}/api/locations`);
  if (!response.ok) throw new Error('Failed to fetch locations');
  return response.json();
}

export async function fetchSummary(): Promise<{ summary: Summary }> {
  const response = await fetch(`${API_BASE_URL}/api/summary`);
  if (!response.ok) throw new Error('Failed to fetch summary');
  return response.json();
}

export async function fetchLatestData(location: string): Promise<{ location: string; data: any }> {
  const response = await fetch(`${API_BASE_URL}/api/latest/${location}`);
  if (!response.ok) throw new Error(`Failed to fetch data for ${location}`);
  return response.json();
}

export async function fetchHistoricalData(
  location: string,
  sensor: string,
  hours: number = 24
): Promise<{ data: any[] }> {
  const response = await fetch(
    `${API_BASE_URL}/api/data/${location}/${sensor}?hours=${hours}`
  );
  if (!response.ok) throw new Error('Failed to fetch historical data');
  return response.json();
}

export async function fetchStats(
  location: string,
  sensor: string,
  hours: number = 24
): Promise<{ min: number; max: number; avg: number; count: number }> {
  const response = await fetch(
    `${API_BASE_URL}/api/stats/${location}/${sensor}?hours=${hours}`
  );
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

export async function fetchEnergyData(location: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/energy/${location}`);
  if (!response.ok) throw new Error('Failed to fetch energy data');
  return response.json();
}

export async function fetchEnergyAlerts(): Promise<{ alerts: any[] }> {
  const response = await fetch(`${API_BASE_URL}/api/energy/alerts`);
  if (!response.ok) throw new Error('Failed to fetch energy alerts');
  return response.json();
}
```

### 2.2 Crear Hook para WebSocket
**Archivo nuevo:** `src/hooks/use-websocket.ts`

```typescript
import { useEffect, useState } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3002';

export function useWebSocket() {
  const [data, setData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { data, isConnected };
}
```

### 2.3 Crear Componente de Dashboard
**Archivo nuevo:** `src/components/sections/DashboardSection.tsx`

```typescript
"use client";

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { fetchSummary, Summary } from '@/lib/api';
import { useWebSocket } from '@/hooks/use-websocket';

export function DashboardSection() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: wsData, isConnected } = useWebSocket();

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchSummary();
        setSummary(result.summary);
      } catch (error) {
        console.error('Error loading summary:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, []);

  // Update with WebSocket data
  useEffect(() => {
    if (wsData && summary) {
      // Update summary with real-time data
      setSummary((prev) => {
        if (!prev) return prev;
        // Merge WebSocket data with existing summary
        return { ...prev, ...wsData };
      });
    }
  }, [wsData]);

  if (loading) {
    return (
      <Section>
        <Container>
          <div className="text-center py-20">
            <p className="text-xl">Cargando datos...</p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Dashboard en Tiempo Real</h2>
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-sm">
                {isConnected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </div>

          {/* Grid de ubicaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summary &&
              Object.entries(summary).map(([location, sensors]) => (
                <div
                  key={location}
                  className="bg-white rounded-lg shadow-lg p-6 border-t-4"
                  style={{
                    borderTopColor:
                      location === 'aula20'
                        ? '#E53E3E'
                        : location === 'aula21'
                        ? '#805AD5'
                        : location === 'gimnasio'
                        ? '#FF9800'
                        : '#38A169',
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 capitalize">
                    {location.replace('aula', 'Aula ')}
                  </h3>

                  <div className="space-y-3">
                    {sensors.temperature && (
                      <div>
                        <p className="text-sm text-gray-600">Temperatura</p>
                        <p className="text-2xl font-bold">
                          {sensors.temperature.value.toFixed(1)}°C
                        </p>
                      </div>
                    )}

                    {sensors.humidity && (
                      <div>
                        <p className="text-sm text-gray-600">Humedad</p>
                        <p className="text-2xl font-bold">
                          {sensors.humidity.value.toFixed(1)}%
                        </p>
                      </div>
                    )}

                    {sensors.co2 && (
                      <div>
                        <p className="text-sm text-gray-600">CO₂</p>
                        <p className="text-2xl font-bold">
                          {sensors.co2.value} ppm
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

---

## Fase 3: Sistema de Autenticación (Prioridad: ALTA)

### 3.1 Crear Formularios de Login/Registro
**Archivos nuevos:**
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`
- `src/components/forms/LoginForm.tsx`
- `src/components/forms/RegisterForm.tsx`

### 3.2 Implementar Validación
**Dependencia:** `react-hook-form` + `zod`

```bash
npm install react-hook-form zod @hookform/resolvers
```

### 3.3 Gestión de Sesiones
**Dependencia:** `next-auth` o implementación custom con cookies

```bash
npm install next-auth
```

---

## Fase 4: Panel de Administración (Prioridad: MEDIA)

### 4.1 Crear Rutas Protegidas
- `/admin` - Panel principal
- `/admin/users` - Gestión de usuarios
- `/admin/sensors` - Configuración de sensores
- `/admin/alerts` - Gestión de alertas

### 4.2 Componentes de Administración
- Tabla de usuarios con CRUD
- Formularios de configuración
- Logs de actividad
- Estadísticas del sistema

---

## Fase 5: Optimización y Testing (Prioridad: MEDIA)

### 5.1 Optimizaciones
- Lazy loading de componentes
- Optimización de imágenes con Next.js Image
- Code splitting
- Caching de datos

### 5.2 Testing
- Tests unitarios con Jest
- Tests de integración
- Tests E2E con Playwright

### 5.3 SEO y Accesibilidad
- Metadata optimizada
- Sitemap
- Robots.txt
- ARIA labels
- Contraste de colores

---

## Cronograma Detallado

| Fase | Tareas | Tiempo Estimado | Prioridad |
|------|--------|-----------------|-----------|
| **Fase 1** | Branding y contenido | 1-2 días | ALTA |
| **Fase 2** | Integración API | 2-3 días | ALTA |
| **Fase 3** | Autenticación | 2-3 días | ALTA |
| **Fase 4** | Panel Admin | 3-4 días | MEDIA |
| **Fase 5** | Optimización | 1-2 días | MEDIA |
| **TOTAL** | | **9-14 días** | |

---

## Checklist de Progreso

### Fase 1: Branding ✅
- [ ] Actualizar metadata en layout.tsx
- [ ] Cambiar nombre en package.json
- [ ] Actualizar data.ts con contenido Medusse
- [ ] Añadir colores corporativos en Tailwind
- [ ] Cambiar logo y favicon
- [ ] Actualizar textos del Header/Footer

### Fase 2: API ⏳
- [ ] Crear src/lib/api.ts
- [ ] Crear hook use-websocket.ts
- [ ] Crear DashboardSection.tsx
- [ ] Integrar en página principal
- [ ] Crear variables de entorno
- [ ] Testing de conexión API

### Fase 3: Auth ⏳
- [ ] Instalar dependencias (react-hook-form, zod)
- [ ] Crear LoginForm.tsx
- [ ] Crear RegisterForm.tsx
- [ ] Implementar validación
- [ ] Integrar con backend
- [ ] Proteger rutas privadas

### Fase 4: Admin ⏳
- [ ] Crear layout de admin
- [ ] Tabla de usuarios
- [ ] CRUD de usuarios
- [ ] Panel de configuración
- [ ] Logs de actividad
- [ ] Estadísticas

### Fase 5: Optimización ⏳
- [ ] Lazy loading
- [ ] Optimizar imágenes
- [ ] Code splitting
- [ ] SEO
- [ ] Accesibilidad
- [ ] Testing

---

## Notas Importantes

### Conflicto de Puertos
- **Grafana**: Puerto 3000
- **Web Next.js**: Puerto 3100 (configurado en ejecutar_web.bat)
- **API REST**: Puerto 3001
- **WebSocket**: Puerto 3002

### Variables de Entorno
Crear `.env.local` en carpeta `web/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3002
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3000
PORT=3100
```

### Dependencias Adicionales Necesarias
```bash
# Formularios y validación
npm install react-hook-form zod @hookform/resolvers

# Gráficos
npm install recharts

# Autenticación
npm install next-auth

# Utilidades
npm install date-fns
```

---

**Última actualización**: 2025-11-23  
**Responsable**: Francisco Manuel López Alarte  
**Proyecto**: Medusse IoT TFG  
**Rama**: clase
