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

## El recorrido de la nave

El mapa de cuatro paradas (Nave · Material · 1:1 · Salida) está **dos veces en
el DOM** y solo se ve una a la vez: en escritorio, en la punta derecha de la
barra de arriba (`.mapa`, en `Base.astro` dentro del `<header>`); en móvil, en
una barra fija al pie de la portada (`.recorrido`, hermana del `<header>`).
Arriba, en un teléfono, las cuatro paradas se quedaban en 144 px compartidos
con el CTA.

El JS no sabe cuál de las dos se ve: recorre todas las listas `[data-mapa]` y
agrupa sus botones por índice de parada, así que las dos saltan igual y las dos
se encienden con el mismo `sc:waypoint`. Si se añade una parada hay que
añadirla en los dos sitios.

**Dónde para cada botón no se declara: se deduce.** Cada parada tiene su
bloque de copia con una ventana (`data-sc-window`: desde, hasta, y cuánto tarda
en entrar y en salir). De ahí se saca la *meseta* —el tramo en el que el texto
está a plena opacidad— y el botón aterriza un cuarto dentro de ella. Antes cada
tramo llevaba el punto a mano (`data-sc-parada`) y el número no sabía nada del
texto: bastaba retocar una ventana para que el salto cayera en mitad del
fundido. Con las ventanas de hoy, «1:1» aterrizaba a 43 px del borde y «Salida»
1 px FUERA —se llegaba con el texto todavía entrando—. `data-sc-parada` se
queda solo como respaldo para un tramo sin copia declarada.

El salto usa la altura de pantalla **del motor**, no `innerHeight`: en un móvil
la barra del navegador se esconde y reaparece, y ahí se van entre 60 y 90 px. El
motor fija su pista una vez, con la altura que había entonces; se recupera
dividiendo el alto del espaciador entre (peso total + 1).

La aguja de la barra del pie es continua, no salta de casilla: `pintarRecorrido()`
escribe `--p` (0 a 1, cuánto llevas del recorrido entero) y el CSS la desliza.
Va aparte de `pintarCamara()` porque aquella se apaga con movimiento reducido y
un indicador de posición no puede apagarse.

`--recorrido-h` (en `tema.css`) es el alto de esa barra: vale `0px` por defecto
y `3.5rem` en `body:has(.recorrido)` bajo 860 px. Todo lo que se apoya en el
borde inferior de la pantalla —la copia del umbral, la copia de cada tramo, el
botón de WhatsApp— la suma, así que en el resto de páginas la cuenta da el sitio
de siempre sin condicionales.

## Las imágenes en móvil

Toda foto que se pinte grande tiene una copia `-m` al lado. No es la misma
imagen encogida: las de `mundo/` son recortes **verticales** de 780×1386,
que es la forma real de la pantalla de un teléfono, y se eligen con
`<picture>` + `media` (dirección de arte). Las de `proyectos-web/` sí son la
misma foto a 900 px de ancho y se eligen con `srcset` + `sizes`, que es
resolución y no encuadre. Con eso la portada baja de 1,3 MB a 380 KB y la
galería de 2,8 MB a 1 MB.

Si entra una foto nueva:

```bash
# proyectos: cualquiera que pase de 1100 px de ancho quiere su copia
node -e "const s=require('sharp');s('public/proyectos-web/NOMBRE.webp').resize({width:900}).webp({quality:74}).toFile('public/proyectos-web/NOMBRE-m.webp')"
```

`proyectos.astro` mira la carpeta al compilar, así que en cuanto el archivo
`-m` existe entra solo en el `srcset`. Las fotos que ya vienen por debajo de
1100 px no necesitan copia y la página lo detecta.

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
