/* ============================================================================
   Montesinos — movimiento firma y cableado de página.

   EL UMBRAL. Dos paneles DOM giran sobre sus cantos exteriores, que es donde
   están las bisagras en la foto real. Detrás no hay baldas: hay una nave. El
   hueco crece hasta llenar la pantalla mientras la nave se queda quieta, así
   que no es la cámara la que avanza, es la abertura la que se agranda. Ese es
   el truco de "más grande por dentro".

   EL CIERRE. Al final las puertas vuelven a cerrarse por delante, y en su cara
   interior está grabado el contacto. Como el ebanista que firma el mueble donde
   nadie mira.

   El motor (scrollcraft.js) no se toca. Esto solo lee scrollY.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var clamp01 = function (v) { return clamp(v, 0, 1); };
  var suave = function (x) { x = clamp01(x); return x * x * (3 - 2 * x); };
  // Arranca despacio y acelera: una puerta pesada no sale disparada.
  var pesada = function (x) { return x * x * (3 - 2 * x); };

  var sc = window.ScrollCraft ? window.ScrollCraft.mount(document) : null;

  /* ------------------------------------------------------------ el umbral */
  var umbral   = document.getElementById('umbral');
  var pistaUm  = document.getElementById('pista-umbral');
  var sala     = umbral && umbral.querySelector('.umbral__sala');
  var hueco    = umbral && umbral.querySelector('.umbral__hueco');
  var huecoImg = hueco && hueco.querySelector('img');
  var pIzq     = umbral && umbral.querySelector('.puerta--izq');
  var pDer     = umbral && umbral.querySelector('.puerta--der');
  var luzIzq   = pIzq && pIzq.querySelector('.puerta__luz');
  var luzDer   = pDer && pDer.querySelector('.puerta__luz');
  var copiaUm  = umbral && umbral.querySelector('.umbral__copia');

  var ANG = 88;       // tope: pasado 90 se ve la cara trasera y queda oculta
  var ZOOM = 2.35;    // se recalcula según lo que mida la abertura en pantalla

  // La abertura mide distinto en cada pantalla, así que el zoom no puede ser
  // un número fijo: se deduce de cuánto tiene que crecer el hueco para
  // tragarse el viewport. En vertical hace falta bastante más que en apaisado.
  function calcularZoom() {
    if (!hueco) return;
    var prev = hueco.style.transform;
    hueco.style.transform = 'none';
    var r = hueco.getBoundingClientRect();
    hueco.style.transform = prev;
    if (r.width < 4 || r.height < 4) return;
    ZOOM = clamp(Math.max(innerWidth / r.width, innerHeight / r.height) * 1.06, 1.4, 7);
  }

  function pintarUmbral() {
    if (!umbral || !pistaUm) return;
    // Sobre la pista COMPLETA, no sobre pista menos viewport. Con el descuento,
    // el umbral acababa una altura de pantalla ANTES de que el mundo empezara,
    // y esa altura quedaba como scroll muerto con la nave sin una palabra.
    var alto = Math.max(pistaUm.offsetHeight, 1);
    var p = clamp01((scrollY - pistaUm.offsetTop) / alto);

    if (p >= 1) { if (!umbral.hidden) umbral.hidden = true; return; }
    if (umbral.hidden) umbral.hidden = false;

    // 1. Espera. 2. Las hojas giran. 3. La abertura se traga la pantalla.
    var giro  = pesada(clamp01((p - 0.06) / 0.40));
    var zoom  = suave(clamp01((p - 0.34) / 0.54));
    var apaga = suave(clamp01((p - 0.84) / 0.16));

    var a = giro * ANG;
    if (pIzq) pIzq.style.transform = 'rotateY(' + (-a).toFixed(2) + 'deg)';
    if (pDer) pDer.style.transform = 'rotateY(' + a.toFixed(2) + 'deg)';
    // La cara de la hoja se va quedando a contraluz según se abre.
    if (luzIzq) luzIzq.style.opacity = (giro * 0.85).toFixed(3);
    if (luzDer) luzDer.style.opacity = (giro * 0.85).toFixed(3);

    var esc = 1 + zoom * (ZOOM - 1);
    if (hueco) hueco.style.transform = 'scale(' + esc.toFixed(4) + ')';
    // La nave NO se mueve: se contraescala para quedar clavada a la pantalla.
    // Por eso parece que se abre un hueco sobre un sitio que ya estaba ahí.
    if (huecoImg) huecoImg.style.transform = 'translate(-50%,-50%) scale(' + (1 / esc).toFixed(4) + ')';
    if (sala) {
      sala.style.transform = 'scale(' + (1 + zoom * 0.5).toFixed(4) + ')';
      sala.style.opacity = (1 - zoom * 0.55).toFixed(3);
    }
    if (pIzq) pIzq.style.opacity = (1 - apaga).toFixed(3);
    if (pDer) pDer.style.opacity = (1 - apaga).toFixed(3);
    umbral.style.opacity = (1 - apaga).toFixed(3);

    if (copiaUm) {
      var v = 1 - suave(clamp01((p - 0.05) / 0.22));
      copiaUm.style.opacity = v.toFixed(3);
      copiaUm.style.transform = 'translate3d(0,' + ((1 - v) * -2).toFixed(2) + 'vh,0)';
    }
  }

  /* ------------------------------------------------------------- el cierre */
  var cierre  = document.getElementById('cierre');
  var pistaCi = document.getElementById('pista-cierre');
  var hIzq = cierre && cierre.querySelector('.hoja--izq');
  var hDer = cierre && cierre.querySelector('.hoja--der');

  function pintarCierre() {
    if (!cierre || !pistaCi) return;
    var alto = Math.max(pistaCi.offsetHeight - innerHeight, 1);
    var p = clamp01((scrollY - pistaCi.offsetTop) / alto);

    if (p <= 0) { if (!cierre.hidden) cierre.hidden = true; return; }
    if (cierre.hidden) cierre.hidden = false;

    // De abiertas de par en par a cerradas del todo.
    var cerrar = suave(clamp01(p / 0.82));
    var a = (1 - cerrar) * ANG;
    if (hIzq) hIzq.style.transform = 'rotateY(' + (-a).toFixed(2) + 'deg)';
    if (hDer) hDer.style.transform = 'rotateY(' + a.toFixed(2) + 'deg)';
  }

  /* ------------------------------------------------- el mapa de la nave --
     La gramática de mundo continuo pide que el nav sea un mapa y que se pueda
     saltar. El motor publica el waypoint; el dibujo es de la página.
  */
  // Hay DOS mapas en la página y ninguno sabe del otro: el de la barra de
  // arriba (escritorio) y la barra del recorrido de abajo (móvil). Solo uno se
  // ve a la vez, pero los dos se mantienen al día: si se actualizara solo el
  // visible habría que preguntar por el ancho aquí dentro, y girar el teléfono
  // dejaría al otro marcando la parada equivocada. Se recorren todas las
  // listas [data-mapa] y se agrupan sus botones por índice de parada.
  var listas = [].slice.call(document.querySelectorAll('[data-mapa]'));
  var paradas = [];   // paradas[i] = todos los botones de la parada i
  listas.forEach(function (l) {
    [].slice.call(l.querySelectorAll('button')).forEach(function (b, i) {
      (paradas[i] || (paradas[i] = [])).push(b);
    });
  });
  var mundo = document.querySelector('[data-sc-mode="worldflight"]');
  var tramos = mundo ? [].slice.call(mundo.querySelectorAll('[data-sc-segment]')) : [];

  var pesoTotal = 0;
  for (var wi = 0; wi < tramos.length; wi++) {
    pesoTotal += parseFloat(tramos[wi].getAttribute('data-sc-w')) || 1.3;
  }

  // La altura de pantalla con la que MIDE EL MOTOR, no la de ahora mismo.
  //
  // En un teléfono `innerHeight` cambia sola: la barra del navegador se
  // esconde al bajar y reaparece al subir, y ahí se van entre 60 y 90 px. El
  // motor fija la pista de scroll una vez, en su layout, con la altura que
  // había entonces; si el salto se calcula con la de ahora, las dos cuentas
  // usan reglas distintas y el aterrizaje se corre. La pista mide
  // (peso total + 1) alturas, así que dividiendo se recupera la suya exacta.
  var espaciador = mundo && (mundo.querySelector('[data-sc-spacer]') || mundo.querySelector('.sc-world__spacer'));
  function alturaMotor() {
    if (espaciador) {
      var h = espaciador.getBoundingClientRect().height / (pesoTotal + 1);
      if (h > 100) return h;
    }
    return innerHeight;
  }

  /* Dónde para cada botón.
     ---------------------------------------------------------------------
     La versión corta: donde el texto de esa parada se lee ENTERO.

     Antes cada tramo declaraba a mano en qué punto de sí mismo se paraba
     (data-sc-parada, 0.34 por defecto). El problema de un número a mano es que
     no sabe nada del texto: la copia de cada parada tiene su propia ventana,
     con su entrada y su salida en degradado, y basta con que alguien retoque
     una de esas ventanas para que el salto caiga en mitad del fundido. Medido
     antes de tocar nada, con las ventanas que hay hoy:

         NAVE      435 px dentro de la meseta   bien
         MATERIAL  215 px dentro                bien
         1:1        43 px dentro                al filo
         SALIDA     -1 px                       FUERA: se aterrizaba con el
                                                texto todavía entrando

     Así que el destino ya no se declara: se deduce. Se leen las ventanas de
     copia —los mismos atributos que lee el motor, con sus mismas reglas— se
     calcula la MESETA de cada una (el tramo en el que el texto está a plena
     opacidad, ni entrando ni saliendo) y se aterriza un cuarto dentro de ella.
     Un cuarto y no la mitad: así queda margen de sobra con el borde de entrada
     y, aun así, la mayor parte del tramo por delante para seguir bajando.

     Lo bueno de deducirlo es que ya no se puede desincronizar: mueve mañana
     una ventana en el HTML y el botón te sigue. */
  function mesetas() {
    if (!mundo) return [];
    var w0 = tramos.length ? (parseFloat(tramos[0].getAttribute('data-sc-w')) || 1.3) : 1;
    var ultimo = tramos.length ? tramos[tramos.length - 1] : null;
    var wN = ultimo ? (parseFloat(ultimo.getAttribute('data-sc-w')) || 1.3) : 1;

    return [].slice.call(mundo.querySelectorAll('[data-sc-copy]')).map(function (c) {
      var spec = (c.getAttribute('data-sc-window') || '').trim();
      var from = 0, to = 1, rIn = 0.3, rOut = 0.3, n;
      // Las tres formas que entiende el motor. Aquí no se inventa ninguna
      // regla: es su misma lectura, para que no puedan discrepar.
      if (spec === 'hero') {
        from = 0; to = (0.62 * w0) / pesoTotal; rIn = 0; rOut = 0.65;
      } else if (spec === 'finale') {
        from = (pesoTotal - wN + 0.4 * wN) / pesoTotal; to = 1; rIn = 0.55; rOut = 0;
      } else {
        n = spec.split(/\s+/).map(parseFloat);
        from = isNaN(n[0]) ? 0 : clamp01(n[0]);
        to = (n.length > 1 && !isNaN(n[1])) ? clamp01(n[1]) : clamp01(from + 0.18);
        if (n.length > 2 && !isNaN(n[2])) rIn = clamp01(n[2]);
        if (n.length > 3 && !isNaN(n[3])) rOut = clamp01(n[3]);
      }
      if (to <= from) to = clamp01(from + 0.05);
      var ancho = to - from;
      return { a: from + ancho * rIn, b: to - ancho * rOut };
    });
  }

  // La meseta que más se solapa con este tramo, recortada a él. Se elige por
  // solape y no por orden en el documento: así un tramo sin copia propia no se
  // queda con la del vecino, y reordenar el HTML no rompe nada.
  function mesetaDe(desde, hasta) {
    var lista = mesetas(), mejor = null, mejorSolape = 0;
    for (var i = 0; i < lista.length; i++) {
      var a = Math.max(lista[i].a, desde);
      var b = Math.min(lista[i].b, hasta);
      if (b - a > mejorSolape) { mejorSolape = b - a; mejor = { a: a, b: b }; }
    }
    return mejor;
  }

  function scrollDeTramo(i) {
    if (!mundo || !tramos.length) return 0;
    var vh = alturaMotor();
    var top = mundo.getBoundingClientRect().top + scrollY;

    var c0 = 0;
    for (var k = 0; k < i; k++) c0 += parseFloat(tramos[k].getAttribute('data-sc-w')) || 1.3;
    var w = parseFloat(tramos[i].getAttribute('data-sc-w')) || 1.3;

    var meseta = mesetaDe(c0 / pesoTotal, (c0 + w) / pesoTotal);
    if (meseta) {
      return Math.round(top + (meseta.a + (meseta.b - meseta.a) * 0.25) * pesoTotal * vh);
    }

    // Respaldo para un mundo sin copias declaradas: el punto a mano de siempre.
    var parada = parseFloat(tramos[i].getAttribute('data-sc-parada'));
    if (isNaN(parada)) parada = 0.34;
    return Math.round(top + (c0 + w * parada) * vh);
  }

  paradas.forEach(function (grupo, i) {
    grupo.forEach(function (b) {
      b.addEventListener('click', function () {
        scrollTo({ top: scrollDeTramo(i), behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  });

  if (mundo) {
    mundo.addEventListener('sc:waypoint', function (e) {
      var k = e.detail.index;
      paradas.forEach(function (grupo, i) {
        var on = i === k;
        grupo.forEach(function (b) {
          if ((b.getAttribute('aria-current') === 'true') !== on) {
            b.setAttribute('aria-current', on ? 'true' : 'false');
          }
        });
      });
    });
  }

  /* ------------------------------------------------------- la aguja -------
     La parada encendida dice en cuál de las cuatro estás. La aguja dice CUÁNTO
     llevas de ella: es una raya del ancho de una parada que se desliza por el
     canto superior de la barra siguiendo el scroll, no un punto que salta de
     casilla en casilla al cruzar el umbral de cada tramo.

     La diferencia importa en una portada que ES un recorrido: entre parada y
     parada hay dos o tres pantallas de scroll, y con un punto que salta te
     pasas todo ese rato sin saber si te queda mucho. Se escribe una sola
     propiedad (--p, de 0 a 1) y el CSS hace la cuenta; así el bucle de scroll
     no toca layout ni lee nada del DOM.

     Va aparte de pintarCamara() porque aquella se apaga con movimiento
     reducido —es un gesto— y esto no es un gesto, es un indicador de posición:
     tiene que seguir funcionando. Lo que se apaga en ese caso es la transición
     del CSS, no el dato. */
  var recorrido = document.getElementById('recorrido');

  function pintarRecorrido() {
    if (!recorrido || !mundo || !tramos.length) return;
    var top = mundo.getBoundingClientRect().top + scrollY;
    var t = (scrollY - top) / Math.max(innerHeight, 1);
    var total = 0;
    for (var i = 0; i < tramos.length; i++) {
      total += parseFloat(tramos[i].getAttribute('data-sc-w')) || 1.3;
    }
    // Antes de entrar en el mundo (todo el umbral) la aguja espera en la
    // primera parada; después del último tramo se queda en la última.
    recorrido.style.setProperty('--p', clamp01(t / total).toFixed(4));
  }

  /* ------------------------------------------------- cámara por tramo ----
     Sin clip, el motor mueve el póster con un empuje muy corto (1.03 a 1.17),
     y a lo largo de ocho alturas de pantalla eso es casi una foto quieta. El
     motor escribe `transform` en el PÓSTER, así que aquí se mueve el TRAMO,
     que él no toca. Cada leg lleva un gesto distinto: si los cinco hicieran lo
     mismo, sería una sección repetida cinco veces.
  */
  // El sobreescalado de cada tramo tiene que cubrir SIEMPRE su propia
  // traslación (escala >= 1 + 2*|desplazamiento|), o asoma el borde del lienzo.
  var CAMARA = [
    { esc: [1.13, 1.05], x: 0,    y:  1.2 },  // nave: entras, se abre el espacio
    { esc: [1.11, 1.11], x: -1.6, y:  0   },  // material: la escena casi quieta, que el banco manda
    { esc: [1.17, 1.05], x: 0,    y:  0.6 },  // 1:1 el pico: el mayor gesto
    { esc: [1.09, 1.14], x: 1.8,  y:  0   }   // salida: te retiras hacia el portón
  ];

  function pintarCamara() {
    if (reduce || !mundo || !tramos.length) return;
    var top = mundo.getBoundingClientRect().top + scrollY;
    var t = (scrollY - top) / Math.max(innerHeight, 1);
    var run = 0;
    for (var i = 0; i < tramos.length; i++) {
      var w = parseFloat(tramos[i].getAttribute('data-sc-w')) || 1.3;
      var local = clamp01((t - run) / w);
      run += w;
      var c = CAMARA[i] || CAMARA[0];
      var e = c.esc[0] + (c.esc[1] - c.esc[0]) * local;
      tramos[i].style.transform =
        'translate3d(' + (c.x * (local - 0.5) * 2).toFixed(3) + '%,' +
                         (c.y * (local - 0.5) * 2).toFixed(3) + '%,0) ' +
        'scale(' + e.toFixed(4) + ')';
    }
  }

  /* --------------------------------------------- coreografía de la copia --
     El motor sube y baja la opacidad de [data-sc-copy] y le da 4vh de deriva,
     igual para los cinco. Eso es una transición, no una entrada: los cinco
     cambios de sección se sienten idénticos.

     Aquí se anima el hijo .copia, que el motor no toca, leyendo la opacidad
     que él ya calculó. Cada tramo entra por un lado distinto, y dentro del
     bloque el rótulo, el titular y el párrafo escalonan su llegada, de modo
     que el cambio de sección se lee como algo compuesto y no como un fundido.
  */
  var copias = [].slice.call(document.querySelectorAll('[data-sc-copy]')).map(function (envoltorio) {
    var caja = envoltorio.querySelector('.copia');
    return {
      env: envoltorio,
      caja: caja,
      via: caja ? (caja.getAttribute('data-entrada') || 'sube') : 'sube',
      hijos: caja ? [].slice.call(caja.children) : [],
      ultimo: -1
    };
  }).filter(function (c) { return c.caja; });

  var VIAS = {
    sube:      { x:  0,   y:  4.2, e: 1    },
    baja:      { x:  0,   y: -3.6, e: 1    },
    derecha:   { x:  5.5, y:  0,   e: 1    },
    izquierda: { x: -5.5, y:  0,   e: 1    },
    abre:      { x:  0,   y:  2.0, e: 0.945 }   // el pico: el gesto más amplio
  };

  var ESCALON = 0.22;   // desfase de entrada entre rótulo, titular y párrafo

  function pintarCopias() {
    for (var i = 0; i < copias.length; i++) {
      var c = copias[i];
      // La opacidad que el motor acaba de escribir en línea. Leerla de ahí
      // evita un getComputedStyle por bloque y por fotograma.
      var v = parseFloat(c.env.style.opacity);
      if (isNaN(v)) v = 0;
      if (Math.abs(v - c.ultimo) < 0.004) continue;
      c.ultimo = v;

      var via = VIAS[c.via] || VIAS.sube;
      var t = reduce ? 1 : suave(v);

      c.caja.style.transform =
        'translate3d(' + ((1 - t) * via.x).toFixed(3) + 'vw,' +
                         ((1 - t) * via.y).toFixed(3) + 'vh,0)' +
        (via.e !== 1 ? ' scale(' + (via.e + (1 - via.e) * t).toFixed(4) + ')' : '');

      if (reduce) continue;

      // Escalonado interno. Se calcula sobre la misma v, así que al salir se
      // desmonta en el mismo orden en que se montó.
      var n = c.hijos.length;
      var util = 1 - ESCALON * Math.max(n - 1, 0);
      for (var k = 0; k < n; k++) {
        var vk = suave(clamp01((v - k * ESCALON) / Math.max(util, 0.05)));
        var h = c.hijos[k];
        h.style.opacity = vk.toFixed(3);
        h.style.transform = 'translate3d(0,' + ((1 - vk) * 1.5).toFixed(2) + 'vh,0)';
      }
    }
  }

  /* --------------------------------------------------------------- bucle */
  var pendiente = false;
  function alScroll() {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () {
      pintarUmbral();
      pintarCierre();
      pintarCamara();
      pintarCopias();
      pintarRecorrido();
      pendiente = false;
    });
  }
  addEventListener('scroll', alScroll, { passive: true });
  addEventListener('resize', alScroll, { passive: true });

  addEventListener('resize', calcularZoom, { passive: true });
  calcularZoom();
  pintarUmbral();
  pintarCierre();
  pintarCamara();
  pintarCopias();
  pintarRecorrido();

  /* ------------------------------------------- la inclinación del sello ---
     El motor trae `data-sc-tilt`, pero apaga TODOS sus dispositivos de puntero
     cuando el sistema pide movimiento reducido, y aquí se pidió que la pieza se
     vea igual en cualquier equipo sin tocar ajustes. Así que la inclinación va
     aquí, sin consultar esa preferencia. El motor no se toca.

     La perspectiva la pone el CSS en el padre; esto solo escribe los grados.
  */
  var selloEje = document.querySelector('.sello__eje');

  if (selloEje && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var GRADOS = 26;
    var okX = 0, okY = 0;   // objetivo
    var enX = 0, enY = 0;   // valor actual
    var vivo = false;

    addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = selloEje.getBoundingClientRect();
      // Oculto (móvil/tablet) o fuera de pantalla: ni se calcula ni se pinta.
      if (!r.width || r.bottom < -200 || r.top > innerHeight + 200) {
        okX = 0; okY = 0;
        return;
      }
      var nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      var ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      // Zona de reacción algo mayor que la pieza: si empezara justo en el canto,
      // el giro daría un salto al entrar en vez de crecer.
      var cerca = Math.abs(nx) < 1.8 && Math.abs(ny) < 1.8;
      okX = cerca ? clamp(ny, -1, 1) * -GRADOS : 0;
      okY = cerca ? clamp(nx, -1, 1) *  GRADOS : 0;
      if (!vivo) { vivo = true; requestAnimationFrame(girar); }
    }, { passive: true });

    function girar() {
      // Interpolar en vez de seguir al puntero al milímetro: el seguimiento
      // directo no lleva inercia y se lee como algo sin peso.
      enX += (okX - enX) * 0.09;
      enY += (okY - enY) * 0.09;
      var quieto = Math.abs(okX - enX) < 0.01 && Math.abs(okY - enY) < 0.01 &&
                   Math.abs(enX) < 0.01 && Math.abs(enY) < 0.01;
      if (quieto) {
        // Ya está plano y no hay nada pendiente: se para el bucle en vez de
        // dejar un rAF girando en vacío toda la visita.
        selloEje.style.transform = '';
        vivo = false;
        return;
      }
      selloEje.style.transform =
        'rotateX(' + enX.toFixed(2) + 'deg) rotateY(' + enY.toFixed(2) + 'deg)';
      requestAnimationFrame(girar);
    }
  }

  /* --------------------------------------------- el desplegable de páginas -
     Solo tiene sentido en móvil y solo en la home, que es donde el menú de
     páginas cede la barra al recorrido de la nave. El CSS decide cuándo se
     ve; aquí solo se abre y se cierra, y se cierra por todas las vías por las
     que un usuario espera que se cierre.
  */
  var barra = document.querySelector('.chrome');
  var hamb  = document.getElementById('abrir-menu');
  var menuP = document.getElementById('menu-paginas');

  if (barra && hamb && menuP) {
    var abrir = function (si) {
      barra.setAttribute('data-menu', si ? 'abierto' : 'cerrado');
      hamb.setAttribute('aria-expanded', si ? 'true' : 'false');
    };

    hamb.addEventListener('click', function () {
      abrir(hamb.getAttribute('aria-expanded') !== 'true');
    });

    // Un enlace a la página en la que ya estás no recarga nada: sin esto el
    // desplegable se quedaría abierto encima.
    menuP.addEventListener('click', function (e) {
      if (e.target.closest('a')) abrir(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (hamb.getAttribute('aria-expanded') !== 'true') return;
      abrir(false);
      hamb.focus();
    });

    document.addEventListener('pointerdown', function (e) {
      if (hamb.getAttribute('aria-expanded') !== 'true') return;
      if (e.target.closest('#menu-paginas') || e.target.closest('#abrir-menu')) return;
      abrir(false);
    });

    // Al pasar a escritorio el menú vuelve a la barra: dejarlo marcado como
    // abierto deja el botón mintiendo a los lectores de pantalla.
    var ancho = matchMedia('(min-width: 861px)');
    var alCambiar = function () { if (ancho.matches) abrir(false); };
    if (ancho.addEventListener) ancho.addEventListener('change', alCambiar);
    else ancho.addListener(alCambiar);
  }

  /* ----------------------------------------------------------- el banco --
     La librería de materiales. Una sola muestra elegida a la vez y UNA sola
     cartela, siempre en el canto del banco. Colgar el texto de cada tabla era
     lo natural sobre el papel, pero la fila de atrás abría encima de la de
     delante y no había forma de leerlo; en un sitio fijo se lee siempre.

     Los botones son botones de verdad, así que Enter y Espacio ya funcionan
     sin escribir una línea. Aquí solo se elige, se suelta y se avisa: los
     botones llevan aria-pressed (están elegidos o no) y la cartela es una
     región aria-live, que es lo que hace que el lector de pantalla lea el
     nombre y la frase al cambiar de madera.
  */
  var banco = document.getElementById('banco');
  if (banco) {
    var cartela = document.getElementById('cartela-banco');
    var cNombre = cartela && cartela.querySelector('.cartela__nombre');
    var cFrase  = cartela && cartela.querySelector('.cartela__frase');
    // La instrucción de partida se toma del HTML, no se repite aquí: si se
    // reescribe en la plantilla, esto la sigue sin tocar nada.
    var textoVacio = cFrase ? cFrase.textContent : '';
    var elegida = null;

    var soltar = function () {
      if (!elegida) return;
      elegida.setAttribute('aria-pressed', 'false');
      elegida = null;
      if (!cartela) return;
      cartela.setAttribute('data-estado', 'vacio');
      cNombre.textContent = '';
      cFrase.textContent = textoVacio;
    };

    var elegir = function (b) {
      if (elegida === b) { soltar(); return; }
      if (elegida) elegida.setAttribute('aria-pressed', 'false');
      elegida = b;
      b.setAttribute('aria-pressed', 'true');
      if (!cartela) return;
      cartela.setAttribute('data-estado', 'lleno');
      cNombre.textContent = b.getAttribute('data-nombre') || '';
      cFrase.textContent = b.getAttribute('data-frase') || '';
    };

    banco.addEventListener('click', function (e) {
      var b = e.target.closest('.muestra__pieza');
      if (b) elegir(b);
    });

    // Escape suelta y devuelve el foco a la tabla, que es de donde salió. Sin
    // esto el foco se quedaría en el aire después de cerrar con teclado.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !elegida) return;
      var b = elegida;
      soltar();
      b.focus();
    });

    // Un toque en cualquier otro sitio suelta. Incluye el propio tablero: si
    // solo cambiara al tocar otra muestra, la cartela se quedaría puesta el
    // resto del recorrido.
    document.addEventListener('pointerdown', function (e) {
      if (!elegida) return;
      // El objetivo de un evento no siempre es un elemento (el propio document
      // lo es de los eventos sintéticos), y ahí `closest` no existe.
      var t = e.target;
      if (t && t.closest && t.closest('.muestra')) return;
      soltar();
    });

    // Al salir del tramo de Material, el motor apaga el bloque y le quita los
    // eventos de puntero. Una madera elegida debajo de una capa invisible es
    // basura de estado: cuando el visitante vuelva, se la encontraría puesta.
    var mundoBanco = document.querySelector('[data-sc-mode="worldflight"]');
    if (mundoBanco) {
      mundoBanco.addEventListener('sc:waypoint', function (e) {
        if (e.detail.index !== 1) soltar();
      });
    }
  }

  /* ------------------------------------------------------------ formulario */
  var form = document.getElementById('form-contacto');
  if (form) {
    var recado = document.getElementById('recado');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var nom = (d.get('nombre') || '').toString().trim();
      var mail = (d.get('email') || '').toString().trim();
      if (!nom || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        recado.textContent = 'Falta el nombre o el correo no es válido.';
        return;
      }
      recado.textContent = 'Recibido. Contestamos con un presupuesto orientativo.';
      form.reset();
    });
  }

  /* ------------------------------------------ el CTA cae en el formulario --
     El CTA de la barra apunta a /contacto#nombre. El navegador baja hasta el
     campo, pero no lo enfoca: quien llega pidiendo presupuesto ya puede
     escribir sin tener que hacer clic. */
  if (location.hash === '#nombre') {
    var campoNombre = document.getElementById('nombre');
    if (campoNombre) {
      // Tras el salto del navegador, para no pelearnos con su propio scroll.
      requestAnimationFrame(function () {
        campoNombre.focus({ preventScroll: true });
      });
    }
  }

  /* ------------------------------------------------- filtros de proyectos */
  var filtros = document.getElementById('filtros');
  if (filtros) {
    var obras = [].slice.call(document.querySelectorAll('.obra'));
    var cuenta = document.getElementById('cuenta-obras');
    filtros.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var sec = b.getAttribute('data-sector');
      [].forEach.call(filtros.querySelectorAll('button'), function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });
      var n = 0;
      obras.forEach(function (o) {
        var ok = sec === 'todos' || o.getAttribute('data-sector') === sec;
        o.hidden = !ok;
        if (ok) n++;
      });
      if (cuenta) cuenta.textContent = n;
    });
  }
})();
