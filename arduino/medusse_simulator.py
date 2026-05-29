#!/usr/bin/env python3
"""
Simulador Medusse - Genera datos de sensores IoT para múltiples ubicaciones
Incluye simulación de energía solar y gestión de batería (FASE 2)
Envía datos directamente a MQTT para el proyecto Medusse
"""

def get_solar_irradiance():
    """Calcula la irradiancia solar basada en la hora del día (simulación realista)"""
    current_time = datetime.now()
    hour = current_time.hour
    
    # Simular patrón solar: 0 de noche, máximo al mediodía
    if 6 <= hour <= 18:  # Día
        # Función sinusoidal para simular el sol
        angle = (hour - 6) * math.pi / 12  # De 0 a π durante el día
        base_irradiance = math.sin(angle) * 1000  # Máximo 1000 W/m²
        
        # Agregar variabilidad por nubes
        cloud_factor = random.uniform(0.7, 1.0)
        return max(0, base_irradiance * cloud_factor)
    else:  # Noche
        return 0

def simulate_battery_discharge(current_percentage, power_consumption, time_delta_minutes):
    """Simula la descarga de batería basada en consumo"""
    # Batería típica: 3000mAh, voltaje 3.7V = 11.1Wh
    battery_capacity_wh = 11.1
    
    # Convertir consumo de mA a W (asumiendo 3.7V)
    power_consumption_w = (power_consumption / 1000.0) * 3.7
    
    # Calcular descarga en porcentaje
    discharge_percent = (power_consumption_w * time_delta_minutes / 60.0) / battery_capacity_wh * 100
    
    return max(0, current_percentage - discharge_percent)

def simulate_battery_charge(current_percentage, solar_voltage, time_delta_minutes):
    """Simula la carga de batería desde panel solar"""
    # Eficiencia del regulador de carga ~85%
    charging_efficiency = 0.85
    
    if solar_voltage > 5.0:  # Mínimo voltaje para cargar
        # Calcular corriente de carga estimada (simplificado)
        charge_current_ma = min(500, (solar_voltage - 4.2) * 100)  # Máximo 500mA
        charge_power_w = (charge_current_ma / 1000.0) * 4.2 * charging_efficiency
        
        # Batería típica: 3000mAh, voltaje 3.7V = 11.1Wh
        battery_capacity_wh = 11.1
        charge_percent = (charge_power_w * time_delta_minutes / 60.0) / battery_capacity_wh * 100
        
        return min(100, current_percentage + charge_percent)
    else:
        return current_percentage

import json
import time
import random
import math
import sys
import io
from datetime import datetime
import paho.mqtt.client as mqtt


def configure_console_utf8():
    """Evita UnicodeEncodeError en Windows cuando stdout va a log (cp1252)."""
    for name in ("stdout", "stderr"):
        stream = getattr(sys, name, None)
        if stream is None:
            continue
        try:
            if hasattr(stream, "reconfigure"):
                stream.reconfigure(encoding="utf-8", errors="replace")
            elif hasattr(stream, "buffer"):
                wrapper = io.TextIOWrapper(
                    stream.buffer,
                    encoding="utf-8",
                    errors="replace",
                    line_buffering=True,
                )
                setattr(sys, name, wrapper)
        except (OSError, ValueError, AttributeError):
            pass


