"use client";

import { ExternalLink, Link2, WifiOff } from "lucide-react";
import { DevService } from "@/lib/control-api";

type AccessItem = {
  id: string;
  label: string;
  href: string | null;
  display: string;
  active: boolean;
  note: string;
};

function normalizeHostIp(hostIp: string) {
  if (!hostIp || hostIp === "127.0.0.1" || hostIp === "localhost") {
    return null;
  }

  return hostIp;
}

function buildAccessItems(hostname: string, services: DevService[]): AccessItem[] {
  const serviceMap = new Map(services.map((service) => [service.id, service]));

  const items: AccessItem[] = [
    {
      id: "web",
      label: "Pagina web",
      href: `http://${hostname}:4003`,
      display: `${hostname}:4003`,
      active: serviceMap.get("web")?.status === "up",
      note: "Interfaz publica",
    },
    {
      id: "grafana",
      label: "Grafana",
      href: `http://${hostname}:4000`,
      display: `${hostname}:4000`,
      active: serviceMap.get("grafana")?.status === "up",
      note: "Dashboards y metricas",
    },
    {
      id: "api",
      label: "API REST",
      href: `http://${hostname}:4001/health`,
      display: `${hostname}:4001`,
      active: serviceMap.get("api")?.status === "up",
      note: "Estado y endpoints",
    },
    {
      id: "influxdb",
      label: "InfluxDB",
      href: `http://${hostname}:8086/health`,
      display: `${hostname}:8086`,
      active: serviceMap.get("influxdb")?.status === "up",
      note: "Base de datos de series",
    },
    {
      id: "mqtt",
      label: "MQTT",
      href: null,
      display: `${hostname}:1883`,
      active: serviceMap.get("mqtt")?.status === "up",
      note: "Broker TCP",
    },
    {
      id: "mysql",
      label: "MySQL",
      href: null,
      display: `${hostname}:13306`,
      active: serviceMap.get("mysql")?.status === "up",
      note: "Base de datos relacional",
    },
  ];

  return items.filter((item) => item.active);
}

export function ServiceAccessSummary({
  services,
  hostIp,
}: {
  services: DevService[];
  hostIp: string;
}) {
  const hostname = normalizeHostIp(hostIp) ?? "127.0.0.1";

  const activeItems = buildAccessItems(hostname, services);
  const totalActive = activeItems.length;

  return (
    <section className="w-full rounded-xl border border-white/10 bg-cinematic-surface/80 p-3 backdrop-blur md:p-4">
      <div className="mb-3 flex items-start justify-between gap-3 md:mb-4">
        <div>
          <h2 className="text-base font-semibold text-white md:text-lg">Accesos activos</h2>
          <p className="mt-1 text-[11px] text-medusse-gray md:text-xs">Host actual: {hostname}</p>
        </div>
        <span className="rounded-full border border-cinematic-accent/40 px-2 py-1 text-[11px] text-cinematic-accent md:text-xs">
          {totalActive} online
        </span>
      </div>

      <div className="space-y-2 md:space-y-3">
        {activeItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-white/10 bg-black/20 p-2.5 md:p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-white md:text-sm">{item.label}</p>
                <p className="mt-1 text-[11px] text-medusse-gray md:text-xs">{item.note}</p>
              </div>
              <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300 md:text-[11px]">
                Activo
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-2 rounded-md border border-white/10 bg-black/30 px-2.5 py-2 md:mt-3 md:flex-row md:items-center md:justify-between md:px-3">
              <span className="min-w-0 truncate font-mono text-[11px] text-white md:text-xs">{item.display}</span>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1 rounded-md px-2 py-1 text-[11px] text-cinematic-accent hover:bg-white/5 md:w-auto md:text-xs"
                >
                  Abrir <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] text-medusse-gray md:text-xs">
                  <Link2 className="h-3 w-3" />
                  TCP
                </span>
              )}
            </div>
          </div>
        ))}

        {activeItems.length === 0 && (
          <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-medusse-gray md:p-4">
            <div className="flex items-center gap-2 text-amber-300">
              <WifiOff className="h-4 w-4" />
              <span>No hay servicios accesibles en este momento</span>
            </div>
            <p className="mt-2 text-[11px] md:text-xs">Revisa el estado general o espera a que vuelvan a arrancar.</p>
          </div>
        )}
      </div>
    </section>
  );
}