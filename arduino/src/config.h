#ifndef CONFIG_H
#define CONFIG_H

// Node Configuration
#define NODE_ID "ESP32_NODE_01"
#define LOCATION "aula20"

// Pin Definitions
#define DHT_PIN 4
#define DHT_TYPE DHT22
#define GAS_SENSOR_PIN A0
#define I2C_SDA 21
#define I2C_SCL 22

// Timing Configuration
#define READING_INTERVAL 10000  // 10 seconds between readings
#define SERIAL_BAUD 115200

// Sensor Thresholds
#define TEMP_MIN -40.0
#define TEMP_MAX 80.0
#define HUMIDITY_MIN 0.0
#define HUMIDITY_MAX 100.0
#define CO2_MIN 300
#define CO2_MAX 2000

// BME280 I2C Address
#define BME280_ADDRESS 0x76

#endif