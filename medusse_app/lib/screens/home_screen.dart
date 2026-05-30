import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/sensor_provider.dart';
import '../models/sensor_data.dart';
import '../widgets/location_card.dart';
import '../widgets/connection_status.dart';
import 'location_detail_screen.dart';
import 'settings_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    // Refrescar datos al iniciar
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SensorProvider>().refresh();
    });
  }

  void _navigateToSettings() {
    Navigator.of(context)
        .push(MaterialPageRoute(builder: (context) => const SettingsScreen()))
        .then((_) {
          // Refrescar datos cuando se vuelve de la configuración
          // por si se cambió la URL del servidor
          if (mounted) {
            context.read<SensorProvider>().refresh();
          }
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Medusse IoT'),
        actions: [
          Consumer<SensorProvider>(
            builder: (context, provider, child) {
              return IconButton(
                icon: Icon(
                  provider.isConnected ? Icons.cloud_done : Icons.cloud_off,
                  color: provider.isConnected ? Colors.green : Colors.red,
                ),
                onPressed: () => provider.refresh(),
                tooltip: provider.isConnected ? 'Conectado' : 'Desconectado',
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => _navigateToSettings(),
            tooltip: 'Configuración del Servidor',
          ),
        ],
      ),
      body: SafeArea(
        top: false,
        bottom: true,
        child: Consumer<SensorProvider>(
          builder: (context, provider, child) {
            if (provider.isLoading && provider.summary.isEmpty) {
              return const Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircularProgressIndicator(),
                    SizedBox(height: 16),
                    Text('Cargando datos de sensores...'),
                  ],
                ),
              );
            }

            return RefreshIndicator(
              onRefresh: provider.refresh,
              child: CustomScrollView(
                slivers: [
                  // Estado de conexión
                  SliverToBoxAdapter(
                    child: ConnectionStatus(
                      isConnected: provider.isConnected,
                      error: provider.error,
                      onRetry: provider.refresh,
                    ),
                  ),

                  // Resumen general
                  if (provider.summary.isNotEmpty) ...[
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Text(
                          'Resumen General',
                          style: Theme.of(context).textTheme.headlineSmall
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                    SliverToBoxAdapter(
                      child: _buildSummaryCards(context, provider),
                    ),
                  ],

                  // Ubicaciones
                  if (provider.locations.isNotEmpty) ...[
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Text(
                          'Ubicaciones',
                          style: Theme.of(context).textTheme.headlineSmall
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                    SliverList(
                      delegate: SliverChildBuilderDelegate((context, index) {
                        final location = provider.locations[index];
                        final summary = provider.summary[location];

                        return Padding(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16.0,
                            vertical: 4.0,
                          ),
                          child: LocationCard(
                            location: location,
                            summary: summary,
                            onTap: () =>
                                _navigateToLocationDetail(context, location),
                          ),
                        );
                      }, childCount: provider.locations.length),
                    ),
                  ],

                  // Mensaje si no hay datos
                  if (provider.summary.isEmpty && !provider.isLoading) ...[
                    SliverFillRemaining(
                      child: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.sensors_off,
                              size: 64,
                              color: Colors.grey[400],
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'No hay datos disponibles',
                              style: Theme.of(context).textTheme.titleLarge
                                  ?.copyWith(color: Colors.grey[600]),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Verifica que el simulador esté corriendo',
                              style: Theme.of(context).textTheme.bodyMedium
                                  ?.copyWith(color: Colors.grey[500]),
                            ),
                            const SizedBox(height: 24),
                            ElevatedButton.icon(
                              onPressed: provider.refresh,
                              icon: const Icon(Icons.refresh),
                              label: const Text('Reintentar'),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],

                  // Espacio adicional al final
                  // Espacio adicional al final (más alto para evitar superposición con navbar/FAB)
                  const SliverToBoxAdapter(child: SizedBox(height: 80)),
                ],
              ),
            );
          },
        ),
      ),
      floatingActionButton: Consumer<SensorProvider>(
        builder: (context, provider, child) {
          return FloatingActionButton(
            onPressed: provider.refresh,
            tooltip: 'Actualizar datos',
            child: provider.isLoading
                ? const SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : const Icon(Icons.refresh),
          );
        },
      ),
    );
  }

  Widget _buildSummaryCards(BuildContext context, SensorProvider provider) {
    // Calcular promedios generales
    final allTemperatures = <double>[];
    final allHumidities = <double>[];
    final allCo2Values = <double>[];
    final allPressures = <double>[];

    for (final summary in provider.summary.values) {
      if (summary.temperature != null) {
        allTemperatures.add(summary.temperature!.value);
      }
      if (summary.humidity != null) {
        allHumidities.add(summary.humidity!.value);
      }
      if (summary.co2 != null) {
        allCo2Values.add(summary.co2!.value);
      }
      if (summary.pressure != null) {
        allPressures.add(summary.pressure!.value);
      }
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: GridView.count(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        crossAxisCount: 2, // siempre 2 columnas
        childAspectRatio: 1.4,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        children: [
          _buildSummaryCard(
            context,
            'Temperatura',
            allTemperatures.isNotEmpty
                ? '${(allTemperatures.reduce((a, b) => a + b) / allTemperatures.length).toStringAsFixed(1)}°C'
                : '--',
            SensorType.temperature.color,
            SensorType.temperature.icon,
          ),
          _buildSummaryCard(
            context,
            'Humedad',
            allHumidities.isNotEmpty
                ? '${(allHumidities.reduce((a, b) => a + b) / allHumidities.length).toStringAsFixed(1)}%'
                : '--',
            SensorType.humidity.color,
            SensorType.humidity.icon,
          ),
          _buildSummaryCard(
            context,
            'CO₂',
            allCo2Values.isNotEmpty
                ? '${(allCo2Values.reduce((a, b) => a + b) / allCo2Values.length).toStringAsFixed(0)} ppm'
                : '--',
            SensorType.co2.color,
            SensorType.co2.icon,
          ),
          _buildSummaryCard(
            context,
            'Presión',
            allPressures.isNotEmpty
                ? '${(allPressures.reduce((a, b) => a + b) / allPressures.length).toStringAsFixed(1)} hPa'
                : '--',
            SensorType.pressure.color,
            SensorType.pressure.icon,
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryCard(
    BuildContext context,
    String title,
    String value,
    Color color,
    IconData icon,
  ) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 28, color: color),
            const SizedBox(height: 6),
            Text(
              title,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.grey[600],
                fontSize: 12,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 2),
            FittedBox(
              fit: BoxFit.scaleDown,
              child: Text(
                value,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
                textAlign: TextAlign.center,
                maxLines: 1,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _navigateToLocationDetail(BuildContext context, String location) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => LocationDetailScreen(location: location),
      ),
    );
  }
}
