"use client";

/**
 * Modal de ubicación del evento con iframe de Google Maps embebido.
 * Muestra el mapa, el nombre del salón y la dirección.
 * Responsabilidad única: presentar la información de cómo llegar al evento.
 */

import { FacadeModalWrapper } from "./FacadeModalWrapper";

interface MapModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly venue: string;
  readonly address: string;
  readonly mapsUrl: string;
  readonly mapsEmbedUrl: string;
}

export function MapModal({
  isOpen,
  onClose,
  venue,
  address,
  mapsUrl,
  mapsEmbedUrl,
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
        <p className="modal-venue-address">📍 {address}</p>

        {/* Iframe de Google Maps embebido */}
        <div className="modal-map-iframe-wrapper">
          <iframe
            src={mapsEmbedUrl}
            title={`Mapa de ${venue}`}
            className="modal-map-iframe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            aria-label={`Mapa de ubicación de ${venue}`}
          />
        </div>
      </div>

      <div className="facade-modal-footer">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="boton"
        >
          Abrir en Google Maps →
        </a>
      </div>
    </FacadeModalWrapper>
  );
}
