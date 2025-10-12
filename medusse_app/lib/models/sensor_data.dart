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

  LocationSummary({
    required this.location,
    this.temperature,
    this.humidity,
    this.co2,
    this.pressure,
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
    );
  }

  bool get hasData =>
      temperature != null ||
      humidity != null ||
      co2 != null ||
      pressure != null;
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
  pressure;

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
    }
  }
}
