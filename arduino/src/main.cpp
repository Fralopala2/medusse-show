#include <Arduino.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_BME680.h>
#include <ArduinoJson.h>
#include <esp_sleep.h>
#include <WiFi.h>
#include <PubSubClient.h>

// Pin definitions
#define DHT_PIN 4
#define DHT_TYPE DHT22
#define GAS_SENSOR_PIN A0
#define I2C_SDA 21
#define I2C_SCL 22

// Energy monitoring pins
#define BATTERY_VOLTAGE_PIN A6      // Battery voltage divider
#define SOLAR_VOLTAGE_PIN A7        // Solar panel voltage divider
#define CURRENT_SENSOR_PIN A3       // Current sensor (ACS712 or similar)
#define CHARGING_STATUS_PIN 35      // Charging indicator from TP4056

// Sensor instances
DHT dht(DHT_PIN, DHT_TYPE);
Adafruit_BME680 bme;

// WiFi and MQTT instances
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

// Node configuration
const String NODE_ID = "ESP32_NODE_01";
const String LOCATION = "aula20";
unsigned long lastReading = 0;
const unsigned long READING_INTERVAL = 10000; // 10 seconds

// Energy management configuration
const float VOLTAGE_DIVIDER_FACTOR = 2.0;    // For 1:1 voltage divider (adjust based on resistor values)
const float BATTERY_MIN_VOLTAGE = 3.2;       // Minimum safe battery voltage
const float BATTERY_MAX_VOLTAGE = 4.2;       // Maximum battery voltage
const float LOW_BATTERY_THRESHOLD = 3.4;     // Low battery warning
const unsigned long DEEP_SLEEP_INTERVAL = 300000000; // 5 minutes in microseconds
const unsigned long WIFI_TIMEOUT = 10000;    // WiFi connection timeout

// WiFi credentials
const char* WIFI_SSID = "YourWiFiSSID";      // Replace with your WiFi SSID
const char* WIFI_PASSWORD = "YourWiFiPassword"; // Replace with your WiFi password

// MQTT configuration
const char* MQTT_SERVER = "192.168.1.100";   // Replace with your MQTT server IP
const int MQTT_PORT = 1883;
const char* MQTT_TOPIC = "medusse/sensors";

// Energy management variables
bool lowPowerMode = false;
bool chargingStatus = false;
int bootCount = 0;

// Sensor data structure
struct SensorData {
  // Environmental sensors
  float temperature_dht;
  float humidity_dht;
  float temperature_bme;
  float humidity_bme;
  float pressure;
  float voc_resistance;         // BME680 VOC gas resistance
  float voc_iaq;               // Indoor Air Quality index
  int gas_level;
  float soil_moisture;         // Soil moisture sensor
  float ph_level;              // pH sensor
  float water_flow;            // Water flow sensor (L/min)
  float tds_ppm;               // Total Dissolved Solids
  float dissolved_oxygen;      // Dissolved oxygen (mg/L)
  
  // Energy monitoring sensors (FASE 2)
  float battery_voltage;       // Battery voltage (V)
  float solar_voltage;         // Solar panel voltage (V)
  float battery_percentage;    // Battery charge percentage
  float power_consumption;     // Current power consumption (mA)
  bool charging_status;        // Is battery charging
  bool low_power_mode;         // Is node in low power mode
  int wake_count;              // Number of times awakened from deep sleep
  
  // Metadata
  unsigned long timestamp;
  String node_id;
  String location;
};

// Function declarations
SensorData readSensors();
bool isValidReading(const SensorData& data);
void publishSensorData(const SensorData& data);

// Energy management functions
float readBatteryVoltage();
float readSolarVoltage();
float calculateBatteryPercentage(float voltage);
float readPowerConsumption();
bool readChargingStatus();
void enterDeepSleep();
bool connectWiFi();
bool connectMQTT();
void checkPowerMode();

