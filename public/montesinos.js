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
  var mapa = document.getElementById('mapa');
  var botones = mapa ? [].slice.call(mapa.querySelectorAll('button')) : [];
  var mundo = document.querySelector('[data-sc-mode="worldflight"]');
  var tramos = mundo ? [].slice.call(mundo.querySelectorAll('[data-sc-segment]')) : [];

  function scrollDeTramo(i) {
    if (!mundo || !tramos.length) return 0;
    var top = mundo.getBoundingClientRect().top + scrollY;
    var run = 0;
    for (var k = 0; k < i; k++) run += parseFloat(tramos[k].getAttribute('data-sc-w')) || 1.3;
    // Un pelín dentro del tramo, para caer donde la copia ya está abierta.
    var w = parseFloat(tramos[i].getAttribute('data-sc-w')) || 1.3;
    return Math.round(top + (run + w * 0.34) * innerHeight);
  }

  botones.forEach(function (b, i) {
    b.addEventListener('click', function () {
      scrollTo({ top: scrollDeTramo(i), behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  if (mundo) {
    mundo.addEventListener('sc:waypoint', function (e) {
      var k = e.detail.index;
      botones.forEach(function (b, i) {
        var on = i === k;
        if ((b.getAttribute('aria-current') === 'true') !== on) {
          b.setAttribute('aria-current', on ? 'true' : 'false');
        }
      });
    });
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
    { esc: [1.11, 1.11], x: -2.6, y:  0   },  // materia: recorres el rack
    { esc: [1.05, 1.13], x: 0,    y: -0.8 },  // banco: te acercas a la pieza
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
