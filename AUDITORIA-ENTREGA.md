# Auditoría de entrega — Montesinos

Fecha: 7 de septiembre de 2026. Decisión inicial: **NO LISTA PARA ENTREGAR**.

Referencia completa: CHECKLIST-REFERENCIA.md. No se ha publicado ni enviado ningún formulario real.
Trabajo previo preservado: cambios en src/data/maderas.js y src/pages/contacto.astro; scripts y artefactos existentes sin sobrescribir.

## Actualización final de esta revisión: puntos 2, 7, 8 y 9

La numeración solicitada corresponde a la lista de preparación para primera
presentación, no a los ámbitos de la checklist. Datos legales aún no disponibles,
confirmado por el usuario. No se ha publicado.

| Punto | Estado | Prioridad | Componente | Evidencia y siguiente paso |
|---|---|---|---|---|
| 2: textos legales | Mejorar | Alta para lanzamiento | Aviso legal, privacidad, cookies, pie y formulario | Tres borradores enlazados, identificados y noindex; comprobados por navegador y aserciones. Completar LEGAL-PENDIENTE-CLIENTE.md con datos reales y revisión del titular. |
| 2: carga del mapa externo | OK | Alta | Cierre de inicio | privacidad-alternativas.json: cero peticiones a Google antes de acción, una tras pulsar, iframe eliminado al cerrar y foco devuelto. Google interceptado con respuesta local; no certifica su comportamiento externo. |
| 7: accesos y titularidad | Pendiente de verificar | Alta para entrega final | Dominio, DNS, Cloudflare y servicios | ACCESOS-CLIENTE.md documenta DNS observados y configuración; Wrangler sin autenticación. Esta evidencia amplía las filas 12.1, 12.3 y 12.4: falta confirmar responsables, permisos y renovaciones con el cliente. |
| 8: navegadores locales | OK | Alta | Nueve páginas, galería y recorrido | resultados.json: 54 vistas en Chromium 152 y WebKit 26.5, anchuras 390/768/1440, sin overflow ni excepciones JS ni incidencias axe detectadas. |
| 8: dispositivos reales | Pendiente de verificar | Alta para entrega final | iPhone/Safari y Android/Chrome | Emulación sobre Windows, no dispositivos físicos. Probar menú, recorrido, galería, contacto y giro en ambos dispositivos. Firefox bloqueado por msvcp140_1.dll; no se declara probado. |
| 9: correcciones de accesibilidad | OK | Alta | Selector de países, alternativa sin WebGL, foco, menú, movimiento reducido | privacidad-alternativas.json: selector y alternativa sin WebGL operativos, sin overflow a 844x390, 390x844 y 320x568. Capturas selector-paises.png y sin-webgl.png revisadas; resultados.json sin incidencias axe en vistas y estados analizados. |
| 9: validación asistiva completa | Pendiente de verificar | Alta para entrega final | Recorridos principales | Ejecutar con lector real y usuario; axe y las pruebas de teclado no acreditan accesibilidad completa ni todos los estados visuales. |

Evidencia de esta ampliación en `entrega-evidencias/revision-2-7-8-9/`.
Compilación de producción correcta (build.log); aviso de tamaño del paquete 3D
conservado. Pruebas contra compilación local en 127.0.0.1:4400, con preferencia
de movimiento reducido. No son mediciones de usuarios reales ni una nueva
medición de rendimiento. Se conserva la medición de laboratorio inicial.
`git diff --check` sin errores de espacios (avisos de conversión LF/CRLF).

**Decisión:** puede mostrarse como primera propuesta incompleta, explicando los
borradores, imágenes de referencia y servicios pendientes. **No está aprobada
para entrega definitiva o lanzamiento**: siguen faltando datos legales, correo,
WhatsApp confirmado, validaciones externas y cierre de los pendientes iniciales.

## Diagnóstico inicial

- Crítico: public/montesinos.js mostraba «Recibido» y borraba el formulario sin petición de red.
- Alto: contactoDirecto.whatsappTel contiene 34600000000, expresamente identificado como ejemplo.
- Alto: la ficha atribuye showroom-1.webp a doce capitales sin evidencia.
- Alto: faltan textos legales aprobados, canonical, sitemap y metadatos sociales; dominio final sin confirmar.
- Alto: teléfono londinense +07473029106 requiere confirmación; no se inventa sustituto.

## Comprobaciones de la checklist


