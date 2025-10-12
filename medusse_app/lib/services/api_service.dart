import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:web_socket_channel/web_socket_channel.dart';
import '../models/sensor_data.dart';

class ApiService {
  static const String baseUrl = 'http://192.168.1.140:3001';
  static const String wsUrl = 'ws://192.168.1.140:3002';

  final http.Client _client = http.Client();
  WebSocketChannel? _wsChannel;

  // Singleton pattern
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  // Health check
  Future<Map<String, dynamic>> getHealth() async {
    try {
      final response = await _client
          .get(
            Uri.parse('$baseUrl/health'),
            headers: {'Content-Type': 'application/json'},
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Health check failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error connecting to API: $e');
    }
  }

  // Obtener ubicaciones disponibles
  Future<List<String>> getLocations() async {
    try {
      final response = await _client
          .get(
            Uri.parse('$baseUrl/api/locations'),
            headers: {'Content-Type': 'application/json'},
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return List<String>.from(data['locations'] ?? []);
      } else {
        throw Exception('Failed to load locations: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error loading locations: $e');
    }
  }

  // Obtener resumen de todas las ubicaciones
  Future<Map<String, LocationSummary>> getSummary() async {
    try {
      final response = await _client
          .get(
            Uri.parse('$baseUrl/api/summary'),
            headers: {'Content-Type': 'application/json'},
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final summary = data['summary'] as Map<String, dynamic>? ?? {};

        return summary.map(
          (location, locationData) => MapEntry(
            location,
            LocationSummary.fromJson(location, locationData),
          ),
        );
      } else {
        throw Exception('Failed to load summary: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error loading summary: $e');
    }
  }

  // Obtener últimos valores de una ubicación
  Future<LocationSummary> getLatestData(String location) async {
    try {
      final response = await _client
          .get(
            Uri.parse('$baseUrl/api/latest/$location'),
            headers: {'Content-Type': 'application/json'},
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return LocationSummary.fromJson(data['location'], data['data'] ?? {});
      } else {
        throw Exception('Failed to load latest data: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error loading latest data: $e');
    }
  }

  // Obtener datos históricos
  Future<List<SensorData>> getHistoricalData(
    String location,
    SensorType sensorType, {
    int hours = 24,
    String interval = '5m',
  }) async {
    try {
      final response = await _client
          .get(
            Uri.parse(
              '$baseUrl/api/data/$location/${sensorType.apiName}?hours=$hours&interval=$interval',
            ),
            headers: {'Content-Type': 'application/json'},
          )
          .timeout(const Duration(seconds: 15));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final dataList = data['data'] as List? ?? [];

        return dataList.map((item) => SensorData.fromJson(item)).toList();
      } else {
        throw Exception(
          'Failed to load historical data: ${response.statusCode}',
        );
      }
    } catch (e) {
      throw Exception('Error loading historical data: $e');
    }
  }

  // Obtener estadísticas
  Future<SensorStats> getStats(
    String location,
    SensorType sensorType, {
    int hours = 24,
  }) async {
    try {
      final response = await _client
          .get(
            Uri.parse(
              '$baseUrl/api/stats/$location/${sensorType.apiName}?hours=$hours',
            ),
            headers: {'Content-Type': 'application/json'},
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return SensorStats.fromJson(data);
      } else {
        throw Exception('Failed to load stats: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error loading stats: $e');
    }
  }

  // Conectar a WebSocket para datos en tiempo real
  Stream<Map<String, dynamic>> connectToRealTimeData() {
    try {
      _wsChannel?.sink.close();
      _wsChannel = WebSocketChannel.connect(Uri.parse(wsUrl));

      return _wsChannel!.stream.map((data) {
        try {
          return json.decode(data);
        } catch (e) {
          // Error parsing WebSocket data
          return <String, dynamic>{};
        }
      });
    } catch (e) {
      throw Exception('Error connecting to WebSocket: $e');
    }
  }

  // Cerrar conexión WebSocket
  void disconnectRealTime() {
    _wsChannel?.sink.close();
    _wsChannel = null;
  }

  // Verificar conectividad
  Future<bool> isConnected() async {
    try {
      await getHealth();
      return true;
    } catch (e) {
      return false;
    }
  }

  // Limpiar recursos
  void dispose() {
    _client.close();
    disconnectRealTime();
  }
}

// Extensión para formatear nombres de ubicaciones
extension LocationExtension on String {
  String get displayName {
    switch (toLowerCase()) {
      case 'aula20':
        return 'Aula 20';
      case 'aula21':
        return 'Aula 21';
      case 'laboratorio':
        return 'Laboratorio';
      default:
        return this;
    }
  }

  String get shortName {
    switch (toLowerCase()) {
      case 'aula20':
        return 'A20';
      case 'aula21':
        return 'A21';
      case 'laboratorio':
        return 'LAB';
      default:
        return substring(0, 3).toUpperCase();
    }
  }
}
