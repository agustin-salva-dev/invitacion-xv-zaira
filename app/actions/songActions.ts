"use server";

/**
 * Server Action: Registrar una sugerencia de canción.
 * Valida con Zod en el servidor antes de persistir en song_suggestions.
 */

import { prisma } from "@/app/lib/prisma";
import { songSuggestionSchema } from "@/app/lib/validations/rsvpSchema";
import type { SongSuggestionData } from "@/app/lib/validations/rsvpSchema";
import type { ActionResult } from "@/app/actions/rsvpActions";

export async function submitSongSuggestion(data: SongSuggestionData): Promise<ActionResult> {
  const validation = songSuggestionSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Datos inválidos.",
    };
  }

  const { guestName, songTitle, link } = validation.data;

  try {
    await prisma.songSuggestion.create({
      data: {
        guestName,
        songTitle,
        link: link ?? null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("[submitSongSuggestion] Error inesperado:", error);
    return {
      success: false,
      error: "Ocurrió un error al enviar la sugerencia. Por favor intentá de nuevo.",
    };
  }
}

