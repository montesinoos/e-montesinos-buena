import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://www.themontesinos.com',

  // La página del taller se llamó "/estudio" hasta agosto de 2026. Quien tenga
  // el enlace viejo guardado o compartido aterriza igual en el sitio correcto.
  redirects: {
    '/estudio': '/taller',
  },
});
