/* ============================================================================
   Las maderas del banco.

   Ocho macizas típicas de mueble a medida. La lista está pendiente de validar
   con el taller: añadir, quitar o reordenar es tocar SOLO este archivo.

   x / y     centro de la muestra sobre el tablero, en % del tablero.
             El tablero tiene proporción fija (16:9), así que los porcentajes
             caen siempre en el mismo sitio de la escena, sea cual sea la
             pantalla. Margen de seguridad: x entre 16 y 86.
   giro      grados. Ninguna tabla se deja perfectamente recta sobre un banco.
   tono/veta colores planos provisionales. Cuando entren las texturas
             generadas, estos dos campos se sustituyen por `img` y el resto
             de la geometría no se toca.
   ========================================================================== */

export const maderas = [
  {
    id: "roble",
    nombre: "Roble macizo",
    frase: "Veta marcada y mucha estabilidad. La madera de referencia para el mueble de uso diario.",
    x: 17, y: 30, giro: -3,
    tono: "#C6A16B", veta: "#A8814B"
  },
  {
    id: "nogal",
    nombre: "Nogal americano",
    frase: "Tono chocolate y veta serena. La elección cuando la pieza tiene que pesar en la sala.",
    x: 39, y: 30, giro: 2,
    tono: "#6A4630", veta: "#4C3122"
  },
  {
    id: "fresno",
    nombre: "Fresno macizo",
    frase: "Claro, elástico y de veta larga. Admite curvas y aguanta el golpe sin astillarse.",
    x: 61, y: 30, giro: -1.5,
    tono: "#E0CBA4", veta: "#C0A67C"
  },
  {
    id: "haya",
    nombre: "Haya vaporizada",
    frase: "Grano fino y color parejo. El vaporizado le da estabilidad y le quita el tono crudo.",
    x: 83, y: 30, giro: 3.5,
    tono: "#C99C7C", veta: "#AE8163"
  },
  {
    id: "cerezo",
    nombre: "Cerezo",
    frase: "Rojizo cálido que se oscurece con los años. Envejece mejor que casi ninguna.",
    x: 20, y: 72, giro: 2.5,
    tono: "#B4714A", veta: "#97583A"
  },
  {
    id: "castano",
    nombre: "Castaño",
    frase: "Ligera, cálida y de veta abierta. La madera del mueble de aquí de toda la vida.",
    x: 42, y: 72, giro: -2.5,
    tono: "#C2996A", veta: "#A37A4E"
  },
  {
    id: "iroko",
    nombre: "Iroko",
    frase: "Densa y muy estable frente a la humedad. Para exterior y para lo que se usa a diario.",
    x: 64, y: 72, giro: 1.5,
    tono: "#A97A3E", veta: "#8A6029"
  },
  {
    id: "sapeli",
    nombre: "Sapeli",
    frase: "Caoba africana de veta rayada. Da un rojo profundo sin recurrir a un tinte.",
    x: 86, y: 72, giro: -3,
    tono: "#8E4E32", veta: "#703924"
  }
];
