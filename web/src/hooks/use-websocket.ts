/**
 * Medusse IoT - WebSocket Hook
 * Hook personalizado para conexión WebSocket en tiempo real
 */

import { useEffect, useState, useRef, useCallback } from 'react';

const getWsUrl = () => {
  if (process.env.NEXT_PUBLIC_WS_URL) return process.env.NEXT_PUBLIC_WS_URL;
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.hostname}:3002`;
  }
  return 'ws://127.0.0.1:3002';
};

const WS_URL = getWsUrl();

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

  // Función de conexión sin useCallback para evitar problemas de dependencias
  const connect = () => {
    try {
      console.log('🔌 Intentando conectar WebSocket:', WS_URL);
      
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
          const parsedData = JSON.parse(event.data) as WebSocketData;
          console.log('📨 WebSocket data received:', parsedData);
          setData(parsedData);
        } catch (err) {
          console.error('❌ Error parsing WebSocket data:', err);
          setError('Error al procesar datos del servidor');
        }
      };

      ws.onerror = () => {
        console.warn('⚠️ WebSocket error (API no disponible)');
        setError('API no disponible - datos en tiempo real desactivados');
        setIsConnected(false);
      };

      ws.onclose = (event) => {
        console.log('🔌 WebSocket desconectado:', event.code);
        setIsConnected(false);
        wsRef.current = null;

        // Intentar reconectar automaticamente solo si no fue cierre intencional
        if (event.code !== 1000 && reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current++;
          console.log(
            `🔄 Reintentando conexion... (${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS})`
          );
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, RECONNECT_DELAY);
        } else if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
          console.warn('⚠️ WebSocket no disponible - continuando sin datos en tiempo real');
          setError('Datos en tiempo real no disponibles');
        }
      };
    } catch (err) {
      console.error('❌ Error creating WebSocket:', err);
      setError('Error al crear conexión WebSocket');
    }
  };

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
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isConnected, error, reconnect };
}

/**
 * Hook para WebSocket con filtro por ubicación
 * Solo devuelve datos de una ubicación específica
 */
export function useWebSocketFiltered(location: string): UseWebSocketReturn {
  const { data, isConnected, error, reconnect } = useWebSocket();
  
  // Usar useMemo en lugar de useState + useEffect para evitar renders innecesarios
  const filteredData = data && data.location === location ? data : null;

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
  const bufferRef = useRef<WebSocketData[]>([]);
  const [buffer, setBuffer] = useState<WebSocketData[]>([]);

  useEffect(() => {
    if (data) {
      // Actualizar ref primero
      bufferRef.current = [...bufferRef.current, data];
      
      // Mantener solo los últimos N elementos
      if (bufferRef.current.length > bufferSize) {
        bufferRef.current = bufferRef.current.slice(-bufferSize);
      }
      
      // Actualizar estado en el siguiente tick para evitar cascading renders
      setTimeout(() => {
        setBuffer([...bufferRef.current]);
      }, 0);
    }
  }, [data, bufferSize]);

  const clearBuffer = useCallback(() => {
    bufferRef.current = [];
    setBuffer([]);
  }, []);

  return { buffer, isConnected, error, reconnect, clearBuffer };
}