### 1. Diseño y acabado visual

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 1.1 | Revisar escritorio, tablet y móvil con distintas anchuras, no solo presets. | OK | Alta | Seis páginas | barrido.json: 54 combinaciones, anchuras 320, 390, 600, 768, 859, 861, 1024, 1440 y 1920; sin overflow horizontal. Capturas revisadas a 390/768/1440. |
| 1.2 | Comprobar márgenes, padding, alineaciones, ritmo vertical, espacios vacíos y consistencia entre secciones. | OK | Media | Páginas y componentes principales | Revisión visual de capturas por tramos y resúmenes de las seis páginas a 390/768/1440. Ritmo, recortes y disposición conservados; formulario ahora avisa de indisponibilidad. |
| 1.3 | Verificar tipografías, tamaños, pesos, alturas de línea, contraste, colores, radios, sombras, iconos y estados hover/focus. | Pendiente de verificar | Media | Tipografía y contraste | Fuentes locales, licencias incluidas. Axe sin incidencias en vistas iniciales; no certifica contraste de cada fotograma sobre fotografía ni todos los hover. Revisar contraste dinámico con lector y usuario. |
| 1.4 | Confirmar que imágenes, vídeos, logos e ilustraciones tienen buena calidad, recorte correcto y proporción adecuada. | OK | Media | Páginas y componentes principales | Revisión visual de capturas por tramos y resúmenes de las seis páginas a 390/768/1440. Ritmo, recortes y disposición conservados; formulario ahora avisa de indisponibilidad. |
| 1.5 | Detectar saltos de layout, parpadeos, elementos cortados, solapamientos, scroll horizontal y componentes que cambian al cargar. | Mejorar | Media | Portada | CLS de laboratorio corregido de 0,202 a 0,001 dando altura explícita a la escena móvil. No se han comprobado todos los fotogramas en dispositivos reales. |
| 1.6 | Revisar cabecera, hero, navegación, CTAs, galerías, formularios y footer como elementos prioritarios. | OK | Media | Páginas y componentes principales | Revisión visual de capturas por tramos y resúmenes de las seis páginas a 390/768/1440. Ritmo, recortes y disposición conservados; formulario ahora avisa de indisponibilidad. |
| 1.7 | Comprobar que el diseño transmite el posicionamiento del negocio y no parece una plantilla genérica. | OK | Baja | Identidad visual | Inspección visual: se conserva portada de puertas, muestras de madera, paleta y tipografía originales; no se ha realizado rediseño. |

### 2. Responsive y dispositivos

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 2.1 | Probar en móvil pequeño, móvil grande, tablet, portátil y escritorio ancho. | OK | Alta | Seis páginas | barrido.json: 54 combinaciones, anchuras 320, 390, 600, 768, 859, 861, 1024, 1440 y 1920; sin overflow horizontal. Capturas revisadas a 390/768/1440. |
| 2.2 | Probar orientación vertical y horizontal cuando tenga sentido. | Pendiente de verificar | Media | Orientación | 600×360 incluido en barrido; vista corta y zoom CSS adicionales. Pendiente rotación física y barras dinámicas en iOS/Android. |
| 2.3 | Verificar menú móvil, submenús, botones, modales, carruseles, galerías, tablas, formularios y footer. | OK | Alta | Menús, visor y filtros | barrido.json y verificacion.json: menú abre/cierra, seis filtros con recuentos 20/7/3/3/5/2, visor cambia y cierra. No hay tablas, submenús, carruseles ni sliders independientes. |
| 2.4 | Comprobar que textos largos no desbordan y que botones y enlaces táctiles son fáciles de pulsar. | Pendiente de verificar | Alta | Objetivos táctiles y zoom | Sin overflow en barrido; corregido texto recortado en pantallas bajas. Los países cercanos del mapa requieren validación táctil real. Zoom probado por CSS, no equivalente a todas las implementaciones del zoom de navegador. |
| 2.5 | Revisar breakpoints intermedios manualmente arrastrando el viewport. | Pendiente de verificar | Media | Breakpoints | Probados tamaños a ambos lados de 860 y anchuras intermedias mediante Playwright. No se realizó arrastre manual continuo del viewport. |
| 2.6 | Comprobar que no aparecen barras de desplazamiento horizontales inesperadas. | OK | Alta | Seis páginas | barrido.json: 54 combinaciones, anchuras 320, 390, 600, 768, 859, 861, 1024, 1440 y 1920; sin overflow horizontal. Capturas revisadas a 390/768/1440. |
| 2.7 | Probar al menos Safari/iOS, Chrome/Android y un navegador de escritorio moderno si el proyecto lo permite. | Pendiente de verificar | Alta | Navegadores reales | Ampliado a Chromium 152 y WebKit 26.5 sobre Windows, nueve páginas y tres anchuras. Evidencia: revision-2-7-8-9/resultados.json. No equivale a Safari/iOS ni Chrome/Android reales; reservar prueba con dispositivos. |

