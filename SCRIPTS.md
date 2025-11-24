# Scripts del Proyecto Medusse IoT

Guía de uso de los scripts batch (.bat) del proyecto.

---

## 📋 Scripts Principales

### 🚀 Instalación

#### `instalar_proyecto.bat`
**Instalación completa automática para equipos nuevos**

- Instala Docker Desktop automáticamente
- Instala Python y dependencias
- Configura todo el proyecto
- **Uso:** Ejecutar en equipos sin Docker

```cmd
instalar_proyecto.bat
```

#### `setup_rapido.bat`
**Setup rápido para equipos con Docker ya instalado**

- Verifica dependencias
- Inicia servicios Docker
- Configura base de datos
- **Uso:** Ejecutar en equipos con Docker

```cmd
setup_rapido.bat
```

---

### ▶️ Ejecución

#### `ejecutar.bat` ⭐ NUEVO
**Script unificado para ejecutar componentes**

Menú interactivo con opciones:
1. Sistema completo (Dashboard + API + Simulador)
2. Solo Dashboard Grafana
3. Solo API REST + WebSocket
4. Solo App Flutter
5. Solo Web Next.js

```cmd
ejecutar.bat
```

#### `sistema_completo.bat`
**Ejecutar ecosistema completo con diagnósticos**

- Inicia todos los servicios Docker
- Inicia simulador de sensores
- Inicia API REST
- Muestra diagnósticos en tiempo real

```cmd
sistema_completo.bat
```

---

### 🧪 Testing y Verificación

#### `probar.bat` ⭐ NUEVO
**Script unificado para testing**

Menú interactivo con opciones:
1. Verificación completa del sistema
2. Verificación rápida (30 segundos)
3. Testing de API REST
4. Testing de autenticación

```cmd
probar.bat
```

#### `verificar.bat`
**Verificación completa del sistema**

- Verifica Docker y servicios
- Verifica Node.js, Python, Flutter
- Verifica conectividad de servicios
- Diagnóstico detallado

```cmd
verificar.bat
```

---

### 🔧 Utilidades

#### `compilar_app.bat`
**Compilar aplicación Flutter para Windows**

- Compila la app Flutter
- Genera ejecutable .exe
- Crea instalador

```cmd
compilar_app.bat
```

#### `configurar_firewall.bat`
**Configurar reglas de firewall de Windows**

- Abre puertos necesarios (3000, 3001, 3002, 3100, 8086)
- Configura excepciones para Docker
- **Requiere:** Ejecutar como Administrador

```cmd
configurar_firewall.bat
```

---

## 📊 Comparación de Scripts

### Scripts Eliminados (consolidados)

Los siguientes scripts fueron **eliminados** y sus funciones integradas en `ejecutar.bat` y `probar.bat`:

| Script Antiguo | Reemplazado Por | Opción |
|----------------|-----------------|--------|
| `demo.bat` | `ejecutar.bat` | Opción 2 |
| `iniciar_api.bat` | `ejecutar.bat` | Opción 3 |
| `ejecutar_flutter.bat` | `ejecutar.bat` | Opción 4 |
| `ejecutar_web.bat` | `ejecutar.bat` | Opción 5 |
| `verificar_rapido.bat` | `probar.bat` | Opción 2 |
| `probar_api.bat` | `probar.bat` | Opción 3 |
| `probar_autenticacion.bat` | `probar.bat` | Opción 4 |
| `probar_autenticacion_guiado.bat` | `probar.bat` | Opción 4 |

---

## 🎯 Flujo de Trabajo Recomendado

### Primera vez (equipo nuevo):
```cmd
1. instalar_proyecto.bat
2. ejecutar.bat → Opción 1 (Sistema completo)
3. probar.bat → Opción 1 (Verificación completa)
```

### Primera vez (con Docker instalado):
```cmd
1. setup_rapido.bat
2. ejecutar.bat → Opción 1 (Sistema completo)
3. probar.bat → Opción 2 (Verificación rápida)
```

### Uso diario:
```cmd
1. ejecutar.bat → Seleccionar componente deseado
2. probar.bat → Testing según necesidad
```

---

## 📝 Notas

- **Todos los scripts** están optimizados para Windows
- **Requieren** ejecutarse desde la raíz del proyecto
- **Algunos scripts** requieren permisos de administrador
- **Los menús** son interactivos y fáciles de usar

---

## 🆘 Solución de Problemas

### Error: "Docker no está corriendo"
**Solución:** Abre Docker Desktop y espera a que inicie completamente

### Error: "Node.js no está instalado"
**Solución:** Ejecuta `instalar_proyecto.bat` o instala Node.js manualmente

### Error: "Puerto ya en uso"
**Solución:** Cierra otras aplicaciones que usen los puertos 3000, 3001, 3002, 3100, 8086

---

**Versión:** 2.5.0
**Última actualización:** 24/11/2025
