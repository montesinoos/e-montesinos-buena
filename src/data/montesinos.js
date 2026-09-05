// Todo lo de este archivo está tomado de themontesinos.com, salvo los roles de
// las sedes, que los corrigió el cliente: el taller y la sede principal están en
// Sabadell, en Madrid está la oficina técnica y en Londres la red de
// distribución. En Bilbao ya no se trabaja, así que esa sede ya no figura.
// Regla dura: de los proyectos solo consta el nombre y el sector. La web oficial
// no publica año, materiales ni superficie, así que aquí tampoco. Una ficha con
// datos supuestos sobre obra de Louboutin o Harrods sería una invención.

export const marca = {
  nombre: "Ebanistería Montesinos",
  corto: "Montesinos",
  reclamo: "Más de 40 años fabricando para marcas que no admiten un milímetro de error.",
};

export const sedes = [
  {
    pais: "España · Cataluña",
    ciudad: "Sabadell",
    rol: "Taller y sede principal",
    dir: "C/ de Manso, 93-95",
    cp: "08205 Sabadell, Barcelona",
    tel: "+34 937 107 722",
    telHref: "+34937107722",
  },
  {
    pais: "España",
    ciudad: "Madrid",
    rol: "Oficina técnica",
    dir: "C/ Serrano, 93 3ºE",
    cp: "28006 Madrid",
    tel: "+34 915 902 963",
    telHref: "+34915902963",
  },
  {
    pais: "United Kingdom",
    ciudad: "Londres",
    rol: "Red de distribución",
    dir: "Wells House, 80 Upper Street",
    cp: "London N1 0NU",
    tel: "+07 4730291 06",
    telHref: "+07473029106",
  },
];

// `img` es la portada de un proyecto real ya publicado en /proyectos que
// pertenece a ese sector: la usa la vista previa que sigue al cursor en
// "Cómo trabajamos". Ninguna foto se atribuye a un sector al que no pertenece.
export const sectores = [
  { id: "retail", nombre: "Tiendas y retail", img: "/proyectos-web/christian-louboutin-1.webp" },
  { id: "hosteleria", nombre: "Hoteles y restaurantes", img: "/proyectos-web/cercle-sabadelles-1.webp" },
  { id: "oficinas", nombre: "Oficinas corporativas", img: "/proyectos-web/egisa-1.webp" },
  { id: "particulares", nombre: "Particulares", img: "/proyectos-web/particular-2.webp" },
  { id: "stands", nombre: "Stands y escaparatismo", img: "/proyectos-web/andres-sarda-1.webp" },
];

// Los 20 archivos son fotografías reales de su web oficial.
export const proyectos = [
  { ref: "CL", nombre: "Christian Louboutin", sector: "retail", img: "christian-louboutin-1", width: 1800, height: 1350, destacado: true },
  { ref: "HL", nombre: "Harrods Loewe", sector: "retail", img: "harrods-loewe-1", width: 1800, height: 1350, destacado: true },
  { ref: "AS", nombre: "Andrés Sardá", sector: "retail", img: "andres-sarda-2", width: 1024, height: 582, destacado: true },
  { ref: "AS", nombre: "Andrés Sardá", sector: "stands", img: "andres-sarda-1", width: 796, height: 530 },
  { ref: "CS", nombre: "Cercle Sabadellès", sector: "hosteleria", img: "cercle-sabadelles-1", width: 1800, height: 1350, destacado: true },
  { ref: "CS", nombre: "Cercle Sabadellès", sector: "hosteleria", img: "cercle-sabadelles-2", width: 1800, height: 1350 },
  { ref: "H10", nombre: "h10 Waterloo", sector: "hosteleria", img: "h10-waterloo-1", width: 640, height: 460 },
  { ref: "EG", nombre: "EGISA", sector: "oficinas", img: "egisa-1", width: 1800, height: 1350, destacado: true },
  { ref: "EG", nombre: "EGISA", sector: "oficinas", img: "egisa-2", width: 1800, height: 1350 },
  { ref: "EA", nombre: "Estudio de arquitectura", sector: "oficinas", img: "estudio-de-arquitectura-1", width: 1000, height: 626 },
  { ref: "AL", nombre: "Alexia", sector: "retail", img: "alexia-1", width: 412, height: 550 },
  { ref: "AL", nombre: "Alexia", sector: "retail", img: "alexia-2", width: 565, height: 756 },
  { ref: "VO", nombre: "Vista Óptica", sector: "retail", img: "vista-optica-1", width: 980, height: 528 },
  { ref: "DF", nombre: "Duty Free", sector: "retail", img: "dutty-free-1", width: 1800, height: 1200 },
  { ref: "SH", nombre: "Showroom", sector: "stands", img: "showroom-1", width: 1335, height: 1244 },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-1", width: 1600, height: 1200 },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-2", width: 1800, height: 1350, destacado: true },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-3", width: 480, height: 640 },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-4", width: 1800, height: 1296 },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-5", width: 1200, height: 1600 },
];

