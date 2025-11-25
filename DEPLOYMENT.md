# Guia de Despliegue - Medusse IoT Web

## 🚀 Opcion 1: Vercel (Recomendada - Gratis)

Vercel es la plataforma de los creadores de Next.js. Es gratis y muy facil.

### Pasos:

1. **Crear cuenta en Vercel**
   - Ve a https://vercel.com
   - Registrate con tu cuenta de GitHub

2. **Conectar el repositorio**
   - Click en "Add New Project"
   - Importa tu repositorio: `Fralopala2/proyecto-medusse`
   - Selecciona la carpeta `web` como root directory

3. **Configurar variables de entorno**
   ```
   NEXT_PUBLIC_API_URL=https://tu-api.com
   NEXT_PUBLIC_WS_URL=wss://tu-api.com
   NEXT_PUBLIC_GRAFANA_URL=https://tu-grafana.com
   ```
   
   **NOTA**: Por ahora, puedes dejar las URLs locales o comentar esta seccion si solo quieres ver el diseño.

4. **Deploy**
   - Click en "Deploy"
   - Espera 2-3 minutos
   - Tu web estara en: `https://proyecto-medusse.vercel.app`

### Configuracion Automatica

El archivo `vercel.json` ya esta configurado. Vercel detectara automaticamente que es Next.js.

---

## 🚀 Opcion 2: Netlify (Alternativa Gratis)

### Pasos:

1. **Crear cuenta en Netlify**
   - Ve a https://netlify.com
   - Registrate con GitHub

2. **Conectar repositorio**
   - "Add new site" → "Import from Git"
   - Selecciona tu repositorio
   - Base directory: `web`
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Deploy**
   - Click en "Deploy site"
   - Tu web estara en: `https://proyecto-medusse.netlify.app`

---

## 🚀 Opcion 3: GitHub Pages (Solo estatico)

**NOTA**: GitHub Pages no soporta Next.js con SSR. Solo funcionaria con exportacion estatica.

### Pasos:

1. **Modificar `package.json` en web/**
   ```json
   "scripts": {
     "build": "next build && next export"
   }
   ```

2. **Crear archivo `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
         - run: cd web && npm install && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./web/out
   ```

3. **Habilitar GitHub Pages**
   - Settings → Pages → Source: gh-pages branch

---

## 🚀 Opcion 4: Railway (Con Backend)

Si quieres desplegar tambien la API y MySQL:

### Pasos:

1. **Crear cuenta en Railway**
   - Ve a https://railway.app
   - Registrate con GitHub

2. **Crear nuevo proyecto**
   - "New Project" → "Deploy from GitHub repo"
   - Selecciona tu repositorio

3. **Agregar servicios**
   - MySQL (automatico desde Railway)
   - API Node.js (carpeta `api`)
   - Web Next.js (carpeta `web`)

4. **Configurar variables de entorno**
   - Railway las detectara automaticamente

---

## 📋 Opcion Mas Rapida (Solo para ver el diseño)

Si solo quieres que se vea el diseño sin funcionalidad:

### Vercel con un click:

1. Ve a tu repositorio en GitHub
2. Agrega este archivo `web/README.md`:
   ```markdown
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Fralopala2/proyecto-medusse/tree/clase/web)
   ```

3. Click en el boton "Deploy with Vercel"
4. Listo en 2 minutos

---

## 🎯 Recomendacion

**Para solo ver el diseño**: Usa Vercel (Opcion 1)
- Gratis
- Rapido (2 minutos)
- URL personalizada
- SSL automatico
- No necesitas configurar nada

**Para sistema completo**: Usa Railway (Opcion 4)
- Incluye base de datos
- Incluye API
- Mas complejo pero completo

---

## 📝 Notas Importantes

### Sin API/Backend:
Si despliegas solo la web sin API, algunas funciones no funcionaran:
- Login (necesita API + MySQL)
- Dashboard de usuario (necesita API)
- Panel de admin (necesita API + MySQL)

Pero el **diseño visual** se vera perfectamente para importar a Figma.

### Con API/Backend:
Necesitaras desplegar tambien:
- API Node.js (puerto 3001)
- MySQL (base de datos)
- InfluxDB (opcional, para datos de sensores)
- Mosquitto (opcional, para MQTT)

---

## 🔗 URLs de Ejemplo

Despues del despliegue tendras:
- **Web**: https://proyecto-medusse.vercel.app
- **API** (si despliegas): https://proyecto-medusse-api.railway.app
- **Grafana** (si despliegas): https://proyecto-medusse-grafana.railway.app

---

## ⚡ Despliegue Rapido (Comando)

Si tienes Vercel CLI instalado:

```bash
cd web
npm install -g vercel
vercel login
vercel
```

Sigue las instrucciones y listo.

---

## 🆘 Solucion de Problemas

### Error: "Module not found"
- Asegurate de que `package.json` tenga todas las dependencias
- Ejecuta `npm install` localmente primero

### Error: "Build failed"
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel/Netlify

### Pagina en blanco
- Verifica las variables de entorno
- Revisa la consola del navegador (F12)

---

## 📞 Contacto

Si tienes problemas con el despliegue, revisa:
- Logs de Vercel: https://vercel.com/dashboard
- Documentacion Next.js: https://nextjs.org/docs/deployment
