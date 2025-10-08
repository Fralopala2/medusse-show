#!/usr/bin/env python3
"""
Gateway directo - Importa y usa los simuladores directamente
"""

import sys
import json
import time
import threading
from datetime import datetime
from pathlib import Path

# Agregar el directorio arduino al path
arduino_dir = Path(__file__).parent.parent / "arduino"
sys.path.append(str(arduino_dir))

from test_multiple_nodes import ESP32NodeSimulator

class DirectGateway:
    def __init__(self, base_topic="iescelia"):
        self.base_topic = base_topic
        self.stats = {
            "messages_processed": 0,
            "messages_published": 0,
            "start_time": datetime.now()
        }
        self.message_queue = []
        
    def process_sensor_data(self, data):
        """Procesa datos de sensores"""
        try:
            node_id = data.get("node_id", "unknown")
            location = data.get("location", "unknown")
            
            print(f"\n📊 Procesando {node_id} @ {location}")
            
            # Procesar sensores
            sensors = data.get("sensors", {})
            
            # DHT22
            if "dht22" in sensors:
                dht_data = sensors["dht22"]
                if "temperature" in dht_data:
                    self._publish_message(
                        f"{self.base_topic}/{location}/temperature",
                        {"value": dht_data["temperature"], "sensor": "dht22", "node_id": node_id}
                    )
                if "humidity" in dht_data:
                    self._publish_message(
                        f"{self.base_topic}/{location}/humidity",
                        {"value": dht_data["humidity"], "sensor": "dht22", "node_id": node_id}
                    )
            
            # BME280
            if "bme280" in sensors:
                bme_data = sensors["bme280"]
                if "temperature" in bme_data:
                    self._publish_message(
                        f"{self.base_topic}/{location}/temperature",
                        {"value": bme_data["temperature"], "sensor": "bme280", "node_id": node_id}
                    )
                if "pressure" in bme_data:
                    self._publish_message(
                        f"{self.base_topic}/{location}/pressure",
                        {"value": bme_data["pressure"], "sensor": "bme280", "node_id": node_id}
                    )
            
            # Gas sensor
            if "gas" in sensors:
                gas_data = sensors["gas"]
                if "co2_ppm" in gas_data:
                    self._publish_message(
                        f"{self.base_topic}/{location}/co2",
                        {"value": gas_data["co2_ppm"], "sensor": "gas", "node_id": node_id}
                    )
            
            # System info
            if "system" in data:
                system_data = data["system"]
                self._publish_message(
                    f"{self.base_topic}/{location}/system",
                    {"free_heap": system_data.get("free_heap"), "uptime": system_data.get("uptime"), "node_id": node_id}
                )
            
            self.stats["messages_processed"] += 1
            return True
            
        except Exception as e:
            print(f"❌ Error procesando datos: {e}")
            return False
    
    def _publish_message(self, topic, payload):
        """Simula publicación MQTT"""
        json_payload = json.dumps(payload, separators=(',', ':'))
        timestamp = datetime.now().strftime("%H:%M:%S")
        
        print(f"📤 [{timestamp}] {topic}")
        print(f"   {json_payload}")
        
        self.stats["messages_published"] += 1
    
    def run_simulation(self, duration=20):
        """Ejecuta simulación directa"""
        print(f"🚀 Gateway Directo - Simulación por {duration}s")
        print(f"   Topic base: {self.base_topic}")
        print()
        
        # Crear nodos simulados
        nodes = [
            ESP32NodeSimulator("ESP32_NODE_01", "aula20", 8),
            ESP32NodeSimulator("ESP32_NODE_02", "aula21", 10),
            ESP32NodeSimulator("ESP32_NODE_03", "laboratorio", 12)
        ]
        
        # Función para capturar datos de un nodo
        def capture_node_data(node):
            original_print = print
            
            def custom_print(*args, **kwargs):
                # Capturar líneas JSON
                if args and isinstance(args[0], str):
                    line = args[0]
                    if line.startswith('[') and '] {' in line:
                        try:
                            json_part = line.split('] ', 1)[1]
                            if json_part.startswith('{') and json_part.endswith('}'):
                                data = json.loads(json_part)
                                self.process_sensor_data(data)
                        except:
                            pass
                
                # Llamar al print original para debug
                original_print(*args, **kwargs)
            
            # Reemplazar print temporalmente
            import builtins
            builtins.print = custom_print
            
            try:
                node.run()
            finally:
                builtins.print = original_print
        
        # Ejecutar nodos en hilos separados
        threads = []
        for node in nodes:
            thread = threading.Thread(target=capture_node_data, args=(node,))
            thread.daemon = True
            threads.append(thread)
            thread.start()
            time.sleep(1)
        
        print(f"✅ {len(nodes)} nodos iniciados")
        
        # Esperar duración especificada
        time.sleep(duration)
        
        # Detener nodos
        for node in nodes:
            node.stop()
        
        # Esperar a que terminen los hilos
        for thread in threads:
            thread.join(timeout=2)
        
        # Mostrar estadísticas
        duration_real = datetime.now() - self.stats["start_time"]
        print(f"\n📊 Estadísticas finales:")
        print(f"   Duración: {duration_real}")
        print(f"   Mensajes procesados: {self.stats['messages_processed']}")
        print(f"   Mensajes MQTT generados: {self.stats['messages_published']}")
        if duration > 0:
            print(f"   Promedio: {self.stats['messages_published']/duration:.1f} msg/s")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Gateway Directo")
    parser.add_argument("--topic", default="iescelia", help="Base MQTT topic")
    parser.add_argument("--duration", type=int, default=15, help="Duration in seconds")
    
    args = parser.parse_args()
    
    gateway = DirectGateway(args.topic)
    
    try:
        gateway.run_simulation(args.duration)
    except KeyboardInterrupt:
        print("\n⏹️  Gateway detenido por usuario")

if __name__ == "__main__":
    main()