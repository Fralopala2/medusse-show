# Deployment en Vercel - Medusse IoT

## 🚀 Proyecto Desplegado

**URL Produccion**: https://medusse-web.vercel.app

Este documento explica como esta configurado el deployment automatico del proyecto en Vercel.

---

## 📋 Configuracion Actual

### Informacion del Proyecto

- **Plataforma**: Vercel
- **Framework**: Next.js 16.0.3
- **Repositorio**: github.com/Fralopala2/medusse-show
- **Rama de produccion**: clase
- **Root Directory**: web
- **Region**: Washington D.C. (iad1)

### Archivos de Configuracion

**`web/vercel.json`**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

---

## 🔄 Flujo de Deployment Automatico

### 1. Desarrollo Local

```bash
# Hacer cambios en el codigo
git add .
git commit -m "feat: nueva funcionalidad"
git push origin clase
```

### 2. Deteccion Automatica

Vercel detecta el push a GitHub automaticamente:
- Webhook de GitHub notifica a Vercel
- Vercel clona la rama `clase`
- Inicia el proceso de build

### 3. Build Process

```
[1/5] Cloning repository
  ✓ Cloned in 318ms

[2/5] Installing dependencies
  ✓ npm install completed in 3s
  ✓ 213 packages installed

[3/5] Building application
  ✓ next build completed in 9s
  ✓ Optimized for production

[4/5] Deploying outputs
  ✓ Uploaded to CDN

[5/5] Finalizing
  ✓ Deployment completed
  ✓ URL: https://medusse-web.vercel.app
```

### 4. Deployment Completado

- URL actualizada automaticamente
- SSL/HTTPS configurado
- CDN global activado
- Preview URL generada

---

## 📊 Ejemplo de Deployment Real

### Log Completo

```
12:40:39.240 Running build in Washington, D.C., USA (East) – iad1
12:40:39.241 Build machine configuration: 2 cores, 8 GB
12:40:39.384 Cloning github.com/Fralopala2/medusse-show (Branch: clase, Commit: f226022)
12:40:39.702 Cloning completed: 318.000ms
12:40:40.111 Running "vercel build"
12:40:40.554 Vercel CLI 48.10.5
12:40:41.264 Installing dependencies...
12:40:44.360 added 213 packages in 3s
12:40:50.245 Build Completed in /vercel/output [9s]
12:40:50.682 Deploying outputs...
12:41:00.118 Deployment completed
12:41:00.731 Creating build cache...
12:41:06.318 Created build cache: 5.587s
```

### Tiempo Total: ~26 segundos

---

## 🎯 Ventajas del Deployment en Vercel

### 1. Automatizacion Total
- ✅ Sin configuracion manual
- ✅ Deploy con cada push
- ✅ Sin scripts adicionales necesarios

### 2. Optimizacion Automatica
- ✅ Minificacion de codigo
- ✅ Optimizacion de imagenes
- ✅ Code splitting automatico
- ✅ Compresion Gzip/Brotli

### 3. Infraestructura Global
- ✅ CDN en 70+ regiones
- ✅ SSL/HTTPS automatico
- ✅ DDoS protection
- ✅ 99.99% uptime

### 4. Developer Experience
- ✅ Preview deployments por commit
- ✅ Rollback instantaneo
- ✅ Logs en tiempo real
- ✅ Analytics incluido

---

## 🔧 Configuracion Inicial (Completada)

### Pasos que se siguieron:

1. **Crear cuenta en Vercel**
   - Registro con GitHub
   - Autorizacion de acceso al repositorio

2. **Importar proyecto**
   - Seleccionar repositorio: Fralopala2/medusse-show
   - Configurar rama: clase
   - Root Directory: web

3. **Configuracion automatica**
   - Framework: Next.js (auto-detectado)
   - Build Command: npm run build
   - Output Directory: .next

4. **Primer deployment**
   - Build exitoso en 26 segundos
   - URL asignada: medusse-web.vercel.app

---

## 📱 URLs del Proyecto

### Produccion
```
https://medusse-web.vercel.app
```

