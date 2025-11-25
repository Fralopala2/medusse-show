# Medusse IoT - Especificaciones de Diseño para Figma

## 🎨 Sistema de Colores

### Colores Principales
```
Indigo 600 (Primary): #4F46E5
Indigo 700 (Primary Hover): #4338CA
Indigo 500 (Primary Light): #6366F1
Indigo 100 (Primary Lightest): #E0E7FF

Red 600 (Danger): #DC2626
Red 700 (Danger Hover): #B91C1C
Red 50 (Danger Background): #FEF2F2

Green 600 (Success): #16A34A
Green 700 (Success Hover): #15803D

Gray 900 (Text Primary): #111827
Gray 700 (Text Secondary): #374151
Gray 600 (Text Tertiary): #4B5563
Gray 500 (Text Disabled): #6B7280
Gray 400 (Border): #9CA3AF
Gray 300 (Border Light): #D1D5DB
Gray 200 (Border Lighter): #E5E7EB
Gray 100 (Background Light): #F3F4F6
Gray 50 (Background): #F9FAFB

White: #FFFFFF
```

### Colores por Ubicacion (Dashboard)
```
Aula 20 (Rojo): #E53E3E
Aula 21 (Purpura): #805AD5
Gimnasio (Naranja): #FF9800
Laboratorio (Verde): #38A169
```

## 📝 Tipografia

### Fuente Principal
- **Familia**: System UI, -apple-system, sans-serif
- **Alternativa**: Inter (Google Fonts)

### Escalas de Texto
```
text-xs: 12px / line-height: 16px
text-sm: 14px / line-height: 20px
text-base: 16px / line-height: 24px
text-lg: 18px / line-height: 28px
text-xl: 20px / line-height: 28px
text-2xl: 24px / line-height: 32px
text-3xl: 30px / line-height: 36px
```

### Pesos de Fuente
```
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
```

## 📐 Espaciado

### Sistema de Espaciado (múltiplos de 4px)
```
spacing-1: 4px
spacing-2: 8px
spacing-3: 12px
spacing-4: 16px
spacing-5: 20px
spacing-6: 24px
spacing-8: 32px
spacing-10: 40px
spacing-12: 48px
spacing-16: 64px
```

## 🔲 Componentes

### Botones

#### Boton Primario
```
Background: #4F46E5 (Indigo 600)
Hover: #4338CA (Indigo 700)
Text: #FFFFFF (White)
Padding: 8px 16px (py-2 px-4)
Border Radius: 6px (rounded-md)
Font: 14px, medium (text-sm font-medium)
```

#### Boton Secundario
```
Background: #FFFFFF (White)
Border: 1px solid #D1D5DB (Gray 300)
Hover Background: #F9FAFB (Gray 50)
Text: #374151 (Gray 700)
Padding: 8px 16px
Border Radius: 6px
Font: 14px, medium
```

#### Boton Danger
```
Background: #DC2626 (Red 600)
Hover: #B91C1C (Red 700)
Text: #FFFFFF
Padding: 8px 16px
Border Radius: 6px
Font: 14px, medium
```

### Inputs

#### Input de Texto
```
Background: #FFFFFF
Border: 1px solid #D1D5DB (Gray 300)
Focus Border: 2px solid #4F46E5 (Indigo 600)
Error Border: 2px solid #DC2626 (Red 600)
Padding: 8px 12px (py-2 px-3)
Border Radius: 6px
Font: 16px, normal
Height: 40px
```

#### Label
```
Text: #374151 (Gray 700)
Font: 14px, medium
Margin Bottom: 4px
```

#### Error Message
```
Text: #DC2626 (Red 600)
Font: 14px, normal
Margin Top: 4px
```

### Cards

#### Card Basica
```
Background: #FFFFFF
Border: none
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Border Radius: 8px (rounded-lg)
Padding: 24px (p-6)
```

#### Card con Hover
```
Background: #FFFFFF
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover Shadow: 0 10px 15px rgba(0,0,0,0.1)
Border Radius: 8px
Padding: 24px
Transition: shadow 0.3s
```

### Tablas

#### Header
```
Background: #F9FAFB (Gray 50)
Text: #6B7280 (Gray 500)
Font: 12px, medium, uppercase
Padding: 12px 24px (py-3 px-6)
Border Bottom: 1px solid #E5E7EB
```

#### Row
```
Background: #FFFFFF
Border Bottom: 1px solid #E5E7EB
Padding: 16px 24px (py-4 px-6)
Hover Background: #F9FAFB
```

## 📱 Paginas

### 1. Login Page (/login)

#### Layout
```
Container: Full screen (min-h-screen)
Background: Linear gradient from #EFF6FF to #E0E7FF
Alignment: Center (flex items-center justify-center)
```

#### Card de Login
```
Width: 448px (max-w-md)
Background: #FFFFFF
Padding: 32px (p-8)
Border Radius: 12px (rounded-xl)
Shadow: 0 20px 25px rgba(0,0,0,0.15)
```

#### Logo
```
Size: 128x128px (h-32 w-32)
Margin Bottom: 16px
Alignment: Center
```

#### Titulo
```
Text: "Medusse IoT"
Font: 30px, bold (text-3xl font-bold)
Color: #111827 (Gray 900)
Alignment: Center
```

#### Subtitulo
```
Text: "Sistema de Monitoreo Ambiental"
Font: 14px, normal (text-sm)
Color: #4B5563 (Gray 600)
Margin Top: 8px
Alignment: Center
```

#### Formulario
```
Margin Top: 32px
Gap entre campos: 16px
```

#### Botones
```
Width: 100% (w-full)
Gap entre botones: 12px
```

