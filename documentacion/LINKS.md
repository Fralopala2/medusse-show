# Enlaces de la Aplicacion Web - Medusse IoT

**Documento de referencia con todas las URLs asignadas a los botones de la web Next.js**

---

## Informacion del Documento

**Proyecto:** Medusse IoT  
**Autor:** Francisco Manuel Lopez Alarte  
**Fecha:** Noviembre 2025  
**Proposito:** Referencia rapida de enlaces para mantenimiento y actualizacion

---

## Enlaces por Seccion

### Hero Principal - Medusse IoT

**Boton Primario: "Ver Dashboard"**
- **URL:** `#dashboard`
- **Tipo:** Scroll interno
- **Destino:** Seccion dashboard de la misma pagina

- **Boton Secundario: "Documentacion"**
- **URL:** `https://github.com/Fralopala2/medusse-show/blob/clase/README.md`
- **Tipo:** Enlace externo (nueva pestaña)
- **Destino:** README principal del proyecto en GitHub

---

### Dashboard en Tiempo Real

**Boton Primario: "Acceder a Grafana"**
- **URL:** `http://localhost:3000`
- **Tipo:** Enlace externo (nueva pestaña)
- **Destino:** Dashboard Grafana local
- **Credenciales:** admin / medusse2025

**Boton Secundario: "Ver Demo"**
- **URL:** `#dashboard`
- **Tipo:** Scroll interno
- **Destino:** Seccion dashboard de la misma pagina

---

### App Movil Flutter

- **Boton Primario: "Descargar App"**
- **URL:** `https://github.com/Fralopala2/medusse-show/blob/clase/README.md`
- **Tipo:** Enlace externo (nueva pestaña)
- **Destino:** README principal con informacion de la app Flutter

**Boton Secundario: "Ver Capturas"**
- **URL:** `#dashboard`
- **Tipo:** Scroll interno
- **Destino:** Seccion dashboard de la misma pagina

---

### 18 Tipos de Sensores

**Boton Primario: "Ver Sensores"**
- **URL:** `#dashboard`
- **Tipo:** Scroll interno
- **Destino:** Seccion dashboard con datos de sensores

- **Boton Secundario: "Especificaciones"**
- **URL:** `https://github.com/Fralopala2/medusse-show/blob/clase/README.md`
- **Tipo:** Enlace externo (nueva pestaña)
- **Destino:** README principal con especificaciones tecnicas

---

### API REST Completa

- **Boton Primario: "Ver API Docs"**
- **URL:** `https://github.com/Fralopala2/medusse-show/blob/clase/api/README.md`
- **Tipo:** Enlace externo (nueva pestaña)
- **Destino:** Documentacion completa de la API en GitHub

**Boton Secundario: "Probar Endpoints"**
- **URL:** `http://localhost:3001/api/summary`
- **Tipo:** Enlace externo (nueva pestaña)
- **Destino:** Endpoint de resumen de la API local

---

### Preparado para LoRa Mesh

- **Boton Primario: "Ver Migracion"**
- **URL:** `https://github.com/Fralopala2/medusse-show/blob/clase/documentacion/MIGRACION.md`
- **Tipo:** Enlace externo (nueva pestaña)
- **Destino:** Guia de migracion a LoRa Mesh en GitHub

**Boton Secundario: "Hardware Necesario"**
- **URL:** `#precios`
- **Tipo:** Scroll interno
- **Destino:** Seccion de precios con hardware

---

## Enlaces Adicionales

### Seccion About

**Boton: "Contactar"**
- **URL:** `mailto:pacoaldev@gmail.com`
- **Tipo:** Enlace de correo
- **Destino:** Cliente de correo con email pre-rellenado

---

## Enlaces del Footer

### Navegacion Principal

- **Enlace: "Documentacion"**
- **URL:** `https://github.com/Fralopala2/medusse-show/blob/clase/README.md`
- **Tipo:** Enlace externo (nueva pestaña)
- **Destino:** README principal del proyecto

### Enlaces Legales

- **Enlace: "Licencia"**
- **URL:** `https://github.com/Fralopala2/medusse-show/blob/clase/LICENSE`
- **Tipo:** Enlace externo (nueva pestaña)
- **Destino:** Archivo de licencia en GitHub

**Enlace: "Privacidad"**
- **URL:** `/politica-privacidad`
- **Tipo:** Enlace interno
- **Destino:** Página de política de privacidad del sitio web

---

## Resumen de URLs Unicas

### URLs Internas (Scroll)
1. `#dashboard` - Seccion dashboard
2. `#precios` - Seccion de precios

### URLs Locales (Servicios)
1. `http://localhost:3000` - Grafana Dashboard
2. `http://localhost:3001/api/summary` - API Summary Endpoint

### URLs GitHub (Documentacion)
1. `https://github.com/Fralopala2/proyecto-medusse/blob/clase/README.md` - README principal
2. `https://github.com/Fralopala2/proyecto-medusse/blob/clase/api/README.md` - Documentacion API
3. `https://github.com/Fralopala2/proyecto-medusse/blob/clase/documentacion/MIGRACION.md` - Guia migracion
4. `https://github.com/Fralopala2/proyecto-medusse/blob/clase/LICENSE` - Licencia

### URLs de Contacto
1. `mailto:pacoaldev@gmail.com` - Email de contacto

---

## Notas de Mantenimiento

### Actualizacion de Enlaces

**Cuando actualizar:**
- Si se mueve un archivo de documentacion en el repositorio
- Si cambia la estructura de carpetas
- Si se añaden nuevas secciones a la web
- Si cambian los puertos de servicios locales

**Archivos a modificar:**
- `web/src/lib/data.ts` - Configuracion de enlaces de botones
- `web/src/components/layout/Footer.tsx` - Enlaces del footer
- `documentacion/LINKS.md` - Este documento de referencia

### Verificacion de Enlaces

**Comandos para verificar:**
```bash
# Verificar servicios locales
curl http://localhost:3000  # Grafana
curl http://localhost:3001/api/summary  # API

# Verificar archivos en repositorio
ls README.md
ls api/README.md
ls documentacion/MIGRACION.md
ls LICENSE
```

### Enlaces Rotos Comunes

**Problema:** 404 en documentacion de GitHub  
**Solucion:** Verificar que el archivo existe en la rama `clase`

**Problema:** Servicios locales no responden  
**Solucion:** Verificar que Docker y servicios esten corriendo

**Problema:** Scroll no funciona  
**Solucion:** Verificar que el ID de la seccion existe en la pagina

---

## Historial de Cambios

### Version 1.0 (Noviembre 2025)
- Creacion del documento
- Documentacion de todos los enlaces de la web
- 12 botones documentados
- 9 URLs unicas identificadas

---

**Documento preparado para:** Mantenimiento y referencia de enlaces  
**Ultima actualizacion:** Noviembre 2025  
**Estado:** Completo y actualizado
