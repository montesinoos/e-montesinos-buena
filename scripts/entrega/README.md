# Pruebas de entrega

Ejecutar desde la raíz del proyecto, con el preview de la compilación en 4400.
No usar el servidor de desarrollo. Los scripts escriben en lab/entrega.

```sh
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4400
```

En otra terminal, preparar herramientas de laboratorio fuera de dependencias
de la web:

```sh
npm install --prefix lab/entrega/tools --no-save lighthouse@13.4.1 @axe-core/playwright@4.13.0
node scripts/entrega/auditar-entrega.mjs
node scripts/entrega/verificar-entrega.mjs
node scripts/entrega/comprobaciones-extra.mjs
node scripts/entrega/cierre-entrega.mjs
node scripts/entrega/rendimiento-entrega.mjs
```

Ejecutar rendimiento sin otros barridos activos. Requiere puerto 9223 libre.
CHROME_PATH permite indicar el binario Chromium/Chrome/Edge; por defecto usa
Edge de Windows. Cambiar el navegador o equipo cambia las condiciones.

Los scripts no envían formularios reales ni marcan teléfonos. Las comprobaciones
extra consultan enlaces externos de prensa y Maps por HTTP, y verificación
visita la URL pública facilitada. El formulario se comprueba con un evento
local y datos ficticios, sin POST.

Estos informes registran resultados, no son una certificación ni una suite de
aserciones que falle por cada hallazgo: inspeccionar JSON, capturas y consola.
Al recompilar se eliminan los archivos de dist; no iniciar un barrido hasta
que la compilación termine.

## Ampliación: legal, accesos, dispositivos y accesibilidad

Herramienta adicional local: playwright 1.62.1 en lab/entrega/tools.
Instalar sus motores con su CLI (webkit; Firefox opcional). WebKit 26.5
funciona sobre este Windows; Firefox no pudo iniciarse por falta de
msvcp140_1.dll. No se ha instalado un runtime de sistema para forzarlo.

```sh
node scripts/entrega/puntos-2-7-8-9.mjs --sin-firefox
node scripts/entrega/privacidad-y-alternativas.mjs
```

El primero registra nueve páginas en tres anchuras y dos motores; el segundo
usa aserciones para privacidad, borradores, selector y ausencia de WebGL.
Las peticiones a Google de esa prueba se interceptan y reciben HTML local.
