import 'package:flutter/material.dart';

class SensorData {
  final double value;
  final String sensor;
  final String nodeId;
  final DateTime timestamp;
  final String location;

  SensorData({
    required this.value,
    required this.sensor,
    required this.nodeId,
    required this.timestamp,
    required this.location,
  });

  factory SensorData.fromJson(Map<String, dynamic> json) {
    return SensorData(
      value: (json['value'] as num).toDouble(),
      sensor: json['sensor'] ?? '',
      nodeId: json['node_id'] ?? '',
      timestamp: json['time'] != null
          ? DateTime.parse(json['time'])
          : DateTime.fromMillisecondsSinceEpoch(json['timestamp'] ?? 0),
      location: json['location'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'value': value,
      'sensor': sensor,
      'node_id': nodeId,
      'timestamp': timestamp.millisecondsSinceEpoch,
      'location': location,
    };
  }
}

class LocationSummary {
  final String location;
  final SensorData? temperature;
  final SensorData? humidity;
  final SensorData? co2;
  final SensorData? pressure;
  final SensorData? voc;
  final SensorData? iaq;
  final SensorData? soilMoisture;
  final SensorData? phLevel;
  final SensorData? waterFlow;
  final SensorData? tdsPpm;
  final SensorData? dissolvedOxygen;
  final SensorData? batteryVoltage;
  final SensorData? solarVoltage;
  final SensorData? batteryPercentage;
  final SensorData? powerConsumption;
  final SensorData? chargingStatus;
  final SensorData? lowPowerMode;
  final SensorData? wakeCount;

  LocationSummary({
    required this.location,
    this.temperature,
    this.humidity,
    this.co2,
    this.pressure,
    this.voc,
    this.iaq,
    this.soilMoisture,
    this.phLevel,
    this.waterFlow,
    this.tdsPpm,
    this.dissolvedOxygen,
    this.batteryVoltage,
    this.solarVoltage,
    this.batteryPercentage,
    this.powerConsumption,
    this.chargingStatus,
    this.lowPowerMode,
    this.wakeCount,
  });

  factory LocationSummary.fromJson(String location, Map<String, dynamic> json) {
    return LocationSummary(
      location: location,
      temperature: json['temperature'] != null
          ? SensorData.fromJson({...json['temperature'], 'location': location})
          : null,
      humidity: json['humidity'] != null
          ? SensorData.fromJson({...json['humidity'], 'location': location})
          : null,
      co2: json['co2'] != null
          ? SensorData.fromJson({...json['co2'], 'location': location})
          : null,
      pressure: json['pressure'] != null
          ? SensorData.fromJson({...json['pressure'], 'location': location})
          : null,
      voc: json['voc'] != null
          ? SensorData.fromJson({...json['voc'], 'location': location})
          : null,
      iaq: json['iaq'] != null
          ? SensorData.fromJson({...json['iaq'], 'location': location})
          : null,
      soilMoisture: json['soil_moisture'] != null
          ? SensorData.fromJson({
              ...json['soil_moisture'],
              'location': location,
            })
          : null,
      phLevel: json['ph_level'] != null
          ? SensorData.fromJson({...json['ph_level'], 'location': location})
          : null,
      waterFlow: json['water_flow'] != null
          ? SensorData.fromJson({...json['water_flow'], 'location': location})
          : null,
      tdsPpm: json['tds'] != null
          ? SensorData.fromJson({...json['tds'], 'location': location})
          : null,
      dissolvedOxygen: json['dissolved_oxygen'] != null
          ? SensorData.fromJson({
              ...json['dissolved_oxygen'],
              'location': location,
            })
          : null,
      batteryVoltage: json['battery_voltage'] != null
          ? SensorData.fromJson({
              ...json['battery_voltage'],
              'location': location,
            })
          : null,
      solarVoltage: json['solar_voltage'] != null
          ? SensorData.fromJson({
              ...json['solar_voltage'],
              'location': location,
            })
          : null,
      batteryPercentage: json['battery_percentage'] != null
          ? SensorData.fromJson({
              ...json['battery_percentage'],
              'location': location,
            })
          : null,
      powerConsumption: json['power_consumption'] != null
          ? SensorData.fromJson({
              ...json['power_consumption'],
              'location': location,
            })
          : null,
      chargingStatus: json['charging_status'] != null
          ? SensorData.fromJson({
              ...json['charging_status'],
              'location': location,
            })
          : null,
      lowPowerMode: json['low_power_mode'] != null
          ? SensorData.fromJson({
              ...json['low_power_mode'],
              'location': location,
            })
          : null,
      wakeCount: json['wake_count'] != null
          ? SensorData.fromJson({...json['wake_count'], 'location': location})
          : null,
    );
  }

