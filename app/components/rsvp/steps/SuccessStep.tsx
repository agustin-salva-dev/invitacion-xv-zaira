"use client";

/**
 * Paso 4 del wizard RSVP: Feedback de éxito tras confirmar asistencia.
 * Responsabilidad única: comunicar al usuario que la confirmación fue exitosa.
 */

interface SuccessStepProps {
  readonly honoree: string;
  readonly guestName: string;
  readonly onClose: () => void;
}

export function SuccessStep({ honoree, guestName, onClose }: SuccessStepProps) {
  return (
    <div className="rsvp-step rsvp-step-success">
      <div className="rsvp-success-icon" aria-hidden="true">
        🎉
      </div>
      <h3 className="rsvp-success-title">¡Asistencia confirmada!</h3>
      <p className="rsvp-success-message">
        ¡Gracias, <strong>{guestName}</strong>! Tu asistencia a los XV Años de{" "}
        <strong>{honoree}</strong> ha sido registrada con éxito.
      </p>
      <p className="rsvp-success-submessage">
        Nos vemos el <strong>14 de noviembre de 2026</strong> para celebrar juntos. 🌸
      </p>
      <div className="rsvp-step-actions">
        <button type="button" className="boton" onClick={onClose}>
          ¡Hasta pronto!
        </button>
      </div>
    </div>
  );
}

