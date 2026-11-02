"use client";

import type { CoverHeroProps } from "@/app/components/hero/hero.types";
import { HeroBackground } from "@/app/components/hero/HeroBackground";
import { HeroLandscape } from "@/app/components/hero/HeroLandscape";
import { HeroFloatingElements } from "@/app/components/hero/HeroFloatingElements";
import { HeroTypography } from "@/app/components/hero/HeroTypography";

export function CoverHero({ honoree, displayDate }: CoverHeroProps) {
  return (
    <section
      className="hero-section"
      aria-label={`Invitación de 15 años de ${honoree}`}
    >
      {/* Título accesible para SEO y lectores de pantalla */}
      <h1 className="sr-only">
        Invitación de 15 años de {honoree} – Mis Quince Años
      </h1>

      <div className="hero-inner">
        {/* Capa 1: Fondo limpio neutro */}
        <HeroBackground />

        {/* Capa 2: Paisaje decorativo (árbol + animales/río) */}
        <HeroLandscape />

        {/* Capa 3: Elementos flotantes (mariposas, farol, destellos) */}
        <HeroFloatingElements />

        {/* Capa 4: Tipografía y contenido semántico */}
        <HeroTypography honoree={honoree} displayDate={displayDate} />
      </div>
    </section>
  );
}