  bool get hasData =>
      temperature != null ||
      humidity != null ||
      co2 != null ||
      pressure != null ||
      voc != null ||
      iaq != null ||
      soilMoisture != null ||
      phLevel != null ||
      waterFlow != null ||
      tdsPpm != null ||
      dissolvedOxygen != null ||
      batteryVoltage != null ||
      solarVoltage != null ||
      batteryPercentage != null ||
      powerConsumption != null ||
      chargingStatus != null ||
      lowPowerMode != null ||
      wakeCount != null;
}

class SensorStats {
  final String location;
  final String sensor;
  final int hours;
  final double? min;
  final double? max;
  final double? mean;

  SensorStats({
    required this.location,
    required this.sensor,
    required this.hours,
    this.min,
    this.max,
    this.mean,
  });

  factory SensorStats.fromJson(Map<String, dynamic> json) {
    final stats = json['stats'] as Map<String, dynamic>? ?? {};
    return SensorStats(
      location: json['location'] ?? '',
      sensor: json['sensor'] ?? '',
      hours: json['hours'] ?? 24,
      min: stats['min']?.toDouble(),
      max: stats['max']?.toDouble(),
      mean: stats['mean']?.toDouble(),
    );
  }
}

enum SensorType {
  temperature,
  humidity,
  co2,
  pressure,
  voc,
  iaq,
  soilMoisture,
  phLevel,
  waterFlow,
  tdsPpm,
  dissolvedOxygen,
  batteryVoltage,
  solarVoltage,
  batteryPercentage,
  powerConsumption,
  chargingStatus,
  lowPowerMode,
  wakeCount;

  String get displayName {
    switch (this) {
      case SensorType.temperature:
        return 'Temperatura';
      case SensorType.humidity:
        return 'Humedad';
      case SensorType.co2:
        return 'CO₂';
      case SensorType.pressure:
        return 'Presión';
      case SensorType.voc:
        return 'VOC';
      case SensorType.iaq:
        return 'Calidad del Aire';
      case SensorType.soilMoisture:
        return 'Humedad del Suelo';
      case SensorType.phLevel:
        return 'Nivel de pH';
      case SensorType.waterFlow:
        return 'Flujo de Agua';
      case SensorType.tdsPpm:
        return 'TDS (Sólidos)';
      case SensorType.dissolvedOxygen:
        return 'Oxígeno Disuelto';
      case SensorType.batteryVoltage:
        return 'Voltaje Batería';
      case SensorType.solarVoltage:
        return 'Voltaje Solar';
      case SensorType.batteryPercentage:
        return 'Batería (%)';
      case SensorType.powerConsumption:
        return 'Consumo Energía';
      case SensorType.chargingStatus:
        return 'Estado Carga';
      case SensorType.lowPowerMode:
        return 'Modo Bajo Consumo';
      case SensorType.wakeCount:
        return 'Contador Wake';
    }
  }

  String get unit {
    switch (this) {
      case SensorType.temperature:
        return '°C';
      case SensorType.humidity:
        return '%';
      case SensorType.co2:
        return 'ppm';
      case SensorType.pressure:
        return 'hPa';
      case SensorType.voc:
        return 'ppb';
      case SensorType.iaq:
        return 'índice';
      case SensorType.soilMoisture:
        return '%';
      case SensorType.phLevel:
        return 'pH';
      case SensorType.waterFlow:
        return 'L/min';
      case SensorType.tdsPpm:
        return 'ppm';
      case SensorType.dissolvedOxygen:
        return 'mg/L';
      case SensorType.batteryVoltage:
        return 'V';
      case SensorType.solarVoltage:
        return 'V';
      case SensorType.batteryPercentage:
        return '%';
      case SensorType.powerConsumption:
        return 'mA';
      case SensorType.chargingStatus:
        return '';
      case SensorType.lowPowerMode:
        return '';
      case SensorType.wakeCount:
        return 'veces';
    }
  }

  IconData get icon {
    switch (this) {
      case SensorType.temperature:
        return Icons.thermostat;
      case SensorType.humidity:
        return Icons.water_drop;
      case SensorType.co2:
        return Icons.co2;
      case SensorType.pressure:
        return Icons.compress;
      case SensorType.voc:
        return Icons.air;
      case SensorType.iaq:
        return Icons.home;
      case SensorType.soilMoisture:
        return Icons.grass;
      case SensorType.phLevel:
        return Icons.science;
      case SensorType.waterFlow:
        return Icons.water;
      case SensorType.tdsPpm:
        return Icons.opacity;
      case SensorType.dissolvedOxygen:
        return Icons.bubble_chart;
      case SensorType.batteryVoltage:
        return Icons.battery_std;
      case SensorType.solarVoltage:
        return Icons.wb_sunny;
      case SensorType.batteryPercentage:
        return Icons.battery_charging_full;
      case SensorType.powerConsumption:
        return Icons.power;
      case SensorType.chargingStatus:
        return Icons.ev_station;
      case SensorType.lowPowerMode:
        return Icons.power_off;
      case SensorType.wakeCount:
        return Icons.schedule;
    }
  }

