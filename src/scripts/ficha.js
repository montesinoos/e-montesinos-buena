/* ============================================================== LA FICHA ===
   La tarjeta de obra de la parada "Salida": la foto del proyecto con su ciudad
   y su país. La abren dos piezas distintas —el globo 3D en escritorio y el mapa
   plano en móvil— y las dos abren EXACTAMENTE la misma, con la misma animación
   y el mismo pie. Por eso vive aquí y no dentro de ninguna de las dos: dos
   copias de este baile se irían separando a la primera corrección.

   El módulo no sabe nada de globos ni de mapas. Recibe datos con la forma de
   `paisesGlobo` (pais, ciudad, img) y devuelve `mostrar`. Quien lo llame puede
   pasar `alCambiar`, que se dispara con (el que sale, el que entra) para que el
   globo pueda apagar el aro del marcador viejo y encender el del nuevo; el mapa
   plano lo usa para lo mismo con sus chinchetas.
   ========================================================================== */

export function crearFicha({ alCambiar } = {}) {
  const ficha = document.getElementById("ficha-globo");
  const laminas = document.getElementById("ficha-laminas");
  const pie = document.getElementById("ficha-pie");
  const SUAVE = window.matchMedia("(prefers-reduced-motion: reduce)");

  let elegido = null; // el dato cuya obra está en la ficha ahora mismo

  const hacerLamina = (d) => {
    const lamina = document.createElement("div");
    lamina.className = "ficha__lamina";
    const img = document.createElement("img");
    img.src = d.img;
    img.alt = `Proyecto de Ebanistería Montesinos en ${d.ciudad}, ${d.pais}`;
    img.decoding = "async";
    lamina.append(img);
    return lamina;
  };

  const mostrar = (d) => {
    if (!d || d === elegido) return;

    const previo = elegido;
    elegido = d;
    if (alCambiar) alCambiar(previo, d);

    const saliente = laminas.lastElementChild;
    const entrante = hacerLamina(d);

    const escribirPie = () => {
      pie.replaceChildren();
      pie.append(Object.assign(document.createElement("b"), { textContent: d.ciudad }));
      pie.append(Object.assign(document.createElement("span"), { textContent: d.pais }));
    };

    if (SUAVE.matches || !saliente) {
      // Sin deslizamiento: la lamina vieja se va y la nueva ya esta puesta.
      laminas.replaceChildren(entrante);
      escribirPie();
      ficha.dataset.estado = "llena";
      return;
    }

    // La que se va deja de contar para el lector de pantalla en cuanto
    // empieza a salir: durante 380 ms hay dos fotos en el DOM y solo una
    // es la actual.
    saliente.setAttribute("aria-hidden", "true");

    entrante.classList.add("ficha__lamina--entra");
    laminas.append(entrante);
    ficha.dataset.cambiando = "si"; // el pie se desvanece

    // Dos fotogramas de margen: uno no basta para que el navegador
    // registre la posicion de partida, y sin posicion de partida no hay
    // transicion, hay salto.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      entrante.classList.remove("ficha__lamina--entra");
      saliente.classList.add("ficha__lamina--sale");
      // A mitad del recorrido, cuando el pie ya se ha ido, se cambia el
      // texto y vuelve: asi ciudad y foto cambian a la vez y no se lee el
      // pie viejo sobre la foto nueva.
      setTimeout(() => {
        escribirPie();
        ficha.dataset.cambiando = "no";
      }, 190);
    }));

    saliente.addEventListener("transitionend", () => saliente.remove(), { once: true });
    ficha.dataset.estado = "llena";
  };

  return { mostrar, esElegido: (d) => d === elegido };
}