### 3. Funcionalidad

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 3.1 | Hacer clic en todos los botones, enlaces, logo, navegación, CTAs y elementos interactivos. | Pendiente de verificar | Media | Todos los controles | Pruebas de controles principales, muestras, paradas, filtros y visor; enlaces enumerados y consultados por HTTP. No equivale a clic individual sobre cada foto y cada país ni activa llamadas. |
| 3.2 | Comprobar enlaces internos, externos, anclas, teléfono, email, WhatsApp, mapas y redes sociales. | Pendiente de verificar | Alta | Contacto y externos | extra.json: HTTP 200 para destinos internos, Maps y tres enlaces de prensa. Teléfonos no marcados, WhatsApp retirado por falta de número. Confirmar recepción/destinatarios. |
| 3.3 | Verificar que no existen enlaces con #, destinos provisionales, páginas 404 ni botones muertos. | Mejorar | Alta | Enlaces provisionales | Se retiraron WhatsApp ficticio y teléfono londinense inválido; sin href # vacío en enlaces enumerados. Rutas HTTP internas 200. Faltan datos reales para reponer las vías retiradas. |
| 3.4 | Probar formularios de principio a fin: validación, envío, mensaje de éxito, mensaje de error y recepción real. | Error | Crítica | Formulario de contacto | Antes simulaba éxito y borraba datos sin red. Ahora botón desactivado, aviso con teléfono y datos preservados. verificacion.json: cero POST. Falta endpoint, privacidad, éxito/error de servidor y recepción autorizada. |
| 3.5 | Comprobar estados de carga, errores de red, modales, acordeones, sliders, filtros, buscadores y menús. | Pendiente de verificar | Media | Errores y cargas diferidas | Mapa y globo cargan durante las paradas, filtros/visor funcionan. Falta simulación exhaustiva de fallo WebGL, descarga de mapa y red interrumpida. |
| 3.6 | Verificar que enlaces externos importantes abren donde corresponde y que no rompen la experiencia. | OK | Media | Prensa y Maps | Destinos de solo lectura HTTP 200; prensa con target blank y noopener noreferrer. No se enviaron mensajes ni formularios externos. |
| 3.7 | Revisar páginas de error y rutas inexistentes si el sitio tiene varias páginas. | OK | Media | 404 y /estudio | verificacion.json: ruta inventada responde 404 y /estudio llega a /taller. Página 404 inspeccionada en las nueve anchuras. |

### 4. Contenido y credibilidad

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 4.1 | Leer toda la web como si fuera la primera vez. | OK | Media | Contenido público | Leídos los textos de las cinco páginas, datos compartidos y estados interactivos; preservadas las correcciones previas de copy. No se añadieron datos comerciales supuestos. |
| 4.2 | Corregir ortografía, gramática, puntuación, mayúsculas, repeticiones y tono de voz. | OK | Media | Contenido público | Leídos los textos de las cinco páginas, datos compartidos y estados interactivos; preservadas las correcciones previas de copy. No se añadieron datos comerciales supuestos. |
| 4.3 | Eliminar lorem ipsum, textos provisionales, referencias internas y copy genérico de IA. | Mejorar | Alta | Contenido de referencia | Se eliminó número ficticio y falso éxito. Fichas muestran país y etiquetan showroom como referencia; ilustración del taller identificada. Confirmar ciudades/fotos reales y sustituir ilustraciones si se requiere. |
| 4.4 | Comprobar nombre comercial, servicios, precios si existen, teléfono, email, dirección, horarios y zonas de servicio. | Pendiente de verificar | Alta | Datos de negocio | Sabadell/Madrid conservan datos del proyecto; roles corregidos previamente por cliente prevalecen sobre web antigua. Londres retirado por prefijo inválido. Confirmar contactos y vigencia con cliente. |
| 4.5 | Verificar que fotos, proyectos, testimonios, cifras, premios, logos y acreditaciones sean correctos y autorizados. | Pendiente de verificar | Alta | Fotos, marcas y credenciales | Web oficial themontesinos.com consultada: historia y homologación publicadas. Esto no demuestra autorización de imágenes/logos ni vigencia de certificados; solicitar evidencia al cliente. |
| 4.6 | Comprobar que cada página tiene un objetivo claro y que el usuario entiende qué ofrece el negocio en pocos segundos. | OK | Media | Propuesta y objetivos | Lectura y revisión visual: mobiliario a medida, sectores, proceso y presupuesto son identificables; proyectos, taller, proceso y contacto tienen objetivo diferenciado. |
| 4.7 | Revisar consistencia entre mensajes de distintas páginas para evitar contradicciones. | Mejorar | Media | Coherencia | El mapa ya no atribuye obras a capitales. Quedan representaciones geográficas de referencia; confirmar antes de presentar ubicaciones como obras reales. |

