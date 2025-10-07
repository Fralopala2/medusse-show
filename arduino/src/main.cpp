#include <Arduino.h>

// Simple starter sketch for an ESP32 node
// Replace with real sensor reads and LoRa/Meshtastic integration

void setup() {
  Serial.begin(115200);
  delay(2000);
  Serial.println("Medusse ESP32 node starting...");
}

void loop() {
  // Fake sensor data example - replace with actual sensor reads
  float temperature = 22.5;
  float humidity = 48.0;
  int co2 = 415;

  // Format as JSON and print to serial (gateway can parse this)
  Serial.printf("{\"temperature\": %.1f, \"humidity\": %.1f, \"co2\": %d}\n", temperature, humidity, co2);

  // TODO: send via LoRa/Mesh (Meshtastic or RadioLib) here

  delay(10000);
}
