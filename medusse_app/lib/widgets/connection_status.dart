import 'package:flutter/material.dart';

class ConnectionStatus extends StatelessWidget {
  final bool isConnected;
  final String? error;
  final VoidCallback? onRetry;

  const ConnectionStatus({
    super.key,
    required this.isConnected,
    this.error,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    if (isConnected && error == null) {
      return const SizedBox.shrink(); // No mostrar nada si todo está bien
    }

    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isConnected ? Colors.orange[50] : Colors.red[50],
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: isConnected ? Colors.orange[200]! : Colors.red[200]!,
        ),
      ),
      child: Row(
        children: [
          Icon(
            isConnected ? Icons.warning : Icons.error,
            color: isConnected ? Colors.orange[700] : Colors.red[700],
            size: 20,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isConnected ? 'Advertencia' : 'Sin conexión',
                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: isConnected ? Colors.orange[800] : Colors.red[800],
                  ),
                ),
                if (error != null) ...[
                  const SizedBox(height: 4),
                  Text(
                    error!,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: isConnected ? Colors.orange[700] : Colors.red[700],
                    ),
                  ),
                ],
              ],
            ),
          ),
          if (onRetry != null) ...[
            const SizedBox(width: 8),
            TextButton.icon(
              onPressed: onRetry,
              icon: const Icon(Icons.refresh, size: 16),
              label: const Text('Reintentar'),
              style: TextButton.styleFrom(
                foregroundColor: isConnected
                    ? Colors.orange[700]
                    : Colors.red[700],
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