void setup() {
  Serial.begin(115200);
  delay(2000);
  
  Serial.println("=== Medusse ESP32 Node Starting ===");
  Serial.println("Node ID: " + NODE_ID);
  Serial.println("Location: " + LOCATION);
  
  // Initialize I2C
  Wire.begin(I2C_SDA, I2C_SCL);
  
  // Initialize DHT22
  dht.begin();
  Serial.println("DHT22 initialized");
  
  // Initialize BME680
  if (!bme.begin(0x76)) {
    Serial.println("Could not find BME680 sensor, check wiring!");
    // Continue anyway for simulation
  } else {
    Serial.println("BME680 initialized");
    
    // Set up BME680 oversampling and filter initialization
    bme.setTemperatureOversampling(BME680_OS_8X);
    bme.setHumidityOversampling(BME680_OS_2X);
    bme.setPressureOversampling(BME680_OS_4X);
    bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
    bme.setGasHeater(320, 150); // 320°C for 150 ms
    Serial.println("BME680 configured for VOC readings");
  }
  
  // Initialize gas sensor (analog)
  pinMode(GAS_SENSOR_PIN, INPUT);
  Serial.println("Gas sensor initialized");
  
  // Initialize energy monitoring pins
  pinMode(BATTERY_VOLTAGE_PIN, INPUT);
  pinMode(SOLAR_VOLTAGE_PIN, INPUT);
  pinMode(CURRENT_SENSOR_PIN, INPUT);
  pinMode(CHARGING_STATUS_PIN, INPUT_PULLUP);
  Serial.println("Energy monitoring pins initialized");
  
  // Check boot count (for deep sleep tracking)
  bootCount++;
  Serial.println("Boot count: " + String(bootCount));
  
  // Check power mode and battery status
  checkPowerMode();
  
  // Connect to WiFi
  if (connectWiFi()) {
    Serial.println("WiFi connected successfully");
    
    // Setup MQTT
    mqttClient.setServer(MQTT_SERVER, MQTT_PORT);
    if (connectMQTT()) {
      Serial.println("MQTT connected successfully");
    }
  }
  
  Serial.println("=== All sensors and connectivity ready ===");
  delay(1000);
}

void loop() {
  unsigned long currentTime = millis();
  
  // Check power mode at each loop iteration
  checkPowerMode();
  
  if (currentTime - lastReading >= READING_INTERVAL) {
    SensorData data = readSensors();
    
    if (isValidReading(data)) {
      // Ensure WiFi and MQTT are connected
      if (!WiFi.isConnected()) {
        connectWiFi();
      }
      if (!mqttClient.connected()) {
        connectMQTT();
      }
      
      publishSensorData(data);
      
      // Check if we should enter deep sleep mode
      if (lowPowerMode || data.battery_percentage < 20) {
        Serial.println("Entering deep sleep mode to conserve battery...");
        delay(1000); // Give time for message to send
        enterDeepSleep();
      }
    } else {
      Serial.println("Invalid sensor reading, skipping...");
    }
    
    lastReading = currentTime;
  }
  
  // Handle MQTT events
  mqttClient.loop();
  
  delay(100); // Small delay to prevent watchdog issues
}

