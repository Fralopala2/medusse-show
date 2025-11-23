# TFG - Proyecto Medusse IoT
## 16 Retos para Trabajo de Fin de Grado

**Proyecto**: Sistema IoT de Monitoreo Ambiental Completo  
**Autor**: Francisco Manuel López Alarte  
**Institución**: IES José Rodrigo Botet  
**Curso**: 2025/2026  
**Rama de trabajo**: `clase`

---

## Estado General de Retos

| Reto | Título | Estado | Prioridad | Documentación |
|------|--------|--------|-----------|---------------|
| 1 | Proyecto de sostenibilidad | ⏳ Pendiente | Alta | 📄 Pendiente |
| 2 | Montar la base de datos | ✅ Parcial (InfluxDB) | Alta | 📄 Pendiente |
| 3 | Creación de procedimientos almacenados | ⏳ Pendiente | Media | 📄 Pendiente |
| 4 | Diseño de bocetos | ✅ Completado | Alta | 📄 Completado |
| 5 | Diseño de interfaces web HTML/CSS | ✅ Completado | Alta | 📄 Completado |
| 6 | Plan de empresa | ⏳ Pendiente | Media | 📄 Pendiente |
| 7 | Validación de formularios por JS | ⏳ Pendiente | Media | 📄 Pendiente |
| 8 | Transferencia datos front-end/back-end | ✅ Parcial (API REST) | Alta | 📄 Pendiente |
| 9 | Gestión de usuarios (sesiones/cookies) | ⏳ Pendiente | Alta | 📄 Pendiente |
| 10 | Panel de administración de usuarios | ⏳ Pendiente | Alta | 📄 Pendiente |
| 11 | Script para subir archivos FTP | ⏳ Pendiente | Baja | 📄 Pendiente |
| 12 | Comunicación asíncrona con servidor | ✅ Parcial (WebSocket) | Media | 📄 Pendiente |
| 13 | Librería/framework entorno cliente | ✅ Completado (Flutter) | Alta | 📄 Pendiente |
| 14 | Diseño web avanzado (responsive/animaciones) | ⏳ Pendiente | Media | 📄 Pendiente |
| 15 | Framework servidor y arquitecturas avanzadas | ✅ Parcial (Express/Docker) | Alta | 📄 Pendiente |
| 16 | Preparación de documentación | ⏳ En progreso | Crítica | 📄 En progreso |

---

## Reto 1: Proyecto de Sostenibilidad

### Objetivo
Demostrar cómo el proyecto Medusse IoT contribuye a la sostenibilidad ambiental y los Objetivos de Desarrollo Sostenible (ODS).

### Tareas
- [ ] Identificar ODS aplicables al proyecto
- [ ] Documentar impacto ambiental positivo
- [ ] Calcular ahorro energético vs soluciones tradicionales
- [ ] Documentar uso de energía solar en nodos
- [ ] Crear informe de sostenibilidad

### Entregables
- Documento de sostenibilidad (PDF)
- Presentación para jurado
- Cálculos de impacto ambiental

### Estado Actual
El proyecto ya incluye:
- ✅ Monitoreo de energía solar
- ✅ Gestión inteligente de batería
- ✅ Modo de bajo consumo
- ⏳ Falta documentación formal

---

## Reto 2: Montar la Base de Datos

### Objetivo
Diseñar e implementar una base de datos robusta para el sistema IoT.

### Tareas
- [x] InfluxDB para series temporales (COMPLETADO)
- [ ] Base de datos relacional para usuarios (MySQL/PostgreSQL)
- [ ] Esquema de base de datos documentado
- [ ] Scripts de creación de tablas
- [ ] Datos de prueba (seed data)

### Entregables
- Diagrama ER de base de datos
- Scripts SQL de creación
- Documentación de estructura
- Manual de instalación

### Estado Actual
- ✅ InfluxDB operativa (bucket: sensors, org: iescelia)
- ⏳ Falta BD relacional para usuarios/autenticación

---

## Reto 3: Creación de Procedimientos Almacenados

