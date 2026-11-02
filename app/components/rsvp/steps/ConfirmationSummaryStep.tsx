"use client";

/**
 * Paso 3 del wizard RSVP: Resumen de confirmación.
 * Muestra todos los datos ingresados para que el usuario verifique antes de confirmar.
 * Responsabilidad única: presentar el resumen y solicitar confirmación final.
 */

import type { GuestData } from "@/app/lib/validations/rsvpSchema";

interface ConfirmationSummaryStepProps {
  readonly primaryGuest: GuestData;
  readonly companions: readonly GuestData[];
  readonly globalError?: string;
  readonly isSubmitting: boolean;
  readonly onConfirm: () => void;
  readonly onBack: () => void;
}

interface GuestCardProps {
  readonly guest: GuestData;
  readonly label: string;
  readonly isHighlighted?: boolean;
}

function GuestCard({ guest, label, isHighlighted = false }: GuestCardProps) {
  return (
    <div className={`rsvp-summary-card${isHighlighted ? " rsvp-summary-card-primary" : ""}`}>
      <span className="rsvp-summary-card-label">{label}</span>
      <p className="rsvp-summary-card-name">
        {guest.firstName} {guest.lastName}
      </p>
      <p className="rsvp-summary-card-dni">DNI: {guest.dni}</p>
    </div>
  );
}

export function ConfirmationSummaryStep({
  primaryGuest,
  companions,
  globalError,
  isSubmitting,
  onConfirm,
  onBack,
}: ConfirmationSummaryStepProps) {
  const hasCompanions = companions.length > 0;

  return (
    <div className="rsvp-step rsvp-step-summary">
      {/* Texto de confirmación principal */}
      <div className="rsvp-summary-header">
        <p className="rsvp-summary-question">
          ¿Confirmás la asistencia de{" "}
          <strong>
            {primaryGuest.firstName} {primaryGuest.lastName}
          </strong>
          {hasCompanions && (
            <>
              {" "}y{" "}
              <strong>
                {companions.length}{" "}
                {companions.length === 1 ? "acompañante" : "acompañantes"}
              </strong>
            </>
          )}
          ?
        </p>
      </div>

      {/* Listado de invitados */}
      <div className="rsvp-summary-list">
        <GuestCard
          guest={primaryGuest}
          label="Titular"
          isHighlighted
        />
        {companions.map((companion, index) => (
          <GuestCard
            key={`${companion.dni}-${index}`}
            guest={companion}
            label={`Acompañante ${index + 1}`}
          />
        ))}
      </div>

      {/* Error global si hubo un problema en el envío */}
      {globalError && (
        <p className="rsvp-summary-error" role="alert">
          {globalError}
        </p>
      )}

      <div className="rsvp-step-actions rsvp-step-actions-two">
        <button
          type="button"
          className="boton boton-secondary"
          onClick={onBack}
          disabled={isSubmitting}
        >
          ← Modificar datos
        </button>
        <button
          type="button"
          className="boton"
          onClick={onConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Confirmando..." : "Sí, confirmar asistencia ✓"}
        </button>
      </div>
    </div>
  );
}