### 5. Velocidad y rendimiento

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 5.1 | Ejecutar PageSpeed Insights o Lighthouse en móvil y escritorio. | OK | Alta | Portada compilada | Lighthouse 13.4.1 móvil y escritorio sobre Astro preview de dist. Informes JSON y condiciones en apartado de rendimiento; no son datos de usuarios. |
| 5.2 | Revisar Core Web Vitals y priorizar problemas reales de experiencia, especialmente LCP, INP y CLS. | Mejorar | Media | Core Web Vitals | LCP móvil aproximadamente 3,0 s, CLS 0,001; desktop LCP 1,3 s. INP real y percentiles de campo no disponibles. Medir tras lanzamiento; no se usa TBT como sustituto de INP. |
| 5.3 | Optimizar imágenes con dimensiones correctas, compresión y formatos modernos cuando proceda. | OK | Media | Imágenes | WebP y srcset existentes; añadidas variantes 280w de muestras de madera conservando originales 560w. Barrido no encuentra imágenes rotas. |
| 5.4 | Aplicar lazy loading a recursos no críticos sin perjudicar el contenido principal. | OK | Media | Recursos críticos/diferidos | Globo importado al avanzar; muestras/galería usan lazy. Priorizada nave inicial y rebajada prioridad de fondos posteriores; Lighthouse registra efecto sobre LCP. |
| 5.5 | Revisar fuentes, JavaScript, CSS, scripts de terceros, vídeos y widgets pesados. | Mejorar | Media | JS, CSS, fuentes y 3D | Minificación sólo en dist; fuentes locales con OFL. Continúa aviso de chunk 3D >500 kB, diferido. Rehacerlo excede un ajuste local y sigue en pendientes. |
| 5.6 | Comprobar caché, compresión, carga diferida y recursos bloqueantes cuando sea aplicable. | Pendiente de verificar | Media | Hosting | Preview usa gzip. workers.dev responde HTTPS 200, zstd y cache-control public max-age=0 must-revalidate para HTML. Falta validar políticas finales de todos los activos en dominio de entrega. |
| 5.7 | Evaluar la web también en una conexión móvil normal, no solo con fibra y un ordenador potente. | Pendiente de verificar | Media | Conexión móvil | Lighthouse usa simulación móvil con throttling documentado. No se probó una conexión móvil física. |

### 6. SEO y presencia en buscadores

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 6.1 | Comprobar title y meta description únicos y coherentes en las páginas importantes. | OK | Media | Cinco páginas | barrido.json/extra.json: title y descripción propios, un H1 por página, rutas descriptivas y enlazadas desde navegación compartida. H2/H3 revisados en plantillas. |
| 6.2 | Verificar un H1 principal claro y una jerarquía lógica de H2/H3. | OK | Media | Cinco páginas | barrido.json/extra.json: title y descripción propios, un H1 por página, rutas descriptivas y enlazadas desde navegación compartida. H2/H3 revisados en plantillas. |
| 6.3 | Revisar URLs limpias, descriptivas y consistentes. | OK | Media | Cinco páginas | barrido.json/extra.json: title y descripción propios, un H1 por página, rutas descriptivas y enlazadas desde navegación compartida. H2/H3 revisados en plantillas. |
| 6.4 | Comprobar textos alternativos de imágenes cuando aportan información. | Mejorar | Media | Alternativas de imágenes | Alt descriptivos en galería, decorativos vacíos, logo nombrado; corregida atribución falsa en ficha y taller. No se ha probado lectura completa con lector de pantalla. |
| 6.5 | Verificar canonical, sitemap.xml, robots.txt y ausencia de bloqueos accidentales de indexación. | Pendiente de verificar | Alta | Indexación | Canonical/sitemap/robots implementados y responden 200. Noindex por defecto; confirmar SITE_URL y activar SITE_INDEXABLE=true sólo al lanzar. No se verificó configuración pública final. |
| 6.6 | Comprobar favicon, datos Open Graph y vista previa al compartir por WhatsApp o redes. | Pendiente de verificar | Media | Compartición | Favicon existente y metadatos OG añadidos con logo propio. No se ha probado caché/vista previa real de WhatsApp o redes. |
| 6.7 | Revisar enlaces internos, textos ancla y páginas huérfanas. | OK | Media | Cinco páginas | barrido.json/extra.json: title y descripción propios, un H1 por página, rutas descriptivas y enlazadas desde navegación compartida. H2/H3 revisados en plantillas. |
| 6.8 | Para negocios locales, comprobar nombre, dirección, teléfono, zonas de servicio y señales locales coherentes. | Pendiente de verificar | Alta | Datos de negocio | Sabadell/Madrid conservan datos del proyecto; roles corregidos previamente por cliente prevalecen sobre web antigua. Londres retirado por prefijo inválido. Confirmar contactos y vigencia con cliente. |
| 6.9 | Verificar datos estructurados relevantes cuando aporten valor y estén implementados correctamente. | Mejorar | Media | Datos estructurados | No hay JSON-LD. Se difiere hasta confirmar identidad y contactos; añadir LocalBusiness únicamente con datos aprobados. |
| 6.10 | Confirmar que páginas de staging, pruebas o duplicadas no queden indexables. | Pendiente de verificar | Alta | Staging | Build local queda noindex. La URL pública no se ha actualizado por prohibición de publicar; confirmar protección del staging en el hosting. |