### Objetivo
Implementar lógica de negocio mediante procedimientos almacenados en la base de datos.

### Tareas
- [ ] Procedimientos para gestión de usuarios
- [ ] Procedimientos para consultas de sensores
- [ ] Procedimientos para alertas automáticas
- [ ] Procedimientos para estadísticas
- [ ] Documentación de cada procedimiento

### Entregables
- Scripts SQL con procedimientos
- Documentación técnica
- Ejemplos de uso
- Tests de procedimientos

### Estado Actual
- ⏳ No implementado (requiere Reto 2 completado)

---

## Reto 4: Diseño de Bocetos

### Objetivo
Crear bocetos y wireframes de todas las interfaces del sistema.

### Tareas
- [ ] Bocetos de página principal
- [ ] Bocetos de formularios (login, registro, configuración)
- [ ] Bocetos de dashboard de usuario
- [ ] Bocetos de panel de administración
- [ ] Bocetos de galería de datos/gráficos
- [ ] Bocetos responsive (móvil/tablet/desktop)

### Entregables
- Wireframes en Figma/Adobe XD
- Mockups de alta fidelidad
- Guía de estilo visual
- Presentación de diseño

### Estado Actual
- ✅ Dashboard Grafana existente (referencia)
- ✅ App Flutter existente (referencia)
- ✅ Web Next.js con diseño moderno integrada (carpeta `web/`)
- ✅ Componentes UI reutilizables implementados
- ⏳ Falta adaptación de contenido a Medusse IoT

---

## Reto 5: Diseño de Interfaces Web HTML/CSS

### Objetivo
Implementar interfaces web estáticas con HTML5 y CSS3.

### Tareas
- [ ] Página principal (landing page)
- [ ] Página de login/registro
- [ ] Dashboard de usuario
- [ ] Página de visualización de sensores
- [ ] Página de configuración
- [ ] Panel de administración
- [ ] Galería de datos históricos

### Entregables
- Código HTML/CSS limpio y comentado
- Sitio web estático funcional
- Documentación de estructura
- Guía de estilos CSS

### Estado Actual
- ✅ Web Next.js 16 con TypeScript implementada
- ✅ Tailwind CSS 4 para estilos
- ✅ Componentes modulares y reutilizables
- ✅ Layout responsive con Header y Footer
- ✅ Secciones: Hero, Products, Services, Technology, About
- ⏳ Falta adaptación de contenido a Medusse IoT
- ⏳ Falta integración con API REST

---

## Reto 6: Plan de Empresa

### Objetivo
Crear un plan de empresa viable para comercializar el proyecto Medusse IoT.

### Tareas
- [ ] Análisis de mercado
- [ ] Modelo de negocio (Canvas)
- [ ] Plan financiero (costes, ingresos, ROI)
- [ ] Estrategia de marketing
- [ ] Análisis DAFO
- [ ] Plan de escalabilidad

### Entregables
- Documento de plan de empresa (PDF)
- Presentación ejecutiva
- Proyecciones financieras
- Análisis de competencia

### Estado Actual
- ⏳ No iniciado

---

## Reto 7: Validación de Formularios por JavaScript

### Objetivo
Implementar validación client-side robusta en todos los formularios.

### Tareas
- [ ] Validación de formulario de login
- [ ] Validación de formulario de registro
- [ ] Validación de formulario de configuración
- [ ] Validación de formulario de administración
- [ ] Mensajes de error personalizados
- [ ] Validación en tiempo real

### Entregables
- Scripts JavaScript de validación
- Documentación de reglas de validación
- Tests de validación
- Ejemplos de uso

### Estado Actual
- ⏳ No implementado (requiere Reto 5)

---

## Reto 8: Transferencia de Datos Front-end/Back-end

### Objetivo
Implementar comunicación eficiente entre cliente y servidor.

### Tareas
- [x] API REST con Express (COMPLETADO)
- [x] Endpoints CRUD (PARCIAL)
- [ ] Integración con web HTML/CSS
- [ ] Manejo de errores HTTP
- [ ] Documentación de API (Swagger/OpenAPI)

