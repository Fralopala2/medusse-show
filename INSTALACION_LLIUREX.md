# Instalacion en Lliurex (IES Jose Rodrigo Botet)

## Problema Comun: Permisos de Docker

En los ordenadores de clase con Lliurex, Docker Desktop esta instalado pero los usuarios normales no tienen permisos para usarlo.

## Solucion Recomendada (Requiere Admin UNA SOLA VEZ)

Pedir al administrador que ejecute este comando **una sola vez**:

```bash
sudo usermod -aG docker fralopala2
```

Despues de esto:
1. Cerrar sesion completamente
2. Volver a iniciar sesion
3. Verificar con: `docker ps`

Si funciona sin pedir sudo, ya esta solucionado permanentemente.

## Solucion Alternativa (Sin modificar permisos)

Si no es posible modificar los permisos, usar los scripts especiales para Lliurex que incluyen sudo solo donde es necesario.

### Instalacion

```bash
# 1. Clonar o copiar el proyecto
cd ~/Documentos
git clone https://github.com/Fralopala2/proyecto-medusse.git
cd proyecto-medusse

# 2. Dar permisos de ejecucion a los scripts
chmod +x setup_lliurex.sh
chmod +x ejecutar_lliurex.sh
chmod +x verificar_lliurex.sh
chmod +x detener_lliurex.sh

# 3. Ejecutar instalacion (pedira password de admin solo cuando sea necesario)
./setup_lliurex.sh
```

### Uso Diario

```bash
# Iniciar sistema completo
./ejecutar_lliurex.sh

# Verificar que todo funciona
./verificar_lliurex.sh

# Detener sistema
./detener_lliurex.sh
```

## Verificacion Rapida

Para verificar si necesitas sudo o no:

```bash
# Probar sin sudo
docker ps

# Si da error de permisos, necesitas la solucion alternativa
# Si funciona, puedes usar los scripts normales de Linux
```

## URLs del Sistema

Una vez iniciado el sistema:

- **Grafana Dashboard**: http://localhost:3000 (admin / medusse2025)
- **API REST**: http://localhost:3001
- **InfluxDB**: http://localhost:8086 (admin / medusse2025)

## Notas Importantes

1. **Python**: Lliurex suele tener Python 3 instalado por defecto
2. **Node.js**: Si no esta instalado, se puede instalar sin sudo usando nvm
3. **Flutter**: Opcional, solo si quieres desarrollar la app movil
4. **Permisos**: Los scripts con sudo solo lo usaran para comandos de Docker

## Instalacion de Node.js sin sudo (si es necesario)

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

## Estructura de Archivos en Lliurex

```
~/Documentos/proyecto-medusse/
├── setup_lliurex.sh          # Instalacion inicial
├── ejecutar_lliurex.sh       # Iniciar sistema
├── verificar_lliurex.sh      # Verificar funcionamiento
├── detener_lliurex.sh        # Detener sistema
├── docker/                   # Configuracion Docker
├── api/                      # API REST
└── arduino/                  # Simulador
```

## Solucion de Problemas

### Error: "permission denied" al ejecutar docker

**Causa**: Tu usuario no esta en el grupo docker

**Solucion**: Usar scripts con sudo o pedir al admin que te agregue al grupo

### Error: "Cannot connect to Docker daemon"

**Causa**: Docker Desktop no esta iniciado

**Solucion**: 
```bash
# Verificar estado
systemctl status docker

# Si no esta activo, iniciarlo (requiere sudo)
sudo systemctl start docker
```

### Error: "Port already in use"

**Causa**: Otro servicio esta usando los puertos

**Solucion**:
```bash
# Ver que esta usando el puerto
sudo lsof -i :3000
sudo lsof -i :8086
sudo lsof -i :1883

# Detener servicios conflictivos o cambiar puertos en docker-compose.yml
```

## Contacto

Si tienes problemas especificos con Lliurex en clase, documentalos para poder crear soluciones especificas.

**Autor**: Francisco Manuel Lopez Alarte
**Email**: pacoaldev@gmail.com
**Institucion**: IES Jose Rodrigo Botet