// Los cuatro pilares, literales de su web.
export const pilares = [
  { n: "01", t: "Personal cualificado", d: "La profesionalidad de los empleados como primer pilar de la empresa." },
  { n: "02", t: "Innovación constante", d: "Inversión continua en I+D para mejorar la calidad del mueble fabricado." },
  { n: "03", t: "Dinamismo y pasión", d: "Pasión por el trabajo, aplicada a cada encargo con independencia de su tamaño." },
  { n: "04", t: "Cuidado del entorno", d: "Credenciales ecológicas que aseguran la tala y la reforestación, para que el ecosistema perdure." },
];

// El proceso, literal de "Cómo y dónde".
// `icono` son trazos de Lucide (MIT) copiados aquí como `path` sueltos: el
// proyecto no depende de ningún paquete de iconos, se dibujan en el SVG.
export const proceso = [
  {
    n: "01", t: "Asesoramiento",
    d: "Asesoramiento al cliente, y visita al espacio si el proyecto la precisa.",
    icono: ["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"],
  },
  {
    n: "02", t: "Desarrollo",
    d: "Desarrollo de la necesidad del cliente, fabricación y customización del mueble.",
    icono: ["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"],
  },
  {
    n: "03", t: "Premontaje 1:1",
    d: "El mobiliario se monta a escala 1:1 en nuestras instalaciones y espacios comerciales antes de ser enviado a su destino. El cliente lo ve levantado antes de que salga de la nave.",
    icono: [
      "M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z",
      "M7.5 10.5l2 2", "M10.5 7.5l2 2", "M13.5 4.5l2 2", "M4.5 13.5l2 2",
    ],
  },
  {
    n: "04", t: "Entrega",
    d: "El cliente ve el producto finalizado, acabados, montaje e instalación.",
    icono: [
      "M7.5 4.27l9 5.15",
      "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      "M3.3 7l8.7 5 8.7-5", "M12 22V12",
    ],
  },
];

export const vias = [
  {
    n: "Vía A", t: "Sobre planos de la marca",
    d: "Fabricación directa a partir de los planos entregados por la marca, la firma o el cliente.",
    icono: [
      "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      "M14 2v4a2 2 0 0 0 2 2h4", "M16 13H8", "M16 17H8", "M10 9H8",
    ],
  },
  {
    n: "Vía B", t: "Con prototipo previo",
    d: "Fabricación previa de prototipo, presentación al cliente, producción con acabados e instalación.",
    icono: [
      "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",
      "m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59",
      "m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59",
    ],
  },
];

// Los medios que han hablado de la casa, con el enlace a la pieza original.
// `pdf: true` marca las que abren un documento en vez de una página: la ficha
// lo avisa en pantalla para que nadie se lleve una descarga por sorpresa.
//
// Crónica Global publicó un reportaje que ya no tiene enlace vivo, así que se
// ha quitado de la lista: una fila de prensa sin pieza que enseñar no acredita
// nada.
export const prensa = [
  {
    medio: "RTVE",
    t: "RTVE a la Carta",
    url: "https://www.rtve.es/play/videos/linformatiu/linformatiu-cap-setmana-15-02-2014/2399288/",
  },
  {
    medio: "La Vanguardia",
    t: "Entrevista",
    url: "https://static1.squarespace.com/static/5ad89fdd12b13f87eda3e47a/t/5b1cfb7470a6ad394ea2cc77/1528626061812/2013-05-24-lavanguardia-enconstruccion_p14.pdf",
    pdf: true,
  },
  {
    medio: "Diari de Sabadell",
    t: "Entrevista",
    url: "https://static1.squarespace.com/static/5ad89fdd12b13f87eda3e47a/t/5b1cfd108a922ddcbe27f9e3/1528626474356/Diari+de+Sabadell",
    pdf: true,
  },
];

