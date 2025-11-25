#!/bin/bash

# Script para detener el sistema Medusse IoT en Lliurex

echo "=========================================="
echo "  MEDUSSE IoT - Deteniendo Sistema"
echo "=========================================="
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Funcion para ejecutar docker con o sin sudo
docker_compose_cmd() {
    if docker ps >/dev/null 2>&1; then
        docker compose "$@"
    else
        sudo docker compose "$@"
    fi
}

# 1. Detener simulador
echo "1. Deteniendo simulador..."
if [ -f /tmp/medusse_simulator.pid ]; then
    PID=$(cat /tmp/medusse_simulator.pid)
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID 2>/dev/null
        echo -e "${GREEN}✓ Simulador detenido${NC}"
    else
        echo -e "${YELLOW}⚠ Simulador ya estaba detenido${NC}"
    fi
    rm /tmp/medusse_simulator.pid
else
    # Intentar encontrar y matar el proceso
    pkill -f "medusse_simulator.py" 2>/dev/null
    echo -e "${YELLOW}⚠ PID del simulador no encontrado${NC}"
fi

# 2. Detener API
echo ""
echo "2. Deteniendo API REST..."
if [ -f /tmp/medusse_api.pid ]; then
    PID=$(cat /tmp/medusse_api.pid)
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID 2>/dev/null
        echo -e "${GREEN}✓ API REST detenida${NC}"
    else
        echo -e "${YELLOW}⚠ API REST ya estaba detenida${NC}"
    fi
    rm /tmp/medusse_api.pid
else
    # Intentar encontrar y matar el proceso
    pkill -f "node server.js" 2>/dev/null
    echo -e "${YELLOW}⚠ PID de la API no encontrado${NC}"
fi

# 3. Detener servicios Docker
echo ""
echo "3. Deteniendo servicios Docker..."
cd docker
docker_compose_cmd down
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Servicios Docker detenidos${NC}"
else
    echo -e "${RED}✗ Error al detener servicios Docker${NC}"
fi
cd ..

echo ""
echo "=========================================="
echo -e "${GREEN}  SISTEMA DETENIDO${NC}"
echo "=========================================="
echo ""
echo "Para volver a iniciar el sistema:"
echo "  ./ejecutar_lliurex.sh"
echo ""
