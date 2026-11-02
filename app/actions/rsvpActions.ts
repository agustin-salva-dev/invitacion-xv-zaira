"use server";

/**
 * Server Action: Confirmar asistencia de un invitado con sus acompañantes.
 * Valida con Zod en el servidor (defensa en profundidad), luego persiste
 * en GuestConfirmation + Companion en una transacción atómica.
 */

import { prisma } from "@/app/lib/prisma";
import { rsvpFormSchema } from "@/app/lib/validations/rsvpSchema";
import type { RsvpFormData } from "@/app/lib/validations/rsvpSchema";

export interface ActionResult {
  readonly success: boolean;
  readonly error?: string;
}

export async function confirmAttendance(formData: RsvpFormData): Promise<ActionResult> {
  // 1. Validación en servidor (segunda línea de defensa)
  const validation = rsvpFormSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Datos inválidos.",
    };
  }

  const { primaryGuest, companions } = validation.data;

  try {
    // 2. Transacción atómica: crea el titular y sus acompañantes en un solo commit
    await prisma.guestConfirmation.create({
      data: {
        firstName: primaryGuest.firstName,
        lastName: primaryGuest.lastName,
        dni: primaryGuest.dni,
        companionCount: companions.length,
        companions: {
          create: companions.map((companion, index) => ({
            firstName: companion.firstName,
            lastName: companion.lastName,
            dni: companion.dni,
            order: index + 1,
          })),
        },
      },
    });

    return { success: true };
  } catch (error) {
    // Código P2002 de Prisma = unique constraint violation (DNI duplicado)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return {
        success: false,
        error: "Tu DNI ya fue registrado. Si necesitás modificar tus datos, contactá a los organizadores.",
      };
    }

    console.error("[confirmAttendance] Error inesperado:", error);
    return {
      success: false,
      error: "Ocurrió un error al confirmar la asistencia. Por favor intentá de nuevo.",
    };
  }
}

