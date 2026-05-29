"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ServiceStatusGrid } from "@/components/control/ServiceStatusGrid";
import { LogViewer } from "@/components/control/LogViewer";
import { SensorActivityPanel } from "@/components/control/SensorActivityPanel";
import {
  DevStatusResponse,
  fetchDevStatus,
  stopSystem,
} from "@/lib/control-api";
import { ExternalLink, Power, RefreshCw } from "lucide-react";

export default function ControlPage() {
  const [status, setStatus] = useState<DevStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stopping, setStopping] = useState(false);
  const [stopMessage, setStopMessage] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchDevStatus();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexion con la API");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 3000);
    return () => clearInterval(interval);
  }, [refresh]);

  async function handleStop() {
    if (!confirm("Detener todo el sistema Medusse?")) return;
    setStopping(true);
    setStopMessage(null);
    try {
      const result = await stopSystem();
      setStopMessage(result.message);
    } catch (err) {
      setStopMessage(err instanceof Error ? err.message : "Error al detener");
    } finally {
      setStopping(false);
    }
  }

  return (
    <div className="theme-cinematic min-h-screen bg-cinematic-bg text-medusse-white">
      <header className="border-b border-white/10 bg-cinematic-surface/60 backdrop-blur">
        <Container className="py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src="/logos/logoMedusse.svg" alt="Medusse" className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold text-white">Centro de control</h1>
                <p className="text-sm text-medusse-gray">
                  Portal de desarrollo — sustituye las terminales del stack local
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {status && (
                <span className="text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  {status.summary.up}/{status.summary.total} servicios activos
                </span>
              )}
              <button
                type="button"
                onClick={refresh}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Actualizar
              </button>
              <button
                type="button"
                onClick={handleStop}
                disabled={stopping}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-sm disabled:opacity-50"
              >
                <Power className="w-4 h-4" />
                {stopping ? "Deteniendo..." : "Detener sistema"}
              </button>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container className="space-y-8">
          <div className="flex flex-wrap gap-2">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
            >
              Grafana <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="http://localhost:3003"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
            >
              Web publica <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
            >
              Login
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
            >
              Inicio
            </Link>
          </div>

          {loading && !status && (
            <p className="text-medusse-gray">Conectando con la API...</p>
          )}
          {error && (
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-amber-200 text-sm">
              {error}. Asegurate de que la API este corriendo en el puerto 3001.
            </div>
          )}
          {stopMessage && (
            <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm">
              {stopMessage}
            </div>
          )}

          {status && (
            <ServiceStatusGrid
              services={status.services}
              docker={status.docker}
              lastCheck={status.timestamp}
            />
          )}

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Logs en vivo</h2>
            <LogViewer />
          </section>

          <SensorActivityPanel />
        </Container>
      </main>
    </div>
  );
}
