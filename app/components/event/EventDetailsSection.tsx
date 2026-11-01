import type { EventSchedule } from "@/app/types/invitation";
import type { ModalId } from "@/app/types/invitation";
import { LottiePlayer } from "@/app/components/common/LottiePlayer";
import {
  SectionDividerTop,
  SectionDividerBottom,
} from "@/app/components/common/SectionDividers";

interface EventDetailsSectionProps {
  readonly event: EventSchedule;
  readonly onOpenModal: (id: ModalId) => void;
}

export function EventDetailsSection({
  event,
  onOpenModal,
}: EventDetailsSectionProps) {
  return (
    <section className="ceremonia-fiesta section-border">
      <SectionDividerTop />

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-fiesta d-flex justify-content-center text-center">
            <div className="box-color-col fiesta-main-card-white">
              <LottiePlayer
                path="/assets/lottie/img_fiesta.json"
                className="anim-fiesta"
              />

              <h3>Fiesta</h3>

              <div className="info-col">
                <div className="info-box">
                  <h6>Día</h6>
                  <p>{event.date}</p>
                  <button
                    type="button"
                    className="boton"
                    onClick={() => onOpenModal("rsvp")}
                  >
                    Agendar
                  </button>
                </div>

                <div className="info-box">
                  <h6>Lugar</h6>
                  <p>{event.venue}</p>
                  <button
                    type="button"
                    className="boton"
                    onClick={() => onOpenModal("rsvp")}
                  >
                    Confirmar asistencia
                  </button>
                </div>

                <div className="info-box">
                  <h6>Dirección</h6>
                  <p>{event.address}</p>
                  <button
                    type="button"
                    className="boton"
                    onClick={() => onOpenModal("map")}
                  >
                    ¿Cómo llegar?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionDividerBottom />
    </section>
  );
}

