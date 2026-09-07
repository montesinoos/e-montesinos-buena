import { indexable, siteUrl } from '../data/site.js';
export const GET = () => new Response(
  'User-agent: *\nAllow: /\n' + (indexable ? 'Sitemap: ' + new URL('/sitemap.xml', siteUrl).href + '\n' : ''),
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
);
