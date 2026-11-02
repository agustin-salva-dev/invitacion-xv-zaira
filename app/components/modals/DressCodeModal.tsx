"use client";

/**
 * Modal informativo de Dress Code para los XV Años de Zaira.
 * Dress code: Elegante Sport (estilo argentino).
 */

import { FacadeModalWrapper } from "./FacadeModalWrapper";

interface DressCodeModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function DressCodeModal({ isOpen, onClose }: DressCodeModalProps) {
  return (
    <FacadeModalWrapper
      id="dressCode"
      isOpen={isOpen}
      onClose={onClose}
      title="Dress Code"
      iconSrc="/assets/svg/vestuario.svg"
    >
      <div className="modal-info-content">
        <p className="modal-info-text">
          El dress code para esta noche especial es <strong>Elegante Sport</strong>.
        </p>
        <p className="modal-info-text">
          Te invitamos a elegir un look que combine elegancia y comodidad para disfrutar
          y celebrar juntos esta noche mágica.
        </p>
      </div>

      <div className="facade-modal-footer">
        <button type="button" className="boton" onClick={onClose}>
          Entendido
        </button>
      </div>
    </FacadeModalWrapper>
  );
}
