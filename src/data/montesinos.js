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

export const sectores = [
  { id: "retail", nombre: "Tiendas y retail" },
  { id: "hosteleria", nombre: "Hoteles y restaurantes" },
  { id: "oficinas", nombre: "Oficinas corporativas" },
  { id: "particulares", nombre: "Particulares" },
  { id: "stands", nombre: "Stands y escaparatismo" },
];

// Los 20 archivos son fotografías reales de su web oficial.
export const proyectos = [
  { ref: "CL", nombre: "Christian Louboutin", sector: "retail", img: "christian-louboutin-1", destacado: true },
  { ref: "HL", nombre: "Harrods Loewe", sector: "retail", img: "harrods-loewe-1", destacado: true },
  { ref: "AS", nombre: "Andrés Sardá", sector: "retail", img: "andres-sarda-2", destacado: true },
  { ref: "AS", nombre: "Andrés Sardá", sector: "stands", img: "andres-sarda-1" },
  { ref: "CS", nombre: "Cercle Sabadellès", sector: "hosteleria", img: "cercle-sabadelles-1", destacado: true },
  { ref: "CS", nombre: "Cercle Sabadellès", sector: "hosteleria", img: "cercle-sabadelles-2" },
  { ref: "H10", nombre: "h10 Waterloo", sector: "hosteleria", img: "h10-waterloo-1" },
  { ref: "EG", nombre: "EGISA", sector: "oficinas", img: "egisa-1", destacado: true },
  { ref: "EG", nombre: "EGISA", sector: "oficinas", img: "egisa-2" },
  { ref: "EA", nombre: "Estudio de arquitectura", sector: "oficinas", img: "estudio-de-arquitectura-1" },
  { ref: "AL", nombre: "Alexia", sector: "retail", img: "alexia-1" },
  { ref: "AL", nombre: "Alexia", sector: "retail", img: "alexia-2" },
  { ref: "VO", nombre: "Vista Óptica", sector: "retail", img: "vista-optica-1" },
  { ref: "DF", nombre: "Duty Free", sector: "retail", img: "dutty-free-1" },
  { ref: "SH", nombre: "Showroom", sector: "stands", img: "showroom-1" },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-1" },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-2", destacado: true },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-3" },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-4" },
  { ref: "PT", nombre: "Particular", sector: "particulares", img: "particular-5" },
];

// Los cuatro pilares, literales de su web.
export const pilares = [
  { n: "01", t: "Personal cualificado", d: "La profesionalidad de los empleados como primer pilar de la empresa." },
  { n: "02", t: "Innovación constante", d: "Inversión continua en I+D para mejorar la calidad del mueble fabricado." },
  { n: "03", t: "Dinamismo y pasión", d: "Pasión por el trabajo, aplicada a cada encargo con independencia de su tamaño." },
  { n: "04", t: "Cuidado del entorno", d: "Credenciales ecológicas que aseguran la tala y la reforestación, para que el ecosistema perdure." },
];

// El proceso, literal de "Cómo y dónde".
export const proceso = [
  { n: "01", t: "Asesoramiento", d: "Asesoramiento al cliente, y visita al espacio si el proyecto la precisa." },
  { n: "02", t: "Desarrollo", d: "Desarrollo de la necesidad del cliente, fabricación y customización del mueble." },
  { n: "03", t: "Premontaje 1:1", d: "El mobiliario se monta a escala 1:1 en nuestras instalaciones y espacios comerciales antes de ser enviado a su destino. El cliente lo ve levantado antes de que salga de la nave." },
  { n: "04", t: "Entrega", d: "El cliente ve el producto finalizado, acabados, montaje e instalación." },
];

export const vias = [
  { t: "Sobre planos de la marca", d: "Fabricación directa a partir de los planos entregados por la marca, la firma o el cliente." },
  { t: "Con prototipo previo", d: "Fabricación previa de prototipo, presentación al cliente, producción con acabados e instalación." },
];

export const prensa = [
  { medio: "RTVE", t: "RTVE a la Carta" },
  { medio: "La Vanguardia", t: "Entrevista" },
  { medio: "Crónica Global", t: "Reportaje" },
  { medio: "Diari de Sabadell", t: "Entrevista" },
];

export const acabados = [
  "Apliques de latón",
  "Acero inoxidable",
  "Lacados",
  "Barnizados",
];

export const paginas = [
  { href: "/", t: "Inicio" },
  { href: "/proyectos", t: "Proyectos" },
  { href: "/como-trabajamos", t: "Cómo trabajamos" },
  { href: "/estudio", t: "Estudio" },
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
export const paisesGlobo = [
  { pais: "España",          ciudad: "Madrid",      lat: 40.4168, lng: -3.7038 },
  { pais: "Portugal",        ciudad: "Lisboa",      lat: 38.7223, lng: -9.1393 },
  { pais: "Francia",         ciudad: "París",       lat: 48.8566, lng:  2.3522 },
  { pais: "Reino Unido",     ciudad: "Londres",     lat: 51.5074, lng: -0.1278 },
  { pais: "Países Bajos",    ciudad: "Ámsterdam",   lat: 52.3676, lng:  4.9041 },
  { pais: "Alemania",        ciudad: "Berlín",      lat: 52.5200, lng: 13.4050 },
  { pais: "Luxemburgo",      ciudad: "Luxemburgo",  lat: 49.6116, lng:  6.1319 },
  { pais: "Suiza",           ciudad: "Berna",       lat: 46.9480, lng:  7.4474 },
  { pais: "Suecia",          ciudad: "Estocolmo",   lat: 59.3293, lng: 18.0686 },
  { pais: "Rusia",           ciudad: "Moscú",       lat: 55.7558, lng: 37.6173 },
  { pais: "Qatar",           ciudad: "Doha",        lat: 25.2854, lng: 51.5310 },
  { pais: "Emiratos Árabes", ciudad: "Abu Dabi",    lat: 24.4539, lng: 54.3773 },
].map((p) => ({ ...p, img: "/proyectos-web/showroom-1.webp" }));
