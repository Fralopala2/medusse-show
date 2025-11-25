# Guia de Deployment FTP/SFTP - Reto 11

## 📤 Scripts de Deployment Automatico

Este proyecto incluye scripts para subir archivos automaticamente a un servidor FTP o SFTP.

---

## 🚀 Opcion 1: FTP (Basico)

### Instalacion

```bash
npm install basic-ftp
```

### Configuracion

1. Copia el archivo de ejemplo:
   ```bash
   copy .env.ftp.example .env.ftp
   ```

2. Edita `.env.ftp` con tus credenciales:
   ```env
   FTP_HOST=ftp.tuservidor.com
   FTP_USER=tu_usuario
   FTP_PASSWORD=tu_password
   FTP_PORT=21
   FTP_SECURE=false
   ```

### Uso

**Windows:**
```cmd
deploy-ftp.bat
```

**Linux/Mac:**
```bash
node deploy-ftp.js
```

---

## 🔒 Opcion 2: SFTP (Seguro - Recomendado)

### Instalacion

```bash
npm install ssh2-sftp-client
```

### Configuracion

Configura variables de entorno:
```env
SFTP_HOST=sftp.tuservidor.com
SFTP_PORT=22
SFTP_USER=tu_usuario
SFTP_PASSWORD=tu_password
```

O usa clave SSH (mas seguro):
```javascript
// En deploy-sftp.js
privateKey: fs.readFileSync('C:/Users/tu_usuario/.ssh/id_rsa')
```

### Uso

```bash
node deploy-sftp.js
```

---

## 📋 Que se sube

### Directorios incluidos:
- `web/.next` → Build de Next.js
- `api` → API Node.js
- `docker` → Configuracion Docker

### Archivos excluidos automaticamente:
- `node_modules/`
- `.git/`
- `.env` y `.env.local`
- `*.log`
- `.DS_Store`

---

## ⚙️ Personalizacion

### Cambiar directorios a subir

Edita en `deploy-ftp.js` o `deploy-sftp.js`:

```javascript
const UPLOAD_DIRS = [
  { local: './tu_carpeta', remote: '/ruta/remota' }
];
```

### Agregar exclusiones

```javascript
const EXCLUDE_PATTERNS = [
  'node_modules',
  'archivo_especifico.txt',
  '*.tmp'
];
```

---

## 🔐 Seguridad

### Buenas practicas:

1. **Nunca subas credenciales al repositorio**
   - Agrega `.env.ftp` a `.gitignore`
   - Usa variables de entorno

2. **Usa SFTP en lugar de FTP**
   - SFTP encripta la conexion
   - FTP envia credenciales en texto plano

3. **Usa claves SSH cuando sea posible**
   ```bash
   ssh-keygen -t rsa -b 4096
   ```

4. **Limita permisos del usuario FTP**
   - Solo acceso a directorios necesarios
   - Sin permisos de administrador

---

## 🧪 Testing

### Probar conexion sin subir archivos:

```javascript
// En deploy-ftp.js, comenta la linea de upload:
// await client.uploadFrom(localPath, remotePath);
console.log(`Simulando: ${localPath} → ${remotePath}`);
```

---

## 📊 Logs

Los scripts muestran:
- ✅ Archivos subidos exitosamente
- ⏭️ Archivos saltados (excluidos)
- ❌ Errores durante la subida
- 📁 Directorios procesados

---

## 🆘 Solucion de Problemas

### Error: "ECONNREFUSED"
- Verifica que el host y puerto sean correctos
- Comprueba que el firewall permita la conexion

### Error: "Authentication failed"
- Verifica usuario y contraseña
- Comprueba que el usuario tenga permisos FTP

### Error: "Permission denied"
- El usuario FTP no tiene permisos de escritura
- Contacta al administrador del servidor

### Archivos no se suben
- Verifica que los directorios locales existan
- Comprueba que no esten en EXCLUDE_PATTERNS

---

## 🔄 Integracion con CI/CD

### GitHub Actions

```yaml
name: Deploy to FTP
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install basic-ftp
      - run: node deploy-ftp.js
        env:
          FTP_HOST: ${{ secrets.FTP_HOST }}
          FTP_USER: ${{ secrets.FTP_USER }}
          FTP_PASSWORD: ${{ secrets.FTP_PASSWORD }}
```

---

## 📝 Notas

- El deployment puede tardar varios minutos dependiendo del tamaño
- Se recomienda hacer backup antes del primer deployment
- Prueba primero en un servidor de desarrollo

---

## 🎯 Deployment en Vercel (Implementado)

### ✅ Estado Actual del Proyecto

El proyecto Medusse IoT ya esta desplegado en Vercel:
- **URL**: https://medusse-web.vercel.app
- **Rama**: clase
- **Framework**: Next.js 16
- **Deployment**: Automatico con cada push

### Como funciona Vercel

1. **Conexion con GitHub**
   - Vercel esta conectado al repositorio
   - Detecta cambios automaticamente

2. **Build automatico**
   - Cada push a la rama `clase` dispara un build
   - Ejecuta `npm run build` automaticamente
   - Optimiza el codigo para produccion

3. **Deployment instantaneo**
   - Build completo en 1-2 minutos
   - URL actualizada automaticamente
   - SSL/HTTPS incluido gratis

4. **Preview deployments**
   - Cada commit tiene su propia URL de preview
   - Perfecto para testing antes de produccion

### Ventajas sobre FTP

| Caracteristica | FTP | Vercel |
|---------------|-----|--------|
| Velocidad | Manual, lento | Automatico, rapido |
| SSL/HTTPS | Manual | Automatico |
| Rollback | Manual | Un click |
| Preview | No | Si |
| CDN Global | No | Si |
| Optimizacion | Manual | Automatica |

### Configuracion del Proyecto

**Archivo: `web/vercel.json`**
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

### Logs de Deployment

Ejemplo de deployment exitoso:
```
12:40:39.240 Running build in Washington, D.C., USA (East)
12:40:39.384 Cloning github.com/Fralopala2/medusse-web (Branch: clase)
12:40:41.264 Installing dependencies...
12:40:44.360 added 213 packages in 3s
12:40:50.245 Build Completed in /vercel/output [9s]
12:41:00.118 Deployment completed
```

### Comandos Utiles

**Ver deployments:**
```bash
vercel ls
```

**Deploy manual:**
```bash
cd web
vercel
```

**Ver logs:**
```bash
vercel logs
```

### Limitaciones (Plan Gratuito)

- 100 GB bandwidth/mes
- 100 deployments/dia
- Sin variables de entorno privadas ilimitadas
- Suficiente para proyectos educativos

---

## 🎯 Alternativas Modernas

Si tienes acceso a servicios modernos, considera:

- **Vercel** (Next.js) - ✅ Ya implementado en este proyecto
- **Railway** (API + DB) - Mas facil que FTP
- **Netlify** (Frontend) - Deploy automatico
- **GitHub Pages** (Estatico) - Gratis

FTP es util cuando:
- Tienes un hosting compartido tradicional
- No tienes acceso a servicios modernos
- Necesitas control total del servidor
- Tu institucion requiere hosting especifico

---

## 📞 Contacto

Para problemas con el deployment FTP:
- Revisa los logs del script
- Verifica credenciales con tu proveedor de hosting
- Consulta la documentacion de tu hosting
