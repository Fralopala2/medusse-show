#!/usr/bin/env python3
"""
Script para verificar que los datos estén llegando a InfluxDB
"""

import requests
import json

def query_influxdb(query):
    """Ejecuta una query Flux en InfluxDB"""
    url = "http://localhost:8086/api/v2/query"
    headers = {
        "Authorization": "Token medusse-admin-token-2025",
        "Content-Type": "application/vnd.flux",
        "Accept": "application/csv"
    }
    
    params = {
        "org": "iescelia"
    }
    
    try:
        response = requests.post(url, headers=headers, params=params, data=query, timeout=10)
        if response.status_code == 200:
            return response.text
        else:
            print(f"❌ Error en query: {response.status_code}")
            print(f"   Response: {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Error conectando a InfluxDB: {e}")
        return None

def main():
    print("🔍 Verificando datos en InfluxDB")
    print("=" * 40)
    
    # Query para obtener los últimos datos
    query = '''
    from(bucket: "sensors")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "temperature" or r["_measurement"] == "co2")
      |> filter(fn: (r) => r["_field"] == "value")
      |> last()
      |> yield(name: "last")
    '''
    
    print("📊 Consultando últimos datos de temperatura y CO2...")
    result = query_influxdb(query)
    
    if result:
        lines = result.strip().split('\n')
        if len(lines) > 1:  # Skip header
            print("✅ Datos encontrados en InfluxDB:")
            print()
            
            # Parse CSV response
            header = lines[0].split(',')
            for line in lines[1:]:
                if line.strip():
                    values = line.split(',')
                    if len(values) >= len(header):
                        data = dict(zip(header, values))
                        measurement = data.get('_measurement', 'unknown')
                        location = data.get('location', 'unknown')
                        value = data.get('_value', 'unknown')
                        time = data.get('_time', 'unknown')
                        
                        print(f"   📈 {measurement} en {location}: {value} (tiempo: {time[:19]})")
        else:
            print("⚠️  No se encontraron datos recientes")
            print("   Ejecuta el gateway para generar datos:")
            print("   cd ../gateway && python medusse_gateway.py --broker localhost --source simulator")
    else:
        print("❌ No se pudieron obtener datos de InfluxDB")
    
    print()
    
    # Query para contar total de registros
    count_query = '''
    from(bucket: "sensors")
      |> range(start: -1h)
      |> count()
      |> yield(name: "count")
    '''
    
    print("📊 Contando total de registros en la última hora...")
    result = query_influxdb(count_query)
    
    if result:
        lines = result.strip().split('\n')
        total_records = 0
        for line in lines[1:]:  # Skip header
            if line.strip():
                values = line.split(',')
                if len(values) > 6:  # Ensure we have enough columns
                    try:
                        count = int(values[6])  # _value column
                        total_records += count
                    except (ValueError, IndexError):
                        pass
        
        print(f"✅ Total de registros en InfluxDB: {total_records}")
        
        if total_records > 0:
            print()
            print("🎉 ¡Los datos están llegando correctamente a InfluxDB!")
            print("   Deberías ver gráficos en Grafana en:")
            print("   http://localhost:3000")
        else:
            print("⚠️  No hay datos recientes. Genera algunos con:")
            print("   cd ../gateway && python medusse_gateway.py --broker localhost --source simulator")
    
    print()
    print("🔗 Enlaces útiles:")
    print("   Grafana: http://localhost:3000 (admin/medusse2025)")
    print("   InfluxDB: http://localhost:8086 (admin/medusse2025)")

if __name__ == "__main__":
    main()