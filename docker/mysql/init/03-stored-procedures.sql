-- ============================================================================
-- Medusse IoT - Stored Procedures
-- Procedimientos almacenados para lógica de negocio
-- ============================================================================

USE medusse_db;

DELIMITER //

-- ============================================================================
-- PROCEDIMIENTO: sp_authenticate_user
-- Autentica un usuario y crea una sesión
-- ============================================================================
CREATE PROCEDURE sp_authenticate_user(
    IN p_username VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_ip_address VARCHAR(45),
    IN p_user_agent TEXT,
    OUT p_user_id INT,
    OUT p_session_token VARCHAR(255),
    OUT p_role VARCHAR(20),
    OUT p_success BOOLEAN
)
BEGIN
    DECLARE v_user_id INT;
    DECLARE v_is_active BOOLEAN;
    DECLARE v_role VARCHAR(20);
    DECLARE v_session_token VARCHAR(255);
    
    -- Buscar usuario
    SELECT id, role, is_active INTO v_user_id, v_role, v_is_active
    FROM users
    WHERE (username = p_username OR email = p_username)
      AND password_hash = p_password_hash
    LIMIT 1;
    
    -- Verificar si el usuario existe y está activo
    IF v_user_id IS NOT NULL AND v_is_active = TRUE THEN
        -- Generar token de sesión (UUID)
        SET v_session_token = UUID();
        
        -- Crear sesión (expira en 24 horas)
        INSERT INTO sessions (user_id, session_token, ip_address, user_agent, expires_at)
        VALUES (v_user_id, v_session_token, p_ip_address, p_user_agent, DATE_ADD(NOW(), INTERVAL 24 HOUR));
        
        -- Actualizar último login
        UPDATE users SET last_login = NOW() WHERE id = v_user_id;
        
        -- Registrar actividad
        INSERT INTO activity_log (user_id, action, entity_type, entity_id, ip_address, user_agent)
        VALUES (v_user_id, 'user_login', 'user', v_user_id, p_ip_address, p_user_agent);
        
        -- Retornar datos
        SET p_user_id = v_user_id;
        SET p_session_token = v_session_token;
        SET p_role = v_role;
        SET p_success = TRUE;
    ELSE
        SET p_user_id = NULL;
        SET p_session_token = NULL;
        SET p_role = NULL;
        SET p_success = FALSE;
    END IF;
END //

-- ============================================================================
-- PROCEDIMIENTO: sp_validate_session
-- Valida una sesión activa
-- ============================================================================
CREATE PROCEDURE sp_validate_session(
    IN p_session_token VARCHAR(255),
    OUT p_user_id INT,
    OUT p_username VARCHAR(50),
    OUT p_role VARCHAR(20),
    OUT p_is_valid BOOLEAN
)
BEGIN
    DECLARE v_user_id INT;
    DECLARE v_username VARCHAR(50);
    DECLARE v_role VARCHAR(20);
    DECLARE v_expires_at TIMESTAMP;
    
    -- Buscar sesión
    SELECT s.user_id, u.username, u.role, s.expires_at
    INTO v_user_id, v_username, v_role, v_expires_at
    FROM sessions s
    INNER JOIN users u ON s.user_id = u.id
    WHERE s.session_token = p_session_token
      AND u.is_active = TRUE
    LIMIT 1;
    
    -- Verificar si la sesión es válida y no ha expirado
    IF v_user_id IS NOT NULL AND v_expires_at > NOW() THEN
        SET p_user_id = v_user_id;
        SET p_username = v_username;
        SET p_role = v_role;
        SET p_is_valid = TRUE;
    ELSE
        SET p_user_id = NULL;
        SET p_username = NULL;
        SET p_role = NULL;
        SET p_is_valid = FALSE;
    END IF;
END //

