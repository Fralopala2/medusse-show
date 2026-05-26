export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiQueryParam {
  name: string;
  default?: string;
  label?: string;
}

export interface ApiPathParam {
  name: string;
  default?: string;
  label?: string;
}

export interface ApiEndpointDefinition {
  id: string;
  category: string;
  method: HttpMethod;
  path: string;
  description: string;
  requiresAuth?: boolean;
  pathParams?: ApiPathParam[];
  queryParams?: ApiQueryParam[];
  bodyExample?: Record<string, unknown>;
}

export const API_ENDPOINT_CATEGORIES = [
  "General",
  "Sensores",
  "Energía",
  "Autenticación",
  "Administración",
] as const;

export const API_ENDPOINTS: ApiEndpointDefinition[] = [
  {
    id: "root",
    category: "General",
    method: "GET",
    path: "/",
    description: "Información general de la API y lista de endpoints",
  },
  {
    id: "health",
    category: "General",
    method: "GET",
    path: "/health",
    description: "Estado de salud de la API y servicios conectados",
  },
  {
    id: "locations",
    category: "Sensores",
    method: "GET",
    path: "/api/locations",
    description: "Lista de ubicaciones disponibles",
  },
  {
    id: "summary",
    category: "Sensores",
    method: "GET",
    path: "/api/summary",
    description: "Resumen de todos los sensores en todas las ubicaciones",
  },
  {
    id: "latest",
    category: "Sensores",
    method: "GET",
    path: "/api/latest/:location",
    description: "Últimos valores de sensores de una ubicación",
    pathParams: [
      { name: "location", default: "aula20", label: "Ubicación" },
    ],
  },
  {
    id: "data",
    category: "Sensores",
    method: "GET",
    path: "/api/data/:location/:sensor",
    description: "Datos históricos de un sensor",
    pathParams: [
      { name: "location", default: "aula20", label: "Ubicación" },
      { name: "sensor", default: "temperature", label: "Sensor" },
    ],
    queryParams: [
      { name: "hours", default: "24", label: "Horas" },
      { name: "interval", default: "5m", label: "Intervalo" },
    ],
  },
  {
    id: "stats",
    category: "Sensores",
    method: "GET",
    path: "/api/stats/:location/:sensor",
    description: "Estadísticas (min, max, avg) de un sensor",
    pathParams: [
      { name: "location", default: "aula20", label: "Ubicación" },
      { name: "sensor", default: "temperature", label: "Sensor" },
    ],
    queryParams: [{ name: "hours", default: "24", label: "Horas" }],
  },
  {
    id: "energy-location",
    category: "Energía",
    method: "GET",
    path: "/api/energy/:location",
    description: "Datos de energía solar y batería de una ubicación",
    pathParams: [
      { name: "location", default: "aula20", label: "Ubicación" },
    ],
  },
  {
    id: "energy-summary",
    category: "Energía",
    method: "GET",
    path: "/api/energy/summary",
    description: "Resumen de energía de todas las ubicaciones",
  },
  {
    id: "energy-alerts",
    category: "Energía",
    method: "GET",
    path: "/api/energy/alerts",
    description: "Alertas de energía del sistema",
  },
  {
    id: "energy-history",
    category: "Energía",
    method: "GET",
    path: "/api/energy/:location/history",
    description: "Histórico de energía de una ubicación",
    pathParams: [
      { name: "location", default: "aula20", label: "Ubicación" },
    ],
    queryParams: [
      { name: "hours", default: "24", label: "Horas" },
      { name: "interval", default: "15m", label: "Intervalo" },
    ],
  },
  {
    id: "auth-validate",
    category: "Autenticación",
    method: "GET",
    path: "/api/auth/validate",
    description: "Validar sesión activa",
    requiresAuth: true,
  },
  {
    id: "auth-profile",
    category: "Autenticación",
    method: "GET",
    path: "/api/auth/profile",
    description: "Obtener perfil del usuario autenticado",
    requiresAuth: true,
  },
  {
    id: "auth-login",
    category: "Autenticación",
    method: "POST",
    path: "/api/auth/login",
    description: "Iniciar sesión (prueba con credenciales)",
    requiresAuth: false,
    bodyExample: { username: "admin", password: "medusse2025" },
  },
  {
    id: "auth-logout",
    category: "Autenticación",
    method: "POST",
    path: "/api/auth/logout",
    description: "Cerrar sesión actual",
    requiresAuth: true,
  },
  {
    id: "admin-stats",
    category: "Administración",
    method: "GET",
    path: "/api/admin/stats",
    description: "Estadísticas del panel de administración",
    requiresAuth: true,
  },
  {
    id: "admin-users",
    category: "Administración",
    method: "GET",
    path: "/api/admin/users",
    description: "Listar usuarios del sistema",
    requiresAuth: true,
  },
  {
    id: "admin-logs",
    category: "Administración",
    method: "GET",
    path: "/api/admin/logs",
    description: "Logs de actividad del sistema",
    requiresAuth: true,
    queryParams: [{ name: "limit", default: "20", label: "Límite" }],
  },
  {
    id: "admin-alerts",
    category: "Administración",
    method: "GET",
    path: "/api/admin/alerts",
    description: "Listar alertas configuradas",
    requiresAuth: true,
  },
  {
    id: "admin-locations",
    category: "Administración",
    method: "GET",
    path: "/api/admin/locations",
    description: "Ubicaciones registradas en MySQL",
    requiresAuth: true,
  },
  {
    id: "admin-sensors",
    category: "Administración",
    method: "GET",
    path: "/api/admin/sensors",
    description: "Tipos de sensores registrados en MySQL",
    requiresAuth: true,
  },
];
