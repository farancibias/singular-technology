/**
 * Backend del formulario de contacto — Singular Technology Group
 * Recibe el POST desde index.html y envía el mensaje por Gmail.
 *
 * ─────────────────────────────────────────────────────────────
 * CÓMO DESPLEGAR (una sola vez, ~5 min):
 * ─────────────────────────────────────────────────────────────
 * 1. Entra a https://script.google.com  con la cuenta Google que
 *    debe ENVIAR/RECIBIR los correos (ej. la cuenta de contacto).
 * 2. "Nuevo proyecto" → borra el contenido y pega TODO este archivo.
 * 3. Ajusta la constante DESTINO de abajo si quieres otro correo.
 * 4. Implementar → Nueva implementación → tipo "Aplicación web".
 *       - Ejecutar como:  Yo (tu cuenta)
 *       - Quién tiene acceso:  Cualquier persona
 *    Autoriza los permisos que pide (enviar correo en tu nombre).
 * 5. Copia la "URL de la aplicación web" (termina en /exec) y pégala
 *    en index.html, en la constante ENDPOINT del <script> del formulario.
 * 6. Cada vez que cambies este código, crea una "Nueva versión" en
 *    Implementar → Administrar implementaciones (la URL /exec se mantiene).
 * ─────────────────────────────────────────────────────────────
 */

// Correo(s) que reciben los mensajes. Separa varios con coma.
var DESTINO = "contacto@singulargroup.net";

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    // Honeypot anti-spam: si el campo oculto viene relleno, es un bot.
    if (p.website) {
      return json({ ok: true, skipped: true });
    }

    var nombre  = (p.nombre  || "").toString().trim();
    var email   = (p.email   || "").toString().trim();
    var empresa = (p.empresa || "").toString().trim();
    var area    = (p.area    || "").toString().trim();
    var mensaje = (p.mensaje || "").toString().trim();

    if (!nombre || !email || !mensaje) {
      return json({ ok: false, error: "Faltan campos obligatorios." });
    }

    var asunto = "Nuevo contacto web · " + nombre + (empresa ? " (" + empresa + ")" : "");

    var cuerpo =
      "Nuevo mensaje desde www.singulartechnology.cl\n" +
      "──────────────────────────────────────────\n\n" +
      "Nombre:   " + nombre + "\n" +
      "Empresa:  " + (empresa || "—") + "\n" +
      "Correo:   " + email + "\n" +
      "Interés:  " + (area || "—") + "\n\n" +
      "Mensaje:\n" + mensaje + "\n\n" +
      "──────────────────────────────────────────\n" +
      "Enviado: " + new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });

    MailApp.sendEmail({
      to: DESTINO,
      subject: asunto,
      body: cuerpo,
      replyTo: email,        // responder va directo al remitente
      name: "Formulario web · Singular Technology"
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Respuesta simple para probar la URL en el navegador (GET).
function doGet() {
  return ContentService
    .createTextOutput("Singular Technology · endpoint del formulario activo.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
