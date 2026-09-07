// Activar la indexación únicamente al confirmar el dominio de lanzamiento.
export const siteUrl = process.env.SITE_URL || 'https://www.themontesinos.com';
export const indexable = process.env.SITE_INDEXABLE === 'true';
