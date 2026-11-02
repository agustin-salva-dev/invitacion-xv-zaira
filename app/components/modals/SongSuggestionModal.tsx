"use client";

/**
 * Modal para sugerir una canción para la playlist de la fiesta.
 * Incluye validación con Zod (songSuggestionSchema) y feedback de éxito.
 * La persistencia en DB se conectará al implementar la API Route con Prisma.
 */

import { useState, useCallback } from "react";
import { FacadeModalWrapper } from "./FacadeModalWrapper";
import { songSuggestionSchema } from "@/app/lib/validations/rsvpSchema";
import type { SongSuggestionData } from "@/app/lib/validations/rsvpSchema";
import { submitSongSuggestion } from "@/app/actions/songActions";

interface SongSuggestionModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

interface FormState {
  guestName: string;
  songTitle: string;
  link: string;
}

interface FormErrors {
  guestName?: string;
  songTitle?: string;
  link?: string;
}

const EMPTY_FORM: FormState = { guestName: "", songTitle: "", link: "" };

type ModalView = "form" | "success";

export function SongSuggestionModal({ isOpen, onClose }: SongSuggestionModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [view, setView] = useState<ModalView>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = useCallback(() => {
    // Resetear al cerrar para una experiencia limpia si se vuelve a abrir
    setForm(EMPTY_FORM);
    setErrors({});
    setView("form");
    setIsSubmitting(false);
    onClose();
  }, [onClose]);

  const validateField = useCallback(
    (field: keyof FormState, value: string): string | undefined => {
      if (field === "link") {
        const result = songSuggestionSchema.shape.link.safeParse(value.trim() || undefined);
        return result.success ? undefined : result.error.issues[0]?.message;
      }
      const result = songSuggestionSchema.shape[field].safeParse(value.trim());
      return result.success ? undefined : result.error.issues[0]?.message;
    },
    [],
  );

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
        // Limpiar error del campo al escribir
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
    [errors],
  );

  const handleBlur = useCallback(
    (field: keyof FormState) => () => {
      const error = validateField(field, form[field]);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [form, validateField],
  );

  const handleSubmit = useCallback(async () => {
    const payload: SongSuggestionData = {
      guestName: form.guestName,
      songTitle: form.songTitle,
      link: form.link.trim() || undefined,
    };

    const result = songSuggestionSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof FormErrors | undefined;
        if (path) fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const actionResult = await submitSongSuggestion(result.data);
      if (!actionResult.success) {
        setErrors({ songTitle: actionResult.error ?? "Error al enviar." });
        return;
      }
      setView("success");
    } catch {
      setErrors({ songTitle: "Ocurrió un error al enviar. Intentá de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

  return (
    <FacadeModalWrapper
      id="song"
      isOpen={isOpen}
      onClose={handleClose}
      title="Sugerir Canción"
      iconSrc="/assets/svg/img_circuloCanciones.svg"
    >
      {view === "form" ? (
        <>
          <div className="modal-form-content">
            <p className="modal-info-text">
              ¿Cuál es la canción que no puede faltar en la noche de Zaira?
            </p>

            {/* Campo: nombre */}
            <div className="form-group">
              <label htmlFor="song-guestName" className="rsvp-field-label">
                Tu nombre
              </label>
              <input
                id="song-guestName"
                type="text"
                className={`form-control rsvp-input${errors.guestName ? " rsvp-input-error" : ""}`}
                placeholder="Ej: Lucía"
                value={form.guestName}
                onChange={handleChange("guestName")}
                onBlur={handleBlur("guestName")}
                autoComplete="given-name"
                aria-describedby={errors.guestName ? "song-guestName-error" : undefined}
                aria-invalid={!!errors.guestName}
              />
              {errors.guestName && (
                <span id="song-guestName-error" className="rsvp-field-error" role="alert">
                  {errors.guestName}
                </span>
              )}
            </div>

            {/* Campo: canción y artista */}
            <div className="form-group">
              <label htmlFor="song-title" className="rsvp-field-label">
                Canción y artista
              </label>
              <input
                id="song-title"
                type="text"
                className={`form-control rsvp-input${errors.songTitle ? " rsvp-input-error" : ""}`}
                placeholder="Ej: Flowers – Miley Cyrus"
                value={form.songTitle}
                onChange={handleChange("songTitle")}
                onBlur={handleBlur("songTitle")}
                autoComplete="off"
                aria-describedby={errors.songTitle ? "song-title-error" : undefined}
                aria-invalid={!!errors.songTitle}
              />
              {errors.songTitle && (
                <span id="song-title-error" className="rsvp-field-error" role="alert">
                  {errors.songTitle}
                </span>
              )}
            </div>

            {/* Campo: link opcional */}
            <div className="form-group">
              <label htmlFor="song-link" className="rsvp-field-label">
                Link <span className="song-optional-label">(opcional)</span>
              </label>
              <input
                id="song-link"
                type="url"
                inputMode="url"
                className={`form-control rsvp-input${errors.link ? " rsvp-input-error" : ""}`}
                placeholder="YouTube, Spotify, etc."
                value={form.link}
                onChange={handleChange("link")}
                onBlur={handleBlur("link")}
                autoComplete="off"
                aria-describedby={errors.link ? "song-link-error" : undefined}
                aria-invalid={!!errors.link}
              />
              {errors.link && (
                <span id="song-link-error" className="rsvp-field-error" role="alert">
                  {errors.link}
                </span>
              )}
            </div>
          </div>

          <div className="facade-modal-footer">
            <button
              type="button"
              className="boton"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "🎵 Sugerir canción"}
            </button>
          </div>
        </>
      ) : (
        /* Vista de éxito */
        <div className="rsvp-step rsvp-step-success">
          <div className="rsvp-success-icon" aria-hidden="true">🎶</div>
          <h3 className="rsvp-success-title">¡Gracias por la sugerencia!</h3>
          <p className="rsvp-success-message">
            Tu canción fue agregada a la lista. ¡Nos vemos en la pista! 🕺
          </p>
          <div className="rsvp-step-actions">
            <button type="button" className="boton" onClick={handleClose}>
              ¡Perfecto!
            </button>
          </div>
        </div>
      )}
    </FacadeModalWrapper>
  );
}