  Color get color {
    return Color(primaryColor);
  }

  String get apiName {
    switch (this) {
      case SensorType.temperature:
        return 'temperature';
      case SensorType.humidity:
        return 'humidity';
      case SensorType.co2:
        return 'co2';
      case SensorType.pressure:
        return 'pressure';
      case SensorType.voc:
        return 'voc';
      case SensorType.iaq:
        return 'iaq';
      case SensorType.soilMoisture:
        return 'soil_moisture';
      case SensorType.phLevel:
        return 'ph_level';
      case SensorType.waterFlow:
        return 'water_flow';
      case SensorType.tdsPpm:
        return 'tds';
      case SensorType.dissolvedOxygen:
        return 'dissolved_oxygen';
      case SensorType.batteryVoltage:
        return 'battery_voltage';
      case SensorType.solarVoltage:
        return 'solar_voltage';
      case SensorType.batteryPercentage:
        return 'battery_percentage';
      case SensorType.powerConsumption:
        return 'power_consumption';
      case SensorType.chargingStatus:
        return 'charging_status';
      case SensorType.lowPowerMode:
        return 'low_power_mode';
      case SensorType.wakeCount:
        return 'wake_count';
    }
  }

  int get primaryColor {
    switch (this) {
      case SensorType.temperature:
        return 0xFFFF6B35; // Orange-red
      case SensorType.humidity:
        return 0xFF2196F3; // Blue
      case SensorType.co2:
        return 0xFF4CAF50; // Green
      case SensorType.pressure:
        return 0xFF9C27B0; // Purple
      case SensorType.voc:
        return 0xFF607D8B; // Blue Grey
      case SensorType.iaq:
        return 0xFF3F51B5; // Indigo
      case SensorType.soilMoisture:
        return 0xFF8BC34A; // Light Green
      case SensorType.phLevel:
        return 0xFFE91E63; // Pink
      case SensorType.waterFlow:
        return 0xFF00BCD4; // Cyan
      case SensorType.tdsPpm:
        return 0xFF795548; // Brown
      case SensorType.dissolvedOxygen:
        return 0xFF03DAC6; // Teal
      case SensorType.batteryVoltage:
        return 0xFFFFC107; // Amber
      case SensorType.solarVoltage:
        return 0xFFFFEB3B; // Yellow
      case SensorType.batteryPercentage:
        return 0xFF4CAF50; // Green
      case SensorType.powerConsumption:
        return 0xFFF44336; // Red
      case SensorType.chargingStatus:
        return 0xFF2196F3; // Blue
      case SensorType.lowPowerMode:
        return 0xFF9E9E9E; // Grey
      case SensorType.wakeCount:
        return 0xFF673AB7; // Deep Purple
    }
  }

  List<double> get thresholds {
    switch (this) {
      case SensorType.temperature:
        return [15.0, 25.0]; // Low < 15°C, High > 25°C
      case SensorType.humidity:
        return [30.0, 70.0]; // Low < 30%, High > 70%
      case SensorType.co2:
        return [800.0, 1000.0]; // Warning > 800ppm, Critical > 1000ppm
      case SensorType.pressure:
        return [1010.0, 1020.0]; // Low < 1010hPa, High > 1020hPa
      case SensorType.voc:
        return [150.0, 300.0]; // Warning > 150ppb, Critical > 300ppb
      case SensorType.iaq:
        return [50.0, 100.0]; // Good < 50, Poor > 100
      case SensorType.soilMoisture:
        return [30.0, 50.0]; // Dry < 30%, Good > 50%
      case SensorType.phLevel:
        return [6.5, 7.5]; // Acidic < 6.5, Basic > 7.5
      case SensorType.waterFlow:
        return [1.0, 2.0]; // Low < 1L/min, High > 2L/min
      case SensorType.tdsPpm:
        return [300.0, 600.0]; // Good < 300ppm, High > 600ppm
      case SensorType.dissolvedOxygen:
        return [5.0, 7.0]; // Low < 5mg/L, Good > 7mg/L
      case SensorType.batteryVoltage:
        return [3.0, 4.2]; // Low < 3.0V, Full > 4.2V
      case SensorType.solarVoltage:
        return [0.0, 5.0]; // No sun < 0.1V, Good sun > 5.0V
      case SensorType.batteryPercentage:
        return [20.0, 80.0]; // Low < 20%, Good > 80%
      case SensorType.powerConsumption:
        return [50.0, 200.0]; // Low < 50mA, High > 200mA
      case SensorType.chargingStatus:
        return [0.0, 1.0]; // Not charging = 0, Charging = 1
      case SensorType.lowPowerMode:
        return [0.0, 1.0]; // Normal = 0, Low power = 1
      case SensorType.wakeCount:
        return [10.0, 50.0]; // Low activity < 10, High activity > 50
    }
  }
}
