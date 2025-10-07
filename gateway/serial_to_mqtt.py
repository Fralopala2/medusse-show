"""
Gateway simple: lee líneas JSON desde el puerto serie y publica en un broker MQTT.
Requisitos:
  pip install pyserial paho-mqtt

Uso:
  python gateway/serial_to_mqtt.py --port COM3 --baud 115200 --broker localhost --topic iescelia/aula20

El script asume que cada línea del serial es JSON con campos temperature, humidity, co2.
"""
import argparse
import json
import time
import sys

import serial
import paho.mqtt.client as mqtt


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", required=True, help="Serial port (e.g. COM3 or /dev/ttyUSB0)")
    parser.add_argument("--baud", type=int, default=115200)
    parser.add_argument("--broker", default="localhost")
    parser.add_argument("--port-mqtt", type=int, default=1883)
    parser.add_argument("--topic", default="medusse/sensors")
    args = parser.parse_args()

    try:
        ser = serial.Serial(args.port, args.baud, timeout=1)
    except Exception as e:
        print(f"No se pudo abrir el puerto serial: {e}")
        sys.exit(1)

    client = mqtt.Client()
    try:
        client.connect(args.broker, args.port_mqtt)
    except Exception as e:
        print(f"No se pudo conectar al broker MQTT: {e}")
        ser.close()
        sys.exit(1)

    client.loop_start()
    print(f"Conectado a MQTT {args.broker}:{args.port_mqtt}, leyendo serial {args.port} @ {args.baud}")

    try:
        while True:
            line = ser.readline().decode(errors="ignore").strip()
            if not line:
                continue
            try:
                data = json.loads(line)
            except json.JSONDecodeError:
                print(f"Línea no JSON recibida: {line}")
                continue

            payload = json.dumps(data)
            client.publish(args.topic, payload)
            print(f"Publicado en {args.topic}: {payload}")
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("Saliendo...")
    finally:
        client.loop_stop()
        ser.close()


if __name__ == "__main__":
    main()
