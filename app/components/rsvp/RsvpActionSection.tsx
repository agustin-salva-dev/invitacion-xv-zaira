import type { ModalId } from "@/app/types/invitation";

interface RsvpActionSectionProps {
  readonly onOpenModal: (id: ModalId) => void;
}

export function RsvpActionSection({ onOpenModal }: RsvpActionSectionProps) {
  return (
    <section className="seccion-principal confirmacion-asistencia">
      <div className="box-confirmacion">
        <h2 className="title">Confirmación de asistencia</h2>
        <p className="subtitle">Es importante que confirmes tu asistencia</p>
        <button
          type="button"
          className="boton boton-confirmacion"
          onClick={() => onOpenModal("rsvp")}
        >
          Confirmar asistencia
        </button>
      </div>
    </section>
  );
}

