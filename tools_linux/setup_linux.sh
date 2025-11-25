#!/bin/bash

# Script de instalacion automatica para Linux (Lliurex/Ubuntu/Debian)
# Proyecto Medusse IoT

echo ""
echo "========================================"
echo "  MEDUSSE IoT - INSTALACION LINUX"
echo "========================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar si se ejecuta como root
if [ "$EUID" -eq 0 ]; then 
   echo -e "${RED}❌ No ejecutes este script como root (sudo)${NC}"
   echo "El script pedira sudo cuando sea necesario"
   exit 1
fi

# Actualizar sistema
echo -e "${YELLOW}📦 Actualizando sistema...${NC}"
sudo apt update
sudo apt upgrade -y

# Instalar Docker
echo ""
echo -e "${YELLOW}🐳 Instalando Docker...${NC}"

if command -v docker &> /dev/null; then
    echo -e "${GREEN}✅ Docker ya esta instalado${NC}"
else
    echo "Instalando Docker..."
    
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
    
    echo -e "${GREEN}✅ Docker instalado${NC}"
    echo -e "${YELLOW}⚠️  Necesitas cerrar sesion y volver a entrar para aplicar permisos de Docker${NC}"
fi

# Instalar Node.js
echo ""
echo -e "${YELLOW}📦 Instalando Node.js...${NC}"

if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js ya esta instalado ($(node --version))${NC}"
else
    echo "Instalando Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    echo -e "${GREEN}✅ Node.js instalado${NC}"
fi

# Instalar Python 3
echo ""
echo -e "${YELLOW}🐍 Verificando Python 3...${NC}"

if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✅ Python 3 ya esta instalado ($(python3 --version))${NC}"
else
    echo "Instalando Python 3..."
    sudo apt install -y python3 python3-pip
    echo -e "${GREEN}✅ Python 3 instalado${NC}"
fi

# Instalar dependencias del proyecto
echo ""
echo -e "${YELLOW}📦 Instalando dependencias del proyecto...${NC}"

# Python
if [ -f "requirements.txt" ]; then
    echo "Instalando dependencias Python..."
    pip3 install -r requirements.txt
    echo -e "${GREEN}✅ Dependencias Python instaladas${NC}"
fi

# API Node.js
if [ -d "api" ]; then
    echo "Instalando dependencias API..."
    cd api
    npm install
    cd ..
    echo -e "${GREEN}✅ Dependencias API instaladas${NC}"
fi

# Web Next.js
if [ -d "web" ]; then
    echo "Instalando dependencias Web..."
    cd web
    npm install
    cd ..
    echo -e "${GREEN}✅ Dependencias Web instaladas${NC}"
fi

# Hacer scripts ejecutables
echo ""
echo -e "${YELLOW}🔧 Configurando permisos...${NC}"
chmod +x ejecutar_linux.sh 2>/dev/null
chmod +x detener_linux.sh 2>/dev/null
chmod +x verificar_linux.sh 2>/dev/null
echo -e "${GREEN}✅ Permisos configurados${NC}"

# Resumen
echo ""
echo "========================================"
echo "  ✅ INSTALACION COMPLETADA"
echo "========================================"
echo ""
echo -e "${GREEN}Software instalado:${NC}"
echo "  ✓ Docker $(docker --version 2>/dev/null | cut -d' ' -f3 | tr -d ',')"
echo "  ✓ Node.js $(node --version 2>/dev/null)"
echo "  ✓ Python $(python3 --version 2>/dev/null | cut -d' ' -f2)"
echo ""
echo -e "${YELLOW}Proximos pasos:${NC}"
echo "  1. Cierra sesion y vuelve a entrar (para aplicar permisos Docker)"
echo "  2. Ejecuta: ./ejecutar_linux.sh"
echo "  3. Abre Grafana en: http://localhost:3000"
echo ""
echo -e "${YELLOW}Comandos utiles:${NC}"
echo "  ./ejecutar_linux.sh    - Iniciar sistema completo"
echo "  ./detener_linux.sh     - Detener todos los servicios"
echo "  ./verificar_linux.sh   - Verificar estado del sistema"
echo ""
