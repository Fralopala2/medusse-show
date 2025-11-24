#!/bin/bash

# Script de instalacion para Lliurex (IES Jose Rodrigo Botet)
# Maneja permisos de Docker automaticamente

echo "=========================================="
echo "  MEDUSSE IoT - Instalacion Lliurex"
echo "=========================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funcion para ejecutar docker con o sin sudo
docker_cmd() {
    if docker ps >/dev/null 2>&1; then
        docker "$@"
    else
        echo -e "${YELLOW}Necesitas permisos de administrador para Docker${NC}"
        sudo docker "$@"
    fi
}

docker_compose_cmd() {
    if docker ps >/dev/null 2>&1; then
        docker compose "$@"
    else
        echo -e "${YELLOW}Necesitas permisos de administrador para Docker${NC}"
        sudo docker compose "$@"
    fi
}

# 1. Verificar Docker
echo "1. Verificando Docker..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}ERROR: Docker no esta instalado${NC}"
    exit 1
fi

if docker ps >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Docker funciona sin sudo${NC}"
else
    echo -e "${YELLOW}⚠ Docker requiere sudo (pide al admin agregarte al grupo docker)${NC}"
fi

# 2. Verificar Python
echo ""
echo "2. Verificando Python..."
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}ERROR: Python 3 no esta instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python 3 instalado: $(python3 --version)${NC}"

# 3. Instalar dependencias Python
echo ""
echo "3. Instalando dependencias Python..."
python3 -m pip install --user -r requirements.txt
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencias Python instaladas${NC}"
else
    echo -e "${RED}ERROR: No se pudieron instalar dependencias Python${NC}"
    exit 1
fi

# 4. Verificar Node.js
echo ""
echo "4. Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠ Node.js no esta instalado${NC}"
    echo "Para instalar Node.js sin sudo:"
    echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "  source ~/.bashrc"
    echo "  nvm install 18"
    echo ""
    read -p "¿Quieres continuar sin Node.js? (la API no funcionara) [s/N]: " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✓ Node.js instalado: $(node --version)${NC}"
    
    # Instalar dependencias de la API
    echo ""
    echo "5. Instalando dependencias de la API..."
    cd api
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Dependencias de API instaladas${NC}"
    else
        echo -e "${RED}ERROR: No se pudieron instalar dependencias de API${NC}"
        cd ..
        exit 1
    fi
    cd ..
fi

# 6. Detener contenedores existentes
echo ""
echo "6. Limpiando contenedores anteriores..."
cd docker
docker_compose_cmd down 2>/dev/null
cd ..

# 7. Iniciar servicios Docker
echo ""
echo "7. Iniciando servicios Docker..."
cd docker
docker_compose_cmd up -d
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Servicios Docker iniciados${NC}"
else
    echo -e "${RED}ERROR: No se pudieron iniciar servicios Docker${NC}"
    cd ..
    exit 1
fi
cd ..

# 8. Esperar a que los servicios esten listos
echo ""
echo "8. Esperando a que los servicios esten listos..."
sleep 10

# 9. Verificar servicios
echo ""
echo "9. Verificando servicios..."
echo ""

# Verificar Mosquitto
if docker_cmd ps | grep -q medusse_mosquitto; then
    echo -e "${GREEN}✓ Mosquitto (MQTT Broker)${NC}"
else
    echo -e "${RED}✗ Mosquitto${NC}"
fi

# Verificar InfluxDB
if docker_cmd ps | grep -q medusse_influxdb; then
    echo -e "${GREEN}✓ InfluxDB${NC}"
else
    echo -e "${RED}✗ InfluxDB${NC}"
fi

# Verificar Telegraf
if docker_cmd ps | grep -q medusse_telegraf; then
    echo -e "${GREEN}✓ Telegraf${NC}"
else
    echo -e "${RED}✗ Telegraf${NC}"
fi

# Verificar Grafana
if docker_cmd ps | grep -q medusse_grafana; then
    echo -e "${GREEN}✓ Grafana${NC}"
else
    echo -e "${RED}✗ Grafana${NC}"
fi

echo ""
echo "=========================================="
echo "  INSTALACION COMPLETADA"
echo "=========================================="
echo ""
echo "URLs del sistema:"
echo "  - Grafana: http://localhost:3000 (admin / medusse2025)"
echo "  - API REST: http://localhost:3001"
echo "  - InfluxDB: http://localhost:8086 (admin / medusse2025)"
echo ""
echo "Proximos pasos:"
echo "  1. Ejecutar: ./ejecutar_lliurex.sh"
echo "  2. Abrir Grafana en el navegador"
echo "  3. Verificar: ./verificar_lliurex.sh"
echo ""
