/**
 * Esquemas de validación Zod para el formulario de confirmación de asistencia (RSVP)
 * y para la sugerencia de canciones de la fiesta.
 * Validación estricta de DNI argentino, nombre y apellido con expresiones regulares.
 * Sin uso de `any` — tipado 100% explícito.
 */

import { z } from "zod";

// -----------------------------------------------------------------------
// Regex de validación
// Solo letras (con tildes, diéresis, ñ y espacios simples internos)
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;
// DNI argentino: 7 u 8 dígitos numéricos sin puntos ni guiones
const DNI_REGEX = /^\d{7,8}$/;
// -----------------------------------------------------------------------

/**
 * Schema para un invitado (titular o acompañante).
 * Campos: firstName, lastName, dni.
 */
export const guestSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar 50 caracteres")
    .regex(NAME_REGEX, "El nombre solo puede contener letras y espacios simples"),

  lastName: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede superar 50 caracteres")
    .regex(NAME_REGEX, "El apellido solo puede contener letras y espacios simples"),

  dni: z
    .string()
    .trim()
    .transform((val) => val.replace(/[.\-\s]/g, "")) // Elimina puntos, guiones y espacios
    .pipe(
      z.string().regex(DNI_REGEX, "El DNI debe contener 7 u 8 dígitos numéricos sin puntos"),
    ),
});

/**
 * Schema completo del formulario RSVP.
 * Incluye validación de unicidad de DNIs entre titular y acompañantes.
 */
export const rsvpFormSchema = z
  .object({
    primaryGuest: guestSchema,
    companionCount: z.number().int().min(0, "Debe haber al menos 0 acompañantes"),
    companions: z.array(guestSchema),
  })
  .refine(
    (data) => {
      if (data.companions.length === 0) return true;
      const allDnis = [data.primaryGuest.dni, ...data.companions.map((c) => c.dni)];
      return new Set(allDnis).size === allDnis.length;
    },
    {
      message: "No se pueden ingresar DNIs repetidos entre los invitados",
      path: ["companions"],
    },
  );

// -----------------------------------------------------------------------
// Tipos derivados del schema para uso en componentes
// -----------------------------------------------------------------------

/** Datos de un único invitado (titular o acompañante) */
export type GuestData = z.infer<typeof guestSchema>;

/** Estado completo del formulario RSVP */
export type RsvpFormData = z.infer<typeof rsvpFormSchema>;

/** Datos del invitado antes de transformación (input crudo del formulario) */
export type RsvpFormInput = z.input<typeof rsvpFormSchema>;

// -----------------------------------------------------------------------
// Schema de Sugerencia de Canción
// -----------------------------------------------------------------------

// URL válida para links opcionales (YouTube, Spotify, etc.)
const URL_REGEX = /^https?:\/\/.+/;

/**
 * Schema para la sugerencia de una canción.
 * Campos: guestName (nombre de quien sugiere), songTitle (canción + artista), link (opcional).
 */
export const songSuggestionSchema = z.object({
  guestName: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar 100 caracteres"),

  songTitle: z
    .string()
    .trim()
    .min(2, "Ingresá el nombre de la canción y el artista")
    .max(200, "El nombre de la canción no puede superar 200 caracteres"),

  link: z
    .string()
    .trim()
    .max(500, "El link no puede superar 500 caracteres")
    .refine(
      (val) => val === "" || URL_REGEX.test(val),
      "El link debe comenzar con http:// o https://",
    )
    .optional()
    .or(z.literal("")),
});

/** Datos de la sugerencia de canción */
export type SongSuggestionData = z.infer<typeof songSuggestionSchema>;

