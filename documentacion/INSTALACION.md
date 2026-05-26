# Instalación Proyecto Medusse IoT

Guía completa de instalación para **Windows**, **Linux** y **Lliurex**.

---

## 📋 Requisitos del Sistema

### Mínimos
- **RAM:** 4 GB mínimo, 8 GB recomendado
- **Espacio:** 2 GB libres
- **Internet:** Para descargar Docker y dependencias

### Software Necesario
- **Docker Desktop** (se instala automáticamente)
- **Python 3.7+**
- **Node.js 18+** (opcional para API)

---

## 🪟 Instalación en Windows

### Opción 1: Instalación Automática (Recomendada)

#### Para Equipos Nuevos (Sin Docker)
```cmd
instalar_proyecto.bat
```

**Este script instala automáticamente:**
- ✅ Docker Desktop
- ✅ Python y dependencias
- ✅ Configuración completa del proyecto
- ✅ Verificación del sistema

#### Para Equipos con Docker Ya Instalado
```cmd
setup_rapido.bat
```

### Opción 2: Instalación Manual

#### 1. Instalar Docker Desktop
1. Descargar desde: https://www.docker.com/products/docker-desktop
2. Ejecutar instalador
3. **REINICIAR** el equipo
4. Abrir Docker Desktop y esperar a que se inicie

#### 2. Instalar Python
1. Abrir Microsoft Store
2. Buscar "Python 3.11"
3. Instalar
4. Verificar: `python --version`

#### 3. Instalar Dependencias
```cmd
python -m pip install paho-mqtt requests
```

#### 4. Verificar Instalación
```cmd
verificar.bat
```

### Ejecutar el Proyecto en Windows

```cmd
medusse.bat                # Menu principal unificado
sistema_completo.bat       # Sistema completo
verificar.bat              # Verificacion completa
```

---

## 🐧 Instalación en Linux (Ubuntu/Debian)

### Opción 1: Instalación Automática (Recomendada)

```bash
# 1. Clonar el repositorio
cd ~
git clone https://github.com/Fralopala2/medusse-show.git
cd medusse-show
git checkout clase

# 2. Dar permisos y ejecutar
chmod +x setup_linux.sh
./setup_linux.sh
```

Este script instalará automáticamente:
- Docker y Docker Compose
- Node.js (v20 LTS)
- Python 3 y pip
- Todas las dependencias del proyecto

### Opción 2: Instalación Manual

#### 1. Instalar Docker

```bash
# Actualizar sistema
sudo apt update
sudo apt upgrade -y

# Instalar dependencias
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Agregar repositorio de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Verificar instalacion
docker --version
docker compose version
```

#### 2. Instalar Node.js

```bash
# Instalar Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalacion
node --version
npm --version
```

#### 3. Instalar Python 3 y pip

```bash
sudo apt install -y python3 python3-pip

# Verificar instalacion
python3 --version
pip3 --version
```

#### 4. Instalar Dependencias del Proyecto

```bash
# Dependencias Python
pip3 install -r requirements.txt

# Dependencias Node.js (API)
cd api
npm install
cd ..

# Dependencias Next.js (Web)
cd web
npm install
cd ..
```

### Ejecutar el Proyecto en Linux

```bash
./ejecutar_linux.sh        # Sistema completo
./verificar_linux.sh       # Verificacion completa
./detener_linux.sh         # Detener sistema
```

---

## 🎓 Instalación en Lliurex (IES José Rodrigo Botet)

### Problema Común: Permisos de Docker

En los ordenadores de clase con Lliurex, Docker está instalado pero los usuarios normales no tienen permisos para usarlo.

### Solución Recomendada (Requiere Admin UNA SOLA VEZ)

Pedir al administrador que ejecute este comando **una sola vez**:

```bash
sudo usermod -aG docker fralopala2
```

Después de esto:
1. Cerrar sesión completamente
2. Volver a iniciar sesión
3. Verificar con: `docker ps`

Si funciona sin pedir sudo, ya está solucionado permanentemente.

### Solución Alternativa (Sin modificar permisos)

Si no es posible modificar los permisos, usar los scripts especiales para Lliurex:

```bash
# 1. Clonar o copiar el proyecto
cd ~/Documentos
git clone https://github.com/Fralopala2/medusse-show.git
cd medusse-show
git checkout clase

# 2. Dar permisos de ejecucion
chmod +x setup_lliurex.sh
chmod +x ejecutar_lliurex.sh
chmod +x verificar_lliurex.sh
chmod +x detener_lliurex.sh

# 3. Ejecutar instalacion (pedira password solo cuando sea necesario)
./setup_lliurex.sh
```

### Ejecutar el Proyecto en Lliurex

```bash
./ejecutar_lliurex.sh      # Iniciar sistema completo
./verificar_lliurex.sh     # Verificar funcionamiento
./detener_lliurex.sh       # Detener sistema
```

### Instalación de Node.js sin sudo (si es necesario)

```bash
# Instalar nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recargar configuracion
source ~/.bashrc

# Instalar Node.js
nvm install 18
nvm use 18

# Verificar
node --version
npm --version
```

