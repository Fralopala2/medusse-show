# Instalacion en Linux (Lliurex/Ubuntu/Debian)

Guia completa para instalar y ejecutar el proyecto Medusse IoT en sistemas Linux.

---

## 📋 Requisitos Previos

- **Sistema Operativo**: Lliurex, Ubuntu 20.04+, Debian 11+
- **Permisos**: Usuario con sudo
- **Conexion a Internet**: Para descargar dependencias

---

## 🚀 Instalacion Automatica (Recomendada)

### Paso 1: Clonar el Repositorio

```bash
cd ~
git clone https://github.com/Fralopala2/proyecto-medusse.git
cd proyecto-medusse
git checkout clase
```

### Paso 2: Ejecutar Script de Instalacion

```bash
chmod +x setup_linux.sh
./setup_linux.sh
```

Este script instalara automaticamente:
- Docker y Docker Compose
- Node.js (v20 LTS)
- Python 3 y pip
- Flutter (opcional)
- Todas las dependencias del proyecto

---

## 🔧 Instalacion Manual

Si prefieres instalar manualmente o el script falla:

### 1. Instalar Docker

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

# Agregar usuario al grupo docker (para no usar sudo)
sudo usermod -aG docker $USER

# Aplicar cambios (cerrar sesion y volver a entrar, o ejecutar)
newgrp docker

# Verificar instalacion
docker --version
docker compose version
```

### 2. Instalar Node.js

```bash
# Instalar Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalacion
node --version
npm --version
```

### 3. Instalar Python 3 y pip

```bash
# Python 3 suele venir instalado en Lliurex/Ubuntu
sudo apt install -y python3 python3-pip

# Verificar instalacion
python3 --version
pip3 --version
```

### 4. Instalar Dependencias del Proyecto

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

### 5. (Opcional) Instalar Flutter

```bash
# Descargar Flutter
cd ~
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.16.0-stable.tar.xz
tar xf flutter_linux_3.16.0-stable.tar.xz

# Agregar al PATH
echo 'export PATH="$PATH:$HOME/flutter/bin"' >> ~/.bashrc
source ~/.bashrc

# Verificar instalacion
flutter doctor
```

---

## ▶️ Ejecutar el Proyecto

### Opcion 1: Sistema Completo (Recomendada)

```bash
./ejecutar_linux.sh
```

### Opcion 2: Paso a Paso

#### 1. Iniciar Servicios Docker

```bash
docker compose -f docker/docker-compose.yml up -d
```

Espera 15 segundos para que los servicios inicien.

#### 2. Iniciar Simulador

```bash
python3 arduino/medusse_simulator.py &
```

#### 3. Iniciar API REST

```bash
cd api
node server.js &
cd ..
```

#### 4. Iniciar Web Next.js

```bash
cd web
npm run dev &
cd ..
```

#### 5. (Opcional) Iniciar App Flutter

```bash
cd medusse_app
flutter run -d linux
cd ..
```

---

## 🌐 Acceder a los Servicios

Una vez todo este corriendo:

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Grafana Dashboard** | http://localhost:3000 | admin / medusse2025 |
| **Web Next.js** | http://localhost:3003 | - |
| **Login Web** | http://localhost:3003/login | admin / medusse2025 |
| **API REST** | http://localhost:3001 | - |
| **InfluxDB** | http://localhost:8086 | admin / medusse2025 |

---

## 🛑 Detener el Proyecto

### Detener Servicios Docker

```bash
docker compose -f docker/docker-compose.yml down
```

### Detener Procesos en Background

```bash
# Ver procesos
ps aux | grep -E "node|python3"

# Matar procesos (reemplaza PID con el numero del proceso)
kill PID
```

O usar el script:

```bash
./detener_linux.sh
```

---

## 🔍 Verificacion del Sistema

### Script de Verificacion

```bash
./verificar_linux.sh
```

### Verificacion Manual

```bash
# Verificar Docker
docker --version
docker ps

# Verificar Node.js
node --version

# Verificar Python
python3 --version

