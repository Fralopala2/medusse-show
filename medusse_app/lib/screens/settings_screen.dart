import 'package:flutter/material.dart';
import '../services/config_service.dart';
import '../services/api_service.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final _apiUrlController = TextEditingController();
  final _wsUrlController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  late ConfigService _configService;
  bool _isLoading = true;
  bool _isTestingConnection = false;
  String? _connectionStatus;

  @override
  void initState() {
    super.initState();
    _loadCurrentConfig();
  }

  Future<void> _loadCurrentConfig() async {
    _configService = await ConfigService.getInstance();
    _apiUrlController.text = _configService.apiBaseUrl;
    _wsUrlController.text = _configService.webSocketUrl;
    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Configuración del Servidor'),
        actions: [
          IconButton(
            icon: const Icon(Icons.save),
            onPressed: _saveConfiguration,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _buildConnectionStatus(),
              const SizedBox(height: 20),
              _buildPresetConfigurations(),
              const SizedBox(height: 30),
              _buildCustomConfiguration(),
              const SizedBox(height: 30),
              _buildActionButtons(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildConnectionStatus() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              children: [
                Icon(
                  _connectionStatus == 'success'
                      ? Icons.check_circle
                      : _connectionStatus == 'error'
                      ? Icons.error
                      : Icons.info_outline,
                  color: _connectionStatus == 'success'
                      ? Colors.green
                      : _connectionStatus == 'error'
                      ? Colors.red
                      : Colors.grey,
                ),
                const SizedBox(width: 8),
                const Text(
                  'Estado de Conexión',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              _connectionStatus == 'success'
                  ? 'Conectado al servidor correctamente'
                  : _connectionStatus == 'error'
                  ? 'Error de conexión con el servidor'
                  : 'Presiona "Probar Conexión" para verificar',
              style: TextStyle(
                color: _connectionStatus == 'success'
                    ? Colors.green
                    : _connectionStatus == 'error'
                    ? Colors.red
                    : Colors.grey[600],
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton.icon(
              onPressed: _isTestingConnection ? null : _testConnection,
              icon: _isTestingConnection
                  ? const SizedBox(
                      width: 16,
                      height: 16,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Icon(Icons.wifi_find),
              label: Text(
                _isTestingConnection ? 'Probando...' : 'Probar Conexión',
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPresetConfigurations() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Configuraciones Predefinidas',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            ...ConfigService.presetConfigs.entries.map(
              (entry) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: ListTile(
                  title: Text(entry.key),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('API: ${entry.value['api']}'),
                      Text('WS: ${entry.value['ws']}'),
                    ],
                  ),
                  trailing: ElevatedButton(
                    onPressed: () => _applyPresetConfig(entry.key, entry.value),
                    child: const Text('Usar'),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCustomConfiguration() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Configuración Personalizada',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _apiUrlController,
              decoration: const InputDecoration(
                labelText: 'URL de la API',
                hintText: 'http://192.168.1.100:3001',
                prefixIcon: Icon(Icons.api),
                border: OutlineInputBorder(),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Por favor ingresa la URL de la API';
                }
                if (!ConfigService.isValidUrl(value)) {
                  return 'URL inválida (debe empezar con http:// o https://)';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _wsUrlController,
              decoration: const InputDecoration(
                labelText: 'URL del WebSocket',
                hintText: 'ws://192.168.1.100:3002',
                prefixIcon: Icon(Icons.settings_ethernet),
                border: OutlineInputBorder(),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Por favor ingresa la URL del WebSocket';
                }
                if (!ConfigService.isValidUrl(value)) {
                  return 'URL inválida (debe empezar con ws:// o wss://)';
                }
                return null;
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButtons() {
    return Column(
      children: [
        ElevatedButton.icon(
          onPressed: _saveConfiguration,
          icon: const Icon(Icons.save),
          label: const Text('Guardar Configuración'),
          style: ElevatedButton.styleFrom(
            minimumSize: const Size.fromHeight(48),
          ),
        ),
        const SizedBox(height: 12),
        OutlinedButton.icon(
          onPressed: _resetToDefaults,
          icon: const Icon(Icons.restore),
          label: const Text('Restaurar por Defecto'),
          style: OutlinedButton.styleFrom(
            minimumSize: const Size.fromHeight(48),
          ),
        ),
      ],
    );
  }

  void _applyPresetConfig(String presetName, Map<String, String> config) {
    _apiUrlController.text = config['api']!;
    _wsUrlController.text = config['ws']!;

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Configuración "$presetName" aplicada'),
          action: SnackBarAction(
            label: 'Guardar',
            onPressed: _saveConfiguration,
          ),
        ),
      );
    }
  }

  Future<void> _saveConfiguration() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    try {
      await _configService.setServerConfig(
        _apiUrlController.text.trim(),
        _wsUrlController.text.trim(),
      );

      // Reinicializar ApiService con la nueva configuración
      ApiService().updateConfiguration();

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Configuración guardada correctamente'),
            backgroundColor: Colors.green,
          ),
        );

        // Opcional: probar conexión automáticamente después de guardar
        _testConnection();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error al guardar: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  Future<void> _resetToDefaults() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Restaurar Configuración'),
        content: const Text(
          '¿Estás seguro de que quieres restaurar la configuración por defecto? '
          'Esto sobrescribirá tu configuración actual.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Restaurar'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      await _configService.resetToDefaults();
      _apiUrlController.text = _configService.apiBaseUrl;
      _wsUrlController.text = _configService.webSocketUrl;

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Configuración restaurada a valores por defecto'),
          ),
        );
      }
    }
  }

  Future<void> _testConnection() async {
    setState(() {
      _isTestingConnection = true;
      _connectionStatus = null;
    });

    try {
      // Temporalmente actualizar ApiService con las URLs actuales para probar
      final tempApiService = ApiService();
      await tempApiService.testConnection(
        _apiUrlController.text.trim(),
        _wsUrlController.text.trim(),
      );

      setState(() {
        _connectionStatus = 'success';
      });
    } catch (e) {
      setState(() {
        _connectionStatus = 'error';
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error de conexión: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      setState(() {
        _isTestingConnection = false;
      });
    }
  }

  @override
  void dispose() {
    _apiUrlController.dispose();
    _wsUrlController.dispose();
    super.dispose();
  }
}
