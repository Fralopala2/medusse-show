"use client";

import { useEffect, useRef, useState } from "react";
import { fetchDevLogs } from "@/lib/control-api";

type LogService = "api" | "web" | "simulator";

const TABS: { id: LogService; label: string }[] = [
  { id: "api", label: "API" },
  { id: "web", label: "Web" },
  { id: "simulator", label: "Simulador" },
];

function colorizeLine(line: string): string {
  const lower = line.toLowerCase();
  if (lower.includes("error") || lower.includes("[error]")) return "text-red-400";
  if (lower.includes("warn") || lower.includes("[warn]")) return "text-amber-400";
  if (lower.includes("ok") || lower.includes("ready") || lower.includes("success")) {
    return "text-emerald-400";
  }
  return "text-zinc-300";
}

export function LogViewer() {
  const [active, setActive] = useState<LogService>("api");
  const [lines, setLines] = useState<string[]>([]);
  const [exists, setExists] = useState(false);
  const [mtime, setMtime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadLogs() {
      try {
        const data = await fetchDevLogs(active, 100);
        if (cancelled) return;
        setLines(data.lines);
        setExists(data.exists);
        setMtime(data.mtime);
        setError(null);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error cargando logs");
        }
      }
    }

    loadLogs();
    const interval = setInterval(loadLogs, 2000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [active]);

  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lines, autoScroll]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                active === tab.id
                  ? "bg-cinematic-accent/20 text-cinematic-accent"
                  : "text-medusse-gray hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-medusse-gray">
          <input
            type="checkbox"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
            className="rounded"
          />
          Auto-scroll
        </label>
      </div>

      <div className="h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
        {error && <p className="text-red-400">{error}</p>}
        {!error && !exists && (
          <p className="text-medusse-gray">Esperando log de {active}...</p>
        )}
        {!error &&
          lines.map((line, index) => (
            <div key={`${index}-${line.slice(0, 20)}`} className={colorizeLine(line)}>
              {line || " "}
            </div>
          ))}
        <div ref={bottomRef} />
      </div>

      {mtime && (
        <div className="border-t border-white/10 px-4 py-2 text-xs text-medusse-gray">
          Actualizado: {new Date(mtime).toLocaleTimeString("es-ES")}
        </div>
      )}
    </div>
  );
}
