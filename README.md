# Instagram Stories Clone

Proyecto educativo que replica el flujo de Instagram Stories empleando React 19, TypeScript, Vite y Tailwind CSS. Incluye compresión ligera de imágenes, almacenamiento local y controles táctiles para avanzar, retroceder o pausar.

## <u>[Ver en GitHub Pages](https://cristian-vp.github.io/stories_clon/)</u>

## Demo Desktop

![Demo Desktop](https://raw.githubusercontent.com/cifpfbmoll/05-clon-stories-de-instagram-Cristian-VP/main/media/desktop.gif)

## Demo móvil

![Demo Móvil](https://raw.githubusercontent.com/cifpfbmoll/05-clon-stories-de-instagram-Cristian-VP/main/media/mobil.gif)


## Características principales

- Creación y visualización de stories con avance automático de 3 segundos y barra de progreso.
- Persistencia en LocalStorage con expiración a las 24 horas.
- Gestos táctiles: tap para navegar, hold para pausar, swipe down para cerrar el visor.
- Diseño responsivo orientado a móvil con comportamiento consistente en tablet y desktop.

## Uso básico

Crea una story desde el botón de subida, añade una o varias imágenes y ábrelas en el visor para comprobar el avance automático. Mantén pulsado para pausar y navega con taps en los laterales o deslizando hacia abajo para cerrar.

## Arquitectura breve

La UI se compone de componentes reutilizables (`ProgressBar`, `StoryCircle`, `StoryViewer`, `UploadButton`) orquestados por un contexto global (`StoriesContext`) y hooks especializados (`useStoryTimer`, `useGestures`) que gestionan temporizador, gestos y estado. Los servicios (`imageServices`, `storageServices`) encapsulan la compresión en canvas y el acceso a LocalStorage.

## Almacenamiento y limpieza

Cada story guarda un identificador, la imagen comprimida en Base64 y la marca de tiempo de creación. Un proceso de limpieza elimina historias con más de 24 horas para evitar saturar el almacenamiento del navegador.


