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

  _AlertTileColors _colors(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    if (alert.isResolved) {
      return _AlertTileColors(
        card: scheme.primaryContainer.withValues(alpha: isDark ? 0.35 : 1),
        title: scheme.onPrimaryContainer,
        body: scheme.onPrimaryContainer.withValues(alpha: 0.9),
        accent: scheme.primary,
        icon: Icons.check_circle_outline,
      );
    }
    if (alert.isActivated) {
      return _AlertTileColors(
        card: scheme.errorContainer,
        title: scheme.onErrorContainer,
        body: scheme.onErrorContainer.withValues(alpha: 0.88),
        accent: scheme.error,
        icon: Icons.warning_amber_rounded,
      );
    }
    return _AlertTileColors(
      card: isDark
          ? Colors.orange.shade900.withValues(alpha: 0.45)
          : Colors.orange.shade50,
      title: isDark ? Colors.orange.shade100 : Colors.orange.shade900,
      body: isDark ? Colors.orange.shade200 : Colors.orange.shade800,
      accent: Colors.orange.shade700,
      icon: Icons.info_outline,
    );
  }

  @override
  Widget build(BuildContext context) {
    final colors = _colors(context);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      color: colors.card,
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: colors.accent.withValues(alpha: 0.2),
          child: Icon(colors.icon, color: colors.accent),
        ),
        title: Text(
          '${alert.locationLabel} · ${alert.sensorLabel}',
          style: TextStyle(
            fontWeight: FontWeight.w600,
            color: colors.title,
          ),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 4),
            Text(
              alert.message,
              style: TextStyle(color: colors.body, height: 1.35),
            ),
            if (alert.threshold != null) ...[
              const SizedBox(height: 4),
              Text(
                'Umbral: ${alert.threshold}${alert.sensorUnit.isNotEmpty ? ' ${alert.sensorUnit}' : ''}',
                style: TextStyle(
                  fontSize: 12,
                  color: colors.body.withValues(alpha: 0.9),
                ),
              ),
            ],
          ],
        ),
        trailing: Chip(
          label: Text(
            alert.statusLabel,
            style: TextStyle(
              fontSize: 11,
              color: colors.accent,
              fontWeight: FontWeight.w600,
            ),
          ),
          side: BorderSide(color: colors.accent.withValues(alpha: 0.6)),
          backgroundColor: colors.accent.withValues(
            alpha: Theme.of(context).brightness == Brightness.dark ? 0.15 : 0.12,
          ),
        ),
        isThreeLine: true,
      ),
    );
  }
}

class _AlertTileColors {
  final Color card;
  final Color title;
  final Color body;
  final Color accent;
  final IconData icon;

  const _AlertTileColors({
    required this.card,
    required this.title,
    required this.body,
    required this.accent,
    required this.icon,
  });
}
