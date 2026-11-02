"use client";

import { useState } from "react";
import Image from "next/image";
import type { HeroLandscapeProps } from "@/app/components/hero/hero.types";

const TREE_SRC = "/assets/images/decorations/arbol-farol-generated.png";
const LANDSCAPE_SRC = "/assets/images/decorations/mascotas-rio-generated.png";

export function HeroLandscape(_props: HeroLandscapeProps) {
  const [treeError, setTreeError] = useState(false);
  const [landscapeError, setLandscapeError] = useState(false);

  return (
    <div className="hero-landscape-layer" aria-hidden="true">
      {/* Árbol izquierdo con farol – anclado arriba-izquierda, medio tronco afuera */}
      {!treeError && (
        <div className="hero-tree-asset">
          <Image
            src={TREE_SRC}
            alt=""
            width={848}
            height={1264}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onError={() => setTreeError(true)}
            priority
          />
          {/* Luz cálida titilante exactamente sobre el farol del árbol */}
          <div
            className="lantern-candle-glow hero-lantern-glow"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Animales, río y pasto inferior – anclado abajo, ancho completo */}
      {!landscapeError && (
        <div className="hero-landscape-bottom-asset">
          <Image
            src={LANDSCAPE_SRC}
            alt=""
            fill
            sizes="(max-width: 682px) 100vw, 682px"
            style={{ objectFit: "cover", objectPosition: "bottom center" }}
            onError={() => setLandscapeError(true)}
          />
        </div>
      )}
    </div>
  );
}
