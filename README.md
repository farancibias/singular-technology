# Singular Technology Group — Sitio web

Sitio web corporativo de **Singular Technology Group**, filial de **Singular Group** (holding chileno con siete industrias: Tecnología, Logística, Biometría, Agrícola, Biotecnología e Inteligencia Artificial).

## Estado

Diseño terminado, listo para publicar. Este repositorio contiene el sitio como una única página estática (`index.html`) autocontenida, sin build ni framework.

- **URL de destino:** `https://www.singulartechnology.cl` (por definir)
- **Sitio actual (a reemplazar):** https://txakur.wixsite.com/singular
- **Grupo padre:** https://www.singulargroup.net

## Stack

- **HTML5 + CSS3** — CSS completamente inline dentro de `index.html` (por diseño, para máxima portabilidad)
- **JavaScript vanilla** — solo lo mínimo para el formulario de contacto placeholder
- **Sin frameworks · Sin bundler · Sin build step**
- **Fuentes:** Inter (Google Fonts), cargada vía `<link>` con `preconnect`
- **Logo:** `assets/logo.jpg` (300 × 143 px, 14 KB)

## Estructura

```
SingularTech_NewSite/
├── index.html          Página única, CSS y JS inline
├── assets/
│   └── logo.jpg        Logo corporativo (referenciado en nav y footer)
├── robots.txt
├── sitemap.xml         (URL de producción por completar)
├── .gitignore
└── README.md
```

## Diseño

- **Estética AWS-inspired**: nav blanco con línea navy divisora, footer navy oscuro, CTAs en naranja AWS (`#FF9900`).
- **Paleta Singular** alineada con AWS por coincidencia natural:
  - Squid Ink: `#232F3E`
  - AWS Orange: `#FF9900` (coincide con el naranja del logo original)
  - Blancos y grises Grey 50–200 para textura
- **Ritmo estratégico de fondos por sección**:
  - Navy oscuro: Grupo (Somos parte de Singular Group), Nosotros
  - Naranja intenso: CTA banner
  - Blanco con franja de acento superior + halo radial: Servicios, Tecnologías, Biometría, Contacto
- **Tipografía**: Inter (weights 300–800)
- **Animaciones**: diagrama de red interactivo en hero con pulsaciones y anillo rotante. Respeta `prefers-reduced-motion`.

## Secciones

1. **Nav superior** — logo + links (Grupo, Servicios, Tecnologías, Biometría, Nosotros, Contacto) + CTA "Hablar con ventas"
2. **Somos parte de Singular Group** — presentación del grupo padre + grid de 8 filiales del holding con enlaces reales
3. **Hero** — mensaje principal + diagrama de red animado
4. **Aliados / Trust** — logos de partners (IBM, Innovatrics, Integrated Biometrics, Apigee)
5. **Servicios** — 3 pilares (Servicios, Tecnología, Proyectos)
6. **Tecnologías** — 4 cards (IBM, Innovatrics, Integrated Biometrics, Ciberseguridad genérica)
7. **Biometría** — línea de negocio destacada con feature block
8. **Nosotros** — stats (5+ marcas, 3 líneas, 10+ años, 24/7)
9. **CTA banner** — "¿Listo para dar el próximo paso?"
10. **Contacto** — formulario + info de oficina Las Condes
11. **Footer** — logo + 3 columnas de links + copyright

## Filiales del grupo Singular Group

Todas están linkeadas en la sección "Somos parte de":

| Filial | Industria | Sitio |
|---|---|---|
| NOMI | Inteligencia Artificial (voz) | nomi.la |
| Pannex Therapeutics | Biotecnología | pannextherapeutics.com |
| Bionaute | Biotecnología | bionaute.io |
| ClicOH | Logística (última milla) | clicoh.com |
| Kunza Ventures | Inversiones | kunzaiventures.com |
| Singular Agro | Agrícola | singularagro.com |
| Ecometric | Analítica ambiental | ecometric.cl |
| **Singular Technology** *(este sitio)* | Tecnología | www.singulartechnology.cl |

## Datos de contacto (hard-coded en el HTML)

- Oficina: Av. Nueva Tajamar 555, WTC, Las Condes, Santiago, Chile
- Teléfono: +56 9 2390 0707
- Correo: contacto@singulargroup.net

## Cómo trabajar sobre este proyecto

### Preview local
Cualquier servidor HTTP estático sirve:

```bash
# Python 3
python3 -m http.server 8080

# Node
npx serve .

# PHP
php -S localhost:8080
```

Y abrir http://localhost:8080/

### Editar
Todo el diseño está en `index.html`. Los estilos están dentro del bloque `<style>` en el `<head>`. Es un archivo largo pero navegable con anclas de comentarios: `/* ============ SECCIÓN ============ */`.

### Deploy
Sin build. Cualquier host estático sirve el directorio raíz tal cual:
- Vercel / Netlify / Cloudflare Pages: connect repo, output directory = `.`
- GitHub Pages: enable Pages sobre `main` root
- S3 + CloudFront: subir todo el directorio a un bucket

## Formulario de contacto (Google Apps Script + Gmail)

El formulario de `#contacto` envía vía **Google Apps Script**, que reenvía el mensaje por Gmail a `contacto@singulargroup.net`. No requiere backend propio ni terceros.

**Para activarlo (una sola vez):**

1. Abre [`google-apps-script/Code.gs`](google-apps-script/Code.gs) y sigue las instrucciones del encabezado para desplegar el Web App en tu cuenta Google.
2. Copia la URL del despliegue (termina en `/exec`) y pégala en `index.html`, en la constante `ENDPOINT` del `<script>` al final del archivo (busca `PEGAR_ID_DEL_DESPLIEGUE`).
3. Prueba enviando un mensaje: debe llegar a la casilla y el sitio mostrar la confirmación.

Incluye validación nativa, estado de carga, mensajes de éxito/error y un honeypot anti-spam. Mientras el `ENDPOINT` no esté configurado, el formulario muestra un aviso en vez de simular un envío.

## Pendientes conocidos

- [x] ~~Meta tags SEO: description, Open Graph, Twitter Card, JSON-LD Organization.~~ — hecho en el `<head>`.
- [x] ~~Favicons (`favicon.svg`, PNG 32/16, `apple-touch-icon.png`).~~ — generados y enlazados.
- [x] ~~Imagen social 1200×630 (`assets/og-image.jpg`).~~ — generada y referenciada en Open Graph/Twitter.
- [x] ~~404.html con el mismo diseño.~~ — [`404.html`](404.html) autocontenida.
- [ ] **Formulario:** pegar el `ENDPOINT` de Google Apps Script en `index.html` (ver sección anterior).
- [ ] Conectar dominio `www.singulartechnology.cl` (DNS en el proveedor del dominio raíz).
- [ ] Analytics (por definir: GA4, Plausible, Umami).
- [ ] Reporte Lighthouse post-deploy (objetivo ≥ 90 en las 4 categorías).
- [ ] (Opcional) `favicon.ico` clásico: no se generó por falta de herramienta local; los navegadores modernos usan `favicon.svg` + PNG.

## Licencia y créditos

Propiedad de Singular Technology Group SpA — Santiago, Chile.
