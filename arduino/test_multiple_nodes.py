#!/usr/bin/env python3
"""
Script para probar múltiples nodos ESP32 simultáneamente
Simula la salida de varios nodos enviando datos a diferentes puertos/archivos
"""

import json
import time
import random
import threading
from datetime import datetime

class ESP32NodeSimulator:
    def __init__(self, node_id, location, interval=10):
        self.node_id = node_id
        self.location = location
        self.interval = interval
        self.running = False
        
    def generate_sensor_data(self):
        """Genera datos de sensores simulados"""
        # Cada nodo tiene características ligeramente diferentes
        if "NODE_01" in self.node_id:
            base_temp = 22.0 + random.uniform(-2, 4)
            base_co2 = 450
        elif "NODE_02" in self.node_id:
            base_temp = 24.0 + random.uniform(-3, 3)  # Aula más caliente
            base_co2 = 520  # Más CO2
        else:
            base_temp = 21.0 + random.uniform(-2, 5)
            base_co2 = 400
            
        base_humidity = 45.0 + random.uniform(-10, 15)
        base_pressure = 1013.2 + random.uniform(-5, 5)
        
        data = {
            "node_id": self.node_id,
            "location": self.location,
            "timestamp": int(time.time() * 1000),
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
                    "co2_ppm": base_co2 + random.randint(-50, 100)
                }
            },
            "system": {
                "free_heap": random.randint(200000, 250000),
                "uptime": int(time.time() * 1000) % 1000000
            }
        }
        
        return data
    
    def run(self):
        """Ejecuta la simulación del nodo"""
        print(f"[{self.node_id}] Starting simulation - Location: {self.location}")
        self.running = True
        
        try:
            while self.running:
                data = self.generate_sensor_data()
                
                # Prefijo para identificar el nodo
                json_output = json.dumps(data, separators=(',', ':'))
                print(f"[{self.node_id}] {json_output}")
                
                # Información legible ocasionalmente
                if random.random() < 0.3:  # 30% de las veces
                    sensors = data["sensors"]
                    print(f"[{self.node_id}] Temp: {sensors['dht22']['temperature']}°C, "
                          f"CO2: {sensors['gas']['co2_ppm']}ppm, "
                          f"Heap: {data['system']['free_heap']}")
                
                time.sleep(self.interval)
                
        except Exception as e:
            print(f"[{self.node_id}] Error: {e}")
        finally:
            print(f"[{self.node_id}] Simulation stopped")
    
    def stop(self):
        """Detiene la simulación"""
        self.running = False

def run_multiple_nodes():
    """Ejecuta múltiples nodos en paralelo"""
    
    # Configurar nodos
    nodes = [
        ESP32NodeSimulator("ESP32_NODE_01", "aula20", 10),
        ESP32NodeSimulator("ESP32_NODE_02", "aula21", 12),
        ESP32NodeSimulator("ESP32_NODE_03", "laboratorio", 15)
    ]
    
    # Crear threads para cada nodo
    threads = []
    
    print("=== Starting Multiple ESP32 Node Simulation ===")
    print("Press Ctrl+C to stop all nodes")
    print()
    
    try:
        # Iniciar todos los nodos
        for node in nodes:
            thread = threading.Thread(target=node.run)
            thread.daemon = True
            threads.append(thread)
            thread.start()
            time.sleep(1)  # Pequeño delay entre inicios
        
        # Mantener el programa corriendo
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\n=== Stopping all nodes ===")
        for node in nodes:
            node.stop()
        
        # Esperar a que terminen los threads
        for thread in threads:
            thread.join(timeout=2)
        
        print("All nodes stopped")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "single":
        # Modo single node para testing
        node = ESP32NodeSimulator("ESP32_NODE_01", "aula20", 5)
        node.run()
    else:
        # Modo múltiples nodos
        run_multiple_nodes()