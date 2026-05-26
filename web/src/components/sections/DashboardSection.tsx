"use client";

import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  fetchSummary,
  getApiBaseUrl,
  Summary,
  LOCATIONS,
  formatLocationName,
  formatSensorValue,
  getSensorInfo,
  getCO2AlertLevel,
  getBatteryAlertLevel,
} from "@/lib/api";
import { useWebSocket } from "@/hooks/use-websocket";
import { RefreshCw, Activity, AlertCircle } from "lucide-react";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { registerGsapPlugins } from "@/lib/gsap/register";
import { createRevealStagger } from "@/lib/gsap/scroll-effects";

export function DashboardSection() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { data: wsData, isConnected, error: wsError, reconnect } =
    useWebSocket();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setFetchError(null);
        const result = await fetchSummary();
        setSummary(result.summary);
        setLastUpdate(new Date());
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "No se pudo cargar el dashboard";
        setFetchError(message);
        console.error("Error loading summary:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (wsData && summary) {
      setLastUpdate(new Date());
    }
  }, [wsData, summary]);

  useGSAP(
    () => {
      if (!gridRef.current || loading) return;
      registerGsapPlugins();
      return createRevealStagger(gridRef.current, "[data-card]");
    },
    { dependencies: [loading, summary] }
  );

  if (loading) {
    return (
      <Section className="bg-cinematic-bg flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <Container>
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 rounded-full border-2 border-cinematic-accent border-t-transparent animate-spin" />
            <p className="text-xl mt-4 text-medusse-gray font-display">
              Cargando datos en tiempo real...
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="dashboard" className="bg-cinematic-bg py-24 flex items-center">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-medusse-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <RevealGroup className="space-y-10">
          <div
            data-reveal
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-cinematic-accent text-sm uppercase tracking-widest mb-2">
                En vivo
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
                Dashboard en Tiempo Real
              </h2>
              <p className="text-medusse-gray mt-2 font-mono text-sm">
                Última actualización:{" "}
                {lastUpdate.toLocaleTimeString("es-ES")}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="glass-card flex items-center gap-2 px-4 py-2 rounded-full">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    isConnected ? "bg-medusse-green" : "bg-medusse-red"
                  } ${isConnected ? "animate-pulse" : ""}`}
                />
                <span className="text-sm font-medium text-white">
                  {isConnected ? "WebSocket activo" : "Desconectado"}
                </span>
                {!isConnected && (
                  <button
                    onClick={reconnect}
                    className="ml-1 text-cinematic-accent hover:text-white"
                    title="Reconectar"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Actualizar
              </Button>
            </div>
          </div>

          {fetchError && (
            <div
              data-reveal
              className="glass-card border-medusse-orange/40 rounded-xl p-5 flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-medusse-orange shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium text-white">API no disponible</p>
                <p className="text-sm text-medusse-gray">{fetchError}</p>
                <p className="text-sm text-medusse-gray">
                  URL esperada:{" "}
                  <code className="text-cinematic-accent font-mono text-xs">
                    {getApiBaseUrl()}/api/summary
                  </code>
                </p>
                <p className="text-xs text-medusse-gray">
                  En otra terminal:{" "}
                  <code className="text-white/80">cd api && npm start</code>
                  {" · "}
                  Docker:{" "}
                  <code className="text-white/80">
                    cd docker && docker compose up -d
                  </code>
                </p>
              </div>
            </div>
          )}

          {wsError && (
            <div
              data-reveal
              className="glass-card border-medusse-red/30 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-medusse-red shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-medusse-red">WebSocket</p>
                <p className="text-sm text-medusse-gray mt-1">{wsError}</p>
              </div>
            </div>
          )}

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {LOCATIONS.map((location) => {
              const locationData = summary?.[location.name];

              if (!locationData) {
                return (
                  <LocationCardSkeleton
                    key={location.name}
                    location={location}
                  />
                );
              }

              return (
                <LocationCard
                  key={location.name}
                  location={location}
                  data={locationData}
                />
              );
            })}
          </div>

          {(!summary || Object.keys(summary).length === 0) && (
            <div
              data-reveal
              className="text-center py-16 glass-card rounded-2xl"
            >
              <Activity className="h-12 w-12 text-medusse-gray mx-auto mb-4" />
              <p className="text-lg text-white">No hay datos disponibles</p>
              <p className="text-sm text-medusse-gray mt-2">
                Asegúrate de que el simulador y la API estén ejecutándose
              </p>
            </div>
          )}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function LocationCard({
  location,
  data,
}: {
  location: (typeof LOCATIONS)[0];
  data: Summary[string];
}) {
  const { temperature, humidity, co2, pressure, battery_percentage } = data;

  return (
    <div
      data-card
      className="glass-card rounded-2xl p-6 hover:shadow-xl hover:shadow-medusse-blue/10 transition-shadow duration-300"
      style={{
        borderTop: `3px solid ${location.color}`,
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg font-bold text-white">
          {formatLocationName(location.name)}
        </h3>
        <span className="text-xs text-medusse-gray font-mono">
          {location.node}
        </span>
      </div>

      <div className="space-y-2">
        {temperature && (
          <SensorDisplay
            icon={getSensorInfo("temperature").icon}
            label="Temperatura"
            value={formatSensorValue(temperature.value, "temperature")}
            color={location.color}
          />
        )}
        {humidity && (
          <SensorDisplay
            icon={getSensorInfo("humidity").icon}
            label="Humedad"
            value={formatSensorValue(humidity.value, "humidity")}
            color={location.color}
          />
        )}
        {co2 && (
          <SensorDisplay
            icon={getSensorInfo("co2").icon}
            label="CO₂"
            value={formatSensorValue(co2.value, "co2")}
            color={location.color}
            alert={getCO2AlertLevel(co2.value)}
          />
        )}
        {pressure && (
          <SensorDisplay
            icon={getSensorInfo("pressure").icon}
            label="Presión"
            value={formatSensorValue(pressure.value, "pressure")}
            color={location.color}
          />
        )}
        {battery_percentage && (
          <SensorDisplay
            icon={getSensorInfo("battery_percentage").icon}
            label="Batería"
            value={formatSensorValue(
              battery_percentage.value,
              "battery_percentage"
            )}
            color={location.color}
            alert={getBatteryAlertLevel(battery_percentage.value)}
          />
        )}
      </div>

      {temperature && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-medusse-gray font-mono">
            {new Date(temperature.time).toLocaleTimeString("es-ES")}
          </p>
        </div>
      )}
    </div>
  );
}

function SensorDisplay({
  icon,
  label,
  value,
  color,
  alert,
}: {
  icon: string;
  label: string;
  value: string;
  color: string;
  alert?: "good" | "warning" | "danger";
}) {
  const alertStyles = {
    good: "bg-medusse-green/10 border-medusse-green/30",
    warning: "bg-medusse-orange/10 border-medusse-orange/30",
    danger: "bg-medusse-red/10 border-medusse-red/30",
  };

  return (
    <div
      className={`flex items-center justify-between p-2.5 rounded-lg ${
        alert ? `${alertStyles[alert]} border` : "bg-white/5"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span className="text-sm text-medusse-gray">{label}</span>
      </div>
      <span className="text-base font-bold font-mono" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function LocationCardSkeleton({
  location,
}: {
  location: (typeof LOCATIONS)[0];
}) {
  return (
    <div
      data-card
      className="glass-card rounded-2xl p-6 animate-pulse"
      style={{ borderTop: `3px solid ${location.color}` }}
    >
      <div className="h-6 bg-white/10 rounded w-3/4 mb-5" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 bg-white/10 rounded w-1/2" />
            <div className="h-4 bg-white/10 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
