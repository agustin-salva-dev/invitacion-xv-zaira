import type { ModalId } from "@/app/types/invitation";
import { LottiePlayer } from "@/app/components/common/LottiePlayer";

interface GiftsSectionProps {
  readonly onOpenModal: (id: ModalId) => void;
}

export function GiftsSection({ onOpenModal }: GiftsSectionProps) {
  return (
    <section className="regalos regalos-blanco">
      <div className="container">
        <div className="row text-center d-flex justify-content-center align-items-center">
          <div className="content-regalos">
            <h2 className="title">Regalos</h2>
            <p className="subtitle">
              Si deseas regalarme algo más que tu hermosa presencia...
            </p>
            <div className="anim-regalos-wrapper">
              <LottiePlayer
                path="/assets/lottie/img_regalo.json"
                className="anim-regalos"
              />
            </div>
            <br />
            <button
              type="button"
              className="boton"
              onClick={() => onOpenModal("gifts")}
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

