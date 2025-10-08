#!/usr/bin/env python3
"""
Script para inicializar el stack completo de Medusse
Crea directorios, inicia servicios y verifica el estado
"""

import os
import time
import subprocess
import sys
import requests
from pathlib import Path

class MedusseStack:
    def __init__(self):
        self.docker_dir = Path(__file__).parent
        self.services = {
            "mosquitto": {"port": 1883, "name": "MQTT Broker"},
            "influxdb": {"port": 8086, "name": "InfluxDB"},
            "grafana": {"port": 3000, "name": "Grafana"},
            "telegraf": {"port": None, "name": "Telegraf"}
        }
        
    def create_directories(self):
        """Crea los directorios necesarios para los volúmenes"""
        print("📁 Creando directorios necesarios...")
        
        directories = [
            "mosquitto/data",
            "mosquitto/log", 
            "influxdb/data",
            "influxdb/config",
            "grafana/data",
            "grafana/provisioning/datasources",
            "grafana/provisioning/dashboards",
            "grafana/dashboards"
        ]
        
        for directory in directories:
            dir_path = self.docker_dir / directory
            dir_path.mkdir(parents=True, exist_ok=True)
            print(f"   ✅ {directory}")
        
        print()
    
    def check_docker(self):
        """Verifica que Docker esté disponible"""
        try:
            result = subprocess.run(["docker", "--version"], 
                                  capture_output=True, text=True, check=True)
            print(f"✅ Docker disponible: {result.stdout.strip()}")
            
            result = subprocess.run(["docker-compose", "--version"], 
                                  capture_output=True, text=True, check=True)
            print(f"✅ Docker Compose disponible: {result.stdout.strip()}")
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ Docker o Docker Compose no están disponibles")
            print("   Instala Docker Desktop: https://www.docker.com/products/docker-desktop")
            return False
    
    def start_services(self):
        """Inicia los servicios con docker-compose"""
        print("🚀 Iniciando servicios Docker...")
        
        try:
            # Cambiar al directorio docker
            os.chdir(self.docker_dir)
            
            # Detener servicios existentes
            subprocess.run(["docker-compose", "down"], 
                          capture_output=True, check=False)
            
            # Iniciar servicios
            result = subprocess.run(["docker-compose", "up", "-d"], 
                                  capture_output=True, text=True, check=True)
            
            print("✅ Servicios iniciados exitosamente")
            print()
            return True
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Error iniciando servicios: {e}")
            print(f"   Salida: {e.stdout}")
            print(f"   Error: {e.stderr}")
            return False
    
    def wait_for_services(self, timeout=120):
        """Espera a que los servicios estén listos"""
        print("⏳ Esperando a que los servicios estén listos...")
        
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            all_ready = True
            
            for service, config in self.services.items():
                if config["port"] is None:
                    continue  # Skip services without HTTP endpoints
                    
                try:
                    response = requests.get(f"http://localhost:{config['port']}", 
                                          timeout=2)
                    status = "✅" if response.status_code < 500 else "⚠️"
                except requests.exceptions.RequestException:
                    status = "❌"
                    all_ready = False
                
                print(f"   {status} {config['name']} (:{config['port']})")
            
            if all_ready:
                print("\n🎉 Todos los servicios están listos!")
                return True
            
            print("   Reintentando en 5 segundos...")
            time.sleep(5)
            print()
        
        print(f"⚠️  Timeout después de {timeout} segundos")
        return False
    
    def show_access_info(self):
        """Muestra información de acceso a los servicios"""
        print("🌐 Información de Acceso:")
        print("=" * 50)
        print("📊 Grafana Dashboard:")
        print("   URL: http://localhost:3000")
        print("   Usuario: admin")
        print("   Contraseña: medusse2025")
        print()
        print("💾 InfluxDB:")
        print("   URL: http://localhost:8086")
        print("   Usuario: admin")
        print("   Contraseña: medusse2025")
        print("   Organización: iescelia")
        print("   Bucket: sensors")
        print()
        print("📡 MQTT Broker:")
        print("   Host: localhost")
        print("   Puerto: 1883")
        print("   WebSocket: 9001")
        print()
        print("🔧 Para conectar el Gateway:")
        print("   python ../gateway/medusse_gateway.py --broker localhost")
        print()
    
    def check_services_status(self):
        """Verifica el estado de los contenedores"""
        try:
            result = subprocess.run(["docker-compose", "ps"], 
                                  capture_output=True, text=True, check=True,
                                  cwd=self.docker_dir)
            print("📋 Estado de los servicios:")
            print(result.stdout)
        except subprocess.CalledProcessError as e:
            print(f"❌ Error verificando servicios: {e}")
    
    def run(self):
        """Ejecuta el proceso completo de inicialización"""
        print("🚀 Iniciando Stack Completo Medusse")
        print("=" * 50)
        print()
        
        # Verificar Docker
        if not self.check_docker():
            return False
        print()
        
        # Crear directorios
        self.create_directories()
        
        # Iniciar servicios
        if not self.start_services():
            return False
        
        # Esperar a que estén listos
        if not self.wait_for_services():
            print("⚠️  Algunos servicios pueden no estar completamente listos")
        
        # Mostrar estado
        self.check_services_status()
        print()
        
        # Mostrar información de acceso
        self.show_access_info()
        
        return True

def main():
    stack = MedusseStack()
    
    try:
        success = stack.run()
        if success:
            print("✅ Stack iniciado exitosamente!")
            print("   Usa Ctrl+C para detener cuando termines")
            print()
            
            # Mantener el script corriendo para mostrar logs
            try:
                while True:
                    time.sleep(10)
            except KeyboardInterrupt:
                print("\n⏹️  Deteniendo servicios...")
                subprocess.run(["docker-compose", "down"], 
                              cwd=Path(__file__).parent)
                print("👋 Stack detenido")
        else:
            print("❌ Error iniciando el stack")
            return 1
            
    except KeyboardInterrupt:
        print("\n⏹️  Proceso interrumpido por usuario")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())