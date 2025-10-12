import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/sensor_data.dart';
import '../services/api_service.dart';

class SensorProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();

  // Estado de la aplicación
  bool _isLoading = false;
  bool _isConnected = false;
  String? _error;

  // Datos
  List<String> _locations = [];
  Map<String, LocationSummary> _summary = {};
  final Map<String, List<SensorData>> _historicalData = {};
  final Map<String, SensorStats> _stats = {};

  // Stream para datos en tiempo real
  StreamSubscription? _realTimeSubscription;

  // Getters
  bool get isLoading => _isLoading;
  bool get isConnected => _isConnected;
  String? get error => _error;
  List<String> get locations => _locations;
  Map<String, LocationSummary> get summary => _summary;
  Map<String, List<SensorData>> get historicalData => _historicalData;
  Map<String, SensorStats> get stats => _stats;

  // Constructor
  SensorProvider() {
    _initialize();
  }

  // Inicialización
  Future<void> _initialize() async {
    await checkConnection();
    if (_isConnected) {
      await loadInitialData();
      _startRealTimeUpdates();
    }
  }

  // Verificar conexión con la API
  Future<void> checkConnection() async {
    try {
      _isConnected = await _apiService.isConnected();
      _error = null;
    } catch (e) {
      _isConnected = false;
      _error = 'Error de conexión: $e';
    }
    notifyListeners();
  }

  // Cargar datos iniciales
  Future<void> loadInitialData() async {
    _setLoading(true);

    try {
      // Cargar ubicaciones
      _locations = await _apiService.getLocations();

      // Cargar resumen
      _summary = await _apiService.getSummary();

      _error = null;
    } catch (e) {
      _error = 'Error cargando datos: $e';
      // Error loading initial data
    } finally {
      _setLoading(false);
    }
  }

  // Cargar datos históricos para una ubicación y sensor
  Future<void> loadHistoricalData(
    String location,
    SensorType sensorType, {
    int hours = 24,
    String interval = '5m',
  }) async {
    final key = '${location}_${sensorType.apiName}_${hours}h';

    try {
      final data = await _apiService.getHistoricalData(
        location,
        sensorType,
        hours: hours,
        interval: interval,
      );

      _historicalData[key] = data;
      _error = null;
      notifyListeners();
    } catch (e) {
      _error = 'Error cargando datos históricos: $e';
      // Error loading historical data
      notifyListeners();
    }
  }

  // Cargar estadísticas
  Future<void> loadStats(
    String location,
    SensorType sensorType, {
    int hours = 24,
  }) async {
    final key = '${location}_${sensorType.apiName}_${hours}h';

    try {
      final statsData = await _apiService.getStats(
        location,
        sensorType,
        hours: hours,
      );
      _stats[key] = statsData;
      _error = null;
      notifyListeners();
    } catch (e) {
      _error = 'Error cargando estadísticas: $e';
      // Error loading stats
      notifyListeners();
    }
  }

  // Obtener datos históricos desde el cache
  List<SensorData> getHistoricalData(
    String location,
    SensorType sensorType, {
    int hours = 24,
  }) {
    final key = '${location}_${sensorType.apiName}_${hours}h';
    return _historicalData[key] ?? [];
  }

  // Obtener estadísticas desde el cache
  SensorStats? getStats(
    String location,
    SensorType sensorType, {
    int hours = 24,
  }) {
    final key = '${location}_${sensorType.apiName}_${hours}h';
    return _stats[key];
  }

  // Iniciar actualizaciones en tiempo real
  void _startRealTimeUpdates() {
    try {
      _realTimeSubscription?.cancel();

      final stream = _apiService.connectToRealTimeData();
      _realTimeSubscription = stream.listen(
        (data) => _handleRealTimeData(data),
        onError: (error) {
          // WebSocket error
          _error = 'Error en tiempo real: $error';
          notifyListeners();
        },
      );
    } catch (e) {
      // Error starting real-time updates
      _error = 'Error iniciando tiempo real: $e';
      notifyListeners();
    }
  }

  // Manejar datos en tiempo real
  void _handleRealTimeData(Map<String, dynamic> message) {
    try {
      if (message['type'] == 'welcome') {
        // WebSocket connected
        return;
      }

      final topic = message['topic'] as String?;
      final data = message['data'] as Map<String, dynamic>?;

      if (topic == null || data == null) return;

      // Parsear topic: iescelia/location/sensor
      final topicParts = topic.split('/');
      if (topicParts.length != 3) return;

      final location = topicParts[1];
      final sensorType = topicParts[2];

      // Actualizar resumen con nuevo dato
      final sensorData = SensorData.fromJson(data);
      _updateSummaryWithNewData(location, sensorType, sensorData);

      notifyListeners();
    } catch (e) {
      // Error handling real-time data
    }
  }

  // Actualizar resumen con nuevo dato
  void _updateSummaryWithNewData(
    String location,
    String sensorType,
    SensorData data,
  ) {
    final currentSummary = _summary[location];

    if (currentSummary == null) {
      // Crear nuevo resumen si no existe
      _summary[location] = LocationSummary(
        location: location,
        temperature: sensorType == 'temperature' ? data : null,
        humidity: sensorType == 'humidity' ? data : null,
        co2: sensorType == 'co2' ? data : null,
        pressure: sensorType == 'pressure' ? data : null,
      );
    } else {
      // Actualizar resumen existente
      _summary[location] = LocationSummary(
        location: location,
        temperature: sensorType == 'temperature'
            ? data
            : currentSummary.temperature,
        humidity: sensorType == 'humidity' ? data : currentSummary.humidity,
        co2: sensorType == 'co2' ? data : currentSummary.co2,
        pressure: sensorType == 'pressure' ? data : currentSummary.pressure,
      );
    }
  }

  // Refrescar todos los datos
  Future<void> refresh() async {
    await checkConnection();
    if (_isConnected) {
      await loadInitialData();
    }
  }

  // Limpiar error
  void clearError() {
    _error = null;
    notifyListeners();
  }

  // Helper para cambiar estado de carga
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  // Obtener último valor de un sensor para una ubicación
  SensorData? getLatestSensorValue(String location, SensorType sensorType) {
    final locationSummary = _summary[location];
    if (locationSummary == null) return null;

    switch (sensorType) {
      case SensorType.temperature:
        return locationSummary.temperature;
      case SensorType.humidity:
        return locationSummary.humidity;
      case SensorType.co2:
        return locationSummary.co2;
      case SensorType.pressure:
        return locationSummary.pressure;
    }
  }

  // Verificar si hay alertas (valores fuera de rango normal)
  bool hasAlert(String location, SensorType sensorType) {
    final data = getLatestSensorValue(location, sensorType);
    if (data == null) return false;

    switch (sensorType) {
      case SensorType.temperature:
        return data.value < 18 || data.value > 28;
      case SensorType.humidity:
        return data.value < 30 || data.value > 70;
      case SensorType.co2:
        return data.value > 1000;
      case SensorType.pressure:
        return data.value < 1000 || data.value > 1030;
    }
  }

  // Obtener nivel de alerta
  AlertLevel getAlertLevel(String location, SensorType sensorType) {
    final data = getLatestSensorValue(location, sensorType);
    if (data == null) return AlertLevel.none;

    switch (sensorType) {
      case SensorType.temperature:
        if (data.value < 15 || data.value > 32) return AlertLevel.critical;
        if (data.value < 18 || data.value > 28) return AlertLevel.warning;
        return AlertLevel.normal;

      case SensorType.humidity:
        if (data.value < 20 || data.value > 80) return AlertLevel.critical;
        if (data.value < 30 || data.value > 70) return AlertLevel.warning;
        return AlertLevel.normal;

      case SensorType.co2:
        if (data.value > 1500) return AlertLevel.critical;
        if (data.value > 1000) return AlertLevel.warning;
        return AlertLevel.normal;

      case SensorType.pressure:
        if (data.value < 995 || data.value > 1035) return AlertLevel.critical;
        if (data.value < 1000 || data.value > 1030) return AlertLevel.warning;
        return AlertLevel.normal;
    }
  }

  @override
  void dispose() {
    _realTimeSubscription?.cancel();
    _apiService.dispose();
    super.dispose();
  }
}

enum AlertLevel {
  none,
  normal,
  warning,
  critical;

  String get displayName {
    switch (this) {
      case AlertLevel.none:
        return 'Sin datos';
      case AlertLevel.normal:
        return 'Normal';
      case AlertLevel.warning:
        return 'Advertencia';
      case AlertLevel.critical:
        return 'Crítico';
    }
  }
}
