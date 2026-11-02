"use client";

/**
 * Modal de confirmación de asistencia con wizard multi-step.
 * Orquesta los pasos del formulario RSVP usando useRsvpForm.
 * Responsabilidad única: alojar y coordinar el flujo del wizard dentro del modal.
 */

import { useEffect } from "react";
import { useRsvpForm } from "@/app/hooks/useRsvpForm";
import { PrimaryGuestStep } from "@/app/components/rsvp/steps/PrimaryGuestStep";
import { CompanionStep } from "@/app/components/rsvp/steps/CompanionStep";
import { ConfirmationSummaryStep } from "@/app/components/rsvp/steps/ConfirmationSummaryStep";
import { SuccessStep } from "@/app/components/rsvp/steps/SuccessStep";

interface RsvpModalProps {
  readonly isOpen: boolean;
  readonly honoree: string;
  readonly onClose: () => void;
}

/** Títulos del modal según el paso actual */
const STEP_TITLES: Record<string, string> = {
  primary: "Confirmar Asistencia",
  companion: "Datos del Acompañante",
  summary: "Revisar Confirmación",
  success: "¡Listo!",
};

export function RsvpModal({ isOpen, honoree, onClose }: RsvpModalProps) {
  const { state, handlePrimaryGuestSubmit, handleCompanionSubmit, handleConfirm, handleReset, handleBack } =
    useRsvpForm();

  // Resetear el wizard cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen, handleReset]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = STEP_TITLES[state.step] ?? "Confirmar Asistencia";

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <div
      className="facade-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-modal-title"
      onClick={handleClose}
    >
      <div
        className="facade-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="facade-modal-content rsvp-modal-content">
          {/* Header */}
          <div className="facade-modal-top">
            <button
              type="button"
              className="modal-close-btn"
              aria-label="Cerrar"
              onClick={handleClose}
            >
              &times;
            </button>
            {/* Icono decorativo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="modal-icon"
              src="/assets/svg/calendario.svg"
              alt=""
              aria-hidden="true"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <div className="facade-modal-header">
            <h5 id="rsvp-modal-title" className="modal-title">
              {title}
            </h5>
          </div>

          {/* Indicador de paso (excepto en success) */}
          {state.step !== "success" && (
            <div className="rsvp-step-indicator" aria-label="Progreso del formulario">
              {(["primary", "companion", "summary"] as const).map((stepKey, i) => {
                const steps = ["primary", "companion", "summary"] as const;
                const currentIdx = steps.indexOf(state.step as (typeof steps)[number]);
                return (
                  <span
                    key={stepKey}
                    className={`rsvp-step-dot${i === currentIdx ? " active" : i < currentIdx ? " done" : ""}`}
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          )}

          {/* Cuerpo del modal: paso activo */}
          <div className="facade-modal-body">
            {state.step === "primary" && (
              <PrimaryGuestStep onSubmit={handlePrimaryGuestSubmit} />
            )}

            {state.step === "companion" && (
              <CompanionStep
                key={state.currentCompanionIndex}
                companionIndex={state.currentCompanionIndex}
                totalCompanions={state.companionCount}
                onSubmit={handleCompanionSubmit}
                onBack={handleBack}
              />
            )}

            {state.step === "summary" && state.primaryGuest && (
              <ConfirmationSummaryStep
                primaryGuest={state.primaryGuest}
                companions={state.companions}
                globalError={state.errors.companions}
                isSubmitting={state.isSubmitting}
                onConfirm={handleConfirm}
                onBack={handleBack}
              />
            )}

            {state.step === "success" && state.primaryGuest && (
              <SuccessStep
                honoree={honoree}
                guestName={`${state.primaryGuest.firstName} ${state.primaryGuest.lastName}`}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