SensorData readSensors() {
  SensorData data;
  
  // Read DHT22
  data.temperature_dht = dht.readTemperature();
  data.humidity_dht = dht.readHumidity();
  
  // Read BME680 (upgraded from BME280)
  if (bme.performReading()) {
    data.temperature_bme = bme.temperature;
    data.humidity_bme = bme.humidity;
    data.pressure = bme.pressure / 100.0F; // Convert to hPa
    data.voc_resistance = bme.gas_resistance / 1000.0F; // Convert to KOhms
    // Simple IAQ calculation (0-500 scale)
    data.voc_iaq = calculateIAQ(data.voc_resistance);
  } else {
    Serial.println("BME680 reading failed");
    data.temperature_bme = NAN;
    data.humidity_bme = NAN;
    data.pressure = NAN;
    data.voc_resistance = NAN;
    data.voc_iaq = NAN;
  }
  
  // Read gas sensor (simulate CO2 based on analog reading)
  int gasRaw = analogRead(GAS_SENSOR_PIN);
  data.gas_level = map(gasRaw, 0, 4095, 300, 2000); // Map to CO2 ppm range
  
  // Read additional sensors (simulated for now)
  data.soil_moisture = readSoilMoisture();
  data.ph_level = readPHLevel();
  data.water_flow = readWaterFlow();
  data.tds_ppm = readTDS();
  data.dissolved_oxygen = readDissolvedOxygen();
  
  // Read energy monitoring sensors (FASE 2)
  data.battery_voltage = readBatteryVoltage();
  data.solar_voltage = readSolarVoltage();
  data.battery_percentage = calculateBatteryPercentage(data.battery_voltage);
  data.power_consumption = readPowerConsumption();
  data.charging_status = readChargingStatus();
  data.low_power_mode = lowPowerMode;
  data.wake_count = bootCount;
  
  // Add metadata
  data.timestamp = millis();
  data.node_id = NODE_ID;
  data.location = LOCATION;
  
  return data;
}

bool isValidReading(const SensorData& data) {
  // Check for NaN values from DHT
  if (isnan(data.temperature_dht) || isnan(data.humidity_dht)) {
    return false;
  }
  
  // Check reasonable ranges
  if (data.temperature_dht < -40 || data.temperature_dht > 80) {
    return false;
  }
  
  if (data.humidity_dht < 0 || data.humidity_dht > 100) {
    return false;
  }
  
  return true;
}

void publishSensorData(const SensorData& data) {
  // Create JSON document (increased size for energy data)
  StaticJsonDocument<1024> doc;
  
  // Add sensor readings
  doc["node_id"] = data.node_id;
  doc["location"] = data.location;
  doc["timestamp"] = data.timestamp;
  
  // DHT22 data
  doc["sensors"]["dht22"]["temperature"] = round(data.temperature_dht * 10) / 10.0;
  doc["sensors"]["dht22"]["humidity"] = round(data.humidity_dht * 10) / 10.0;
  
  // BME680 data (upgraded from BME280)
  doc["sensors"]["bme680"]["temperature"] = round(data.temperature_bme * 10) / 10.0;
  doc["sensors"]["bme680"]["humidity"] = round(data.humidity_bme * 10) / 10.0;
  doc["sensors"]["bme680"]["pressure"] = round(data.pressure * 10) / 10.0;
  doc["sensors"]["bme680"]["voc_resistance"] = round(data.voc_resistance * 10) / 10.0;
  doc["sensors"]["bme680"]["voc_iaq"] = round(data.voc_iaq * 10) / 10.0;
  
  // Gas sensor data
  doc["sensors"]["gas"]["co2_ppm"] = data.gas_level;
  
  // Environmental sensors
  doc["sensors"]["soil"]["moisture_percent"] = round(data.soil_moisture * 10) / 10.0;
  doc["sensors"]["water"]["ph_level"] = round(data.ph_level * 100) / 100.0;
  doc["sensors"]["water"]["flow_lmin"] = round(data.water_flow * 10) / 10.0;
  doc["sensors"]["water"]["tds_ppm"] = round(data.tds_ppm * 10) / 10.0;
  doc["sensors"]["water"]["dissolved_oxygen"] = round(data.dissolved_oxygen * 10) / 10.0;
  
  // Energy monitoring sensors (FASE 2)
  doc["energy"]["battery_voltage"] = round(data.battery_voltage * 100) / 100.0;
  doc["energy"]["solar_voltage"] = round(data.solar_voltage * 100) / 100.0;
  doc["energy"]["battery_percentage"] = round(data.battery_percentage * 10) / 10.0;
  doc["energy"]["power_consumption_ma"] = round(data.power_consumption * 10) / 10.0;
  doc["energy"]["charging_status"] = data.charging_status;
  doc["energy"]["low_power_mode"] = data.low_power_mode;
  doc["energy"]["wake_count"] = data.wake_count;
  
  // Add system info
  doc["system"]["free_heap"] = ESP.getFreeHeap();
  doc["system"]["uptime"] = millis();
  
  // Serialize and send
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.println(jsonString);
  
  // Also print human-readable format for debugging
  Serial.println("--- Sensor Reading ---");
  Serial.printf("DHT22 - Temp: %.1f°C, Humidity: %.1f%%\n", 
                data.temperature_dht, data.humidity_dht);
  Serial.printf("BME680 - Temp: %.1f°C, Humidity: %.1f%%, Pressure: %.1f hPa\n", 
                data.temperature_bme, data.humidity_bme, data.pressure);
  Serial.printf("BME680 - VOC: %.1f KOhms, IAQ: %.1f\n", 
                data.voc_resistance, data.voc_iaq);
  Serial.printf("Gas Sensor - CO2: %d ppm\n", data.gas_level);
  Serial.printf("Soil Moisture: %.1f%%, pH: %.2f\n", data.soil_moisture, data.ph_level);
  Serial.printf("Water Flow: %.1f L/min, TDS: %.1f ppm, DO: %.1f mg/L\n", 
                data.water_flow, data.tds_ppm, data.dissolved_oxygen);
  Serial.printf("Free Heap: %d bytes\n", ESP.getFreeHeap());
  Serial.println("---------------------");
}

