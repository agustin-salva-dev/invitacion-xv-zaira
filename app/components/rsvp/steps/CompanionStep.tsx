"use client";

/**
 * Paso 2 del wizard RSVP: Datos de cada acompañante individual.
 * Se renderiza una vez por cada acompañante (sub-paso automático).
 * Responsabilidad única: capturar y validar datos de un acompañante.
 */

import { useState, useCallback } from "react";
import { guestSchema } from "@/app/lib/validations/rsvpSchema";
import type { GuestData } from "@/app/lib/validations/rsvpSchema";
import { RsvpField } from "@/app/components/rsvp/RsvpField";

interface CompanionStepProps {
  readonly companionIndex: number;   // 0-based (se muestra como índice + 1)
  readonly totalCompanions: number;
  readonly onSubmit: (data: GuestData) => void;
  readonly onBack: () => void;
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

export function CompanionStep({
  companionIndex,
  totalCompanions,
  onSubmit,
  onBack,
}: CompanionStepProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

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
        if (errors[field as keyof FormErrors]) {
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

    onSubmit(result.data);
  }, [form, validateField, onSubmit]);

  const displayNumber = companionIndex + 1;
  const isLast = displayNumber === totalCompanions;

  return (
    <div className="rsvp-step">
      <div className="rsvp-companion-progress">
        <span className="rsvp-companion-badge">
          Acompañante {displayNumber} de {totalCompanions}
        </span>
        <div className="rsvp-progress-dots">
          {Array.from({ length: totalCompanions }, (_, i) => (
            <span
              key={i}
              className={`rsvp-progress-dot${i === companionIndex ? " active" : i < companionIndex ? " done" : ""}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <p className="rsvp-step-hint">
        Ingresá los datos de tu acompañante {displayNumber}
      </p>

      <RsvpField
        id={`companion-${companionIndex}-firstName`}
        label="Nombre"
        value={form.firstName}
        placeholder="Ej: Lucas"
        error={errors.firstName}
        autoComplete="off"
        onChange={handleChange("firstName")}
        onBlur={handleBlur("firstName")}
      />

      <RsvpField
        id={`companion-${companionIndex}-lastName`}
        label="Apellido"
        value={form.lastName}
        placeholder="Ej: Rodríguez"
        error={errors.lastName}
        autoComplete="off"
        onChange={handleChange("lastName")}
        onBlur={handleBlur("lastName")}
      />

      <RsvpField
        id={`companion-${companionIndex}-dni`}
        label="DNI"
        value={form.dni}
        placeholder="Ej: 40123456"
        error={errors.dni}
        inputMode="numeric"
        autoComplete="off"
        onChange={handleChange("dni")}
        onBlur={handleBlur("dni")}
      />

      <div className="rsvp-step-actions rsvp-step-actions-two">
        <button
          type="button"
          className="boton boton-secondary"
          onClick={onBack}
        >
          ← Atrás
        </button>
        <button type="button" className="boton" onClick={handleSubmit}>
          {isLast ? "Revisar confirmación →" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
}
