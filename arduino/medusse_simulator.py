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
import os
import subprocess
import threading
from pathlib import Path
from datetime import datetime

PID_FILE = Path(__file__).resolve().parents[1] / "logs" / "simulator.pid"


def stop_previous_simulator():
    """Evita instancias zombie tras reinicios de Docker o de iniciar.bat."""
    PID_FILE.parent.mkdir(parents=True, exist_ok=True)
    if not PID_FILE.exists():
        return
    try:
        old_pid = int(PID_FILE.read_text(encoding="utf-8").strip())
    except (ValueError, OSError):
        return
    if old_pid == os.getpid():
        return
    if sys.platform == "win32":
        subprocess.run(
            ["taskkill", "/PID", str(old_pid), "/F"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
    else:
        try:
            os.kill(old_pid, 15)
        except OSError:
            pass


def write_simulator_pid():
    PID_FILE.write_text(str(os.getpid()), encoding="utf-8")


def load_mqtt_client_module():
    """Carga paho.mqtt y, si falta, instala las dependencias del proyecto."""
    try:
        import paho.mqtt.client as mqtt
        return mqtt
    except ModuleNotFoundError:
        requirements_path = Path(__file__).resolve().parents[1] / "requirements.txt"
        print("Falta la dependencia 'paho-mqtt'. Instalando requisitos del proyecto...", flush=True)
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", str(requirements_path)])
        import paho.mqtt.client as mqtt
        return mqtt


def setup_mqtt_client(mqtt, broker_host="localhost", broker_port=1883):
    """Cliente MQTT con hilo de red y reconexion automatica tras reinicios de Docker."""
    connected = threading.Event()
    client = mqtt.Client(
        callback_api_version=mqtt.CallbackAPIVersion.VERSION2,
        client_id="medusse-simulator",
    )
    client.reconnect_delay_set(min_delay=1, max_delay=30)

    def on_connect(cl, userdata, flags, reason_code, properties=None):
        if reason_code == 0:
            connected.set()
            print("Conectado a MQTT broker", flush=True)
        else:
            print(f"Error al conectar MQTT (codigo {reason_code})", flush=True)

    def on_disconnect(cl, userdata, disconnect_flags, reason_code, properties=None):
        if reason_code != 0:
            connected.clear()
            print(f"MQTT desconectado (codigo {reason_code}), reconectando...", flush=True)

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.connect(broker_host, broker_port, 60)
    client.loop_start()
    if not connected.wait(timeout=15):
        raise ConnectionError(f"No se pudo conectar a MQTT en {broker_host}:{broker_port}")
    return client


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


def drift_value(current, step, min_val, max_val, decimals=1):
    """Random walk acotado: cambios graduales y realistas entre lecturas."""
    next_value = current + random.uniform(-step, step)
    next_value = max(min_val, min(max_val, next_value))
    return round(next_value, decimals)


def drift_toward(current, target, pull, noise, min_val, max_val, decimals=1):
    """Deriva hacia un objetivo lento (p. ej. temperatura según hora del día)."""
    next_value = current + (target - current) * pull + random.uniform(-noise, noise)
    next_value = max(min_val, min(max_val, next_value))
    return round(next_value, decimals)


def school_temperature_offset(hour):
    """Pequeña variación diurna en un instituto (clases, calefacción, etc.)."""
    if 8 <= hour <= 16:
        return math.sin((hour - 8) * math.pi / 8) * 1.2
    return -0.8 if hour < 8 else -1.0


def init_location_state(loc):
    """Estado persistente por ubicación para evitar saltos bruscos entre lecturas."""
    soil_base = {"aula20": 30, "aula21": 35, "gimnasio": 25, "laboratorio": 40}
    flow_base = {"aula20": 0.5, "aula21": 1.2, "gimnasio": 2.1, "laboratorio": 0.8}
    loc["state"] = {
        "temperature": float(loc["temp_base"]),
        "humidity": 48.0,
        "co2": 450.0,
        "pressure": 1013.0,
        "voc": 55.0,
        "iaq": 50.0,
        "soil_moisture": float(soil_base.get(loc["name"], 30)),
        "ph_level": 7.0,
        "water_flow": float(flow_base.get(loc["name"], 1.0)),
        "tds": 120.0,
        "dissolved_oxygen": 8.0,
    }


def update_location_state(loc):
    """Actualiza sensores con variaciones suaves y coherentes con el entorno."""
    hour = datetime.now().hour
    state = loc["state"]
    temp_target = loc["temp_base"] + school_temperature_offset(hour)

    state["temperature"] = drift_toward(
        state["temperature"], temp_target, pull=0.12, noise=0.08, min_val=18, max_val=28
    )
    state["humidity"] = drift_value(state["humidity"], step=0.6, min_val=35, max_val=65)
    state["co2"] = drift_value(state["co2"], step=12, min_val=400, max_val=900, decimals=0)
    state["pressure"] = drift_value(state["pressure"], step=0.15, min_val=1008, max_val=1018)
    state["voc"] = drift_value(state["voc"], step=2.5, min_val=25, max_val=110)
    state["iaq"] = drift_value(state["iaq"], step=4, min_val=15, max_val=120, decimals=0)
    state["soil_moisture"] = drift_value(state["soil_moisture"], step=0.8, min_val=15, max_val=55)
    state["ph_level"] = drift_value(state["ph_level"], step=0.04, min_val=6.4, max_val=7.6, decimals=2)
    state["water_flow"] = drift_value(state["water_flow"], step=0.08, min_val=0.2, max_val=2.8)
    state["tds"] = drift_value(state["tds"], step=3, min_val=70, max_val=190)
    state["dissolved_oxygen"] = drift_value(state["dissolved_oxygen"], step=0.08, min_val=7.0, max_val=9.0)


def main():
    configure_console_utf8()
    stop_previous_simulator()
    write_simulator_pid()
    mqtt = load_mqtt_client_module()

    client = setup_mqtt_client(mqtt)

    try:
        print("Generando datos para 4 ubicaciones (Ctrl+C para parar)", flush=True)
        
        locations = [
            {"name": "aula20", "node": "ESP32_NODE_01", "temp_base": 22, "battery_percent": 85, "wake_count": 0},
            {"name": "aula21", "node": "ESP32_NODE_02", "temp_base": 24, "battery_percent": 92, "wake_count": 0},
            {"name": "gimnasio", "node": "ESP32_NODE_03", "temp_base": 23, "battery_percent": 78, "wake_count": 0},
            {"name": "laboratorio", "node": "ESP32_NODE_04", "temp_base": 21, "battery_percent": 88, "wake_count": 0}
        ]
        
        for loc in locations:
            init_location_state(loc)
        
        last_update_time = time.time()
        
        i = 0
        while True:  # Generar datos continuamente
            for loc in locations:
                update_location_state(loc)
                state = loc["state"]

                temp_data = {
                    "value": state["temperature"],
                    "sensor": "dht22",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                humidity_data = {
                    "value": state["humidity"],
                    "sensor": "dht22",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                co2_data = {
                    "value": int(state["co2"]),
                    "sensor": "gas",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                pressure_data = {
                    "value": state["pressure"],
                    "sensor": "bme680",  # Upgraded from bme280
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # VOC data (BME680 upgrade)
                voc_data = {
                    "value": state["voc"],
                    "sensor": "bme680",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # Air Quality Index based on VOC
                iaq_data = {
                    "value": int(state["iaq"]),
                    "sensor": "bme680",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                soil_data = {
                    "value": state["soil_moisture"],
                    "sensor": "soil",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # pH level (slightly acidic to neutral)
                ph_data = {
                    "value": state["ph_level"],
                    "sensor": "ph",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                flow_data = {
                    "value": state["water_flow"],
                    "sensor": "flow",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # TDS (Total Dissolved Solids)
                tds_data = {
                    "value": state["tds"],
                    "sensor": "tds",
                    "node_id": loc["node"],
                    "timestamp": int(time.time() * 1000),
                    "location": loc["name"]
                }
                
                # Dissolved Oxygen
                do_data = {
                    "value": state["dissolved_oxygen"],
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
                    result = client.publish(topic, payload, qos=1)
                    if result.rc != 0:
                        print(f"MQTT publish fallido en {topic} (rc={result.rc})", flush=True)
            
            # Actualizar tiempo para próxima iteración
            last_update_time = time.time()
            
            i += 1
            print(f"--- Ciclo {i} completado ---", flush=True)
            time.sleep(15)  # Esperar 15 segundos entre ciclos
            
    except KeyboardInterrupt:
        print("\n⏹️  Deteniendo simulador...")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.loop_stop()
        client.disconnect()
        print("Desconectado", flush=True)

if __name__ == "__main__":
    main()