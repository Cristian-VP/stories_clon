# Instagram Stories Clone

Proyecto educativo que replica el flujo de Instagram Stories empleando React 19, TypeScript, Vite y Tailwind CSS. Incluye compresión ligera de imágenes, almacenamiento local y controles táctiles para avanzar, retroceder o pausar.

## Demo en local

Sube tu video a `media/demo.mp4` (formato recomendado: MP4 con códecs H.264/AAC para máxima compatibilidad) y ejecútalo desde el README mediante la etiqueta HTML:

<video src="./media/demo.mp4" controls width="720" preload="metadata">
  Tu navegador no soporta la reproducción de video embebido.
</video>

## Características principales

- Creación y visualización de stories con avance automático de 3 segundos y barra de progreso.
- Persistencia en LocalStorage con expiración a las 24 horas.
- Gestos táctiles: tap para navegar, hold para pausar, swipe down para cerrar el visor.
- Diseño responsivo orientado a móvil con comportamiento consistente en tablet y desktop.

## Instalación y ejecución

```bash
git clone https://github.com/tu-usuario/stories_clon.git
cd stories_clon
npm install
npm run dev
```

## Uso básico

Crea una story desde el botón de subida, añade una o varias imágenes y ábrelas en el visor para comprobar el avance automático. Mantén pulsado para pausar y navega con taps en los laterales o deslizando hacia abajo para cerrar.

## Arquitectura breve

La UI se compone de componentes reutilizables (`ProgressBar`, `StoryCircle`, `StoryViewer`, `UploadButton`) orquestados por un contexto global (`StoriesContext`) y hooks especializados (`useStoryTimer`, `useGestures`) que gestionan temporizador, gestos y estado. Los servicios (`imageServices`, `storageServices`) encapsulan la compresión en canvas y el acceso a LocalStorage.

## Almacenamiento y limpieza

Cada story guarda un identificador, la imagen comprimida en Base64 y la marca de tiempo de creación. Un proceso de limpieza elimina historias con más de 24 horas para evitar saturar el almacenamiento del navegador.

## Licencia

Proyecto de uso educativo; si lo reutilizas, mantén la atribución y revisa las dependencias antes de despliegue en producción.

## Deploy en GitHub Pages

1. Ajusta `base` en `vite.config.ts` al nombre exacto del repo: `base: '/stories_clon/'`.
2. Crea `public/404.html` con redirección al `base` para que GitHub Pages sirva rutas internas:

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/stories_clon/">
  <script>
    window.location.replace('/stories_clon/');
  </script>
</head>
<body></body>
</html>
```

3. Genera la build y publica en `gh-pages`:

```bash
npm run build
npm run preview # opcional, verifica en local
npm run deploy  # si tienes script; si no, sube `dist/` al branch gh-pages
```

4. En GitHub, habilita Pages apuntando a la rama y carpeta `gh-pages`/`/` (o `docs/` según tu flujo).

- Base en `vite.config.ts` ya configurada: `base: '/stories_clon/'`.
- Si usas GitHub Actions, el flujo `/.github/workflows/deploy.yml` build + deploya a Pages automáticamente desde `main` a la rama interna de Pages.
- Alternativa: instala `gh-pages` (`npm i -D gh-pages`) y usa los scripts `predeploy`/`deploy` añadidos en `package.json` para publicar `dist/`.

Asegúrate de hacer commit de `dist/` solo si usas Pages desde `/docs`; de lo contrario, usa una rama de despliegue o una acción de CI que copie `dist/` a `gh-pages`.
