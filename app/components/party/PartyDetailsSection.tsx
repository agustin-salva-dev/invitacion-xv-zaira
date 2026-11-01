import type { ModalId } from "@/app/types/invitation";
import { PartyItemCard } from "@/app/components/party/PartyItemCard";
import {
  SectionDividerTop,
  SectionDividerBottom,
} from "@/app/components/common/SectionDividers";

interface PartyDetailsSectionProps {
  readonly onOpenModal: (id: ModalId) => void;
}

interface PartyItem {
  readonly id: ModalId;
  readonly title: string;
  readonly description: string;
  readonly buttonLabel: string;
  readonly lottiePath: string;
}

const PARTY_ITEMS: readonly PartyItem[] = [
  {
    id: "song",
    title: "Música",
    description: "¿Cuál es la canción que no debe faltar en la PlayList de la fiesta?",
    buttonLabel: "Sugerir canción",
    lottiePath: "/assets/lottie/img_musica.json",
  },
  {
    id: "dressCode",
    title: "Dress Code",
    description: "Una orientación para tu vestuario",
    buttonLabel: "Ver más",
    lottiePath: "/assets/lottie/vestuario.json",
  },
  {
    id: "tips",
    title: "Tips y Notas",
    description: "Información adicional para tener en cuenta",
    buttonLabel: "+ Info",
    lottiePath: "/assets/lottie/tips.json",
  },
];

export function PartyDetailsSection({ onOpenModal }: PartyDetailsSectionProps) {
  return (
    <section className="fiesta section-border">
      <SectionDividerTop />

      <div className="container">
        <div className="row text-center d-flex justify-content-center align-items-center">
          <div className="col-md-12">
            <h2 className="title">Fiesta</h2>
            <p className="subtitle">
              Hagamos juntos una fiesta épica. Aquí algunos detalles a tener en cuenta.
            </p>
          </div>

          {PARTY_ITEMS.map((item) => (
            <PartyItemCard
              key={item.id}
              title={item.title}
              description={item.description}
              buttonLabel={item.buttonLabel}
              lottiePath={item.lottiePath}
              modalId={item.id}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>

      <SectionDividerBottom />
    </section>
  );
}

