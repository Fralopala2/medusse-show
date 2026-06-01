"use client";

import { useEffect, useMemo, useState } from "react";
import { getApiBaseUrl } from "@/lib/api";
import {
  API_ENDPOINTS,
  API_ENDPOINT_CATEGORIES,
  type ApiEndpointDefinition,
} from "@/lib/api-endpoints";
import { Play, Copy, Check, AlertCircle, Clock } from "lucide-react";

interface TestResult {
  url: string;
  status: number;
  ok: boolean;
  elapsedMs: number;
  body: unknown;
  error?: string;
}

function buildUrl(
  endpoint: ApiEndpointDefinition,
  values: Record<string, string>
): string {
  let path = endpoint.path;

  endpoint.pathParams?.forEach((param) => {
    path = path.replace(
      `:${param.name}`,
      values[`path_${param.name}`] || param.default || ""
    );
  });

  const query = new URLSearchParams();
  endpoint.queryParams?.forEach((param) => {
    const value = values[`query_${param.name}`] ?? param.default;
    if (value) query.set(param.name, value);
  });

  const base = getApiBaseUrl();
  const queryString = query.toString();
  return `${base}${path}${queryString ? `?${queryString}` : ""}`;
}

function getInitialValues(endpoint: ApiEndpointDefinition): Record<string, string> {
  const values: Record<string, string> = {};
  endpoint.pathParams?.forEach((p) => {
    values[`path_${p.name}`] = p.default ?? "";
  });
  endpoint.queryParams?.forEach((p) => {
    values[`query_${p.name}`] = p.default ?? "";
  });
  if (endpoint.bodyExample) {
    values.body = JSON.stringify(endpoint.bodyExample, null, 2);
  }
  return values;
}

