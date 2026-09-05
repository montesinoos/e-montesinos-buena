/* ======================================================= EL MAPA DE MÓVIL ===
   La misma parada "Salida" que en escritorio enseña un globo 3D, aquí enseña un
   mapa plano en SVG. No es una decisión estética: el globo son globe.gl + three
   + la textura del planeta, y eso es medio megabyte y una GPU trabajando en un
   teléfono que probablemente esté en una línea móvil y con la batería a medias.
   Este mapa es SVG y JavaScript, sin WebGL, y pesa una fracción (las cifras, en
   PENDIENTES.md).

   Los doce países salen de `paisesGlobo`, la MISMA lista que alimenta el globo.
   Aquí se leen por su `iso`; allí por su lat/lng. Una lista, dos dibujos.
   ========================================================================== */

import svgMap from "svgmap";
// La hoja de la libreria, por su alias del `exports` del paquete (la ruta
// directa a dist/ no esta expuesta). Al ir dentro de este modulo, que se
// carga con import() dinamico, Vite la saca a su propio .css y el navegador
// solo la pide cuando el mapa hace falta: en escritorio no se descarga.
import "svgmap/style.min";
import { paisesGlobo } from "../data/montesinos.js";
import { crearFicha } from "./ficha.js";

// Del color de marca al hexadecimal que svgMap necesita. La librería pinta los
// países escribiendo `fill` en el SVG y no entiende `color-mix()` ni el resto
// de la paleta: se le da el valor ya resuelto, leído del propio :root, para que
// el mapa siga a la marca si algún día cambia el latón.
const token = (nombre, respaldo) =>
  getComputedStyle(document.documentElement).getPropertyValue(nombre).trim() || respaldo;