### 2. Dashboard Page (/dashboard)

#### Header
```
Background: #FFFFFF
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Padding: 16px (py-4)
```

#### Logo en Header
```
Size: 48x48px (h-12 w-12)
```

#### Titulo en Header
```
Font: 24px, bold (text-2xl font-bold)
Color: #111827
```

#### Contenido Principal
```
Max Width: 1280px (max-w-7xl)
Padding: 32px (py-8)
Margin: 0 auto
```

#### Cards de Informacion
```
Grid: 1 columna en mobile, 2 en tablet, 3 en desktop
Gap: 24px
```

#### Card de Usuario
```
Background: #FFFFFF
Padding: 24px
Border Radius: 8px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Margin Bottom: 24px
```

#### Badge de Rol
```
Admin: Background #FEE2E2, Text #991B1B
User: Background #DBEAFE, Text #1E40AF
Viewer: Background #F3F4F6, Text #374151
Padding: 4px 8px (py-1 px-2)
Border Radius: 4px
Font: 12px, medium
```

### 3. Admin Panel (/admin)

#### Header
```
Background: #FFFFFF
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Padding: 24px (py-6)
```

#### Tabs
```
Border Bottom: 1px solid #E5E7EB
Gap: 32px (space-x-8)
```

#### Tab Activo
```
Border Bottom: 2px solid #4F46E5
Color: #4F46E5
Font: 14px, medium
Padding: 16px 4px (py-4 px-1)
```

#### Tab Inactivo
```
Border Bottom: 2px solid transparent
Color: #6B7280
Hover Color: #374151
Font: 14px, medium
Padding: 16px 4px
```

#### Cards de Estadisticas
```
Grid: 1 columna en mobile, 2 en tablet, 4 en desktop
Gap: 20px
Background: #FFFFFF
Padding: 20px
Border Radius: 8px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
```

#### Icono en Card
```
Size: 24x24px (h-6 w-6)
Color: Segun tipo (Gray 400, Green 400, Yellow 400, Blue 400)
```

#### Numero en Card
```
Font: 30px, semibold (text-3xl font-semibold)
Color: #111827
```

#### Label en Card
```
Font: 14px, medium (text-sm font-medium)
Color: #6B7280
```

## 🎭 Estados Interactivos

### Hover
```
Transition: all 0.3s ease
Botones: Cambio de color de fondo
Cards: Aumento de sombra
Links: Cambio de color de texto
```

### Focus
```
Outline: 2px solid #4F46E5
Outline Offset: 2px
Border Radius: heredado
```

### Disabled
```
Opacity: 0.5
Cursor: not-allowed
Background: Sin cambio en hover
```

### Loading
```
Spinner: Border 2px, color #4F46E5
Animation: Spin 1s linear infinite
Size: 48x48px (h-12 w-12)
```

## 📏 Breakpoints Responsive

```
Mobile: 0px - 639px
Tablet: 640px - 1023px
Desktop: 1024px+
```

### Ajustes por Breakpoint

#### Mobile (< 640px)
```
Padding lateral: 16px (px-4)
Grid: 1 columna
Font sizes: Reducidos en 2px
```

#### Tablet (640px - 1023px)
```
Padding lateral: 24px (px-6)
Grid: 2 columnas
Font sizes: Normal
```

#### Desktop (1024px+)
```
Padding lateral: 32px (px-8)
Grid: 3-4 columnas
Font sizes: Normal
Max width: 1280px
```

## 🖼️ Assets Necesarios

### Logo
```
Archivo: logoMedusse.svg
Tamaños: 32px, 48px, 128px
Formato: SVG (vectorial)
```

### Iconos
```
Libreria: Heroicons o similar
Estilo: Outline
Tamaño base: 24x24px
```

## 📋 Notas para Figma

1. **Auto Layout**: Usar para todos los componentes flexibles
2. **Constraints**: Configurar para responsive
3. **Components**: Crear componentes reutilizables para botones, inputs, cards
4. **Variants**: Usar para estados (default, hover, focus, disabled)
5. **Styles**: Crear estilos de color y texto reutilizables
6. **Grid**: Configurar grid de 12 columnas con gap de 24px
7. **Spacing**: Usar sistema de 4px para consistencia

## 🎨 Paleta de Colores Completa (Hex)

```
Primary:
#EEF2FF - Indigo 50
#E0E7FF - Indigo 100
#C7D2FE - Indigo 200
#A5B4FC - Indigo 300
#818CF8 - Indigo 400
#6366F1 - Indigo 500
#4F46E5 - Indigo 600
#4338CA - Indigo 700
#3730A3 - Indigo 800
#312E81 - Indigo 900

Grays:
#F9FAFB - Gray 50
#F3F4F6 - Gray 100
#E5E7EB - Gray 200
#D1D5DB - Gray 300
#9CA3AF - Gray 400
#6B7280 - Gray 500
#4B5563 - Gray 600
#374151 - Gray 700
#1F2937 - Gray 800
#111827 - Gray 900

Success:
#F0FDF4 - Green 50
#DCFCE7 - Green 100
#BBF7D0 - Green 200
#86EFAC - Green 300
#4ADE80 - Green 400
#22C55E - Green 500
#16A34A - Green 600
#15803D - Green 700
#166534 - Green 800
#14532D - Green 900

Danger:
#FEF2F2 - Red 50
#FEE2E2 - Red 100
#FECACA - Red 200
#FCA5A5 - Red 300
#F87171 - Red 400
#EF4444 - Red 500
#DC2626 - Red 600
#B91C1C - Red 700
#991B1B - Red 800
#7F1D1D - Red 900
```