function methodColor(method: string): string {
  switch (method) {
    case "GET":
      return "bg-green-100 text-green-800";
    case "POST":
      return "bg-blue-100 text-blue-800";
    case "PUT":
      return "bg-amber-100 text-amber-800";
    case "DELETE":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function ApiEndpointExplorer() {
  const [category, setCategory] = useState<string>("Sensores");
  const [selectedId, setSelectedId] = useState("summary");
  const [paramValues, setParamValues] = useState<Record<string, string>>(() =>
    getInitialValues(API_ENDPOINTS.find((e) => e.id === "summary")!)
  );
  const [useAuth, setUseAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredEndpoints = useMemo(
    () => API_ENDPOINTS.filter((e) => e.category === category),
    [category]
  );

  const selected = useMemo(
    () => API_ENDPOINTS.find((e) => e.id === selectedId) ?? API_ENDPOINTS[0],
    [selectedId]
  );

  useEffect(() => {
    const ep = API_ENDPOINTS.find((e) => e.id === selectedId);
    if (ep) setParamValues(getInitialValues(ep));
  }, [selectedId]);

  const selectEndpoint = (endpoint: ApiEndpointDefinition) => {
    setSelectedId(endpoint.id);
    setResult(null);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const first = API_ENDPOINTS.find((e) => e.category === cat);
    if (first) selectEndpoint(first);
  };

  const runTest = async () => {
    if (!selected) return;
    setLoading(true);
    setResult(null);

    const url = buildUrl(selected, paramValues);
    const headers: HeadersInit = { Accept: "application/json" };

    const needsAuth = selected.requiresAuth !== false && useAuth;
    if (needsAuth) {
      const token = localStorage.getItem("sessionToken");
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    if (selected.method === "POST" || selected.method === "PUT") {
      headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = { method: selected.method, headers };

    if (
      (selected.method === "POST" || selected.method === "PUT") &&
      paramValues.body
    ) {
      try {
        options.body = JSON.stringify(JSON.parse(paramValues.body));
      } catch {
        setResult({
          url,
          status: 0,
          ok: false,
          elapsedMs: 0,
          body: null,
          error: "El cuerpo JSON no es válido",
        });
        setLoading(false);
        return;
      }
    }

    const start = performance.now();
    try {
      const response = await fetch(url, options);
      const elapsedMs = Math.round(performance.now() - start);
      const text = await response.text();
      let body: unknown = text;
      try {
        body = text ? JSON.parse(text) : null;
      } catch {
        /* respuesta no JSON */
      }

      setResult({
        url,
        status: response.status,
        ok: response.ok,
        elapsedMs,
        body,
      });
    } catch (err) {
      setResult({
        url,
        status: 0,
        ok: false,
        elapsedMs: Math.round(performance.now() - start),
        body: null,
        error:
          err instanceof Error
            ? err.message
            : "No se pudo conectar con la API. ¿Está en marcha en el puerto 4001?",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = async () => {
    if (!result) return;
    const text = JSON.stringify(result.body, null, 2);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <p className="text-sm text-indigo-900">
          Prueba los endpoints documentados en el README de la API. Base:{" "}
          <code className="font-mono text-xs bg-white px-1 py-0.5 rounded">
            {getApiBaseUrl()}
          </code>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1">
        {API_ENDPOINT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              category === cat
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-2 max-h-[300px] lg:max-h-[520px] overflow-y-auto pr-1">
          {filteredEndpoints.map((endpoint) => (
            <button
              key={endpoint.id}
              type="button"
              onClick={() => selectEndpoint(endpoint)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedId === endpoint.id
                  ? "border-indigo-500 bg-indigo-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-indigo-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${methodColor(endpoint.method)}`}
                >
                  {endpoint.method}
                </span>
                <span className="text-xs font-mono text-gray-600 truncate">
                  {endpoint.path}
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">
                {endpoint.description}
              </p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`text-sm font-bold px-2 py-1 rounded ${methodColor(selected.method)}`}
              >
                {selected.method}
              </span>
              <code className="text-sm font-mono text-gray-800 break-all">
                {selected.path}
              </code>
            </div>
            <p className="text-sm text-gray-600 mb-4">{selected.description}</p>

            {selected.pathParams?.map((param) => (
              <div key={param.name} className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {param.label ?? param.name}
                </label>
                <input
                  type="text"
                  value={paramValues[`path_${param.name}`] ?? ""}
                  onChange={(e) =>
                    setParamValues((v) => ({
                      ...v,
                      [`path_${param.name}`]: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 font-mono"
                />
              </div>
            ))}

            {selected.queryParams?.map((param) => (
              <div key={param.name} className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {param.label ?? param.name} (query)
                </label>
                <input
                  type="text"
                  value={paramValues[`query_${param.name}`] ?? ""}
                  onChange={(e) =>
                    setParamValues((v) => ({
                      ...v,
                      [`query_${param.name}`]: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 font-mono"
                />
              </div>
            ))}

            {selected.bodyExample && (
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Cuerpo JSON
                </label>
                <textarea
                  value={paramValues.body ?? ""}
                  onChange={(e) =>
                    setParamValues((v) => ({ ...v, body: e.target.value }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 font-mono"
                />
              </div>
            )}

            <label className="flex items-center gap-2 mb-4 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={useAuth}
                onChange={(e) => setUseAuth(e.target.checked)}
                className="rounded border-gray-300"
              />
              Enviar token de sesión (Authorization: Bearer)
            </label>

            <p className="text-xs text-gray-500 font-mono mb-4 break-all bg-gray-50 p-2 rounded">
              {buildUrl(selected, paramValues)}
            </p>

            <button
              type="button"
              onClick={runTest}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
            >
              <Play className="h-4 w-4" />
              {loading ? "Ejecutando..." : "Ejecutar petición"}
            </button>
          </div>

          {result && (
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-semibold px-2 py-0.5 rounded ${
                      result.ok
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.status || "Error"}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5" />
                    {result.elapsedMs} ms
                  </span>
                </div>
                {result.body != null && (
                  <button
                    type="button"
                    onClick={copyResponse}
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? "Copiado" : "Copiar JSON"}
                  </button>
                )}
              </div>

              {result.error ? (
                <div className="p-4 flex gap-2 text-red-700 text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium">{result.error}</p>
                    <p className="text-xs mt-1 font-mono text-red-600">
                      {result.url}
                    </p>
                  </div>
                </div>
              ) : (
                <pre className="p-4 text-xs font-mono text-gray-800 overflow-auto max-h-[400px] bg-gray-900 text-green-300">
                  {JSON.stringify(result.body, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