-- ============================================================================
-- PROCEDIMIENTO: sp_logout_user
-- Cierra la sesión de un usuario
-- ============================================================================
CREATE PROCEDURE sp_logout_user(
    IN p_session_token VARCHAR(255),
    OUT p_success BOOLEAN
)
BEGIN
    DECLARE v_user_id INT;
    
    -- Obtener user_id de la sesión
    SELECT user_id INTO v_user_id
    FROM sessions
    WHERE session_token = p_session_token
    LIMIT 1;
    
    -- Eliminar sesión
    DELETE FROM sessions WHERE session_token = p_session_token;
    
    -- Registrar actividad si se encontró el usuario
    IF v_user_id IS NOT NULL THEN
        INSERT INTO activity_log (user_id, action, entity_type, entity_id)
        VALUES (v_user_id, 'user_logout', 'user', v_user_id);
        SET p_success = TRUE;
    ELSE
        SET p_success = FALSE;
    END IF;
END //

-- ============================================================================
-- PROCEDIMIENTO: sp_create_alert
-- Crea una nueva alerta en el sistema
-- ============================================================================
CREATE PROCEDURE sp_create_alert(
    IN p_location_name VARCHAR(50),
    IN p_sensor_type VARCHAR(50),
    IN p_alert_type VARCHAR(20),
    IN p_message TEXT,
    IN p_value DECIMAL(10,2),
    IN p_threshold DECIMAL(10,2),
    OUT p_alert_id INT,
    OUT p_success BOOLEAN
)
BEGIN
    DECLARE v_location_id INT;
    DECLARE v_sensor_id INT;
    
    -- Obtener IDs de ubicación y sensor
    SELECT id INTO v_location_id FROM locations WHERE name = p_location_name LIMIT 1;
    SELECT id INTO v_sensor_id FROM sensors WHERE sensor_type = p_sensor_type LIMIT 1;
    
    -- Verificar que existan
    IF v_location_id IS NOT NULL AND v_sensor_id IS NOT NULL THEN
        -- Crear alerta
        INSERT INTO alerts (location_id, sensor_id, alert_type, message, value, threshold)
        VALUES (v_location_id, v_sensor_id, p_alert_type, p_message, p_value, p_threshold);
        
        SET p_alert_id = LAST_INSERT_ID();
        SET p_success = TRUE;
        
        -- Notificar a usuarios admin
        INSERT INTO user_alerts (user_id, alert_id)
        SELECT id, p_alert_id FROM users WHERE role = 'admin' AND is_active = TRUE;
    ELSE
        SET p_alert_id = NULL;
        SET p_success = FALSE;
    END IF;
END //

-- ============================================================================
-- PROCEDIMIENTO: sp_resolve_alert
-- Marca una alerta como resuelta
-- ============================================================================
CREATE PROCEDURE sp_resolve_alert(
    IN p_alert_id INT,
    IN p_user_id INT,
    OUT p_success BOOLEAN
)
BEGIN
    -- Actualizar alerta
    UPDATE alerts
    SET is_resolved = TRUE,
        resolved_at = NOW(),
        resolved_by = p_user_id
    WHERE id = p_alert_id;
    
    -- Verificar si se actualizó
    IF ROW_COUNT() > 0 THEN
        -- Registrar actividad
        INSERT INTO activity_log (user_id, action, entity_type, entity_id)
        VALUES (p_user_id, 'alert_resolved', 'alert', p_alert_id);
        
        SET p_success = TRUE;
    ELSE
        SET p_success = FALSE;
    END IF;
END //

-- ============================================================================
-- PROCEDIMIENTO: sp_get_user_alerts
-- Obtiene alertas no leídas de un usuario
-- ============================================================================
CREATE PROCEDURE sp_get_user_alerts(
    IN p_user_id INT,
    IN p_limit INT
)
BEGIN
    SELECT 
        a.id,
        a.alert_type,
        a.message,
        a.value,
        a.threshold,
        l.display_name AS location_name,
        s.display_name AS sensor_name,
        s.icon AS sensor_icon,
        a.is_resolved,
        a.created_at,
        ua.is_read
    FROM user_alerts ua
    INNER JOIN alerts a ON ua.alert_id = a.id
    INNER JOIN locations l ON a.location_id = l.id
    INNER JOIN sensors s ON a.sensor_id = s.id
    WHERE ua.user_id = p_user_id
      AND ua.is_read = FALSE
    ORDER BY a.created_at DESC
    LIMIT p_limit;
