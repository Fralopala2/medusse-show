#!/usr/bin/env python3
"""
Test simple del gateway sin broker MQTT real
Procesa datos de simuladores y muestra la salida
"""

import sys
import json
from pathlib import Path

# Agregar el directorio padre para importar
sys.path.append(str(Path(__file__).parent))

from medusse_gateway import MedusseGateway

class MockMQTTClient:
    """Cliente MQTT simulado para testing"""
    def __init__(self):
        self.published_messages = []
        
    def connect(self, host, port, keepalive=60):
        print(f"🔄 [MOCK] Conectando a {host}:{port}")
        return 0
        
    def loop_start(self):
        print("✅ [MOCK] MQTT loop iniciado")
        
    def loop_stop(self):
        print("⏹️  [MOCK] MQTT loop detenido")
        
    def disconnect(self):
        print("👋 [MOCK] Desconectado de MQTT")
        
    def publish(self, topic, payload, qos=0, retain=False):
        """Simula publicación MQTT"""
        message = {
            "topic": topic,
            "payload": payload,
            "qos": qos,
            "retain": retain
        }
        self.published_messages.append(message)
        
        # Mostrar mensaje publicado
        print(f"📤 [MOCK] {topic}")
        
        # Intentar parsear JSON para mostrar de forma legible
        try:
            data = json.loads(payload)
            if "value" in data and "sensor" in data:
                print(f"     {data['sensor']}: {data['value']} ({data.get('location', 'unknown')})")
            elif "free_heap" in data:
                print(f"     System: heap={data['free_heap']}, uptime={data.get('uptime', 0)}")
            else:
                print(f"     Data: {str(data)[:80]}...")
        except:
            print(f"     Raw: {payload[:80]}...")
        
        # Simular resultado exitoso
        class MockResult:
            rc = 0  # MQTT_ERR_SUCCESS
        
        return MockResult()

def test_data_processing():
    """Prueba el procesamiento de datos sin MQTT real"""
    print("🧪 Test Simple - Procesamiento de Datos")
    print("=" * 50)
    
    # Crear gateway con cliente mock
    gateway = MedusseGateway()
    gateway.client = MockMQTTClient()
    
    # Datos de prueba (como los que generan los simuladores)
    test_data = {
        "node_id": "ESP32_NODE_01",
        "location": "aula20",
        "timestamp": 1759913780291,
        "sensors": {
            "dht22": {
                "temperature": 24.1,
                "humidity": 45.1
            },
            "bme280": {
                "temperature": 24.2,
                "humidity": 44.1,
                "pressure": 1014.7
            },
            "gas": {
                "co2_ppm": 458
            }
        },
        "system": {
            "free_heap": 234919,
            "uptime": 780291
        }
    }
    
    print("📊 Procesando datos de prueba...")
    print(f"   Node: {test_data['node_id']}")
    print(f"   Location: {test_data['location']}")
    print()
    
    # Procesar datos
    success = gateway.process_sensor_data(test_data)
    
    print()
    print(f"✅ Procesamiento {'exitoso' if success else 'falló'}")
    print(f"📈 Mensajes MQTT generados: {len(gateway.client.published_messages)}")
    
    # Mostrar resumen de topics generados
    topics = set(msg["topic"] for msg in gateway.client.published_messages)
    print(f"🏷️  Topics generados: {len(topics)}")
    for topic in sorted(topics):
        print(f"     {topic}")
    
    return success

def test_json_parsing():
    """Prueba el parsing de JSON como viene de los simuladores"""
    print("\n🧪 Test Parsing JSON")
    print("=" * 30)
    
    gateway = MedusseGateway()
    gateway.client = MockMQTTClient()
    
    # JSON como viene del simulador
    json_string = '{"node_id":"ESP32_NODE_02","location":"aula21","timestamp":1759913866284,"sensors":{"dht22":{"temperature":25.3,"humidity":39.5},"bme280":{"temperature":25.0,"humidity":38.3,"pressure":1011.8},"gas":{"co2_ppm":471}},"system":{"free_heap":218064,"uptime":866284}}'
    
    print("📝 JSON de entrada:")
    print(f"   {json_string[:100]}...")
    print()
    
    success = gateway.process_sensor_data(json_string)
    
    print(f"✅ Parsing {'exitoso' if success else 'falló'}")
    print(f"📈 Mensajes generados: {len(gateway.client.published_messages)}")
    
    return success

def main():
    print("🚀 Iniciando tests del Gateway Medusse")
    print()
    
    # Test 1: Procesamiento de datos
    test1_ok = test_data_processing()
    
    # Test 2: Parsing JSON
    test2_ok = test_json_parsing()
    
    # Resumen
    print("\n" + "=" * 50)
    print("📊 Resumen de Tests")
    print(f"   Procesamiento de datos: {'✅' if test1_ok else '❌'}")
    print(f"   Parsing JSON: {'✅' if test2_ok else '❌'}")
    
    if test1_ok and test2_ok:
        print("\n🎉 Todos los tests pasaron!")
        print("   El gateway está listo para usar con MQTT real")
    else:
        print("\n❌ Algunos tests fallaron")
        
    return test1_ok and test2_ok

if __name__ == "__main__":
    main()