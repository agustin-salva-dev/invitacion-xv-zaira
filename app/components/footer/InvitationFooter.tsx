import type { ModalId } from "@/app/types/invitation";

interface InvitationFooterProps {
  readonly honoree: string;
  readonly subtitle: string;
  readonly onOpenModal: (id: ModalId) => void;
}

export function InvitationFooter({
  honoree,
  subtitle,
  onOpenModal,
}: InvitationFooterProps) {
  return (
    <>
      <section className="footer footer-section">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col-brand">
              <div className="col-nombres-footer">
                <div className="nombres">
                  <span>{honoree}</span>
                </div>
                <p className="subtitulo">{subtitle}</p>
              </div>
            </div>

            <div className="footer-col-links">
              <div className="col-acciones-footer">
                <ul>
                  <li>
                    <button
                      type="button"
                      className="link-footer"
                      onClick={() => onOpenModal("rsvp")}
                    >
                      Confirmar asistencia
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="link-footer"
                      onClick={() => onOpenModal("song")}
                    >
                      Sugerir canción
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="link-footer"
                      onClick={() => onOpenModal("map")}
                    >
                      ¿Cómo llegar?
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="firma-footer">
        <div className="sombra-horizontal sombra-top" aria-hidden="true" />
        <div className="container">
          <div className="row justify-center">
            <div className="col-md-12">
              <p className="firma-texto">
                Hecho con{" "}
                <span className="heart" aria-label="amor">
                  ♥
                </span>{" "}
                para este día especial
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
