-- ============================================================================
-- Medusse IoT - Seed Data
-- Datos iniciales para el sistema
-- ============================================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

USE medusse_db;

-- ============================================================================
-- USUARIOS INICIALES
-- Contraseña por defecto: "medusse2025"
-- Hash bcrypt de "medusse2025": $2b$10$BYdJqqDUobkjcB/lxFYAZOc2YUEzJJUhlouA5dr4OO3gcG1DkT6NW
-- ============================================================================
INSERT INTO users (username, email, password_hash, full_name, role, is_active) VALUES
('admin', 'admin@medusse.local', '$2b$10$BYdJqqDUobkjcB/lxFYAZOc2YUEzJJUhlouA5dr4OO3gcG1DkT6NW', 'Administrador del Sistema', 'admin', TRUE),
('francisco', 'pacoaldev@gmail.com', '$2b$10$BYdJqqDUobkjcB/lxFYAZOc2YUEzJJUhlouA5dr4OO3gcG1DkT6NW', 'Francisco Manuel López Alarte', 'admin', TRUE),
('profesor', 'profesor@medusse.local', '$2b$10$BYdJqqDUobkjcB/lxFYAZOc2YUEzJJUhlouA5dr4OO3gcG1DkT6NW', 'Profesor IES', 'user', TRUE),
('alumno', 'alumno@medusse.local', '$2b$10$BYdJqqDUobkjcB/lxFYAZOc2YUEzJJUhlouA5dr4OO3gcG1DkT6NW', 'Alumno de Prueba', 'viewer', TRUE);

-- ============================================================================
-- PREFERENCIAS DE USUARIOS
-- ============================================================================
INSERT INTO user_preferences (user_id, theme, language, timezone, notifications_enabled, email_notifications) VALUES
(1, 'dark', 'es', 'Europe/Madrid', TRUE, TRUE),
(2, 'auto', 'es', 'Europe/Madrid', TRUE, TRUE),
(3, 'light', 'es', 'Europe/Madrid', TRUE, FALSE),
(4, 'light', 'es', 'Europe/Madrid', FALSE, FALSE);

-- ============================================================================
-- UBICACIONES
-- ============================================================================
INSERT INTO locations (name, display_name, description, color, node_id, temp_base, is_active) VALUES
('aula20', 'Aula 20', 'Aula de informática 20', '#E53E3E', 'ESP32_NODE_01', 22.0, TRUE),
('aula21', 'Aula 21', 'Aula de informática 21', '#805AD5', 'ESP32_NODE_02', 24.0, TRUE),
('gimnasio', 'Gimnasio', 'Gimnasio del centro', '#FF9800', 'ESP32_NODE_03', 23.0, TRUE),
('laboratorio', 'Laboratorio', 'Laboratorio de ciencias', '#38A169', 'ESP32_NODE_04', 21.0, TRUE);

-- ============================================================================
-- SENSORES
-- ============================================================================
INSERT INTO sensors (sensor_type, display_name, unit, icon, min_value, max_value, warning_threshold, danger_threshold, is_active) VALUES
-- Sensores ambientales
('temperature', 'Temperatura', '°C', '🌡️', -10.0, 50.0, 28.0, 35.0, TRUE),
('humidity', 'Humedad', '%', '💧', 0.0, 100.0, 70.0, 85.0, TRUE),
('co2', 'CO₂', 'ppm', '🫁', 300.0, 5000.0, 800.0, 1200.0, TRUE),
('pressure', 'Presión Atmosférica', 'hPa', '🌪️', 950.0, 1050.0, NULL, NULL, TRUE),
('voc', 'VOC', 'ppb', '🌿', 0.0, 500.0, 200.0, 350.0, TRUE),
('iaq', 'Calidad del Aire', 'índice', '🏠', 0.0, 500.0, 150.0, 250.0, TRUE),

-- Sensores de agua y suelo
('soil_moisture', 'Humedad del Suelo', '%', '🌱', 0.0, 100.0, 20.0, 10.0, TRUE),
('ph_level', 'pH', 'pH', '⚗️', 0.0, 14.0, 8.5, 9.5, TRUE),
('water_flow', 'Flujo de Agua', 'L/min', '💦', 0.0, 10.0, NULL, NULL, TRUE),
('tds', 'Sólidos Disueltos', 'ppm', '🧪', 0.0, 1000.0, 500.0, 750.0, TRUE),
('dissolved_oxygen', 'Oxígeno Disuelto', 'mg/L', '🐟', 0.0, 20.0, 5.0, 3.0, TRUE),

