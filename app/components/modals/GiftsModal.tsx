import { FacadeModalWrapper } from "./FacadeModalWrapper";

interface GiftsModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function GiftsModal({ isOpen, onClose }: GiftsModalProps) {
  return (
    <FacadeModalWrapper
      id="gifts"
      isOpen={isOpen}
      onClose={onClose}
      title="Regalos"
      iconSrc="/assets/svg/img_circuloRegalo.svg"
    >
      <div className="modal-info-content">
        <p className="modal-info-text">
          Si deseás hacerme un regalo, podés hacerlo a través de:
        </p>
        <div className="modal-gift-option">
          <h6>Sobre en el evento</h6>
          <p>Entregarlo personalmente durante la celebración</p>
        </div>
        <div className="modal-gift-option">
          <h6>Transferencia bancaria</h6>
          <p>Los datos estarán disponibles próximamente</p>
        </div>
      </div>
      <div className="facade-modal-footer">
        <button type="button" className="boton" onClick={onClose}>
          Entendido
        </button>
      </div>
    </FacadeModalWrapper>
  );
}