---

## 🌐 Acceder a los Servicios

Una vez todo esté corriendo:

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Grafana Dashboard** | http://localhost:3000 | admin / medusse2025 |
| **Web Next.js** | http://localhost:3003 | - |
| **Login Web** | http://localhost:3003/login | admin / medusse2025 |
| **API REST** | http://localhost:3001 | - |
| **InfluxDB** | http://localhost:8086 | admin / medusse2025 |

---

## 🔍 Verificación del Sistema

### Windows
```cmd
verificar.bat
```

### Linux / Lliurex
```bash
./verificar_linux.sh
# o
./verificar_lliurex.sh
```

### Verificación Manual

```bash
# Verificar Docker
docker --version
docker ps

# Verificar Node.js
node --version

# Verificar Python
python --version  # Windows
python3 --version # Linux/Lliurex

# Verificar servicios corriendo
curl http://localhost:3001/health
curl http://localhost:3000
```

---

## 🐛 Solución de Problemas

### Windows

#### Error: "Docker no encontrado"
**Solución:**
1. Instalar Docker Desktop manualmente
2. Reiniciar el equipo
3. Ejecutar `setup_rapido.bat`

#### Error: "Python no encontrado"
**Solución:**
1. Instalar Python desde Microsoft Store
2. Reiniciar terminal
3. Ejecutar script de nuevo

#### Servicios no funcionan
```cmd
docker compose -f docker/docker-compose.yml down
docker volume prune -f
docker compose -f docker/docker-compose.yml up -d
```

### Linux / Lliurex

#### Docker no inicia
```bash
# Verificar estado del servicio
sudo systemctl status docker

# Iniciar Docker
sudo systemctl start docker

# Habilitar Docker al inicio
sudo systemctl enable docker
```

#### Permisos de Docker
```bash
# Si ves errores de permisos
sudo usermod -aG docker $USER
newgrp docker

# O reinicia la sesion
```

#### Puerto ocupado
```bash
# Ver que proceso usa el puerto 3000
sudo lsof -i :3000

# Matar proceso (reemplaza PID)
kill -9 PID
```

#### Error: "permission denied" al ejecutar docker (Lliurex)
**Causa**: Tu usuario no está en el grupo docker

**Solución**: Usar scripts con sudo o pedir al admin que te agregue al grupo

---

## 🔐 Firewall

### Windows
El script de instalación configura automáticamente el firewall.

### Linux / Lliurex
Si tienes firewall activo:

```bash
# Abrir puertos necesarios
sudo ufw allow 3000/tcp  # Grafana
sudo ufw allow 3001/tcp  # API REST
sudo ufw allow 3002/tcp  # WebSocket
sudo ufw allow 3003/tcp  # Web Next.js
sudo ufw allow 8086/tcp  # InfluxDB
sudo ufw allow 1883/tcp  # MQTT

# Verificar reglas
sudo ufw status
```

---

## 📦 Para Profesores/Compañeros

### Instalación Rápida

**Windows:**
```cmd
instalar_proyecto.bat
```

**Linux/Lliurex:**
```bash
./setup_linux.sh
# o
./setup_lliurex.sh
```

### Demo Rápida (5 minutos)

1. Verificar sistema
2. Ejecutar proyecto completo
3. Abrir http://localhost:3000 en el navegador
4. Ver dashboard con datos en tiempo real

### Qué Verán
- **Dashboard profesional** con datos de 4 ubicaciones
- **18 tipos de sensores** monitoreados
- **Datos en tiempo real** actualizándose cada 30 segundos
- **Sistema de alertas** visual (CO2, batería)

---

## 📁 Archivos de Instalación

| Sistema | Archivos |
|---------|----------|
| **Windows** | `instalar_proyecto.bat`, `setup_rapido.bat`, `medusse.bat` |
| **Linux** | `setup_linux.sh`, `ejecutar_linux.sh`, `verificar_linux.sh` |
| **Lliurex** | `setup_lliurex.sh`, `ejecutar_lliurex.sh`, `verificar_lliurex.sh` |

---

## ✅ Checklist de Instalación

- [ ] Docker instalado y funcionando
- [ ] Python instalado
- [ ] Node.js instalado (opcional)
- [ ] Repositorio clonado
- [ ] Dependencias instaladas
- [ ] Servicios Docker iniciados
- [ ] Grafana accesible en http://localhost:3000
- [ ] API REST respondiendo en http://localhost:3001
- [ ] Web Next.js en http://localhost:3003

---

## 📚 Recursos Adicionales

- **Docker**: https://docs.docker.com/get-docker/
- **Node.js**: https://nodejs.org/
- **Python**: https://www.python.org/
- **Repositorio**: https://github.com/Fralopala2/medusse-show

---

**¡El proyecto está listo para ser ejecutado en cualquier sistema operativo!** 🚀

**Versión**: 2.7.7  
**Última actualización**: 30/11/2025  
**Autor**: Francisco Manuel López Alarte  
**Institución**: IES José Rodrigo Botet
