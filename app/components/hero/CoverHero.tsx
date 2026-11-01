"use client";

interface CoverHeroProps {
  readonly honoree: string;
}

export function CoverHero({ honoree }: CoverHeroProps) {
  return (
    <section className="fairytale-hero-section" aria-label={`Invitación de 15 años de ${honoree}`}>
      {/* Título semántico accesible para SEO y lectores de pantalla */}
      <h1 className="sr-only">
        Invitación de 15 años de {honoree} - Mis Quince Años
      </h1>

      <div className="fairytale-poster-wrapper">
        {/* Póster íntegro en alta definición sin cortes ni fragmentos */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/portada-zaira-fairytale.jpg"
          alt={`Invitación de 15 años de ${honoree}`}
          className="fairytale-poster-img"
          priority-component="true"
        />

        {/* Efecto interactivo vivo: luz cálida titilante en el farol */}
        <div className="lantern-candle-glow" aria-hidden="true" />
      </div>
    </section>
  );
}