### 7. Accesibilidad

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 7.1 | Comprobar contraste suficiente entre texto y fondo. | Pendiente de verificar | Media | Tipografía y contraste | Fuentes locales, licencias incluidas. Axe sin incidencias en vistas iniciales; no certifica contraste de cada fotograma sobre fotografía ni todos los hover. Revisar contraste dinámico con lector y usuario. |
| 7.2 | Verificar navegación básica con teclado y que el foco sea visible. | OK | Alta | Teclado principal | Nombres accesibles añadidos al recorrido cuando se oculta texto; visor devuelve foco al botón de origen tras avanzar; Enter/flechas/Escape probados a 390/768/1440. No es auditoría completa de lector. |
| 7.3 | Comprobar labels y mensajes claros en formularios. | Mejorar | Alta | Formulario | Labels asociados, mensaje live y aviso de indisponibilidad. Falta validar mensajes y asociación de errores del formulario definitivo, con endpoint. |
| 7.4 | Revisar textos alternativos útiles en imágenes informativas y evitar alt redundante en imágenes decorativas. | Mejorar | Media | Alternativas de imágenes | Alt descriptivos en galería, decorativos vacíos, logo nombrado; corregida atribución falsa en ficha y taller. No se ha probado lectura completa con lector de pantalla. |
| 7.5 | Comprobar orden lógico de encabezados y contenido. | OK | Media | Semántica | H1 único por ruta, jerarquías de plantillas revisadas y umbral incluido como región nombrada. Axe final: cero incidencias en 18 vistas iniciales. |
| 7.6 | Verificar que botones y enlaces tengan nombres comprensibles y no dependan solo de iconos. | OK | Alta | Nombres accesibles | Corregidos cuatro botones del recorrido en anchura intermedia; controles del visor y menú etiquetados. Lighthouse accesibilidad 100 móvil/escritorio; axe sin incidencias en vistas ensayadas. |
| 7.7 | Comprobar tamaños táctiles razonables y que el zoom del navegador no rompa la interfaz. | Pendiente de verificar | Alta | Objetivos táctiles y zoom | Sin overflow en barrido; corregido texto recortado en pantallas bajas. Los países cercanos del mapa requieren validación táctil real. Zoom probado por CSS, no equivalente a todas las implementaciones del zoom de navegador. |
| 7.8 | Revisar que animaciones intensas o automáticas no dificulten el uso y respetar preferencias de movimiento reducido cuando aplique. | Mejorar | Media | Movimiento | Corregidas entradas semitransparentes y filtros que todavía animaban con reduce. Comparación en revision-2-7-8-9/antes-movimiento-reducido.json y resultados.json. Pendiente prueba de comodidad con usuario y lector. |

### 8. UX, conversión y negocio

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 8.1 | Confirmar que en pocos segundos se entiende qué hace la empresa, para quién y por qué elegirla. | OK | Media | Propuesta y objetivos | Lectura y revisión visual: mobiliario a medida, sectores, proceso y presupuesto son identificables; proyectos, taller, proceso y contacto tienen objetivo diferenciado. |
| 8.2 | Verificar que el CTA principal sea evidente y coherente con el objetivo comercial. | OK | Media | CTA | CTA persistente de presupuesto/contacto enlaza /contacto#nombre; extra.json verifica foco del campo con UTM. |
| 8.3 | Comprobar que pedir presupuesto, llamar, reservar, comprar o contactar requiere el mínimo esfuerzo razonable. | Error | Crítica | Conversión | Ruta hasta contacto funciona, pero no hay envío operativo. Teléfono es alternativa documentada; su recepción real no está probada. No aprobar entrega sin cierre del recorrido. |
| 8.4 | Revisar el recorrido completo desde landing hasta conversión. | Error | Crítica | Conversión | Ruta hasta contacto funciona, pero no hay envío operativo. Teléfono es alternativa documentada; su recepción real no está probada. No aprobar entrega sin cierre del recorrido. |
| 8.5 | Eliminar pasos, campos, mensajes o elementos que generen fricción innecesaria. | Mejorar | Media | Formulario | Aviso aparece antes de campos y evita prometer recepción. Completar conexión o acordar retirada del formulario; no hacer que el usuario rellene campos sin poder enviar en versión final. |
| 8.6 | Comprobar señales de confianza: trabajos reales, testimonios, garantías, proceso, datos de contacto y prueba social cuando exista. | Pendiente de verificar | Alta | Confianza | Galería y proceso conservados, imágenes de referencia identificadas. Solicitar autorizaciones y vigencia de acreditaciones; no inventar testimonios. |
| 8.7 | Revisar que los CTAs aparezcan en momentos lógicos sin resultar invasivos. | OK | Media | CTAs | Inspección visual de cabecera, cierre de proceso y pies. Retirado botón flotante ficticio que además se superponía al formulario. |
| 8.8 | Probar la web con una persona que no la haya visto y observar si entiende el negocio y sabe qué hacer a continuación. | Pendiente de verificar | Media | Prueba con persona nueva | No se realizó sesión con usuario externo. Organizar una tarea de pedir presupuesto sin instrucciones previas. |

