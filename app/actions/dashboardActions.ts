"use server";

/**
 * Server Actions para el Dashboard.
 * Consultas de solo lectura: listado de asistencias y canciones sugeridas.
 */

import { prisma } from "@/app/lib/prisma";

// -----------------------------------------------------------------------
// Tipos de respuesta del dashboard
// -----------------------------------------------------------------------

export interface CompanionView {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dni: string;
  readonly order: number;
}

export interface GuestConfirmationView {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dni: string;
  readonly companionCount: number;
  readonly createdAt: string; // ISO string serializable para Client Components
  readonly companions: readonly CompanionView[];
}

export interface SongSuggestionView {
  readonly id: string;
  readonly guestName: string;
  readonly songTitle: string;
  readonly link: string | null;
  readonly createdAt: string; // ISO string serializable
}

export interface DashboardStats {
  readonly totalTitulares: number;
  readonly totalAcompanantes: number;
  readonly totalPersonas: number;
  readonly totalCanciones: number;
}

// -----------------------------------------------------------------------
// Queries de lectura
// -----------------------------------------------------------------------

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [titularesCount, songs, companionsAggregate] = await Promise.all([
      prisma.guestConfirmation.count({ where: { status: "CONFIRMED" } }),
      prisma.songSuggestion.count(),
      prisma.guestConfirmation.aggregate({
        _sum: { companionCount: true },
        where: { status: "CONFIRMED" },
      }),
    ]);

    const totalAcompanantes = companionsAggregate._sum.companionCount ?? 0;

    return {
      totalTitulares: titularesCount,
      totalAcompanantes,
      totalPersonas: titularesCount + totalAcompanantes,
      totalCanciones: songs,
    };
  } catch (error) {
    console.error("[getDashboardStats] Error al conectar con DB:", error);
    return {
      totalTitulares: 0,
      totalAcompanantes: 0,
      totalPersonas: 0,
      totalCanciones: 0,
    };
  }
}

export async function getGuestConfirmations(): Promise<readonly GuestConfirmationView[]> {
  try {
    const guests = await prisma.guestConfirmation.findMany({
      where: { status: "CONFIRMED" },
      include: {
        companions: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return guests.map((g) => ({
      id: g.id,
      firstName: g.firstName,
      lastName: g.lastName,
      dni: g.dni,
      companionCount: g.companionCount,
      createdAt: g.createdAt.toISOString(),
      companions: g.companions.map((c) => ({
        id: c.id,
        firstName: c.firstName,
        lastName: c.lastName,
        dni: c.dni,
        order: c.order,
      })),
    }));
  } catch (error) {
    console.error("[getGuestConfirmations] Error al consultar DB:", error);
    return [];
  }
}

export async function getSongSuggestions(): Promise<readonly SongSuggestionView[]> {
  try {
    const songs = await prisma.songSuggestion.findMany({
      orderBy: { createdAt: "desc" },
    });

    return songs.map((s) => ({
      id: s.id,
      guestName: s.guestName,
      songTitle: s.songTitle,
      link: s.link,
      createdAt: s.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("[getSongSuggestions] Error al consultar DB:", error);
    return [];
  }
}

