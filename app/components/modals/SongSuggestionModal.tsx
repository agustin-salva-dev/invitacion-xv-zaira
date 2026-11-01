import { FacadeModalWrapper } from "./FacadeModalWrapper";

interface SongSuggestionModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function SongSuggestionModal({
  isOpen,
  onClose,
}: SongSuggestionModalProps) {
  return (
    <FacadeModalWrapper
      id="song"
      isOpen={isOpen}
      onClose={onClose}
      title="Sugerir Canción"
      iconSrc="/assets/svg/img_circuloCanciones.svg"
    >
      <div className="modal-form-content">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tu nombre"
            disabled
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de canción y autor"
            disabled
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Link de YouTube, Spotify, etc. (opcional)"
            disabled
          />
        </div>
        <p className="modal-info-hint">La sugerencia de canciones estará disponible próximamente.</p>
      </div>
      <div className="facade-modal-footer">
        <button type="button" className="boton" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </FacadeModalWrapper>
  );
}

