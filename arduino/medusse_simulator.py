#!/usr/bin/env python3
"""
Simulador Medusse - Genera datos de sensores IoT para múltiples ubicaciones
Envía datos directamente a MQTT para el proyecto Medusse
"""

import json
import time
import random
import paho.mqtt.client as mqtt

def main():
    # Conectar a MQTT
    client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
    
    try:
        client.connect("localhost", 1883, 60)
        print("✅ Conectado a MQTT broker")
        print("🔄 Generando datos para 3 ubicaciones... (Ctrl+C para parar)")
        
        locations = [
            {"name": "aula20", "node": "ESP32_NODE_01", "temp_base": 22},
            {"name": "aula21", "node": "ESP32_NODE_02", "temp_base": 24}, 
            {"name": "laboratorio", "node": "ESP32_NODE_03", "temp_base": 21}
        ]
        
        i = 0
        while True:  # Generar datos continuamente
            for loc in locations:
                # Generar datos para cada ubicación
                temp_data = {
                    "value": round(loc["temp_base"] + random.uniform(-2, 4), 1),
                    "sensor": "dht22",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                humidity_data = {
                    "value": round(45 + random.uniform(-10, 15), 1),
                    "sensor": "dht22",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                co2_data = {
                    "value": random.randint(400, 600),
                    "sensor": "gas",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                pressure_data = {
                    "value": round(1013 + random.uniform(-5, 5), 1),
                    "sensor": "bme280",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # Enviar a MQTT
                topics_data = [
                    (f"iescelia/{loc['name']}/temperature", temp_data),
                    (f"iescelia/{loc['name']}/humidity", humidity_data),
                    (f"iescelia/{loc['name']}/co2", co2_data),
                    (f"iescelia/{loc['name']}/pressure", pressure_data)
                ]
                
                for topic, data in topics_data:
                    payload = json.dumps(data)
                    client.publish(topic, payload)
                    print(f"📤 {topic}: {payload}")
            
            i += 1
            print(f"\n--- Ciclo {i} completado ---\n")
            time.sleep(15)  # Esperar 15 segundos entre ciclos
            
    except KeyboardInterrupt:
        print("\n⏹️  Deteniendo simulador...")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.disconnect()
        print("👋 Desconectado")

if __name__ == "__main__":
    main()