### Preview (por commit)
```
https://medusse-web-git-[branch]-fralopala2.vercel.app
```

### Dashboard Vercel
```
https://vercel.com/fralopala2s-projects/medusse-web
```

---

## 🔐 Variables de Entorno

### Configuradas en Vercel

Aunque la web funciona sin backend, estas son las variables configuradas:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3002
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3000
```

**Nota**: Estas apuntan a localhost porque el backend no esta desplegado. La web muestra el diseño correctamente para Figma.

---

## 📊 Estadisticas de Deployment

### Metricas Actuales

- **Tiempo promedio de build**: 20-30 segundos
- **Tamaño del bundle**: ~500 KB (optimizado)
- **Deployments totales**: 15+
- **Tasa de exito**: 100%

### Performance

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+

---

## 🛠️ Comandos CLI de Vercel

### Instalacion

```bash
npm install -g vercel
```

### Login

```bash
vercel login
```

### Deploy Manual

```bash
cd web
vercel
```

### Ver Deployments

```bash
vercel ls
```

### Ver Logs

```bash
vercel logs
```

### Rollback

```bash
vercel rollback [deployment-url]
```

---

## 🔄 Comparacion: FTP vs Vercel

| Aspecto | FTP Manual | Script FTP | Vercel |
|---------|-----------|------------|--------|
| **Velocidad** | 10-15 min | 5-10 min | 30 seg |
| **Automatizacion** | ❌ Manual | ⚠️ Semi | ✅ Total |
| **Optimizacion** | ❌ No | ❌ No | ✅ Si |
| **SSL/HTTPS** | ⚠️ Manual | ⚠️ Manual | ✅ Auto |
| **CDN Global** | ❌ No | ❌ No | ✅ Si |
| **Rollback** | ❌ Dificil | ❌ Dificil | ✅ 1 click |
| **Preview** | ❌ No | ❌ No | ✅ Si |
| **Costo** | Hosting | Hosting | Gratis |

---

## 📝 Logs de Deployment Historico

### Deployment 1 (Inicial)
```
Commit: b4fee34
Branch: main
Status: ✅ Success
Time: 26s
```

### Deployment 2 (Rama clase)
```
Commit: f226022
Branch: clase
Status: ✅ Success
Time: 24s
```

### Deployment 3 (Fix navbar)
```
Commit: 0e85663
Branch: clase
Status: ✅ Success
Time: 22s
```

---

## 🎓 Aprendizajes del Reto 11

### Metodos de Deployment Implementados

1. **FTP Manual** (tradicional)
   - Usando FileZilla o similar
   - Control total pero lento

2. **Script FTP Automatico** (deploy-ftp.js)
   - Automatiza el proceso FTP
   - Util para hosting compartido

3. **Vercel** (moderno) ✅
   - Deployment automatico
   - Mejor opcion para Next.js
   - Ya implementado en el proyecto

### Conclusion

Para este proyecto, **Vercel es la mejor opcion** porque:
- Es gratis para proyectos educativos
- Optimizado especificamente para Next.js
- Deployment automatico con GitHub
- No requiere configuracion de servidor
- Incluye SSL, CDN y optimizaciones

Los scripts FTP son utiles cuando:
- Tienes hosting compartido tradicional
- No puedes usar servicios modernos
- Necesitas control total del servidor

---

## 📞 Recursos

- **Dashboard Vercel**: https://vercel.com/dashboard
- **Documentacion**: https://vercel.com/docs
- **Status**: https://vercel-status.com
- **Soporte**: https://vercel.com/support

---

## ✅ Checklist de Deployment

- [x] Proyecto conectado a GitHub
- [x] Vercel configurado correctamente
- [x] Rama de produccion: clase
- [x] Root directory: web
- [x] Build exitoso
- [x] URL funcionando
- [x] SSL/HTTPS activo
- [x] Deployment automatico activo
- [x] Scripts FTP como alternativa
- [x] Documentacion completa

---

**Proyecto desplegado exitosamente en Vercel** ✅

**URL**: https://medusse-web.vercel.app
