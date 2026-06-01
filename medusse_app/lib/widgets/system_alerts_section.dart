import 'package:flutter/material.dart';
import '../models/system_alert.dart';

class SystemAlertsSection extends StatelessWidget {
  final List<SystemAlert> alerts;
  final String title;

  const SystemAlertsSection({
    super.key,
    required this.alerts,
    this.title = 'Alertas del sistema',
  });

  @override
  Widget build(BuildContext context) {
    if (alerts.isEmpty) {
      return const SizedBox.shrink();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
          child: Row(
            children: [
              Icon(Icons.notifications_active, color: Colors.orange[800]),
              const SizedBox(width: 8),
              Text(
                title,
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: Colors.orange.shade100,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  '${alerts.length}',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: Colors.orange.shade900,
                  ),
                ),
              ),
            ],
          ),
        ),
        ...alerts.map((alert) => _SystemAlertTile(alert: alert)),
      ],
    );
  }
}

class _SystemAlertTile extends StatelessWidget {
  final SystemAlert alert;

  const _SystemAlertTile({required this.alert});

  Color _statusColor(BuildContext context) {
    if (alert.isResolved) return Colors.green;
    if (alert.isActivated) return Colors.red;
    return Colors.orange;
  }

  @override
  Widget build(BuildContext context) {
    final statusColor = _statusColor(context);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      color: alert.isActivated
          ? Colors.red.shade50
          : Theme.of(context).cardColor,
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: statusColor.withValues(alpha: 0.15),
          child: Icon(
            alert.isActivated ? Icons.warning_amber_rounded : Icons.info_outline,
            color: statusColor,
          ),
        ),
        title: Text(
          '${alert.locationLabel} · ${alert.sensorLabel}',
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 4),
            Text(alert.message),
            if (alert.threshold != null) ...[
              const SizedBox(height: 4),
              Text(
                'Umbral: ${alert.threshold}${alert.sensorUnit.isNotEmpty ? ' ${alert.sensorUnit}' : ''}',
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
          ],
        ),
        trailing: Chip(
          label: Text(
            alert.statusLabel,
            style: TextStyle(fontSize: 11, color: statusColor, fontWeight: FontWeight.w600),
          ),
          side: BorderSide(color: statusColor.withValues(alpha: 0.5)),
          backgroundColor: statusColor.withValues(alpha: 0.08),
        ),
        isThreeLine: true,
      ),
    );
  }
}