### 9. Seguridad, privacidad y legal

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 9.1 | Confirmar HTTPS válido en todo el sitio y ausencia de contenido mixto. | Pendiente de verificar | Alta | HTTPS | Navegación real a workers.dev: HTTPS 200 sin error TLS. No se observan peticiones HTTP mixtas en pruebas locales; falta dominio final y redirección HTTP. |
| 9.2 | Revisar formularios contra spam, validación del lado cliente y servidor cuando corresponda, y tratamiento seguro de errores. | Error | Alta | Privacidad del formulario | Envío desactivado, sin datos enviados. No existe backend ni información legal aprobada; implementar validación, antispam y tratamiento documentado antes de habilitarlo. |
| 9.3 | Comprobar que no se exponen claves, tokens, credenciales, rutas internas ni información sensible en frontend o repositorio público. | Pendiente de verificar | Alta | Secretos | Patrones de alta confianza no encontrados en dist/src/public; .env está ignorado y no versionado. No se imprimieron secretos. No se auditó historia remota ni repositorio público completo. |
| 9.4 | Revisar dependencias y plugins desactualizados cuando el stack lo requiera. | OK | Alta | Dependencias | npm audit del lockfile: cero vulnerabilidades conocidas; esbuild añadido como dependencia explícita de build. No equivale a garantía de ausencia de fallos. |
| 9.5 | Verificar aviso legal, política de privacidad y política de cookies cuando sean aplicables. | Mejorar | Alta | Textos legales | Añadidos tres borradores identificados, enlazados y noindex. El usuario confirma que todavía no tiene datos del titular; completarlos y validar antes de lanzamiento. Ver LEGAL-PENDIENTE-CLIENTE.md. |
| 9.6 | Si existen cookies o tecnologías no esenciales, comprobar que el consentimiento funciona antes de cargarlas cuando corresponda. | Pendiente de verificar | Alta | Mapa de Google | Rectificación de la revisión inicial: el cierre sí tenía un iframe. Ahora se crea sólo al pulsar Cargar mapa; prueba interceptada confirma cero peticiones antes y una después, eliminación al cerrar. Falta evaluar proveedor/configuración final; no certifica consentimiento legal completo. |
| 9.7 | Revisar integraciones de Analytics, Maps, YouTube, Meta Pixel, chat y terceros desde el punto de vista de privacidad. | Mejorar | Media | Terceros | Fuentes locales, mapa de Google con carga explícita y cierre, enlaces de prensa. La revisión inicial sólo había cubierto las primeras vistas y omitió el iframe del cierre. Falta revisión final del tratamiento externo y alojamiento. |
| 9.8 | Comprobar que formularios informan correctamente sobre el tratamiento de datos cuando proceda. | Error | Alta | Privacidad del formulario | Envío desactivado, sin datos enviados. No existe backend ni información legal aprobada; implementar validación, antispam y tratamiento documentado antes de habilitarlo. |

### 10. Analítica y medición

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 10.1 | Verificar que la propiedad de Analytics, Search Console u otras herramientas pertenece a la cuenta adecuada. | Pendiente de verificar | Alta | Cuentas | No se dispone de evidencia de propiedad de Analytics/Search Console. Pedir inventario al cliente. |
| 10.2 | Comprobar que las etiquetas no estén duplicadas y que no registren visitas internas de pruebas de forma confusa. | No aplica | Media | Etiquetas | No hay integración analítica en el código revisado; no existen etiquetas duplicadas que validar. Reevaluar si se instala. |
| 10.3 | Definir y verificar eventos importantes: envío de formulario, clic en teléfono, WhatsApp, reserva, compra u otros objetivos. | Pendiente de verificar | Media | Conversiones | No hay medición implementada ni receptor de formulario. Acordar herramienta, eventos y cuenta, y probar con datos controlados. |
| 10.4 | Comprobar que las conversiones se registran realmente con una prueba controlada. | Pendiente de verificar | Media | Conversiones | No hay medición implementada ni receptor de formulario. Acordar herramienta, eventos y cuenta, y probar con datos controlados. |
| 10.5 | Revisar que parámetros UTM y campañas no rompan la navegación. | OK | Media | Campañas | extra.json: /contacto?utm_source=auditoria&utm_medium=local#nombre carga y enfoca el campo. |
| 10.6 | Documentar qué métricas debería mirar el cliente después del lanzamiento. | OK | Baja | Documentación | ENTREGA-Y-MANTENIMIENTO.md propone consultas recibidas, clics, páginas de conversión y métricas de campo, sin afirmar que se estén recogiendo. |

