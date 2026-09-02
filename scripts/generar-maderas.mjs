/* Genera las ocho muestras de madera con KIE.AI (google/nano-banana).

   El encuadre es lo que tiene que salir IGUAL en las ocho, porque van una al
   lado de otra sobre el mismo banco: cenital, plana, sin fondo, sin sombra
   proyectada y con la madera llenando el marco. Lo único que cambia entre
   prompt y prompt es la especie y su color. */

import fs from 'node:fs';
import path from 'node:path';

const RAIZ = 'C:/Users/maris/Desktop/Claude Web/Montesinos/web-montesinos-buena';
const SALIDA = process.argv[2] || path.join(RAIZ, 'out', 'maderas');

const CLAVE = fs.readFileSync(path.join(RAIZ, '.env'), 'utf8')
  .split(/\r?\n/).find(l => l.startsWith('KIE_AI_API_KEY='))
  .slice('KIE_AI_API_KEY='.length).trim().replace(/^"|"$/g, '');

// El encuadre, palabra por palabra, idéntico para las ocho.
const ENCUADRE =
  'Photorealistic macro studio photograph of a rectangular sample board of solid ' +
  '%ESPECIE%, planed smooth, unfinished raw natural surface, no varnish and no gloss. ' +
  'Shot perfectly straight from directly above, completely flat and square to the camera. ' +
  'The wood fills the entire frame edge to edge: no background, no table, no props, ' +
  'no text, no watermark, no hands, no border and no drop shadow. ' +
  'Even soft diffused overhead studio light, no cast shadows, no glare, no hotspots. ' +
  'Sharp natural grain running vertically from top to bottom of the frame. %COLOR%';

const SOLO = (process.env.SOLO || '').split(',').filter(Boolean);
const TODAS = [
  { id: 'roble',   especie: 'European oak wood',        color: 'Warm honey-brown colour with a pronounced open grain and visible medullary ray flecks.' },
  { id: 'nogal',   especie: 'American black walnut wood', color: 'Deep chocolate brown colour with darker purple-brown streaks and a calm straight grain.' },
  { id: 'fresno',  especie: 'European ash timber',      color: 'Very pale creamy off-white timber colour with long straight prominent darker grain lines and open pores.' },
  { id: 'haya',    especie: 'European beech hardwood',  color: 'Pale golden straw timber colour, very uniform, with an extremely fine tight grain and small dark brown flecks.' },
  { id: 'cerezo',  especie: 'American cherry wood',     color: 'Warm reddish-brown satiny colour with a fine even close grain and subtle darker gum flecks.' },
  { id: 'castano', especie: 'sweet chestnut wood',      color: 'Warm light golden-brown colour with a coarse open grain and wide growth rings, without ray flecks.' },
  { id: 'iroko',   especie: 'iroko wood',               color: 'Golden brown to medium tobacco brown colour with an interlocked irregular grain and a dense texture.' },
  { id: 'sapeli',  especie: 'sapele mahogany wood',     color: 'Deep reddish-brown colour with a regular ribbon stripe figure alternating light and dark bands.' }
];
const MADERAS = SOLO.length ? TODAS.filter(m => SOLO.includes(m.id)) : TODAS;

const api = (ruta, opts = {}) => fetch('https://api.kie.ai/api/v1' + ruta, {
  ...opts,
  headers: { Authorization: 'Bearer ' + CLAVE, 'Content-Type': 'application/json', ...(opts.headers || {}) }
}).then(r => r.json());

const espera = ms => new Promise(r => setTimeout(r, ms));

async function lanzar(m) {
  const prompt = ENCUADRE.replace('%ESPECIE%', m.especie).replace('%COLOR%', m.color);
  const r = await api('/jobs/createTask', {
    method: 'POST',
    body: JSON.stringify({
      model: 'google/nano-banana',
      input: { prompt, output_format: 'png', image_size: '3:4' }
    })
  });
  if (r.code !== 200) throw new Error(m.id + ': ' + JSON.stringify(r));
  return { ...m, taskId: r.data.taskId };
}

async function main() {
  fs.mkdirSync(SALIDA, { recursive: true });

  const tareas = [];
  for (const m of MADERAS) {
    tareas.push(await lanzar(m));
    console.log('lanzada', m.id);
  }

  const pendientes = new Map(tareas.map(t => [t.id, t]));
  const urls = {};

  // Hasta cinco minutos. Nano Banana suele tardar menos de uno por imagen.
  for (let intento = 0; intento < 60 && pendientes.size; intento++) {
    await espera(5000);
    for (const [id, t] of [...pendientes]) {
      const r = await api('/jobs/recordInfo?taskId=' + t.taskId);
      const e = r?.data?.state;
      if (e === 'success') {
        const res = JSON.parse(r.data.resultJson || '{}');
        const u = (res.resultUrls || res.result_urls || [])[0];
        if (!u) { console.log('!', id, 'sin url', r.data.resultJson); pendientes.delete(id); continue; }
        urls[id] = u;
        pendientes.delete(id);
        console.log('lista', id);
      } else if (e === 'fail') {
        console.log('FALLO', id, r.data.failMsg);
        pendientes.delete(id);
      }
    }
  }

  for (const [id, u] of Object.entries(urls)) {
    const buf = Buffer.from(await (await fetch(u)).arrayBuffer());
    const destino = path.join(SALIDA, id + '.png');
    fs.writeFileSync(destino, buf);
    console.log('guardada', destino, (buf.length / 1024).toFixed(0) + ' kB');
  }

  const faltan = MADERAS.map(m => m.id).filter(id => !urls[id]);
  console.log('\nOK ' + Object.keys(urls).length + '/8' + (faltan.length ? ' — faltan: ' + faltan.join(', ') : ''));
}

main().catch(e => { console.error(e); process.exit(1); });
