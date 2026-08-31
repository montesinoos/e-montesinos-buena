# Ebanistería Montesinos

Sitio estático en [Astro](https://astro.build). Cinco páginas, sin framework de
UI y sin Tailwind: el CSS vive en `public/`.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview
```

## Cómo está montada la portada

La portada es una pieza scroll-driven, no una página de secciones. Tiene tres
capas y conviene entenderlas antes de tocarla.

**El umbral.** Un armario a pantalla completa cuyas dos puertas son elementos
del DOM que giran con `rotateY` sobre sus cantos exteriores, que es donde están
las bisagras en la fotografía. No es vídeo. Detrás no hay baldas: hay una nave.
La imagen de la nave se contraescala mientras el hueco crece, así que no avanza
la cámara, se agranda la abertura. De ahí la lectura de "más grande por dentro".

**El mundo.** Un único lienzo fijo con cinco tramos que se funden entre sí
(`data-sc-mode="worldflight"`). Lo único que hay en el flujo del documento es un
espaciador. No hay secciones ni cortes. Cada tramo lleva su propio movimiento de
cámara, definido en `CAMARA` dentro de `public/montesinos.js`.

**El cierre.** Las puertas vuelven a cerrarse por delante y en su cara interior
está grabado el contacto, como el ebanista que firma el mueble por dentro.

Las coordenadas de las puertas (22,588% a 77,412% de ancho, costura al 49,6%)
están medidas sobre la fotografía real del armario. Si se cambia esa foto, hay
que volver a medirlas o las hojas dejarán de encajar con el mueble.

## Estructura

```
src/
  data/montesinos.js       datos reales: sedes, proyectos, proceso, pilares
  layouts/Base.astro       <head>, chrome fijo, mapa de la nave, menú
  components/Pie.astro
  pages/                   index, proyectos, como-trabajamos, taller, contacto
public/
  scrollcraft.css / .js    motor scroll. NO editar: se tematiza con tokens
  tema.css                 tokens de marca y estilo del markup propio
  montesinos.js            puertas, cámara por tramo, coreografía de copia
  mundo/                   los cinco tramos, horizontal y vertical
  puertas/                 hojas del armario y textura de roble
  proyectos-web/           obra real, en webp
assets-source/
  proyectos/               fotos originales del cliente, sin optimizar
  generado/                (ignorado) PNG originales de KIE.AI
```

## Sobre el contenido

Todo lo de `src/data/montesinos.js` procede de themontesinos.com. Los teléfonos,
las cuatro sedes, los cuatro pilares, la homologación de Krion y la prensa son
datos reales.

**De los proyectos solo constan el nombre y el sector.** La web oficial no
publica año, materiales ni superficie, así que aquí tampoco: una ficha con datos
supuestos sobre obra de Louboutin o de Harrods sería una invención.

Las fotografías de proyecto son las reales del cliente. Las imágenes del armario
y de la nave están generadas con KIE.AI; ninguna obra de cliente lo está.

## Pendiente

- Sustituir las imágenes generadas por fotografía real de la nave de Sabadell
  cuando el cliente la facilite.
- Versión en inglés. Ahora mismo el sitio es solo en español.
- El formulario de contacto valida y responde en cliente, pero no envía a
  ningún sitio. Falta conectarlo a un endpoint.
- Probar el giro de las puertas en un iPhone real. Chrome headless no reproduce
  el compositor de iOS.
