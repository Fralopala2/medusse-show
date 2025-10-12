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
              // Header con icono y título
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
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          sensorType.displayName,
                          style: Theme.of(context).textTheme.titleMedium
                              ?.copyWith(fontWeight: FontWeight.w600),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        if (timestamp != null)
                          Text(
                            _formatTimestamp(timestamp),
                            style: Theme.of(context).textTheme.bodySmall
                                ?.copyWith(color: Colors.grey[600]),
                          ),
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
        return value.toStringAsFixed(1);
      case SensorType.co2:
        return value.toStringAsFixed(0);
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

    switch (sensorType) {
      case SensorType.temperature:
        if (data!.value < 18 || data!.value > 28) return Colors.orange;
        if (data!.value < 15 || data!.value > 32) return Colors.red;
        return Colors.green;

      case SensorType.humidity:
        if (data!.value < 30 || data!.value > 70) return Colors.orange;
        if (data!.value < 20 || data!.value > 80) return Colors.red;
        return Colors.green;

      case SensorType.co2:
        if (data!.value > 1000) return Colors.orange;
        if (data!.value > 1500) return Colors.red;
        return Colors.green;

      case SensorType.pressure:
        if (data!.value < 1000 || data!.value > 1030) return Colors.orange;
        if (data!.value < 995 || data!.value > 1035) return Colors.red;
        return Colors.green;
    }
  }

  String _getStatusText() {
    if (data == null) return 'Sin datos';

    switch (sensorType) {
      case SensorType.temperature:
        if (data!.value < 15 || data!.value > 32) return 'Crítico';
        if (data!.value < 18 || data!.value > 28) return 'Advertencia';
        return 'Normal';

      case SensorType.humidity:
        if (data!.value < 20 || data!.value > 80) return 'Crítico';
        if (data!.value < 30 || data!.value > 70) return 'Advertencia';
        return 'Normal';

      case SensorType.co2:
        if (data!.value > 1500) return 'Crítico';
        if (data!.value > 1000) return 'Advertencia';
        return 'Normal';

      case SensorType.pressure:
        if (data!.value < 995 || data!.value > 1035) return 'Crítico';
        if (data!.value < 1000 || data!.value > 1030) return 'Advertencia';
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
