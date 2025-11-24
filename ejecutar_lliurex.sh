#!/bin/bash

# Script de ejecucion para Lliurex
# Inicia todo el ecosistema Medusse IoT

echo "=========================================="
echo "  MEDUSSE IoT - Sistema Completo"
echo "=========================================="
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Funcion para ejecutar docker con o sin sudo
docker_compose_cmd() {
    if docker ps >/dev/null 2>&1; then
        docker compose "$@"
    else
        sudo docker compose "$@"
    fi
}

# 1. Iniciar servicios Docker
echo -e "${BLUE}1. Iniciando servicios Docker...${NC}"
cd docker
docker_compose_cmd up -d
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Servicios Docker iniciados${NC}"
else
    echo -e "${RED}✗ Error al iniciar servicios Docker${NC}"
    cd ..
    exit 1
fi
cd ..

# Esperar a que los servicios esten listos
echo ""
echo -e "${BLUE}Esperando a que los servicios esten listos...${NC}"
sleep 5

# 2. Iniciar simulador
echo ""
echo -e "${BLUE}2. Iniciando simulador ESP32...${NC}"
cd arduino
python3 medusse_simulator.py &
SIMULATOR_PID=$!
echo -e "${GREEN}✓ Simulador iniciado (PID: $SIMULATOR_PID)${NC}"
cd ..

# Esperar a que el simulador genere datos
sleep 3

# 3. Iniciar API REST
echo ""
echo -e "${BLUE}3. Iniciando API REST...${NC}"
if command -v node &> /dev/null; then
    cd api
    node server.js &
    API_PID=$!
    echo -e "${GREEN}✓ API REST iniciada (PID: $API_PID)${NC}"
    cd ..
else
    echo -e "${YELLOW}⚠ Node.js no disponible, API no iniciada${NC}"
fi

# 4. Mostrar informacion
echo ""
echo "=========================================="
echo "  SISTEMA INICIADO"
echo "=========================================="
echo ""
echo -e "${GREEN}URLs disponibles:${NC}"
echo "  - Grafana Dashboard: http://localhost:3000"
echo "    Usuario: admin"
echo "    Password: medusse2025"
echo ""
echo "  - API REST: http://localhost:3001"
echo "  - API Health: http://localhost:3001/health"
echo "  - API Summary: http://localhost:3001/api/summary"
echo ""
echo "  - InfluxDB: http://localhost:8086"
echo "    Usuario: admin"
echo "    Password: medusse2025"
echo ""
echo -e "${YELLOW}Procesos en ejecucion:${NC}"
echo "  - Simulador PID: $SIMULATOR_PID"
if [ ! -z "$API_PID" ]; then
    echo "  - API REST PID: $API_PID"
fi
echo ""
echo -e "${BLUE}Para detener el sistema:${NC}"
echo "  ./detener_lliurex.sh"
echo ""
echo -e "${BLUE}Para verificar el sistema:${NC}"
echo "  ./verificar_lliurex.sh"
echo ""

# Guardar PIDs para poder detenerlos despues
echo $SIMULATOR_PID > /tmp/medusse_simulator.pid
if [ ! -z "$API_PID" ]; then
    echo $API_PID > /tmp/medusse_api.pid
fi

echo "Presiona Ctrl+C para detener el sistema..."
echo ""

# Esperar a que el usuario presione Ctrl+C
trap './detener_lliurex.sh; exit' INT
wait
