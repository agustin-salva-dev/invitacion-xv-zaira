import { FacadeModalWrapper } from "./FacadeModalWrapper";

interface MapModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly venue: string;
  readonly address: string;
  readonly mapsUrl: string;
}

export function MapModal({
  isOpen,
  onClose,
  venue,
  address,
  mapsUrl,
}: MapModalProps) {
  return (
    <FacadeModalWrapper
      id="map"
      isOpen={isOpen}
      onClose={onClose}
      title="¿Cómo llegar?"
      iconSrc="/assets/svg/ubicacion.svg"
    >
      <div className="modal-map-content">
        <p className="modal-venue-name">{venue}</p>
        <p className="modal-venue-address">{address}</p>
        <div className="modal-map-placeholder" aria-label="Mapa de ubicación">
          <p className="map-placeholder-text">📍 {venue}</p>
          <p className="map-placeholder-address">{address}</p>
        </div>
      </div>
      <div className="facade-modal-footer">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="boton"
        >
          Abrir en Google Maps
        </a>
      </div>
    </FacadeModalWrapper>
  );
}