### Entregables
- API REST documentada
- Ejemplos de peticiones/respuestas
- Colección Postman
- Manual de integración

### Estado Actual
- ✅ API REST operativa (7 endpoints + energía)
- ✅ WebSocket para tiempo real
- ⏳ Falta integración con web HTML

---

## Reto 9: Gestión de Usuarios (Sesiones/Cookies)

### Objetivo
Implementar sistema de autenticación y autorización seguro.

### Tareas
- [ ] Sistema de registro de usuarios
- [ ] Sistema de login con sesiones
- [ ] Gestión de cookies seguras
- [ ] Tokens JWT para API
- [ ] Middleware de autenticación
- [ ] Cierre de sesión

### Entregables
- Sistema de autenticación funcional
- Documentación de seguridad
- Tests de autenticación
- Manual de usuario

### Estado Actual
- ⏳ No implementado

---

## Reto 10: Panel de Administración de Usuarios

### Objetivo
Crear panel de administración para gestionar usuarios del sistema.

### Tareas
- [ ] Interfaz de listado de usuarios
- [ ] Funcionalidad CRUD de usuarios
- [ ] Asignación de roles/permisos
- [ ] Logs de actividad de usuarios
- [ ] Estadísticas de uso
- [ ] Gestión de sesiones activas

### Entregables
- Panel de administración funcional
- Documentación de funcionalidades
- Manual de administrador
- Tests de funcionalidad

### Estado Actual
- ⏳ No implementado (requiere Reto 9)

---

## Reto 11: Script para Subir Archivos FTP

### Objetivo
Implementar funcionalidad de carga de archivos mediante FTP.

### Tareas
- [ ] Script de conexión FTP
- [ ] Subida de archivos de configuración
- [ ] Subida de logs del sistema
- [ ] Subida de backups de BD
- [ ] Manejo de errores de conexión
- [ ] Logs de transferencias

### Entregables
- Scripts FTP funcionales
- Documentación de uso
- Configuración de servidor FTP
- Manual de troubleshooting

### Estado Actual
- ⏳ No implementado

---

## Reto 12: Comunicación Asíncrona con Servidor

### Objetivo
Implementar comunicación asíncrona para mejorar UX.

### Tareas
- [x] WebSocket para tiempo real (COMPLETADO)
- [ ] AJAX para peticiones asíncronas
- [ ] Fetch API para datos
- [ ] Actualización de UI sin recargar
- [ ] Indicadores de carga
- [ ] Manejo de errores asíncronos

### Entregables
- Sistema de comunicación asíncrona
- Documentación técnica
- Ejemplos de implementación
- Tests de rendimiento

### Estado Actual
- ✅ WebSocket operativo (puerto 3002)
- ⏳ Falta integración AJAX en web HTML

---

## Reto 13: Librería/Framework Entorno Cliente

### Objetivo
Utilizar framework moderno para desarrollo del cliente.

### Tareas
- [x] App Flutter multiplataforma (COMPLETADO)
- [ ] Alternativa: React/Vue/Angular para web
- [ ] Componentes reutilizables
- [ ] Gestión de estado
- [ ] Routing
- [ ] Optimización de rendimiento

### Entregables
- Aplicación cliente funcional
- Documentación de arquitectura
- Guía de componentes
- Manual de desarrollo

### Estado Actual
- ✅ App Flutter completada (3 pantallas, Provider, Material Design 3)
- ⏳ Considerar framework web adicional

---

## Reto 14: Diseño Web Avanzado (Responsive/Animaciones)

### Objetivo
Aplicar técnicas avanzadas de diseño web moderno.

### Tareas
- [ ] Diseño responsive (mobile-first)
- [ ] Media queries para diferentes dispositivos
- [ ] Animaciones CSS/JavaScript
- [ ] Transiciones suaves
- [ ] Lazy loading de imágenes
- [ ] Optimización de rendimiento

### Entregables
- Sitio web responsive completo
- Documentación de breakpoints
- Guía de animaciones
- Tests en múltiples dispositivos