export function montarMapa(caja) {
  const porIso = new Map(paisesGlobo.map((p) => [p.iso, p]));

  // `values` es lo que le dice a svgMap qué países están marcados.
  //
  // La librería está pensada para pintar cifras —su ejemplo canónico es el PIB
  // per cápita— y exige una métrica: sin `applyData` apuntando a una entrada de
  // `data.data`, revienta buscando su `thresholdMax`. Aquí no hay ninguna cifra
  // que enseñar, así que se le da la mínima que la deja trabajar: un único
  // valor, el mismo (1) para los doce. Con `colorMin` y `colorMax` iguales, esa
  // escala de color de doce tramos colapsa en un solo tono de marca, que es lo
  // que se quiere: aquí un país solo está o no está.
  //
  // El número no llega a verse: la lista de valores del globito se apaga en el
  // CSS (.svgMap-tooltip-content-container), y en el globito queda solo el
  // nombre del país.
  const values = {};
  for (const iso of porIso.keys()) values[iso] = { obra: 1 };

  // Los nombres en español salen de nuestra propia lista (ver el comentario de
  // `paisesGlobo`). Solo los doce: son los únicos que tienen tooltip.
  const countryNames = {};
  for (const [iso, p] of porIso) countryNames[iso] = p.pais;

  // El radio de las chinchetas no puede vivir en el CSS: `r` está en unidades
  // del SVG, cuyo viewBox mide 2000 de ancho, así que el mismo número da un
  // punto distinto en un teléfono de 320 y en uno de 430. Se mide sobre el mapa
  // ya pintado (ver ajustarChinchetas) y se guarda aquí para que el estado
  // "elegido" pueda crecer sobre ese mismo número y no sobre otro inventado.
  const radio = { normal: 0, elegido: 0 };

  // La pista de arranque. Se declara aquí, antes de la ficha, porque quien la
  // retira es el propio cambio de obra: en cuanto entra la primera, sobra.
  let pista = null;

  const { mostrar, esElegido } = crearFicha({
    alCambiar: (previo, nuevo) => {
      // Ya ha tocado un país: la instrucción ha cumplido y se va para no
      // volver. No se esconde, se quita del documento: un texto invisible que
      // el lector de pantalla puede seguir encontrando es peor que no tenerlo.
      if (pista) { pista.remove(); pista = null; }

      for (const d of [previo, nuevo]) {
        if (!d) continue;
        const chincheta = caja.querySelector(`[data-pin-iso="${d.iso}"]`);
        if (!chincheta) continue;
        const on = esElegido(d);
        chincheta.classList.toggle("mapa-salida__pin--elegido", on);
        if (radio.normal) chincheta.setAttribute("r", on ? radio.elegido : radio.normal);
      }
    },
  });

  const mapa = new svgMap({
    targetElementID: caja.id,

    // Sin zoom ni paneo: el mapa es una imagen fija. En un móvil los controles
    // de zoom son fricción —se disparan al arrastrar para hacer scroll— y aquí
    // no llevan a ninguna parte.
    allowInteraction: false,
    mouseWheelZoomEnabled: false,
    dblClickZoomEnabled: false,
    showZoomReset: false,

    // Se parte del mundo entero y `encuadrar()` acerca al final de este módulo.
    // Se probó a dejarlo así, con el planeta completo, y no vale: sobre 320-400
    // px las doce chinchetas quedan del tamaño de una mota y las ocho de Europa
    // occidental se funden en una mancha. La parada tiene que poder tocarse.
    initialZoom: 1,

    // Ni banderas ni tabla de cifras: la bandera es una petición a un CDN de
    // terceros por país, y el resto de la web no pide nada fuera de casa.
    hideFlag: true,
    hideMissingData: true,
    noDataText: "",

    countryNames,

    colorMax: token("--sc-accent", "#A67C34"),
    colorMin: token("--sc-accent", "#A67C34"),
    colorNoData: token("--mapa-tierra", "#E4E1DB"),

    // Las chinchetas de los doce. El color va en el CSS de la web (ver
    // .mapa-salida__pin): aquí solo se declara cuáles llevan.
    staticPins: [...porIso.keys()],
    pinColor: token("--sc-ink", "#16171A"),
    pinStrokeColor: token("--sc-surface", "#FFFFFF"),
    pinStrokeWidth: 2,
    // Un valor de partida en unidades del SVG. El definitivo no se escribe: se
    // mide sobre el mapa ya pintado (ver ajustarChinchetas), que es la única
    // forma de que las chinchetas salgan del mismo tamaño en cualquier ancho.
    pinSize: 34,

    // El globito solo habla de los países con obra. svgMap no sabe callarse
    // por país, pero deja meter mano justo antes de montar el contenido: aquí
    // se marca el propio globito con si el país tiene obra o no, y el CSS
    // apaga el que no (ver .svgMap-tooltip[data-obra="no"]). Devolver null es
    // decirle "sigue tú": el contenido lo monta él, con su título, que para
    // los doce sale en español porque le pasamos `countryNames`.
    onGetTooltip: (globito, iso) => {
      globito.dataset.obra = porIso.has(iso) ? "si" : "no";
      return null;
    },

    onCountryClick: (iso) => {
      // Los países sin obra no reaccionan. `porIso` es la única autoridad.
      const d = porIso.get(iso);
      if (d) mostrar(d);
      return false; // no hay `link` que abrir
    },

    data: {
      data: { obra: { name: "Proyecto", format: "{0}" } },
      applyData: "obra",
      values,
    },
  });

  // ---- la ficha, debajo del mapa ----
  // En escritorio la ficha vive en el hueco de arriba a la izquierda, al lado
  // del globo. En un movil de 375px no hay hueco lateral que partir sin que la
  // foto quede del tamano de un sello, asi que se mueve DEBAJO del mapa: toco
  // un pais y la respuesta aparece donde ya estoy mirando.
  //
  // Se mueve el nodo que ya existe en vez de pintar otro: la ficha es una sola
  // en el documento, con un solo aria-live. Dos figuras con el mismo id serian
  // HTML invalido y el lector de pantalla leeria la que no toca.
  const cajonFicha = document.createElement("div");
  cajonFicha.className = "mapa-salida__ficha";

  // El hueco de la ficha no nace vacío: nace diciendo qué hacer con el mapa.
  // Un mapa con doce puntos no explica por sí solo que los puntos se tocan, y
  // el sitio ya resuelve esto igual un par de paradas más arriba —la cartela
  // del banco de maderas dice "Toca una muestra para ver cuál es"—. Misma voz,
  // mismo tipo de letra, mismo sitio: el hueco donde va a aparecer la
  // respuesta es el que pide la pregunta.
  pista = document.createElement("p");
  pista.className = "mapa-salida__pista";
  pista.textContent = "Toca un país marcado para ver su proyecto.";
  cajonFicha.append(pista);

  cajonFicha.append(document.getElementById("ficha-globo"));
  caja.append(cajonFicha);

  // ---- teclado ----
  // svgMap pinta los países como <path> dentro de un SVG: no son tabulables y
  // no responden a Enter. La web se sigue pudiendo abrir en un navegador de
  // escritorio estrecho, donde el mapa es lo que se ve y el ratón puede no
  // estar, así que los doce países marcados se hacen alcanzables: role de botón
  // y tabindex, con su nombre accesible en español, y Enter/Espacio abren la
  // misma ficha que el toque.
  //
  // Va después de construir el mapa porque hasta aquí el SVG no existe.
  for (const [iso, p] of porIso) {
    // svgMap le pone a cada país el id `<idDelContenedor>-map-country-<ISO>`.
    const pais = caja.querySelector(`#${caja.id}-map-country-${iso}`);
    if (!pais) continue;
    pais.setAttribute("role", "button");
    pais.setAttribute("tabindex", "0");
    pais.setAttribute("aria-label", `Ver el proyecto de ${p.ciudad}, ${p.pais}`);
    pais.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      mostrar(p);
    });
  }

  // ---- las chinchetas ----
  // Son <circle class="svgMap-pin" data-id="ES"> y viven en un grupo aparte del
  // país, así que el clic de la librería —que busca un `.svgMap-country` hacia
  // arriba desde el objetivo— no las ve. Se les pone el suyo, y no es un
  // remiendo: la chincheta ES el objetivo de verdad. Con el mundo entero sobre
  // 335 px, Luxemburgo mide menos de un píxel y no hay dedo que lo toque; su
  // chincheta sí.
  for (const pin of caja.querySelectorAll(".svgMap-pin")) {
    const iso = pin.getAttribute("data-id");
    if (!iso) continue;
    pin.setAttribute("data-pin-iso", iso);
    const d = porIso.get(iso);
    if (!d) continue;

    pin.addEventListener("click", () => mostrar(d));
  }

  // El punto visible conserva sus 12 px. En captura, cualquier toque dentro
  // de un círculo de 44 px elige el pin más cercano; así los objetivos pueden
  // solaparse en Europa sin que un círculo invisible tape arbitrariamente a
  // otro. Teclado y nombre accesible siguen viviendo en los países de arriba.
  const datoEn = (x, y) => {
    let cercano = null;
    let distancia = 22;
    for (const pin of caja.querySelectorAll(".svgMap-pin")) {
      const r = pin.getBoundingClientRect();
      const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
      if (d <= distancia) { cercano = pin; distancia = d; }
    }
    return cercano && porIso.get(cercano.getAttribute("data-pin-iso"));
  };

  caja.addEventListener("click", (e) => {
    if (e.target.closest && e.target.closest(".mapa-salida__zoom")) return;
    const d = datoEn(e.clientX, e.clientY);
    if (!d) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    mostrar(d);
  }, true);

  // svg-pan-zoom cancela touchstart/touchend incluso sin zoom ni paneo:
  // el navegador no llega a emitir click. Resolver el toque con Pointer Events
  // conserva el ratón y el teclado, sin confundir arrastres con selecciones.
  let toque = null;
  caja.addEventListener("pointerdown", (e) => {
    toque = e.isPrimary && e.pointerType !== "mouse" &&
      !e.target.closest(".mapa-salida__zoom")
      ? { id: e.pointerId, x: e.clientX, y: e.clientY } : null;
  });
  caja.addEventListener("pointermove", (e) => {
    if (toque && Math.hypot(e.clientX - toque.x, e.clientY - toque.y) > 6) toque = null;
  });
  caja.addEventListener("pointercancel", () => { toque = null; });
  caja.addEventListener("pointerup", (e) => {
    const inicio = toque;
    toque = null;
    if (!inicio || inicio.id !== e.pointerId ||
        Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y) > 6) return;
    const d = datoEn(e.clientX, e.clientY) ||
      porIso.get(e.target.closest(".svgMap-country")?.getAttribute("data-id"));
    if (d) mostrar(d);
  });

  // Qué se está mirando. `isos` a null es el encuadre de siempre, el de las
  // doce; con un conjunto dentro, el mapa se acerca solo sobre esas. Es un
  // objeto y no una variable suelta porque lo comparten el mando, el encuadre
  // y el observador de tamaño, y todos tienen que leer lo mismo.
  const vista = { isos: null, turno: 0 };

  // El encuadre y el tamaño de las chinchetas se hacen en cadena y CADA PASO
  // EN SU FOTOGRAMA. No es un capricho: svg-pan-zoom no escribe la matriz del
  // SVG al llamarlo, la encola en un requestAnimationFrame. Midiendo justo
  // después de acercar se leen las posiciones de ANTES de acercar, y el
  // centrado sale calculado sobre datos viejos —que es exactamente lo que
  // pasaba: el mapa quedaba acercado pero descentrado siempre lo mismo.
  encuadrarEnCadena(mapa, caja, radio, vista);

  // El mando de acercar se monta DESPUÉS del primer encuadre: para saber si
  // hay un grupo de países lo bastante apretado como para merecer su propio
  // acercamiento hay que ver antes dónde ha caído cada chincheta.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    montarMando(mapa, caja, radio, vista);
  }));

  // Y otra vez cuando el mapa cambia de tamaño: al girar el teléfono cambian
  // tanto el encuadre que hace falta como el tamaño en pantalla de un mismo
  // radio de SVG. La cadena es idempotente —parte de cero y vuelve a medir—
  // así que repetirla no acumula zoom, y respeta la vista que esté puesta.
  const marco = caja.querySelector(".svgMap-map-wrapper");
  if (marco && window.ResizeObserver) {
    let primera = true;
    new ResizeObserver(() => {
      if (primera) { primera = false; return; } // la observación inicial no cuenta
      encuadrarEnCadena(mapa, caja, radio, vista);
    }).observe(marco);
  }

  return mapa;
}

