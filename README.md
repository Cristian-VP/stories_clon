# Instagram Stories Clone 📸

Un clon educativo de Instagram Stories creado con **React 19**, **TypeScript**, **Tailwind CSS 4** y **Vite**. 

## ✨ Características

- ✅ **Carga de historias** con compresión automática de imágenes
- ✅ **Almacenamiento local** (LocalStorage) - Las historias se guardan automáticamente
- ✅ **Expiración automática** - Las historias se eliminan después de 24 horas
- ✅ **Visor de pantalla completa** - Navega entre historias
- ✅ **Temporizador automático** - Cada historia dura 3 segundos
- ✅ **Controles de gestos**:
  - **Tap izquierda/derecha** - Navegar entre historias
  - **Hold (mantener)** - Pausar reproducción
  - **Swipe Down** - Cerrar visor
- ✅ **100% Responsive** - Funciona perfectamente en mobile, tablet y desktop
- ✅ **Diseño neutro/blanco** - Interfaz limpia y minimalista

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/stories_clon.git
cd stories_clon

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar la versión compilada
npm run preview
```

## 📱 Uso

1. **Subir una historia**: Haz click en el botón "+" en la barra de historias
2. **Ver historia**: Haz click en cualquier círculo de historia
3. **Navegar**: 
   - Click izquierda/derecha en el visor
   - Usa los botones de navegación
   - Desliza hacia abajo para cerrar
4. **Pausar/Reanudar**: Mantén presionado en la historia para pausar

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes de UI
│   ├── ProgressBar.tsx   # Barras de progreso de las historias
│   ├── StoryCircle.tsx   # Círculos de las historias
│   ├── StoryViewer.tsx   # Visor de pantalla completa
│   └── UploadButton.tsx  # Botón para subir historias
├── context/
│   └── StoriesContext.tsx # Estado global y gestión de historias
├── hooks/
│   ├── useStoryTimer.ts  # Hook para el temporizador
│   └── useGestures.ts    # Hook para gestos táctiles
├── services/
│   ├── imageServices.ts  # Compresión de imágenes
│   └── storageServices.ts # Gestión de LocalStorage
├── types.ts              # Definiciones de TypeScript
├── App.tsx               # Componente principal
└── main.tsx              # Punto de entrada
```

## 🛠️ Tecnologías

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Bundler rápido
- **Tailwind CSS 4** - Estilos utility-first
- **Lucide React** - Iconos SVG

## 💾 Almacenamiento

Las historias se almacenan en **LocalStorage** con los siguientes datos:
- ID único (UUID)
- Imagen comprimida (Base64)
- Timestamp de creación
- Duración (3 segundos)

**Limpieza automática**: Las historias con más de 24 horas de antigüedad se eliminan automáticamente.

## 📸 Compresión de Imágenes

Las imágenes se comprimen automáticamente usando **Canvas API**:
- Máximo ancho: 1080px
- Calidad JPEG: 0.8 (80%)
- Esto permite almacenar más historias sin llenar el LocalStorage

## 🎨 Diseño Responsive

El proyecto está 100% optimizado para:
- 📱 Móviles (320px y superiores)
- 📱 Tablets (768px y superiores)
- 🖥️ Desktops (1024px y superiores)

## 📄 Licencia

Este es un proyecto educativo. Libre de usar para aprendizaje.

