/* De los PNG de KIE.AI a las muestras que sirve la web.

   Tres cosas, y ninguna es cosmética:

   1. RECORTE DEL MARCO. Nano Banana devuelve unas con la madera a sangre y
      otras con un margen blanco de estudio alrededor. Sobre el banco, ese
      margen se vería como un papel debajo de la tabla. Se recorta buscando
      desde cada borde la primera fila/columna que ya no es casi blanca.

   2. MISMA PROPORCIÓN. Las ocho salen a 3:4 pero, tras recortar, cada una
      queda con la suya. La muestra en la web es 3:3.4, así que se recorta al
      centro a esa proporción exacta: si no, `object-fit: cover` haría un zoom
      distinto en cada tabla y la escala de la veta no casaría entre vecinas.

   3. PESO. PNG de 1.6 MB por muestra son 13 MB en una parada del recorrido.
      A WebP de 560 px de ancho, que es de sobra para el tamaño en que se ven.
*/

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const RAIZ = 'C:/Users/maris/Desktop/Claude Web/Montesinos/web-montesinos-buena';
const ORIGEN = path.join(RAIZ, 'out', 'maderas');
const DESTINO = path.join(RAIZ, 'public', 'maderas');

const ANCHO = 560;
const ALTO = Math.round(ANCHO * 3.4 / 3);   // la proporción de .muestra

// Por encima de esto se considera fondo de estudio, no madera. La madera más
// clara que hay aquí (fresno) ronda 210: 236 deja margen de sobra.
const BLANCO = 236;

async function margenes(archivo) {
  const { data, info } = await sharp(archivo)
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;

  const claro = (x, y) => {
    const i = (y * w + x) * c;
    return data[i] > BLANCO && data[i + 1] > BLANCO && data[i + 2] > BLANCO;
  };
  // Una fila cuenta como fondo si casi entera es clara. No se exige el 100%
  // porque el borde del papel trae siempre algún píxel sucio.
  const filaVacia = y => {
    let n = 0;
    for (let x = 0; x < w; x += 2) if (claro(x, y)) n++;
    return n / Math.ceil(w / 2) > 0.97;
  };
  const colVacia = x => {
    let n = 0;
    for (let y = 0; y < h; y += 2) if (claro(x, y)) n++;
    return n / Math.ceil(h / 2) > 0.97;
  };

  let top = 0, bottom = h - 1, left = 0, right = w - 1;
  while (top < bottom && filaVacia(top)) top++;
  while (bottom > top && filaVacia(bottom)) bottom--;
  while (left < right && colVacia(left)) left++;
  while (right > left && colVacia(right)) right--;

  return { left, top, width: right - left + 1, height: bottom - top + 1, w, h };
}

async function main() {
  fs.mkdirSync(DESTINO, { recursive: true });
  const archivos = fs.readdirSync(ORIGEN).filter(f => f.endsWith('.png')).sort();

  for (const f of archivos) {
    const id = path.basename(f, '.png');
    const src = path.join(ORIGEN, f);
    const m = await margenes(src);
    const recortado = m.width !== m.w || m.height !== m.h;

    const buf = await sharp(src)
      .extract({ left: m.left, top: m.top, width: m.width, height: m.height })
      // `cover` con posición centro: recorta al 3:3.4 por el lado que sobre,
      // nunca deforma.
      .resize(ANCHO, ALTO, { fit: 'cover', position: 'centre' })
      .webp({ quality: 86 })
      .toBuffer();

    fs.writeFileSync(path.join(DESTINO, id + '.webp'), buf);
    console.log(
      id.padEnd(9),
      (m.w + 'x' + m.h).padEnd(10),
      '->', (m.width + 'x' + m.height).padEnd(10),
      recortado ? 'marco recortado' : 'a sangre       ',
      (buf.length / 1024).toFixed(0) + ' kB'
    );
  }
}

main().catch(e => { console.error(e); process.exit(1); });
