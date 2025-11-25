#!/bin/bash

# Script para detener el sistema completo en Linux
# Proyecto Medusse IoT

echo ""
echo "========================================"
echo "  MEDUSSE IoT - DETENER SISTEMA"
echo "========================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Detener procesos Node.js y Python
echo -e "${YELLOW}🛑 Deteniendo procesos...${NC}"

# Detener simulador
if [ -f /tmp/medusse_simulator.pid ]; then
    PID=$(cat /tmp/medusse_simulator.pid)
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID 2>/dev/null
        echo -e "${GREEN}✅ Simulador detenido (PID: $PID)${NC}"
    fi
    rm /tmp/medusse_simulator.pid
fi

# Detener API
if [ -f /tmp/medusse_api.pid ]; then
    PID=$(cat /tmp/medusse_api.pid)
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID 2>/dev/null
        echo -e "${GREEN}✅ API REST detenida (PID: $PID)${NC}"
    fi
    rm /tmp/medusse_api.pid
fi

# Detener Web
if [ -f /tmp/medusse_web.pid ]; then
    PID=$(cat /tmp/medusse_web.pid)
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID 2>/dev/null
        echo -e "${GREEN}✅ Web Next.js detenida (PID: $PID)${NC}"
    fi
    rm /tmp/medusse_web.pid
fi

# Detener cualquier proceso restante
echo ""
echo -e "${YELLOW}🔍 Buscando procesos restantes...${NC}"

# Matar procesos de node y python3 relacionados con el proyecto
pkill -f "medusse_simulator.py" 2>/dev/null
pkill -f "node server.js" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null

# Detener servicios Docker
echo ""
echo -e "${YELLOW}🛑 Deteniendo servicios Docker...${NC}"
docker compose -f docker/docker-compose.yml down

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Servicios Docker detenidos${NC}"
else
    echo -e "${RED}❌ Error al detener servicios Docker${NC}"
fi

# Resumen
echo ""
echo "========================================"
echo "  ✅ SISTEMA DETENIDO"
echo "========================================"
echo ""
echo -e "${GREEN}Todos los servicios han sido detenidos${NC}"
echo ""
echo -e "${YELLOW}Para volver a iniciar:${NC}"
echo "  ./ejecutar_linux.sh"
echo ""
