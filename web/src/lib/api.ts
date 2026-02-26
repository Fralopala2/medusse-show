/**
 * Medusse IoT - API Client
 * Cliente para comunicación con la API REST del proyecto Medusse
 */

const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}:3001`;
  }
  return 'http://127.0.0.1:3001';
};

const API_BASE_URL = getApiUrl();

// ============================================================================
// TIPOS DE DATOS
// ============================================================================

export interface Location {
  name: string;
  color: string;
  node: string;
  tempBase: number;
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

export interface HistoricalDataPoint {
  time: string;
  value: number;
  location: string;
  sensor: string;
}

export interface Stats {
  min: number;
  max: number;
  avg: number;
  count: number;
}

export interface EnergyData {
  battery_voltage?: SensorData;
  solar_voltage?: SensorData;
  battery_percentage?: SensorData;
  power_consumption?: SensorData;
  charging_status?: SensorData;
  low_power_mode?: SensorData;
  wake_count?: SensorData;
}

export interface EnergyAlert {
  level: 'info' | 'warning' | 'critical';
  type: string;
  location: string;
  message: string;
  value: number;
  timestamp: string;
}

export interface HealthStatus {
  status: string;
  timestamp: string;
  services: {
    influxdb: string;
    bucket: string;
    org: string;
    mqtt: string;
    websocket: string;
  };
}

// ============================================================================
// CONFIGURACIÓN DE UBICACIONES
// ============================================================================

export const LOCATIONS: Location[] = [
  { name: 'aula20', color: '#E53E3E', node: 'ESP32_NODE_01', tempBase: 22 },
  { name: 'aula21', color: '#805AD5', node: 'ESP32_NODE_02', tempBase: 24 },
  { name: 'gimnasio', color: '#FF9800', node: 'ESP32_NODE_03', tempBase: 23 },
  { name: 'laboratorio', color: '#38A169', node: 'ESP32_NODE_04', tempBase: 21 },
];

export const SENSOR_TYPES = {
  // Sensores ambientales
  temperature: { name: 'Temperatura', unit: '°C', icon: '🌡️' },
  humidity: { name: 'Humedad', unit: '%', icon: '💧' },
  co2: { name: 'CO₂', unit: 'ppm', icon: '🫁' },
  pressure: { name: 'Presión', unit: 'hPa', icon: '🌪️' },
  voc: { name: 'VOC', unit: 'ppb', icon: '🌿' },
  iaq: { name: 'IAQ', unit: 'índice', icon: '🏠' },
  
  // Sensores de agua y suelo
  soil_moisture: { name: 'Humedad Suelo', unit: '%', icon: '🌱' },
  ph_level: { name: 'pH', unit: 'pH', icon: '⚗️' },
  water_flow: { name: 'Flujo Agua', unit: 'L/min', icon: '💦' },
  tds: { name: 'TDS', unit: 'ppm', icon: '🧪' },
  dissolved_oxygen: { name: 'Oxígeno Disuelto', unit: 'mg/L', icon: '🐟' },
  
  // Sensores de energía
  battery_voltage: { name: 'Voltaje Batería', unit: 'V', icon: '🔋' },
  solar_voltage: { name: 'Voltaje Solar', unit: 'V', icon: '☀️' },
  battery_percentage: { name: 'Batería', unit: '%', icon: '🔋' },
  power_consumption: { name: 'Consumo', unit: 'mA', icon: '⚡' },
  charging_status: { name: 'Cargando', unit: '', icon: '🔌' },
  low_power_mode: { name: 'Bajo Consumo', unit: '', icon: '🌙' },
  wake_count: { name: 'Wake Count', unit: '', icon: '🔄' },
};

// ============================================================================
// FUNCIONES DE API
// ============================================================================

/**
 * Verifica el estado de salud de la API y servicios
 */
export async function fetchHealth(): Promise<HealthStatus> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) throw new Error('Failed to fetch health status');
  return response.json();
}

/**
 * Obtiene la lista de ubicaciones disponibles
 */
export async function fetchLocations(): Promise<{ locations: string[] }> {
  const response = await fetch(`${API_BASE_URL}/api/locations`);
  if (!response.ok) throw new Error('Failed to fetch locations');
  return response.json();
}

/**
 * Obtiene el resumen de todos los sensores de todas las ubicaciones
 */
export async function fetchSummary(): Promise<{ summary: Summary }> {
  const response = await fetch(`${API_BASE_URL}/api/summary`);
  if (!response.ok) throw new Error('Failed to fetch summary');
  return response.json();
}

/**
 * Obtiene los últimos datos de sensores para una ubicación específica
 */
export async function fetchLatestData(location: string): Promise<{ location: string; data: any }> {
  const response = await fetch(`${API_BASE_URL}/api/latest/${location}`);
  if (!response.ok) throw new Error(`Failed to fetch data for ${location}`);
  return response.json();
}

/**
 * Obtiene datos históricos de un sensor específico
 */
export async function fetchHistoricalData(
  location: string,
  sensor: string,
  hours: number = 24,
  interval: string = '5m'
): Promise<{ data: HistoricalDataPoint[] }> {
  const response = await fetch(
    `${API_BASE_URL}/api/data/${location}/${sensor}?hours=${hours}&interval=${interval}`
  );
  if (!response.ok) throw new Error('Failed to fetch historical data');
  return response.json();
}

/**
 * Obtiene estadísticas de un sensor específico
 */
export async function fetchStats(
  location: string,
  sensor: string,
  hours: number = 24
): Promise<Stats> {
  const response = await fetch(
    `${API_BASE_URL}/api/stats/${location}/${sensor}?hours=${hours}`
  );
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

// ============================================================================
// FUNCIONES DE ENERGÍA (FASE 2)
// ============================================================================

/**
 * Obtiene datos de energía para una ubicación específica
 */
export async function fetchEnergyData(location: string): Promise<{ location: string; energy: EnergyData; timestamp: string }> {
  const response = await fetch(`${API_BASE_URL}/api/energy/${location}`);
  if (!response.ok) throw new Error('Failed to fetch energy data');
  return response.json();
}

/**
 * Obtiene resumen de energía de todas las ubicaciones
 */
export async function fetchEnergySummary(): Promise<{ summary: { [location: string]: EnergyData }; timestamp: string }> {
  const response = await fetch(`${API_BASE_URL}/api/energy/summary`);
  if (!response.ok) throw new Error('Failed to fetch energy summary');
  return response.json();
}

/**
 * Obtiene alertas de energía del sistema
 */
export async function fetchEnergyAlerts(): Promise<{ alerts: EnergyAlert[]; timestamp: string }> {
  const response = await fetch(`${API_BASE_URL}/api/energy/alerts`);
  if (!response.ok) throw new Error('Failed to fetch energy alerts');
  return response.json();
}

/**
 * Obtiene histórico de energía para una ubicación
 */
export async function fetchEnergyHistory(
  location: string,
  hours: number = 24,
  interval: string = '15m'
): Promise<{ location: string; history: any; timestamp: string }> {
  const response = await fetch(
    `${API_BASE_URL}/api/energy/${location}/history?hours=${hours}&interval=${interval}`
  );
  if (!response.ok) throw new Error('Failed to fetch energy history');
  return response.json();
}

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Formatea el nombre de una ubicación para mostrar
 */
export function formatLocationName(location: string): string {
  const names: { [key: string]: string } = {
    aula20: 'Aula 20',
    aula21: 'Aula 21',
    gimnasio: 'Gimnasio',
    laboratorio: 'Laboratorio',
  };
  return names[location] || location;
}

/**
 * Obtiene el color de una ubicación
 */
export function getLocationColor(location: string): string {
  const loc = LOCATIONS.find(l => l.name === location);
  return loc?.color || '#2196F3';
}

/**
 * Obtiene información de un tipo de sensor
 */
export function getSensorInfo(sensorType: string) {
  return SENSOR_TYPES[sensorType as keyof typeof SENSOR_TYPES] || {
    name: sensorType,
    unit: '',
    icon: '📊',
  };
}

/**
 * Formatea un valor de sensor con su unidad
 */
export function formatSensorValue(value: number, sensorType: string): string {
  const info = getSensorInfo(sensorType);
  
  // Formatear según el tipo de sensor
  if (sensorType === 'charging_status' || sensorType === 'low_power_mode') {
    return value === 1 ? 'Sí' : 'No';
  }
  
  if (sensorType === 'wake_count') {
    return value.toString();
  }
  
  // Números decimales
  const decimals = ['temperature', 'humidity', 'pressure', 'ph_level', 'battery_voltage', 'solar_voltage'].includes(sensorType) ? 1 : 0;
  
  return `${value.toFixed(decimals)}${info.unit ? ' ' + info.unit : ''}`;
}

/**
 * Determina el nivel de alerta para CO2
 */
export function getCO2AlertLevel(value: number): 'good' | 'warning' | 'danger' {
  if (value < 600) return 'good';
  if (value < 1000) return 'warning';
  return 'danger';
}

/**
 * Determina el nivel de alerta para batería
 */
export function getBatteryAlertLevel(percentage: number): 'good' | 'warning' | 'danger' {
  if (percentage > 50) return 'good';
  if (percentage > 25) return 'warning';
  return 'danger';
}
