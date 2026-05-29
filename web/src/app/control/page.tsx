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
  const [systemStopped, setSystemStopped] = useState(false);
  const [stopError, setStopError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (systemStopped) return;

    try {
      const data = await fetchDevStatus();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexion con la API");
    } finally {
      setLoading(false);
    }
  }, [systemStopped]);

  useEffect(() => {
    if (systemStopped) return;

    refresh();
    const interval = setInterval(refresh, 3000);
    return () => clearInterval(interval);
  }, [refresh, systemStopped]);

  const grafanaUrl = typeof window !== 'undefined' ? `http://${window.location.hostname}:3000` : 'http://localhost:3000';

  async function handleStop() {
    if (!confirm("Detener todo el sistema Medusse?")) return;

    setStopping(true);
    setStopError(null);

    try {
      await stopSystem();
      setSystemStopped(true);
      setError(null);
      setStatus(null);
    } catch (err) {
      setStopError(err instanceof Error ? err.message : "Error al detener");
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
              <img src="/logos/logoMedusse.svg" alt="Medusse" className="h-10 w-10 shrink-0" />
              <h1 className="text-xl font-bold text-white leading-none">Centro de control</h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {status && !systemStopped && (
                <span className="text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  {status.summary.up}/{status.summary.total} servicios activos
                </span>
              )}
              {!systemStopped && (
                <>
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
                </>
              )}
            </div>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container className="space-y-8">
          {!systemStopped && (
            <div className="flex flex-wrap gap-2">
              <a
                href={grafanaUrl}
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
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
              >
                Login <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
              >
                Inicio <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          )}

          {systemStopped && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-8 text-center space-y-3">
              <p className="text-2xl font-semibold text-emerald-300">Sistema detenido</p>
              <p className="text-medusse-gray max-w-lg mx-auto">
                API, Web, simulador y contenedores Docker se han apagado correctamente.
              </p>
              <p className="text-sm text-medusse-gray">
                Para volver a arrancar, ejecuta{" "}
                <code className="px-2 py-1 rounded bg-black/30 text-emerald-300">iniciar.bat</code>{" "}
                en la carpeta del proyecto.
              </p>
            </div>
          )}

          {stopError && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200 text-sm">
              {stopError}
            </div>
          )}

          {loading && !status && !systemStopped && (
            <p className="text-medusse-gray">Conectando con la API...</p>
          )}

          {error && !systemStopped && (
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-amber-200 text-sm">
              {error}. Asegurate de que la API este corriendo en el puerto 3001.
            </div>
          )}

          {status && !systemStopped && (
            <ServiceStatusGrid
              services={status.services}
              docker={status.docker}
              lastCheck={status.timestamp}
            />
          )}

          {!systemStopped && (
            <>
              <section>
                <h2 className="text-lg font-semibold text-white mb-3">Logs en vivo</h2>
                <LogViewer />
              </section>

              <SensorActivityPanel />
            </>
          )}
        </Container>
      </main>
    </div>
  );
}