### 11. Calidad técnica y compatibilidad

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 11.1 | Revisar consola del navegador y corregir errores JavaScript relevantes. | OK | Alta | Navegador | verificacion.json: sin excepciones JS ni recursos >=400 durante recorridos locales. Barrido final sin peticiones fallidas. Sólo se consideran rutas y estados ensayados. |
| 11.2 | Comprobar Network para detectar recursos 404, peticiones fallidas, redirecciones innecesarias o archivos excesivamente pesados. | OK | Alta | Navegador | verificacion.json: sin excepciones JS ni recursos >=400 durante recorridos locales. Barrido final sin peticiones fallidas. Sólo se consideran rutas y estados ensayados. |
| 11.3 | Validar que no existan rutas rotas, imports fallidos o variables de entorno incorrectas en producción. | OK | Alta | Compilación y rutas locales | npm run build completo, minificación incluida; páginas y activos cargan en preview. Variables de lanzamiento aún pendientes de configurar externamente. |
| 11.4 | Comprobar dominio canónico, redirecciones HTTP a HTTPS y variantes www/no-www según la configuración elegida. | Pendiente de verificar | Alta | Dominio | Dominio heredado www.themontesinos.com y URL workers.dev facilitada. Confirmar canónico y probar HTTP→HTTPS/www en destino; no se cambiaron DNS. |
| 11.5 | Verificar comportamiento con caché limpia y sesión privada. | OK | Media | Sesión limpia | Contextos nuevos aislados de Playwright por anchura y Lighthouse con limpieza de almacenamiento; no se reutilizó sesión del usuario. |
| 11.6 | Comprobar que staging, claves de prueba, banners de desarrollo y mensajes debug han sido eliminados. | Pendiente de verificar | Alta | Lanzamiento | Build no incluye toolbar de desarrollo; referencias públicas engañosas corregidas. Sigue staging noindex y faltan datos finales; no se ha publicado ni certificado producción. |
| 11.7 | Revisar compatibilidad con navegadores objetivo y degradación razonable si alguna función avanzada no está soportada. | Pendiente de verificar | Alta | Compatibilidad | Probados Chromium y WebKit Windows. Alternativa sin WebGL implementada y comprobada con contexto gráfico simulado como no disponible: privacidad-alternativas.json y sin-webgl.png. Sin JS se ve umbral y CTA; recorrido requiere JS. Safari/Android reales pendientes. |

### 12. Entrega profesional y mantenimiento

| ID | Comprobación | Estado | Prioridad | Página/componente | Evidencia y solución/siguiente paso |
|---|---|---|---|---|---|
| 12.1 | Confirmar dominio, DNS, hosting, SSL, correos y renovaciones. | Pendiente de verificar | Alta | Titularidad y servicios | No hay acceso/evidencia de DNS, renovaciones, correos ni cuentas de cliente. Solicitar inventario sin copiar credenciales al repositorio. |
| 12.2 | Verificar copias de seguridad y saber cómo restaurar la web. | Pendiente de verificar | Alta | Recuperación | Documentado procedimiento propuesto de reconstrucción y restauración. No se ensayó restauración ni respaldo remoto. |
| 12.3 | Entregar o documentar accesos de CMS, hosting, dominio, analítica y servicios externos según lo acordado. | Pendiente de verificar | Alta | Titularidad y servicios | No hay acceso/evidencia de DNS, renovaciones, correos ni cuentas de cliente. Solicitar inventario sin copiar credenciales al repositorio. |
| 12.4 | Evitar dependencias críticas de cuentas personales del desarrollador cuando el cliente debería ser propietario. | Pendiente de verificar | Alta | Titularidad y servicios | No hay acceso/evidencia de DNS, renovaciones, correos ni cuentas de cliente. Solicitar inventario sin copiar credenciales al repositorio. |
| 12.5 | Documentar licencias, plugins, servicios de pago, fechas de renovación y costes recurrentes. | Pendiente de verificar | Media | Licencias y costes | Fuentes OFL archivadas; faltan permisos de fotos/logos y costes de hosting/dominio/servicios. Completar inventario con cliente. |
| 12.6 | Confirmar que el cliente sabe cómo actualizar el contenido que deba gestionar. | Pendiente de verificar | Media | Edición por cliente | ENTREGA-Y-MANTENIMIENTO.md identifica archivos y flujo; no hay CMS ni se ha formado al cliente. |
| 12.7 | Guardar una copia final estable y etiquetar la versión entregada. | Pendiente de verificar | Alta | Versión final | Resultado local conservado con evidencias. No se etiqueta como entrega por bloqueos críticos/altos; aprobar, generar copia final y etiquetar sólo después. |
| 12.8 | Definir qué incluye el mantenimiento posterior y qué se considera trabajo nuevo. | Pendiente de verificar | Media | Mantenimiento | Documento de mantenimiento identifica alcance a acordar; no se ha inventado un contrato ni compromisos de soporte. |


## Resultado final y evidencias

**NO LISTA PARA ENTREGAR.** Se han aplicado correcciones locales, pero siguen abiertos el envío real, textos legales y verificaciones esenciales. No hay aceptación explícita de altos ni se ha publicado.

### Cambios realizados

- Formulario: eliminado falso éxito y borrado, desactivado envío y añadida alternativa telefónica.
- Retirados WhatsApp ficticio y teléfono londinense inválido; datos originales conservados como referencia interna.
- Fichas de países y taller distinguen imágenes de referencia de obras identificadas.
- Nombres accesibles del recorrido, región del umbral y foco del visor corregidos.
- Altura móvil estable y texto desplazable en pantallas muy bajas.
- Fuentes locales con licencias, imágenes de madera 280w y minificación de las copias de producción; prioridad de imágenes iniciales ajustada.
- Canonical, OG, robots y sitemap con control explícito de indexación.

