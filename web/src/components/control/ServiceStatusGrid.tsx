"use client";

import { DevService, DockerContainer } from "@/lib/control-api";

const statusStyles: Record<string, string> = {
  up: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  down: "bg-red-500/20 text-red-300 border-red-500/40",
  degraded: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  unknown: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
};

const statusLabel: Record<string, string> = {
  up: "Activo",
  down: "Caido",
  degraded: "Inactivo",
  unknown: "Desconocido",
};

interface Props {
  services: DevService[];
  docker: DockerContainer[];
  lastCheck: string | null;
}

export function ServiceStatusGrid({ services, docker, lastCheck }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-white/10 bg-cinematic-surface/80 p-4 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-white">{service.label}</p>
                  {service.port && (
                    <p className="text-xs text-medusse-gray mt-1">:{service.port}</p>
                  )}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${statusStyles[service.status]}`}
                >
                  {statusLabel[service.status]}
                </span>
              </div>
              {service.latencyMs != null && (
                <p className="text-xs text-medusse-gray mt-3">{service.latencyMs} ms</p>
              )}
              {service.id === "simulator" && service.processRunning && (
                <p className="text-xs text-emerald-400/80 mt-1">Proceso en ejecucion</p>
              )}
              {service.lastLogAt && (
                <p className="text-xs text-medusse-gray mt-1 truncate">
                  Ultimo log: {new Date(service.lastLogAt).toLocaleTimeString("es-ES")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Contenedores Docker</h2>
        {docker.length === 0 ? (
          <p className="text-sm text-medusse-gray">Sin contenedores medusse detectados</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {docker.map((container) => (
              <div
                key={container.name}
                className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm"
              >
                <p className="text-white font-mono">{container.name}</p>
                <p className="text-medusse-gray text-xs mt-1">{container.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {lastCheck && (
        <p className="text-xs text-medusse-gray">
          Ultima comprobacion: {new Date(lastCheck).toLocaleTimeString("es-ES")}
        </p>
      )}
    </div>
  );
}