# Verificar servicios corriendo
curl http://localhost:3001/health
curl http://localhost:3000
```

---

## 🐛 Solucion de Problemas

### Docker no inicia

```bash
# Verificar estado del servicio
sudo systemctl status docker

# Iniciar Docker
sudo systemctl start docker

# Habilitar Docker al inicio
sudo systemctl enable docker
```

### Permisos de Docker

```bash
# Si ves errores de permisos
sudo usermod -aG docker $USER
newgrp docker

# O reinicia la sesion
```

### Puerto ocupado

```bash
# Ver que proceso usa el puerto 3000
sudo lsof -i :3000

# Matar proceso (reemplaza PID)
kill -9 PID
```

### MySQL no conecta

```bash
# Reiniciar contenedor MySQL
docker restart medusse_mysql

# Ver logs
docker logs medusse_mysql
```

---

## 📝 Diferencias con Windows

### Ventajas en Linux:

✅ **Docker nativo** - Mejor rendimiento
✅ **Sin WSL2** - Menos overhead
✅ **Comandos nativos** - Bash en lugar de PowerShell
✅ **Permisos simples** - Sin problemas de firewall
✅ **Mas estable** - Menos problemas de compatibilidad

### Cambios en Comandos:

| Windows | Linux |
|---------|-------|
| `instalar_proyecto.bat` | `./setup_linux.sh` |
| `sistema_completo.bat` | `./ejecutar_linux.sh` |
| `verificar.bat` | `./verificar_linux.sh` |
| `python` | `python3` |
| `\` (rutas) | `/` (rutas) |

---

## 🔐 Firewall en Lliurex

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

## 📦 Dependencias Especificas de Lliurex

Lliurex puede necesitar paquetes adicionales:

```bash
# Herramientas de desarrollo
sudo apt install -y build-essential git curl wget

# Librerias para Flutter (si usas la app)
sudo apt install -y clang cmake ninja-build pkg-config libgtk-3-dev

# Librerias para Python
sudo apt install -y python3-dev python3-venv
```

---

## 🚀 Optimizaciones para Linux

### 1. Usar systemd para Servicios

Crear servicio para que inicie automaticamente:

```bash
sudo nano /etc/systemd/system/medusse.service
```

Contenido:

```ini
[Unit]
Description=Medusse IoT System
After=docker.service
Requires=docker.service

[Service]
Type=forking
User=tu_usuario
WorkingDirectory=/home/tu_usuario/proyecto-medusse
ExecStart=/home/tu_usuario/proyecto-medusse/ejecutar_linux.sh
ExecStop=/home/tu_usuario/proyecto-medusse/detener_linux.sh

[Install]
WantedBy=multi-user.target
```

Habilitar:

```bash
sudo systemctl enable medusse
sudo systemctl start medusse
```

### 2. Alias Utiles

Agregar a `~/.bashrc`:

```bash
alias medusse-start='cd ~/proyecto-medusse && ./ejecutar_linux.sh'
alias medusse-stop='cd ~/proyecto-medusse && ./detener_linux.sh'
alias medusse-logs='docker compose -f ~/proyecto-medusse/docker/docker-compose.yml logs -f'
alias medusse-status='cd ~/proyecto-medusse && ./verificar_linux.sh'
```

---

## 📚 Recursos Adicionales

- **Docker en Linux**: https://docs.docker.com/engine/install/ubuntu/
- **Node.js en Linux**: https://nodejs.org/en/download/package-manager
- **Flutter en Linux**: https://docs.flutter.dev/get-started/install/linux
- **Lliurex**: https://wiki.lliurex.net/

---

## ✅ Checklist de Instalacion

- [ ] Docker instalado y funcionando
- [ ] Node.js v20+ instalado
- [ ] Python 3 instalado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas
- [ ] Servicios Docker iniciados
- [ ] Grafana accesible en http://localhost:3000
- [ ] API REST respondiendo en http://localhost:3001
- [ ] Web Next.js en http://localhost:3003

---

**Nota**: Si encuentras algun problema especifico de Lliurex, consulta la documentacion oficial o abre un issue en el repositorio.

**Version**: 2.5.0
**Ultima actualizacion**: 24/11/2025
