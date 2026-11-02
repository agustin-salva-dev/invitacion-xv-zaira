/** Tipos estrictos para la invitación de quinceañera – sin `any` */

export interface EventSchedule {
  readonly label: string;
  readonly date: string; // Fecha formateada para mostrar (ej: "Sábado 15 de Junio - 19hs")
  readonly startIso: string; // Fecha ISO 8601 para calendarios (ej: "2027-06-15T19:00:00")
  readonly time: string;
  readonly venue: string;
  readonly address: string;
  readonly mapsUrl: string;
  readonly mapsEmbedUrl: string; // URL para iframe embed de Google Maps
}

export interface CountdownTime {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly isExpired: boolean;
}

export interface InvitationConfig {
  readonly honoree: string;
  readonly title: string;
  readonly subtitle: string;
  readonly coverPhrase: string;
  readonly displayDate: string; // e.g. "15.06.2025"
  readonly eventDate: string; // ISO 8601
  readonly event: EventSchedule;
  readonly galleryPhotoAlt: string;
  readonly welcomeMessage: string;
}

export type MusicState = "idle" | "playing" | "paused";

export type ModalId = "rsvp" | "map" | "song" | "dressCode" | "tips" | "gifts";

export interface LottieAnimationConfig {
  readonly path: string;
  readonly loop: boolean;
  readonly autoplay: boolean;
}
