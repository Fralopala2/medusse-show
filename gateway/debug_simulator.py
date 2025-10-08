#!/usr/bin/env python3
"""
Debug del simulador para ver qué datos está generando
"""

import subprocess
import sys
from pathlib import Path

def debug_simulator():
    arduino_dir = Path(__file__).parent.parent / "arduino"
    simulator_path = arduino_dir / "test_limited.py"
    
    print(f"🔍 Debuggeando simulador: {simulator_path}")
    print("=" * 50)
    
    if not simulator_path.exists():
        print(f"❌ Simulador no encontrado: {simulator_path}")
        return
    
    try:
        # Ejecutar simulador por 10 segundos
        process = subprocess.Popen(
            [sys.executable, str(simulator_path), "10"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        
        line_count = 0
        json_count = 0
        
        print("📝 Salida del simulador:")
        print()
        
        # Leer todas las líneas
        for line in iter(process.stdout.readline, ''):
            line = line.strip()
            if not line:
                continue
                
            line_count += 1
            print(f"[{line_count:2d}] {line}")
            
            # Detectar JSON
            if line.startswith('{') and line.endswith('}'):
                json_count += 1
                print(f"     ↳ JSON detectado #{json_count}")
            elif '[ESP32_NODE_' in line and '] {' in line:
                json_count += 1
                json_part = line.split('] ', 1)[1] if '] ' in line else line
                print(f"     ↳ JSON con prefijo #{json_count}: {json_part[:50]}...")
        
        process.wait()
        
        print()
        print(f"📊 Resumen:")
        print(f"   Total líneas: {line_count}")
        print(f"   JSONs detectados: {json_count}")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    debug_simulator()