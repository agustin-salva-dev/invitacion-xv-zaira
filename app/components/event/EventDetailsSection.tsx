"use client";

/**
 * Sección de detalles del evento (fecha, lugar, dirección).
 * Integra los 3 botones de interacción:
 * - Agendar: CalendarDropdown (Google Calendar / Apple Calendar)
 * - Confirmar asistencia: abre el modal RSVP multi-step
 * - ¿Cómo llegar?: abre el modal del mapa
 */

import type { EventSchedule, ModalId } from "@/app/types/invitation";
import { CalendarDropdown } from "@/app/components/calendar/CalendarDropdown";
import { LottiePlayer } from "@/app/components/common/LottiePlayer";
import {
  SectionDividerTop,
  SectionDividerBottom,
} from "@/app/components/common/SectionDividers";

interface EventDetailsSectionProps {
  readonly event: EventSchedule;
  readonly honoree: string;
  readonly onOpenModal: (id: ModalId) => void;
}

export function EventDetailsSection({
  event,
  honoree,
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
                {/* Día + Agendar (Dropdown de calendario) */}
                <div className="info-box">
                  <h6>Día</h6>
                  <p>{event.date}</p>
                  <CalendarDropdown event={event} honoree={honoree} />
                </div>

                {/* Lugar + Confirmar asistencia */}
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

                {/* Dirección + ¿Cómo llegar? */}
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
