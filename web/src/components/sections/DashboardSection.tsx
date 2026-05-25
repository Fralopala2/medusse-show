"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { 
  fetchSummary, 
  Summary, 
  LOCATIONS, 
  formatLocationName, 
  formatSensorValue,
  getSensorInfo,
  getCO2AlertLevel,
  getBatteryAlertLevel
} from '@/lib/api';
import { useWebSocket } from '@/hooks/use-websocket';
import { RefreshCw, Activity, AlertCircle } from 'lucide-react';

export function DashboardSection() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { data: wsData, isConnected, error: wsError, reconnect } = useWebSocket();

  // Cargar datos iniciales
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await fetchSummary();
        setSummary(result.summary);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error loading summary:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    
    // Refresh cada 30 segundos
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Actualizar con datos de WebSocket
  useEffect(() => {
    if (wsData && summary) {
      console.log('Updating with WebSocket data:', wsData);
      // Aquí podrías actualizar el summary con los datos del WebSocket
      // Por ahora solo actualizamos el timestamp
      setLastUpdate(new Date());
    }
  }, [wsData, summary]);

  if (loading) {
    return (
      <Section className="bg-medusse-gray-light">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medusse-blue"></div>
            <p className="text-xl mt-4 text-medusse-gray">Cargando datos...</p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="dashboard" className="bg-medusse-gray-light pt-24">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-medusse-black">
                Dashboard en Tiempo Real
              </h2>
              <p className="text-medusse-gray mt-2">
                Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Indicador de conexión WebSocket */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                <div
                  className={`h-3 w-3 rounded-full ${
                    isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}
                />
                <span className="text-sm font-medium">
                  {isConnected ? 'Conectado' : 'Desconectado'}
                </span>
                {!isConnected && (
                  <button
                    onClick={reconnect}
                    className="ml-2 text-medusse-blue hover:text-medusse-darkblue"
                    title="Reconectar"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Botón de refresh manual */}
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

          {/* Error de WebSocket */}
          {wsError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Error de conexión</p>
                <p className="text-sm text-red-600 mt-1">{wsError}</p>
              </div>
            </div>
          )}

          {/* Grid de ubicaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {/* Mensaje si no hay datos */}
          {!summary || Object.keys(summary).length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Activity className="h-12 w-12 text-medusse-gray mx-auto mb-4" />
              <p className="text-lg text-medusse-gray">
                No hay datos disponibles
              </p>
              <p className="text-sm text-medusse-gray mt-2">
                Asegúrate de que el simulador y la API estén ejecutándose
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

// Componente para cada tarjeta de ubicación
function LocationCard({ location, data }: { location: typeof LOCATIONS[0]; data: Summary[string] }) {
  const { temperature, humidity, co2, pressure, battery_percentage } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 border-t-4 hover:shadow-xl transition-shadow"
      style={{ borderTopColor: location.color }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-medusse-black">
          {formatLocationName(location.name)}
        </h3>
        <span className="text-xs text-medusse-gray">{location.node}</span>
      </div>

      {/* Sensores principales */}
      <div className="space-y-3">
        {/* Temperatura */}
        {temperature && (
          <SensorDisplay
            icon={getSensorInfo('temperature').icon}
            label="Temperatura"
            value={formatSensorValue(temperature.value, 'temperature')}
            color={location.color}
          />
        )}

        {/* Humedad */}
        {humidity && (
          <SensorDisplay
            icon={getSensorInfo('humidity').icon}
            label="Humedad"
            value={formatSensorValue(humidity.value, 'humidity')}
            color={location.color}
          />
        )}

        {/* CO2 con alerta */}
        {co2 && (
          <SensorDisplay
            icon={getSensorInfo('co2').icon}
            label="CO₂"
            value={formatSensorValue(co2.value, 'co2')}
            color={location.color}
            alert={getCO2AlertLevel(co2.value)}
          />
        )}

        {/* Presión */}
        {pressure && (
          <SensorDisplay
            icon={getSensorInfo('pressure').icon}
            label="Presión"
            value={formatSensorValue(pressure.value, 'pressure')}
            color={location.color}
          />
        )}

        {/* Batería */}
        {battery_percentage && (
          <SensorDisplay
            icon={getSensorInfo('battery_percentage').icon}
            label="Batería"
            value={formatSensorValue(battery_percentage.value, 'battery_percentage')}
            color={location.color}
            alert={getBatteryAlertLevel(battery_percentage.value)}
          />
        )}
      </div>

      {/* Footer con timestamp */}
      {temperature && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-medusse-gray">
            Actualizado: {new Date(temperature.time).toLocaleTimeString('es-ES')}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// Componente para mostrar un sensor individual
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
  alert?: 'good' | 'warning' | 'danger';
}) {
  const alertColors = {
    good: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200',
  };

  return (
    <div
      className={`flex items-center justify-between p-2 rounded ${
        alert ? alertColors[alert] + ' border' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="text-sm text-medusse-gray">{label}</span>
      </div>
      <span className="text-lg font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

// Skeleton para cuando no hay datos
function LocationCardSkeleton({ location }: { location: typeof LOCATIONS[0] }) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 border-t-4 animate-pulse"
      style={{ borderTopColor: location.color }}
    >
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
