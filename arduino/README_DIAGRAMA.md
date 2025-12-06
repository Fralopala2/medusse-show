# 📊 Diagrama de Conexiones - Arduino Nano ESP32 (Medusse IoT)

## 📁 Archivos Disponibles

### 1. **diagrama_conexiones_medusse.svg** (RECOMENDADO)
- **Formato:** SVG (Scalable Vector Graphics)
- **Ventajas:**
  - ✅ Editable en cualquier editor (Inkscape, Adobe Illustrator, etc.)
  - ✅ Escalable sin pérdida de calidad
  - ✅ Se puede abrir en navegadores web
  - ✅ Perfecto para impresión de alta resolución
  - ✅ Tamaño de archivo pequeño
- **Cómo usar:**
  - Abre con navegador web (Chrome, Firefox, Edge, etc.)
  - Abre con Inkscape (gratuito) para editar
  - Inserta en documentos Word/PowerPoint

### 2. **diagrama_conexiones_viewer.html** (VISUALIZADOR INTERACTIVO)
- **Formato:** Página web HTML
- **Ventajas:**
  - ✅ Interfaz moderna y atractiva
  - ✅ Botones para descargar, imprimir y copiar
  - ✅ Información complementaria visible
  - ✅ Responsive (se adapta a móvil)
  - ✅ Incluye notas importantes
  - ✅ Sin dependencias externas
- **Cómo usar:**
  1. Abre con cualquier navegador web
  2. El diagrama SVG se cargará automáticamente
  3. Usa los botones para descargar, imprimir o copiar

**⚠️ Asegúrate de que ambos archivos estén en la misma carpeta para que funcione correctamente.**

---

## 🎯 ¿Cuál debo usar?

| Caso | Archivo |
|------|---------|
| **Ver y entender el diagrama** | diagrama_conexiones_viewer.html |
| **Imprimir el diagrama** | diagrama_conexiones_viewer.html o .svg |
| **Editar/Personalizar el diagrama** | diagrama_conexiones_medusse.svg (con Inkscape) |
| **Insertar en Word/PowerPoint** | diagrama_conexiones_medusse.svg |
| **Compartir con otros** | diagrama_conexiones_viewer.html (abre en navegador) |

---

## 📋 Contenido del Diagrama

El diagrama incluye:

### 1️⃣ Arduino Nano ESP32 Central
- Placa con todos los pines etiquetados
- Colores diferenciados por función

### 2️⃣ 18 Sensores Agrupados por Categoría

**🌡️ Sensores Ambientales (Azul)**
- BME680 (Temp, Humedad, Presión, VOC)
- DHT22 (Temperatura, Humedad)
- SGP30 (VOC/CO2 - Calidad de aire)
- **Conexión:** I2C (D21/D22)

**💧 Sensores de Agua y Suelo (Verde)**
- Humedad del Suelo Capacitivo (SEN-0180)
- Humedad del Suelo Anticorrosión (SEN-0083)
- Flujo de Agua YF-S201
- Sensor de pH (Analógico)
- Gravity TDS Sensor
- Gravity Oxígeno Disuelto
- **Conexión:** ADC (A0-A5)

**🌍 Estación Meteorológica (Verde Claro)**
- Anemómetro (Velocidad del viento)
- Pluviómetro (Lluvia/Precipitación)
- Veleta (Dirección del viento)
- **Conexión:** GPIO (D6, D7, D8)

**⚡ Energía y Otros (Naranja)**
- Sensor de Gas (MQ-135)
- Data Logger Shield (SPI)
- Panel Solar 6V (3W)
- Cargador LiPo Solar 3.7V
- **Conexión:** SPI/ADC

### 3️⃣ Tabla Resumen de Conexiones
- Tipo de sensor
- Pines del Arduino
- Voltaje requerido
- Protocolo de comunicación

### 4️⃣ Leyenda de Colores
- Código de colores para cada tipo de sensor
- Fácil identificación visual

---

