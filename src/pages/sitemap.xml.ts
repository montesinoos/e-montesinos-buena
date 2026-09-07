import { paginas } from '../data/montesinos.js';
import { siteUrl } from '../data/site.js';
export const GET = () => new Response(
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  paginas.map(p => '<url><loc>' + new URL(p.href === '/' ? '/' : p.href + '/', siteUrl).href + '</loc></url>').join('') +
  '</urlset>', { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
);
