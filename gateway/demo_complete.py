#!/usr/bin/env python3
"""
Demo completo del Gateway Medusse
Ejecuta simuladores + gateway + monitor en paralelo
"""

import time
import threading
import subprocess
import sys
import signal
from pathlib import Path

class MedusseDemo:
    def __init__(self):
        self.processes = []
        self.running = True
        
    def run_simulator(self):
        """Ejecuta los simuladores ESP32"""
        try:
            arduino_dir = Path(__file__).parent.parent / "arduino"
            simulator_path = arduino_dir / "test_limited.py"
            
            print("🔄 [SIMULATOR] Iniciando simuladores ESP32...")
            
            # Ejecutar simulador por 60 segundos
            process = subprocess.Popen(
                [sys.executable, str(simulator_path), "60"],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1
            )
            self.processes.append(process)
            
            # Leer salida del simulador
            for line in iter(process.stdout.readline, ''):
                if not self.running:
                    break
                if line.strip():
                    # Filtrar solo líneas importantes
                    if any(keyword in line for keyword in ["Starting", "completed", "nodes"]):
                        print(f"🤖 [SIMULATOR] {line.strip()}")
                        
        except Exception as e:
            print(f"❌ [SIMULATOR] Error: {e}")
    
    def run_gateway(self):
        """Ejecuta el gateway principal"""
        try:
            print("🚀 [GATEWAY] Iniciando gateway...")
            time.sleep(2)  # Esperar a que el simulador esté listo
            
            # Usar el simulador de múltiples nodos
            arduino_dir = Path(__file__).parent.parent / "arduino"
            simulator_path = arduino_dir / "test_multiple_nodes.py"
            
            process = subprocess.Popen(
                [sys.executable, "medusse_gateway.py", 
                 "--source", "simulator", 
                 "--path", str(simulator_path)],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1
            )
            self.processes.append(process)
            
            # Leer salida del gateway
            for line in iter(process.stdout.readline, ''):
                if not self.running:
                    break
                if line.strip():
                    # Mostrar líneas importantes del gateway
                    if any(keyword in line for keyword in ["📤", "✅", "❌", "📊", "🚀"]):
                        print(f"🌉 [GATEWAY] {line.strip()}")
                        
        except Exception as e:
            print(f"❌ [GATEWAY] Error: {e}")
    
    def run_mqtt_monitor(self):
        """Ejecuta el monitor MQTT"""
        try:
            print("🔍 [MQTT] Iniciando monitor...")
            
            process = subprocess.Popen(
                [sys.executable, "mqtt_test_broker.py"],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1
            )
            self.processes.append(process)
            
            # Leer salida del monitor
            for line in iter(process.stdout.readline, ''):
                if not self.running:
                    break
                if line.strip():
                    # Mostrar solo mensajes importantes
                    if any(keyword in line for keyword in ["📨", "✅", "❌", "📊"]):
                        print(f"📡 [MQTT] {line.strip()}")
                        
        except Exception as e:
            print(f"❌ [MQTT] Error: {e}")
    
    def start_demo(self, duration=30):
        """Inicia la demo completa"""
        print("🎬 Demo Completo Gateway Medusse")
        print("=" * 50)
        print(f"Duración: {duration} segundos")
        print()
        print("Componentes:")
        print("  🤖 Simuladores ESP32 (múltiples nodos)")
        print("  🌉 Gateway (procesa y publica)")
        print("  📡 Monitor MQTT (muestra mensajes)")
        print()
        print("Presiona Ctrl+C para detener")
        print()
        
        try:
            # Iniciar componentes en hilos separados
            threads = []
            
            # Monitor MQTT primero
            mqtt_thread = threading.Thread(target=self.run_mqtt_monitor)
            mqtt_thread.daemon = True
            threads.append(mqtt_thread)
            mqtt_thread.start()
            
            time.sleep(2)
            
            # Gateway segundo
            gateway_thread = threading.Thread(target=self.run_gateway)
            gateway_thread.daemon = True
            threads.append(gateway_thread)
            gateway_thread.start()
            
            time.sleep(2)
            
            # Simulador último (para que tenga tiempo de conectarse)
            # simulator_thread = threading.Thread(target=self.run_simulator)
            # simulator_thread.daemon = True
            # threads.append(simulator_thread)
            # simulator_thread.start()
            
            print("✅ Todos los componentes iniciados")
            print("   Observa los mensajes de cada componente")
            print()
            
            # Esperar la duración especificada
            start_time = time.time()
            while time.time() - start_time < duration and self.running:
                time.sleep(1)
            
            if self.running:
                print(f"\n⏰ Demo completada después de {duration} segundos")
            
        except KeyboardInterrupt:
            print("\n⏹️  Demo interrumpida por usuario")
        finally:
            self.stop_demo()
    
    def stop_demo(self):
        """Detiene todos los procesos"""
        print("🛑 Deteniendo todos los componentes...")
        self.running = False
        
        for process in self.processes:
            try:
                process.terminate()
                process.wait(timeout=5)
            except:
                try:
                    process.kill()
                except:
                    pass
        
        print("✅ Demo terminada")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Demo completo Gateway Medusse")
    parser.add_argument("--duration", type=int, default=30, 
                       help="Duración de la demo en segundos")
    
    args = parser.parse_args()
    
    # Cambiar al directorio gateway
    gateway_dir = Path(__file__).parent
    import os
    os.chdir(gateway_dir)
    
    demo = MedusseDemo()
    
    # Manejar Ctrl+C
    def signal_handler(sig, frame):
        demo.stop_demo()
        sys.exit(0)
    
    signal.signal(signal.SIGINT, signal_handler)
    
    demo.start_demo(args.duration)

if __name__ == "__main__":
    main()