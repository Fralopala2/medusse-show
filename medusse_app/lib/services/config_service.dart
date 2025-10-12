import 'package:shared_preferences/shared_preferences.dart';

class ConfigService {
  static const String _apiUrlKey = 'api_base_url';
  static const String _wsUrlKey = 'websocket_url';

  // URLs por defecto (localhost para desarrollo)
  static const String _defaultApiUrl = 'http://localhost:3001';
  static const String _defaultWsUrl = 'ws://localhost:3002';

  static ConfigService? _instance;
  SharedPreferences? _prefs;

  // Singleton pattern
  static Future<ConfigService> getInstance() async {
    _instance ??= ConfigService._internal();
    await _instance!._init();
    return _instance!;
  }

  ConfigService._internal();

  Future<void> _init() async {
    _prefs ??= await SharedPreferences.getInstance();
  }

  // Getters para las URLs actuales
  String get apiBaseUrl => _prefs?.getString(_apiUrlKey) ?? _defaultApiUrl;
  String get webSocketUrl => _prefs?.getString(_wsUrlKey) ?? _defaultWsUrl;

  // Setters para actualizar las URLs
  Future<void> setApiBaseUrl(String url) async {
    await _prefs?.setString(_apiUrlKey, url);
  }

  Future<void> setWebSocketUrl(String url) async {
    await _prefs?.setString(_wsUrlKey, url);
  }

  // Método para actualizar ambas URLs de una vez
  Future<void> setServerConfig(String apiUrl, String wsUrl) async {
    await Future.wait([setApiBaseUrl(apiUrl), setWebSocketUrl(wsUrl)]);
  }

  // Método para resetear a valores por defecto
  Future<void> resetToDefaults() async {
    await Future.wait([
      setApiBaseUrl(_defaultApiUrl),
      setWebSocketUrl(_defaultWsUrl),
    ]);
  }

  // Configuraciones predefinidas comunes
  static const Map<String, Map<String, String>> presetConfigs = {
    'Local (Docker)': {
      'api': 'http://localhost:3001',
      'ws': 'ws://localhost:3002',
    },
    'Red Local (192.168.1.140)': {
      'api': 'http://192.168.1.140:3001',
      'ws': 'ws://192.168.1.140:3002',
    },
    'Simulación': {'api': 'http://127.0.0.1:3001', 'ws': 'ws://127.0.0.1:3002'},
  };

  // Aplicar configuración predefinida
  Future<void> applyPresetConfig(String presetName) async {
    final config = presetConfigs[presetName];
    if (config != null) {
      await setServerConfig(config['api']!, config['ws']!);
    }
  }

  // Obtener configuración actual como Map
  Map<String, String> getCurrentConfig() {
    return {'api': apiBaseUrl, 'ws': webSocketUrl};
  }

  // Validar si una URL es válida
  static bool isValidUrl(String url) {
    try {
      final uri = Uri.parse(url);
      return uri.hasScheme &&
          (uri.scheme == 'http' ||
              uri.scheme == 'https' ||
              uri.scheme == 'ws' ||
              uri.scheme == 'wss');
    } catch (e) {
      return false;
    }
  }
}
