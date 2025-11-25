#!/bin/bash

# Script de verificacion para Lliurex

echo "=========================================="
echo "  MEDUSSE IoT - Verificacion del Sistema"
echo "=========================================="
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Funcion para ejecutar docker con o sin sudo
docker_cmd() {
    if docker ps >/dev/null 2>&1; then
        docker "$@"
    else
        sudo docker "$@"
    fi
}

# 1. Verificar Docker
echo -e "${BLUE}1. Verificando Docker...${NC}"
if docker_cmd ps >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Docker funcionando${NC}"
else
    echo -e "${RED}✗ Docker no esta funcionando${NC}"
    exit 1
fi

# 2. Verificar contenedores
echo ""
echo -e "${BLUE}2. Verificando contenedores Docker...${NC}"

containers=("medusse_mosquitto" "medusse_influxdb" "medusse_telegraf" "medusse_grafana")
all_running=true

for container in "${containers[@]}"; do
    if docker_cmd ps | grep -q $container; then
        echo -e "${GREEN}✓ $container${NC}"
    else
        echo -e "${RED}✗ $container no esta corriendo${NC}"
        all_running=false
    fi
done

# 3. Verificar simulador
echo ""
echo -e "${BLUE}3. Verificando simulador...${NC}"
if [ -f /tmp/medusse_simulator.pid ]; then
    PID=$(cat /tmp/medusse_simulator.pid)
    if ps -p $PID > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Simulador corriendo (PID: $PID)${NC}"
    else
        echo -e "${RED}✗ Simulador no esta corriendo${NC}"
    fi
else
    echo -e "${YELLOW}⚠ No se encuentra PID del simulador${NC}"
fi

# 4. Verificar API
echo ""
echo -e "${BLUE}4. Verificando API REST...${NC}"
if command -v curl &> /dev/null; then
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo -e "${GREEN}✓ API REST respondiendo${NC}"
    else
        echo -e "${YELLOW}⚠ API REST no responde${NC}"
    fi
else
    if [ -f /tmp/medusse_api.pid ]; then
        PID=$(cat /tmp/medusse_api.pid)
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${GREEN}✓ API REST corriendo (PID: $PID)${NC}"
        else
            echo -e "${RED}✗ API REST no esta corriendo${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ No se encuentra PID de la API${NC}"
    fi
fi

# 5. Verificar puertos
echo ""
echo -e "${BLUE}5. Verificando puertos...${NC}"

ports=("1883:Mosquitto" "8086:InfluxDB" "3000:Grafana" "3001:API")

for port_info in "${ports[@]}"; do
    IFS=':' read -r port service <<< "$port_info"
    if netstat -tuln 2>/dev/null | grep -q ":$port " || ss -tuln 2>/dev/null | grep -q ":$port "; then
        echo -e "${GREEN}✓ Puerto $port ($service)${NC}"
    else
        echo -e "${RED}✗ Puerto $port ($service) no esta escuchando${NC}"
    fi
done

# 6. Verificar datos en InfluxDB
echo ""
echo -e "${BLUE}6. Verificando datos en InfluxDB...${NC}"
if command -v curl &> /dev/null; then
    # Intentar consultar datos
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: Token medusse-admin-token-2025" \
        "http://localhost:8086/api/v2/query?org=iescelia" \
        -d 'from(bucket:"sensors") |> range(start: -1m) |> limit(n:1)')
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✓ InfluxDB respondiendo correctamente${NC}"
    else
        echo -e "${YELLOW}⚠ InfluxDB responde pero puede no tener datos aun${NC}"
    fi
else
    echo -e "${YELLOW}⚠ curl no disponible, no se puede verificar datos${NC}"
fi

# Resumen
echo ""
echo "=========================================="
if [ "$all_running" = true ]; then
    echo -e "${GREEN}  SISTEMA FUNCIONANDO CORRECTAMENTE${NC}"
else
    echo -e "${YELLOW}  SISTEMA PARCIALMENTE FUNCIONAL${NC}"
fi
echo "=========================================="
echo ""
echo "URLs del sistema:"
echo "  - Grafana: http://localhost:3000 (admin / medusse2025)"
echo "  - API REST: http://localhost:3001"
echo "  - InfluxDB: http://localhost:8086"
echo ""
