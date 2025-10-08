#!/usr/bin/env python3
"""
Script para abrir el dashboard limpio de Grafana
"""

import webbrowser
import time
import requests

def main():
    print("🌐 Abriendo Dashboard Limpio de Grafana")
    print("=" * 50)
    
    # Verificar que Grafana esté accesible
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Grafana está accesible")
        else:
            print(f"⚠️  Grafana responde con status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Error accediendo a Grafana: {e}")
        return False
    
    print()
    print("🎨 Dashboard Limpio:")
    print("   - Nombres simples: 'Aula 20', 'Aula 21', 'Laboratorio'")
    print("   - Sin metadatos técnicos")
    print("   - Colores diferenciados por ubicación")
    print("   - Queries simples sin pivot/rename")
    print()
    
    # URLs del dashboard
    dashboard_url = "http://localhost:3000/d/medusse-clean/medusse-iot-dashboard-limpio"
    
    print("📊 Información de acceso:")
    print("   URL: http://localhost:3000")
    print("   Usuario: admin")
    print("   Contraseña: medusse2025")
    print()
    print("📈 Dashboard limpio:")
    print(f"   {dashboard_url}")
    print()
    
    # Abrir navegador
    try:
        webbrowser.open(dashboard_url)
        print("🚀 Abriendo dashboard limpio...")
        print()
        print("🎯 Características del dashboard limpio:")
        print("   ✅ Queries simples sin transformaciones complejas")
        print("   ✅ Nombres usando 'displayName' override")
        print("   ✅ Regex matching para identificar ubicaciones")
        print("   ✅ Colores consistentes:")
        print("      🔴 Aula 20 - Rojo")
        print("      🔵 Aula 21 - Azul") 
        print("      🟢 Laboratorio - Verde")
        print()
        print("🔄 Para generar más datos:")
        print("   cd ../gateway")
        print("   python medusse_gateway.py --broker localhost --source simulator")
        
        return True
        
    except Exception as e:
        print(f"❌ Error abriendo navegador: {e}")
        print(f"   Abre manualmente: {dashboard_url}")
        return False

if __name__ == "__main__":
    main()