#!/usr/bin/env python3
"""
Medusse Gateway - Procesa datos de nodos ESP32 y los publica en MQTT
Soporta múltiples fuentes: serial, simuladores, archivos
"""

import argparse
import json
import time
import sys
import threading
import subprocess
from datetime import datetime
from pathlib import Path

import paho.mqtt.client as mqtt

class MedusseGateway:
    def __init__(self, broker="localhost", port=1883, base_topic="iescelia"):
        self.broker = broker
        self.port = port
        self.base_topic = base_topic
        self.client = None
        self.running = False
        self.stats = {
            "messages_processed": 0,
            "messages_published": 0,
            "errors": 0,
            "start_time": None
        }
        
    def connect_mqtt(self):
        """Conecta al broker MQTT"""
        try:
            self.client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
            self.client.on_connect = self._on_connect
            self.client.on_disconnect = self._on_disconnect
            self.client.connect(self.broker, self.port, 60)
            self.client.loop_start()
            return True
        except Exception as e:
            print(f"❌ Error conectando a MQTT {self.broker}:{self.port} - {e}")
            return False
    
    def _on_connect(self, client, userdata, flags, rc, *args):
        if rc == 0:
            print(f"✅ Conectado a MQTT broker {self.broker}:{self.port}")
        else:
            print(f"❌ Error de conexión MQTT: {rc}")
    
    def _on_disconnect(self, client, userdata, rc, *args):
        print(f"⚠️  Desconectado del broker MQTT")
    
    def process_sensor_data(self, json_data):
        """Procesa datos JSON de sensores y genera topics MQTT"""
        try:
            data = json.loads(json_data) if isinstance(json_data, str) else json_data
            
            node_id = data.get("node_id", "unknown")
            location = data.get("location", "unknown")
            timestamp = data.get("timestamp", int(time.time() * 1000))
            
            # Publicar datos por sensor
            sensors = data.get("sensors", {})
            
            # DHT22 data
            if "dht22" in sensors:
                dht_data = sensors["dht22"]
                if "temperature" in dht_data:
                    self._publish_sensor_value(
                        location, "temperature", "dht22", 
                        dht_data["temperature"], node_id, timestamp
                    )
                if "humidity" in dht_data:
                    self._publish_sensor_value(
                        location, "humidity", "dht22",
                        dht_data["humidity"], node_id, timestamp
                    )
            
            # BME280 data
            if "bme280" in sensors:
                bme_data = sensors["bme280"]
                if "temperature" in bme_data:
                    self._publish_sensor_value(
                        location, "temperature", "bme280",
                        bme_data["temperature"], node_id, timestamp
                    )
                if "humidity" in bme_data:
                    self._publish_sensor_value(
                        location, "humidity", "bme280",
                        bme_data["humidity"], node_id, timestamp
                    )
                if "pressure" in bme_data:
                    self._publish_sensor_value(
                        location, "pressure", "bme280",
                        bme_data["pressure"], node_id, timestamp
                    )
            
            # Gas sensor data
            if "gas" in sensors:
                gas_data = sensors["gas"]
                if "co2_ppm" in gas_data:
                    self._publish_sensor_value(
                        location, "co2", "gas",
                        gas_data["co2_ppm"], node_id, timestamp
                    )
            
            # System info
            if "system" in data:
                system_data = data["system"]
                self._publish_system_info(location, system_data, node_id, timestamp)
            
            # Publicar datos completos también
            self._publish_complete_data(location, data, node_id)
            
            self.stats["messages_processed"] += 1
            return True
            
        except Exception as e:
            print(f"❌ Error procesando datos: {e}")
            print(f"   Datos: {json_data}")
            self.stats["errors"] += 1
            return False
    
    def _publish_sensor_value(self, location, sensor_type, sensor_name, value, node_id, timestamp):
        """Publica un valor individual de sensor"""
        topic = f"{self.base_topic}/{location}/{sensor_type}"
        
        payload = {
            "value": value,
            "sensor": sensor_name,
            "node_id": node_id,
            "timestamp": timestamp,
            "location": location
        }
        
        self._publish(topic, payload)
    
    def _publish_system_info(self, location, system_data, node_id, timestamp):
        """Publica información del sistema"""
        topic = f"{self.base_topic}/{location}/system"
        
        payload = {
            "free_heap": system_data.get("free_heap"),
            "uptime": system_data.get("uptime"),
            "node_id": node_id,
            "timestamp": timestamp,
            "location": location
        }
        
        self._publish(topic, payload)
    
    def _publish_complete_data(self, location, data, node_id):
        """Publica los datos completos del nodo"""
        topic = f"{self.base_topic}/{location}/raw"
        self._publish(topic, data)
    
    def _publish(self, topic, payload):
        """Publica un mensaje en MQTT"""
        try:
            json_payload = json.dumps(payload, separators=(',', ':'))
            result = self.client.publish(topic, json_payload)
            
            if result.rc == mqtt.MQTT_ERR_SUCCESS:
                self.stats["messages_published"] += 1
                print(f"📤 {topic}: {json_payload}")
            else:
                print(f"❌ Error publicando en {topic}: {result.rc}")
                self.stats["errors"] += 1
                
        except Exception as e:
            print(f"❌ Error en _publish: {e}")
            self.stats["errors"] += 1
    
    def process_serial_input(self, port, baud=115200):
        """Procesa entrada desde puerto serial"""
        try:
            import serial
            ser = serial.Serial(port, baud, timeout=1)
            print(f"📡 Leyendo desde puerto serial {port} @ {baud}")
            
            while self.running:
                try:
                    line = ser.readline().decode(errors="ignore").strip()
                    if line:
                        self.process_sensor_data(line)
                except Exception as e:
                    print(f"❌ Error leyendo serial: {e}")
                    time.sleep(1)
                    
        except ImportError:
            print("❌ pyserial no instalado. Instalar con: pip install pyserial")
        except Exception as e:
            print(f"❌ Error con puerto serial: {e}")
        finally:
            if 'ser' in locals():
                ser.close()
    
    def process_simulator_input(self, simulator_script):
        """Procesa entrada desde simulador Python"""
        try:
            print(f"🔄 Iniciando simulador: {simulator_script}")
            process = subprocess.Popen(
                [sys.executable, simulator_script],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                bufsize=1,
                universal_newlines=True
            )
            
            while self.running and process.poll() is None:
                try:
                    line = process.stdout.readline()
                    if line:
                        line = line.strip()
                        # Filtrar líneas que no son JSON (debug info)
                        if line.startswith('{') and line.endswith('}'):
                            self.process_sensor_data(line)
                        elif line.startswith('[ESP32_NODE_') and '] {' in line:
                            # Extraer JSON de líneas con prefijo de nodo
                            json_part = line.split('] ', 1)[1]
                            self.process_sensor_data(json_part)
                        elif '[ESP32_NODE_' in line and '] {' in line:
                            # Formato alternativo: [ESP32_NODE_01] {"data"...}
                            json_part = line.split('] ', 1)[1]
                            self.process_sensor_data(json_part)
                except Exception as e:
                    print(f"❌ Error procesando simulador: {e}")
                    time.sleep(0.1)
                    
        except Exception as e:
            print(f"❌ Error ejecutando simulador: {e}")
        finally:
            if 'process' in locals():
                process.terminate()
    
    def start(self, source_type="simulator", source_path=None):
        """Inicia el gateway"""
        print("🚀 Iniciando Medusse Gateway")
        print(f"   Broker MQTT: {self.broker}:{self.port}")
        print(f"   Topic base: {self.base_topic}")
        print(f"   Fuente: {source_type}")
        
        if not self.connect_mqtt():
            return False
        
        self.running = True
        self.stats["start_time"] = datetime.now()
        
        try:
            if source_type == "serial":
                if not source_path:
                    print("❌ Puerto serial requerido")
                    return False
                self.process_serial_input(source_path)
                
            elif source_type == "simulator":
                if not source_path:
                    # Usar simulador por defecto
                    arduino_dir = Path(__file__).parent.parent / "arduino"
                    source_path = arduino_dir / "test_multiple_nodes.py"
                
                if not Path(source_path).exists():
                    print(f"❌ Simulador no encontrado: {source_path}")
                    return False
                    
                self.process_simulator_input(str(source_path))
                
            else:
                print(f"❌ Tipo de fuente no soportado: {source_type}")
                return False
                
        except KeyboardInterrupt:
            print("\n⏹️  Deteniendo gateway...")
        finally:
            self.stop()
        
        return True
    
    def stop(self):
        """Detiene el gateway"""
        self.running = False
        if self.client:
            self.client.loop_stop()
            self.client.disconnect()
        
        # Mostrar estadísticas
        if self.stats["start_time"]:
            duration = datetime.now() - self.stats["start_time"]
            print(f"\n📊 Estadísticas del Gateway:")
            print(f"   Tiempo activo: {duration}")
            print(f"   Mensajes procesados: {self.stats['messages_processed']}")
            print(f"   Mensajes publicados: {self.stats['messages_published']}")
            print(f"   Errores: {self.stats['errors']}")

def main():
    parser = argparse.ArgumentParser(description="Medusse Gateway - ESP32 to MQTT")
    parser.add_argument("--broker", default="localhost", help="MQTT broker address")
    parser.add_argument("--port", type=int, default=1883, help="MQTT broker port")
    parser.add_argument("--topic", default="iescelia", help="Base MQTT topic")
    parser.add_argument("--source", choices=["serial", "simulator"], default="simulator", 
                       help="Data source type")
    parser.add_argument("--path", help="Serial port or simulator script path")
    parser.add_argument("--baud", type=int, default=115200, help="Serial baud rate")
    
    args = parser.parse_args()
    
    gateway = MedusseGateway(args.broker, args.port, args.topic)
    
    try:
        gateway.start(args.source, args.path)
    except KeyboardInterrupt:
        print("\n👋 Gateway terminado por usuario")

if __name__ == "__main__":
    main()