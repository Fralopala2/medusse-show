import { getApiBaseUrl } from '@/lib/api';

export type ServiceStatus = 'up' | 'down' | 'degraded' | 'unknown';

export interface DevService {
  id: string;
  label: string;
  port: number | null;
  status: ServiceStatus;
  latencyMs?: number | null;
  lastLogAt?: string | null;
  processRunning?: boolean;
}

export interface DockerContainer {
  name: string;
  status: string;
  state: string;
}

export interface DevStatusResponse {
  timestamp: string;
  hostIp: string;
  summary: { up: number; total: number };
  services: DevService[];
  docker: DockerContainer[];
}

export interface DevLogsResponse {
  service: string;
  exists: boolean;
  lines: string[];
  mtime: string | null;
  size?: number;
}

function devBaseUrl(): string {
  return `${getApiBaseUrl()}/api/dev`;
}

export async function fetchDevStatus(): Promise<DevStatusResponse> {
  const response = await fetch(`${devBaseUrl()}/status`);
  if (!response.ok) throw new Error('No se pudo obtener el estado del sistema');
  return response.json();
}

export async function fetchDevLogs(
  service: 'api' | 'web' | 'simulator',
  lines = 80
): Promise<DevLogsResponse> {
  const response = await fetch(
    `${devBaseUrl()}/logs?service=${service}&lines=${lines}`
  );
  if (!response.ok) throw new Error('No se pudieron cargar los logs');
  return response.json();
}

export async function stopSystem(): Promise<{ ok: boolean; message: string }> {
  const response = await fetch(`${devBaseUrl()}/stop`, { method: 'POST' });
  if (!response.ok) throw new Error('No se pudo detener el sistema');
  return response.json();
}
