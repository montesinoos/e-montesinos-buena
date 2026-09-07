// Sólo transforma las copias de dist; los motores y estilos fuente se conservan.
import { transform } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
for (const file of ['scrollcraft.css', 'tema.css', 'scrollcraft.js', 'montesinos.js']) {
  const path = new URL('../dist/' + file, import.meta.url);
  const result = await transform(await readFile(path, 'utf8'), {
    loader: file.endsWith('.css') ? 'css' : 'js',
    minify: true, target: ['safari15.4', 'chrome100'], legalComments: 'eof'
  });
  await writeFile(path, result.code);
}