### Estado Actual
- ⏳ No implementado (requiere Reto 5)

---

## Reto 15: Framework Servidor y Arquitecturas Avanzadas

### Objetivo
Implementar arquitectura de servidor moderna y escalable.

### Tareas
- [x] Express.js para API REST (COMPLETADO)
- [x] Docker para contenedores (COMPLETADO)
- [x] Docker Compose para orquestación (COMPLETADO)
- [ ] Patrón MVC en backend
- [ ] Middleware personalizado
- [ ] Arquitectura de microservicios documentada

### Entregables
- Arquitectura de servidor documentada
- Diagramas de arquitectura
- Manual de despliegue
- Guía de escalabilidad

### Estado Actual
- ✅ Express.js operativo
- ✅ Docker Compose con 4 servicios
- ✅ Arquitectura de microservicios funcional
- ⏳ Falta documentación formal de arquitectura

---

## Reto 16: Preparación de Documentación

### Objetivo
Crear documentación completa y profesional para el TFG.

### Tareas
- [ ] Memoria del proyecto (documento principal)
- [ ] Manual de usuario
- [ ] Manual de administrador
- [ ] Manual técnico de desarrollo
- [ ] Documentación de API (Swagger)
- [ ] Presentación para defensa
- [ ] Póster del proyecto
- [ ] Video demostrativo

### Entregables
- Memoria TFG (PDF)
- Manuales completos
- Presentación PowerPoint/PDF
- Material audiovisual
- Código fuente comentado

### Estado Actual
- ✅ README.md completo
- ✅ CHANGELOG.md actualizado
- ✅ MIGRACION.md detallado
- ⏳ Falta memoria formal TFG
- ⏳ Falta presentación defensa

---

## Cronograma Propuesto

### Fase 1: Fundamentos (Semanas 1-3)
- Reto 1: Sostenibilidad
- Reto 2: Base de datos
- Reto 4: Bocetos
- Reto 6: Plan de empresa

### Fase 2: Desarrollo Web (Semanas 4-6)
- Reto 5: Interfaces HTML/CSS
- Reto 7: Validación JavaScript
- Reto 14: Diseño responsive

### Fase 3: Backend y Seguridad (Semanas 7-9)
- Reto 3: Procedimientos almacenados
- Reto 8: Transferencia de datos
- Reto 9: Gestión de usuarios
- Reto 10: Panel de administración

### Fase 4: Funcionalidades Avanzadas (Semanas 10-11)
- Reto 11: FTP
- Reto 12: Comunicación asíncrona
- Reto 13: Framework cliente (revisión)
- Reto 15: Arquitectura servidor (documentación)

### Fase 5: Documentación y Presentación (Semanas 12-14)
- Reto 16: Documentación completa
- Preparación de defensa
- Ensayos de presentación

---

## Recursos Necesarios

### Software
- Visual Studio Code
- Docker Desktop
- Node.js
- Python
- Flutter SDK
- MySQL/PostgreSQL
- Figma/Adobe XD
- Postman
- Git/GitHub

### Documentación
- LaTeX para memoria TFG
- Microsoft Office / Google Docs
- Herramientas de diagramas (draw.io, Lucidchart)

### Hardware
- PC de desarrollo
- Servidor de pruebas (opcional)
- Dispositivos para testing responsive

---

## Criterios de Evaluación

Cada reto será evaluado según:
1. **Completitud** (25%) - ¿Está todo implementado?
2. **Calidad técnica** (25%) - ¿Funciona correctamente?
3. **Documentación** (25%) - ¿Está bien documentado?
4. **Presentación** (25%) - ¿Se puede explicar claramente?

---

## Notas Importantes

- **Rama de trabajo**: Todos los cambios se realizan en rama `clase`
- **Commits frecuentes**: Documentar cada avance
- **Testing continuo**: Verificar cada reto antes de pasar al siguiente
- **Documentación paralela**: Documentar mientras se desarrolla
- **Revisiones periódicas**: Validar avances con tutor

---

**Última actualización**: 2025-11-23  
**Próxima revisión**: Pendiente de planificar
