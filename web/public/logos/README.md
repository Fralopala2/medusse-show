# Logos del Proyecto Medusse IoT

Esta carpeta contiene los logos oficiales del proyecto.

## 📁 Archivos a subir:

Sube aquí tus archivos de logo:

- `medusse-logo.svg` - Logo en formato SVG (vectorial, recomendado)
- `medusse-logo.png` - Logo en formato PNG (para compatibilidad)

## 🎨 Uso de los logos:

Los logos se pueden usar en:

1. **Página de Login** (`/login`)
   - Encima del formulario
   - Tamaño: ~150-200px

2. **Dashboard** (`/dashboard`)
   - En el header
   - Tamaño: ~40-50px

3. **Header principal**
   - Navegación superior
   - Tamaño: ~40px

4. **Favicon**
   - Icono del navegador
   - Tamaño: 32x32px o 64x64px

## 📝 Nombres recomendados:

- `medusse-logo.svg` - Logo principal
- `medusse-logo.png` - Logo principal PNG
- `medusse-icon.svg` - Icono pequeño
- `medusse-icon.png` - Icono pequeño PNG
- `favicon.ico` - Favicon para navegador

## 🔧 Cómo usar en el código:

```tsx
// En componentes Next.js
import Image from 'next/image';

<Image 
  src="/logos/medusse-logo.svg" 
  alt="Medusse IoT" 
  width={150} 
  height={150} 
/>

// O directamente en HTML
<img src="/logos/medusse-logo.svg" alt="Medusse IoT" />
```

---

**Nota:** Los archivos en `public/` son accesibles directamente desde la raíz del sitio web.
