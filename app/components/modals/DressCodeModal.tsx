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
          Para esta celebración tan especial, te pedimos que vengas elegante.
        </p>
        <ul className="modal-info-list">
          <li>Damas: vestidos o conjuntos elegantes</li>
          <li>Caballeros: traje o camisa con pantalón de vestir</li>
          <li>Por favor evitar el color blanco</li>
        </ul>
      </div>
      <div className="facade-modal-footer">
        <button type="button" className="boton" onClick={onClose}>
          Entendido
        </button>
      </div>
    </FacadeModalWrapper>
  );
}

