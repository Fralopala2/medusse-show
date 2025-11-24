#!/bin/bash

# Script de verificacion del sistema en Linux
# Proyecto Medusse IoT

echo ""
echo "========================================"
echo "  MEDUSSE IoT - VERIFICACION"
echo "========================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar Docker
echo -e "${YELLOW}🔍 Verificando Docker...${NC}"
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✅ Docker instalado: $(docker --version | cut -d' ' -f3 | tr -d ',')${NC}"
    
    if docker ps &> /dev/null; then
        echo -e "${GREEN}✅ Docker corriendo${NC}"
    else
        echo -e "${RED}❌ Docker no esta corriendo${NC}"
    fi
else
    echo -e "${RED}❌ Docker no instalado${NC}"
fi

# Verificar Node.js
echo ""
echo -e "${YELLOW}🔍 Verificando Node.js...${NC}"
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js instalado: $(node --version)${NC}"
else
    echo -e "${RED}❌ Node.js no instalado${NC}"
fi

# Verificar Python
echo ""
echo -e "${YELLOW}🔍 Verificando Python...${NC}"
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✅ Python 3 instalado: $(python3 --version | cut -d' ' -f2)${NC}"
else
    echo -e "${RED}❌ Python 3 no instalado${NC}"
fi

# Verificar servicios Docker
echo ""
echo -e "${YELLOW}🔍 Verificando servicios Docker...${NC}"

SERVICES=("medusse_grafana" "medusse_influxdb" "medusse_mysql" "medusse_mosquitto" "medusse_telegraf")

for service in "${SERVICES[@]}"; do
    if docker ps --format '{{.Names}}' | grep -q "^${service}$"; then
        echo -e "${GREEN}✅ $service corriendo${NC}"
    else
        echo -e "${RED}❌ $service no corriendo${NC}"
    fi
done

# Verificar procesos
echo ""
echo -e "${YELLOW}🔍 Verificando procesos...${NC}"

if pgrep -f "medusse_simulator.py" > /dev/null; then
    echo -e "${GREEN}✅ Simulador corriendo${NC}"
else
    echo -e "${RED}❌ Simulador no corriendo${NC}"
fi

if pgrep -f "node server.js" > /dev/null; then
    echo -e "${GREEN}✅ API REST corriendo${NC}"
else
    echo -e "${RED}❌ API REST no corriendo${NC}"
fi

if pgrep -f "npm run dev" > /dev/null; then
    echo -e "${GREEN}✅ Web Next.js corriendo${NC}"
else
    echo -e "${RED}❌ Web Next.js no corriendo${NC}"
fi

# Verificar conectividad
echo ""
echo -e "${YELLOW}🔍 Verificando conectividad...${NC}"

# Grafana
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Grafana accesible (http://localhost:3000)${NC}"
else
    echo -e "${RED}❌ Grafana no accesible${NC}"
fi

# API REST
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API REST accesible (http://localhost:3001)${NC}"
else
    echo -e "${RED}❌ API REST no accesible${NC}"
fi

# Web Next.js
if curl -s http://localhost:3003 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Web Next.js accesible (http://localhost:3003)${NC}"
else
    echo -e "${RED}❌ Web Next.js no accesible${NC}"
fi

# Resumen
echo ""
echo "========================================"
echo "  VERIFICACION COMPLETADA"
echo "========================================"
echo ""
