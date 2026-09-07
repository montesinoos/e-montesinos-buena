# Montesinos — preparación de entrega

Estado a 7 de septiembre de 2026: **candidata local, no aprobada para entregar ni publicar**.
Consultar AUDITORIA-ENTREGA.md y CHECKLIST-REFERENCIA.md.

## Arranque y compilación

Requisitos: Node 24 y npm; usar las versiones del lockfile.

```sh
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4400
```

La compilación genera las páginas y minifica las copias de CSS/JS en dist.
No modifica public/scrollcraft.css ni public/scrollcraft.js.
El directorio dist es desechable y se regenera; no editarlo manualmente.
No se ha ejecutado deploy.

## Dominio e indexación

SITE_URL utiliza como valor inicial https://www.themontesinos.com, heredado del
proyecto. Esto no confirma que el cliente haya elegido ese dominio para esta
versión. La URL workers.dev facilitada se trata provisionalmente como staging.
SITE_INDEXABLE sólo activa indexación si vale exactamente true.

Antes del lanzamiento, confirmar el dominio, configurar SITE_URL y
SITE_INDEXABLE=true en el entorno de compilación, recompilar y comprobar
canonical, sitemap, robots y meta robots sobre el resultado. No publicar la
compilación noindex como web definitiva. La 404 siempre permanece noindex.
robots permite rastrear para que se pueda leer noindex: no sustituirlo por
Disallow esperando que eso elimine páginas del índice.

## Bloqueos que requieren información

- Formulario: acordar receptor, proveedor o endpoint y textos de privacidad.
  Implementar validación de servidor, límites y protección frente a spam,
  probar éxito y error contra un receptor de pruebas y pedir autorización para
  la recepción real. Actualmente el envío está desactivado; no se borra el
  mensaje ni se afirma que se haya recibido.
- WhatsApp: contactoDirecto.whatsappTel está vacío hasta recibir un número
  autorizado. El componente no se muestra cuando está vacío.
- Londres: el teléfono anterior tenía un prefijo internacional inválido. Se
  conserva como comentario en los datos y se ha retirado de la vista pública.
- Legal: solicitar identidad del titular y textos aprobados; no hay páginas
  legales, ni se ha certificado su cumplimiento.
- Contenido: confirmar licencias/autorizaciones de fotos, marcas y acreditaciones
  vigentes. El mapa no atribuye el showroom a ciudades concretas; las coordenadas
  siguen siendo representativas de los países, no direcciones de obra.
- Dispositivos: comprobar Safari en iPhone y Chrome en Android reales,
  especialmente giro de puertas, teclado, gestos, orientación y barras dinámicas.

## Edición y conservación

- Datos: src/data/montesinos.js. Maderas: src/data/maderas.js.
- Páginas: src/pages. Identidad y estilos: public/tema.css.
- Fotografías: public/proyectos-web, con sus variantes móviles.
- Fuentes locales: public/fonts. Licencias OFL incluidas junto a cada fuente.
  Se conserva el repertorio latino descargado; comprobar otros alfabetos antes
  de ampliar idiomas.
- Las imágenes de la nave son ilustraciones generadas, no fotografías de obras.
  Sustituirlas cuando el cliente facilite originales conservando los encuadres
  documentados en README.md.

No existe CMS: las actualizaciones requieren editar, compilar, revisar y publicar
por una persona con acceso al repositorio y al hosting.

## Accesos, costes y recuperación

Pendientes de inventario con el cliente: titular de dominio/DNS, cuenta de
Cloudflare, correo receptor, renovaciones, costes, permisos del equipo y MFA.
No guardar credenciales en este documento ni en el repositorio.

Para recuperación, conservar repositorio con lockfile y activos, más una copia
de la versión publicada. Ensayar la reconstrucción en una carpeta separada con
npm ci y npm run build; después restaurar mediante el mecanismo de versiones del
hosting autorizado. Este ensayo y la recuperación en Cloudflare no se han hecho.
No se ha etiquetado una versión como entregada porque persisten bloqueos.

## Medición después del lanzamiento

No hay Analytics ni conversiones configuradas. Acordar una herramienta bajo la
cuenta del cliente antes de añadir etiquetas. Métricas propuestas: solicitudes
recibidas, clics en teléfono/WhatsApp, visitas a proyectos y contacto, errores de
envío y métricas reales LCP/INP/CLS cuando haya muestra suficiente. Evitar datos
personales en eventos; separar visitas internas y probar conversiones con datos
controlados. Lighthouse es laboratorio y no mide conversiones ni INP real.

Pendiente de acuerdo: duración de soporte, actualizaciones, copias, atención de
incidencias y qué ampliaciones se presupuestan como trabajo nuevo.
