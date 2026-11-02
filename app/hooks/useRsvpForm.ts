"use client";

/**
 * Hook que gestiona el estado completo del wizard multi-step de confirmación de asistencia.
 * Responsabilidad única: máquina de estados del formulario RSVP.
 * No contiene lógica de UI ni de persistencia.
 */

import { useState, useCallback } from "react";
import { guestSchema, rsvpFormSchema } from "@/app/lib/validations/rsvpSchema";
import type { GuestData, RsvpFormData } from "@/app/lib/validations/rsvpSchema";
import { confirmAttendance } from "@/app/actions/rsvpActions";

// -----------------------------------------------------------------------
// Tipos del estado del wizard
// -----------------------------------------------------------------------

export type RsvpStep =
  | "primary"       // Paso 1: Datos del titular
  | "companion"     // Paso 2: Datos de acompañante actual (N sub-pasos)
  | "summary"       // Paso 3: Resumen de confirmación antes de enviar
  | "success";      // Paso 4: Feedback de éxito

export interface FieldErrors {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly dni?: string;
  readonly companions?: string;
}

export interface RsvpWizardState {
  readonly step: RsvpStep;
  readonly currentCompanionIndex: number; // Índice 0-based del acompañante siendo editado
  readonly primaryGuest: GuestData | null;
  readonly companionCount: number;
  readonly companions: readonly GuestData[];
  readonly errors: FieldErrors;
  readonly isSubmitting: boolean;
}

export interface UseRsvpFormReturn {
  readonly state: RsvpWizardState;
  readonly handlePrimaryGuestSubmit: (data: GuestData, count: number) => void;
  readonly handleCompanionSubmit: (data: GuestData) => void;
  readonly handleConfirm: () => Promise<void>;
  readonly handleReset: () => void;
  readonly handleBack: () => void;
  readonly validateGuestField: (field: keyof GuestData, value: string) => string | undefined;
}

// -----------------------------------------------------------------------
// Estado inicial limpio
// -----------------------------------------------------------------------

const INITIAL_STATE: RsvpWizardState = {
  step: "primary",
  currentCompanionIndex: 0,
  primaryGuest: null,
  companionCount: 0,
  companions: [],
  errors: {},
  isSubmitting: false,
};

// -----------------------------------------------------------------------
// Hook principal
// -----------------------------------------------------------------------

export function useRsvpForm(): UseRsvpFormReturn {
  const [state, setState] = useState<RsvpWizardState>(INITIAL_STATE);

  /**
   * Valida un campo individual de invitado en tiempo real.
   * Retorna el mensaje de error o undefined si es válido.
   */
  const validateGuestField = useCallback(
    (field: keyof GuestData, value: string): string | undefined => {
      const result = guestSchema.shape[field].safeParse(value.trim());
      if (!result.success) {
        return result.error.issues[0]?.message;
      }
      return undefined;
    },
    [],
  );

  /**
   * Completa el paso 1 (datos del titular) y define cuántos acompañantes habrá.
   * Si hay acompañantes, avanza al paso de acompañantes. Si no, va directo al resumen.
   */
  const handlePrimaryGuestSubmit = useCallback((data: GuestData, count: number) => {
    setState((prev) => ({
      ...prev,
      primaryGuest: data,
      companionCount: count,
      companions: [],
      currentCompanionIndex: 0,
      errors: {},
      step: count > 0 ? "companion" : "summary",
    }));
  }, []);

  /**
   * Completa el paso de un acompañante individual.
   * Si faltan más acompañantes, permanece en el paso "companion" incrementando el índice.
   * Cuando se completan todos, avanza al resumen.
   */
  const handleCompanionSubmit = useCallback((data: GuestData) => {
    setState((prev) => {
      const updatedCompanions = [...prev.companions, data];
      const nextIndex = prev.currentCompanionIndex + 1;
      const allDone = nextIndex >= prev.companionCount;

      return {
        ...prev,
        companions: updatedCompanions,
        currentCompanionIndex: nextIndex,
        errors: {},
        step: allDone ? "summary" : "companion",
      };
    });
  }, []);

  /**
   * Envía la confirmación final.
   * Por ahora simula el envío (mock). Cuando Neon esté listo, se reemplazará la llamada.
   */
  const handleConfirm = useCallback(async () => {
    if (!state.primaryGuest) return;

    const formData: RsvpFormData = {
      primaryGuest: state.primaryGuest,
      companionCount: state.companionCount,
      companions: [...state.companions],
    };

    // Validación final con el schema completo antes de enviar
    const result = rsvpFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0];
        if (path === "companions") {
          (fieldErrors as Record<string, string>).companions = issue.message;
        }
      }
      setState((prev) => ({ ...prev, errors: fieldErrors }));
      return;
    }

    setState((prev) => ({ ...prev, isSubmitting: true, errors: {} }));

    try {
      const actionResult = await confirmAttendance(result.data);

      if (!actionResult.success) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          errors: { companions: actionResult.error ?? "Error al confirmar." },
        }));
        return;
      }

      setState((prev) => ({ ...prev, isSubmitting: false, step: "success" }));
    } catch {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        errors: { companions: "Ocurrió un error al confirmar. Por favor intentá de nuevo." },
      }));
    }
  }, [state]);

  /**
   * Retrocede al paso anterior en el wizard.
   */
  const handleBack = useCallback(() => {
    setState((prev) => {
      if (prev.step === "summary" && prev.companionCount > 0) {
        // Volver al último acompañante ingresado y permitir re-edición
        return {
          ...prev,
          step: "companion",
          currentCompanionIndex: prev.companionCount - 1,
          companions: prev.companions.slice(0, -1),
          errors: {},
        };
      }
      if (prev.step === "summary" && prev.companionCount === 0) {
        return { ...prev, step: "primary", errors: {} };
      }
      if (prev.step === "companion" && prev.currentCompanionIndex === 0) {
        return { ...prev, step: "primary", errors: {} };
      }
      if (prev.step === "companion") {
        return {
          ...prev,
          currentCompanionIndex: prev.currentCompanionIndex - 1,
          companions: prev.companions.slice(0, -1),
          errors: {},
        };
      }
      return prev;
    });
  }, []);

  /**
   * Reinicia el wizard al estado inicial (para usar después del éxito o al cerrar).
   */
  const handleReset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    handlePrimaryGuestSubmit,
    handleCompanionSubmit,
    handleConfirm,
    handleReset,
    handleBack,
    validateGuestField,
  };
}
