import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:intl/intl.dart';
import '../providers/sensor_provider.dart';
import '../models/sensor_data.dart';
import '../services/api_service.dart';

class SensorChartScreen extends StatefulWidget {
  final String? location;
  final SensorType? sensorType;

  const SensorChartScreen({super.key, this.location, this.sensorType});

  @override
  State<SensorChartScreen> createState() => _SensorChartScreenState();
}

class _SensorChartScreenState extends State<SensorChartScreen> {
  late String currentLocation;
  late SensorType currentSensorType;
  int selectedHours = 6;
  bool isLoading = false;

  final List<int> hourOptions = [1, 3, 6, 12, 24];

  @override
  void initState() {
    super.initState();
    currentLocation = widget.location ?? '';
    currentSensorType = widget.sensorType ?? SensorType.temperature;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadData();
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    // Obtener argumentos de ruta si no se proporcionaron en el constructor
    final args =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
    if (args != null) {
      currentLocation = args['location'] ?? currentLocation;
      currentSensorType = args['sensorType'] ?? currentSensorType;
    }
  }

  Future<void> _loadData() async {
    if (currentLocation.isEmpty) return;

    setState(() => isLoading = true);

    final provider = context.read<SensorProvider>();
    await provider.loadHistoricalData(
      currentLocation,
      currentSensorType,
      hours: selectedHours,
      interval: _getInterval(),
    );

    setState(() => isLoading = false);
  }

