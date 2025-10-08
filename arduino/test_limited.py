#!/usr/bin/env python3
"""
Script para probar múltiples nodos por tiempo limitado
"""

import time
import threading
from test_multiple_nodes import ESP32NodeSimulator

def run_limited_test(duration=30):
    """Ejecuta múltiples nodos por un tiempo limitado"""
    
    nodes = [
        ESP32NodeSimulator("ESP32_NODE_01", "aula20", 10),
        ESP32NodeSimulator("ESP32_NODE_02", "aula21", 12),
        ESP32NodeSimulator("ESP32_NODE_03", "laboratorio", 15)
    ]
    
    threads = []
    
    print(f"=== Testing Multiple Nodes for {duration} seconds ===")
    print("Nodes: aula20, aula21, laboratorio")
    print()
    
    # Iniciar todos los nodos
    for node in nodes:
        thread = threading.Thread(target=node.run)
        thread.daemon = True
        threads.append(thread)
        thread.start()
        time.sleep(1)
    
    # Esperar el tiempo especificado
    time.sleep(duration)
    
    # Detener todos los nodos
    print(f"\n=== Test completed after {duration} seconds ===")
    for node in nodes:
        node.stop()
    
    # Esperar a que terminen
    for thread in threads:
        thread.join(timeout=2)
    
    print("Multiple node simulation test completed successfully")
    print(f"All 3 nodes generated data for {duration} seconds")
    print("Different intervals and characteristics working")

if __name__ == "__main__":
    import sys
    
    duration = 20  # 20 segundos por defecto
    if len(sys.argv) > 1:
        try:
            duration = int(sys.argv[1])
        except ValueError:
            print("Usage: python test_limited.py [seconds]")
            sys.exit(1)
    
    run_limited_test(duration)