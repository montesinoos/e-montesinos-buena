# Pendientes

---

## El globo 3D de la sección «Salida»

Ficha de rendimiento del globo interactivo de la home (parada «Salida»), tomada
al cerrar el módulo 4 el **30 de agosto de 2026**. La deja escrita aquí para que
la revisión final de rendimiento de toda la web tenga un punto de partida y no
haya que volver a medir esto desde cero.

Todas las cifras son del **sitio ya construido** (`npm run build` + `astro
preview`), no del servidor de desarrollo, que sirve cientos de módulos sueltos y
daría un número que no se parece a nada real. Chrome de escritorio, ventana de
1440×900. Se puede reproducir con los scripts de `lab/`:
`node lab/medir-globo.mjs` y `node lab/medir-salto.mjs` con el preview
levantado en el puerto 4400.

### Peso añadido

| Pieza | En disco | Gzip | Cuándo se descarga |
|---|---|---|---|
| `globe.gl` (incluye `three-globe`) | 1 257 KB | 371 KB | diferido |
| `three` | 708 KB | 178 KB | diferido |
| Textura de color `earth-blue-marble-2k.webp` | 266 KB | — (ya comprimida) | diferido |
| Relieve `earth-topology-2k.webp` | 57 KB | — (ya comprimida) | diferido |
| Código propio del globo (dentro del script de `index.astro`) | 7 KB | 3 KB | **al cargar la home** |
| **Total diferido** | **2 288 KB** | **~872 KB por la red** | |

Lo único que paga quien abre la home y no baja son esos **3 KB comprimidos** del
disparador. Comprobado: al cargar la portada se piden **0** trozos de
globe.gl/three.

### Tiempo hasta que el globo está listo

«Listo» = formado, girando y respondiendo (el propio código marca
`#globo-salida[data-listo="si"]` en ese instante, para poder medirlo desde fuera
sin instrumentar nada).

**Bajando con la rueda, como haría cualquiera:**

| Freno de CPU | Globo listo | La sección llega a | Margen |
|---|---|---|---|
| sin freno | 318 ms | 1 943 ms | **+1,6 s** |
| ×4 | 1 683 ms | 3 654 ms | **+2,0 s** |
| ×6 | 2 550 ms | 5 428 ms | **+2,9 s** |

Es decir: bajando normal, el globo siempre llega formado con dos segundos largos
de sobra, incluso simulando un equipo seis veces más lento.

**Caso malo — saltar de golpe a «Salida» con el mapa de la cabecera, recién
cargada la página:**

| Freno de CPU | La sección aparece a | Globo listo | Se forma después |
|---|---|---|---|
| sin freno | 14 ms | 343 ms | +0,3 s |
| ×4 | 63 ms | 1 095 ms | +1,0 s |
| ×6 | 144 ms | 1 860 ms | +1,9 s |

Aquí el salto es instantáneo y no hay recorrido de scroll que aprovechar, así que
el globo entra entre 0,3 y 1,9 s más tarde. No hay fundido ni animación: aparece
formado, sin más. Eliminar del todo esa espera exige pagar la descarga por
adelantado — está anotado abajo como decisión a tomar juntos.

### Ya aplicado

- **Carga diferida.** `import()` dinámico disparado al entrar en el recorrido del
  mundo, con el umbral ya pasado. Antes el `import` estático metía 1,9 MB de JS
  en cada visita a la home aunque nadie bajara del armario de la portada.
- **Texturas reescaladas.** Venían del paquete `three-globe` a 4096 px de ancho y
  pesaban **1 797 KB** entre las dos. La esfera ocupa como mucho unos 540 px en
  pantalla (1 080 en pantalla de densidad doble), así que del hemisferio visible
  ya caían más de dos texels por píxel: era el doble de resolución de la que
  puede llegar a verse. Reescaladas a 2048 y pasadas a webp quedan en **323 KB**,
  un **82 % menos**, sin diferencia apreciable en el relieve ni en el color.
  Los originales, si alguna vez hacen falta, están en
  `node_modules/three-globe/example/img/`.
- **Fuera lo que no se usa.** `earth-day.jpg` (239 KB) se quedó por el camino al
  cambiar a blue marble y seguía copiándose a `dist/`. Borrado.

### Para decidir juntos (no lo he tocado por mi cuenta)

1. **El trozo de `globe.gl` son 1 257 KB para lo poco que usamos.** Trae dentro
   todas las capas de `three-globe` — hexbins, polígonos, arcos, teselas,
   etiquetas, anillos, rutas — y nosotros solo gastamos la capa de objetos
   propios (los doce sprites). Montar la escena directamente sobre `three`, sin
   `globe.gl`, quitaría del orden de 1 MB. Es rehacer los módulos 1 y 2, no un
   ajuste: por eso no lo he hecho.
2. **`three` viaja en dos sitios.** Va dentro del trozo de `globe.gl` y otra vez
   en su propio trozo, porque el código de los marcadores lo importa directo.
   Puede que se deduplique tocando la configuración de chunks del bundler; hay
   que probarlo y medirlo, no darlo por hecho.
3. **Adelantar la descarga con `<link rel="prefetch">`.** Quitaría la espera del
   caso malo, a cambio de descargar 872 KB en segundo plano también para quien
   nunca baja hasta la sección. Es exactamente el equilibrio que el módulo 4
   pedía cuidar, así que lo dejo a tu criterio.
4. **Densidad de píxel en móvil.** `three` renderiza al `devicePixelRatio` del
   aparato; en un móvil de densidad triple eso es un búfer nueve veces mayor que
   el lógico. Limitarlo a 2 suele ser gratis a la vista y notable en batería,
   pero cambia la nitidez y prefiero que lo mires tú en un teléfono real.
5. **El brillo especular del océano.** El material del planeta tiene un reflejo
   bastante plástico arriba a la izquierda. Se baja con `shininess`, pero es una
   decisión de aspecto, no de rendimiento.

### Datos de ejemplo aún por sustituir

Los doce marcadores usan **la capital de cada país** como posición y **la misma
foto** (`/proyectos-web/showroom-1.webp`) como imagen de la obra. La foto es la
misma a propósito: colgar de Qatar una foto de Louboutin sería inventarse un
proyecto, que es justo lo que prohíbe la regla de la cabecera de
`src/data/montesinos.js`. Cuando lleguen las ciudades y las fotos reales solo hay
que cambiar `ciudad` e `img` en `paisesGlobo`, en ese mismo archivo; no hay que
tocar nada más.
