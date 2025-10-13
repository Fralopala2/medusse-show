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
  final SensorData? soilMoisture;
  final SensorData? phLevel;
  final SensorData? waterFlow;
  final SensorData? tdsPpm;
  final SensorData? dissolvedOxygen;

  LocationSummary({
    required this.location,
    this.temperature,
    this.humidity,
    this.co2,
    this.pressure,
    this.voc,
    this.soilMoisture,
    this.phLevel,
    this.waterFlow,
    this.tdsPpm,
    this.dissolvedOxygen,
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
      tdsPpm: json['tds_ppm'] != null
          ? SensorData.fromJson({...json['tds_ppm'], 'location': location})
          : null,
      dissolvedOxygen: json['dissolved_oxygen'] != null
          ? SensorData.fromJson({
              ...json['dissolved_oxygen'],
              'location': location,
            })
          : null,
    );
  }

  bool get hasData =>
      temperature != null ||
      humidity != null ||
      co2 != null ||
      pressure != null ||
      voc != null ||
      soilMoisture != null ||
      phLevel != null ||
      waterFlow != null ||
      tdsPpm != null ||
      dissolvedOxygen != null;
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
  soilMoisture,
  phLevel,
  waterFlow,
  tdsPpm,
  dissolvedOxygen;

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
      case SensorType.soilMoisture:
        return '%';
      case SensorType.phLevel:
        return 'pH';
      case SensorType.waterFlow:
        return 'L/min';
      case SensorType.tdsPpm:
        return 'ppm';
      case SensorType.dissolvedOxygen:
        return 'ppm';
    }
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
      case SensorType.soilMoisture:
        return 'soil_moisture';
      case SensorType.phLevel:
        return 'ph_level';
      case SensorType.waterFlow:
        return 'water_flow';
      case SensorType.tdsPpm:
        return 'tds_ppm';
      case SensorType.dissolvedOxygen:
        return 'dissolved_oxygen';
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
      case SensorType.soilMoisture:
        return [30.0, 50.0]; // Dry < 30%, Good > 50%
      case SensorType.phLevel:
        return [6.5, 7.5]; // Acidic < 6.5, Basic > 7.5
      case SensorType.waterFlow:
        return [1.0, 2.0]; // Low < 1L/min, High > 2L/min
      case SensorType.tdsPpm:
        return [300.0, 600.0]; // Good < 300ppm, High > 600ppm
      case SensorType.dissolvedOxygen:
        return [5.0, 7.0]; // Low < 5ppm, Good > 7ppm
    }
  }
}
