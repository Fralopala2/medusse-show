import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/sensor_data.dart';
import '../models/system_alert.dart';
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
  List<SystemAlert> _systemAlerts = [];

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
  List<SystemAlert> get systemAlerts => List.unmodifiable(_systemAlerts);

  List<SystemAlert> systemAlertsForLocation(String location) {
    return _systemAlerts
        .where((a) => !a.isResolved && _locationMatches(a.locationName, location))
        .toList();
  }

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

      await _loadSystemAlerts();

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

      // Ruta 1: Mensajes con { topic, data }
      final topic = message['topic'] as String?;
      final data = message['data'] as Map<String, dynamic>?;

      if (topic != null && data != null) {
        // Parsear topic: iescelia/location/sensor
        final topicParts = topic.split('/');
        if (topicParts.length != 3) return;

        final location = topicParts[1];
        final sensorType = topicParts[2];

        // Actualizar resumen con nuevo dato
        final sensorData = SensorData.fromJson(data);
        _updateSummaryWithNewData(location, sensorType, sensorData);
        notifyListeners();
        return;
      }

      // Ruta 2: Mensajes "flat" { location, sensor, value, timestamp }
      final flatLocation = message['location'] as String?;
      final flatSensor = message['sensor'] as String?;
      final flatValue = message['value'];
      if (flatLocation != null && flatSensor != null && flatValue != null) {
        final ts = message['timestamp'] ?? message['time'];
        final sensorData = SensorData.fromJson({
          'value': flatValue,
          'sensor': flatSensor,
          'time': ts ?? DateTime.now().toIso8601String(),
          'location': flatLocation,
          'node_id': message['node_id'] ?? '',
        });
        _updateSummaryWithNewData(flatLocation, flatSensor, sensorData);
        notifyListeners();
        return;
      }
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
        voc: sensorType == 'voc' ? data : null,
        iaq: sensorType == 'iaq' ? data : null,
        soilMoisture: sensorType == 'soil_moisture' ? data : null,
        phLevel: sensorType == 'ph_level' ? data : null,
        waterFlow: sensorType == 'water_flow' ? data : null,
        tdsPpm: sensorType == 'tds' ? data : null,
        dissolvedOxygen: sensorType == 'dissolved_oxygen' ? data : null,
        batteryVoltage: sensorType == 'battery_voltage' ? data : null,
        solarVoltage: sensorType == 'solar_voltage' ? data : null,
        batteryPercentage: sensorType == 'battery_percentage' ? data : null,
        powerConsumption: sensorType == 'power_consumption' ? data : null,
        chargingStatus: sensorType == 'charging_status' ? data : null,
        lowPowerMode: sensorType == 'low_power_mode' ? data : null,
        wakeCount: sensorType == 'wake_count' ? data : null,
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
        voc: sensorType == 'voc' ? data : currentSummary.voc,
        iaq: sensorType == 'iaq' ? data : currentSummary.iaq,
        soilMoisture: sensorType == 'soil_moisture'
            ? data
            : currentSummary.soilMoisture,
        phLevel: sensorType == 'ph_level' ? data : currentSummary.phLevel,
        waterFlow: sensorType == 'water_flow' ? data : currentSummary.waterFlow,
        tdsPpm: sensorType == 'tds' ? data : currentSummary.tdsPpm,
        dissolvedOxygen: sensorType == 'dissolved_oxygen'
            ? data
            : currentSummary.dissolvedOxygen,
        batteryVoltage: sensorType == 'battery_voltage'
            ? data
            : currentSummary.batteryVoltage,
        solarVoltage: sensorType == 'solar_voltage'
            ? data
            : currentSummary.solarVoltage,
        batteryPercentage: sensorType == 'battery_percentage'
            ? data
            : currentSummary.batteryPercentage,
        powerConsumption: sensorType == 'power_consumption'
            ? data
            : currentSummary.powerConsumption,
        chargingStatus: sensorType == 'charging_status'
            ? data
            : currentSummary.chargingStatus,
        lowPowerMode: sensorType == 'low_power_mode'
            ? data
            : currentSummary.lowPowerMode,
        wakeCount: sensorType == 'wake_count' ? data : currentSummary.wakeCount,
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
      case SensorType.voc:
        return locationSummary.voc;
      case SensorType.iaq:
        return locationSummary.iaq;
      case SensorType.soilMoisture:
        return locationSummary.soilMoisture;
      case SensorType.phLevel:
        return locationSummary.phLevel;
      case SensorType.waterFlow:
        return locationSummary.waterFlow;
      case SensorType.tdsPpm:
        return locationSummary.tdsPpm;
      case SensorType.dissolvedOxygen:
        return locationSummary.dissolvedOxygen;
      case SensorType.batteryVoltage:
        return locationSummary.batteryVoltage;
      case SensorType.solarVoltage:
        return locationSummary.solarVoltage;
      case SensorType.batteryPercentage:
        return locationSummary.batteryPercentage;
      case SensorType.powerConsumption:
        return locationSummary.powerConsumption;
      case SensorType.chargingStatus:
        return locationSummary.chargingStatus;
      case SensorType.lowPowerMode:
        return locationSummary.lowPowerMode;
      case SensorType.wakeCount:
        return locationSummary.wakeCount;
    }
  }

  Future<void> _loadSystemAlerts() async {
    try {
      _systemAlerts = await _apiService.getSystemAlerts();
    } catch (_) {
      // No bloquear la app si falla la lista de alertas operativas
      _systemAlerts = [];
    }
    notifyListeners();
  }

  bool _locationMatches(String alertLocation, String appLocation) {
    return alertLocation.toLowerCase() == appLocation.toLowerCase();
  }

  bool hasSystemAlert(String location, SensorType sensorType) {
    return _systemAlerts.any(
      (a) =>
          !a.isResolved &&
          _locationMatches(a.locationName, location) &&
          a.sensorType == sensorType.apiName,
    );
  }

  // Verificar si hay alertas (umbrales locales o alertas del panel admin)
  bool hasAlert(String location, SensorType sensorType) {
    if (hasSystemAlert(location, sensorType)) {
      return true;
    }

    final data = getLatestSensorValue(location, sensorType);
    if (data == null) return false;

    final thresholds = sensorType.thresholds;
    switch (sensorType) {
      case SensorType.temperature:
      case SensorType.humidity:
      case SensorType.pressure:
      case SensorType.phLevel:
      case SensorType.soilMoisture:
      case SensorType.batteryVoltage:
      case SensorType.solarVoltage:
      case SensorType.batteryPercentage:
        return data.value < thresholds[0] || data.value > thresholds[1];
      case SensorType.co2:
      case SensorType.voc:
      case SensorType.iaq:
      case SensorType.tdsPpm:
      case SensorType.powerConsumption:
        return data.value > thresholds[0];
      case SensorType.waterFlow:
      case SensorType.dissolvedOxygen:
        return data.value < thresholds[0];
      case SensorType.chargingStatus:
        return data.value < 0.5; // Not charging
      case SensorType.lowPowerMode:
        return data.value > 0.5; // Low power mode active
      case SensorType.wakeCount:
        return data.value > thresholds[1]; // Too many wake-ups
    }
  }

  // Obtener nivel de alerta
  AlertLevel getAlertLevel(String location, SensorType sensorType) {
    final data = getLatestSensorValue(location, sensorType);
    if (data == null) return AlertLevel.none;

    final thresholds = sensorType.thresholds;

    switch (sensorType) {
      case SensorType.temperature:
        if (data.value < 15 || data.value > 32) return AlertLevel.critical;
        if (data.value < thresholds[0] || data.value > thresholds[1]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.humidity:
      case SensorType.soilMoisture:
        if (data.value < 20 || data.value > 80) return AlertLevel.critical;
        if (data.value < thresholds[0] || data.value > thresholds[1]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.co2:
        if (data.value > 1500) return AlertLevel.critical;
        if (data.value > thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.voc:
        if (data.value > 500) return AlertLevel.critical;
        if (data.value > thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.pressure:
        if (data.value < 995 || data.value > 1035) return AlertLevel.critical;
        if (data.value < thresholds[0] || data.value > thresholds[1]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.phLevel:
        if (data.value < 6.0 || data.value > 8.0) return AlertLevel.critical;
        if (data.value < thresholds[0] || data.value > thresholds[1]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.waterFlow:
        if (data.value < 0.5) return AlertLevel.critical;
        if (data.value < thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.tdsPpm:
        if (data.value > 1000) return AlertLevel.critical;
        if (data.value > thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.dissolvedOxygen:
        if (data.value < 3.0) return AlertLevel.critical;
        if (data.value < thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.batteryVoltage:
        if (data.value < 3.0) return AlertLevel.critical;
        if (data.value < thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.solarVoltage:
        if (data.value < 1.0) return AlertLevel.critical;
        if (data.value < thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.batteryPercentage:
        if (data.value < 10) return AlertLevel.critical;
        if (data.value < thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.powerConsumption:
        if (data.value > 300) return AlertLevel.critical;
        if (data.value > thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.iaq:
        if (data.value > 200) return AlertLevel.critical;
        if (data.value > thresholds[0]) {
          return AlertLevel.warning;
        }
        return AlertLevel.normal;

      case SensorType.chargingStatus:
        return data.value > 0.5 ? AlertLevel.normal : AlertLevel.warning;

      case SensorType.lowPowerMode:
        return data.value > 0.5 ? AlertLevel.warning : AlertLevel.normal;

      case SensorType.wakeCount:
        if (data.value > 100) {
          return AlertLevel.critical;
        }
        if (data.value > thresholds[1]) {
          return AlertLevel.warning;
        }
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
