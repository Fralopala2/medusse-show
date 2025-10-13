import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/sensor_data.dart';
import '../main.dart';

class LocationCard extends StatelessWidget {
  final String location;
  final LocationSummary? summary;
  final VoidCallback? onTap;

  const LocationCard({
    super.key,
    required this.location,
    this.summary,
    this.onTap,
  });

  String _getLocationDisplayName(String location) {
    switch (location.toLowerCase()) {
      case 'aula20':
        return 'Aula 20';
      case 'aula21':
        return 'Aula 21';
      case 'laboratorio':
        return 'Laboratorio';
      case 'gimnasio':
        return 'Gimnasio';
      default:
        return location;
    }
  }

  @override
  Widget build(BuildContext context) {
    final hasData = summary?.hasData ?? false;
    final locationColor = location.locationColor;

    return Card(
      elevation: 2,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header con nombre de ubicación
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: locationColor.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Icon(
                      Icons.location_on,
                      color: locationColor,
                      size: 24,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _getLocationDisplayName(location),
                          style: Theme.of(context).textTheme.titleLarge
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                        Text(
                          hasData ? 'Datos disponibles' : 'Sin datos',
                          style: Theme.of(context).textTheme.bodySmall
                              ?.copyWith(
                                color: hasData
                                    ? Colors.green[600]
                                    : Colors.grey[600],
                              ),
                        ),
                      ],
                    ),
                  ),
                  Icon(Icons.chevron_right, color: Colors.grey[400]),
                ],
              ),

              if (hasData) ...[
                const SizedBox(height: 16),

                // Grid de sensores
                GridView.count(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisCount: 2,
                  childAspectRatio: 2.2,
                  crossAxisSpacing: 8,
                  mainAxisSpacing: 8,
                  children: [
                    _buildSensorTile(
                      context,
                      SensorType.temperature,
                      summary!.temperature,
                    ),
                    _buildSensorTile(
                      context,
                      SensorType.humidity,
                      summary!.humidity,
                    ),
                    _buildSensorTile(context, SensorType.co2, summary!.co2),
                    _buildSensorTile(
                      context,
                      SensorType.pressure,
                      summary!.pressure,
                    ),
                    _buildSensorTile(context, SensorType.voc, summary!.voc),
                    _buildSensorTile(
                      context,
                      SensorType.soilMoisture,
                      summary!.soilMoisture,
                    ),
                    _buildSensorTile(
                      context,
                      SensorType.phLevel,
                      summary!.phLevel,
                    ),
                    _buildSensorTile(
                      context,
                      SensorType.waterFlow,
                      summary!.waterFlow,
                    ),
                    _buildSensorTile(
                      context,
                      SensorType.tdsPpm,
                      summary!.tdsPpm,
                    ),
                    _buildSensorTile(
                      context,
                      SensorType.dissolvedOxygen,
                      summary!.dissolvedOxygen,
                    ),
                  ],
                ),

                const SizedBox(height: 12),

                // Última actualización
                if (summary != null) _buildLastUpdate(context),
              ] else ...[
                const SizedBox(height: 16),
                Center(
                  child: Column(
                    children: [
                      Icon(
                        Icons.sensors_off,
                        size: 48,
                        color: Colors.grey[400],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'No hay datos disponibles',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSensorTile(
    BuildContext context,
    SensorType sensorType,
    SensorData? data,
  ) {
    final hasData = data != null;
    final value = hasData ? data.value : null;
    final isAlert = hasData && _isAlert(sensorType, value!);

    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: sensorType.color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: isAlert ? Border.all(color: Colors.orange, width: 1.5) : null,
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(sensorType.icon, size: 16, color: sensorType.color),
              const SizedBox(width: 4),
              if (isAlert)
                Icon(Icons.warning, size: 12, color: Colors.orange[700]),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            hasData
                ? '${_formatValue(sensorType, value!)}${sensorType.unit}'
                : '--',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.bold,
              color: hasData ? sensorType.color : Colors.grey[400],
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildLastUpdate(BuildContext context) {
    // Encontrar la actualización más reciente
    DateTime? lastUpdate;

    final updates = [
      summary?.temperature?.timestamp,
      summary?.humidity?.timestamp,
      summary?.co2?.timestamp,
      summary?.pressure?.timestamp,
      summary?.voc?.timestamp,
      summary?.soilMoisture?.timestamp,
      summary?.phLevel?.timestamp,
      summary?.waterFlow?.timestamp,
      summary?.tdsPpm?.timestamp,
      summary?.dissolvedOxygen?.timestamp,
    ].where((t) => t != null).cast<DateTime>();

    if (updates.isNotEmpty) {
      lastUpdate = updates.reduce((a, b) => a.isAfter(b) ? a : b);
    }

    return Row(
      children: [
        Icon(Icons.access_time, size: 14, color: Colors.grey[500]),
        const SizedBox(width: 4),
        Text(
          lastUpdate != null
              ? 'Actualizado ${_formatTimestamp(lastUpdate)}'
              : 'Sin actualizaciones',
          style: Theme.of(
            context,
          ).textTheme.bodySmall?.copyWith(color: Colors.grey[500]),
        ),
      ],
    );
  }

  String _formatValue(SensorType sensorType, double value) {
    switch (sensorType) {
      case SensorType.temperature:
      case SensorType.humidity:
      case SensorType.pressure:
      case SensorType.soilMoisture:
        return value.toStringAsFixed(1);
      case SensorType.co2:
      case SensorType.voc:
      case SensorType.tdsPpm:
      case SensorType.dissolvedOxygen:
        return value.toStringAsFixed(0);
      case SensorType.phLevel:
        return value.toStringAsFixed(2);
      case SensorType.waterFlow:
        return value.toStringAsFixed(2);
    }
  }

  String _formatTimestamp(DateTime timestamp) {
    final now = DateTime.now();
    final difference = now.difference(timestamp);

    if (difference.inMinutes < 1) {
      return 'ahora';
    } else if (difference.inMinutes < 60) {
      return 'hace ${difference.inMinutes}m';
    } else if (difference.inHours < 24) {
      return 'hace ${difference.inHours}h';
    } else {
      return DateFormat('dd/MM HH:mm').format(timestamp);
    }
  }

  bool _isAlert(SensorType sensorType, double value) {
    final thresholds = sensorType.thresholds;
    switch (sensorType) {
      case SensorType.temperature:
        return value < thresholds[0] || value > thresholds[1];
      case SensorType.humidity:
      case SensorType.soilMoisture:
        return value < thresholds[0] || value > thresholds[1];
      case SensorType.co2:
      case SensorType.voc:
      case SensorType.tdsPpm:
        return value > thresholds[0]; // Solo alerta por exceso
      case SensorType.pressure:
        return value < thresholds[0] || value > thresholds[1];
      case SensorType.phLevel:
        return value < thresholds[0] || value > thresholds[1];
      case SensorType.waterFlow:
      case SensorType.dissolvedOxygen:
        return value < thresholds[0]; // Solo alerta por déficit
    }
  }
}
