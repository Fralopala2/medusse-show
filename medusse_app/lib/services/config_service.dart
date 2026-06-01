import 'package:shared_preferences/shared_preferences.dart';

class ConfigService {
  static const String _apiUrlKey = 'api_base_url';
  static const String _wsUrlKey = 'websocket_url';

  // URLs por defecto (10.0.2.2 para emulador Android, localhost para otros)
  static const String _defaultApiUrl = 'http://10.0.2.2:4001';
  static const String _defaultWsUrl = 'ws://10.0.2.2:4002';

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
  String get apiBaseUrl {
    final stored = _prefs?.getString(_apiUrlKey) ?? _defaultApiUrl;
    return stored.trim().replaceAll(RegExp(r'#+$'), '');
  }

  /// WebSocket en Medusse usa puerto API+1 (4001 → 4002) y esquema ws://
  String get webSocketUrl {
    final stored = _prefs?.getString(_wsUrlKey);
    if (stored == null || stored.trim().isEmpty) {
      return deriveWebSocketUrl(apiBaseUrl);
    }
    return normalizeWebSocketUrl(stored);
  }

  /// A partir de http://host:4001 genera ws://host:4002
  static String deriveWebSocketUrl(String apiUrl) {
    final cleaned = apiUrl.trim().replaceAll(RegExp(r'#+$'), '');
    final uri = Uri.tryParse(cleaned);
    if (uri == null || uri.host.isEmpty) {
      return _defaultWsUrl;
    }

    var port = uri.hasPort ? uri.port : 4001;
    if (port == 4001) {
      port = 4002;
    } else if (port == 80 || port == 0) {
      port = 4002;
    }

    final wsScheme = (uri.scheme == 'https') ? 'wss' : 'ws';
    return Uri(scheme: wsScheme, host: uri.host, port: port).toString();
  }

  /// Corrige http:// en puerto 4001 u otras URLs mal guardadas
  static String normalizeWebSocketUrl(String url) {
    var trimmed = url.trim().replaceAll(RegExp(r'#+$'), '');
    if (trimmed.isEmpty) {
      return _defaultWsUrl;
    }

    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return deriveWebSocketUrl(trimmed);
    }

    final uri = Uri.tryParse(trimmed);
    if (uri == null || uri.host.isEmpty) {
      return _defaultWsUrl;
    }

    if (uri.scheme != 'ws' && uri.scheme != 'wss') {
      return deriveWebSocketUrl('http://${uri.host}:${uri.hasPort ? uri.port : 4001}');
    }

    if (uri.port == 4001) {
      return Uri(
        scheme: uri.scheme,
        host: uri.host,
        port: 4002,
      ).toString();
    }

    return trimmed;
  }

  // Setters para actualizar las URLs
  Future<void> setApiBaseUrl(String url) async {
    await _prefs?.setString(_apiUrlKey, url);
  }

  Future<void> setWebSocketUrl(String url) async {
    await _prefs?.setString(_wsUrlKey, url);
  }

  // Método para actualizar ambas URLs de una vez
  Future<void> setServerConfig(String apiUrl, String wsUrl) async {
    final api = apiUrl.trim().replaceAll(RegExp(r'#+$'), '');
    var ws = wsUrl.trim().replaceAll(RegExp(r'#+$'), '');
    if (ws.isEmpty || ws.startsWith('http')) {
      ws = deriveWebSocketUrl(api);
    } else {
      ws = normalizeWebSocketUrl(ws);
    }
    await Future.wait([setApiBaseUrl(api), setWebSocketUrl(ws)]);
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
    'Emulador Android': {
      'api': 'http://10.0.2.2:4001',
      'ws': 'ws://10.0.2.2:4002',
    },
    'Local (Windows/Chrome)': {
      'api': 'http://localhost:4001',
      'ws': 'ws://localhost:4002',
    },
    'Red Local (192.168.1.140)': {
      'api': 'http://192.168.1.140:4001',
      'ws': 'ws://192.168.1.140:4002',
    },
    'Red Local (plantilla IP)': {
      'api': 'http://192.168.1.148:4001',
      'ws': 'ws://192.168.1.148:4002',
    },
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