## ⚠️ Notas Importantes

1. **Voltaje en pines analógicos (A0-A5):**
   - Máximo permitido: 3.3V
   - Para sensores de 5V: usar conversor de nivel lógico

2. **Sensores I2C (BME680, SGP30):**
   - Comparten pines D21 (SDA) y D22 (SCL)
   - Cada sensor necesita dirección I2C única
   - Se pueden conectar en paralelo en el mismo bus I2C

3. **Sensor YF-S201 (Flujo de agua):**
   - Puede requerir 5V para mejor funcionamiento
   - Alternativamente, 3.3V funciona pero con menos amplitud de señal
   - Se recomienda usar un regulador o booster si es necesario

4. **Conexiones de alimentación:**
   - Usar cables cortos y de buena calidad
   - Minimizar ruido eléctrico (importante para sensores analógicos)
   - Considerar usar condensadores de desacoplamiento cercanos a cada sensor

5. **Protoboard y cableado:**
   - Se recomienda usar protoboard de laboratorio
   - Cables de alta calidad
   - Conexiones firmes y bien aseguradas

---

## 🔧 Herramientas Recomendadas

### Para visualizar/editar:
- **Navegador web:** Chrome, Firefox, Edge, Safari
- **Inkscape:** Libre y gratuito - [https://inkscape.org/](https://inkscape.org/)
- **Adobe Illustrator:** De pago (opcional)

### Para crear esquemas mejores:
- **Fritzing:** [https://fritzing.org/](https://fritzing.org/) - Especializado en electrónica
- **Tinkercad:** [https://www.tinkercad.com/](https://www.tinkercad.com/) - Online, gratuito

---

## 📝 Tabla de Pines Rápida

| Sensor | Pin | Tipo | Voltaje | Protocolo |
|--------|-----|------|---------|-----------|
| BME680 | D21/D22 | I2C | 3.3V | I2C |
| DHT22 | D4 | GPIO | 3.3V | Digital |
| SGP30 | D21/D22 | I2C | 3.3V | I2C |
| YF-S201 | D5 | GPIO | 5V | Pulsos |
| Anemómetro | D6 | GPIO | 3.3V | Pulsos |
| Pluviómetro | D7 | GPIO | 3.3V | Pulsos |
| Veleta | D8 | GPIO | 3.3V | Analógico |
| Humedad Suelo 1 | A1 | ADC | 3.3V | Analógico |
| Humedad Suelo 2 | A2 | ADC | 3.3V | Analógico |
| pH | A3 | ADC | 3.3V | Analógico |
| TDS | A4 | ADC | 3.3V | Analógico |
| O2 Disuelto | A5 | ADC | 3.3V | Analógico |
| Sensor Gas | A0 | ADC | 5V | Analógico |
| Data Logger | D10-D13 | SPI | 3.3V | SPI |

---

## 💡 Tips Útiles

1. **Para entender mejor el diagrama:**
   - Abre el HTML en tu navegador
   - Lee las notas incluidas
   - Consulta la tabla de conexiones

2. **Para imprimir:**
   - Usa `diagrama_conexiones_viewer.html`
   - O abre el SVG en navegador y pulsa Ctrl+P

3. **Para editar/personalizar:**
   - Descarga Inkscape (gratuito)
   - Abre el archivo SVG
   - Edita colores, textos, pines según necesites

4. **Para compartir:**
   - Comparte el archivo HTML (abre en navegador sin instalar nada)
   - O comparte el SVG (editable en múltiples programas)

---

## 📚 Información Adicional

Para más detalles sobre los sensores, consulta:
- `documentacion/DOCUMENTACION-FINAL-PROYECTO-MEDUSSE-IoT.md`
- `documentacion/DOCUMENTACION_RETOS.md`

---

**Última actualización:** Diciembre 2025  
**Proyecto:** Medusse IoT - Sistema de Monitoreo Ambiental  
**Plataforma:** Arduino Nano ESP32  
**18 Sensores integrados**
