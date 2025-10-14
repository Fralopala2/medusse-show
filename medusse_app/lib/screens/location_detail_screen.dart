import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/sensor_provider.dart';
import '../models/sensor_data.dart';
import '../services/api_service.dart';
import '../widgets/sensor_card.dart';
import '../main.dart';
import 'sensor_chart_screen.dart';

class LocationDetailScreen extends StatefulWidget {
  final String? location;

  const LocationDetailScreen({super.key, this.location});

  @override
  State<LocationDetailScreen> createState() => _LocationDetailScreenState();
}

class _LocationDetailScreenState extends State<LocationDetailScreen> {
  late String currentLocation;

  @override
  void initState() {
    super.initState();
    // Obtener ubicación de los argumentos de ruta o usar la proporcionada
    currentLocation = widget.location ?? '';
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    // Si no tenemos ubicación, intentar obtenerla de los argumentos de ruta
    if (currentLocation.isEmpty) {
      final args = ModalRoute.of(context)?.settings.arguments as String?;
      if (args != null) {
        currentLocation = args;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (currentLocation.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Error')),
        body: const Center(child: Text('Ubicación no especificada')),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(currentLocation.displayName),
        actions: [
          Consumer<SensorProvider>(
            builder: (context, provider, child) {
              return IconButton(
                icon: const Icon(Icons.refresh),
                onPressed: () => provider.refresh(),
                tooltip: 'Actualizar datos',
              );
            },
          ),
        ],
      ),
      body: Consumer<SensorProvider>(
        builder: (context, provider, child) {
          final summary = provider.summary[currentLocation];

          if (provider.isLoading && summary == null) {
            return const Center(child: CircularProgressIndicator());
          }

          if (summary == null || !summary.hasData) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.sensors_off, size: 64, color: Colors.grey[400]),
                  const SizedBox(height: 16),
                  Text(
                    'No hay datos para ${currentLocation.displayName}',
                    style: Theme.of(
                      context,
                    ).textTheme.titleLarge?.copyWith(color: Colors.grey[600]),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton.icon(
                    onPressed: provider.refresh,
                    icon: const Icon(Icons.refresh),
                    label: const Text('Actualizar'),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: provider.refresh,
            child: CustomScrollView(
              slivers: [
                // Información general de la ubicación
                SliverToBoxAdapter(
                  child: Container(
                    margin: const EdgeInsets.all(16),
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          currentLocation.locationColor.withValues(alpha: 0.1),
                          currentLocation.locationColor.withValues(alpha: 0.05),
                        ],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: currentLocation.locationColor.withValues(
                          alpha: 0.2,
                        ),
                      ),
                    ),
                    child: Column(
                      children: [
                        Icon(
                          Icons.location_on,
                          size: 48,
                          color: currentLocation.locationColor,
                        ),
                        const SizedBox(height: 12),
                        Text(
                          currentLocation.displayName,
                          style: Theme.of(context).textTheme.headlineSmall
                              ?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: currentLocation.locationColor,
                              ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Monitoreo en tiempo real',
                          style: Theme.of(context).textTheme.bodyMedium
                              ?.copyWith(color: Colors.grey[600]),
                        ),
                      ],
                    ),
                  ),
                ),

                // Tarjetas de sensores
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Text(
                      'Sensores',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),

                SliverPadding(
                  padding: const EdgeInsets.all(16),
                  sliver: SliverGrid(
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2, // siempre 2 columnas
                      childAspectRatio: 1.1,
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 12,
                    ),
                    delegate: SliverChildListDelegate([
                      SensorCard(
                        sensorType: SensorType.temperature,
                        data: summary.temperature,
                        showAlert: provider.hasAlert(
                          currentLocation,
                          SensorType.temperature,
                        ),
                        onTap: () => _navigateToChart(SensorType.temperature),
                      ),
                      SensorCard(
                        sensorType: SensorType.humidity,
                        data: summary.humidity,
                        showAlert: provider.hasAlert(
                          currentLocation,
                          SensorType.humidity,
                        ),
                        onTap: () => _navigateToChart(SensorType.humidity),
                      ),
                      SensorCard(
                        sensorType: SensorType.co2,
                        data: summary.co2,
                        showAlert: provider.hasAlert(
                          currentLocation,
                          SensorType.co2,
                        ),
                        onTap: () => _navigateToChart(SensorType.co2),
                      ),
                      SensorCard(
                        sensorType: SensorType.batteryPercentage,
                        data: summary.batteryPercentage,
                        showAlert: provider.hasAlert(
                          currentLocation,
                          SensorType.batteryPercentage,
                        ),
                        onTap: () =>
                            _navigateToChart(SensorType.batteryPercentage),
                      ),
                      SensorCard(
                        sensorType: SensorType.iaq,
                        data: summary.iaq,
                        showAlert: provider.hasAlert(
                          currentLocation,
                          SensorType.iaq,
                        ),
                        onTap: () => _navigateToChart(SensorType.iaq),
                      ),
                      SensorCard(
                        sensorType: SensorType.powerConsumption,
                        data: summary.powerConsumption,
                        showAlert: provider.hasAlert(
                          currentLocation,
                          SensorType.powerConsumption,
                        ),
                        onTap: () =>
                            _navigateToChart(SensorType.powerConsumption),
                      ),
                    ]),
                  ),
                ),

                // Botones de acción
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: ElevatedButton.icon(
                                onPressed: () => _showAllCharts(),
                                icon: const Icon(Icons.analytics),
                                label: const Text('Ver Gráficos'),
                                style: ElevatedButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 12,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: OutlinedButton.icon(
                                onPressed: () => _showStats(),
                                icon: const Icon(Icons.bar_chart),
                                label: const Text('Estadísticas'),
                                style: OutlinedButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 12,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),

                // Espacio adicional
                const SliverToBoxAdapter(child: SizedBox(height: 32)),
              ],
            ),
          );
        },
      ),
    );
  }

  void _navigateToChart(SensorType sensorType) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => SensorChartScreen(
          location: currentLocation,
          sensorType: sensorType,
        ),
      ),
    );
  }

  void _showAllCharts() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Seleccionar Sensor',
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            ...SensorType.values.map(
              (sensorType) => ListTile(
                leading: Icon(sensorType.icon, color: sensorType.color),
                title: Text(sensorType.displayName),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {
                  Navigator.pop(context);
                  _navigateToChart(sensorType);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showStats() {
    // Implementar pantalla de estadísticas detalladas
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Estadísticas detalladas - Próximamente')),
    );
  }
}
