class SystemAlert {
  final int id;
  final String alertType;
  final String message;
  final double? value;
  final double? threshold;
  final bool isResolved;
  final DateTime? triggeredAt;
  final DateTime createdAt;
  final String locationName;
  final String locationLabel;
  final String sensorType;
  final String sensorLabel;
  final String sensorUnit;
  final String status;

  const SystemAlert({
    required this.id,
    required this.alertType,
    required this.message,
    this.value,
    this.threshold,
    required this.isResolved,
    this.triggeredAt,
    required this.createdAt,
    required this.locationName,
    required this.locationLabel,
    required this.sensorType,
    required this.sensorLabel,
    this.sensorUnit = '',
    required this.status,
  });

  factory SystemAlert.fromJson(Map<String, dynamic> json) {
    return SystemAlert(
      id: json['id'] as int,
      alertType: json['alert_type'] as String? ?? 'info',
      message: json['message'] as String? ?? '',
      value: json['value'] != null ? (json['value'] as num).toDouble() : null,
      threshold: json['threshold'] != null
          ? (json['threshold'] as num).toDouble()
          : null,
      isResolved: json['is_resolved'] == true,
      triggeredAt: json['triggered_at'] != null
          ? DateTime.tryParse(json['triggered_at'].toString())
          : null,
      createdAt: DateTime.parse(json['created_at'].toString()),
      locationName: json['location_name'] as String? ?? '',
      locationLabel: json['location_label'] as String? ?? '',
      sensorType: json['sensor_type'] as String? ?? '',
      sensorLabel: json['sensor_label'] as String? ?? '',
      sensorUnit: json['sensor_unit'] as String? ?? '',
      status: json['status'] as String? ?? 'registrada',
    );
  }

  bool get isActivated => status == 'activada' || triggeredAt != null;

  String get statusLabel {
    switch (status) {
      case 'activada':
        return 'Activada';
      case 'resuelta':
        return 'Resuelta';
      default:
        return 'Registrada';
    }
  }
}
