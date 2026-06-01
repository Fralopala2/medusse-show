-- Integración alertas operativas ↔ Grafana (anotaciones + activación)
ALTER TABLE alerts
  ADD COLUMN triggered_at TIMESTAMP NULL DEFAULT NULL AFTER is_resolved,
  ADD COLUMN grafana_annotation_created VARCHAR(64) NULL DEFAULT NULL AFTER triggered_at,
  ADD COLUMN grafana_annotation_fired VARCHAR(64) NULL DEFAULT NULL AFTER grafana_annotation_created;

ALTER TABLE alerts ADD INDEX idx_triggered_at (triggered_at);
