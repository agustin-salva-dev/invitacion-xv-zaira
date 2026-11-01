import { FacadeModalWrapper } from "./FacadeModalWrapper";

interface RsvpModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  return (
    <FacadeModalWrapper
      id="rsvp"
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Asistencia"
    >
      <div className="modal-rsvp-content">
        <p className="modal-info-text">
          Próximamente podrás confirmar tu asistencia aquí.
        </p>
        <p className="modal-info-text">
          Mientras tanto, podés comunicarte directamente con nosotros.
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