def main():
    configure_console_utf8()

    # Conectar a MQTT
    client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
    
    try:
        client.connect("localhost", 1883, 60)
        print("✅ Conectado a MQTT broker")
        print("🔄 Generando datos para 4 ubicaciones con 11 tipos de sensores... (Ctrl+C para parar)")
        print("📊 Sensores: temp, humedad, CO2, presión, VOC, IAQ, suelo, pH, flujo, TDS, O2")
        
        locations = [
            {"name": "aula20", "node": "ESP32_NODE_01", "temp_base": 22, "battery_percent": 85, "wake_count": 0},
            {"name": "aula21", "node": "ESP32_NODE_02", "temp_base": 24, "battery_percent": 92, "wake_count": 0},
            {"name": "gimnasio", "node": "ESP32_NODE_03", "temp_base": 23, "battery_percent": 78, "wake_count": 0},
            {"name": "laboratorio", "node": "ESP32_NODE_04", "temp_base": 21, "battery_percent": 88, "wake_count": 0}
        ]
        
        last_update_time = time.time()
        
        i = 0
        while True:  # Generar datos continuamente
            for loc in locations:
                # Generar datos para cada ubicación
                temp_data = {
                    "value": round(loc["temp_base"] + random.uniform(-2, 4), 1),
                    "sensor": "dht22",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                humidity_data = {
                    "value": round(45 + random.uniform(-10, 15), 1),
                    "sensor": "dht22",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                co2_data = {
                    "value": random.randint(400, 600),
                    "sensor": "gas",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                pressure_data = {
                    "value": round(1013 + random.uniform(-5, 5), 1),
                    "sensor": "bme680",  # Upgraded from bme280
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # VOC data (BME680 upgrade)
                voc_data = {
                    "value": round(random.uniform(20, 100), 1),  # VOC resistance in KOhms
                    "sensor": "bme680",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # Air Quality Index based on VOC
                iaq_data = {
                    "value": random.randint(10, 150),  # IAQ 0-500 scale
                    "sensor": "bme680",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # Soil moisture (varies by location type)
                soil_base = {"aula20": 30, "aula21": 35, "gimnasio": 25, "laboratorio": 40}
                soil_data = {
                    "value": round(soil_base.get(loc["name"], 30) + random.uniform(-10, 15), 1),
                    "sensor": "soil",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # pH level (slightly acidic to neutral)
                ph_data = {
                    "value": round(random.uniform(6.2, 7.8), 2),
                    "sensor": "ph",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # Water flow (varies by location)
                flow_base = {"aula20": 0.5, "aula21": 1.2, "gimnasio": 2.1, "laboratorio": 0.8}
                flow_data = {
                    "value": round(flow_base.get(loc["name"], 1.0) + random.uniform(-0.3, 0.5), 1),
                    "sensor": "flow",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # TDS (Total Dissolved Solids)
                tds_data = {
                    "value": round(random.uniform(50, 200), 1),
                    "sensor": "tds",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # Dissolved Oxygen
                do_data = {
                    "value": round(random.uniform(7.2, 8.8), 1),
                    "sensor": "dissolved_oxygen",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # === ENERGY MONITORING DATA (FASE 2) ===
                
                # Calcular tiempo transcurrido para simulación realista
                current_time = time.time()
                time_delta_minutes = (current_time - last_update_time) / 60.0
                
                # Obtener irradiancia solar actual
                solar_irradiance = get_solar_irradiance()
                
                # Simular voltaje del panel solar basado en irradiancia
                # Panel típico 12V, pero varía con la luz
                max_solar_voltage = 18.5  # Voltaje en circuito abierto
                solar_voltage = (solar_irradiance / 1000.0) * max_solar_voltage
                solar_voltage += random.uniform(-0.5, 0.5)  # Variabilidad
                
                # Simular consumo de potencia variable
                base_consumption = 120  # mA consumo base
                if loc["battery_percent"] < 30:
                    # Modo de bajo consumo
                    power_consumption = base_consumption * 0.6 + random.uniform(-10, 10)
                else:
                    # Consumo normal con variabilidad
                    power_consumption = base_consumption + random.uniform(-20, 40)
                
                # Actualizar nivel de batería basado en carga/descarga
                if i > 0:  # No actualizar en la primera iteración
                    # Primero descargar por consumo
                    loc["battery_percent"] = simulate_battery_discharge(
                        loc["battery_percent"], power_consumption, time_delta_minutes
                    )
                    
                    # Luego cargar si hay sol
                    loc["battery_percent"] = simulate_battery_charge(
                        loc["battery_percent"], solar_voltage, time_delta_minutes
                    )
                
                # Simular voltaje de batería basado en porcentaje
                min_battery_voltage = 3.2
                max_battery_voltage = 4.2
                battery_voltage = min_battery_voltage + (loc["battery_percent"] / 100.0) * (max_battery_voltage - min_battery_voltage)
                battery_voltage += random.uniform(-0.05, 0.05)  # Variabilidad del ADC
                
                # Estado de carga (charging si hay suficiente sol y batería no está llena)
                charging_status = solar_voltage > 5.0 and loc["battery_percent"] < 95
                
                # Modo de bajo consumo si batería baja
                low_power_mode = loc["battery_percent"] < 25
                
                # Incrementar contador de despertares
                loc["wake_count"] += 1
                
                # Crear datos de energía
                battery_voltage_data = {
                    "value": round(battery_voltage, 2),
                    "sensor": "battery_voltage",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                solar_voltage_data = {
                    "value": round(solar_voltage, 2),
                    "sensor": "solar_voltage",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                battery_percentage_data = {
                    "value": round(loc["battery_percent"], 1),
                    "sensor": "battery_percentage",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                power_consumption_data = {
                    "value": round(power_consumption, 1),
                    "sensor": "power_consumption",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                charging_status_data = {
                    "value": 1 if charging_status else 0,
                    "sensor": "charging_status",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                low_power_mode_data = {
                    "value": 1 if low_power_mode else 0,
                    "sensor": "low_power_mode",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                wake_count_data = {
                    "value": loc["wake_count"],
                    "sensor": "wake_count",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # Enviar a MQTT
                topics_data = [
                    (f"iescelia/{loc['name']}/temperature", temp_data),
                    (f"iescelia/{loc['name']}/humidity", humidity_data),
                    (f"iescelia/{loc['name']}/co2", co2_data),
                    (f"iescelia/{loc['name']}/pressure", pressure_data),
                    (f"iescelia/{loc['name']}/voc", voc_data),
                    (f"iescelia/{loc['name']}/iaq", iaq_data),
                    (f"iescelia/{loc['name']}/soil_moisture", soil_data),
                    (f"iescelia/{loc['name']}/ph_level", ph_data),
                    (f"iescelia/{loc['name']}/water_flow", flow_data),
                    (f"iescelia/{loc['name']}/tds", tds_data),
                    (f"iescelia/{loc['name']}/dissolved_oxygen", do_data),
                    # === TOPICS DE ENERGÍA (FASE 2) ===
                    (f"iescelia/{loc['name']}/battery_voltage", battery_voltage_data),
                    (f"iescelia/{loc['name']}/solar_voltage", solar_voltage_data),
                    (f"iescelia/{loc['name']}/battery_percentage", battery_percentage_data),
                    (f"iescelia/{loc['name']}/power_consumption", power_consumption_data),
                    (f"iescelia/{loc['name']}/charging_status", charging_status_data),
                    (f"iescelia/{loc['name']}/low_power_mode", low_power_mode_data),
                    (f"iescelia/{loc['name']}/wake_count", wake_count_data)
                ]
                
                for topic, data in topics_data:
                    payload = json.dumps(data)
                    client.publish(topic, payload)
                    print(f"📤 {topic}: {payload}")
            
            # Actualizar tiempo para próxima iteración
            last_update_time = time.time()
            
            i += 1
            print(f"\n--- Ciclo {i} completado ---\n")
            time.sleep(15)  # Esperar 15 segundos entre ciclos
            
    except KeyboardInterrupt:
        print("\n⏹️  Deteniendo simulador...")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.disconnect()
        print("👋 Desconectado")

if __name__ == "__main__":
    main()