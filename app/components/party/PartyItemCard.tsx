import type { ModalId } from "@/app/types/invitation";
import { LottiePlayer } from "@/app/components/common/LottiePlayer";

interface PartyItemCardProps {
  readonly title: string;
  readonly description: string;
  readonly buttonLabel: string;
  readonly lottiePath: string;
  readonly modalId: ModalId;
  readonly onOpenModal: (id: ModalId) => void;
}

export function PartyItemCard({
  title,
  description,
  buttonLabel,
  lottiePath,
  modalId,
  onOpenModal,
}: PartyItemCardProps) {
  return (
    <div className="col-md-4 item-fiesta">
      <div className="content-item-fiesta">
        <div className="box-color-col d-flex flex-column justify-content-between align-items-center fiesta-card-white">
          <h3>{title}</h3>
          <div className="content-anim-fiesta">
            <LottiePlayer path={lottiePath} className="anim-icon" />
          </div>
          <p>{description}</p>
          <button
            type="button"
            className="boton"
            onClick={() => onOpenModal(modalId)}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

