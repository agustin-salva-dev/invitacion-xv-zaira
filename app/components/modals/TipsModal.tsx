"use client";

/**
 * Modal de Tips y Notas para los XV Años de Zaira.
 * Información útil para los invitados: horario, confirmación y cierre temático.
 */

import { FacadeModalWrapper } from "./FacadeModalWrapper";

interface TipsModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function TipsModal({ isOpen, onClose }: TipsModalProps) {
  return (
    <FacadeModalWrapper
      id="tips"
      isOpen={isOpen}
      onClose={onClose}
      title="Tips y Notas"
      iconSrc="/assets/svg/tips.svg"
    >
      <div className="modal-info-content">
        <ul className="modal-info-list">
          <li>
            🕗 El evento comienza a las <strong>20hs</strong> — te pedimos
            puntualidad para que todos podamos disfrutar cada momento desde el
            principio
          </li>
          <li>
            📅 Se solicita confirmar asistencia antes del{" "}
            <strong>5 de Noviembre</strong>
          </li>
        </ul>
      </div>

      <div className="facade-modal-footer mt-2">
        <button type="button" className="boton" onClick={onClose}>
          ¡Nos vemos!
        </button>
      </div>
    </FacadeModalWrapper>
  );
}