// Helper functions for new sensors

float calculateIAQ(float gas_resistance) {
  // Simple IAQ calculation based on gas resistance
  // Higher resistance = better air quality (lower IAQ value)
  if (isnan(gas_resistance)) return NAN;
  
  // Convert resistance (KOhms) to IAQ scale (0-500)
  // Good air: >50 KOhms = IAQ 0-50
  // Moderate: 20-50 KOhms = IAQ 51-100  
  // Poor: <20 KOhms = IAQ 101-500
  if (gas_resistance > 50) {
    return map(gas_resistance, 50, 200, 50, 0);
  } else if (gas_resistance > 20) {
    return map(gas_resistance, 20, 50, 100, 51);
  } else {
    return map(gas_resistance, 0, 20, 500, 101);
  }
}

float readSoilMoisture() {
  // Simulate soil moisture sensor (capacitive)
  // In real implementation, read from analog pin
  return random(200, 800) / 10.0; // 20-80% moisture
}

float readPHLevel() {
  // Simulate pH sensor
  // In real implementation, read from analog pH sensor
  return random(650, 750) / 100.0; // pH 6.5-7.5 (neutral range)
}

float readWaterFlow() {
  // Simulate water flow sensor (YF-S201)
  // In real implementation, count pulses and calculate flow
  return random(0, 100) / 10.0; // 0-10 L/min flow rate
}

float readTDS() {
  // Simulate TDS sensor (Total Dissolved Solids)
  // In real implementation, read from TDS probe
  return random(50, 300); // 50-300 ppm (good drinking water range)
}

float readDissolvedOxygen() {
  // Simulate dissolved oxygen sensor
  // In real implementation, read from DO probe  
  return random(70, 90) / 10.0; // 7.0-9.0 mg/L (good water quality)
}

// ===== ENERGY MANAGEMENT FUNCTIONS (FASE 2) =====

float readBatteryVoltage() {
  // Read battery voltage through voltage divider
  int analogValue = analogRead(BATTERY_VOLTAGE_PIN);
  float voltage = (analogValue / 4095.0) * 3.3 * VOLTAGE_DIVIDER_FACTOR;
  
  Serial.print("Battery voltage: ");
  Serial.print(voltage);
  Serial.println(" V");
  
  return voltage;
}

float readSolarVoltage() {
  // Read solar panel voltage through voltage divider
  int analogValue = analogRead(SOLAR_VOLTAGE_PIN);
  float voltage = (analogValue / 4095.0) * 3.3 * VOLTAGE_DIVIDER_FACTOR;
  
  Serial.print("Solar voltage: ");
  Serial.print(voltage);
  Serial.println(" V");
  
  return voltage;
}