export const acabados = [
  "Apliques de latón",
  "Acero inoxidable",
  "Lacados",
  "Barnizados",
];

// El contacto directo. El CTA del chrome y el botón flotante de WhatsApp salen
// de aquí, para que el número y el mensaje se toquen en un solo sitio.
//
// ⚠️ DATO PENDIENTE: el móvil de WhatsApp no lo tenemos. Los teléfonos de las
// sedes son fijos y wa.me no funciona con un fijo, así que aquí va un número de
// ejemplo hasta que el cliente dé el bueno.
export const contactoDirecto = {
  ctaTexto: "Pedir presupuesto",
  ctaHref: "/contacto#nombre",
  whatsappTel: "34600000000",
  whatsappMensaje: "Hola, me gustaría pedir un presupuesto orientativo para un proyecto de mueble a medida.",
};

export const paginas = [
  { href: "/", t: "Inicio" },
  { href: "/proyectos", t: "Proyectos" },
  { href: "/como-trabajamos", t: "Cómo trabajamos" },
  { href: "/taller", t: "Taller" },
  { href: "/contacto", t: "Contacto" },
];

// Los doce países del globo de la sección "Salida".
//
// DATOS DE EJEMPLO. Las coordenadas son las de la capital de cada país, no las
// de la obra: sirven para colocar el marcador mientras no lleguen las ciudades
// reales. Y la foto es la misma para los doce a propósito — colgar de Qatar una
// foto de Louboutin sería inventarse un proyecto, que es justo lo que prohíbe la
// regla dura de la cabecera de este archivo. Cuando lleguen ciudades y fotos
// reales se sustituyen `ciudad` e `img` y no hay que tocar nada más.
// Los doce países con obra. UNA sola lista para las dos piezas que los pintan:
// el globo 3D de escritorio (que usa lat/lng) y el mapa plano de móvil (que usa
// `iso`, el código ISO 3166-1 alfa-2, que es como svgMap identifica países).
// Si algún día entra un país nuevo, entra aquí y aparece en los dos sitios.
//
// `iso` sirve además de traducción: svgMap trae los nombres de país en inglés y
// el paquete de npm no incluye los ficheros de idioma (viven en la carpeta
// `demo/` del repositorio, que no se publica). Como aquí ya están los doce
// nombres en español, el mapa se construye su propio `countryNames` con ellos
// en vez de traerse una tabla de 250 países para usar doce.
export const paisesGlobo = [
  { pais: "España",          iso: "ES", ciudad: "Madrid",      lat: 40.4168, lng: -3.7038 },
  { pais: "Portugal",        iso: "PT", ciudad: "Lisboa",      lat: 38.7223, lng: -9.1393 },
  { pais: "Francia",         iso: "FR", ciudad: "París",       lat: 48.8566, lng:  2.3522 },
  { pais: "Reino Unido",     iso: "GB", ciudad: "Londres",     lat: 51.5074, lng: -0.1278 },
  { pais: "Países Bajos",    iso: "NL", ciudad: "Ámsterdam",   lat: 52.3676, lng:  4.9041 },
  { pais: "Alemania",        iso: "DE", ciudad: "Berlín",      lat: 52.5200, lng: 13.4050 },
  { pais: "Luxemburgo",      iso: "LU", ciudad: "Luxemburgo",  lat: 49.6116, lng:  6.1319 },
  { pais: "Suiza",           iso: "CH", ciudad: "Berna",       lat: 46.9480, lng:  7.4474 },
  { pais: "Suecia",          iso: "SE", ciudad: "Estocolmo",   lat: 59.3293, lng: 18.0686 },
  { pais: "Rusia",           iso: "RU", ciudad: "Moscú",       lat: 55.7558, lng: 37.6173 },
  { pais: "Qatar",           iso: "QA", ciudad: "Doha",        lat: 25.2854, lng: 51.5310 },
  { pais: "Emiratos Árabes", iso: "AE", ciudad: "Abu Dabi",    lat: 24.4539, lng: 54.3773 },
].map((p) => ({ ...p, img: "/proyectos-web/showroom-1.webp" }));
