#!/bin/bash

# Script para ejecutar el sistema completo en Linux
# Proyecto Medusse IoT

echo ""
echo "========================================"
echo "  MEDUSSE IoT - EJECUTAR SISTEMA"
echo "========================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar Docker
echo -e "${YELLOW}🔍 Verificando Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no esta instalado${NC}"
    echo "Ejecuta: ./setup_linux.sh"
    exit 1
fi

if ! docker ps &> /dev/null; then
    echo -e "${RED}❌ Docker no esta corriendo${NC}"
    echo "Inicia Docker con: sudo systemctl start docker"
    exit 1
fi

echo -e "${GREEN}✅ Docker corriendo${NC}"

# Iniciar servicios Docker
echo ""
echo -e "${YELLOW}🚀 Iniciando servicios Docker...${NC}"
docker compose -f docker/docker-compose.yml up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Servicios Docker iniciados${NC}"
else
    echo -e "${RED}❌ Error al iniciar servicios Docker${NC}"
    exit 1
fi

# Esperar a que los servicios inicien
echo ""
echo -e "${YELLOW}⏳ Esperando 15 segundos para que los servicios inicien...${NC}"
sleep 15

# Iniciar simulador
echo ""
echo -e "${YELLOW}🚀 Iniciando simulador de sensores...${NC}"
cd arduino
python3 medusse_simulator.py > /dev/null 2>&1 &
SIMULATOR_PID=$!
cd ..
echo -e "${GREEN}✅ Simulador iniciado (PID: $SIMULATOR_PID)${NC}"

# Iniciar API REST
echo ""
echo -e "${YELLOW}🚀 Iniciando API REST...${NC}"
cd api
node server.js > /dev/null 2>&1 &
API_PID=$!
cd ..
echo -e "${GREEN}✅ API REST iniciada (PID: $API_PID)${NC}"

# Esperar a que la API inicie
sleep 3

# Iniciar Web Next.js
echo ""
echo -e "${YELLOW}🚀 Iniciando Web Next.js...${NC}"
cd web
npm run dev > /dev/null 2>&1 &
WEB_PID=$!
cd ..
echo -e "${GREEN}✅ Web Next.js iniciada (PID: $WEB_PID)${NC}"

# Guardar PIDs para poder detener despues
echo "$SIMULATOR_PID" > /tmp/medusse_simulator.pid
echo "$API_PID" > /tmp/medusse_api.pid
echo "$WEB_PID" > /tmp/medusse_web.pid

# Resumen
echo ""
echo "========================================"
echo "  ✅ SISTEMA INICIADO"
echo "========================================"
echo ""
echo -e "${GREEN}Servicios corriendo:${NC}"
echo "  ✓ Docker Compose (Grafana, InfluxDB, MySQL, MQTT, Telegraf)"
echo "  ✓ Simulador de sensores (PID: $SIMULATOR_PID)"
echo "  ✓ API REST (PID: $API_PID)"
echo "  ✓ Web Next.js (PID: $WEB_PID)"
echo ""
echo -e "${YELLOW}URLs disponibles:${NC}"
echo "  📊 Grafana:    http://localhost:3000 (admin / medusse2025)"
echo "  🌐 Web:        http://localhost:3003"
echo "  🔐 Login:      http://localhost:3003/login"
echo "  🔌 API:        http://localhost:3001"
echo "  📈 InfluxDB:   http://localhost:8086"
echo ""
echo -e "${YELLOW}Para detener el sistema:${NC}"
echo "  ./detener_linux.sh"
echo ""
echo -e "${YELLOW}Para ver logs:${NC}"
echo "  docker compose -f docker/docker-compose.yml logs -f"
echo ""
