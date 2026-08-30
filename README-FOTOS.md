# Fotos pendientes

Lista de fotografías reales que faltan por conseguir, con las instrucciones de
encuadre. Mientras no lleguen, la web va montada con marcadores de posición
generados, que se ven bien pero no son fotos: hay que sustituirlos.

---

## 1. Fondo de la sección «Material» — PENDIENTE

**Archivo a sustituir:** `public/mundo/nave-fondo-liso.webp`
**Dónde se ve:** portada, tramo «Material», detrás del banco de las ocho
muestras de madera.
**Estado:** marcador de posición generado por `lab/gen-fondo.mjs` (gris cálido
liso con luz suave y encuentro pared/suelo). No es una foto.

### Por qué se cambió

Antes ahí iba `nave-materia.webp` (tablones de madera apilados y planchas de
latón). El banco de muestras ya ES madera, con su propia veta, así que había
dos superficies texturizadas compitiendo: ruido visual y el widget perdía
protagonismo. El fondo de esta sección tiene que ser mudo.

### Qué foto hacer

- **Motivo:** una pared del taller, un suelo de hormigón pulido, o el testero
  de una nave. Una superficie **lisa y neutra**, sin veta, sin ladrillo visto,
  sin panelado, sin patrón que se repita.
- **Encuadre:** horizontal, 16:9. **Nada en primer plano**: ni máquinas, ni
  bancos, ni cajas, ni herramientas colgadas, ni carteles. Si aparece el
  encuentro de la pared con el suelo, mejor: da profundidad.
- **Profundidad:** que no sea un plano completamente frontal y plano. Un
  ligero escorzo, o esa línea pared/suelo, basta para que se lea como un
  espacio real y no como un fondo de estudio.
- **Luz:** suave y uniforme. Sin sol duro, sin manchas de luz marcadas, sin
  sombras con dibujo (rejas, ventanas, perfiles). Una zona de sombra amplia y
  degradada sí vale.
- **Color:** la misma paleta cálida que el resto de fotos del taller —
  hormigón, cal, gris cálido, beige. Nada frío ni azulado, nada blanco puro.
- **Tono general:** medio-claro. El texto de la sección va en tinta oscura
  sobre un halo blanco, y el banco de muestras es madera oscura con sombra
  proyectada: los dos necesitan un fondo más claro que ellos para destacar.
- **Nitidez:** no importa que esté ligeramente desenfocada. De hecho ayuda —
  tiene que quedarse claramente en segundo plano.
- **Resolución mínima:** 2400 px de ancho.

### Cómo sustituirla

1. Guardar el original en `assets-source/`.
2. Exportar a WebP 2400 px de ancho, calidad ~82, y dejarlo en
   `public/mundo/nave-fondo-liso.webp` (mismo nombre: no hay que tocar código).
3. Actualizar el `alt` en `src/pages/index.astro` (tramo «Material») para que
   describa la foto real.
4. Borrar `lab/gen-fondo.mjs` y esta entrada.
5. Comprobar en pantalla que el banco de muestras y el texto siguen
   destacando claramente sobre el fondo. Si el fondo compite, bajarle
   contraste o aclararlo antes de exportar.

### Lo que NO se toca

`nave-materia.webp` sigue usándose en la página **Estudio**
(`src/pages/estudio.astro`), donde va sola y funciona bien. No borrarla.

---

## 2. Ciudades de la red de distribución — PENDIENTE

Ver nota en `PENDIENTES.md`: el globo usa una foto de showroom repetida como
imagen de obra hasta que lleguen las fotos reales por ciudad.
