# Accesos y titularidad — revisión del 7 de septiembre de 2026

El punto 7 consiste en saber quién puede gestionar cada servicio y cómo
mantener o recuperar la web. No requiere cambiar el diseño.

| Servicio | Comprobado | Pendiente y siguiente paso |
|---|---|---|
| Web de esta propuesta | wrangler.jsonc configura el Worker e-montesinos-buena y sirve dist | Confirmar quién administra la cuenta Cloudflare y qué acceso se acuerda con el cliente |
| Autenticación local | Wrangler whoami devuelve «You are not authenticated» | La persona responsable debe iniciar sesión con su propia cuenta; no pegar tokens ni contraseñas en el chat |
| www.themontesinos.com | DNS CNAME observado: ext-sq.squarespace.com | El dominio actual apunta a Squarespace. Confirmar quién lo controla antes de plantear migración |
| DNS del dominio | NS observados: dns1–4.p02.nsone.net y ns01–04.squarespacedns.com | Estos registros indican proveedores, no identidad del propietario. Confirmar acceso al panel y renovaciones |
| Correo del formulario | No hay servicio de envío configurado | Cliente debe facilitar receptor; después acordar servicio de envío y quién lo administra |
| WhatsApp | Campo vacío; widget oculto | Cliente debe confirmar número y control de la cuenta |
| Analítica/Search Console | No hay etiquetas analíticas en el código revisado | Acordar si se necesita; si se crea, documentar quién será titular y los permisos |
| Repositorio/copia | Código y lockfile disponibles localmente, .env ignorado | Acordar copia, acceso de mantenimiento y probar restauración antes de entrega definitiva |

No se han cambiado DNS, propietarios, permisos ni cuentas. La lectura de DNS y
la configuración del proyecto no acredita propiedad del cliente.

Para la primera presentación basta con que el responsable pueda compartir una
URL de revisión actualizada. Para la entrega definitiva, completar este inventario
con nombre del responsable, cuenta administrativa, recuperación, renovación y
acceso de mantenimiento acordado. No guardar secretos en este documento.
