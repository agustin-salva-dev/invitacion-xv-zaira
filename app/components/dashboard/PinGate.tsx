"use client";

/**
 * Formulario de acceso con PIN al Dashboard.
 * Valida el PIN contra la variable de entorno NEXT_PUBLIC_DASHBOARD_PIN.
 * En móvil, muestra un teclado numérico accesible.
 */

import { useState, useCallback } from "react";
import { Lock } from "lucide-react";

interface PinGateProps {
  readonly onSuccess: () => void;
  readonly expectedPin: string;
}

export function PinGate({ onSuccess, expectedPin }: PinGateProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = useCallback(() => {
    if (pin === expectedPin) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => {
        setShake(false);
        setError(false);
      }, 600);
    }
  }, [pin, expectedPin, onSuccess]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSubmit();
    },
    [handleSubmit],
  );

  return (
    <div className="pin-gate-backdrop">
      <div className={`pin-gate-card${shake ? " pin-shake" : ""}`}>
        <div className="pin-gate-icon" aria-hidden="true">
          <Lock size={32} />
        </div>
        <h1 className="pin-gate-title">Zaira XV</h1>
        <p className="pin-gate-subtitle">Panel de Control</p>
        <p className="pin-gate-hint">Ingresá el PIN de acceso</p>

        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={8}
          className={`pin-gate-input${error ? " pin-input-error" : ""}`}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          onKeyDown={handleKeyDown}
          placeholder="••••"
          aria-label="PIN de acceso"
          autoFocus
        />

        {error && (
          <p className="pin-gate-error" role="alert">
            PIN incorrecto. Intentá de nuevo.
          </p>
        )}

        <button
          type="button"
          className="pin-gate-btn"
          onClick={handleSubmit}
          disabled={pin.length === 0}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}

