"use client";

import type { UseMusicPlayerReturn } from "@/app/hooks/useMusicPlayer";

interface MusicEntranceModalProps {
  readonly honoree: string;
  readonly subtitle: string;
  readonly welcomeMessage: string;
  readonly musicPlayer: UseMusicPlayerReturn;
  readonly onEnter: () => void;
}

export function MusicEntranceModal({
  honoree,
  subtitle,
  welcomeMessage,
  musicPlayer,
  onEnter,
}: MusicEntranceModalProps) {
  const handleWithMusic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    musicPlayer.initialize();
    musicPlayer.play();
    onEnter();
  };

  const handleWithoutMusic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    musicPlayer.initialize();
    onEnter();
  };

  return (
    <div className="music-modal-backdrop" role="dialog" aria-modal="true">
      <div className="music-modal-dialog">
        <div className="music-modal-content">
          <div className="music-modal-body">
            <p className="music-modal-welcome">{welcomeMessage}</p>

            <div className="music-modal-names">
              <div className="nombres">
                <span>{honoree}</span>
              </div>
            </div>

            <p className="music-modal-subtitle">{subtitle}</p>

            <span className="music-modal-hint">
              La música de fondo es parte de la experiencia
            </span>

            <div className="music-modal-actions">
              <a
                className="boton"
                href="#"
                onClick={handleWithMusic}
              >
                Ingresar con música
              </a>
              <a
                className="boton boton-secondary"
                href="#"
                onClick={handleWithoutMusic}
              >
                Ingresar sin música
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