  String _getInterval() {
    if (selectedHours <= 3) return '5m';
    if (selectedHours <= 12) return '15m';
    return '30m';
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
        title: Text(
          '${currentSensorType.displayName} - ${currentLocation.displayName}',
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadData,
            tooltip: 'Actualizar datos',
          ),
        ],
      ),
      body: Column(
        children: [
          // Selector de tiempo
          Container(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Text(
                  'Período:',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: hourOptions
                          .map(
                            (hours) => Padding(
                              padding: const EdgeInsets.only(right: 8),
                              child: FilterChip(
                                label: Text('${hours}h'),
                                selected: selectedHours == hours,
                                onSelected: (selected) {
                                  if (selected) {
                                    setState(() => selectedHours = hours);
                                    _loadData();
                                  }
                                },
                              ),
                            ),
                          )
                          .toList(),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Gráfico
          Expanded(
            child: Consumer<SensorProvider>(
              builder: (context, provider, child) {
                final data = provider.getHistoricalData(
                  currentLocation,
                  currentSensorType,
                  hours: selectedHours,
                );

                if (isLoading) {
                  return const Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircularProgressIndicator(),
                        SizedBox(height: 16),
                        Text('Cargando datos históricos...'),
                      ],
                    ),
                  );
                }

                if (data.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.show_chart,
                          size: 64,
                          color: Colors.grey[400],
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'No hay datos históricos',
                          style: Theme.of(context).textTheme.titleLarge
                              ?.copyWith(color: Colors.grey[600]),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Intenta con un período diferente',
                          style: Theme.of(context).textTheme.bodyMedium
                              ?.copyWith(color: Colors.grey[500]),
                        ),
                        const SizedBox(height: 24),
                        ElevatedButton.icon(
                          onPressed: _loadData,
                          icon: const Icon(Icons.refresh),
                          label: const Text('Actualizar'),
                        ),
                      ],
                    ),
                  );
                }

                return Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      // Estadísticas rápidas
                      _buildQuickStats(data),
                      const SizedBox(height: 16),

                      // Gráfico principal
                      Expanded(
                        child: Card(
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: LineChart(_buildLineChartData(data)),
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickStats(List<SensorData> data) {
    if (data.isEmpty) return const SizedBox.shrink();

    final values = data.map((d) => d.value).toList();
    final min = values.reduce((a, b) => a < b ? a : b);
    final max = values.reduce((a, b) => a > b ? a : b);
    final avg = values.reduce((a, b) => a + b) / values.length;
    final latest = data.last.value;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Expanded(
              child: _buildStatItem('Actual', latest, currentSensorType.color),
            ),
            Expanded(child: _buildStatItem('Promedio', avg, Colors.blue)),
            Expanded(child: _buildStatItem('Mínimo', min, Colors.green)),
            Expanded(child: _buildStatItem('Máximo', max, Colors.red)),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(String label, double value, Color color) {
    return Column(
      children: [
        Text(
          label,
          style: Theme.of(
            context,
          ).textTheme.bodySmall?.copyWith(color: Colors.grey[600]),
        ),
        const SizedBox(height: 4),
        Text(
          '${value.toStringAsFixed(1)}${currentSensorType.unit}',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
      ],
    );
  }

  LineChartData _buildLineChartData(List<SensorData> data) {
    if (data.isEmpty) {
      return LineChartData(
        lineBarsData: [],
        titlesData: const FlTitlesData(show: false),
      );
    }

    // Preparar datos para el gráfico
    final spots = data.asMap().entries.map((entry) {
      return FlSpot(entry.key.toDouble(), entry.value.value);
    }).toList();

    // Calcular rangos
    final values = data.map((d) => d.value).toList();
    final minY = values.reduce((a, b) => a < b ? a : b);
    final maxY = values.reduce((a, b) => a > b ? a : b);
    final padding = (maxY - minY) * 0.1;
    final range = maxY - minY;
    final horizontalInterval = range > 0 ? range / 5 : 1.0;
    final verticalInterval = data.length > 6 ? data.length / 6 : 1.0;

    return LineChartData(
      gridData: FlGridData(
        show: true,
        drawVerticalLine: true,
        horizontalInterval: horizontalInterval,
        verticalInterval: verticalInterval,
        getDrawingHorizontalLine: (value) =>
            FlLine(color: Colors.grey[300], strokeWidth: 1),
        getDrawingVerticalLine: (value) =>
            FlLine(color: Colors.grey[300], strokeWidth: 1),
      ),
      titlesData: FlTitlesData(
        show: true,
        rightTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 30,
            interval: data.length / 4,
            getTitlesWidget: (value, meta) {
              final index = value.toInt();
              if (index >= 0 && index < data.length) {
                final timestamp = data[index].timestamp;
                return SideTitleWidget(
                  axisSide: meta.axisSide,
                  child: Text(
                    DateFormat('HH:mm').format(timestamp),
                    style: const TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                );
              }
              return const Text('');
            },
          ),
        ),
        leftTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            interval: (maxY - minY) / 4,
            reservedSize: 50,
            getTitlesWidget: (value, meta) {
              return Text(
                '${value.toStringAsFixed(1)}${currentSensorType.unit}',
                style: const TextStyle(color: Colors.grey, fontSize: 12),
              );
            },
          ),
        ),
      ),
      borderData: FlBorderData(
        show: true,
        border: Border.all(color: Colors.grey[300]!),
      ),
      minX: 0,
      maxX: (data.length - 1).toDouble(),
      minY: minY - padding,
      maxY: maxY + padding,
      lineBarsData: [
        LineChartBarData(
          spots: spots,
          isCurved: true,
          color: currentSensorType.color,
          barWidth: 3,
          isStrokeCapRound: true,
          dotData: FlDotData(
            show: data.length <= 20, // Solo mostrar puntos si hay pocos datos
            getDotPainter: (spot, percent, barData, index) {
              return FlDotCirclePainter(
                radius: 4,
                color: currentSensorType.color,
                strokeWidth: 2,
                strokeColor: Colors.white,
              );
            },
          ),
          belowBarData: BarAreaData(
            show: true,
            color: currentSensorType.color.withValues(alpha: 0.1),
          ),
        ),
      ],
      lineTouchData: LineTouchData(
        enabled: true,
        touchTooltipData: LineTouchTooltipData(
          tooltipBgColor: Colors.blueGrey.withValues(alpha: 0.8),
          getTooltipItems: (List<LineBarSpot> touchedBarSpots) {
            return touchedBarSpots.map((barSpot) {
              final index = barSpot.x.toInt();
              if (index >= 0 && index < data.length) {
                final dataPoint = data[index];
                return LineTooltipItem(
                  '${dataPoint.value.toStringAsFixed(1)}${currentSensorType.unit}\n${DateFormat('dd/MM HH:mm').format(dataPoint.timestamp)}',
                  const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                );
              }
              return null;
            }).toList();
          },
        ),
      ),
    );
  }
}
