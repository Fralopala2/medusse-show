#!/usr/bin/env python3
"""
Simulador de salida serial del ESP32 para testing sin hardware
Genera datos JSON similares a los que produciría el firmware real
"""

import json
import time
import random
from datetime import datetime

def generate_sensor_data(node_id="ESP32_NODE_01", location="aula20"):
    """Genera datos de sensores simulados"""
    
    # Simular lecturas de sensores con variación realista
    base_temp = 22.0 + random.uniform(-3, 5)
    base_humidity = 45.0 + random.uniform(-10, 15)
    base_pressure = 1013.2 + random.uniform(-5, 5)
    base_co2 = 450 + random.randint(-50, 200)
    
    # Crear estructura de datos
    data = {
        "node_id": node_id,
        "location": location,
        "timestamp": int(time.time() * 1000),  # millis() equivalent
        "sensors": {
            "dht22": {
                "temperature": round(base_temp + random.uniform(-0.5, 0.5), 1),
                "humidity": round(base_humidity + random.uniform(-2, 2), 1)
            },
            "bme280": {
                "temperature": round(base_temp + random.uniform(-0.3, 0.3), 1),
                "humidity": round(base_humidity + random.uniform(-1, 1), 1),
                "pressure": round(base_pressure, 1)
            },
            "gas": {
                "co2_ppm": base_co2 + random.randint(-20, 30)
            }
        },
        "system": {
            "free_heap": random.randint(200000, 250000),
            "uptime": int(time.time() * 1000) % 1000000
        }
    }
    
    return data

def print_human_readable(data):
    """Imprime datos en formato legible como lo haría el ESP32"""
    sensors = data["sensors"]
    system = data["system"]
    
    print("--- Sensor Reading ---")
    print(f"DHT22 - Temp: {sensors['dht22']['temperature']}°C, Humidity: {sensors['dht22']['humidity']}%")
    print(f"BME280 - Temp: {sensors['bme280']['temperature']}°C, Humidity: {sensors['bme280']['humidity']}%, Pressure: {sensors['bme280']['pressure']} hPa")
    print(f"Gas Sensor - CO2: {sensors['gas']['co2_ppm']} ppm")
    print(f"Free Heap: {system['free_heap']} bytes")
    print("---------------------")

def simulate_node(node_id, location, interval=10):
    """Simula un nodo ESP32 específico"""
    print(f"=== Medusse ESP32 Node Starting ===")
    print(f"Node ID: {node_id}")
    print(f"Location: {location}")
    print("DHT22 initialized")
    print("BME280 initialized")
    print("Gas sensor initialized")
    print("=== All sensors ready ===")
    print()
    
    try:
        while True:
            # Generar y enviar datos
            data = generate_sensor_data(node_id, location)
            
            # JSON para el gateway
            print(json.dumps(data, separators=(',', ':')))
            
            # Formato legible para debugging
            print_human_readable(data)
            print()
            
            time.sleep(interval)
            
    except KeyboardInterrupt:
        print(f"\n{node_id} simulation stopped")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "node2":
            simulate_node("ESP32_NODE_02", "aula21", 12)
        else:
            simulate_node("ESP32_NODE_01", "aula20", 10)
    else:
        simulate_node("ESP32_NODE_01", "aula20", 10)