### Pruebas

- Compilación npm run build completa, incluyendo minificación. Ver entrega-evidencias/build-final.log. El aviso de chunk 3D grande sigue documentado, con carga diferida.
- Barrido de seis páginas × nueve anchuras: 54 vistas, sin overflow horizontal, imágenes rotas, excepciones JS ni peticiones fallidas registradas. Barrido con movimiento reducido; no equivale a probar todos los fotogramas.
- Recorrido animado de las cuatro paradas y muestras, filtros (20/7/3/3/5/2), visor con flechas/Escape y foco al origen, menú y formulario local a 390/768/1440. Axe: cero incidencias en 18 vistas iniciales; no se extiende a todos los estados del mapa.
- Cierre dirigido: selección de país por teclado, foto cargada y texto de referencia, navegación mediante clic en menú/logo, envío desactivado y enlaces ficticios ausentes, consola sin warnings/errores durante esos recorridos.
- HTTP: rutas internas y enlaces de prensa/Maps respondieron 200; ruta inventada 404; /estudio llega a /taller. No se activaron llamadas ni WhatsApp.
- UTM y ancla conservan destino y foco. Prueba de zoom mediante CSS y viewport bajo; no equivalente a probar todos los zoom de navegador. Sin JavaScript se ve portada/CTA; funcionalidad interactiva depende de JavaScript.
- npm audit: cero vulnerabilidades conocidas en lockfile; revisión de patrones de secretos sin coincidencias en frontend y fuentes. No es auditoría de seguridad exhaustiva.
- HTTPS público workers.dev accesible desde navegador: 200, compresión zstd. La web remota sigue sin estas correcciones porque no se publicó.

### Rendimiento: laboratorio sobre dist

Lighthouse 13.4.1, Edge/Chromium 152 headless en Windows, Node 24.19.0, Astro preview http://127.0.0.1:4400. Fecha de informe móvil: 2026-09-07T13:36:57.248Z. Sesiones limpias; recursos locales servidos por preview, sin CDN real. Fuentes locales. No son datos de usuarios ni una medición de INP.

| Perfil | Rendimiento | Accesibilidad automática | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Móvil | 94 | 100 | 100 | 69 | 3.0 s | 0.001 | 20 ms |
| Escritorio | 97 | 100 | 100 | 69 | 1.3 s | 0.001 | 0 ms |

Móvil: 412×823, DPR 1,75, simulación de RTT 150 ms y 1638,4 Kbit/s, CPU ×4. Escritorio: 1350×940, DPR 1, RTT 40 ms, 10240 Kbit/s, CPU ×1. En repeticiones finales móvil osciló 94–95, LCP 2,9–3,0 s; escritorio 97. No se ha calculado una mediana estadística. El informe previo tenía CLS 0,202 y LCP 4,4 s; comparación orientativa de ejecuciones individuales, no ensayo controlado de campo.

SEO 69 se debe en parte al noindex deliberado y al dominio canónico distinto del localhost medido: no debe interpretarse como autorización para indexar staging. LCP móvil aún admite mejora (objetivo orientativo 2,5 s).

### Bloqueadores y siguiente paso concreto

1. **Crítico: conversión.** Facilitar endpoint/proveedor, receptor de pruebas y textos de privacidad; conectar backend y probar validación, éxito, error, antispam y recepción real con autorización.
2. **Alto: legal y datos.** Facilitar identidad/textos aprobados, contactos y permisos de fotos/logos/credenciales. No se certifica cumplimiento ni titularidad.
3. **Alto: dominio y staging.** Confirmar SITE_URL, propiedad de cuentas y si workers.dev es staging; configurar indexación sólo para lanzamiento, validar DNS/SSL/redirecciones y previews sociales.
4. **Alto: validaciones esenciales.** iPhone/Safari y Android/Chrome reales, objetivos táctiles, lector de pantalla, restauración y accesos. Organizar sesión y registrar resultados.
5. **Medio: cierre profesional.** Prueba con persona nueva, analítica y eventos, costes/licencias y alcance de mantenimiento. Detallado en ENTREGA-Y-MANTENIMIENTO.md.

### Archivos de evidencia y alcance

Los JSON, capturas seleccionadas y hash SHA-256 de cada archivo compilado se conservan en entrega-evidencias/. Los barridos y capturas completos permanecen en lab/entrega/ (ignorado por Git). Las capturas resumen muestran distintas posiciones de scroll; los cortes en sus bordes corresponden a los límites del viewport, no a un collage de página completa.

Los cambios previos en maderas.js y el copy de contacto se conservaron. No se creó commit ni etiqueta de versión entregada. El manifiesto identifica una candidata local y no implica aprobación.
