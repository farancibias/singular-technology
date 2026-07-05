# Prompt para Claude Code — Publicar sitio Singular Technology Group

> **Antes de pegar en Claude Code:** reemplaza los bloques `⟪...⟫` con la configuración específica del proyecto anterior que quieres replicar. Si no recuerdas alguno, deja el placeholder y Claude Code te preguntará.

---

## Contexto

Necesito publicar en producción un sitio web estático de una sola página para **Singular Technology Group** (filial de Singular Group, holding chileno con siete industrias). El sitio ya está diseñado y terminado como un único archivo HTML autocontenido (~86 KB) — no requiere build, framework ni backend. Todo el CSS y JS está inline, el logo va embebido en base64, y las fuentes se cargan desde Google Fonts.

Quiero replicar **la misma infraestructura y configuración** que usamos para el proyecto anterior: ⟪NOMBRE_DEL_OTRO_PROYECTO⟫.

## Archivo fuente

Adjunto en esta conversación: `singular-aws.html` — este es el sitio completo, tal cual debe verse en producción.

## Infraestructura a replicar (rellenar con la config del proyecto anterior)

- **Repositorio Git:** ⟪GitHub / GitLab / Bitbucket⟫ · organización/usuario: ⟪org⟫
- **Hosting:** ⟪Vercel / Netlify / Cloudflare Pages / GitHub Pages / AWS S3+CloudFront / otro⟫
- **CI/CD:** ⟪GitHub Actions / deploy hooks del proveedor / manual⟫
- **Manejo de secrets:** ⟪igual que el otro proyecto⟫
- **Analytics:** ⟪Google Analytics 4 / Plausible / Umami / ninguno⟫
- **Monitoreo de errores:** ⟪Sentry / ninguno⟫
- **Dominio de producción:** `tech.singulargroup.net` (subdominio del dominio principal singulargroup.net — el DNS del dominio raíz lo manejo desde ⟪proveedor DNS⟫)

## Tareas

### 1. Repositorio
- Crea un nuevo repositorio con el naming pattern del otro proyecto (ej.: `singular-tech-web`).
- README con: descripción del proyecto, stack, comandos, URL de producción, instrucciones de contribución.
- `.gitignore` estándar para proyecto web estático.
- Licencia: la misma que el otro proyecto (indícamela si es privado).

### 2. Estructura de archivos
- Renombra `singular-aws.html` → `index.html`.
- Extrae el logo del `data:image/jpeg;base64,...` a `assets/logo.jpg` y actualiza el `<img>` para que apunte al archivo (dos ocurrencias: nav y footer).
- Deja el CSS y JS inline en `index.html` — es un archivo autocontenido intencional, no lo separes.
- Crea `favicon.ico` y `favicon.svg` derivados del logo (fondo blanco, el icono naranja "R" del logo suele funcionar bien).
- Crea `apple-touch-icon.png` (180×180) y variantes estándar para PWA.
- Añade `404.html` con el mismo diseño (mensaje breve + botón "Volver al inicio").
- Añade `robots.txt` permitiendo indexado completo.
- Genera `sitemap.xml` con la URL de producción.

### 3. SEO y metadatos (dentro de `<head>` de `index.html`)
Agrega o completa:
- `<meta name="description">` — copy: *"Singular Technology Group: consultoría e integración tecnológica en IA, biometría, ciberseguridad e infraestructura. Parte de Singular Group. Santiago, Chile."*
- Open Graph completo (`og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `og:locale=es_CL`).
- Twitter Card `summary_large_image`.
- Genera una imagen social de 1200×630 (`assets/og-image.jpg`) — puedes componerla del logo sobre fondo navy oscuro con el tagline "Consultoría e integración tecnológica para su organización".
- `<link rel="canonical">` apuntando a la URL de producción.
- Idioma: `<html lang="es-CL">`.
- Schema.org JSON-LD tipo `Organization` con: nombre, url, logo, sameAs (links a filiales del grupo), parentOrganization (Singular Group), address del WTC, contactPoint (teléfono).

### 4. Performance
- Precargar Google Fonts con `<link rel="preconnect">` (ya está en el archivo, verifica).
- Verificar que las imágenes tengan `loading="lazy"` cuando corresponda.
- Comprimir el logo JPG con `mozjpeg` a calidad 82 sin pérdida visual.
- Añadir headers HTTP de cache correctos vía el config del hosting: HTML `max-age=0, must-revalidate`; assets `max-age=31536000, immutable`.
- Objetivo Lighthouse ≥ 90 en Performance, Accessibility, Best Practices, SEO. Reportarme el resultado real.

### 5. Seguridad
- Cabeceras vía config del hosting:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Content-Security-Policy` acorde a Google Fonts y al base64 embebido.
- SSL/TLS válido antes de anunciar la URL.

### 6. Despliegue
- Conecta el repo con ⟪hosting⟫ igual que hicimos en el proyecto anterior.
- Branch de producción: `main`. Cualquier push a `main` despliega automáticamente.
- Branch de preview: cada PR debe generar una URL preview (si el hosting lo soporta).
- Configura el subdominio `tech.singulargroup.net` en el hosting y crea el registro DNS correspondiente en ⟪proveedor DNS⟫ (déjame las instrucciones exactas si necesitas que yo agregue el registro manualmente).

### 7. Analytics (si aplica)
Si el otro proyecto usa analytics, integra el mismo:
- ⟪Snippet de GA4 / Plausible / Umami⟫ dentro del `<head>`.
- Configurar el mismo goal/evento estándar (si aplica).

### 8. Post-despliegue
Verifica:
- El logo carga correctamente en nav y footer.
- Las animaciones del diagrama de red funcionan (pulsaciones naranjas fluyendo).
- El `prefers-reduced-motion` desactiva las animaciones cuando corresponde.
- Los 8 links a filiales del grupo (nomi.la, pannextherapeutics.com, bionaute.io, clicoh.com, kunzaiventures.com, singularagro.com, ecometric.cl, singulargroup.net) abren en nueva pestaña.
- El formulario de contacto muestra confirmación al enviar (por ahora es placeholder — no hay backend real; el mensaje de éxito es cosmético).
- Responsive: desktop, tablet (~768px) y móvil (~375px).

## Convenciones
- Commits en español, imperativos (`Agrega meta tags SEO`, no `Agregando`).
- Mensajes de PR claros.
- No agregues frameworks, bundlers, ni build steps innecesarios. Este sitio no los necesita.
- Si tienes que hacer una decisión no cubierta acá, opta por la opción más simple y coméntamela.

## Entregables al terminar
1. URL del repositorio.
2. URL de producción (`https://tech.singulargroup.net`).
3. Screenshot o reporte de Lighthouse (los 4 scores).
4. Lista de decisiones tomadas y cualquier tarea pendiente para que yo intervenga (ej.: agregar registro DNS, apuntar el correo contacto@singulargroup.net a un backend real de formulario, etc.).

---

## Pendientes conocidos (fuera de scope de este despliegue)
- **Formulario de contacto real**: hoy solo simula el envío. En una segunda iteración habrá que conectarlo a Formspree / HubSpot / un endpoint propio. Deja el mailto o webhook como TODO comentado en el HTML.
- **Blog / casos de éxito**: no incluidos en esta versión.
- **Multi-idioma**: solo español por ahora.