/* ------------------------------------------------------------- el mando ----
   Un botón para acercarse al grupo de países que quedan pegados, y volver.

   Por qué un botón y no pellizcar con dos dedos, que es lo que pediría el
   cuerpo: el mapa vive dentro de un recorrido que se mueve con el scroll. Un
   mapa que responde al arrastre se queda con el gesto de bajar por la página,
   y el visitante acaba atrapado dentro de un cuadro de 190 px sin saber por
   qué la web no baja. El botón no le quita el gesto a nadie, se ve, dice lo
   que hace y funciona con el teclado.

   Y por qué DOS estados y no un + y un − con muchos pasos: aquí no se está
   explorando un atlas, se está intentando tocar una chincheta concreta. Hay
   una posición general y hay un grupo apretado; todo lo demás es fricción.

   Qué países son ese grupo no se escribe a mano: se calcula midiendo cuáles
   caen cerca unos de otros (ver `grupoMasApretado`). Si un día Montesinos abre
   en Japón y en Corea, el mando se ofrecerá a acercar allí sin que nadie toque
   este archivo; y si los países se reparten por el mundo sin agruparse, el
   botón no llega a aparecer. */
function montarMando(mapa, caja, radio, vista) {
  const todas = [...caja.querySelectorAll(".svgMap-pin")];
  const grupo = grupoMasApretado(todas);
  // Sin grupo, o con un grupo que son todos, el botón no tendría nada que
  // hacer: mejor no ponerlo que ponerlo muerto.
  if (!grupo || grupo.length < 2 || grupo.length === todas.length) return;

  const isos = new Set(grupo.map((p) => p.getAttribute("data-pin-iso")));

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "mapa-salida__zoom";

  const escribir = () => {
    const cerca = vista.isos !== null;
    // El texto CAMBIA con el estado, no es un icono con dos significados: en
    // un mando de dos posiciones lo que hay que leer es qué pasa si lo toco.
    boton.textContent = cerca ? "Ver todo" : "Acercar";
    boton.setAttribute("aria-pressed", cerca ? "true" : "false");
    boton.setAttribute(
      "aria-label",
      cerca
        ? "Alejar el mapa y ver los doce países"
        : `Acercar el mapa sobre los ${grupo.length} países que quedan juntos`
    );
  };
  escribir();

  boton.addEventListener("click", () => {
    vista.isos = vista.isos ? null : isos;
    escribir();
    encuadrarEnCadena(mapa, caja, radio, vista);
  });

  caja.prepend(boton);
}

