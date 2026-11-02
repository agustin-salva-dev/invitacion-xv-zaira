"use client";

import { useState } from "react";
import Image from "next/image";
import type { HeroTypographyProps } from "@/app/components/hero/hero.types";

export function HeroTypography({ honoree, displayDate }: HeroTypographyProps) {
  const [crownError, setCrownError] = useState(false);

  return (
    <div className="hero-text-layer">
      {/* Fecha del evento */}
      <time className="hero-date" dateTime={displayDate}>
        {displayDate}
      </time>

      {/* Corona dorada decorativa */}
      {!crownError && (
        <div className="hero-crown">
          <Image
            src="/assets/images/decorations/corona-dorada-exact.png"
            alt="Corona dorada decorativa"
            width={60}
            height={60}
            style={{ width: 60, height: "auto" }}
            onError={() => setCrownError(true)}
          />
        </div>
      )}

      {/* Nombre de la quinceañera – elemento más prominente visualmente */}
      <p className="hero-name">{honoree}</p>

      {/* Título de la sección */}
      <p className="hero-title">Mis XV Años</p>

      {/* Frase de la quinceañera */}
      <p className="hero-quote">
        Quince años voy a cumplir, una noche para soñar y mil recuerdos para
        compartir.
      </p>
    </div>
  );
}
