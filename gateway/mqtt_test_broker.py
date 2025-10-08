#!/usr/bin/env python3
"""
Broker MQTT simple para testing local
Usa la librería paho-mqtt para crear un broker básico
"""

import time
import threading
from datetime import datetime

try:
    import paho.mqtt.client as mqtt
except ImportError:
    print("❌ paho-mqtt no instalado. Instalar con: pip install paho-mqtt")
    exit(1)

class SimpleMQTTBroker:
    def __init__(self, host="localhost", port=1883):
        self.host = host
        self.port = port
        self.clients = {}
        self.messages = []
        self.running = False
        
    def start(self):
        """Inicia el broker de testing"""
        print(f"🔄 Iniciando broker MQTT de testing en {self.host}:{self.port}")
        print("   Nota: Este es un broker simple para desarrollo")
        print("   Para producción usar Mosquitto o similar")
        print()
        
        # Crear cliente que actúe como monitor
        self.monitor_client = mqtt.Client("test_monitor")
        self.monitor_client.on_connect = self._on_monitor_connect
        self.monitor_client.on_message = self._on_monitor_message
        
        try:
            # En un entorno real, aquí iniciaríamos un broker real
            # Para testing, solo monitoreamos mensajes
            print("⚠️  Para testing completo, inicia Mosquitto manualmente:")
            print("   docker run -it -p 1883:1883 eclipse-mosquitto:2.0")
            print("   O instala Mosquitto localmente")
            print()
            print("🔍 Modo monitor - escuchando mensajes en todos los topics...")
            
            self.monitor_client.connect(self.host, self.port, 60)
            self.monitor_client.subscribe("#")  # Suscribirse a todos los topics
            self.monitor_client.loop_start()
            
            self.running = True
            self._show_stats()
            
        except Exception as e:
            print(f"❌ Error conectando al broker: {e}")
            print("   Asegúrate de que hay un broker MQTT corriendo")
            return False
        
        return True
    
    def _on_monitor_connect(self, client, userdata, flags, rc):
        if rc == 0:
            print("✅ Monitor conectado al broker MQTT")
        else:
            print(f"❌ Error conectando monitor: {rc}")
    
    def _on_monitor_message(self, client, userdata, msg):
        """Procesa mensajes recibidos"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        topic = msg.topic
        payload = msg.payload.decode()
        
        # Guardar mensaje
        message_info = {
            "timestamp": timestamp,
            "topic": topic,
            "payload": payload,
            "size": len(payload)
        }
        self.messages.append(message_info)
        
        # Mostrar mensaje
        print(f"📨 [{timestamp}] {topic}")
        
        # Intentar parsear JSON para mostrar de forma legible
        try:
            import json
            data = json.loads(payload)
            if "value" in data and "sensor" in data:
                # Mensaje de sensor individual
                print(f"   {data['sensor']}: {data['value']} ({data.get('location', 'unknown')})")
            elif "sensors" in data:
                # Mensaje completo de nodo
                node_id = data.get("node_id", "unknown")
                location = data.get("location", "unknown")
                print(f"   Node: {node_id} @ {location}")
            else:
                print(f"   Data: {payload[:100]}...")
        except:
            print(f"   Raw: {payload[:100]}...")
        
        print()
    
    def _show_stats(self):
        """Muestra estadísticas periódicamente"""
        def stats_loop():
            while self.running:
                time.sleep(30)  # Cada 30 segundos
                if self.messages:
                    print(f"📊 Mensajes recibidos: {len(self.messages)}")
                    
                    # Contar por topic
                    topics = {}
                    for msg in self.messages[-50:]:  # Últimos 50
                        topic = msg["topic"]
                        topics[topic] = topics.get(topic, 0) + 1
                    
                    print("   Topics más activos:")
                    for topic, count in sorted(topics.items(), key=lambda x: x[1], reverse=True)[:5]:
                        print(f"     {topic}: {count} mensajes")
                    print()
        
        stats_thread = threading.Thread(target=stats_loop)
        stats_thread.daemon = True
        stats_thread.start()
    
    def stop(self):
        """Detiene el broker"""
        self.running = False
        if hasattr(self, 'monitor_client'):
            self.monitor_client.loop_stop()
            self.monitor_client.disconnect()
        
        print(f"\n📊 Resumen final:")
        print(f"   Total mensajes: {len(self.messages)}")
        if self.messages:
            print(f"   Primer mensaje: {self.messages[0]['timestamp']}")
            print(f"   Último mensaje: {self.messages[-1]['timestamp']}")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Broker MQTT simple para testing")
    parser.add_argument("--host", default="localhost", help="Host del broker")
    parser.add_argument("--port", type=int, default=1883, help="Puerto del broker")
    
    args = parser.parse_args()
    
    broker = SimpleMQTTBroker(args.host, args.port)
    
    try:
        if broker.start():
            print("Presiona Ctrl+C para detener el monitor")
            while broker.running:
                time.sleep(1)
    except KeyboardInterrupt:
        print("\n⏹️  Deteniendo monitor...")
    finally:
        broker.stop()

if __name__ == "__main__":
    main()