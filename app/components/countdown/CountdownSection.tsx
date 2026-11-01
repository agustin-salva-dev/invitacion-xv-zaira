"use client";

import { useCountdown } from "@/app/hooks/useCountdown";
import { LottiePlayer } from "@/app/components/common/LottiePlayer";
import {
  SectionDividerTop,
  SectionDividerBottom,
} from "@/app/components/common/SectionDividers";

interface CountdownSectionProps {
  readonly eventDate: string;
}

export function CountdownSection({ eventDate }: CountdownSectionProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(eventDate);

  return (
    <section className="cuenta-regresiva cuenta-regresiva-dorada section-border">
      <SectionDividerTop />

      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="box-cta-regresiva text-center">
            {!isExpired ? (
              <>
                <span className="falta">Falta</span>

                <div className="reloj" role="timer" aria-live="polite">
                  <div className="reloj-col">
                    <span className="number">{days}</span>
                    <span className="time">días</span>
                  </div>
                  <div className="reloj-col">
                    <span className="number">{hours}</span>
                    <span className="time">hs</span>
                  </div>
                  <div className="reloj-col">
                    <span className="number">{minutes}</span>
                    <span className="time">min</span>
                  </div>
                  <div className="reloj-col no-border">
                    <span className="number">{seconds}</span>
                    <span className="time">seg</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="fin-cuenta">¡Llegó el gran día!</p>
            )}

            <div className="d-flex justify-content-center align-items-center">
              <LottiePlayer
                path="/assets/lottie/corazon-falta.json"
                className="corazon-falta"
              />
            </div>
          </div>
        </div>
      </div>

      <SectionDividerBottom />
    </section>
  );
}

