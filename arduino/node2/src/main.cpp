// Node 2 firmware - Different location and ID
#include <Arduino.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>

// Pin definitions
#define DHT_PIN 4
#define DHT_TYPE DHT22
#define GAS_SENSOR_PIN A0
#define I2C_SDA 21
#define I2C_SCL 22

// Sensor instances
DHT dht(DHT_PIN, DHT_TYPE);
Adafruit_BME280 bme;

// Node configuration - DIFFERENT FROM NODE 1
const String NODE_ID = "ESP32_NODE_02";
const String LOCATION = "aula21";
unsigned long lastReading = 0;
const unsigned long READING_INTERVAL = 12000; // Slightly different timing

// Sensor data structure
struct SensorData {
  float temperature_dht;
  float humidity_dht;
  float temperature_bme;
  float humidity_bme;
  float pressure;
  int gas_level;
  unsigned long timestamp;
  String node_id;
  String location;
};

void setup() {
  Serial.begin(115200);
  delay(2000);
  
  Serial.println("=== Medusse ESP32 Node 2 Starting ===");
  Serial.println("Node ID: " + NODE_ID);
  Serial.println("Location: " + LOCATION);
  
  // Initialize I2C
  Wire.begin(I2C_SDA, I2C_SCL);
  
  // Initialize DHT22
  dht.begin();
  Serial.println("DHT22 initialized");
  
  // Initialize BME280
  if (!bme.begin(0x76)) {
    Serial.println("Could not find BME280 sensor, check wiring!");
  } else {
    Serial.println("BME280 initialized");
  }
  
  // Initialize gas sensor
  pinMode(GAS_SENSOR_PIN, INPUT);
  Serial.println("Gas sensor initialized");
  
  Serial.println("=== All sensors ready ===");
  delay(1000);
}

void loop() {
  unsigned long currentTime = millis();
  
  if (currentTime - lastReading >= READING_INTERVAL) {
    SensorData data = readSensors();
    
    if (isValidReading(data)) {
      publishSensorData(data);
    } else {
      Serial.println("Invalid sensor reading, skipping...");
    }
    
    lastReading = currentTime;
  }
  
  delay(100);
}

SensorData readSensors() {
  SensorData data;
  
  // Read DHT22 with slight variation for Node 2
  data.temperature_dht = dht.readTemperature() + random(-20, 30) / 10.0; // Add some variation
  data.humidity_dht = dht.readHumidity() + random(-50, 50) / 10.0;
  
  // Read BME280
  data.temperature_bme = bme.readTemperature() + random(-20, 30) / 10.0;
  data.humidity_bme = bme.readHumidity() + random(-50, 50) / 10.0;
  data.pressure = bme.readPressure() / 100.0F;
  
  // Read gas sensor with different baseline for Node 2
  int gasRaw = analogRead(GAS_SENSOR_PIN);
  data.gas_level = map(gasRaw, 0, 4095, 350, 1800) + random(-50, 100); // Different range
  
  data.timestamp = millis();
  data.node_id = NODE_ID;
  data.location = LOCATION;
  
  return data;
}

bool isValidReading(const SensorData& data) {
  if (isnan(data.temperature_dht) || isnan(data.humidity_dht)) {
    return false;
  }
  
  if (data.temperature_dht < -40 || data.temperature_dht > 80) {
    return false;
  }
  
  if (data.humidity_dht < 0 || data.humidity_dht > 100) {
    return false;
  }
  
  return true;
}

void publishSensorData(const SensorData& data) {
  StaticJsonDocument<512> doc;
  
  doc["node_id"] = data.node_id;
  doc["location"] = data.location;
  doc["timestamp"] = data.timestamp;
  
  doc["sensors"]["dht22"]["temperature"] = round(data.temperature_dht * 10) / 10.0;
  doc["sensors"]["dht22"]["humidity"] = round(data.humidity_dht * 10) / 10.0;
  
  doc["sensors"]["bme280"]["temperature"] = round(data.temperature_bme * 10) / 10.0;
  doc["sensors"]["bme280"]["humidity"] = round(data.humidity_bme * 10) / 10.0;
  doc["sensors"]["bme280"]["pressure"] = round(data.pressure * 10) / 10.0;
  
  doc["sensors"]["gas"]["co2_ppm"] = data.gas_level;
  
  doc["system"]["free_heap"] = ESP.getFreeHeap();
  doc["system"]["uptime"] = millis();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.println(jsonString);
  
  Serial.println("--- Node 2 Sensor Reading ---");
  Serial.printf("DHT22 - Temp: %.1f°C, Humidity: %.1f%%\n", 
                data.temperature_dht, data.humidity_dht);
  Serial.printf("BME280 - Temp: %.1f°C, Humidity: %.1f%%, Pressure: %.1f hPa\n", 
                data.temperature_bme, data.humidity_bme, data.pressure);
  Serial.printf("Gas Sensor - CO2: %d ppm\n", data.gas_level);
  Serial.printf("Free Heap: %d bytes\n", ESP.getFreeHeap());
  Serial.println("-----------------------------");
}