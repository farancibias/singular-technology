# Instrucciones para Claude Code

Este proyecto es el sitio web corporativo de **Singular Technology Group** (filial de Singular Group). Está diseñado y terminado como una única página estática lista para publicar. **No requiere build, ni framework, ni dependencias.**

## Antes de tocar código, leer

1. **`README.md`** — descripción completa del proyecto, stack, secciones y pendientes.
2. **`PROMPT-CLAUDE-CODE.md`** — el prompt original de publicación con placeholders `⟪...⟫` para la configuración de infraestructura. El usuario debe completarlos antes de pedir el deploy.

## Reglas duras

- **NO agregar frameworks ni bundlers.** El sitio es intencionalmente un solo `index.html` con CSS y JS inline. No lo conviertas a React/Vue/Next/etc.
- **NO separar el CSS a un archivo externo.** Se dejó inline por portabilidad y para minimizar requests.
- **NO cambiar el diseño sin instrucción explícita.** Fue iterado con el cliente en múltiples rondas.
- **Idioma primario: español (Chile).** Todo copy en `es-CL`. Commits también en español.
- **Preservar la accesibilidad**: los `aria-label`, `alt`, `prefers-reduced-motion` ya están puestos; mantenerlos.

## Convenciones

- Commits imperativos y descriptivos en español: `Agrega meta tags SEO`, `Corrige alineación del hero en móvil`.
- Branch principal: `main`. Trabajo en feature branches cuando aplique.
- Comentarios de sección en el HTML usan el patrón `<!-- ============ NOMBRE ============ -->`; en CSS `/* ============ NOMBRE ============ */`.

## Estructura del `index.html`

Es un archivo largo (~50 KB) pero navegable. Anclas útiles:

- CSS por bloque: `RESET`, `NAV`, `HERO`, `TRUST STRIP`, `PARENT GROUP SECTION`, `SERVICES`, etc.
- Cada `<section>` tiene un `id` que coincide con el link del nav (`#grupo`, `#servicios`, `#tecnologias`, `#biometria`, `#nosotros`, `#contacto`).

## Tareas típicas y dónde tocarlas

| Tarea | Ubicación |
|---|---|
| Cambiar copy de una sección | Buscar el `<section id="...">` correspondiente |
| Ajustar colores | Bloque `:root { ... }` al inicio del `<style>` |
| Agregar/quitar una filial del grupo | `<div class="pg-siblings">` dentro de `.parent-group` |
| Editar cards de aliados tecnológicos | `<div class="products-grid">` dentro de `#tecnologias` |
| Cambiar animación del diagrama de red | SVG con clase `.net` dentro de `.hero-art`, y sus keyframes CSS `flow`, `spin`, `corePulse`, `nodeBreathe` |
| Modificar el formulario de contacto | `<form class="card">` dentro de `#contacto`. Es placeholder; conectar a backend real requiere endpoint. |
| Actualizar dirección/teléfono | Buscar los `.cline` dentro de `#contacto`, y también en el HTML del `.parent-group` si aplica |

## Fuera de scope hoy (pendientes documentados)

Ver el bloque "Pendientes conocidos" al final de `README.md`.

## Datos de contacto reales (para el usuario)

- Oficina: Av. Nueva Tajamar 555, WTC, Las Condes, Santiago, Chile
- Teléfono: +56 9 2390 0707
- Correo institucional: contacto@singulargroup.net
- Dominio raíz del grupo: singulargroup.net
- Subdominio de destino de este sitio: `www.singulartechnology.cl` (aún no configurado)
