import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/sensor_data.dart';
import '../main.dart';

class SensorCard extends StatelessWidget {
  final SensorType sensorType;
  final SensorData? data;
  final VoidCallback? onTap;
  final bool showAlert;

  const SensorCard({
    super.key,
    required this.sensorType,
    this.data,
    this.onTap,
    this.showAlert = false,
  });

  @override
  Widget build(BuildContext context) {
    final hasData = data != null;
    final value = hasData ? data!.value : null;
    final timestamp = hasData ? data!.timestamp : null;

    return Card(
      elevation: showAlert ? 4 : 2,
      color: showAlert ? _getAlertColor(context) : null,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header con icono, nombre, valor y Last *
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: sensorType.color.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Icon(
                      sensorType.icon,
                      color: sensorType.color,
                      size: 24,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Row(
                      children: [
                        Expanded(
                          child: Text(
                            sensorType.displayName,
                            style: Theme.of(context).textTheme.titleMedium
                                ?.copyWith(fontWeight: FontWeight.w600),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        if (hasData) ...[
                          Text(
                            hasData ? _formatValue(value!) : '--',
                            style: Theme.of(context).textTheme.titleMedium
                                ?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: sensorType.color,
                                ),
                          ),
                          const SizedBox(width: 4),
                          Text(
                            sensorType.unit,
                            style: Theme.of(context).textTheme.bodyMedium
                                ?.copyWith(color: Colors.grey[600]),
                          ),
                          const SizedBox(width: 12),
                          Text(
                            'Last *',
                            style: Theme.of(context).textTheme.bodySmall
                                ?.copyWith(color: Colors.grey[500]),
                          ),
                          const SizedBox(width: 2),
                          Text(
                            _formatTimestamp(timestamp!),
                            style: Theme.of(context).textTheme.bodySmall
                                ?.copyWith(color: Colors.grey[700]),
                          ),
                        ],
                      ],
                    ),
                  ),
                  if (showAlert)
                    Icon(Icons.warning, color: Colors.orange[700], size: 20),
                ],
              ),

              const SizedBox(height: 16),

              // Valor principal
              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    hasData ? _formatValue(value!) : '--',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: hasData ? sensorType.color : Colors.grey[400],
                    ),
                  ),
                  const SizedBox(width: 4),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 4),
                    child: Text(
                      sensorType.unit,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.grey[600],
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 8),

              // Estado o información adicional
              Row(
                children: [
                  Container(
                    width: 8,
                    height: 8,
                    decoration: BoxDecoration(
                      color: hasData ? _getStatusColor() : Colors.grey[400],
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    hasData ? _getStatusText() : 'Sin datos',
                    style: Theme.of(
                      context,
                    ).textTheme.bodySmall?.copyWith(color: Colors.grey[600]),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _formatValue(double value) {
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
      return 'Ahora';
    } else if (difference.inMinutes < 60) {
      return 'Hace ${difference.inMinutes}m';
    } else if (difference.inHours < 24) {
      return 'Hace ${difference.inHours}h';
    } else {
      return DateFormat('dd/MM HH:mm').format(timestamp);
    }
  }

  Color _getStatusColor() {
    if (data == null) return Colors.grey;

    final thresholds = sensorType.thresholds;

    switch (sensorType) {
      case SensorType.temperature:
        if (data!.value < 15 || data!.value > 32) return Colors.red;
        if (data!.value < thresholds[0] || data!.value > thresholds[1])
          return Colors.orange;
        return Colors.green;

      case SensorType.humidity:
      case SensorType.soilMoisture:
        if (data!.value < 20 || data!.value > 80) return Colors.red;
        if (data!.value < thresholds[0] || data!.value > thresholds[1])
          return Colors.orange;
        return Colors.green;

      case SensorType.co2:
        if (data!.value > 1500) return Colors.red;
        if (data!.value > thresholds[0]) return Colors.orange;
        return Colors.green;

      case SensorType.voc:
        if (data!.value > 500) return Colors.red;
        if (data!.value > thresholds[0]) return Colors.orange;
        return Colors.green;

      case SensorType.pressure:
        if (data!.value < 995 || data!.value > 1035) return Colors.red;
        if (data!.value < thresholds[0] || data!.value > thresholds[1])
          return Colors.orange;
        return Colors.green;

      case SensorType.phLevel:
        if (data!.value < 6.0 || data!.value > 8.0) return Colors.red;
        if (data!.value < thresholds[0] || data!.value > thresholds[1])
          return Colors.orange;
        return Colors.green;

      case SensorType.waterFlow:
        if (data!.value < 0.5) return Colors.red;
        if (data!.value < thresholds[0]) return Colors.orange;
        return Colors.green;

      case SensorType.tdsPpm:
        if (data!.value > 1000) return Colors.red;
        if (data!.value > thresholds[0]) return Colors.orange;
        return Colors.green;

      case SensorType.dissolvedOxygen:
        if (data!.value < 3.0) return Colors.red;
        if (data!.value < thresholds[0]) return Colors.orange;
        return Colors.green;
    }
  }

  String _getStatusText() {
    if (data == null) return 'Sin datos';

    final thresholds = sensorType.thresholds;

    switch (sensorType) {
      case SensorType.temperature:
        if (data!.value < 15 || data!.value > 32) return 'Crítico';
        if (data!.value < thresholds[0] || data!.value > thresholds[1])
          return 'Advertencia';
        return 'Normal';

      case SensorType.humidity:
      case SensorType.soilMoisture:
        if (data!.value < 20 || data!.value > 80) return 'Crítico';
        if (data!.value < thresholds[0] || data!.value > thresholds[1])
          return 'Advertencia';
        return 'Normal';

      case SensorType.co2:
        if (data!.value > 1500) return 'Crítico';
        if (data!.value > thresholds[0]) return 'Advertencia';
        return 'Normal';

      case SensorType.voc:
        if (data!.value > 500) return 'Crítico';
        if (data!.value > thresholds[0]) return 'Advertencia';
        return 'Normal';

      case SensorType.pressure:
        if (data!.value < 995 || data!.value > 1035) return 'Crítico';
        if (data!.value < thresholds[0] || data!.value > thresholds[1])
          return 'Advertencia';
        return 'Normal';

      case SensorType.phLevel:
        if (data!.value < 6.0 || data!.value > 8.0) return 'Crítico';
        if (data!.value < thresholds[0] || data!.value > thresholds[1])
          return 'Advertencia';
        return 'Normal';

      case SensorType.waterFlow:
        if (data!.value < 0.5) return 'Crítico';
        if (data!.value < thresholds[0]) return 'Advertencia';
        return 'Normal';

      case SensorType.tdsPpm:
        if (data!.value > 1000) return 'Crítico';
        if (data!.value > thresholds[0]) return 'Advertencia';
        return 'Normal';

      case SensorType.dissolvedOxygen:
        if (data!.value < 3.0) return 'Crítico';
        if (data!.value < thresholds[0]) return 'Advertencia';
        return 'Normal';
    }
  }

  Color? _getAlertColor(BuildContext context) {
    if (!showAlert) return null;

    final isDark = Theme.of(context).brightness == Brightness.dark;
    return isDark
        ? Colors.orange[900]?.withValues(alpha: 0.3)
        : Colors.orange[50];
  }
}
