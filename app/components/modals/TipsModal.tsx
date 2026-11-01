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
          <li>El evento comienza puntualmente a las 19hs</li>
          <li>Se solicita confirmar asistencia antes del 1 de Junio</li>
          <li>Habrá servicio de estacionamiento disponible</li>
          <li>El lugar es accesible para personas con movilidad reducida</li>
        </ul>
      </div>
      <div className="facade-modal-footer">
        <button type="button" className="boton" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </FacadeModalWrapper>
  );
}

