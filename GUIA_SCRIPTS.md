# Scripts de Ejecución - Proyecto Medusse IoT

Guía completa de todos los scripts disponibles para ejecutar el ecosistema Medusse IoT.

## 🚀 Scripts Principales de Ejecución

### 1. `sistema_completo.bat` - **ECOSISTEMA COMPLETO** ⭐

**¿Qué hace?**

- ✅ Inicia servicios Docker (MQTT, InfluxDB, Grafana, Telegraf)
- ✅ Inicia API REST en segundo plano (puerto 3001)
- ✅ Abre Grafana automáticamente (puerto 3000)
- ✅ Abre API health check automáticamente
- ✅ Ejecuta simulador de datos
- ✅ Informa sobre Flutter app

**¿Cuándo usar?**

- Para demostrar el ecosistema completo
- Cuando necesites API REST + Dashboard
- Para desarrollo con múltiples componentes

**Tiempo:** ~5 minutos para estar completamente operativo

### 2. `demo.bat` - **SOLO DASHBOARD GRAFANA**

**¿Qué hace?**

- ✅ Inicia servicios Docker (MQTT, InfluxDB, Grafana, Telegraf)
- ✅ Abre Grafana automáticamente
- ✅ Ejecuta simulador de datos
- ❌ NO inicia API REST
- ❌ NO inicia WebSocket

**¿Cuándo usar?**

- Para demos rápidas solo de Grafana
- Cuando no necesites API REST
- Para presentaciones enfocadas en visualización

**Tiempo:** ~2 minutos para estar operativo

### 3. `iniciar_api.bat` - **SOLO API REST**

**¿Qué hace?**

- ✅ Inicia API REST (puerto 3001)
- ✅ Inicia WebSocket (puerto 3002)
- ✅ Verifica servicios Docker
- ❌ NO inicia servicios Docker
- ❌ NO ejecuta simulador

**¿Cuándo usar?**

- Para desarrollo de API
- Para testing de endpoints
- Cuando Docker ya esté corriendo

### 4. `ejecutar_flutter.bat` - **SOLO APP FLUTTER**

**¿Qué hace?**

- ✅ Verifica Flutter SDK
- ✅ Instala dependencias Flutter
- ✅ Ejecuta app Flutter
- ✅ Verifica API REST disponible
- ❌ NO inicia servicios

**¿Cuándo usar?**

- Para desarrollo de la app móvil
- Para testing de la interfaz Flutter
- Cuando API y servicios ya estén corriendo

## 🔧 Scripts de Instalación y Configuración

### 5. `instalar_proyecto.bat` - **INSTALACIÓN COMPLETA**

**¿Qué hace?**

- ✅ Instala Docker Desktop (si no existe)
- ✅ Instala Python (vía Microsoft Store)
- ✅ Instala Node.js (descarga manual)
- ✅ Verifica Flutter (opcional)
- ✅ Instala dependencias Python y Node.js
- ✅ Configura directorios del proyecto
- ✅ Ejecuta verificación final

**¿Cuándo usar?**

- Primera instalación en equipo nuevo
- Cuando falten dependencias principales
- Para setup completo automatizado

### 6. `setup_rapido.bat` - **SETUP RÁPIDO**

**¿Qué hace?**

- ✅ Verifica Docker (debe estar instalado)
- ✅ Verifica Python (debe estar instalado)
- ✅ Instala dependencias Python
- ✅ Configura proyecto
- ❌ NO instala software base

**¿Cuándo usar?**

- Cuando Docker y Python ya estén instalados
- Para setup rápido en equipos preparados
- Para reconfiguración del proyecto

### 7. `verificar.bat` - **VERIFICACIÓN COMPLETA**

**¿Qué hace?**

- ✅ Verifica Python, Node.js, Flutter, Docker
- ✅ Verifica dependencias instaladas
- ✅ Verifica servicios Docker corriendo
- ✅ Verifica acceso web (Grafana, API)
- ✅ Verifica archivos del proyecto
- ✅ Muestra resumen de opciones

**¿Cuándo usar?**

- Para diagnosticar problemas
- Antes de ejecutar demos
- Para verificar instalación completa

## 📊 Comparación de Scripts

| Script                 | Docker   | API REST | WebSocket | Flutter | Simulador | Tiempo |
| ---------------------- | -------- | -------- | --------- | ------- | --------- | ------ |
| `sistema_completo.bat` | ✅       | ✅       | ✅        | Info    | ✅        | 5 min  |
| `demo.bat`             | ✅       | ❌       | ❌        | ❌      | ✅        | 2 min  |
| `iniciar_api.bat`      | Verifica | ✅       | ✅        | ❌      | ❌        | 30 seg |
| `ejecutar_flutter.bat` | ❌       | Verifica | ❌        | ✅      | ❌        | 1 min  |

## 🎯 Flujos de Trabajo Recomendados

### Para Demostración Completa

```cmd
1. verificar.bat          # Verificar sistema
2. sistema_completo.bat   # Iniciar ecosistema completo
3. ejecutar_flutter.bat   # Ejecutar app móvil (en otra terminal)
```

### Para Demo Rápida (Solo Grafana)

```cmd
1. verificar.bat          # Verificar sistema
2. demo.bat               # Solo dashboard Grafana
```

### Para Desarrollo API

```cmd
1. demo.bat               # Iniciar servicios base
2. iniciar_api.bat        # Desarrollar API (en otra terminal)
```

### Para Desarrollo Flutter

```cmd
1. sistema_completo.bat   # Ecosistema completo
2. ejecutar_flutter.bat   # Desarrollar Flutter (en otra terminal)
```

### Para Primera Instalación

```cmd
1. instalar_proyecto.bat  # Instalación completa
2. verificar.bat          # Verificar instalación
3. sistema_completo.bat   # Probar ecosistema
```

## 🆘 Solución de Problemas por Script

### `sistema_completo.bat` no funciona

```
Problema: API REST no inicia
Solución: Verificar Node.js instalado
Comando: node --version

Problema: Docker no responde
Solución: Iniciar Docker Desktop manualmente
```

### `demo.bat` no muestra datos

```
Problema: No aparecen datos en Grafana
Solución: Verificar simulador corriendo
Verificar: Mensajes 📤 en terminal
```

### `ejecutar_flutter.bat` falla

```
Problema: Flutter no encontrado
Solución: Instalar Flutter SDK
URL: https://flutter.dev/docs/get-started/install
```

### `iniciar_api.bat` error de puerto

```
Problema: Puerto 3001 ocupado
Solución: Cerrar otras instancias de la API
Comando: netstat -ano | findstr :3001
```

## 📁 Ubicación de Scripts

Todos los scripts están en la raíz del proyecto:

```
proyecto-medusse/
├── sistema_completo.bat      # ⭐ Ecosistema completo
├── demo.bat                  # Dashboard Grafana
├── iniciar_api.bat          # API REST
├── ejecutar_flutter.bat     # App Flutter
├── instalar_proyecto.bat    # Instalación completa
├── setup_rapido.bat         # Setup rápido
├── verificar.bat            # Verificación
└── probar_api.bat           # Testing API
```

## 🎉 Recomendación Final

**Para la mayoría de casos, usa `sistema_completo.bat`** - Es el script más completo que muestra todo el ecosistema funcionando.

**Para demos rápidas, usa `demo.bat`** - Más rápido si solo necesitas mostrar Grafana.

---

_Documentación de scripts actualizada para ecosistema v2.0_  
_Francisco Manuel López Alarte - IES José Rodrigo Botet_
