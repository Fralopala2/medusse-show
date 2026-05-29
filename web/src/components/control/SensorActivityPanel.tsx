"use client";

import { useEffect, useState } from "react";
import { fetchSummary, formatLocationName, formatSensorValue, getSensorInfo, Summary } from "@/lib/api";
import { useWebSocket } from "@/hooks/use-websocket";
import { Activity, Wifi, WifiOff } from "lucide-react";

export function SensorActivityPanel() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: wsData, isConnected, error: wsError } = useWebSocket();

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchSummary();
        setSummary(result.summary);
      } catch {
        setSummary(null);
      } finally {
        setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, []);

  const locations = summary ? Object.keys(summary).slice(0, 4) : [];

  return (
    <div className="rounded-xl border border-white/10 bg-cinematic-surface/80 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-cinematic-accent" />
          Actividad IoT
        </h2>
        <div className="flex items-center gap-2 text-sm">
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">WS conectado</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400">WS desconectado</span>
            </>
          )}
        </div>
      </div>

      {wsError && <p className="text-xs text-amber-400 mb-3">{wsError}</p>}

      {wsData && (
        <div className="mb-4 rounded-lg bg-black/30 px-3 py-2 text-xs font-mono text-cinematic-accent">
          Ultimo evento: {wsData.location}/{wsData.sensor} = {wsData.value}
        </div>
      )}

      {loading && <p className="text-sm text-medusse-gray">Cargando sensores...</p>}

      {!loading && locations.length === 0 && (
        <p className="text-sm text-medusse-gray">Sin datos de sensores aun</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {locations.map((location) => {
          const sensors = summary?.[location] ?? {};
          const firstSensor = Object.keys(sensors)[0];
          const reading = firstSensor ? sensors[firstSensor] : null;
          const info = firstSensor ? getSensorInfo(firstSensor) : null;

          return (
            <div key={location} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <p className="text-sm font-medium text-white">{formatLocationName(location)}</p>
              {reading && info && (
                <p className="text-xs text-medusse-gray mt-1">
                  {info.name}: {formatSensorValue(reading.value, firstSensor)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
