/**
 * Medusse IoT - WebSocket Hook
 * Hook personalizado para conexión WebSocket en tiempo real
 */

import { useEffect, useState, useRef, useCallback } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3002';

export interface WebSocketData {
  location?: string;
  sensor?: string;
  value?: number;
  timestamp?: number;
  [key: string]: any;
}

export interface UseWebSocketReturn {
  data: WebSocketData | null;
  isConnected: boolean;
  error: string | null;
  reconnect: () => void;
}

/**
 * Hook para conectar con el WebSocket del servidor
 * Proporciona datos en tiempo real y gestión automática de reconexión
 */
export function useWebSocket(): UseWebSocketReturn {
  const [data, setData] = useState<WebSocketData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000; // 3 segundos

  const connect = useCallback(() => {
    try {
      console.log('🔌 Connecting to WebSocket:', WS_URL);
      
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✅ WebSocket connected');
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          console.log('📨 WebSocket data received:', parsedData);
          setData(parsedData);
        } catch (err) {
          console.error('❌ Error parsing WebSocket data:', err);
          setError('Error al procesar datos del servidor');
        }
      };

      ws.onerror = (event) => {
        console.error('❌ WebSocket error:', event);
        setError('Error de conexión WebSocket');
        setIsConnected(false);
      };

      ws.onclose = (event) => {
        console.log('🔌 WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        wsRef.current = null;

        // Intentar reconectar automáticamente
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current++;
          console.log(
            `🔄 Reconnecting... (attempt ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS})`
          );
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, RECONNECT_DELAY);
        } else {
          console.error('❌ Max reconnection attempts reached');
          setError('No se pudo reconectar al servidor');
        }
      };
    } catch (err) {
      console.error('❌ Error creating WebSocket:', err);
      setError('Error al crear conexión WebSocket');
    }
  }, []);

  const reconnect = useCallback(() => {
    console.log('🔄 Manual reconnection requested');
    reconnectAttemptsRef.current = 0;
    
    // Cerrar conexión existente si hay
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    // Limpiar timeout de reconexión
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    // Conectar de nuevo
    connect();
  }, [connect]);

  useEffect(() => {
    // Conectar al montar el componente
    connect();

    // Cleanup al desmontar
    return () => {
      console.log('🧹 Cleaning up WebSocket connection');
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return { data, isConnected, error, reconnect };
}

/**
 * Hook para WebSocket con filtro por ubicación
 * Solo devuelve datos de una ubicación específica
 */
export function useWebSocketFiltered(location: string): UseWebSocketReturn {
  const { data, isConnected, error, reconnect } = useWebSocket();
  const [filteredData, setFilteredData] = useState<WebSocketData | null>(null);

  useEffect(() => {
    if (data && data.location === location) {
      setFilteredData(data);
    }
  }, [data, location]);

  return { data: filteredData, isConnected, error, reconnect };
}

/**
 * Hook para WebSocket con buffer de datos
 * Mantiene un historial de los últimos N mensajes
 */
export function useWebSocketBuffer(bufferSize: number = 10): {
  buffer: WebSocketData[];
  isConnected: boolean;
  error: string | null;
  reconnect: () => void;
  clearBuffer: () => void;
} {
  const { data, isConnected, error, reconnect } = useWebSocket();
  const [buffer, setBuffer] = useState<WebSocketData[]>([]);

  useEffect(() => {
    if (data) {
      setBuffer((prev) => {
        const newBuffer = [...prev, data];
        // Mantener solo los últimos N elementos
        if (newBuffer.length > bufferSize) {
          return newBuffer.slice(-bufferSize);
        }
        return newBuffer;
      });
    }
  }, [data, bufferSize]);

  const clearBuffer = useCallback(() => {
    setBuffer([]);
  }, []);

  return { buffer, isConnected, error, reconnect, clearBuffer };
}
