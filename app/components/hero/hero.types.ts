/** Tipos estrictos para los subcomponentes de la Hero Section – sin `any` */

/** Props del componente orquestador */
export interface CoverHeroProps {
  readonly honoree: string;
  readonly displayDate: string;
}

/** Props de HeroTypography */
export interface HeroTypographyProps {
  readonly honoree: string;
  readonly displayDate: string;
}

/** Props de HeroLandscape (sin props propias por ahora, decorativo puro) */
export type HeroLandscapeProps = Record<never, never>;

/** Props de HeroBackground (sin props propias, solo color de fondo) */
export type HeroBackgroundProps = Record<never, never>;

/** Props de HeroFloatingElements (sin props propias, decorativo puro) */
export type HeroFloatingElementsProps = Record<never, never>;
