#!/usr/bin/env python3
"""
Gateway Medusse - Versión offline para testing sin broker MQTT
Procesa datos y los muestra en consola con formato MQTT
"""

import json
import time
import subprocess
import sys
from datetime import datetime
from pathlib import Path

class OfflineGateway:
    def __init__(self, base_topic="iescelia"):
        self.base_topic = base_topic
        self.stats = {
            "messages_processed": 0,
            "messages_published": 0,
            "start_time": datetime.now()
        }
        
    def process_sensor_data(self, json_data):
        """Procesa datos JSON de sensores"""
        try:
            data = json.loads(json_data) if isinstance(json_data, str) else json_data
            
            node_id = data.get("node_id", "unknown")
            location = data.get("location", "unknown")
            timestamp = data.get("timestamp", int(time.time() * 1000))
            
            print(f"\n📊 Procesando datos de {node_id} @ {location}")
            
            # Procesar sensores
            sensors = data.get("sensors", {})
            
            # DHT22
            if "dht22" in sensors:
                dht_data = sensors["dht22"]
                if "temperature" in dht_data:
                    self._show_mqtt_message(
                        f"{self.base_topic}/{location}/temperature",
                        {"value": dht_data["temperature"], "sensor": "dht22", "node_id": node_id}
                    )
                if "humidity" in dht_data:
                    self._show_mqtt_message(
                        f"{self.base_topic}/{location}/humidity",
                        {"value": dht_data["humidity"], "sensor": "dht22", "node_id": node_id}
                    )
            
            # BME280
            if "bme280" in sensors:
                bme_data = sensors["bme280"]
                if "temperature" in bme_data:
                    self._show_mqtt_message(
                        f"{self.base_topic}/{location}/temperature",
                        {"value": bme_data["temperature"], "sensor": "bme280", "node_id": node_id}
                    )
                if "pressure" in bme_data:
                    self._show_mqtt_message(
                        f"{self.base_topic}/{location}/pressure",
                        {"value": bme_data["pressure"], "sensor": "bme280", "node_id": node_id}
                    )
            
            # Gas sensor
            if "gas" in sensors:
                gas_data = sensors["gas"]
                if "co2_ppm" in gas_data:
                    self._show_mqtt_message(
                        f"{self.base_topic}/{location}/co2",
                        {"value": gas_data["co2_ppm"], "sensor": "gas", "node_id": node_id}
                    )
            
            # System info
            if "system" in data:
                system_data = data["system"]
                self._show_mqtt_message(
                    f"{self.base_topic}/{location}/system",
                    {"free_heap": system_data.get("free_heap"), "uptime": system_data.get("uptime"), "node_id": node_id}
                )
            
            self.stats["messages_processed"] += 1
            return True
            
        except Exception as e:
            print(f"❌ Error procesando datos: {e}")
            return False
    
    def _show_mqtt_message(self, topic, payload):
        """Muestra mensaje como si fuera MQTT"""
        json_payload = json.dumps(payload, separators=(',', ':'))
        timestamp = datetime.now().strftime("%H:%M:%S")
        
        print(f"📤 [{timestamp}] {topic}")
        print(f"   {json_payload}")
        
        self.stats["messages_published"] += 1
    
    def process_simulator(self, simulator_script, duration=30):
        """Procesa datos del simulador por tiempo limitado"""
        print(f"🚀 Gateway Offline - Procesando simulador por {duration}s")
        print(f"   Simulador: {simulator_script}")
        print(f"   Topic base: {self.base_topic}")
        print()
        
        try:
            # Ejecutar simulador
            process = subprocess.Popen(
                [sys.executable, simulator_script, str(duration)],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1
            )
            
            start_time = time.time()
            
            # Procesar salida del simulador
            line_count = 0
            for line in iter(process.stdout.readline, ''):
                if time.time() - start_time > duration + 5:  # 5s de margen
                    break
                    
                line = line.strip()
                if not line:
                    continue
                
                line_count += 1
                print(f"[DEBUG {line_count}] {line[:100]}...")
                
                # Filtrar líneas JSON
                if line.startswith('{') and line.endswith('}'):
                    print(f"   ↳ Procesando JSON directo")
                    self.process_sensor_data(line)
                elif '[ESP32_NODE_' in line and '] {' in line:
                    # Extraer JSON de líneas con prefijo
                    try:
                        json_part = line.split('] ', 1)[1]
                        print(f"   ↳ Extrayendo JSON: {json_part[:50]}...")
                        if json_part.startswith('{') and json_part.endswith('}'):
                            self.process_sensor_data(json_part)
                        else:
                            print(f"   ↳ JSON inválido después de extraer")
                    except Exception as ex:
                        print(f"⚠️  Error extrayendo JSON: {ex}")
                        print(f"   Línea: {line[:100]}...")
                elif any(keyword in line for keyword in ["Starting", "completed", "nodes"]):
                    print(f"🤖 {line}")
            
            process.wait()
            
        except Exception as e:
            print(f"❌ Error ejecutando simulador: {e}")
        
        # Mostrar estadísticas
        duration_real = datetime.now() - self.stats["start_time"]
        print(f"\n📊 Estadísticas finales:")
        print(f"   Duración: {duration_real}")
        print(f"   Mensajes procesados: {self.stats['messages_processed']}")
        print(f"   Mensajes MQTT generados: {self.stats['messages_published']}")
        print(f"   Promedio: {self.stats['messages_published']/duration:.1f} msg/s")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Gateway Medusse Offline")
    parser.add_argument("--topic", default="iescelia", help="Base MQTT topic")
    parser.add_argument("--simulator", help="Path to simulator script")
    parser.add_argument("--duration", type=int, default=20, help="Duration in seconds")
    
    args = parser.parse_args()
    
    # Determinar simulador
    if args.simulator:
        simulator_path = args.simulator
    else:
        # Usar simulador por defecto
        arduino_dir = Path(__file__).parent.parent / "arduino"
        simulator_path = arduino_dir / "test_limited.py"
    
    if not Path(simulator_path).exists():
        print(f"❌ Simulador no encontrado: {simulator_path}")
        return False
    
    gateway = OfflineGateway(args.topic)
    
    try:
        gateway.process_simulator(str(simulator_path), args.duration)
    except KeyboardInterrupt:
        print("\n⏹️  Gateway detenido por usuario")
    
    return True

if __name__ == "__main__":
    main()