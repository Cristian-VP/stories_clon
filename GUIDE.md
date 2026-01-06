# Guía del Proyecto: Clon de Instagram Stories (Educational)

Esta guía responde a tus preguntas sobre cómo estructurar y arrancar el proyecto, las tecnologías a usar y las fases de desarrollo.

## 1. Stack Tecnológico & Herramientas

*   **Gestor de Paquetes:** `npm` (Node Package Manager) es el estándar y perfecto para este caso.
*   **Entorno de Desarrollo (Bundler):** **Vite**.
    *   *¿Por qué?* `create-react-app` está obsoleto. Vite es mucho más rápido, ligero y es el estándar actual de la industria.
*   **Framework JS:** **React** (versión 18+).
    *   *¿Por qué?* Gestión de estado eficiente (Hooks) y arquitectura basada en componentes ideal para interfaces interactivas.
*   **Lenguaje:** **TypeScript**.
    *   *¿Por qué?* Añade tipado estático. Aunque al principio parece más código, previene el 90% de los errores "tontos" (undefined is not a function) y mejora el autocompletado.
*   **Estilos:** **Tailwind CSS**.
    *   *¿Por qué?* Permite estilizar rápidamente sin salir del HTML/JSX. Es muy fácil hacer diseños responsivos (mobile-first).

## 2. Comandos para arrancar (Si empezaras de cero)

Si estuvieras en tu terminal local, estos serían los pasos (adaptados a **Tailwind CSS 4** con integración oficial en Vite):

```bash
# 1. Crear el proyecto con Vite y plantilla React-TypeScript
npm create vite@latest stories-clone -- --template react-ts

# 2. Entrar en la carpeta
cd stories-clone

# 3. Instalar dependencias
npm install

# 4. Instalar Tailwind CSS 4 + plugin Vite
#    - tailwindcss: el motor de estilos
#    - @tailwindcss/vite: plugin para que Vite procese Tailwind automáticamente
npm install -D tailwindcss @tailwindcss/vite

# 5. Instalar librería de iconos (opcional pero recomendada)
npm install lucide-react

# 6. Arrancar servidor de desarrollo
npm run dev
```

Configuración conceptual que aplica este proyecto:

- En `vite.config.ts` se añade el plugin de Tailwind:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

- En el CSS global (por ejemplo `src/index.css`) se importa Tailwind:

```css
@import "tailwindcss";
```

Con esto, Tailwind 4 funciona sin necesidad de `npx tailwindcss init -p` ni de ficheros de configuración extra para este caso sencillo.

## 3. Arquitectura y Estructura del Proyecto

Para mantener el orden y la escalabilidad, usaremos esta estructura:

```
src/
├── components/      # Piezas de UI reutilizables
│   ├── StoryCircle.tsx  # La bolita en la barra superior
│   ├── StoryViewer.tsx  # La vista pantalla completa (lógica compleja aquí)
│   ├── ProgressBar.tsx  # Las barras de tiempo arriba
│   └── UploadButton.tsx # Botón para subir fotos
├── context/         # Estado Global
│   └── StoriesContext.tsx # Gestiona la lista de historias y guardado en LocalStorage
├── hooks/           # Lógica extraída (Custom Hooks)
│   ├── useStoryTimer.ts # Controla el tiempo (3s), pausa y reinicio
│   └── useGestures.ts   # (Opcional) Lógica de swipe/tap
├── services/        # Lógica pura de negocio (sin React)
│   └── imageService.ts  # Canvas API: Redimensionar y comprimir a Base64
├── types.ts         # Definiciones de TypeScript (Interfaces)
├── App.tsx          # Layout principal
└── main.tsx         # Punto de entrada
```

## 4. Diagrama Mental de Clases/Interfaces

Necesitas definir bien tus datos antes de programar:

**Interface `Story`**
*   `id`: string (UUID)
*   `imageUrl`: string (Base64)
*   `timestamp`: number (Date.now())
*   `duration`: number (3000ms)

**Nota importante sobre múltiples stories:**
*   Un usuario puede subir múltiples stories (varias imágenes).
*   Todas las stories se almacenan en un array `Story[]` en el `StoriesContext`.
*   Cuando el usuario abre el visor, se muestran todas las stories en secuencia (1/3, 2/3, 3/3).
*   Cada story tiene su propia barra de progreso en la parte superior.
*   El temporizador avanza automáticamente cada 3 segundos, o el usuario puede navegar manualmente con gestos (swipe/tap).

## 5. Fases de Desarrollo (Paso a Paso)

No intentes hacerlo todo a la vez. Sigue este orden:

### Fase 1: Estructura de Datos y Servicio de Imágenes
*   Objetivo: Poder seleccionar un archivo, comprimirlo con Canvas (para que quepa en LocalStorage) y obtener un string Base64.
*   Archivos clave: `services/imageService.ts`.

### Fase 2: Estado Global y Persistencia
*   Objetivo: Guardar y cargar historias.
*   Logica: Crear el `StoriesContext`. Al cargar la app, leer de `localStorage`, filtrar las que tengan > 24 horas y borrarlas.

### Fase 3: La Barra de Historias (UI Básica)
*   Objetivo: Ver las bolitas y el botón de subir.
*   Componentes: `App.tsx`, `StoryCircle`, `UploadButton`.
*   Feedback: Al subir una foto, debe aparecer una nueva bolita.

### Fase 4: El Visor (La parte difícil)
*   Objetivo: Al hacer click, abrir modal pantalla completa.
*   Componentes: `StoryViewer`, `ProgressBar`.
*   Lógica: 
    *   Mostrar todas las stories del usuario en secuencia.
    *   Gestionar el índice actual (`currentStoryIndex`) para saber qué story mostrar.
    *   Renderizar múltiples barras de progreso (una por cada story).
    *   Mostrar indicador visual del progreso (ej: "1/3", "2/3", "3/3").
    *   Ordenar las stories por `timestamp` (más antigua primero, como Instagram).

### Fase 5: Temporizadores y Gestos
*   Objetivo: Que la barra avance sola y reaccione al tacto.
*   Lógica: 
    *   `useEffect` para el timer que avanza automáticamente cada 3 segundos.
    *   Cuando el temporizador termina, avanzar a la siguiente story (`currentStoryIndex + 1`).
    *   Si es la última story (`currentStoryIndex === stories.length - 1`), cerrar el visor.
    *   Eventos `onTouchStart`, `onTouchEnd` para detectar:
        *   **Tap izquierda/derecha**: Navegar a story anterior/siguiente.
        *   **Hold (mantener presionado)**: Pausar el temporizador.
        *   **Swipe Down**: Cerrar el visor y volver al feed.
    *   Reiniciar el temporizador cada vez que cambia `currentStoryIndex` (por navegación automática o manual).

---

*El código generado a continuación sigue estrictamente esta estructura para que sirva como ejemplo "Vivo" de la teoría explicada.*
