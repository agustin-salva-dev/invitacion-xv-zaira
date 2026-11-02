"use client";

/**
 * Paso 1 del wizard RSVP: Datos del titular + selector de cantidad de acompañantes.
 * Responsabilidad única: recopilar y validar los datos del invitado principal.
 */

import { useState, useCallback } from "react";
import { guestSchema } from "@/app/lib/validations/rsvpSchema";
import type { GuestData } from "@/app/lib/validations/rsvpSchema";
import { RsvpField } from "@/app/components/rsvp/RsvpField";

interface PrimaryGuestStepProps {
  readonly onSubmit: (data: GuestData, companionCount: number) => void;
}

interface FormState {
  firstName: string;
  lastName: string;
  dni: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  dni?: string;
}

const EMPTY_FORM: FormState = { firstName: "", lastName: "", dni: "" };
const EMPTY_ERRORS: FormErrors = {};

export function PrimaryGuestStep({ onSubmit }: PrimaryGuestStepProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS);
  const [companionCount, setCompanionCount] = useState<number>(0);

  const validateField = useCallback(
    (field: keyof FormState, value: string): string | undefined => {
      const result = guestSchema.shape[field].safeParse(value.trim());
      return result.success ? undefined : result.error.issues[0]?.message;
    },
    [],
  );

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (value: string) => {
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

  const handleSubmit = useCallback(() => {
    const newErrors: FormErrors = {
      firstName: validateField("firstName", form.firstName),
      lastName: validateField("lastName", form.lastName),
      dni: validateField("dni", form.dni),
    };

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const result = guestSchema.safeParse(form);
    if (!result.success) return;

    onSubmit(result.data, companionCount);
  }, [form, companionCount, validateField, onSubmit]);

  return (
    <div className="rsvp-step">
      <p className="rsvp-step-hint">Ingresá tus datos para confirmar tu asistencia</p>

      <RsvpField
        id="primary-firstName"
        label="Nombre"
        value={form.firstName}
        placeholder="Ej: María"
        error={errors.firstName}
        autoComplete="given-name"
        onChange={handleChange("firstName")}
        onBlur={handleBlur("firstName")}
      />

      <RsvpField
        id="primary-lastName"
        label="Apellido"
        value={form.lastName}
        placeholder="Ej: González"
        error={errors.lastName}
        autoComplete="family-name"
        onChange={handleChange("lastName")}
        onBlur={handleBlur("lastName")}
      />

      <RsvpField
        id="primary-dni"
        label="DNI"
        value={form.dni}
        placeholder="Ej: 38456789"
        error={errors.dni}
        inputMode="numeric"
        autoComplete="off"
        onChange={handleChange("dni")}
        onBlur={handleBlur("dni")}
      />

      {/* Selector de acompañantes */}
      <div className="rsvp-companion-selector">
        <label className="rsvp-field-label">¿Cuántos acompañantes traés?</label>
        <div className="rsvp-counter">
          <button
            type="button"
            className="rsvp-counter-btn"
            onClick={() => setCompanionCount((n) => Math.max(0, n - 1))}
            aria-label="Reducir cantidad de acompañantes"
            disabled={companionCount === 0}
          >
            −
          </button>
          <span className="rsvp-counter-value" aria-live="polite">
            {companionCount}
          </span>
          <button
            type="button"
            className="rsvp-counter-btn"
            onClick={() => setCompanionCount((n) => n + 1)}
            aria-label="Aumentar cantidad de acompañantes"
          >
            +
          </button>
        </div>
        {companionCount > 0 && (
          <p className="rsvp-companion-hint">
            Completarás los datos de cada acompañante en el siguiente paso
          </p>
        )}
      </div>

      <div className="rsvp-step-actions">
        <button type="button" className="boton" onClick={handleSubmit}>
          {companionCount > 0 ? "Siguiente →" : "Revisar confirmación →"}
        </button>
      </div>
    </div>
  );
}
