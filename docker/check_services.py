#!/usr/bin/env python3
"""
Script para verificar que todos los servicios estén accesibles
"""

import requests
import time

def check_service(name, url, expected_status=200):
    """Verifica que un servicio esté accesible"""
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == expected_status or response.status_code < 500:
            print(f"✅ {name}: {url} - Status {response.status_code}")
            return True
        else:
            print(f"⚠️  {name}: {url} - Status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ {name}: {url} - Error: {e}")
        return False

def main():
    print("🔍 Verificando servicios del Stack Medusse")
    print("=" * 50)
    
    services = [
        ("Grafana", "http://localhost:3000"),
        ("InfluxDB", "http://localhost:8086"),
        ("Mosquitto WebSocket", "http://localhost:9001")  # This might fail, it's OK
    ]
    
    all_ok = True
    for name, url in services:
        if not check_service(name, url):
            all_ok = False
        time.sleep(1)
    
    print()
    if all_ok:
        print("🎉 Todos los servicios están accesibles!")
    else:
        print("⚠️  Algunos servicios pueden no estar completamente listos")
    
    print()
    print("🌐 URLs de acceso:")
    print("   Grafana: http://localhost:3000 (admin/medusse2025)")
    print("   InfluxDB: http://localhost:8086 (admin/medusse2025)")
    print("   MQTT: localhost:1883")
    
    return all_ok

if __name__ == "__main__":
    main()