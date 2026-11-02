"use client";

/**
 * Componente de input de campo de formulario reutilizable para el wizard RSVP.
 * Responsabilidad única: mostrar un campo con label, input y mensaje de error.
 */

interface RsvpFieldProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly placeholder: string;
  readonly error?: string;
  readonly inputMode?: "text" | "numeric";
  readonly autoComplete?: string;
  readonly onChange: (value: string) => void;
  readonly onBlur?: () => void;
}

export function RsvpField({
  id,
  label,
  value,
  placeholder,
  error,
  inputMode = "text",
  autoComplete,
  onChange,
  onBlur,
}: RsvpFieldProps) {
  return (
    <div className="rsvp-field">
      <label htmlFor={id} className="rsvp-field-label">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`form-control rsvp-input${error ? " rsvp-input-error" : ""}`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span id={`${id}-error`} className="rsvp-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