END //

-- ============================================================================
-- PROCEDIMIENTO: sp_mark_alert_read
-- Marca una alerta como leída para un usuario
-- ============================================================================
CREATE PROCEDURE sp_mark_alert_read(
    IN p_user_id INT,
    IN p_alert_id INT,
    OUT p_success BOOLEAN
)
BEGIN
    UPDATE user_alerts
    SET is_read = TRUE,
        read_at = NOW()
    WHERE user_id = p_user_id
      AND alert_id = p_alert_id;
    
    SET p_success = (ROW_COUNT() > 0);
END //

-- ============================================================================
-- PROCEDIMIENTO: sp_cleanup_expired_sessions
-- Limpia sesiones expiradas (ejecutar periódicamente)
-- ============================================================================
CREATE PROCEDURE sp_cleanup_expired_sessions()
BEGIN
    DELETE FROM sessions WHERE expires_at < NOW();
    
    SELECT ROW_COUNT() AS deleted_sessions;
END //

-- ============================================================================
-- PROCEDIMIENTO: sp_get_system_stats
-- Obtiene estadísticas del sistema
-- ============================================================================
CREATE PROCEDURE sp_get_system_stats()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM users WHERE is_active = TRUE) AS active_users,
        (SELECT COUNT(*) FROM sessions WHERE expires_at > NOW()) AS active_sessions,
        (SELECT COUNT(*) FROM alerts WHERE is_resolved = FALSE) AS unresolved_alerts,
        (SELECT COUNT(*) FROM alerts WHERE created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)) AS alerts_24h,
        (SELECT COUNT(*) FROM locations WHERE is_active = TRUE) AS active_locations,
        (SELECT COUNT(*) FROM sensors WHERE is_active = TRUE) AS active_sensors,
        (SELECT COUNT(*) FROM activity_log WHERE created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)) AS activities_24h;
END //

-- ============================================================================
-- PROCEDIMIENTO: sp_get_location_stats
-- Obtiene estadísticas de una ubicación
-- ============================================================================
CREATE PROCEDURE sp_get_location_stats(
    IN p_location_name VARCHAR(50)
)
BEGIN
    DECLARE v_location_id INT;
    
    SELECT id INTO v_location_id FROM locations WHERE name = p_location_name LIMIT 1;
    
    IF v_location_id IS NOT NULL THEN
        SELECT 
            l.display_name,
            l.node_id,
            l.color,
            (SELECT COUNT(*) FROM alerts WHERE location_id = v_location_id AND is_resolved = FALSE) AS unresolved_alerts,
            (SELECT COUNT(*) FROM alerts WHERE location_id = v_location_id AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)) AS alerts_24h,
            (SELECT COUNT(*) FROM alerts WHERE location_id = v_location_id AND alert_type = 'critical' AND is_resolved = FALSE) AS critical_alerts
        FROM locations l
        WHERE l.id = v_location_id;
    END IF;
END //

DELIMITER ;

-- ============================================================================
-- COMENTARIOS DE PROCEDIMIENTOS
-- ============================================================================
-- sp_authenticate_user: Autentica usuario y crea sesión
-- sp_validate_session: Valida token de sesión
-- sp_logout_user: Cierra sesión de usuario
-- sp_create_alert: Crea nueva alerta en el sistema
-- sp_resolve_alert: Marca alerta como resuelta
-- sp_get_user_alerts: Obtiene alertas no leídas de usuario
-- sp_mark_alert_read: Marca alerta como leída
-- sp_cleanup_expired_sessions: Limpia sesiones expiradas
-- sp_get_system_stats: Estadísticas generales del sistema
-- sp_get_location_stats: Estadísticas de una ubicación