/* --------------------------------------------------- el grupo más junto ----
   Agrupa las chinchetas por cercanía en pantalla y devuelve la agrupación más
   numerosa. Es un enlace simple: dos chinchetas están en el mismo grupo si se
   tocan casi, y por transitividad arrastran a las demás —que es justo cómo se
   lee un racimo a ojo.

   El umbral no es un número de píxeles fijo, sino una fracción de lo que
   ocupan las doce: así vale igual en un teléfono de 320 que en uno de 430, y
   seguiría valiendo si mañana el mapa fuera el doble de grande. */
function grupoMasApretado(pins) {
  if (pins.length < 4) return null;

  const p = pins.map((pin) => {
    const r = pin.getBoundingClientRect();
    return { pin, x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });

  const xs = p.map((q) => q.x);
  const ys = p.map((q) => q.y);
  const diagonal = Math.hypot(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  if (!diagonal) return null;
  const umbral = diagonal * 0.15;

  // Conjuntos disjuntos, que es la forma corta de hacer el enlace simple.
  const padre = p.map((_, i) => i);
  const raiz = (i) => {
    while (padre[i] !== i) { padre[i] = padre[padre[i]]; i = padre[i]; }
    return i;
  };
  for (let i = 0; i < p.length; i++) {
    for (let j = i + 1; j < p.length; j++) {
      if (Math.hypot(p[i].x - p[j].x, p[i].y - p[j].y) <= umbral) padre[raiz(i)] = raiz(j);
    }
  }

  const grupos = new Map();
  p.forEach((q, i) => {
    const r = raiz(i);
    if (!grupos.has(r)) grupos.set(r, []);
    grupos.get(r).push(q.pin);
  });

  let mayor = null;
  for (const g of grupos.values()) if (!mayor || g.length > mayor.length) mayor = g;
  return mayor;
}

/* ---------------------------------------------------------- el encuadre ----
   El mapa no enseña el mundo entero: los doce países caben entre Portugal y el
   Golfo, y a escala de planeta sobre 335 px toda Europa occidental ocupa unos
   28 px. Los ocho marcadores de ahí se funden en una mancha que ni se lee ni se
   puede tocar. Se probó con el planeta completo y era exactamente eso.

   Sigue siendo un mapa estático —nadie puede moverlo, el zoom y el paneo están
   apagados—; lo que se elige es desde dónde se mira, igual que se elige el
   recorte de una fotografía.

   El encuadre no va a ojo con un zoom y un desplazamiento escritos a mano: se
   MIDE. Se leen las doce chinchetas ya pintadas, se calcula cuánto hay que
   acercarse para que su caja ocupe el frente, y se centra. Así, el día que
   entre un país nuevo en `paisesGlobo` —o que salga uno— el encuadre se
   recoloca solo en vez de dejar la chincheta nueva fuera de cuadro. */
async function encuadrarEnCadena(mapa, caja, radio, vista) {
  const fotograma = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  // Solo puede haber una cadena viva. La cadena tarda unos seis fotogramas en
  // recorrerse, y cada paso ACERCA SOBRE LO QUE HAY: si alguien toca el botón
  // dos veces seguidas —o gira el teléfono mientras se encuadra— arrancarían
  // dos, cada una midiendo lo que la otra acaba de mover, y los acercamientos
  // se multiplicarían hasta dejar el mapa perdido. Con esto la última que entra
  // se queda el turno y las anteriores se retiran en su siguiente parada. No
  // hace falta deshacer nada: la que sigue viva vuelve a medir y recoloca.
  const turno = ++vista.turno;
  const sigoMandando = () => turno === vista.turno;

  // El primer paso también espera un fotograma, y esto es lo que de verdad
  // serializa: `encuadrar` es síncrono, así que seis toques seguidos hacían
  // seis acercamientos ANTES de que el navegador repintara ni una vez —los seis
  // midiendo la misma foto vieja y multiplicándose entre sí—. Esperando aquí,
  // de esa ráfaga solo sobrevive el último toque, que es lo que el visitante
  // quiso decir.
  await fotograma();
  if (!sigoMandando()) return;

  // No se vuelve al mundo entero entre vista y vista. Se probó —un `reset` al
  // empezar— y funcionaba, pero dejaba ver el planeta durante tres o cuatro
  // fotogramas cada vez que se tocaba el botón: un parpadeo feo por nada. En
  // vez de eso, `encuadrar` mide dónde están las chinchetas AHORA y corrige lo
  // que falte, sea acercar o alejar. Como cada pasada se calcula sobre lo que
  // hay, repetirla no acumula: la segunda ya encuentra el trabajo hecho.
  encuadrar(mapa, caja, vista);   // ajustar sobre las chinchetas de la vista
  await fotograma();              // dejar que el SVG se repinte ya acercado
  if (!sigoMandando()) return;

  ajustarChinchetas(caja, radio); // ahora sí se sabe a qué tamaño salen
  await fotograma();
  if (!sigoMandando()) return;

  encuadrar(mapa, caja, vista);   // y centrar, con la caja de chinchetas definitiva
}

function encuadrar(mapa, caja, vista) {
  const pz = mapa.mapPanZoom;
  const marco = caja.querySelector(".svgMap-map-wrapper");
  if (!pz || !marco) return;

  // Las de la vista puesta: o las doce, o las del grupo que se ha acercado.
  const deLaVista = () => {
    const todas = [...caja.querySelectorAll(".svgMap-pin")];
    if (!vista || !vista.isos) return todas;
    return todas.filter((p) => vista.isos.has(p.getAttribute("data-pin-iso")));
  };

  const cajaDeChinchetas = () => {
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    for (const pin of deLaVista()) {
      const r = pin.getBoundingClientRect();
      x1 = Math.min(x1, r.left);  y1 = Math.min(y1, r.top);
      x2 = Math.max(x2, r.right); y2 = Math.max(y2, r.bottom);
    }
    return Number.isFinite(x1) ? { x1, y1, x2, y2, w: x2 - x1, h: y2 - y1 } : null;
  };

  const frente = marco.getBoundingClientRect();
  const antes = cajaDeChinchetas();
  if (!antes || !antes.w || !antes.h) return;

  // Que la mancha de países ocupe la mayor parte del cuadro, con aire alrededor
  // para que ninguna chincheta quede pegada al borde. Con techo: sin él, un
  // hipotético día con un solo país el mapa se acercaría hasta el absurdo.
  //
  // Y en la vista cercana se aprieta más: se le deja ocupar casi todo el cuadro
  // y se le sube el techo. El encargo ahí es justo ese, separar unas chinchetas
  // que de otro modo no se pueden tocar, así que el aire de cortesía sobra.
  const cerca = !!(vista && vista.isos);
  const techo = cerca ? 30 : 12;
  const cuanto = Math.min(
    (frente.width * (cerca ? 0.86 : 0.74)) / antes.w,
    (frente.height * (cerca ? 0.82 : 0.7)) / antes.h,
    techo
  );
  // En los dos sentidos: `cuanto` menor que uno es alejarse, que es lo que
  // hace falta al volver de la vista cercana. La banda muerta alrededor de 1
  // evita que las pasadas de afinado se peleen entre sí por medio píxel.
  if (cuanto < 0.98 || cuanto > 1.02) pz.zoomBy(cuanto);

  // Centrar DESPUÉS de acercarse y midiendo otra vez: el zoom es en torno al
  // centro del SVG, no al de las chinchetas, así que el desplazamiento que hace
  // falta solo se sabe con el mapa ya acercado.
  const despues = cajaDeChinchetas();
  if (!despues) return;
  pz.panBy({
    x: (frente.left + frente.width / 2) - (despues.x1 + despues.w / 2),
    y: (frente.top + frente.height / 2) - (despues.y1 + despues.h / 2),
  });
}

/* ------------------------------------------------------- las chinchetas ----
   `r` de un <circle> está en unidades del SVG, y el encuadre acerca el mapa
   varias veces: el mismo número da un punto de 3 px sin encuadrar y un borrón
   de 25 px con él. Y el factor exacto depende del encuadre, que a su vez
   depende de qué países haya y de lo ancha que sea la pantalla.

   Así que el radio no se escribe: se mide. Se pinta una chincheta, se ve a qué
   tamaño ha salido y se corrige la proporción para que las doce midan lo que
   tienen que medir. El resultado es el mismo punto en un teléfono de 320 y en
   uno de 430, y seguiría siéndolo con veinte países. */
function ajustarChinchetas(caja, radio) {
  const DIAMETRO = 12;        // px en pantalla
  const CRECE = 1.5;          // cuánto engorda la del proyecto abierto

  const primera = caja.querySelector(".svgMap-pin");
  if (!primera) return;
  const anchoAhora = primera.getBoundingClientRect().width;
  const rAhora = parseFloat(primera.getAttribute("r"));
  if (!anchoAhora || !rAhora) return;

  radio.normal = +(rAhora * (DIAMETRO / anchoAhora)).toFixed(2);
  radio.elegido = +(radio.normal * CRECE).toFixed(2);
  for (const pin of caja.querySelectorAll(".svgMap-pin")) {
    // La del proyecto abierto conserva su tamaño: esto también se ejecuta al
    // girar el teléfono, y ahí puede haber ya una elegida que no debe encoger.
    const elegida = pin.classList.contains("mapa-salida__pin--elegido");
    pin.setAttribute("r", elegida ? radio.elegido : radio.normal);
  }
}
