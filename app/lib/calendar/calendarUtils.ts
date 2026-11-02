/**
 * Utilidades para generar links de Google Calendar y archivos .ics (Apple Calendar / iCal).
 * Estándar RFC 5545 para archivos iCalendar.
 * Sin dependencias externas — cálculo de fechas puro.
 */

import type { EventSchedule } from "@/app/types/invitation";

// -----------------------------------------------------------------------
// Helpers internos de formateo de fechas
// -----------------------------------------------------------------------

/**
 * Convierte una fecha ISO 8601 a formato compacto UTC para Google Calendar.
 * Ejemplo: "2027-06-15T19:00:00" → "20270615T190000Z"
 */
function toGoogleDateFormat(isoString: string): string {
  const date = new Date(isoString);
  const pad = (n: number): string => String(n).padStart(2, "0");
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

/**
 * Convierte una fecha ISO 8601 a formato compacto local para iCalendar (RFC 5545).
 * Ejemplo: "2027-06-15T19:00:00" → "20270615T190000"
 */
function toIcsDateFormat(isoString: string): string {
  return isoString.replace(/[-:]/g, "").replace("T", "T").slice(0, 15);
}

/**
 * Agrega horas a una fecha ISO 8601 y retorna el resultado en formato ISO.
 */
function addHours(isoString: string, hours: number): string {
  const date = new Date(isoString);
  date.setHours(date.getHours() + hours);
  return date.toISOString().slice(0, 19);
}

// -----------------------------------------------------------------------
// Google Calendar
// -----------------------------------------------------------------------

export interface GoogleCalendarParams {
  readonly startDate: string;    // ISO 8601
  readonly endDate: string;      // ISO 8601
  readonly title: string;
  readonly details: string;
  readonly location: string;
}

/**
 * Construye la URL de Google Calendar para agendar un evento directamente.
 * Abre la interfaz de creación de evento pre-completada con los datos del evento.
 */
export function buildGoogleCalendarUrl(event: EventSchedule, honoree: string): string {
  const endDate = addHours(event.startIso, 6);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `XV Años de ${honoree}`,
    dates: `${toGoogleDateFormat(event.startIso)}/${toGoogleDateFormat(endDate)}`,
    details: `¡Estás invitado/a a celebrar los XV Años de ${honoree}! Una noche mágica e inolvidable.`,
    location: `${event.venue}, ${event.address}`,
    sf: "true",
    output: "xml",
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}

// -----------------------------------------------------------------------
// Apple Calendar / iCal (RFC 5545)
// -----------------------------------------------------------------------

/**
 * Genera y descarga un archivo .ics compatible con Apple Calendar, Outlook y otros clientes iCal.
 * Usa la API nativa del navegador (Blob + URL.createObjectURL).
 */
export function downloadIcsFile(event: EventSchedule, honoree: string): void {
  const endDate = addHours(event.startIso, 6);
  const uid = `${Date.now()}-zaira-xv@invitacion`;
  const now = toGoogleDateFormat(new Date().toISOString());

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//Invitacion ${honoree}//XV Años//ES`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${toIcsDateFormat(event.startIso)}`,
    `DTEND:${toIcsDateFormat(endDate)}`,
    `SUMMARY:XV Años de ${honoree}`,
    `DESCRIPTION:¡Estás invitado/a a celebrar los XV Años de ${honoree}!\\nUna noche mágica e inolvidable.`,
    `LOCATION:${event.venue}\\, ${event.address}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `XV-Anos-${honoree}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Liberar la URL de objeto para no generar memory leaks
  URL.revokeObjectURL(url);
}

