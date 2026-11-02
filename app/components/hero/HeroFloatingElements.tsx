"use client";

import { useState } from "react";
import Image from "next/image";
import type { HeroFloatingElementsProps } from "@/app/components/hero/hero.types";

const SPARKLE_COUNT = 5;

const SPARKLE_CLASSES = [
  "hero-sparkle hero-sparkle--1",
  "hero-sparkle hero-sparkle--2",
  "hero-sparkle hero-sparkle--3",
  "hero-sparkle hero-sparkle--4",
  "hero-sparkle hero-sparkle--5",
] as const;

export function HeroFloatingElements(_props: HeroFloatingElementsProps) {
  const [butterflyTopError, setButterflyTopError] = useState(false);
  const [butterflyBottomError, setButterflyBottomError] = useState(false);

  return (
    <div className="hero-floating-layer" aria-hidden="true">
      {/* Mariposa arriba-derecha */}
      {!butterflyTopError && (
        <div className="hero-butterfly-top">
          <Image
            src="/assets/images/decorations/mariposa-top.png"
            alt=""
            width={72}
            height={64}
            style={{ width: "auto", height: "auto" }}
            onError={() => setButterflyTopError(true)}
          />
        </div>
      )}

      {/* Mariposa abajo-derecha */}
      {!butterflyBottomError && (
        <div className="hero-butterfly-bottom">
          <Image
            src="/assets/images/decorations/mariposa-bottom.png"
            alt=""
            width={56}
            height={60}
            style={{ width: "auto", height: "auto" }}
            onError={() => setButterflyBottomError(true)}
          />
        </div>
      )}

      {/* Destellos dorados decorativos generados con CSS puro */}
      {Array.from({ length: SPARKLE_COUNT }, (_, i) => (
        <span key={i} className={SPARKLE_CLASSES[i]} />
      ))}
    </div>
  );
}