float calculateBatteryPercentage(float voltage) {
  // Calculate battery percentage based on voltage
  if (voltage >= BATTERY_MAX_VOLTAGE) return 100.0;
  if (voltage <= BATTERY_MIN_VOLTAGE) return 0.0;
  
  float percentage = ((voltage - BATTERY_MIN_VOLTAGE) / (BATTERY_MAX_VOLTAGE - BATTERY_MIN_VOLTAGE)) * 100.0;
  
  Serial.print("Battery percentage: ");
  Serial.print(percentage);
  Serial.println(" %");
  
  return percentage;
}

float readPowerConsumption() {
  // Read current consumption through current sensor (ACS712 or similar)
  int analogValue = analogRead(CURRENT_SENSOR_PIN);
  
  // Convert to current (mA) - adjust formula based on your current sensor
  // ACS712-05A: 185 mV/A, centered at 2.5V
  float voltage = (analogValue / 4095.0) * 3.3;
  float current = ((voltage - 2.5) / 0.185) * 1000; // Convert to mA
  
  // Ensure positive current reading
  current = abs(current);
  
  Serial.print("Power consumption: ");
  Serial.print(current);
  Serial.println(" mA");
  
  return current;
}

bool readChargingStatus() {
  // Read charging status from TP4056 charging module
  bool isCharging = !digitalRead(CHARGING_STATUS_PIN); // Inverted because TP4056 CHRG pin is active low
  
  Serial.print("Charging status: ");
  Serial.println(isCharging ? "Charging" : "Not charging");
  
  return isCharging;
}

void checkPowerMode() {
  float batteryVoltage = readBatteryVoltage();
  float batteryPercentage = calculateBatteryPercentage(batteryVoltage);
  bool isCharging = readChargingStatus();
  
  // Determine power mode based on battery level and charging status
  if (batteryVoltage < LOW_BATTERY_THRESHOLD && !isCharging) {
    if (!lowPowerMode) {
      Serial.println("*** ENTERING LOW POWER MODE ***");
      lowPowerMode = true;
      
      // Reduce WiFi power and increase reading interval
      WiFi.setTxPower(WIFI_POWER_2dBm); // Reduce WiFi transmission power
    }
  } else if (batteryPercentage > 50 || isCharging) {
    if (lowPowerMode) {
      Serial.println("*** EXITING LOW POWER MODE ***");
      lowPowerMode = false;
      
      // Restore normal WiFi power
      WiFi.setTxPower(WIFI_POWER_19_5dBm);
    }
  }
  
  // Critical battery level - prepare for emergency shutdown
  if (batteryVoltage < BATTERY_MIN_VOLTAGE && !isCharging) {
    Serial.println("*** CRITICAL BATTERY LEVEL - ENTERING EMERGENCY DEEP SLEEP ***");
    delay(1000);
    esp_deep_sleep_start();
  }
}

void enterDeepSleep() {
  Serial.println("Preparing for deep sleep...");
  
  // Disconnect WiFi to save power
  WiFi.disconnect();
  WiFi.mode(WIFI_OFF);
  
  // Configure wake-up timer
  esp_sleep_enable_timer_wakeup(DEEP_SLEEP_INTERVAL);
  
  Serial.println("Going to deep sleep for " + String(DEEP_SLEEP_INTERVAL / 1000000) + " seconds");
  Serial.flush();
  
  // Enter deep sleep
  esp_deep_sleep_start();
}

bool connectWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  unsigned long startTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startTime < WIFI_TIMEOUT) {
    delay(500);
    Serial.print(".");
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.println("WiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    return true;
  } else {
    Serial.println();
    Serial.println("WiFi connection failed!");
    return false;
  }
}

bool connectMQTT() {
  Serial.print("Connecting to MQTT...");
  
  String clientId = "ESP32Client-" + NODE_ID;
  if (mqttClient.connect(clientId.c_str())) {
    Serial.println("MQTT connected!");
    return true;
  } else {
    Serial.print("MQTT connection failed, rc=");
    Serial.println(mqttClient.state());
    return false;
  }
}