-- Sensores de energía
('battery_voltage', 'Voltaje de Batería', 'V', '🔋', 3.0, 4.5, 3.5, 3.3, TRUE),
('solar_voltage', 'Voltaje Solar', 'V', '☀️', 0.0, 20.0, NULL, NULL, TRUE),
('battery_percentage', 'Porcentaje de Batería', '%', '🔋', 0.0, 100.0, 30.0, 15.0, TRUE),
('power_consumption', 'Consumo de Energía', 'mA', '⚡', 0.0, 500.0, 200.0, 300.0, TRUE),
('charging_status', 'Estado de Carga', '', '🔌', 0.0, 1.0, NULL, NULL, TRUE),
('low_power_mode', 'Modo Bajo Consumo', '', '🌙', 0.0, 1.0, NULL, NULL, TRUE),
('wake_count', 'Contador de Despertares', '', '🔄', 0.0, 10000.0, NULL, NULL, TRUE);

-- ============================================================================
-- CONFIGURACIÓN DEL SISTEMA
-- ============================================================================
INSERT INTO system_config (config_key, config_value, config_type, description, is_public) VALUES
('system_name', 'Medusse IoT', 'string', 'Nombre del sistema', TRUE),
('system_version', '2.3.0', 'string', 'Versión del sistema', TRUE),
('institution', 'IES José Rodrigo Botet', 'string', 'Institución educativa', TRUE),
('academic_year', '2025/2026', 'string', 'Curso académico', TRUE),
('author', 'Francisco Manuel López Alarte', 'string', 'Autor del proyecto', TRUE),
('contact_email', 'pacoaldev@gmail.com', 'string', 'Email de contacto', TRUE),

-- Configuración de alertas
('alert_co2_warning', '800', 'number', 'Umbral de advertencia CO2 (ppm)', FALSE),
('alert_co2_danger', '1200', 'number', 'Umbral de peligro CO2 (ppm)', FALSE),
('alert_battery_warning', '30', 'number', 'Umbral de advertencia batería (%)', FALSE),
('alert_battery_danger', '15', 'number', 'Umbral de peligro batería (%)', FALSE),
('alert_temp_warning', '28', 'number', 'Umbral de advertencia temperatura (°C)', FALSE),
('alert_temp_danger', '35', 'number', 'Umbral de peligro temperatura (°C)', FALSE),

-- Configuración de API
('api_url', 'http://localhost:4001', 'string', 'URL de la API REST', TRUE),
('websocket_url', 'ws://localhost:4002', 'string', 'URL del WebSocket', TRUE),
('grafana_url', 'http://localhost:3600', 'string', 'URL de Grafana', TRUE),
('influxdb_url', 'http://localhost:8086', 'string', 'URL de InfluxDB', FALSE),
('mqtt_url', 'mqtt://localhost:1883', 'string', 'URL del broker MQTT', FALSE),

-- Configuración de actualización
('data_refresh_interval', '30', 'number', 'Intervalo de actualización de datos (segundos)', FALSE),
('session_timeout', '3600', 'number', 'Timeout de sesión (segundos)', FALSE),
('max_login_attempts', '5', 'number', 'Máximo de intentos de login', FALSE),

-- Configuración de notificaciones
('notifications_enabled', 'true', 'boolean', 'Notificaciones habilitadas', FALSE),
('email_notifications_enabled', 'false', 'boolean', 'Notificaciones por email habilitadas', FALSE),
('alert_retention_days', '30', 'number', 'Días de retención de alertas', FALSE);

-- ============================================================================
-- REGISTRO DE ACTIVIDAD INICIAL
-- ============================================================================
INSERT INTO activity_log (user_id, action, entity_type, entity_id, details) VALUES
(1, 'system_init', 'system', NULL, '{"message": "Sistema inicializado", "version": "2.3.0"}'),
(2, 'user_created', 'user', 2, '{"message": "Usuario creado durante inicialización"}');
