#!/usr/bin/env python3
"""
Script para probar el gateway Medusse completo
Simula el flujo: Nodos ESP32 → Gateway → MQTT
"""

import time
import threading
import subprocess
import sys
from pathlib import Path

def run_mqtt_monitor():
    """Ejecuta el monitor MQTT en un hilo separado"""
    try:
        print("🔍 Iniciando monitor MQTT...")
        process = subprocess.Popen(
            [sys.executable, "mqtt_test_broker.py"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        
        # Leer salida del monitor
        for line in iter(process.stdout.readline, ''):
            if line.strip():
                print(f"[MQTT] {line.strip()}")
                
    except Exception as e:
        print(f"❌ Error en monitor MQTT: {e}")

def run_gateway():
    """Ejecuta el gateway principal"""
    try:
        print("🚀 Iniciando gateway...")
        time.sleep(2)  # Esperar a que el monitor esté listo
        
        process = subprocess.Popen(
            [sys.executable, "medusse_gateway.py", "--source", "simulator"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        
        # Leer salida del gateway
        for line in iter(process.stdout.readline, ''):
            if line.strip():
                print(f"[GATEWAY] {line.strip()}")
                
    except Exception as e:
        print(f"❌ Error en gateway: {e}")

def main():
    print("🧪 Test completo del Gateway Medusse")
    print("=" * 50)
    print()
    print("Este test ejecutará:")
    print("1. Monitor MQTT (escucha mensajes)")
    print("2. Gateway (procesa datos de simuladores)")
    print("3. Simuladores ESP32 (generan datos)")
    print()
    print("Presiona Ctrl+C para detener todo")
    print()
    
    # Verificar que los archivos existen
    required_files = [
        "mqtt_test_broker.py",
        "medusse_gateway.py",
        "../arduino/test_multiple_nodes.py"
    ]
    
    for file in required_files:
        if not Path(file).exists():
            print(f"❌ Archivo requerido no encontrado: {file}")
            return False
    
    try:
        # Iniciar monitor MQTT en hilo separado
        mqtt_thread = threading.Thread(target=run_mqtt_monitor)
        mqtt_thread.daemon = True
        mqtt_thread.start()
        
        # Esperar un poco para que el monitor se inicie
        time.sleep(3)
        
        # Iniciar gateway
        gateway_thread = threading.Thread(target=run_gateway)
        gateway_thread.daemon = True
        gateway_thread.start()
        
        # Mantener el programa corriendo
        print("✅ Todos los componentes iniciados")
        print("   Observa los mensajes [MQTT] y [GATEWAY]")
        print()
        
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\n⏹️  Deteniendo test completo...")
        print("   Los procesos se cerrarán automáticamente")
        
    return True

if __name__ == "__main__":
    # Cambiar al directorio gateway
    gateway_dir = Path(__file__).parent
    import os
    os.chdir(gateway_dir)
    
    main()